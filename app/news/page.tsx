'use client'

import { AppLayout } from '@/components/app-layout'
import { Newspaper } from 'lucide-react'

const news = [
  { id: '1', title: 'New Traffic Law May 2026', description: 'The Botswana government announced new traffic regulations effective from June 2026.' },
  { id: '2', title: 'Court Fees Updated', description: 'Court filing fees have been updated. Check the latest rates on the High Court website.' },
]

export default function NewsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">News & Updates</h1>

        <div className="grid gap-4">
          {news.map((item) => (
            <div key={item.id} className="bg-[#1a1a1a] rounded-lg p-6 border border-[#222]">
              <div className="flex items-start gap-3 mb-3">
                <Newspaper className="h-5 w-5 text-[#00FF88] mt-1 flex-shrink-0" />
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
