import React from 'react'

interface BrandCardProps {
  name: string
  blurb: string
  logo: React.ReactNode
}

export function BrandCard({ name, blurb, logo }: BrandCardProps) {
  return (
    <div className="rounded-2xl border border-[#24463d] bg-[#102721] p-5 hover:bg-[#123128] transition">
      <div className="flex items-center gap-3">
        {logo}
        <div>
          <div className="text-[#c4a070] font-medium">{name}</div>
          <div className="text-sm text-neutral-300/90">{blurb}</div>
        </div>
      </div>
    </div>
  )
}