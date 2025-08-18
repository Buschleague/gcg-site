import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Components
import { SectionHeader } from './components/SectionHeader'
import { BrandCard } from './components/BrandCard'
import { ActionCard } from './components/ActionCard'
import { Modal } from './components/Modal'
import { SubmissionForm } from './components/forms/SubmissionForm'
import { InvestorForm } from './components/forms/InvestorForm'

// Utils
import { mountainLayers } from './utils/mountainLayers'

// Assets - Hero is required
import heroImage from './assets/GeminiCG.png'

// Optional assets using glob pattern
const assets = import.meta.glob('./assets/*', { eager: true, as: 'url' }) as Record<string, string | undefined>
const handcrafted = assets['./assets/handcrafted.png'] as string | undefined
const ozarkLogo = assets['./assets/ozark.jpg'] as string | undefined
const sparkleLogo = (assets['./assets/sparkle-logo.jpeg'] || assets['./assets/sparkle-logo.jpg']) as string | undefined

// Logo Component for reuse in header and footer
function Logo({ size = 'default' }: { size?: 'default' | 'small' }) {
  const sizeClasses = size === 'small' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm'

  return (
    <div className={`${sizeClasses} rounded-lg border border-[#2a4d42] bg-gradient-to-br from-[#1a4038] to-[#123128] flex items-center justify-center font-serif text-[#c4a070] font-bold`}>
      GC
    </div>
  )
}

