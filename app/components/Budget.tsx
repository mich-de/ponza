'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Euro, TrendingUp, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import budgetData from '@/data/budget.json'

const tiers = budgetData.tiers || {}
const tierKeys = Object.keys(tiers)
const tierLabels: Record<string, string> = { low: 'Basso', medium: 'Medio', comfort: 'Comfort', premium: 'Premium' }

export default function Budget() {
  const [activeTier, setActiveTier] = useState('medium')
  const [splitMode, setSplitMode] = useState(false)

  const active = tiers[activeTier as keyof typeof tiers]

  const chartData = active
    ? Object.entries(active.breakdown || {}).map(([key, val]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
        value: splitMode ? Math.round((val as number) / 2) : (val as number),
      }))
    : []

  return (
    <section id="budget" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Budget</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Stima dei costi per persona per il weekend. Giugno è ancora bassa stagione.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {tierKeys.map((key) => {
              const t = tiers[key as keyof typeof tiers]
              const isActive = activeTier === key
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTier(key)}
                  className={`w-full text-left p-4 rounded-2xl card-shadow card-hover transition-all ${
                    isActive
                      ? 'bg-notte text-white'
                      : 'card-gradient bg-white text-notte'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-display font-semibold text-sm ${isActive ? 'text-white' : 'text-notte'}`}>
                      {tierLabels[key] || key}
                    </span>
                    <span className={`text-lg font-bold ${isActive ? 'text-corallo' : 'text-corallo'}`}>
                      {t.total_eur} €
                    </span>
                  </div>
                  <p className={`text-xs ${isActive ? 'text-white/70' : 'text-mare-500'}`}>
                    {t.note}
                  </p>
                </motion.button>
              )
            })}
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-gradient card-shadow rounded-2xl p-4 sm:p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-notte text-sm">
                  Ripartizione {tierLabels[activeTier]}
                </h3>
                <button
                  onClick={() => setSplitMode(!splitMode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    splitMode ? 'bg-corallo/10 text-corallo' : 'bg-ponza-50 text-mare-500'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  {splitMode ? 'A persona' : 'Totale'}
                </button>
              </div>

              {chartData.length > 0 && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: '#658c96' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: '#658c96' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}€`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#fcf7ec',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                          fontSize: '13px',
                        }}
                        formatter={(v: number) => [`${v} €`, 'Costo']}
                      />
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                        fill="#1a7fa3"
                        maxBarSize={48}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {chartData.map((item) => (
                  <div key={item.name} className="bg-ponza-50/50 rounded-xl p-2.5">
                    <div className="text-[10px] text-mare-400 uppercase tracking-wider truncate">{item.name}</div>
                    <div className="text-sm font-semibold text-notte">{item.value} €</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
