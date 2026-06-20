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

export interface DocumentTemplate {
  id: string
  name: string
  category: 'letter' | 'affidavit' | 'agreement' | 'notice'
  content: string
  fields: string[]
}

export interface BillableEntry {
  id: string
  caseId: string
  description: string
  hours: number
  hourlyRate: number
  total: number
  date: string
}

export interface CaseTask {
  id: string
  caseId: string
  title: string
  dueDate: string
  description: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

export interface CaseNote {
  id: string
  caseId: string
  content: string
  source: 'manual' | 'whatsapp' | 'voice'
  createdAt: string
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

  // Document Templates
  templates: DocumentTemplate[]
  addTemplate: (template: Omit<DocumentTemplate, 'id'>) => void

  // Billable Hours
  billableEntries: BillableEntry[]
  addBillableEntry: (entry: Omit<BillableEntry, 'id'>) => void
  updateBillableEntry: (id: string, updates: Partial<BillableEntry>) => void

  // Case Tasks
  caseTasks: CaseTask[]
  addCaseTask: (task: Omit<CaseTask, 'id'>) => void
  updateCaseTask: (id: string, updates: Partial<CaseTask>) => void
  addAutoTasksForCase: (caseId: string, caseType: string) => void

  // Case Notes
  caseNotes: CaseNote[]
  addCaseNote: (note: Omit<CaseNote, 'id' | 'createdAt'>) => void
}

const mockCases: Case[] = []

const mockAppointments: Appointment[] = []

const mockInvoices: Invoice[] = []

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

const mockTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Letter of Demand',
    category: 'letter',
    fields: ['client_name', 'case_number', 'defendant_name', 'amount', 'due_date'],
    content: `Dear {{defendant_name}},

RE: Demand for Payment - Case {{case_number}}

This is a formal demand for payment of P{{amount}} due under our agreement dated [date].

Please remit full payment within {{due_date}} days of this letter.

Yours faithfully,
[Law Firm Name]`,
  },
  {
    id: '2',
    name: 'Affidavit of Facts',
    category: 'affidavit',
    fields: ['deponent_name', 'case_number', 'facts'],
    content: `I, {{deponent_name}}, do hereby make oath and say as follows:

1. I am a party in Case {{case_number}}.
2. The following facts are true to my knowledge:
   {{facts}}

Signed at Gaborone on this [date].

{{deponent_name}}`,
  },
  {
    id: '3',
    name: 'Lease Termination Notice',
    category: 'notice',
    fields: ['tenant_name', 'property_address', 'effective_date'],
    content: `NOTICE OF TERMINATION

To: {{tenant_name}}
Property: {{property_address}}

This is formal notice that your tenancy is terminated effective {{effective_date}}.

Please vacate the premises and return keys by the date above.

Issued by: [Law Firm Name]
Date: [Today's Date]`,
  },
]

// Case type → Auto-generated tasks template
const taskTemplates: Record<string, Array<{ title: string; daysUntil: number; description: string }>> = {
  'Land Dispute': [
    { title: 'File Application', daysUntil: 14, description: 'Lodge case with Land Board' },
    { title: 'Serve Notice', daysUntil: 7, description: 'Serve defendant with case documents' },
    { title: 'File Reply', daysUntil: 21, description: 'File response to defendant reply' },
    { title: 'Prepare for Hearing', daysUntil: 5, description: 'Final preparation before hearing' },
  ],
  'Contract Dispute': [
    { title: 'Demand Letter', daysUntil: 3, description: 'Send formal demand for payment' },
    { title: 'File Case', daysUntil: 14, description: 'File claim in court' },
    { title: 'Serve Documents', daysUntil: 7, description: 'Serve defendant with documents' },
  ],
  'Criminal': [
    { title: 'Bail Application', daysUntil: 1, description: 'Prepare bail application' },
    { title: 'Disclosure Request', daysUntil: 5, description: 'Request disclosure from prosecutor' },
    { title: 'Preliminary Review', daysUntil: 10, description: 'Review case file and evidence' },
  ],
}

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

      // Document Templates
      templates: mockTemplates,
      addTemplate: (template) =>
        set((state) => ({
          templates: [
            {
              ...template,
              id: crypto.randomUUID(),
            },
            ...state.templates,
          ],
        })),

      // Billable Hours
      billableEntries: [],
      addBillableEntry: (entry) =>
        set((state) => ({
          billableEntries: [
            {
              ...entry,
              id: crypto.randomUUID(),
            },
            ...state.billableEntries,
          ],
        })),
      updateBillableEntry: (id, updates) =>
        set((state) => ({
          billableEntries: state.billableEntries.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),

      // Case Tasks
      caseTasks: [],
      addCaseTask: (task) =>
        set((state) => ({
          caseTasks: [
            {
              ...task,
              id: crypto.randomUUID(),
            },
            ...state.caseTasks,
          ],
        })),
      updateCaseTask: (id, updates) =>
        set((state) => ({
          caseTasks: state.caseTasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      addAutoTasksForCase: (caseId, caseType) =>
        set((state) => {
          const templates = taskTemplates[caseType] || []
          const today = new Date()
          const newTasks = templates.map((t) => ({
            id: crypto.randomUUID(),
            caseId,
            title: t.title,
            description: t.description,
            completed: false,
            priority: 'high' as const,
            dueDate: new Date(today.getTime() + t.daysUntil * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0],
          }))
          return {
            caseTasks: [...newTasks, ...state.caseTasks],
          }
        }),

      // Case Notes
      caseNotes: [],
      addCaseNote: (note) =>
        set((state) => ({
          caseNotes: [
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...state.caseNotes,
          ],
        })),
    }),
    {
      name: 'gabs-legal-app',
    }
  )
)
