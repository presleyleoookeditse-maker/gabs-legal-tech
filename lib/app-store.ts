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
  {
    id: '2',
    caseNumber: 'GLT-002',
    clientName: 'Mrs Kago Motswedi vs Ex-Spouse',
    caseType: 'Divorce',
    nextHearing: '2026-06-10',
    status: 'active',
    summary: 'Matrimonial property division and child custody arrangement.',
    documents: ['marriage_cert.pdf', 'property_schedule.pdf'],
    notes: ['Mediation scheduled', 'Child welfare report pending'],
  },
  {
    id: '3',
    caseNumber: 'GLT-003',
    clientName: 'Botshelo Trading vs Duma Supplies',
    caseType: 'Contract Dispute',
    nextHearing: '2026-05-25',
    status: 'active',
    summary: 'Non-payment of goods supplied, breach of contract claim.',
    documents: ['invoice.pdf', 'delivery_note.pdf', 'contract.pdf'],
    notes: ['Demand letter sent', 'Awaiting response'],
  },
  {
    id: '4',
    caseNumber: 'GLT-004',
    clientName: 'Employee vs Employer Ltd',
    caseType: 'Employment',
    nextHearing: '2026-06-05',
    status: 'active',
    summary: 'Unfair dismissal claim with compensation request.',
    documents: ['dismissal_letter.pdf', 'employment_contract.pdf'],
    notes: ['Settlement offer received', 'Negotiation in progress'],
  },
  {
    id: '5',
    caseNumber: 'GLT-005',
    clientName: 'Mr Keabetswe vs Government',
    caseType: 'Administrative Law',
    nextHearing: '2026-07-01',
    status: 'active',
    summary: 'Challenge to decision of licensing authority.',
    documents: ['decision_letter.pdf', 'appeal.pdf'],
    notes: ['Legal arguments prepared', 'Hearing date confirmed'],
  },
  {
    id: '6',
    caseNumber: 'GLT-006',
    clientName: 'Business Owners Association',
    caseType: 'Commercial',
    nextHearing: '2026-06-15',
    status: 'active',
    summary: 'Partnership dispute and business dissolution.',
    documents: ['partnership_deed.pdf', 'accounts.pdf'],
    notes: ['Valuation complete', 'Distribution plan drafted'],
  },
  {
    id: '7',
    caseNumber: 'GLT-007',
    clientName: 'Consumer vs Retailer',
    caseType: 'Consumer Protection',
    nextHearing: '2026-05-28',
    status: 'active',
    summary: 'Defective goods claim and refund request.',
    documents: ['receipt.pdf', 'inspection_report.pdf'],
    notes: ['Evidence submitted', 'Response awaited'],
  },
  {
    id: '8',
    caseNumber: 'GLT-008',
    clientName: 'Landlord vs Tenant',
    caseType: 'Eviction',
    nextHearing: '2026-06-08',
    status: 'active',
    summary: 'Non-payment of rent and breach of lease terms.',
    documents: ['lease.pdf', 'rent_records.pdf'],
    notes: ['Eviction order requested', 'Notice period commenced'],
  },
  {
    id: '9',
    caseNumber: 'GLT-009',
    clientName: 'Estate of Late Mr Motlanthe',
    caseType: 'Succession',
    nextHearing: '2026-06-20',
    status: 'active',
    summary: 'Estate administration and distribution of assets.',
    documents: ['will.pdf', 'death_cert.pdf', 'inventory.pdf'],
    notes: ['Probate obtained', 'Asset distribution in progress'],
  },
  {
    id: '10',
    caseNumber: 'GLT-010',
    clientName: 'Contractor vs Developer',
    caseType: 'Construction Dispute',
    nextHearing: '2026-07-05',
    status: 'active',
    summary: 'Unpaid construction contract with defects claim.',
    documents: ['contract.pdf', 'invoice.pdf', 'defect_report.pdf'],
    notes: ['Expert appointed', 'Site inspection completed'],
  },
  {
    id: '11',
    caseNumber: 'GLT-011',
    clientName: 'Driver vs Insurance Co',
    caseType: 'Insurance Dispute',
    nextHearing: '2026-06-12',
    status: 'active',
    summary: 'Motor vehicle accident claim - disputed liability.',
    documents: ['police_report.pdf', 'medical_report.pdf', 'estimates.pdf'],
    notes: ['Settlement discussions ongoing', 'Awaiting expert opinion'],
  },
  {
    id: '12',
    caseNumber: 'GLT-012',
    clientName: 'Mr Seretse vs Neighbour',
    caseType: 'Nuisance',
    nextHearing: '2026-05-30',
    status: 'active',
    summary: 'Noise nuisance and harassment by neighbouring property owner.',
    documents: ['complaint_letter.pdf', 'incident_log.pdf'],
    notes: ['Warning issued to defendant', 'Awaiting response'],
  },
]

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Mr Dube Thabo',
    caseType: 'Consultation',
    date: '2026-06-20',
    time: '10:00',
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Mrs Kago Motswedi',
    caseType: 'Case Review',
    date: '2026-06-20',
    time: '14:30',
    status: 'pending',
  },
  {
    id: '3',
    clientName: 'Mr Seretse',
    caseType: 'Follow-up',
    date: '2026-06-21',
    time: '09:00',
    status: 'confirmed',
  },
]

const mockInvoices: Invoice[] = [
  {
    id: '1',
    amount: 2500,
    description: 'Consultation Fee - GLT-001',
    status: 'paid',
    dateCreated: '2026-04-15',
  },
  {
    id: '2',
    amount: 1200,
    description: 'Filing Fees - GLT-002',
    status: 'paid',
    dateCreated: '2026-04-20',
  },
  {
    id: '3',
    amount: 3500,
    description: 'Litigation Services - GLT-003',
    status: 'paid',
    dateCreated: '2026-04-28',
  },
  {
    id: '4',
    amount: 2000,
    description: 'Document Drafting - GLT-004',
    status: 'unpaid',
    dateCreated: '2026-05-01',
  },
  {
    id: '5',
    amount: 1800,
    description: 'Consultation - GLT-005',
    status: 'unpaid',
    dateCreated: '2026-05-05',
  },
  {
    id: '6',
    amount: 3000,
    description: 'Court Fees - GLT-006',
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
