import { redirect } from 'next/navigation'
export default function AgentsRoot() {
  redirect('/agents/dashboard')
  return null
} 