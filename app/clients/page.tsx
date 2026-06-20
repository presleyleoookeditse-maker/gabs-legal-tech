'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'

export default function ClientsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Clients</h1>

        <Button className="bg-[#00FF88] text-black hover:bg-[#00DD77]">
          Login as Demo Client
        </Button>

        <div className="bg-[#1a1a1a] rounded-lg p-8 border border-[#222]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Client Portal - Demo User</h2>
            <div className="space-y-2">
              <p className="text-gray-400">Your Case: <span className="text-white font-bold">GLT-001 Land Dispute</span></p>
              <p className="text-gray-400">Next Hearing: <span className="text-white font-bold">20 May 2026</span></p>
              <p className="text-gray-400">Status: <span className="text-green-400 font-bold">Active</span></p>
              <p className="text-gray-400">Messages: <span className="text-white font-bold">2 new updates</span></p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
