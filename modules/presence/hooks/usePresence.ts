'use client'

import type { HealthResponse, PresenceData, UserActivity } from '../types'
import { useEffect, useState } from 'react'

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

export function usePresence({ enabled = true, apiUrl }: UsePresenceProps = {}): PresenceState {
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

    if (!apiUrl || apiUrl.trim() === '') {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Presence API URL not configured' }))
      return
    }

    let eventSource: EventSource | null = null
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const url = `${apiUrl.replace(/\/$/, '')}/events`
      eventSource = new EventSource(url)

      eventSource.onopen = () => {
        setState((prev) => ({ ...prev, isConnected: true, isLoading: false, error: null }))
      }

      const onActivityUpdate = (event: MessageEvent) => {
        try {
          const activity: UserActivity = JSON.parse(event.data)
          setState((prev) => ({
            ...prev,
            data: { discord: activity, timestamp: activity.timestamp },
            isConnected: true,
            isLoading: false,
            error: null,
            lastUpdate: Date.now(),
          }))
        } catch {
          setState((prev) => ({ ...prev, error: 'Failed to parse activity event', isLoading: false }))
        }
      }

      const onHeartbeat = (event: MessageEvent) => {
        try {
          const payload = JSON.parse(event.data) as { timestamp?: number }
          setState((prev) => ({
            ...prev,
            isConnected: true,
            isLoading: false,
            error: null,
            lastUpdate: payload.timestamp ?? Date.now(),
          }))
        } catch {
          // If heartbeat can't be parsed, still consider it as a signal
          setState((prev) => ({ ...prev, isConnected: true, isLoading: false, lastUpdate: Date.now() }))
        }
      }

      // Named SSE events from the server
      eventSource.addEventListener('activity-update', onActivityUpdate)
      eventSource.addEventListener('heartbeat', onHeartbeat)

      eventSource.onerror = () => {
        setState((prev) => ({ ...prev, isConnected: false, error: 'Connection lost', isLoading: false }))
      }

      // Cleanup
      return () => {
        if (eventSource) {
          eventSource.removeEventListener('activity-update', onActivityUpdate as EventListener)
          eventSource.removeEventListener('heartbeat', onHeartbeat as EventListener)
          eventSource.close()
        }
      }
    } catch {
      setState((prev) => ({ ...prev, isConnected: false, error: 'Failed to connect', isLoading: false }))
    }
  }, [enabled, apiUrl])

  return state
}
