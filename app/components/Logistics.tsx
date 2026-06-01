'use client'

import { motion } from 'framer-motion'
import { Ship, Bus, Car, Bike, Info, Euro, Clock, MapPin } from 'lucide-react'
import log from '@/data/logistics.json'

const sections = [
  {
    title: 'Arrivo',
    icon: Ship,
    items: [
      { label: 'Da', value: log.arrival?.from || 'Napoli Beverello' },
      { label: 'A', value: log.arrival?.to || 'Ponza' },
      { label: 'Mezzo', value: (log.arrival?.mode || 'Aliscafo SNAV') + ` (${log.arrival?.duration_h || 2.67}h)` },
      { label: 'Partenza', value: log.arrival?.departure || '15:10' },
      { label: 'Arrivo', value: log.arrival?.arrival || '17:50' },
      { label: 'Costo', value: `~${log.arrival?.cost_eur || 45} €` },
    ],
  },
  {
    title: 'Rientro',
    icon: Ship,
    items: [
      { label: 'Da', value: log.departure?.from || 'Ponza' },
      { label: 'A', value: log.departure?.to || 'Napoli Beverello' },
      { label: 'Mezzo', value: (log.departure?.mode || 'Aliscafo SNAV') + ` (${log.departure?.duration_h || 2.83}h)` },
      { label: 'Partenza', value: log.departure?.departure || '18:00' },
      { label: 'Arrivo', value: log.departure?.arrival || '20:50' },
      { label: 'Costo', value: `~${log.departure?.cost_eur || 45} €` },
    ],
  },
  {
    title: 'Trasporti Locali',
    icon: Bus,
    items: log.local_transport
      ? Object.entries(log.local_transport).map(([key, val]: any) => ({
          label: val.description || key,
          value: `${val.cost_eur} €${val.per ? '/' + val.per : ''}`,
        }))
      : [{ label: 'Taxi boat', value: '5 €' }, { label: 'Bus', value: '2 €' }, { label: 'Scooter', value: '35 €/giorno' }],
  },
  {
    title: 'Interisola',
    icon: MapPin,
    items: log.interisland?.ponza_ventotene
      ? [
          { label: 'Ponza → Ventotene', value: `${log.interisland.ponza_ventotene.duration_min} min, ${log.interisland.ponza_ventotene.cost_eur} €` },
          { label: 'Frequenza', value: log.interisland.ponza_ventotene.frequency },
        ]
      : [{ label: 'Ponza → Ventotene', value: '50 min, 27 €' }],
  },
]

export default function Logistics() {
  return (
    <section id="logistics" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Ship className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Logistica</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Tutto quello che serve per organizzare il viaggio: trasporti, costi e consigli pratici.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-corallo" />
                    <h3 className="font-display font-semibold text-notte text-sm">{section.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-mare-500">{item.label}</span>
                        <span className="font-medium text-notte text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {log.car_policy && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="sm:col-span-2 bg-amber-50/50 rounded-2xl p-4 sm:p-5 border border-amber-100/30"
            >
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-notte text-sm mb-1">Auto</h3>
                  <p className="text-sm text-mare-600">{log.car_policy.description}</p>
                  <span className="text-xs text-mare-400">Difficoltà parcheggio: {log.car_policy.parking_difficulty}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {log.tips && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 bg-white card-shadow rounded-2xl p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-corallo" />
              <h3 className="font-display font-semibold text-notte text-sm">Consigli pratici</h3>
            </div>
            <ul className="space-y-2">
              {(log.tips as string[])?.map((tip: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-mare-600">
                  <span className="text-corallo mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  )
}
