'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar - always visible on desktop */}
      <div className="hidden lg:block w-60 bg-[#111] border-r border-[#222]">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile sidebar - only visible when open on mobile */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Mobile header */}
      <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-[#222] bg-[#0a0a0a] px-4 lg:hidden flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="text-white hover:bg-[#1a1a1a]"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
        <span className="text-lg font-bold text-green-500">Gabs Legal Tech</span>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