export default function App() {
  // Fixed overlay settings
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

  const handlePlanSubmit = () => {
    setShowPlanModal(false)
    showToast('Thanks — your plan has been recorded. We review quarterly.')
  }

  const handleInvestorSubmit = () => {
    setShowPoolModal(false)
    showToast('Thanks — we will follow up discreetly.')
  }

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen w-full bg-[#0f2a23] text-neutral-200 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur bg-[#0f2a23]/70 border-b border-[#1c3a31]">
        <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="tracking-[0.18em] text-sm text-[#c4a070] hidden sm:inline">GEMINI CAPITAL GROUP</span>
            <span className="tracking-[0.18em] text-sm text-[#c4a070] sm:hidden">GCG</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-[#c4a070] transition-colors">About</a>
            <a href="#brands" className="hover:text-[#c4a070] transition-colors">Brands</a>
            <a href="#opportunities" className="hover:text-[#c4a070] transition-colors">Opportunities</a>
            <a href="#community" className="hover:text-[#c4a070] transition-colors">Community</a>
          </div>
          <button
            onClick={() => setShowPlanModal(true)}
            className="rounded-xl border border-[#3a5d52] px-3 py-1.5 text-xs hover:bg-[#19382f] transition-colors"
          >
            Submit Plan
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh]">
        {/* Background hero image */}
        <div
          className="absolute inset-0 z-0 bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'contain' }}
        />
        {/* Texture backdrop */}
        <div className="absolute inset-0 z-[-1] pointer-events-none" style={fallbackBg} />
        {/* Global scrim for readability */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              `radial-gradient(1200px 600px at 50% -200px, rgba(15,42,35,${overlay - 0.15}), rgba(15,42,35,${overlay})),` +
              `linear-gradient(to bottom, rgba(15,42,35,${overlay}) 0%, rgba(15,42,35,${overlay + 0.1}) 60%, rgba(15,42,35,${overlay + 0.2}) 100%)`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 min-h-[70vh]">
          <div className="absolute left-4 bottom-8 sm:left-8 sm:bottom-16 md:left-8 md:bottom-24 md:top-auto md:translate-y-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[40%]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Localized scrim behind text */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0d241e]/80 to-[#0d241e]/50 backdrop-blur-sm border border-[#24463d]/70 shadow-xl shadow-black/30"
              />
              <div className="relative rounded-3xl p-6 md:p-8">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-wide text-[#d4bc99] drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                  Rooted in equality.<br/>Growing the Boston Mountain community.
                </h1>
                <p className="mt-4 max-w-xl text-sm text-neutral-200/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  Strategic investments that strengthen our local heritage.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#brands" className="btn">View Our Brands</a>
                  <button onClick={() => setShowPlanModal(true)} className="btn btn-outline">
                    Submit a Business Plan
                  </button>
                  <button onClick={() => setShowPoolModal(true)} className="btn btn-ghost">
                    Join the Investment Pool
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title="Deep Roots. Shared Vision." />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[#24463d] bg-[#102721] p-6">
            <p className="text-sm leading-7 text-neutral-300">
              Gemini Capital Group is a family-run investment partner focused on the Boston Mountain region.
              As two Geminis, we believe in equal partnership and decisions that stay connected to our roots:
              stewardship, clarity, and long-horizon thinking. We back disciplined founders and enduring brands
              that strengthen our community.
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

      {/* BRANDS SECTION */}
      <section id="brands" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader
          title="Investing in Growth"
          subtitle="A focused portfolio we can stand behind."
        />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <BrandCard
            name="Handcrafted by Ashley"
            blurb="Local artisan soap & crafts that support the Boston Mountain community."
            logo={
              handcrafted ? (
                <img
                  src={handcrafted}
                  alt="Handcrafted by Ashley logo"
                  className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127] grid place-items-center text-[10px] text-[#c4a070] font-bold">
                  HBA
                </div>
              )
            }
          />
          <BrandCard
            name="Sparkle Squad"
            blurb="Cleaning services tailored to short-term rental owners across the Boston Mountains."
            logo={
              sparkleLogo ? (
                <img
                  src={sparkleLogo}
                  alt="Sparkle Squad logo"
                  className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127] grid place-items-center text-[10px] text-[#c4a070] font-bold">
                  SS
                </div>
              )
            }
          />
          <BrandCard
            name="Ozark Events Hub"
            blurb="Curating and promoting cultural happenings that celebrate the spirit of the Ozarks."
            logo={
              ozarkLogo ? (
                <img
                  src={ozarkLogo}
                  alt="Ozark Events Hub logo"
                  className="h-10 w-10 rounded-lg border border-[#2a4d42] object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127] grid place-items-center text-[10px] text-[#c4a070] font-bold">
                  OEH
                </div>
              )
            }
          />
        </div>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section id="opportunities" className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeader title="Partner With Us" />
        <div className="grid gap-6 md:grid-cols-2">
          <ActionCard
            title="Submit a Business Plan"
            body="We review opportunities quarterly and focus on durable value, cash flow fundamentals, and community impact."
            cta="Open Submission Form"
            onClick={() => setShowPlanModal(true)}
          />
          <ActionCard
            title="Join the Investment Pool"
            body="For aligned partners who value patient, principled capital. Register interest and we'll follow up discreetly."
            cta="Open Investor Form"
            onClick={() => setShowPoolModal(true)}
          />
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section id="community" className="border-y border-[#1d3a32] bg-[#132c25]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader title="Community Commitment" />
          <div className="rounded-3xl border border-[#24463d] bg-[#0f2721] p-6">
            <p className="text-sm leading-7 text-neutral-300">
              <strong className="text-[#c4a070]">Gold Sponsor – Boston Mountain Pawpaw Festival:</strong> We're
              honored to support the 2025 festival at the Beard & Lady Inn in Chester, AR. Celebrating Arkansas
              heritage and the native pawpaw aligns with our mission: invest locally, preserve traditions, and
              build lasting prosperity.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e2620]">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Logo />
              <div className="text-xs tracking-[0.2em] text-[#c4a070]">GEMINI CAPITAL GROUP</div>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <a href="#about" className="block hover:text-[#c4a070] transition-colors">About</a>
            <a href="#brands" className="block hover:text-[#c4a070] transition-colors">Brands</a>
            <a href="#opportunities" className="block hover:text-[#c4a070] transition-colors">Opportunities</a>
            <a href="#community" className="block hover:text-[#c4a070] transition-colors">Community</a>
          </div>
          <div className="text-sm text-neutral-300">
            <div>contact@geminicapitalgroup.com</div>
            <div className="opacity-70">Boston Mountains, Arkansas</div>
          </div>
        </div>
        <div className="border-t border-[#1d3a32] py-4 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} Gemini Capital Group – Built with pride in the Boston Mountains.
        </div>
      </footer>

      {/* MODALS */}
      {showPlanModal && (
        <Modal title="Submit a Business Plan" onClose={() => setShowPlanModal(false)}>
          <SubmissionForm onSubmit={handlePlanSubmit} />
        </Modal>
      )}
      {showPoolModal && (
        <Modal title="Join the Investment Pool" onClose={() => setShowPoolModal(false)}>
          <InvestorForm onSubmit={handleInvestorSubmit} />
        </Modal>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-[#2a4d42] bg-[#102721] px-4 py-2 text-sm text-neutral-200 shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </div>
  )
}