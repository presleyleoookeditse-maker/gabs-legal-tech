"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User, Phone, Mail, Scale, FileText, CheckCircle, Loader2 } from "lucide-react"

const caseTypes = [
  "Business Formation",
  "Contract Review",
  "Employment Law",
  "Family Law",
  "Real Estate",
  "Intellectual Property",
  "Litigation",
  "Immigration",
  "Tax Law",
  "Estate Planning",
  "Other",
]

export default function ClientIntakePage() {
  const [formData, setFormData] = useState({
    clientName: "",
    phoneNumber: "",
    email: "",
    caseType: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl bg-card p-8 text-center shadow-lg sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Thank You!</h2>
            <p className="mt-4 text-muted-foreground">
              Your inquiry has been submitted successfully. Our team will review your
              information and get back to you within 24-48 hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  clientName: "",
                  phoneNumber: "",
                  email: "",
                  caseType: "",
                  description: "",
                })
              }}
              className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Intake</h1>
          <p className="mt-2 text-muted-foreground">
            Submit your legal inquiry and our team will get back to you
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl bg-card p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-foreground">
                Client Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="clientName"
                  required
                  placeholder="Enter your full name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-foreground">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+267 7X XXX XXX"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Case Type */}
            <div className="space-y-2">
              <Label htmlFor="caseType" className="text-foreground">
                Case Type <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Select
                  required
                  value={formData.caseType}
                  onValueChange={(value) => setFormData({ ...formData, caseType: value })}
                >
                  <SelectTrigger className="border-border bg-background pl-10 text-foreground">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {caseTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-foreground">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description / Message
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="description"
                  placeholder="Describe your legal matter or inquiry..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-border bg-background pl-10 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </Button>
          </form>
        </div>

        {/* Info Note */}
        <p className="text-center text-sm text-muted-foreground">
          Your information is securely stored. We typically respond within 24-48 hours.
        </p>
      </div>
    </AppLayout>
  )
}
