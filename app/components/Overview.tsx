'use client'

import { motion } from 'framer-motion'
import { Calendar, Ship, Sun as SunIcon, Thermometer, Compass } from 'lucide-react'
import trip from '@/data/trip.json'

const badges = [
  { label: '3 giorni', icon: Calendar },
  { label: 'SNAV Napoli', icon: Ship },
  { label: 'San Silverio', icon: SunIcon },
  { label: 'Giugno', icon: Thermometer },
]

const metaCards = [
  { icon: Calendar, label: 'Date', value: '19–21 Giu 2026' },
  { icon: Ship, label: 'Arrivo', value: 'SNAV 17:50' },
  { icon: Ship, label: 'Rientro', value: 'SNAV 18:00' },
  { icon: SunIcon, label: 'Clima', value: '24–30 °C' },
  { icon: Thermometer, label: 'Mare', value: '22–25 °C' },
]

export default function Overview() {
  return (
    <section id="overview" className="px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {badges.map((b) => {
            const Icon = b.icon
            return (
              <span key={b.label} className="badge-pill">
                <Icon className="w-3 h-3" />
                {b.label}
              </span>
            )
          })}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-2"
        >
          <span className="gradient-text">{trip.title}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-mare-500 text-lg max-w-2xl mb-8"
        >
          {trip.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {metaCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.label}
                className="card-gradient card-shadow rounded-xl p-4 card-hover"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-corallo" />
                  <span className="text-xs font-medium text-mare-400 uppercase tracking-wider">
                    {card.label}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-semibold text-notte">
                  {card.value}
                </span>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 bg-notte text-white rounded-2xl p-5 sm:p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-corallo rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-ponza-400 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg mb-1">
                  {trip.highlight?.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {trip.highlight?.description}
                </p>
              </div>
              <div className="shrink-0 w-12 h-12 rounded-xl bg-corallo/20 flex items-center justify-center">
                <Compass className="w-6 h-6 text-corallo" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {trip.highlight?.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-white/80 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
