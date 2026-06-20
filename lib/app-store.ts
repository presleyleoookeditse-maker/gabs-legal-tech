import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DocumentType = 'nda' | 'lease' | 'invoice'
export type CaseStatus = 'active' | 'closed' | 'pending'
export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled'
export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue'

export interface GeneratedDocument {
  id: string
  type: DocumentType
  title: string
  createdAt: string
  data: Record<string, string>
}

export interface Case {
  id: string
  caseNumber: string
  clientName: string
  caseType: string
  nextHearing: string
  status: CaseStatus
  summary: string
  documents: string[]
  notes: string[]
}

export interface Appointment {
  id: string
  date: string
  time: string
  clientName: string
  caseType: string
  status: AppointmentStatus
}

export interface Invoice {
  id: string
  amount: number
  description: string
  status: InvoiceStatus
  dateCreated: string
  daysOverdue?: number
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  caseNumber: string
}

export interface FirmSettings {
  firmName: string
  logoUrl: string
  currency: string
}

interface AppStore {
  // Documents
  documents: GeneratedDocument[]
  addDocument: (doc: Omit<GeneratedDocument, 'id' | 'createdAt'>) => void
  clearHistory: () => void

  // Cases
  cases: Case[]
  addCase: (caseData: Omit<Case, 'id'>) => void
  updateCase: (id: string, updates: Partial<Case>) => void

  // Appointments
  appointments: Appointment[]
  addAppointment: (apt: Omit<Appointment, 'id'>) => void
  updateAppointment: (id: string, updates: Partial<Appointment>) => void

  // Invoices
  invoices: Invoice[]
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void
  updateInvoice: (id: string, updates: Partial<Invoice>) => void

  // Clients
  clients: Client[]
  addClient: (client: Omit<Client, 'id'>) => void

  // Firm Settings
  firmSettings: FirmSettings
  updateFirmSettings: (settings: Partial<FirmSettings>) => void
}

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'GLT-001',
    clientName: 'Mr Dube Thabo vs ABC Properties',
    caseType: 'Land Dispute',
    nextHearing: '2026-05-20',
    status: 'active',
    summary: 'Property boundary dispute between client and neighboring property developer.',
    documents: ['deed.pdf', 'correspondence.pdf'],
    notes: ['First hearing scheduled', 'Evidence submitted'],
  },
]

const mockAppointments: Appointment[] = [
  {
    id: '1',
    date: '2026-05-18',
    time: '10:00',
    clientName: 'Mrs Kago Motswedi',
    caseType: 'Land Dispute',
    status: 'confirmed',
  },
  {
    id: '2',
    date: '2026-05-20',
    time: '14:00',
    clientName: 'Mr Dube Thabo',
    caseType: 'Case Review',
    status: 'pending',
  },
  {
    id: '3',
    date: '2026-05-22',
    time: '09:00',
    clientName: 'New Client',
    caseType: 'Consultation',
    status: 'confirmed',
  },
]

const mockInvoices: Invoice[] = [
  {
    id: '1',
    amount: 1500,
    description: 'Consultation Fee',
    status: 'paid',
    dateCreated: '2026-04-15',
  },
  {
    id: '2',
    amount: 2000,
    description: 'Filing Fees',
    status: 'unpaid',
    dateCreated: '2026-05-01',
  },
  {
    id: '3',
    amount: 3000,
    description: 'Court Fees',
    status: 'overdue',
    dateCreated: '2026-05-09',
    daysOverdue: 7,
  },
]

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Mr Dube Thabo',
    email: 'dube@example.com',
    phone: '+267 71234567',
    caseNumber: 'GLT-001',
  },
  {
    id: '2',
    name: 'Mrs Kago Motswedi',
    email: 'kago@example.com',
    phone: '+267 72345678',
    caseNumber: 'GLT-002',
  },
]

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Documents
      documents: [],
      addDocument: (doc) =>
        set((state) => ({
          documents: [
            {
              ...doc,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.documents,
          ],
        })),
      clearHistory: () => set({ documents: [] }),

      // Cases
      cases: mockCases,
      addCase: (caseData) =>
        set((state) => ({
          cases: [
            {
              ...caseData,
              id: crypto.randomUUID(),
            },
            ...state.cases,
          ],
        })),
      updateCase: (id, updates) =>
        set((state) => ({
          cases: state.cases.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),

      // Appointments
      appointments: mockAppointments,
      addAppointment: (apt) =>
        set((state) => ({
          appointments: [
            {
              ...apt,
              id: crypto.randomUUID(),
            },
            ...state.appointments,
          ],
        })),
      updateAppointment: (id, updates) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      // Invoices
      invoices: mockInvoices,
      addInvoice: (invoice) =>
        set((state) => ({
          invoices: [
            {
              ...invoice,
              id: crypto.randomUUID(),
            },
            ...state.invoices,
          ],
        })),
      updateInvoice: (id, updates) =>
        set((state) => ({
          invoices: state.invoices.map((i) =>
            i.id === id ? { ...i, ...updates } : i
          ),
        })),

      // Clients
      clients: mockClients,
      addClient: (client) =>
        set((state) => ({
          clients: [
            {
              ...client,
              id: crypto.randomUUID(),
            },
            ...state.clients,
          ],
        })),

      // Firm Settings
      firmSettings: {
        firmName: 'Gabs Legal Tech',
        logoUrl: '/logo.png',
        currency: 'BWP',
      },
      updateFirmSettings: (settings) =>
        set((state) => ({
          firmSettings: { ...state.firmSettings, ...settings },
        })),
    }),
    {
      name: 'gabs-legal-app',
    }
  )
)
