import React, { useState } from 'react'

interface InvestorFormProps {
  onSubmit: () => void
}

export function InvestorForm({ onSubmit }: InvestorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accredited: '',
    experience: '',
    investmentRange: '',
    interests: '',
    referral: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend
    console.log('Investor registration:', formData)
    onSubmit()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-neutral-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-neutral-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm text-neutral-300 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <label htmlFor="accredited" className="block text-sm text-neutral-300 mb-1">
          Accredited Investor Status *
        </label>
        <select
          id="accredited"
          name="accredited"
          required
          value={formData.accredited}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
        >
          <option value="">Select status</option>
          <option value="yes">Yes, I am an accredited investor</option>
          <option value="no">No, I am not an accredited investor</option>
          <option value="unsure">I'm not sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm text-neutral-300 mb-1">
          Investment Experience *
        </label>
        <select
          id="experience"
          name="experience"
          required
          value={formData.experience}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
        >
          <option value="">Select experience</option>
          <option value="first-time">First-time investor</option>
          <option value="some">Some investment experience</option>
          <option value="experienced">Experienced investor</option>
          <option value="professional">Professional investor</option>
        </select>
      </div>

      <div>
        <label htmlFor="investmentRange" className="block text-sm text-neutral-300 mb-1">
          Investment Range *
        </label>
        <select
          id="investmentRange"
          name="investmentRange"
          required
          value={formData.investmentRange}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
        >
          <option value="">Select range</option>
          <option value="5k-25k">$5K - $25K</option>
          <option value="25k-50k">$25K - $50K</option>
          <option value="50k-100k">$50K - $100K</option>
          <option value="100k-250k">$100K - $250K</option>
          <option value="250k+">$250K+</option>
        </select>
      </div>

      <div>
        <label htmlFor="interests" className="block text-sm text-neutral-300 mb-1">
          Investment Interests
        </label>
        <textarea
          id="interests"
          name="interests"
          rows={3}
          value={formData.interests}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070] resize-none"
          placeholder="What types of businesses or sectors interest you most? (optional)"
        />
      </div>

      <div>
        <label htmlFor="referral" className="block text-sm text-neutral-300 mb-1">
          How did you hear about us?
        </label>
        <input
          type="text"
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
          placeholder="e.g., referral, website, event"
        />
      </div>

      <div className="pt-2">
        <p className="text-xs text-neutral-400 mb-4">
          All information is kept strictly confidential. We'll reach out discreetly to qualified investors when suitable opportunities arise.
        </p>
        <button
          type="submit"
          className="w-full btn bg-[#c4a070] text-[#0f2721] hover:bg-[#b8966a] border-[#c4a070] font-medium"
        >
          Register Interest
        </button>
      </div>
    </form>
  )
}