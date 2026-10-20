'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Moon, MapPin, Music, Clock, Filter, Bookmark, BookmarkCheck } from 'lucide-react'
import nightlife from '@/data/nightlife.json'

const typeOrder: Record<string, number> = {
  'aperitivo storico': 1,
  'cocktail bar': 2,
  'beach club / happy hour': 3,
  'lounge bar': 4,
  'lounge / cocktail bar': 4,
  'pool aperitif': 5,
  'music club': 6,
  'piano bar': 7,
  'discoteca / club': 8,
  'pub': 9,
}

export default function Nightlife() {
  const [filterType, setFilterType] = useState('')
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set())

  const types = useMemo(() => [...new Set(nightlife.map((n) => n.type))], [])

  const sorted = useMemo(() => {
    let list = [...nightlife]
    if (filterType) {
      list = list.filter((n) => n.type === filterType)
    }
    return list.sort((a, b) => (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99))
  }, [filterType])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="nightlife" className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Moon className="w-5 h-5 text-corallo" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-notte">Nightlife</h2>
        </div>
        <p className="text-mare-500 mb-6 max-w-2xl">
          Dopo il tramonto, Ponza si trasforma. Aperitivi sul porto, beach club, musica dal vivo e discoteche.
        </p>

        <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setFilterType('')}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !filterType ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
            }`}
          >
            Tutti
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === t ? 'bg-corallo/10 text-corallo' : 'bg-white text-mare-500 hover:text-notte'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((n, idx) => {
            const isBookmarked = bookmarked.has(n.id)
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.06 }}
                className="card-gradient card-shadow rounded-2xl overflow-hidden card-hover"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-notte text-sm sm:text-base">{n.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3 text-mare-400" />
                        <span className="text-xs text-mare-400">{n.zone}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-ponza-100 text-ponza-600">
                          {n.type}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => toggleBookmark(n.id)} className="p-1.5 rounded-lg hover:bg-ponza-50 transition-colors shrink-0">
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-corallo" /> : <Bookmark className="w-4 h-4 text-mare-300" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-mare-600 leading-relaxed line-clamp-2 mb-3">{n.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {n.hours}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {n.priceLevel}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-ponza-50 text-ponza-600">
                      {n.music}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-mare-500">
                    <Music className="w-3 h-3" />
                    <span className="italic">{n.vibe}</span>
                  </div>

                  {n.note && (
                    <div className="mt-2 text-[11px] text-mare-400 italic">{n.note}</div>
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
