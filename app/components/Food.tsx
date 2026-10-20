'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Utensils, MapPin, Search, Star, Bookmark, BookmarkCheck, Filter } from 'lucide-react'
import restaurants from '@/data/restaurants.json'

const priceOrder: Record<string, number> = { '€': 1, '€€': 2, '€€€': 3, '€€€€': 4 }

export default function Food() {
  const [search, setSearch] = useState('')
  const [filterPrice, setFilterPrice] = useState<string>('')
  const [filterZone, setFilterZone] = useState<string>('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const zones = useMemo(() => [...new Set(restaurants.map((r) => r.zone))], [])

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.specialty.toLowerCase().includes(search.toLowerCase())) return false
      if (filterPrice && r.priceLevel !== filterPrice) return false
      if (filterZone && r.zone !== filterZone) return false
      return true
    }).sort((a, b) => (priceOrder[a.priceLevel] || 0) - (priceOrder[b.priceLevel] || 0))
  }, [search, filterPrice, filterZone])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="food" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Utensils className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Dove Mangiare</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Dai ristoranti stellati alle trattorie sul porto, il meglio della cucina di mare ponzese.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mare-400" />
            <input
              type="text"
              placeholder="Cerca ristorante..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-corallo/20"
            />
          </div>
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte focus:outline-none focus:ring-2 focus:ring-corallo/20"
          >
            <option value="">Tutte le zone</option>
            {zones.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white card-shadow text-sm text-notte focus:outline-none focus:ring-2 focus:ring-corallo/20"
          >
            <option value="">Tutti i prezzi</option>
            <option value="€">€</option>
            <option value="€€">€€</option>
            <option value="€€€">€€€</option>
            <option value="€€€€">€€€€</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, idx) => {
            const isBookmarked = bookmarked.has(r.id)
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.06 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden card-hover"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-notte text-sm sm:text-base">
                          {r.name}
                        </h3>
                        {r.note?.includes('Michelin') && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-corallo/10 text-corallo font-medium">★</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3 text-mare-400" />
                        <span className="text-xs text-mare-400">{r.zone}</span>
                        <span className="text-xs font-medium text-notte">{r.priceLevel}</span>
                        <span className="text-xs text-mare-400">{r.priceRange}</span>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(r.id)} className="p-1.5 rounded-lg hover:bg-ponza-50 transition-colors shrink-0">
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-corallo" /> : <Bookmark className="w-4 h-4 text-mare-300" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-mare-600 leading-relaxed line-clamp-2 mb-3">
                    {r.description}
                  </p>

                  <div className="bg-ponza-50/50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="w-3 h-3 text-tufo-500" />
                      <span className="text-[11px] font-semibold text-mare-600 uppercase tracking-wider">Specialità</span>
                    </div>
                    <p className="text-xs sm:text-sm text-mare-700">{r.specialty}</p>
                  </div>

                  {r.note && !r.note.includes('Michelin') && (
                    <div className="mt-2 text-[11px] text-mare-400 italic">{r.note}</div>
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
