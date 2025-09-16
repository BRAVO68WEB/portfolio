'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'

interface PresenceStatusProps {
  status: 'online' | 'idle' | 'dnd' | 'offline' | 'invisible'
  className?: string
}

const statusConfig = {
  online: {
    color: 'bg-emerald-400',
    ring: 'ring-emerald-400/20',
    label: 'Online',
    emoji: '🟢',
  },
  idle: {
    color: 'bg-amber-400',
    ring: 'ring-amber-400/20',
    label: 'Away',
    emoji: '🟡',
  },
  dnd: {
    color: 'bg-red-400',
    ring: 'ring-red-400/20',
    label: 'Do Not Disturb',
    emoji: '🔴',
  },
  offline: {
    color: 'bg-stone-400',
    ring: 'ring-stone-400/20',
    label: 'Offline',
    emoji: '⚫',
  },
  invisible: {
    color: 'bg-stone-400',
    ring: 'ring-stone-400/20',
    label: 'Invisible',
    emoji: '⚫',
  },
} as const

export function PresenceStatusIndicator({ status, className }: PresenceStatusProps) {
  const config = statusConfig[status] || statusConfig.offline

  return (
    <div className={clsxm('flex items-center gap-2.5 text-xs font-medium text-(--sidebar-fg)/90', className)}>
      <div className='relative'>
        <div className={clsxm('w-2.5 h-2.5 rounded-full shadow-sm animate-pulse', config.color)} />
        <div className={clsxm('absolute inset-0 w-2.5 h-2.5 rounded-full ring-2', config.ring)} />
      </div>
      <span className='tracking-tight'>{config.label}</span>
    </div>
  )
}

interface ActivityIndicatorProps {
  activityName?: string
  details?: string
  state?: string
  className?: string
}

export function ActivityIndicator({ activityName, details, state, className }: ActivityIndicatorProps) {
  if (!activityName) {
    return <div className={clsxm('text-xs text-(--sidebar-fg)/40 italic', className)}>No current activity</div>
  }

  return (
    <div className={clsxm('space-y-0.5', className)}>
      <div className='flex items-center gap-1.5'>
        <div className='w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400' />
        <div className='text-xs font-medium text-(--sidebar-fg)/90 truncate'>{activityName}</div>
      </div>
      {details && <div className='text-xs text-(--sidebar-fg)/70 ml-3 truncate leading-relaxed'>{details}</div>}
      {state && <div className='text-xs text-(--sidebar-fg)/60 ml-3 truncate leading-relaxed'>{state}</div>}
    </div>
  )
}
