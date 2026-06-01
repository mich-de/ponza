'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Landmark, MapPin, Clock, Filter, Search, Bookmark, BookmarkCheck } from 'lucide-react'
import attractions from '@/data/attractions.json'

const categories = [...new Set(attractions.map((a) => a.category))]

export default function Attractions() {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    return attractions.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filterCat && a.category !== filterCat) return false
      return true
    })
  }, [search, filterCat])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="attractions" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Landmark className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Attrazioni</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Dai tesori archeologici romani ai panorami mozzafiato, tutto quello da non perdere nell&apos;arcipelago.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca attrazione..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-corallo/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setFilterCat('')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !filterCat ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
              }`}
            >
              Tutte
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterCat === c ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a, idx) => {
            const isBookmarked = bookmarked.has(a.id)
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.06 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden card-hover"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-notte text-sm sm:text-base">{a.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3 text-mare-400" />
                        <span className="text-xs text-mare-400">{a.island}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-ponza-100 text-ponza-600">
                          {a.category}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(a.id)} className="p-1.5 rounded-lg hover:bg-ponza-50 transition-colors shrink-0">
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-corallo" /> : <Bookmark className="w-4 h-4 text-mare-300" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-mare-600 leading-relaxed line-clamp-3 mb-3">
                    {a.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {a.duration_min} min
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {a.access}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {a.entry_fee}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {a.bestTime}
                    </span>
                  </div>

                  {a.note && (
                    <div className="mt-2 text-[11px] text-mare-400 italic">{a.note}</div>
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
