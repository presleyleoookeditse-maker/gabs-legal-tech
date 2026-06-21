'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Clock, Plus, X } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=Gaborone,Botswana', '_blank')
  }

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      console.log('New contact inquiry:', formData)
      alert(`Thank you ${formData.name}! Your message has been sent. We will get back to you soon.`)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setShowModal(false)
    } else {
      alert('Please fill in all required fields')
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Contact</h1>
          <Button onClick={() => setShowModal(true)} className="gap-2 bg-[#00FF88] text-black hover:bg-[#00DD77]">
            <Plus className="h-4 w-4" />
            New Contact
          </Button>
        </div>

        {/* New Contact Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222] w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88]"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#222] rounded px-3 py-2 text-white focus:outline-none focus:border-[#00FF88] min-h-[120px] resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={() => setShowModal(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 bg-[#00FF88] text-black hover:bg-[#00DD77]">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#222] space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-[#00FF88] mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-400 mb-1">Office Address</p>
              <p className="text-white">Gabs Legal Tech<br />Gaborone, Botswana</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-[#00FF88] mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-400 mb-1">Phone</p>
              <p className="text-white">+267 71 234 567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="h-6 w-6 text-[#00FF88] mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-400 mb-1">Business Hours</p>
              <p className="text-white">Monday - Friday: 8:00am - 5:00pm<br />Saturday: 9:00am - 1:00pm</p>
            </div>
          </div>

          <Button onClick={handleOpenMaps} className="w-full bg-[#00FF88] text-black hover:bg-[#00DD77]">
            Open Google Maps
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
