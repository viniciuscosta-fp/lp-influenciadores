**Webhook de Cadastro de Marketing**

*Documentação técnica do workflow n8n para cadastro genérico de leads*

# **Visão Geral**

Este webhook é o ponto de entrada único para cadastro de leads vindos de qualquer campanha de marketing da Fluencypass (landing pages, formulários, quizzes, etc). Ele faz duas coisas em sequência: (1) cadastrar o lead na API2 da Fluencypass, gerando o MQL no funil padrão, e (2) opcionalmente atualiza propriedades adicionais no contato dentro do HubSpot.

A camada "extras" foi desenhada para ser extensível: qualquer propriedade do HubSpot (nativa ou custom) pode ser preenchida sem precisar editar o workflow no n8n. Quem chama o webhook tem responsabilidade total sobre o que vai no payload.

# **URLs do Webhook**

O n8n disponibiliza duas URLs para o mesmo workflow:

### **Produção**

### 

| https://webhook.fluencypass.com/webhook/integracao-lead-crm |
| :---- |

Use esta URL em landing pages e formulários em produção. Funciona sempre que o workflow estiver com o toggle "Active" ligado no n8n.

### **Teste**

| https://n8n.fluencypass.com/webhook-test/integracao-lead-crm |
| :---- |

Use esta URL apenas para testes manuais. Ela só responde quando você clica em "Listen for test event" (botão laranja) no canvas do workflow, e cada clique aceita apenas uma chamada. Útil para inspecionar o passo-a-passo da execução no editor visual.

# **Contrato do Payload**

O payload deve ser enviado via POST com Content-Type: application/json. Ele contém dois blocos: campos obrigatórios (no nível raiz) e o objeto extras (opcional).

## **Campos Obrigatórios**

Os 14 campos abaixo precisam ESTAR PRESENTES no payload. Eles podem vir como string vazia, mas a chave em si não pode ser omitida — senão o workflow rejeita com 400\.

| Campo | Tipo | Exemplo | Observação  |
| :---- | :---- | :---- | :---- |
| email | string | lead@example.com | Identificador unico no HubSpot |
| firstName | string | Maria | Primeiro nome do lead |
| celular | string | (11) 98765-4321 | Workflow remove caracteres não-numéricos e prefixa \+55 antes de enviar pra API2  |
| idade | string | 30 | Mantido como string |
| channel | string | b2c\_subscription | Canal de aquisicao na API2 |
| plan | string |  | Pode ficar vazio |
| acquireUrl | string | https://... | URL da landing onde o lead converteu |
| utm\_source | string | google | Pode ficar vazio (‘’) |
| utm\_medium | string | cpc | Pode ficar vazio (‘’) |
| utm\_campaign | string | brand\_search | Pode ficar vazio (‘’) |
| utm\_term | string |  | Pode ficar vazio (‘’) |
| utm\_content | string | ad\_var\_a | Pode ficar vazio (‘’) |
| site\_source\_name | string |  | Pode ficar vazio (‘’) |
| affiliateCode | string |  | Pode ficar vazio (‘’) |

## **Objeto Extras (opcional)**

Para gravar propriedades adicionais no contato do HubSpot, inclua um objeto chamado "extras" no payload. As chaves desse objeto devem ser os INTERNAL NAMES das propriedades no HubSpot (não os labels que aparecem na UI).

**Importante:** a propriedade precisa existir previamente no HubSpot. Se você enviar uma chave que não corresponde a nenhuma propriedade real, o PATCH falha com HTTP 400 vindo do HubSpot.

Comportamento do workflow em relação ao extras:

* **extras ausente:** workflow só cadastra na API2 e responde 200 imediatamente.

* **extras como objeto vazio ({}):** mesmo comportamento que ausente — responde 200 sem fazer PATCH.

* **extras com tipo inválido (string, array, número):** tolerado — workflow normaliza como vazio e segue o caminho sem PATCH.

* **extras com pelo menos 1 chave:** workflow aguarda 6 segundos, busca o contato pelo email no HubSpot e aplica PATCH com todas as chaves do extras.

# **Exemplos de Payload**

