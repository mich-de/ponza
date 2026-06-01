'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Waves, Search, MapPin, Info, Star, Bookmark, BookmarkCheck, Filter } from 'lucide-react'
import beaches from '@/data/beaches.json'

const allAtmospheres = [...new Set(beaches.map((b) => b.atmosphere))]

export default function Beaches() {
  const [search, setSearch] = useState('')
  const [filterAtmosphere, setFilterAtmosphere] = useState<string>('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return beaches.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.description.toLowerCase().includes(search.toLowerCase())) return false
      if (filterAtmosphere && b.atmosphere !== filterAtmosphere) return false
      return true
    })
  }, [search, filterAtmosphere])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="beaches" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Waves className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Spiagge &amp; Cale</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Le spiagge più belle dell&apos;arcipelago pontino, da Ponza a Palmarola passando per Ventotene.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca spiaggia..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-corallo/20"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <select
              value={filterAtmosphere}
              onChange={(e) => setFilterAtmosphere(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte appearance-none focus:outline-none focus:ring-2 focus:ring-corallo/20"
            >
              <option value="">Tutte</option>
              {allAtmospheres.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((beach, idx) => {
            const isBookmarked = bookmarked.has(beach.id)
            const isExpanded = expanded === beach.id

            return (
              <motion.div
                key={beach.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.06 }}
                className={`card-gradient card-shadow rounded-2xl overflow-hidden card-hover ${isExpanded ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        <h3 className="font-display font-semibold text-notte text-sm sm:text-base">
                          {beach.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-mare-400" />
                          <span className="text-xs text-mare-400">{beach.island}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-ponza-100 text-ponza-600">
                            {beach.access}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(beach.id)} className="p-1.5 rounded-lg hover:bg-ponza-50 transition-colors shrink-0">
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-corallo" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-mare-300" />
                      )}
                    </button>
                  </div>

                  <p className={`text-xs sm:text-sm text-mare-600 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                    {beach.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-corallo/5 text-corallo border border-corallo/10">
                      {beach.atmosphere}
                    </span>
                    {beach.snorkeling && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                        Snorkeling
                      </span>
                    )}
                  </div>

                  {beach.note && (
                    <div className="mt-3 flex items-start gap-1.5 text-[11px] text-mare-400 bg-ponza-50/50 rounded-lg p-2">
                      <Info className="w-3 h-3 mt-0.5 shrink-0 text-corallo" />
                      <span>{beach.note}</span>
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
