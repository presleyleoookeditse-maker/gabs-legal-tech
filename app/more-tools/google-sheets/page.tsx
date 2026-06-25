'use client'

import { AppLayout } from '@/components/app-layout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function GoogleSheetsPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [sheetsLink, setSheetsLink] = useState('')
  const [linkedSheets, setLinkedSheets] = useState<string[]>([])
  const [recentImports, setRecentImports] = useState([
    { id: 1, message: 'Imported 23 clients from "Clients Database"', date: '20 Jun 2026' },
  ])

  const handleConnect = () => {
    setIsConnected(true)
    setToastMessage('Connected as demo@lawfirm.bw')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleLinkSheet = () => {
    if (!sheetsLink.trim()) {
      alert('Please enter a Google Sheets link')
      return
    }
    
    if (!sheetsLink.includes('docs.google.com/spreadsheets')) {
      alert('Please enter a valid Google Sheets link')
      return
    }

    setLinkedSheets([...linkedSheets, sheetsLink])
    setToastMessage('Google Sheets account linked successfully!')
    setShowToast(true)
    setSheetsLink('')
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleImport = () => {
    if (!selectedSheet) {
      alert('Please select a sheet first')
      return
    }
    
    setToastMessage('23 records imported successfully')
    setShowToast(true)
    
    const newImport = {
      id: recentImports.length + 1,
      message: `Imported 23 records from "${selectedSheet}"`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setRecentImports([newImport, ...recentImports])
    
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Connect Google Sheets</h1>
          <p className="text-gray-400 text-lg">Sync clients and invoices from Google Sheets automatically</p>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-[#00FF88] text-black px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {toastMessage}
          </div>
        )}

        {/* Step 1: Connect Account */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] space-y-4">
          <h2 className="text-xl font-bold text-white">Step 1: Connect Account</h2>
          <p className="text-gray-400">Authorize Gabs Legal Tech to access your Google Sheets</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#00FF88]" />
                    <span className="text-[#00FF88]">Connected as demo@lawfirm.bw</span>
                  </div>
                ) : (
                  <span className="text-gray-500">Not connected</span>
                )}
              </div>
              <Button
                onClick={handleConnect}
                disabled={isConnected}
                className="bg-[#00FF88] text-black hover:bg-[#00DD77] disabled:bg-gray-600 disabled:cursor-not-allowed font-bold"
              >
                Connect Google Sheets
              </Button>
            </div>

            {/* Link Google Sheets Account */}
            {isConnected && (
              <div className="mt-4 pt-4 border-t border-[#222] space-y-3">
                <h3 className="text-white font-semibold">Link Your Google Sheets Account</h3>
                <p className="text-gray-400 text-sm">Enter your Google Sheets link to sync data automatically</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sheetsLink}
                    onChange={(e) => setSheetsLink(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="flex-1 bg-[#0a0a0a] border border-[#222] rounded px-4 py-2 text-white focus:outline-none focus:border-[#00FF88] text-sm"
                  />
                  <Button
                    onClick={handleLinkSheet}
                    className="bg-[#00FF88] text-black hover:bg-[#00DD77] font-bold px-6"
                  >
                    Link
                  </Button>
                </div>

                {linkedSheets.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-400 text-sm font-semibold">Linked Sheets:</p>
                    {linkedSheets.map((link, idx) => (
                      <div key={idx} className="bg-[#0a0a0a] p-2 rounded border border-[#222] flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00FF88] flex-shrink-0" />
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00FF88] text-sm truncate hover:underline"
                        >
                          {link.substring(0, 50)}...
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Select Sheet */}
        <div className={`bg-[#1a1a1a] rounded-xl p-6 border ${isConnected ? 'border-[#222]' : 'border-[#333]'} space-y-4`}>
          <h2 className={`text-xl font-bold ${isConnected ? 'text-white' : 'text-gray-600'}`}>
            Step 2: Select Sheet
          </h2>
          <p className={isConnected ? 'text-gray-400' : 'text-gray-600'}>Choose which sheet to import</p>
          
          <select
            value={selectedSheet}
            onChange={(e) => setSelectedSheet(e.target.value)}
            disabled={!isConnected}
            className={`w-full rounded px-4 py-3 font-medium ${
              isConnected
                ? 'bg-[#0a0a0a] border border-[#222] text-white focus:outline-none focus:border-[#00FF88]'
                : 'bg-[#0a0a0a] border border-[#333] text-gray-600 cursor-not-allowed'
            }`}
          >
            <option value="">Choose sheet...</option>
            <option value="Clients Database">Clients Database</option>
            <option value="Invoices 2026">Invoices 2026</option>
            <option value="Cases List">Cases List</option>
          </select>
        </div>

        {/* Step 3: Map Columns */}
        {selectedSheet && (
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] space-y-4">
            <h2 className="text-xl font-bold text-white">Step 3: Map Columns</h2>
            <p className="text-gray-400">Match columns from your sheet to Gabs fields</p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222]">
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Sheet Column</th>
                    <th className="text-left py-3 px-4 text-gray-400 text-sm font-semibold">Gabs Field</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#222]">
                    <td className="py-3 px-4 text-white">Client Name</td>
                    <td className="py-3 px-4 text-[#00FF88]">→ Name</td>
                  </tr>
                  <tr className="border-b border-[#222]">
                    <td className="py-3 px-4 text-white">Phone</td>
                    <td className="py-3 px-4 text-[#00FF88]">→ Phone</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white">Amount</td>
                    <td className="py-3 px-4 text-[#00FF88]">→ Invoice Amount</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Button
              onClick={handleImport}
              className="w-full bg-[#00FF88] text-black hover:bg-[#00DD77] font-bold py-3"
            >
              Import Data
            </Button>
          </div>
        )}

        {/* Step 4: Recent Imports */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#222] space-y-4">
          <h2 className="text-xl font-bold text-white">Recent Imports</h2>
          
          <div className="space-y-3">
            {recentImports.length > 0 ? (
              recentImports.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded border border-[#222]">
                  <CheckCircle className="h-5 w-5 text-[#00FF88] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{item.message}</p>
                    <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">No imports yet</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
