'use client'

import { AppLayout } from '@/components/app-layout'
import { useAppStore } from '@/lib/app-store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CheckCircle2, Circle, Trash2 } from 'lucide-react'

export default function TasksPage() {
  const { caseTasks, updateCaseTask, cases, addAutoTasksForCase } = useAppStore()
  const [selectedCaseId, setSelectedCaseId] = useState<string>('')

  const caseTaskList = selectedCaseId
    ? caseTasks.filter((t) => t.caseId === selectedCaseId)
    : caseTasks

  const selectedCase = cases.find((c) => c.id === selectedCaseId)

  const handleToggleTask = (taskId: string) => {
    const task = caseTasks.find((t) => t.id === taskId)
    if (task) {
      updateCaseTask(taskId, { completed: !task.completed })
    }
  }

  const handleGenerateAutoTasks = (caseId: string, caseType: string) => {
    addAutoTasksForCase(caseId, caseType)
    setSelectedCaseId(caseId)
  }

  const getTaskColor = (dueDate: string) => {
    const today = new Date().toISOString().split('T')[0]
    const daysUntil = Math.ceil(
      (new Date(dueDate).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysUntil < 0) return 'destructive'
    if (daysUntil <= 3) return 'secondary'
    return 'default'
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Case Deadlines & Tasks</h1>
        </div>

        {/* Case Selector */}
        <Card className="bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Select Case</h2>
          <div className="space-y-3">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCaseId === c.id
                    ? 'bg-primary/10 border-primary'
                    : 'border-border hover:bg-secondary/50'
                }`}
              >
                <div className="font-medium text-foreground">{c.caseNumber}</div>
                <div className="text-sm text-muted-foreground">{c.caseType}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Auto-Generate Tasks */}
        {selectedCase && (
          <Card className="bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Generate Tasks</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Auto-create deadlines for {selectedCase.caseType} case
            </p>
            <Button
              onClick={() => handleGenerateAutoTasks(selectedCase.id, selectedCase.caseType)}
              className="w-full"
            >
              Generate Auto Tasks for {selectedCase.caseType}
            </Button>
          </Card>
        )}

        {/* Tasks List */}
        <Card className="bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {selectedCase ? `Tasks for ${selectedCase.caseNumber}` : 'All Tasks'}
          </h2>

          {caseTaskList.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {selectedCaseId ? 'No tasks yet. Click "Generate Auto Tasks" to create them.' : 'Select a case to view tasks'}
            </p>
          ) : (
            <div className="space-y-3">
              {caseTaskList
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-secondary/30 transition-colors"
                  >
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getTaskColor(task.dueDate)}>
                          Due: {new Date(task.dueDate).toLocaleDateString('en-BW')}
                        </Badge>
                        <Badge
                          variant={
                            task.priority === 'high'
                              ? 'destructive'
                              : task.priority === 'medium'
                                ? 'secondary'
                                : 'outline'
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  )
}
