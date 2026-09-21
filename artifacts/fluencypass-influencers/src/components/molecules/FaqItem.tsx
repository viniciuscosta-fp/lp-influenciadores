import { useState } from 'react'
import { Icon } from '@/components/atoms/Icon'
import type { FaqItem as FaqItemData } from '@/content/types'

export function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItemData
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className={isOpen ? 'faq-item is-open' : 'faq-item'}>
      <button className="faq-item__btn" type="button" onClick={onToggle} aria-expanded={isOpen}>
        {item.q}
        <span className="toggle">
          <Icon name="plus" size={14} strokeWidth={2.4} />
        </span>
      </button>
      <div className="faq-item__body">
        <div className="faq-item__body-inner">{item.a}</div>
      </div>
    </div>
  )
}

/** Accordion de abertura única, igual ao comportamento das LPs originais. */
export function FaqList({ items }: { items: FaqItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <div className="faq__list">
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
