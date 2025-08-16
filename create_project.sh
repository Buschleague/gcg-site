#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/Buschleague/gcg-site"
DEFAULT_BRANCH="main"

echo "==> Checking prerequisites..."
for cmd in node npm git; do
  command -v "$cmd" >/dev/null 2>&1 || { echo "Missing $cmd. Please install it and re-run."; exit 1; }
done

echo "==> Initializing project files in $(pwd)"

mkdir -p src src/assets .github/workflows

# --- package.json ---
cat > package.json <<'JSON'
{
  "name": "gemini-capital-group",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "echo \"(optional)\"",
    "postinstall": "echo You can remove this."
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
JSON

# --- tsconfig ---
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["src"]
}
JSON

# --- vite.config.ts ---
cat > vite.config.ts <<'TS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: Set base to '/<repo>/' on GitHub Pages project sites.
// The workflow supplies VITE_BASE automatically for you.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
})
TS

# --- index.html ---
cat > index.html <<'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Gemini Capital Group — Rooted in equality. Growing the Boston Mountain community." />
    <title>Gemini Capital Group</title>
  </head>
  <body class="bg-[#0f2a23]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

# --- Tailwind/PostCSS ---
cat > postcss.config.cjs <<'CJS'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
CJS

cat > tailwind.config.cjs <<'CJS'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif','Georgia','serif'],
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial','sans-serif']
      },
    },
  },
  plugins: [],
};
CJS

# --- src/main.tsx ---
cat > src/main.tsx <<'TS'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
TS

# --- src/styles.css ---
cat > src/styles.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn { @apply rounded-xl bg-[#17362e] border border-[#3a5d52] px-4 py-2 text-sm text-neutral-200 hover:bg-[#1b3f35]; }
.btn-outline { @apply bg-transparent text-neutral-200 hover:bg-[#17362e]; }
.btn-ghost { @apply border-transparent bg-transparent hover:bg-[#17362e]; }
CSS

# --- src/App.tsx ---
cat > src/App.tsx <<'TSX'
import React, { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function App() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [heroImg, setHeroImg] = useState<string | null>(null)
  const [overlay, setOverlay] = useState(0.45)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showPoolModal, setShowPoolModal] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const handlePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => setHeroImg(reader.result as string)
    reader.readAsDataURL(f)
  }

  const fallbackBg = useMemo(() => ({
    backgroundImage:
      `radial-gradient(1200px 600px at 50% -200px, rgba(25,58,50,0.7), rgba(15,42,35,1)),` +
      mountainLayers(6, '#0b1f1a', '#0f2a23'),
    backgroundBlendMode: 'overlay, normal',
  }), [])

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

      {/* FULL-BLEED HERO */}
      <section className="relative min-h-[92vh]">
        {/* Background */}
        {heroImg ? (
          <div className="absolute inset-0 z-0 bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'contain' }} />
        ) : (
          <div className="absolute inset-0 z-0 pointer-events-none" style={fallbackBg as any} />
        )}
        {/* Global scrim (low) */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background:
            `radial-gradient(1200px 600px at 50% -200px, rgba(15,42,35,${overlay - 0.15}), rgba(15,42,35,${overlay})),` +
            `linear-gradient(to bottom, rgba(15,42,35,${overlay}) 0%, rgba(15,42,35,${overlay + 0.1}) 60%, rgba(15,42,35,${overlay + 0.2}) 100%)`,
        }} />

        {/* Controls */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-4 flex items-center justify-end gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePick} className="hidden" />
          <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-[#3a5d52] bg-[#152f28] px-3 py-1.5 text-xs text-[#c4a070] hover:bg-[#19382f]">Choose Hero Image</button>
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <span>Overlay</span>
            <input type="range" min={0.3} max={0.9} step={0.05} value={overlay} onChange={(e)=>setOverlay(parseFloat(e.target.value))} className="w-28 accent-[#c4a070]" />
          </div>
        </div>

        {/* Copy block – positioned to preserve full logo visibility */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 min-h-[70vh]">
          <div className="absolute left-4 right-4 bottom-16 md:left-8 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative max-w-xl md:max-w-2xl">
              {/* Localized scrim */}
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
        <SectionHeader title="Investing in Growth" subtitle="A small, focused portfolio we can stand behind." />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <BrandCard name="Your Brand Here" blurb="Add your wife's companies to showcase current backing." />
          <BrandCard name="Second Brand" blurb="Short 1–2 sentence descriptor with a link." />
          <AddBrandCard />
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

function BrandCard({ name, blurb }: { name: string; blurb: string }) {
  return (
    <div className="rounded-2xl border border-[#24463d] bg-[#102721] p-5 hover:bg-[#123128] transition">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg border border-[#2a4d42] bg-[#133127]" />
        <div>
          <div className="text-[#c4a070] font-medium">{name}</div>
          <div className="text-sm text-neutral-300/90">{blurb}</div>
        </div>
      </div>
      <button className="mt-4 btn btn-outline">Visit Website</button>
    </div>
  )
}

function AddBrandCard() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-[#2a4d42] p-5 text-center text-sm text-neutral-300">Add another brand card here as your portfolio grows.</div>
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
TSX

# --- .gitignore ---
cat > .gitignore <<'IGN'
node_modules
dist
.DS_Store
.env
IGN

# --- GitHub Actions: deploy to Pages ---
cat > .github/workflows/deploy.yml <<'YML'
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install
        run: npm ci || npm i

      - name: Set base for GH Pages
        run: echo "VITE_BASE=/${{ github.event.repository.name }}/" >> $GITHUB_ENV

      - name: Build
        env:
          VITE_BASE: "/${{ github.event.repository.name }}/"
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
YML

# --- README ---
cat > README.md <<'MD'
# Gemini Capital Group — Site (React + Vite)

Minimal, austere landing site with a full-bleed hero image, localized scrim for readability, and simple sections.

## Dev
```bash
npm i
npm run dev
Open http://localhost:5173

Deploy (GitHub Pages)
Push to main. The included workflow builds and publishes automatically.

Ensure GitHub → Settings → Pages → Source = GitHub Actions.
MD

echo "==> Installing dependencies (this may take a minute)..."
npm i >/dev/null 2>&1

echo "==> Initializing git repo..."
if [ ! -d .git ]; then
git init
fi
git checkout -B "$DEFAULT_BRANCH"

Set remote if not set
if ! git remote | grep -q '^origin$'; then
git remote add origin "$REPO_URL" || true
fi

git add -A
git commit -m "chore: initial commit (Vite+React+TS, Tailwind, hero, GH Pages)"
git push -u origin "$DEFAULT_BRANCH"

echo "==> Done."
echo "If Pages isn't enabled yet, go to GitHub → Settings → Pages and set Source to 'GitHub Actions'."
echo "Your site will publish to: https://$(git config --get remote.origin.url | sed -E 's#https?://github.com/([^/]+)/([^/.]+).*#\1.github.io/\2/#')"