export interface UserActivity {
  userId: string
  username: string
  discriminator: string
  status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Array<{
    name: string
    type: number
    details?: string
    state?: string
    timestamps?: {
      start?: number
      end?: number
    }
  }>
  timestamp: number
}

export interface PresenceData {
  discord?: UserActivity
  timestamp: number
}

export interface HealthResponse {
  status: string
  botConnected: boolean
  monitoringUser: string
  activeStreams: number
  hasVSCodeActivity: boolean
  apiKeyRequired: boolean
}