### **Exemplo 1 — Cadastro mínimo sem extras**

| {   "email": "maria.silva@example.com",   "firstName": "Maria",   "celular": "(11) 98765-4321",   "idade": "28",   "channel": "b2c\_subscription",   "plan": "",   "acquireUrl": "https://fluencypass.com/curso-ingles",   "utm\_source": "",   "utm\_medium": "",   "utm\_campaign": "",   "utm\_term": "",   "utm\_content": "",   "site\_source\_name": "",   "affiliateCode": "" } |
| :---- |

### **Exemplo 2 — Cadastro com tracking completo \+ extras**

| {   "email": "joao.pereira@example.com",   "firstName": "Joao",   "celular": "(21) 99999-1234",   "idade": "35",   "channel": "b2c\_subscription",   "plan": "",   "acquireUrl": "https://fluencypass.com/quiz-carreira",   "utm\_source": "facebook",   "utm\_medium": "paid\_social",   "utm\_campaign": "quiz\_carreira\_jul",   "utm\_term": "",   "utm\_content": "criativo\_v3",   "site\_source\_name": "",   "affiliateCode": "",   "extras": {     "lifecyclestage": "lead",     "quiz\_objetivo": "carreira",     "quiz\_nivel": "intermediario",     "quiz\_renda": "5k\_10k"   } } |
| :---- |

### **Exemplo 3 — Apenas extras essenciais (campos obrigatórios em branco)**

| {   "email": "ana.lima@example.com",   "firstName": "Ana",   "celular": "(11) 91111-2222",   "idade": "",   "channel": "",   "plan": "",   "acquireUrl": "",   "utm\_source": "",   "utm\_medium": "",   "utm\_campaign": "",   "utm\_term": "",   "utm\_content": "",   "site\_source\_name": "",   "affiliateCode": "",   "extras": {     "lifecyclestage": "lead"   } } |
| :---- |

# **Exemplos de Chamada**

## **JavaScript (fetch)**

| async function cadastrarLead(dadosFormulario) {   const payload \= {     email: dadosFormulario.email,     firstName: dadosFormulario.nome,     celular: dadosFormulario.telefone,     idade: dadosFormulario.idade || '',     channel: 'b2c\_subscription',     plan: '',     acquireUrl: window.location.href,     utm\_source: getUrlParam('utm\_source'),     utm\_medium: getUrlParam('utm\_medium'),     utm\_campaign: getUrlParam('utm\_campaign'),     utm\_term: getUrlParam('utm\_term'),     utm\_content: getUrlParam('utm\_content'),     site\_source\_name: '',     affiliateCode: '',     extras: {       lifecyclestage: 'lead',       quiz\_objetivo: dadosFormulario.objetivo     }   };     try {     const response \= await fetch(       'https://n8n.fluencypass.com/webhook/643ab876-e396-43a4-9c0d-d559b642b08d',       {         method: 'POST',         headers: { 'Content-Type': 'application/json' },         body: JSON.stringify(payload)       }     );       const resultado \= await response.json();       if (\!response.ok) {       console.error('Cadastro falhou:', resultado);       return { sucesso: false, erro: resultado };     }       return { sucesso: true, dados: resultado };   } catch (err) {     console.error('Erro de rede:', err);     return { sucesso: false, erro: err.message };   } }   function getUrlParam(nome) {   return new URLSearchParams(window.location.search).get(nome) || ''; } |
| :---- |

## **cURL**

| curl \-X POST 'https://n8n.fluencypass.com/webhook/643ab876-e396-43a4-9c0d-d559b642b08d' \\   \-H 'Content-Type: application/json' \\   \-d '{     "email": "lead@example.com",     "firstName": "Lead Teste",     "celular": "(11) 98765-4321",     "idade": "30",     "channel": "b2c\_subscription",     "plan": "",     "acquireUrl": "https://fluencypass.com/teste",     "utm\_source": "manual",     "utm\_medium": "",     "utm\_campaign": "",     "utm\_term": "",     "utm\_content": "",     "site\_source\_name": "",     "affiliateCode": "",     "extras": {       "lifecyclestage": "lead"     }   }' |
| :---- |

