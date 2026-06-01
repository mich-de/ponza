'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sailboat, MapPin, Clock, Euro, Filter, Bookmark, BookmarkCheck, Ship, TreePine, Waves, Wine } from 'lucide-react'
import experiences from '@/data/experiences.json'

const typeIcons: Record<string, any> = {
  barca: Sailboat,
  gita: Ship,
  trekking: TreePine,
  acqua: Waves,
  cultura: Wine,
}

const typeLabels: Record<string, string> = {
  barca: 'Barca',
  gita: 'Gita',
  trekking: 'Trekking',
  acqua: 'Snorkeling',
  cultura: 'Cultura',
}

export default function Experiences() {
  const [filterType, setFilterType] = useState('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const types = useMemo(() => [...new Set(experiences.map((e) => e.type))], [])

  const filtered = filterType
    ? experiences.filter((e) => e.type === filterType)
    : experiences

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="experiences" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Sailboat className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Escursioni &amp; Esperienze</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Tour in barca a Palmarola, gita a Ventotene, trekking, snorkeling e degustazioni. Il meglio dell&apos;arcipelago pontino.
        </p>

        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFilterType('')}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filterType ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
            }`}
          >
            Tutte
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === t ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
              }`}
            >
              {typeLabels[t] || t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((exp, idx) => {
            const Icon = typeIcons[exp.type] || Sailboat
            const isBookmarked = bookmarked.has(exp.id)

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.06 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden card-hover"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-ponza-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-ponza-600" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-notte text-sm sm:text-base">{exp.title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="w-3 h-3 text-mare-400" />
                          <span className="text-xs text-mare-400">{exp.island}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-ponza-100 text-ponza-600">
                            {typeLabels[exp.type] || exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(exp.id)} className="p-1.5 rounded-lg hover:bg-ponza-50 transition-colors shrink-0">
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-corallo" /> : <Bookmark className="w-4 h-4 text-mare-300" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-mare-600 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {exp.highlights.map((h) => (
                        <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 text-xs text-mare-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Euro className="w-3 h-3" /> {exp.cost_eur === 0 ? 'Gratis' : `${exp.cost_eur} €`}
                    </span>
                  </div>

                  {exp.operator && (
                    <div className="text-xs text-mare-400 mb-2">
                      Operatore: {exp.operator}
                      {exp.operator_url && (
                        <a href={exp.operator_url} target="_blank" rel="noopener noreferrer" className="text-corallo ml-1 hover:underline">
                          sito →
                        </a>
                      )}
                    </div>
                  )}

                  {exp.includes && exp.includes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {exp.includes.map((inc) => (
                        <span key={inc} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.tip && (
                    <div className="text-[11px] text-mare-400 italic bg-ponza-50/50 rounded-lg p-2.5">
                      💡 {exp.tip}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
