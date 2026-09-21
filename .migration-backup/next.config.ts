import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // As LPs são estáticas: geradas no build via generateStaticParams.
  // Não usamos `output: 'export'` porque app/api/lead precisa de runtime de servidor
  // para fazer proxy do webhook n8n sem expor a URL no bundle do cliente.
  reactStrictMode: true,
}

export default nextConfig
