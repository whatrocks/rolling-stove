import { Terminal } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertMsgProps {
  error: string
}

export default function AlertMsg({ error }: AlertMsgProps) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
