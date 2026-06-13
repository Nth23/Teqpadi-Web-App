"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type DeviceType = "phone" | "tablet" | "laptop" | null
type Step = 1 | 2 | 3 | 4 | 5 | 6

interface FormData {
  device: DeviceType
  issues: string[]
  deviceHistory: {
    hasBeenOpened: "yes" | "no" | "not_sure" | null
    faceIdWorking: "yes" | "no" | "not_sure" | null
    trueToneWorking: "yes" | "no" | "not_sure" | null
  }
  otherIssues: string
  fullName: string
  phoneNumber: string
  email: string
  heardAbout: string
  repairCenter: string
}

const DEVICE_ISSUES = {
  phone: [
    "Not coming on",
    "Charger port",
    "Screen damage",
    "Battery issues",
    "Speaker/Mic",
    "Network issues",
    "Camera issues",
    "Other",
  ],
  tablet: [
    "Not coming on",
    "Charger port",
    "Screen damage",
    "Battery issues",
    "Speaker/Mic",
    "Network issues",
    "Camera issues",
    "Other",
  ],
  laptop: [
    "Not coming on",
    "Charging port",
    "Screen damage",
    "Battery issues",
    "Keyboard/Trackpad",
    "Network issues",
    "Performance issues",
    "Other",
  ],
}

const HEARD_ABOUT_OPTIONS = ["Instagram", "Google", "Referral", "Returning Customer", "TikTok", "Others"]

