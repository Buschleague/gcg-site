export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-3xl text-[#d4bc99]">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-neutral-300">{subtitle}</p>}
    </div>
  )
}