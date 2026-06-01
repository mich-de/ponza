'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Sun, Waves, Utensils, Moon, Flame, Landmark, Ship, Wallet, Menu, X, ClipboardList } from 'lucide-react'

interface SectionNavProps {
  activeSection: string
  onSectionChange: (id: string) => void
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: Compass },
  { id: 'itinerary', label: 'Itinerario', icon: Sun },
  { id: 'beaches', label: 'Spiagge', icon: Waves },
  { id: 'food', label: 'Cucina', icon: Utensils },
  { id: 'nightlife', label: 'Nightlife', icon: Moon },
  { id: 'san-silverio', label: 'San Silverio', icon: Flame },
  { id: 'attractions', label: 'Attrazioni', icon: Landmark },
  { id: 'logistics', label: 'Logistica', icon: Ship },
  { id: 'budget', label: 'Budget', icon: Wallet },
]

export default function SectionNav({ activeSection, onSectionChange }: SectionNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [plannerStats, setPlannerStats] = useState({ bookmarks: 0, total: 0 })

  useEffect(() => {
    function handleUpdate(e: CustomEvent) {
      const state = e.detail
      const bookmarks = state.bookmarks?.length || 0
      const tasks = Object.values(state.predefinedTasks || {}).filter(Boolean).length
      const customDone = state.customTasks?.filter((t: any) => t.done).length || 0
      const customTotal = state.customTasks?.length || 0
      const predefTotal = Object.keys(state.predefinedTasks || {}).length
      setPlannerStats({ bookmarks, total: bookmarks + tasks + customDone + predefTotal + customTotal })
    }
    window.addEventListener('ponza-planner-update', handleUpdate as EventListener)
    return () => window.removeEventListener('ponza-planner-update', handleUpdate as EventListener)
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-ponza-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 bg-gradient-to-br from-ponza-500 to-tufo-600 rounded flex items-center justify-center">
                <span className="text-white text-[11px] font-bold">P</span>
              </div>
              <span className="font-display text-sm font-semibold text-notte hidden sm:inline">Ponza 2026</span>
              {plannerStats.bookmarks > 0 && (
                <span className="badge-pill text-[10px] ml-2 hidden sm:inline-flex">
                  <ClipboardList className="w-3 h-3" />
                  {plannerStats.bookmarks}
                </span>
              )}
            </div>

            <div className="hidden md:flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      isActive ? 'text-corallo' : 'text-mare-400 hover:text-notte'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-corallo rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {plannerStats.bookmarks > 0 && (
                <span className="badge-pill text-[10px]">
                  <ClipboardList className="w-3 h-3" />
                  {plannerStats.bookmarks}
                </span>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg hover:bg-ponza-50 transition-colors"
              >
                {menuOpen ? <X className="w-5 h-5 text-notte" /> : <Menu className="w-5 h-5 text-notte" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-ponza-100/30 md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, i) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      onSectionChange(item.id)
                      setMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-corallo/10 text-corallo' : 'text-mare-500 hover:bg-ponza-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <motion.div layoutId="mobile-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-corallo" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
