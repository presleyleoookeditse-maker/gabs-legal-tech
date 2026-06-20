'use client'

import { Card } from '@/components/ui/card'

const newsItems = [
  {
    id: '1',
    title: 'New Traffic Law May 2026',
    description:
      'The Botswana Ministry of Transport and Communications has announced new amendments to the Road Traffic Act effective May 15, 2026. These changes affect liability coverage and reporting requirements.',
    date: '2026-05-15',
  },
  {
    id: '2',
    title: 'Court Fees Updated',
    description:
      'The Botswana Court Services has updated filing fees for the 2026 fiscal year. New fee structures now apply to all court submissions and motions effective immediately.',
    date: '2026-05-10',
  },
]

export default function NewsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">News & Updates</h1>
        <p className="mt-2 text-muted-foreground">
          Latest legal news and updates relevant to Botswana law
        </p>
      </div>

      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-BW', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}
