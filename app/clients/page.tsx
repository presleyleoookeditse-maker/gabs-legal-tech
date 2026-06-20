'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function ClientsPage() {
  const { clients, addClient } = useAppStore()
  const [showPortal, setShowPortal] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleAddClient = () => {
    if (formData.name && formData.email) {
      addClient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        caseNumber: `GLT-${Math.floor(Math.random() * 1000)}`,
      })
      setFormData({ name: '', email: '', phone: '' })
      setShowNewForm(false)
    }
  }

  if (showNewForm) {
    return (
      <AppLayout>
        <div className="max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Add New Client</h1>
            <Button
              variant="outline"
              onClick={() => setShowNewForm(false)}
            >
              Cancel
            </Button>
          </div>

          <Card className="bg-card p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="Client full name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
                  placeholder="+267 71 234567"
                />
              </div>

              <Button
                onClick={handleAddClient}
                className="w-full"
              >
                Add Client
              </Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    )
  }

  if (showPortal) {
    return (
      <main className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Client Portal - Demo User</h1>
          <Button
            variant="outline"
            onClick={() => setShowPortal(false)}
          >
            Back to Clients
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Your Case</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Case Number</p>
                <p className="font-semibold text-foreground">GLT-001</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Case Type</p>
                <p className="font-semibold text-foreground">Land Dispute</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold text-primary">Active</p>
              </div>
            </div>
          </Card>

          <Card className="bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Next Hearing</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-semibold text-foreground">
                  20 May 2026, 9:00 AM
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold text-foreground">High Court of Botswana</p>
              </div>
            </div>
          </Card>

          <Card className="bg-card p-6 md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Updates</h2>
            <div className="space-y-3">
              <div className="border-l-2 border-primary py-2 pl-4">
                <p className="font-medium text-foreground">Evidence submitted</p>
                <p className="text-sm text-muted-foreground">15 May 2026</p>
              </div>
              <div className="border-l-2 border-primary py-2 pl-4">
                <p className="font-medium text-foreground">First hearing scheduled</p>
                <p className="text-sm text-muted-foreground">10 May 2026</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Clients</h1>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => setShowNewForm(true)}
        >
          <Plus className="h-4 w-4" />
          New Client
        </Button>
      </div>

      <div className="space-y-4">
        {clients.length > 0 ? (
          clients.map((client) => (
            <Card
              key={client.id}
              className="bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {client.name}
                  </h3>
                  <p className="mt-1 text-muted-foreground">{client.email}</p>
                  <p className="text-sm text-muted-foreground">{client.phone}</p>
                  <p className="mt-2 text-sm font-medium text-primary">
                    Case: {client.caseNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPortal(true)}
                >
                  View Portal
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-card p-6 text-center">
            <p className="text-muted-foreground">No clients yet</p>
          </Card>
        )}
      </div>

      <Card className="border-dashed border-primary/50 bg-primary/5 p-6 text-center">
        <Button
          size="lg"
          onClick={() => setShowPortal(true)}
        >
          Login as Demo Client
        </Button>
      </Card>
      </div>
    </AppLayout>
  )
}
