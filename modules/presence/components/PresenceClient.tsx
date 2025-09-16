'use client'

import process from 'node:process'
import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { usePresence } from '../hooks/usePresence'
import { ActivityIndicator } from './PresenceStatus'

interface PresenceClientProps {
  className?: string
  apiUrl?: string
}

export function PresenceClient({ className, apiUrl }: PresenceClientProps) {
  // Resolve API URL: prop takes precedence, then public env var (injected at build time)
  const resolvedApiUrl = apiUrl ?? process.env.NEXT_PUBLIC_PRESENCE_API_URL

  const { data, isLoading, error, lastUpdate } = usePresence({
    enabled: true,
    apiUrl: resolvedApiUrl,
  })

  const [showMore, setShowMore] = useState(false)

  // Determine live status from the latest event, not just SSE connection
  const liveStatus = (data?.discord?.status as 'online' | 'idle' | 'dnd' | 'offline' | 'invisible') || 'offline'

  const formatLastUpdate = (timestamp: number) => {
    if (!timestamp) return 'Never'
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 5) return 'just now'
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  // Sort activities by importance (Streaming/Playing > Listening/Watching > Custom > others)
  const activityWeight = (type?: number) => {
    switch (type) {
      case 1: // Streaming
        return 100
      case 0: // Playing
        return 90
      case 2: // Listening
        return 80
      case 3: // Watching
        return 70
      case 5: // Competing
        return 60
      case 4: // Custom
        return 50
      default:
        return 0
    }
  }

  const activities = (data?.discord?.activities ?? [])
    .slice()
    .sort((a, b) => activityWeight(b.type) - activityWeight(a.type))
  const topActivity = activities[0]
  const extraActivities = activities.slice(1)

  return (
    <motion.div
      className={clsxm('relative', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-(--sidebar-fg)/[0.02] to-transparent rounded-lg' />

      <div className='relative p-3'>
        {/* Summary Tile */}
        <div className='flex items-start justify-between gap-3'>
          {/* Left: Status + Last seen */}
          <div className='min-w-0'>
            <div className='flex items-center gap-2'>
              <motion.div
                className={clsxm(
                  'w-2.5 h-2.5 rounded-full shadow-sm',
                  liveStatus === 'online'
                    ? 'bg-emerald-400 shadow-emerald-400/50'
                    : liveStatus === 'idle'
                      ? 'bg-amber-400 shadow-amber-400/50'
                      : liveStatus === 'dnd'
                        ? 'bg-red-400 shadow-red-400/50'
                        : 'bg-stone-400 shadow-stone-400/50',
                )}
                animate={{
                  scale: liveStatus !== 'offline' ? [1, 1.15, 1] : 1,
                  opacity: liveStatus !== 'offline' ? [1, 0.8, 1] : 0.85,
                }}
                transition={{ duration: 2, repeat: liveStatus !== 'offline' ? Infinity : 0, ease: 'easeInOut' }}
              />
              <span className='text-xs font-medium text-(--sidebar-fg)/85 tracking-tight'>
                {isLoading
                  ? 'Connecting...'
                  : liveStatus === 'online'
                    ? 'Online'
                    : liveStatus === 'idle'
                      ? 'Idle'
                      : liveStatus === 'dnd'
                        ? 'Do Not Disturb'
                        : 'Offline'}
              </span>
            </div>
            <div className='text-[10px] text-(--sidebar-fg)/50 mt-1 font-mono'>
              {lastUpdate > 0 ? `Last seen ${formatLastUpdate(lastUpdate)}` : 'Last seen —'}
            </div>
          </div>

          {/* Right: Top Activity (Custom optional) */}
          <div className='flex-1 min-w-0 text-right'>
            {topActivity ? (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
                <ActivityIndicator
                  activityName={topActivity.name}
                  details={topActivity.details}
                  state={topActivity.state}
                />
              </motion.div>
            ) : (
              <div className='text-xs text-(--sidebar-fg)/40 italic'>No current activity</div>
            )}
          </div>
        </div>

        {/* Extra activities with toggle (if any) */}
        <AnimatePresence>
          {extraActivities.length > 0 && (
            <div className='mt-2.5'>
              <button
                type='button'
                className='text-[11px] text-(--sidebar-fg)/60 hover:text-(--sidebar-fg)/80 transition-colors'
                onClick={() => setShowMore((v) => !v)}
                aria-expanded={showMore}
              >
                {showMore ? 'Hide extra activities' : `Show ${extraActivities.length} more`}
              </button>

              {showMore && (
                <div className='mt-2 space-y-1.5'>
                  {extraActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ActivityIndicator
                        activityName={activity.name}
                        details={activity.details}
                        state={activity.state}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='mt-2 text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-md p-2.5'
            >
              <div className='flex items-center gap-1.5'>
                <div className='w-1 h-1 rounded-full bg-red-400' />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
