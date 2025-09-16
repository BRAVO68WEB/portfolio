import type { ActivityType, PresenceStatus } from 'discord.js'

export interface UserActivity {
  userId: string
  username: string
  discriminator: string
  status: PresenceStatus
  activities: Array<{
    name: string
    type: ActivityType
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
