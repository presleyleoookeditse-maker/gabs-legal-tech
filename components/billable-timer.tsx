'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface BillableTimerProps {
  caseId: string
  onSave: (hours: number, description: string, hourlyRate: number) => void
}

export function BillableTimer({ caseId, onSave }: BillableTimerProps) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [description, setDescription] = useState('')
  const [hourlyRate, setHourlyRate] = useState(1500)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const hours = (seconds / 3600).toFixed(2)
  const minutes = Math.floor((seconds % 3600) / 60)
  const displaySeconds = seconds % 60

  const handleSave = () => {
    if (description && seconds > 0) {
      onSave(parseFloat(hours), description, hourlyRate)
      setSeconds(0)
      setDescription('')
      setIsRunning(false)
    }
  }

  return (
    <Card className="bg-card p-6 space-y-4">
      <div className="text-center">
        <div className="text-5xl font-mono font-bold text-primary">
          {String(Math.floor(seconds / 3600)).padStart(2, '0')}:
          {String(minutes).padStart(2, '0')}:
          {String(displaySeconds).padStart(2, '0')}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{hours} hours</p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground placeholder-muted-foreground"
          placeholder="Description (e.g., Client consultation)"
        />

        <div>
          <label className="text-sm font-medium text-foreground">Hourly Rate (P)</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
            className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-foreground"
          />
        </div>

        <div className="text-sm text-foreground">
          Total: <span className="font-bold text-primary">P{(parseFloat(hours) * hourlyRate).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          variant={isRunning ? 'destructive' : 'default'}
          className="flex-1"
        >
          {isRunning ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Start
            </>
          )}
        </Button>

        <Button
          onClick={() => {
            setSeconds(0)
            setIsRunning(false)
          }}
          variant="outline"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleSave}
          className="flex-1 bg-primary"
          disabled={!description || seconds === 0}
        >
          Save to Invoice
        </Button>
      </div>
    </Card>
  )
}
