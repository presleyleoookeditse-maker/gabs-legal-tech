'use client'

import { AppLayout } from '@/components/app-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export default function ContactPage() {
  const handleOpenMaps = () => {
    window.open(
      'https://www.google.com/maps/search/Gaborone+Botswana',
      '_blank'
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          Get in touch with our legal team
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card className="bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            Office Information
          </h2>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="mt-1 text-muted-foreground">
                  Plot 1234, Gaborone Business Park
                  <br />
                  Gaborone, Botswana
                </p>
                <Button
                  variant="link"
                  className="mt-2 h-auto p-0 text-primary"
                  onClick={handleOpenMaps}
                >
                  Open in Google Maps
                </Button>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <Phone className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <p className="mt-1 text-muted-foreground">+267 391 23456</p>
                <p className="text-sm text-muted-foreground">
                  Available Monday - Friday
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4">
              <Mail className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="mt-1 text-muted-foreground">
                  info@gabslegaltech.bw
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <Clock className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Hours</h3>
                <p className="mt-1 text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM
                  <br />
                  Saturday: 9:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Message */}
        <Card className="bg-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            Send a Message
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                placeholder="Your message here..."
                rows={4}
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <Button className="w-full">Send Message</Button>
          </div>
        </Card>
      </div>
      </div>
    </AppLayout>
  )
}
