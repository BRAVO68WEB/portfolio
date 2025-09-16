'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import type { PresenceStatus } from 'discord.js'

interface PresenceStatusProps {
  status: PresenceStatus
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

interface VSCodeIndicatorProps {
  fileName?: string
  language?: string
  workspaceName?: string
  gitRepo?: {
    name: string
    branch: string
  }
  className?: string
}

export function VSCodeIndicator({ fileName, language, workspaceName, gitRepo, className }: VSCodeIndicatorProps) {
  if (!fileName) {
    return <div className={clsxm('text-xs text-(--sidebar-fg)/40 italic', className)}>No coding activity</div>
  }

  return (
    <div className={clsxm('space-y-1', className)}>
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1 px-1.5 py-0.5 bg-(--sidebar-fg)/5 rounded text-xs'>
          <CodeIcon className='w-3 h-3 text-(--sidebar-fg)/60' />
          <span className='font-mono text-(--sidebar-fg)/80 truncate max-w-[120px]'>{fileName}</span>
        </div>
        {language && (
          <span className='text-xs text-(--sidebar-fg)/50 font-mono uppercase tracking-wider'>{language}</span>
        )}
      </div>

      {workspaceName && (
        <div className='flex items-center gap-1.5 text-xs text-(--sidebar-fg)/70'>
          <FolderIcon className='w-3 h-3' />
          <span className='truncate'>{workspaceName}</span>
        </div>
      )}

      {gitRepo && (
        <div className='flex items-center gap-1.5 text-xs text-(--sidebar-fg)/60'>
          <GitIcon className='w-3 h-3' />
          <span className='truncate'>
            {gitRepo.name} • <span className='font-mono'>{gitRepo.branch}</span>
          </span>
        </div>
      )}
    </div>
  )
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M16 18L22 12L16 6M8 6L2 12L8 18' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function GitIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsxm('stroke-current', className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='18' cy='18' r='3' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <circle cx='6' cy='6' r='3' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='m13 6 3 3 3-3M9 18l3-3 3 3' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
