import React, { useState } from 'react'

interface SubmissionFormProps {
  onSubmit: () => void
}

export function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    stage: '',
    summary: '',
    funding: '',
    timeline: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this data to your backend
    console.log('Business plan submission:', formData)
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
        <label htmlFor="company" className="block text-sm text-neutral-300 mb-1">
          Company/Project Name *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
          placeholder="Your business name"
        />
      </div>

      <div>
        <label htmlFor="stage" className="block text-sm text-neutral-300 mb-1">
          Business Stage *
        </label>
        <select
          id="stage"
          name="stage"
          required
          value={formData.stage}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
        >
          <option value="">Select stage</option>
          <option value="idea">Idea/Concept</option>
          <option value="mvp">MVP/Prototype</option>
          <option value="early-revenue">Early Revenue</option>
          <option value="growth">Growth Stage</option>
          <option value="established">Established</option>
        </select>
      </div>

      <div>
        <label htmlFor="funding" className="block text-sm text-neutral-300 mb-1">
          Funding Sought
        </label>
        <input
          type="text"
          id="funding"
          name="funding"
          value={formData.funding}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
          placeholder="e.g., $50K - $200K"
        />
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm text-neutral-300 mb-1">
          Timeline
        </label>
        <input
          type="text"
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070]"
          placeholder="e.g., Q2 2025"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm text-neutral-300 mb-1">
          Business Summary *
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={4}
          value={formData.summary}
          onChange={handleChange}
          className="w-full rounded-lg border border-[#3a5d52] bg-[#0f2721] px-3 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:border-[#c4a070] focus:outline-none focus:ring-1 focus:ring-[#c4a070] resize-none"
          placeholder="Brief description of your business, market opportunity, and what makes it compelling..."
        />
      </div>

      <div className="pt-2">
        <p className="text-xs text-neutral-400 mb-4">
          We review submissions quarterly. You'll receive confirmation within 2 business days and a decision within 6 weeks of our next review cycle.
        </p>
        <button
          type="submit"
          className="w-full btn bg-[#c4a070] text-[#0f2721] hover:bg-[#b8966a] border-[#c4a070] font-medium"
        >
          Submit Business Plan
        </button>
      </div>
    </form>
  )
}