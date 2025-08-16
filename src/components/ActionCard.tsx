import React from 'react'

interface ActionCardProps {
  title: string
  body: string
  cta: string
  onClick: () => void
}

export function ActionCard({ title, body, cta, onClick }: ActionCardProps) {
  return (
    <div className="rounded-3xl border border-[#24463d] bg-[#102721] p-6 flex flex-col justify-between">
      <div>
        <div className="font-serif text-2xl text-[#d4bc99]">{title}</div>
        <p className="mt-2 text-sm text-neutral-300">{body}</p>
      </div>
      <div className="mt-6">
        <button onClick={onClick} className="btn">{cta}</button>
      </div>
    </div>
  )
}