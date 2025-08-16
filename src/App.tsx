import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Grab hero directly; if missing, the build will tell us clearly.
import heroImage from './assets/GeminiCG.png'

// Use glob so optional assets (pdf/jpg/jpeg) won't break the build if absent.
const assets = import.meta.glob('./assets/*', { eager: true, as: 'url' }) as Record<string, string | undefined>
const handcrafted = assets['./assets/handcrafted.png'] as string | undefined
const ozarkLogo = assets['./assets/ozark.jpg'] as string | undefined
const sparkleLogo = (assets['./assets/sparkle-logo.jpeg'] || assets['./assets/sparkle-logo.jpg']) as string | undefined

export default function App() {
  // Fixed low global scrim; no slider, no upload.
  const overlay = 0.45
  const fallbackBg = useMemo(() => ({
    backgroundImage:
      `radial-gradient(1200px 600px at 50% -200px, rgba(25,58,50,0.7), rgba(15,42,35,1)),` +
      mountainLayers(6, '#0b1f1a', '#0f2a23'),
    backgroundBlendMode: 'overlay, normal',
  }), [])

  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showPoolModal, setShowPoolModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  return (
    <div className="min-h-screen w-full bg-[#0f2a23] text-neutral-200 font-sans">
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#0f2a23]/70 border-b border-[#1c3a31]">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg border border-[#2a4d42] bg-[#123128]" />
            <span className="tracking-[0.18em] text-sm text-[#c4a070]">GEMINI CAPITAL GROUP</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-[#c4a070]">About</a>
            <a href="#brands" className="hover:text-[#c4a070]">Brands</a>
            <a href="#opportunities" className="hover:text-[#c4a070]">Opportunities</a>
            <a href="#community" className="hover:text-[#c4a070]">Community</a>
          </div>
          <button onClick={() => setShowPlanModal(true)} className="rounded-xl border border-[#3a5d52] px-3 py-1.5 text-xs hover:bg-[#19382f]">Submit Plan</button>
        </nav>
      </header>

      {/* FULL-BLEED HERO (locked to GeminiCG.png) */}
      <section className="relative min-h-[92vh]">
        {/* Background hero image */}
        <div
          className="absolute inset-0 z-0 bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'contain' }}
        />
        {/* Texture backdrop */}
        <div className="absolute inset-0 z-[-1] pointer-events-none" style={fallbackBg as any} />
        {/* Low global scrim for cohesion */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              `radial-gradient(1200px 600px at 50% -200px, rgba(15,42,35,${overlay - 0.15}), rgba(15,42,35,${overlay})),` +
              `linear-gradient(to bottom, rgba(15,42,35,${overlay}) 0%, rgba(15,42,35,${overlay + 0.1}) 60%, rgba(15,42,35,${overlay + 0.2}) 100%)`,
          }}
        />

        {/* Copy block — positioned to avoid logo/roots/wordmark */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 min-h-[70vh]">
          <div className="absolute left-4 right-4 bottom-16 md:left-8 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-xl md:max-w-2xl">
              {/* Localized scrim only behind text */}
              <div aria-hidden className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0d241e]/80 to-[#0d241e]/50 backdrop-blur-sm border border-[#24463d]/70 shadow-xl shadow-black/30" />
              <div className="relative rounded-3xl p-6 md:p-8">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-wide text-[#d4bc99] drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                  Rooted in equality.<br/>Growing the Boston Mountain community.
                </h1>
                <p className="mt-4 max-w-xl text-sm text-neutral-200/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  Strategic investments that strengthen our local heritage.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#brands" className="btn">View Our Brands</a>
                  <button onClick={() => setShowPlanModal(true)} className="btn btn-outline">Submit a Business Plan</button>
                  <button onClick={() => setShowPoolModal(true)} className="btn btn-ghost">Join the Investment Pool</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title="Deep Roots. Shared Vision." />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#24463d] bg-[#102721] p-6">
            <p className="text-sm leading-7 text-neutral-300">
              Gemini Capital Group is a family-run investment partner focused on the Boston Mountain region. As two Geminis, we believe in equal partnership and decisions that stay connected to our roots: stewardship, clarity, and long-horizon thinking. We back disciplined founders and enduring brands that strengthen our community.
            </p>
          </div>
          <div className="rounded-3xl border border-[#24463d] bg-[#102721] p-6">
            <ul className="list-disc pl-5 text-sm text-neutral-300 space-y-2">
              <li>Selective, thesis-driven investments</li>
              <li>Local-first perspective with pragmatic diligence</li>
              <li>Quiet capital: support without spotlight</li>
              <li>Quarterly review cadence for new proposals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title="Investing in Growth" subtitle="A focused portfolio we can stand behind." />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <BrandCard
            name="Handcrafted by Ashley"
            blurb="Local artisan soap & crafts that support the Boston Mountain community."
            logo={
              handcrafted ? (
                <img src={handcrafted} alt="Handcrafted by Ashley logo" className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127] grid place-items-center text-[10px] text-[#c4a070]">HBA</div>
              )
            }
          />
          <BrandCard
            name="Sparkle Squad"
            blurb="Cleaning services tailored to short-term rental owners across the Boston Mountains."
            logo={
              sparkleLogo ? (
                <img src={sparkleLogo} alt="Sparkle Squad logo" className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127]" />
              )
            }
          />
          <BrandCard
            name="Ozark Events Hub"
            blurb="Curating and promoting cultural happenings that celebrate the spirit of the Ozarks."
            logo={
              ozarkLogo ? (
                <img src={ozarkLogo} alt="Ozark Events Hub logo" className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127]" />
              )
            }
          />
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section id="opportunities" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title="Partner With Us" />
        <div className="grid gap-6 md:grid-cols-2">
          <ActionCard title="Submit a Business Plan" body="We review opportunities quarterly and focus on durable value, cash flow fundamentals, and community impact." cta="Open Submission Form" onClick={() => setShowPlanModal(true)} />
          <ActionCard title="Join the Investment Pool" body="For aligned partners who value patient, principled capital. Register interest and we’ll follow up discreetly." cta="Open Investor Form" onClick={() => setShowPoolModal(true)} />
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="border-y border-[#1d3a32] bg-[#132c25]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader title="Community Commitment" />
          <div className="rounded-3xl border border-[#24463d] bg-[#0f2721] p-6">
            <p className="text-sm leading-7 text-neutral-300">
              <strong className="text-[#c4a070]">Gold Sponsor – Boston Mountain Pawpaw Festival:</strong> We’re honored to support the 2025 festival at the Beard & Lady Inn in Chester, AR. Celebrating Arkansas heritage and the native pawpaw aligns with our mission: invest locally, preserve traditions, and build lasting prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e2620]">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-3 h-8 w-8 rounded-lg border border-[#2a4d42] bg-[#123128]" />
            <div className="text-xs tracking-[0.2em] text-[#c4a070]">GEMINI CAPITAL GROUP</div>
          </div>
          <div className="text-sm space-y-2">
            <a href="#about" className="block hover:text-[#c4a070]">About</a>
            <a href="#brands" className="block hover:text-[#c4a070]">Brands</a>
            <a href="#opportunities" className="block hover:text-[#c4a070]">Opportunities</a>
            <a href="#community" className="block hover:text-[#c4a070]">Community</a>
          </div>
          <div className="text-sm text-neutral-300">
            <div>contact@geminicapitalgroup.com</div>
            <div className="opacity-70">Boston Mountains, Arkansas</div>
          </div>
        </div>
        <div className="border-t border-[#1d3a32] py-4 text-center text-xs text-neutral-400">© {new Date().getFullYear()} Gemini Capital Group – Built with pride in the Boston Mountains.</div>
      </footer>

      {/* MODALS */}
      {showPlanModal && (
        <Modal title="Submit a Business Plan" onClose={() => setShowPlanModal(false)}>
          <SubmissionForm onSubmit={() => { setShowPlanModal(false); setToast('Thanks — your plan has been recorded (mock). We review quarterly.'); }} />
        </Modal>
      )}
      {showPoolModal && (
        <Modal title="Join the Investment Pool" onClose={() => setShowPoolModal(false)}>
          <InvestorForm onSubmit={() => { setShowPoolModal(false); setToast('Thanks — we’ll follow up discreetly (mock).'); }} />
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-[#2a4d42] bg-[#102721] px-4 py-2 text-sm text-neutral-200 shadow-lg" onAnimationEnd={() => setTimeout(() => setToast(null), 2400)}>
          {toast}
        </motion.div>
      )}
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-3xl text-[#d4bc99]">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-neutral-300">{subtitle}</p>}
    </div>
  )
}

function BrandCard({ name, blurb, logo }: { name: string; blurb: string; logo: React.ReactNode }) {
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

function ActionCard({ title, body, cta, onClick }: { title: string; body: string; cta: string; onClick: () => void }) {
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#2a4d42] bg-[#0f2721] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="font-serif text-2xl text-[#d4bc99]">{title}</div>
          <button onClick={onClose} className="rounded-full border border-[#3a5d52] px-2 py-1 text-xs hover:bg-[#17362e]">Close</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit();}} className="space-y-4">
      <Input label="Your Name" />
      <Input label="Email" type="email" />
      <Input label="Company Name" />
      <TextArea label="Short Pitch (500 chars)" maxLength={500} rows={4} />
      <div className="text-xs text-neutral-400">Optional file upload can be enabled post-launch.</div>
      <button type="submit" className="btn">Submit</button>
    </form>
  )
}

function InvestorForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit();}} className="space-y-4">
      <Input label="Your Name" />
      <Input label="Email" type="email" />
      <Input label="Organization (optional)" />
      <TextArea label="Interest & Alignment" rows={4} />
      <button type="submit" className="btn">Register Interest</button>
    </form>
  )
}

function Input({ label, type = 'text' }: { label: string; type?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-neutral-300">{label}</span>
      <input type={type} className="w-full rounded-xl border border-[#2a4d42] bg-[#0f2721] px-3 py-2 outline-none focus:border-[#3f6a5c]" />
    </label>
  )
}

function TextArea({ label, rows = 3, maxLength }: { label: string; rows?: number; maxLength?: number }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-neutral-300">{label}</span>
      <textarea rows={rows} maxLength={maxLength} className="w-full rounded-xl border border-[#2a4d42] bg-[#0f2721] px-3 py-2 outline-none focus:border-[#3f6a5c]" />
    </label>
  )
}

function mountainLayers(layers: number, from: string, to: string) {
  const arr: string[] = []
  for (let i = 0; i < layers; i++) {
    const opacity = 0.05 + i * 0.06
    const y = 50 + i * 60
    arr.push(`linear-gradient(to top, ${from}${hexOpacity(opacity)} ${y}px, ${to}00 ${y}px)`)
  }
  return arr.join(',\n')
}

function hexOpacity(opacity: number) {
  const o = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
  return (o | (1 << 8)).toString(16).slice(1)
}