# **Tabela de Respostas**

Todas as respostas são em JSON. O campo "stage" indica em qual etapa do workflow a resposta foi gerada. Use o status HTTP como sinal principal de sucesso/falha e o stage para diagnóstico.

| Status | Stage | Cenário | O que fazer |
| :---- | :---- | :---- | :---- |
| 200 | api2\_only | Lead cadastrado na API2 com sucesso. Nenhum extras foi enviado (ou foi enviado vazio/invalido). | Sucesso. Nenhuma ação necessária.  |
| 200 | completed | Lead cadastrado na API2 \+ propriedades extras aplicadas no contato do HubSpot via PATCH.  | Sucesso completo. Verifique properties\_updated na resposta para confirmar quais propriedades foram gravadas. |
| 400 | validation | Payload não contém todos os 14 campos obrigatórios. Resposta inclui missingFields com a lista do que faltou.  | Corrigir o payload na origem (landing/formulário) garantindo presença de todas as chaves obrigatórias, mesmo que vazias.  |
| 502 | api2\_fluencypass | API2 retornou erro (status \>= 300). Resposta inclui statusCode e error da API2.  | Investigar a API2: o lead pode já existir, dados inválidos ou instabilidade do serviço. Resposta da API2 está no campo error.  |
| 502 | patch\_failed | Lead foi cadastrado na API2 e contato foi encontrado no HubSpot, mas o PATCH com extras falhou (status HubSpot \>= 300).  | Causa mais comum: alguma chave em extras não existe como propriedade no HubSpot. Verificar patch\_response na resposta. Lead já foi criado, mas precisa ser corrigido manualmente ou via novo PATCH.  |
| 504 | hubspot\_polling | Lead foi cadastrado na API2 mas o contato não apareceu no HubSpot após 5 tentativas (\~36s).  | Lead provavelmente foi criado. Verificar manualmente no HubSpot após alguns minutos. Se não aparecer, investigar latência da integração API2 \-\> HubSpot.  |

## **Exemplo de Resposta de Sucesso (stage=completed)**

| {   "success": true,   "stage": "completed",   "timestamp": "2026-05-21T14:32:18.421Z",   "email": "lead@example.com",   "hubspot\_contact\_id": "12345678",   "polling\_attempts": 0,   "patch\_status": 200,   "properties\_updated": \["lifecyclestage", "quiz\_objetivo"\],   "patch\_response": null } |
| :---- |

## **Exemplo de Resposta de Erro de Validação (400)**

| {   "success": false,   "stage": "validation",   "message": "Payload invalido: campos obrigatorios ausentes",   "missingFields": \["email", "celular"\],   "receivedKeys": \["firstName", "idade", "utm\_source"\] } |
| :---- |

# **Comportamento do Fluxo**

O workflow executa os passos abaixo em sequência:

1. Recebe o POST no webhook.

2. Valida que todos os 14 campos obrigatórios estão presentes no payload. Se faltar algum, responde 400 e encerra.

3. Normaliza o objeto extras: se não for um objeto válido, trata como vazio.

4. Chama POST https://api2.fluencypass.com/api/students/leadStudent com o payload mapeado. Se a API2 retornar status fora de 2xx, responde 502 e encerra.

5. Verifica se extras tem pelo menos 1 chave. Se não, responde 200 com stage=api2\_only e encerra.

6. Aguarda 6 segundos (tempo médio para o lead ser indexado no HubSpot após cadastro via API2).

7. Faz busca no HubSpot pelo email do lead via POST /crm/v3/objects/contacts/search.

8. Se o contato for encontrado, executa o PATCH em /crm/v3/objects/contacts/{id} com as propriedades do extras.

9. Se o contato NÃO for encontrado, aguarda mais 6 segundos e tenta novamente. Repete até 5 vezes (total \~36s). Se não encontrar, responde 504\.

10. Após PATCH bem-sucedido, responde 200 com stage=completed e detalhes do que foi atualizado. Se o PATCH falhar, responde 502 com stage=patch\_failed.

# **Como Adicionar uma Propriedade Nova**

