import { Case, Appointment, Invoice } from './app-store'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

function formatCurrency(amount: number): string {
  return `P${amount.toLocaleString('en-BW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function exportCasesCSV(cases: Case[]): string {
  const headers = ['Case Number', 'Client Name', 'Case Type', 'Next Hearing', 'Status']
  const rows = cases.map((c) => [
    c.caseNumber,
    c.clientName,
    c.caseType,
    formatDate(c.nextHearing),
    c.status.toUpperCase(),
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}

export function exportAppointmentsCSV(appointments: Appointment[]): string {
  const headers = ['Date', 'Time', 'Client Name', 'Case Type', 'Status']
  const rows = appointments.map((a) => [
    formatDate(a.date),
    a.time,
    a.clientName,
    a.caseType,
    a.status.toUpperCase(),
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}

export function exportInvoicesCSV(invoices: Invoice[]): string {
  const headers = ['Amount (BWP)', 'Description', 'Status', 'Date Created', 'Days Overdue']
  const rows = invoices.map((i) => [
    i.amount.toString(),
    i.description,
    i.status.toUpperCase(),
    formatDate(i.dateCreated),
    i.daysOverdue ? i.daysOverdue.toString() : '',
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  return csv
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
