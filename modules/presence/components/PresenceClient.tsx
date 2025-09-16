'use client'

import { clsxm } from '@zolplay/utils'
import { motion, AnimatePresence } from 'motion/react'
import React, { useEffect } from 'react'
import { usePresence } from '../hooks/usePresence'
import { PresenceStatusIndicator, ActivityIndicator, VSCodeIndicator } from './PresenceStatus'

interface PresenceClientProps {
  className?: string
}

export function PresenceClient({ className }: PresenceClientProps) {
  const { data, health, isConnected, isLoading, error, lastUpdate } = usePresence({
    enabled: true,
  })

  useEffect(() => {
    console.log('Presence data updated:', data)
  }, [data])

  // Determine live status from the latest event, not just SSE connection
  const liveStatus = data?.discord?.status || 'offline'

  const formatLastUpdate = (timestamp: number) => {
    if (!timestamp) return 'Never'
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <motion.div
      className={clsxm('relative', className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-(--sidebar-fg)/[0.02] to-transparent rounded-lg' />

      <div className='relative space-y-3 p-3'>
        {/* Connection Header */}
        <div className='flex items-center justify-between pb-2'>
          <div className='flex items-center gap-2'>
            <motion.div
              className={clsxm(
                'w-2 h-2 rounded-full shadow-sm',
                liveStatus === 'online'
                  ? 'bg-emerald-400 shadow-emerald-400/50'
                  : liveStatus === 'idle'
                    ? 'bg-amber-400 shadow-amber-400/50'
                    : liveStatus === 'dnd'
                      ? 'bg-red-400 shadow-red-400/50'
                      : 'bg-stone-400 shadow-stone-400/50',
              )}
              animate={{
                scale: liveStatus !== 'offline' ? [1, 1.2, 1] : 1,
                opacity: liveStatus !== 'offline' ? [1, 0.7, 1] : 0.8,
              }}
              transition={{
                duration: 2,
                repeat: liveStatus !== 'offline' ? Infinity : 0,
                ease: 'easeInOut',
              }}
            />
            <span className='text-xs font-medium text-(--sidebar-fg)/80 tracking-tight'>
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

          {lastUpdate > 0 && (
            <motion.span
              className='text-xs text-(--sidebar-fg)/50 font-mono'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {formatLastUpdate(lastUpdate)}
            </motion.span>
          )}
        </div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='text-xs text-red-400 bg-red-400/5 border border-red-400/10 rounded-md p-2.5'
            >
              <div className='flex items-center gap-1.5'>
                <div className='w-1 h-1 rounded-full bg-red-400' />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Health Indicator */}
        {health && isConnected && (
          <motion.div
            className='flex items-center gap-3 text-xs text-(--sidebar-fg)/60'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className='flex items-center gap-1'>
              <div className={clsxm('w-1 h-1 rounded-full', health.botConnected ? 'bg-emerald-400' : 'bg-red-400')} />
              <span className='font-mono'>Bot</span>
            </div>
            <div className='flex items-center gap-1'>
              <div className='w-1 h-1 rounded-full bg-blue-400' />
              <span className='font-mono'>{health.activeStreams} streams</span>
            </div>
          </motion.div>
        )}

        {/* Discord Activity Section */}
        <AnimatePresence>
          {data?.discord && (
            <motion.div
              className='space-y-2.5'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className='flex items-center gap-2 pb-1 border-b border-(--sidebar-fg)/10'>
                <div className='text-xs font-semibold text-(--sidebar-fg)/90 tracking-wide uppercase'>Discord</div>
                <div className='flex-1 h-px bg-gradient-to-r from-(--sidebar-fg)/20 to-transparent' />
              </div>

              <PresenceStatusIndicator status={data.discord.status} />

              {data.discord.activities.length > 0 && (
                <div className='space-y-2'>
                  {data.discord.activities.slice(0, 2).map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {!isLoading && !error && !data?.discord && (
            <motion.div
              className='text-center py-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='text-xs text-(--sidebar-fg)/40 italic'>Waiting for activity...</div>
              <div className='mt-2 flex justify-center'>
                <motion.div
                  className='w-4 h-4 border border-(--sidebar-fg)/20 rounded-full border-t-transparent'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
