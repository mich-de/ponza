'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sun, Coffee, MapPin, Sunset, Moon, Star, Clock } from 'lucide-react'
import itineraryData from '@/data/itinerary.json'

const energyColors: Record<string, string> = {
  basso: 'bg-green-100 text-green-700',
  medio: 'bg-amber-100 text-amber-700',
  alto: 'bg-corallo/10 text-corallo',
}

const energyIcons: Record<string, string> = {
  basso: '🟢',
  medio: '🟡',
  alto: '🔴',
}

export default function Itinerary() {
  const [openDay, setOpenDay] = useState<string | null>(null)
  const days = itineraryData.trip?.days || itineraryData

  if (!days || !Array.isArray(days)) return null

  return (
    <section id="itinerary" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Sun className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Itinerario</h2>
        </div>
        <p className="text-mare-500 mb-8 max-w-2xl">
          Giorno per giorno, cosa fare alle Isole Pontine nel weekend del 19–21 Giugno 2026.
        </p>

        <div className="space-y-3">
          {days.map((day: any, idx: number) => {
            const dayId = day.date || `day-${idx}`
            const isOpen = openDay === dayId

            return (
              <motion.div
                key={dayId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenDay(isOpen ? null : dayId)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      day.energy_level === 'alto'
                        ? 'bg-corallo/10 text-corallo'
                        : day.energy_level === 'medio'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-semibold text-notte text-sm sm:text-base">
                          {day.dayName} {day.date?.slice(-5) || ''}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-ponza-100 text-ponza-600">
                          {day.energy_level}
                        </span>
                      </div>
                      <span className="text-mare-500 text-xs sm:text-sm">{day.title}</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-mare-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-ponza-100/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                          {day.morning && <DaySlot icon={Coffee} label="Mattina" text={day.morning} />}
                          {day.afternoon && <DaySlot icon={MapPin} label="Pomeriggio" text={day.afternoon} />}
                          {day.sunset && <DaySlot icon={Sunset} label="Tramonto" text={day.sunset} />}
                          {day.evening && <DaySlot icon={Moon} label="Sera" text={day.evening} />}
                          {day.night && <DaySlot icon={Star} label="Notte" text={day.night} />}
                        </div>
                        {day.note && (
                          <div className="mt-3 flex items-start gap-2 text-xs text-mare-500 bg-ponza-50/50 rounded-xl p-3">
                            <Clock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-corallo" />
                            <span>{day.note}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DaySlot({ icon: Icon, label, text }: { icon: any; label: string; text: string }) {
  return (
    <div className="bg-white/40 rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-corallo" />
        <span className="text-xs font-semibold text-mare-500 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm text-mare-700 leading-relaxed">{text}</p>
    </div>
  )
}
