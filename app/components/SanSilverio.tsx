'use client'

import { motion } from 'framer-motion'
import { Flame, Calendar, Clock, MapPin, AlertTriangle, Package } from 'lucide-react'
import sj from '@/data/san-silverio.json'

const schedule = [
  { time: 'Mattina', event: sj.schedule?.morning || 'Messa solenne', icon: Calendar },
  { time: 'Pomeriggio', event: sj.schedule?.afternoon || 'Processione in mare', icon: MapPin },
  { time: 'Sera', event: sj.schedule?.evening || 'Spettacolo pirotecnico', icon: Clock },
  { time: 'Notte', event: sj.schedule?.night || 'Bancarelle e musica', icon: Flame },
]

export default function SanSilverio() {
  return (
    <section id="san-silverio" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">
            Festa di San Silverio
          </h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          {sj.description}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-corallo/5 via-ponza-50 to-tufo-50 rounded-2xl p-5 sm:p-6 card-shadow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-corallo/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-ponza-200/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-corallo/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-corallo" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-notte">
                  {sj.festival}
                </h3>
                <span className="text-xs text-mare-400">{sj.date} · {sj.day}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {schedule.map((s, idx) => {
                const Icon = s.icon
                return (
                  <div key={s.time} className="bg-white/60 rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-corallo" />
                      <span className="text-xs font-semibold text-mare-500 uppercase tracking-wider">{s.time}</span>
                    </div>
                    <p className="text-sm text-mare-700">{s.event}</p>
                  </div>
                )
              })}
            </div>

            <div className="bg-white/40 rounded-xl p-4">
              <h4 className="flex items-center gap-2 text-xs font-semibold text-mare-500 uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5" />
                Consigli
              </h4>
              <ul className="space-y-1.5">
                {sj.tips?.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-mare-600">
                    <span className="text-corallo mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 flex items-start gap-2 text-xs text-mare-400 bg-amber-50/50 rounded-xl p-3 border border-amber-100/30"
        >
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
          <span>
            Il 20 giugno l&apos;isola è molto affollata. Prenota cena e alloggio con largo anticipo. I taxi boat e i bus potrebbero avere attese più lunghe del solito.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