export default function RepairPage() {
  const [step, setStep] = useState<Step>(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    device: null,
    issues: [],
    deviceHistory: {
      hasBeenOpened: null,
      faceIdWorking: null,
      trueToneWorking: null,
    },
    otherIssues: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    heardAbout: "",
    repairCenter: "",
  })

  const handleDeviceSelect = (device: DeviceType) => {
    setForm({ ...form, device, issues: [] })
    setStep(2)
  }

  const handleIssueToggle = (issue: string) => {
    setForm(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue]
    }))
  }

  const handleToggleOption = (field: keyof FormData["deviceHistory"], value: "yes" | "no" | "not_sure") => {
    setForm(prev => ({
      ...prev,
      deviceHistory: {
        ...prev.deviceHistory,
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!form.device || form.issues.length === 0 || !form.fullName || !form.phoneNumber) {
      alert("Please fill in all required fields")
      return
    }

    try {
      // Submit form data
      const response = await fetch("/api/repair-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert("Failed to submit repair request")
      }
    } catch (error) {
      console.error("Failed to submit:", error)
      alert("Failed to submit repair request")
    }
  }

  if (submitted) {
    return (
      <div style={{ background: '#f7f4ef' }} className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6" style={{ color: '#5b1fa8' }} />
          <h1 className="text-3xl font-black mb-4" style={{ color: '#0d0a1a' }}>
            Repair Request Received!
          </h1>
          <p className="text-lg mb-8" style={{ color: '#6b6480' }}>
            We&apos;ll reach out to confirm your appointment shortly.
          </p>
          <Button
            onClick={() => window.location.href = "/"}
            style={{ background: '#5b1fa8', color: 'white' }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f7f4ef' }}>
      {/* Header */}
      <div className="py-12" style={{ background: 'linear-gradient(to bottom, #3a0e6e, #2a0850)' }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Book a Repair</h1>
          <p className="text-lg text-white/75">
            Tell us what needs fixing and we&apos;ll get back to you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-8">
          {/* Step 1: Device Selection */}
          {step >= 1 && (
            <div className="p-8 rounded-2xl border-2" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 1: Select Device
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(["phone", "tablet", "laptop"] as const).map(device => (
                  <button
                    key={device}
                    onClick={() => handleDeviceSelect(device)}
                    className="p-6 rounded-xl border-2 transition-all capitalize font-bold text-lg"
                    style={{
                      background: form.device === device ? '#5b1fa8' : 'white',
                      color: form.device === device ? 'white' : '#0d0a1a',
                      borderColor: form.device === device ? '#5b1fa8' : 'rgba(91, 31, 168, 0.2)',
                    }}
                  >
                    {device}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Issue Selection */}
          {step >= 2 && form.device && (
            <div className="p-8 rounded-2xl border-2 animate-in" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 2: Select Issues
              </h2>
              <div className="space-y-2 mb-6">
                {DEVICE_ISSUES[form.device]?.map(issue => (
                  <label key={issue} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={form.issues.includes(issue)}
                      onChange={() => handleIssueToggle(issue)}
                      className="w-5 h-5"
                    />
                    <span style={{ color: '#0d0a1a' }}>{issue}</span>
                  </label>
                ))}
              </div>
              <Button
                type="button"
                onClick={() => form.issues.length > 0 && setStep(3)}
                disabled={form.issues.length === 0}
                className="w-full"
                style={{ background: '#5b1fa8', color: 'white' }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 3: Device History */}
          {step >= 3 && form.device && (
            <div className="p-8 rounded-2xl border-2 animate-in" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 3: Device History
              </h2>
              <div className="space-y-6">
                {/* Has been opened */}
                <div>
                  <p className="font-semibold mb-3" style={{ color: '#0d0a1a' }}>
                    Has the device been opened before?
                  </p>
                  <div className="flex gap-2">
                    {(["yes", "no", "not_sure"] as const).map(val => (
                      <button
                        key={val}
                        onClick={() => handleToggleOption("hasBeenOpened", val)}
                        className="flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition-all capitalize"
                        style={{
                          background: form.deviceHistory.hasBeenOpened === val ? '#5b1fa8' : 'white',
                          color: form.deviceHistory.hasBeenOpened === val ? 'white' : '#0d0a1a',
                          borderColor: form.deviceHistory.hasBeenOpened === val ? '#5b1fa8' : 'rgba(91, 31, 168, 0.2)',
                        }}
                      >
                        {val.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Face ID (hide for laptop) */}
                {form.device !== "laptop" && (
                  <div>
                    <p className="font-semibold mb-3" style={{ color: '#0d0a1a' }}>
                      Face ID working?
                    </p>
                    <div className="flex gap-2">
                      {(["yes", "no", "not_sure"] as const).map(val => (
                        <button
                          key={val}
                          onClick={() => handleToggleOption("faceIdWorking", val)}
                          className="flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition-all capitalize"
                          style={{
                            background: form.deviceHistory.faceIdWorking === val ? '#5b1fa8' : 'white',
                            color: form.deviceHistory.faceIdWorking === val ? 'white' : '#0d0a1a',
                            borderColor: form.deviceHistory.faceIdWorking === val ? '#5b1fa8' : 'rgba(91, 31, 168, 0.2)',
                          }}
                        >
                          {val.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* True Tone (hide for laptop) */}
                {form.device !== "laptop" && (
                  <div>
                    <p className="font-semibold mb-3" style={{ color: '#0d0a1a' }}>
                      True Tone working?
                    </p>
                    <div className="flex gap-2">
                      {(["yes", "no", "not_sure"] as const).map(val => (
                        <button
                          key={val}
                          onClick={() => handleToggleOption("trueToneWorking", val)}
                          className="flex-1 py-2 px-4 rounded-lg border-2 font-semibold transition-all capitalize"
                          style={{
                            background: form.deviceHistory.trueToneWorking === val ? '#5b1fa8' : 'white',
                            color: form.deviceHistory.trueToneWorking === val ? 'white' : '#0d0a1a',
                            borderColor: form.deviceHistory.trueToneWorking === val ? '#5b1fa8' : 'rgba(91, 31, 168, 0.2)',
                          }}
                        >
                          {val.replace("_", " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Other issues */}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0d0a1a' }}>
                    Any other issues?
                  </label>
                  <textarea
                    value={form.otherIssues}
                    onChange={(e) => setForm({ ...form, otherIssues: e.target.value })}
                    placeholder="Describe any additional problems…"
                    className="w-full p-3 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setStep(4)}
                className="w-full mt-6"
                style={{ background: '#5b1fa8', color: 'white' }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 4: Customer Details */}
          {step >= 4 && (
            <div className="p-8 rounded-2xl border-2 animate-in" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 4: Your Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0d0a1a' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0d0a1a' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phoneNumber}
                    onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#0d0a1a' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={() => setStep(5)}
                className="w-full mt-6"
                style={{ background: '#5b1fa8', color: 'white' }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 5: How did you hear about us */}
          {step >= 5 && (
            <div className="p-8 rounded-2xl border-2 animate-in" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 5: How did you hear about us?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {HEARD_ABOUT_OPTIONS.map(option => (
                  <button
                    key={option}
                    onClick={() => setForm({ ...form, heardAbout: option })}
                    className="p-4 rounded-lg border-2 font-semibold transition-all"
                    style={{
                      background: form.heardAbout === option ? '#5b1fa8' : 'white',
                      color: form.heardAbout === option ? 'white' : '#0d0a1a',
                      borderColor: form.heardAbout === option ? '#5b1fa8' : 'rgba(91, 31, 168, 0.2)',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <Button
                type="button"
                onClick={() => setStep(6)}
                className="w-full mt-6"
                style={{ background: '#5b1fa8', color: 'white' }}
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 6: Repair Center */}
          {step >= 6 && (
            <div className="p-8 rounded-2xl border-2 animate-in" style={{ background: 'white', borderColor: 'rgba(91, 31, 168, 0.12)' }}>
              <h2 className="text-2xl font-black mb-6" style={{ color: '#0d0a1a' }}>
                Step 6: Preferred Repair Center
              </h2>
              <select
                value={form.repairCenter}
                onChange={(e) => setForm({ ...form, repairCenter: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border text-base" style={{ borderColor: 'rgba(91, 31, 168, 0.2)' }}
              >
                <option value="">Select Location</option>
                <option value="Island">Island</option>
                <option value="Mainland">Mainland</option>
              </select>

              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-6"
                style={{ background: '#5b1fa8', color: 'white' }}
              >
                Submit Repair Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
