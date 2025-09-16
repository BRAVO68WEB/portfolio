'use client'

import { useState, useEffect } from 'react'
import type { PresenceData, HealthResponse, UserActivity } from '../types'

interface UsePresenceProps {
  apiUrl?: string
  enabled?: boolean
}

interface PresenceState {
  data: PresenceData | null
  health: HealthResponse | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
  lastUpdate: number
}

export function usePresence({ enabled = true }: UsePresenceProps = {}): PresenceState {
  const [state, setState] = useState<PresenceState>({
    data: null,
    health: null,
    isConnected: false,
    isLoading: true,
    error: null,
    lastUpdate: 0,
  })

  useEffect(() => {
    if (!enabled) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Presence monitoring disabled' }))
      return
    }

    let eventSource: EventSource | null = null
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      eventSource = new EventSource(`${process.env.NEXT_PUBLIC_PRESENCE_API_URL}/events`)

      eventSource.onopen = () => {
        setState((prev) => ({ ...prev, isConnected: true, isLoading: false, error: null }))
      }

      eventSource.onmessage = (event) => {
        console.log('event', event)
        try {
          const activity = JSON.parse(event.data)
          setState({
            data: { discord: activity, timestamp: activity.timestamp },
            health: null,
            isConnected: true,
            isLoading: false,
            error: null,
            lastUpdate: Date.now(),
          })
        } catch (err) {
          setState((prev) => ({ ...prev, error: 'Failed to parse event data', isLoading: false }))
        }
      }

      eventSource.onerror = (err) => {
        setState((prev) => ({ ...prev, isConnected: false, error: 'Connection lost', isLoading: false }))
      }
    } catch (err) {
      setState((prev) => ({ ...prev, isConnected: false, error: 'Failed to connect', isLoading: false }))
    }

    return () => {
      if (eventSource) eventSource.close()
    }
  }, [enabled])

  return state
}
