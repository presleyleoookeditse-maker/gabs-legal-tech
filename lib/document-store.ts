import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type DocumentType = 'nda' | 'lease' | 'invoice'

export interface GeneratedDocument {
  id: string
  type: DocumentType
  title: string
  createdAt: string
  data: Record<string, string>
}

interface DocumentStore {
  documents: GeneratedDocument[]
  addDocument: (doc: Omit<GeneratedDocument, 'id' | 'createdAt'>) => void
  clearHistory: () => void
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'gabs-legal-documents',
    }
  )
)