A maior vantagem desse workflow é que adicionar uma propriedade nova NÃO exige editar o n8n. O processo é inteiramente do lado do HubSpot \+ landing page.

11. Acesse o HubSpot em Settings \-\> Properties \-\> Contact properties.

12. Crie a propriedade com o tipo apropriado (string, number, dropdown, etc).

13. Anote o INTERNAL NAME gerado (visível ao clicar na propriedade, em "Internal name"). É esse valor que entra como chave no objeto extras, NÃO o label.

14. Na landing page ou formulário que vai enviar o dado, inclua a propriedade dentro do objeto extras do payload.

15. Testar com um lead real ou via Apps Script de teste.

**Exemplo:** se você criar uma propriedade chamada "Objetivo Principal" no HubSpot e o internal name gerado for "objetivo\_principal", o payload da landing deve enviar **extras: { "objetivo\_principal": "valor\_aqui" }**.

# **Troubleshooting**

### **502 com stage=patch\_failed**

Significado: o lead foi criado na API2 e o contato foi encontrado no HubSpot, mas o PATCH com as propriedades extras falhou. A causa mais comum é enviar uma chave em extras que não corresponde a nenhuma propriedade existente no HubSpot.

Como diagnosticar:

* Inspecionar o campo patch\_response na resposta — vai conter a mensagem de erro do HubSpot indicando qual propriedade não existe.

* Confirmar no HubSpot (Settings \-\> Properties) se o internal name esta correto.

* Lembrar que internal names são case-sensitive e não podem ter espaços ou caracteres especiais.

### **504 com stage=hubspot\_polling**

Significado: o workflow esperou \~36s mas não conseguiu encontrar o contato no HubSpot pelo email. O lead provavelmente foi criado, mas a indexação demorou mais que o esperado.

Como diagnosticar:

* Verificar manualmente no HubSpot após 1-2 minutos se o contato apareceu.

* Se não apareceu, investigar logs da API2 — pode ter falhado em criar o contato no HubSpot mesmo retornando 2xx.

* Se aparecer atrasos recorrentes, considerar aumentar o tempo de espera inicial no workflow ou o numero de tentativas.

### **502 com stage=api2\_fluencypass**

Significado: a API2 retornou erro logo na primeira chamada. O lead NÃO foi criado.

Como diagnosticar:

* Inspecionar o campo error na resposta — vai conter o corpo retornado pela API2.

* Causas comuns: dados inválidos no payload (formato de email/telefone), instabilidade da API2, ou lead duplicado dependendo de como a API2 trata isso.

* Se a API2 estiver instável, considerar implementar retry no lado do cliente.

### **400 com stage=validation**

Significado: o payload não contém todos os 14 campos obrigatórios.

Como diagnosticar:

* Verificar missingFields na resposta — lista exatamente o que está faltando.

* Corrigir o código da landing/formulário garantindo que TODAS as 14 chaves sejam enviadas, mesmo que com valor vazio.

* Atenção especial: chave ausente não é o mesmo que valor vazio. { email: '' } passa na validação; omitir email não.

# **Como Testar**

Existe um script em Google Apps Script para testar todos os cenários do workflow de forma isolada. Cada cenário é uma função separada que pode ser executada individualmente no editor do Apps Script.

Cenários disponíveis no script:

* **sucessoSemExtras** — payload valido sem o campo extras.

* **sucessoComExtras** — payload válido com extras contendo lifecyclestage.

* **extrasVazio** — payload com extras: {}.

* **extrasInvalido** — payload com extras como string (tipo inválido).

* **erroValidacao** — payload faltando campos obrigatórios.

* **camposEmBranco** — payload com todas as chaves presentes mas valores vazios.

* **todos** — roda todos em sequencia (requer URL de producao).

Para executar:

16. Abrir o arquivo test-workflow.gs no editor do Apps Script (script.google.com).

17. Se for usar URL de teste, ativar o "Listen for test event" no workflow do n8n antes de cada disparo.

18. No dropdown da barra superior do Apps Script, selecionar a função desejada e clicar em Executar.

19. Inspecionar os logs em Ver \-\> Registros de execucao (ou Ctrl+Enter).