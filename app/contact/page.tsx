'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=Gaborone,Botswana', '_blank')
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Contact</h1>

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
