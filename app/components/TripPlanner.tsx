'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, X, Info, Bookmark, CheckSquare, Plus, Trash2, ChevronRight } from 'lucide-react'

interface PlannerState {
  bookmarks: string[]
  notes: string
  predefinedTasks: Record<string, boolean>
  customTasks: { id: string; text: string; done: boolean }[]
}

const defaultTasks: Record<string, boolean> = {
  'Prenotare aliscafo SNAV': false,
  'Prenotare alloggio': false,
  'Prenotare giro in barca Palmarola': false,
  'Prenotare ristorante per sabato sera': false,
  'Scarpe da scoglio': false,
  'Maschera e boccaglio': false,
  'Crema solare': false,
  'Contanti': false,
}

const STORAGE_KEY = 'ponza_planner'

export default function TripPlanner() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'info' | 'bookmarks' | 'checklist'>('checklist')
  const [state, setState] = useState<PlannerState>({
    bookmarks: [],
    notes: '',
    predefinedTasks: defaultTasks,
    customTasks: [],
  })
  const [newTask, setNewTask] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setState((prev) => ({
          ...prev,
          ...parsed,
          predefinedTasks: { ...defaultTasks, ...parsed.predefinedTasks },
        }))
      }
    } catch {}
  }, [])

  const persist = useCallback((next: PlannerState) => {
    setState(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent('ponza-planner-update', { detail: next }))
  }, [])

  const toggleTask = (key: string) => {
    persist({
      ...state,
      predefinedTasks: { ...state.predefinedTasks, [key]: !state.predefinedTasks[key] },
    })
  }

  const toggleCustom = (id: string) => {
    persist({
      ...state,
      customTasks: state.customTasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    })
  }

  const addCustomTask = () => {
    if (!newTask.trim()) return
    persist({
      ...state,
      customTasks: [...state.customTasks, { id: Date.now().toString(), text: newTask.trim(), done: false }],
    })
    setNewTask('')
  }

  const removeCustomTask = (id: string) => {
    persist({
      ...state,
      customTasks: state.customTasks.filter((t) => t.id !== id),
    })
  }

  const updateNotes = (notes: string) => {
    persist({ ...state, notes })
  }

  const completedCount =
    Object.values(state.predefinedTasks).filter(Boolean).length +
    state.customTasks.filter((t) => t.done).length
  const totalCount =
    Object.keys(state.predefinedTasks).length + state.customTasks.length

  if (!mounted) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl bg-notte text-white card-shadow flex items-center justify-center hover:bg-ponza-600 transition-colors"
      >
        <ClipboardList className="w-5 h-5" />
        {completedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-corallo text-white text-[10px] font-bold flex items-center justify-center">
            {completedCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-sabbia card-shadow"
            >
              <div className="flex items-center justify-between p-4 border-b border-ponza-100/50">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-corallo" />
                  <span className="font-display font-semibold text-notte">Pianificatore</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-ponza-50 transition-colors"
                >
                  <X className="w-4 h-4 text-mare-400" />
                </button>
              </div>

              <div className="flex border-b border-ponza-100/50">
                {[
                  { id: 'info', icon: Info, label: 'Info' },
                  { id: 'bookmarks', icon: Bookmark, label: 'Salvati' },
                  { id: 'checklist', icon: CheckSquare, label: `Checklist (${completedCount}/${totalCount})` },
                ].map((t) => {
                  const Icon = t.icon
                  const isActive = tab === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id as any)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-corallo border-b-2 border-corallo'
                          : 'text-mare-400 hover:text-notte'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  )
                })}
              </div>

              <div className="overflow-y-auto h-[calc(100%-9rem)] p-4">
                {tab === 'info' && (
                  <div className="space-y-4">
                    <div className="card-gradient card-shadow rounded-xl p-4">
                      <h4 className="font-display font-semibold text-sm text-notte mb-2">Il tuo viaggio</h4>
                      <div className="space-y-1.5 text-sm text-mare-600">
                        <p>📍 Isole Pontine · Ponza</p>
                        <p>📅 19–21 Giugno 2026</p>
                        <p>🚢 SNAV Napoli ↔ Ponza</p>
                        <p>🏠 Base consigliata: Ponza (Porto)</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-mare-500 uppercase tracking-wider mb-1.5">
                        Appunti personali
                      </label>
                      <textarea
                        value={state.notes}
                        onChange={(e) => updateNotes(e.target.value)}
                        placeholder="Scrivi i tuoi appunti..."
                        rows={5}
                        className="w-full rounded-xl bg-white card-shadow p-3 text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-corallo/20 resize-none"
                      />
                    </div>
                  </div>
                )}

                {tab === 'bookmarks' && (
                  <div className="space-y-3">
                    {state.bookmarks.length === 0 ? (
                      <div className="text-center py-8">
                        <Bookmark className="w-8 h-8 text-mare-300 mx-auto mb-2" />
                        <p className="text-sm text-mare-400">Nessun salvataggio</p>
                        <p className="text-xs text-mare-300 mt-1">
                          Clicca sull&apos;icona ⭐ su spiagge, ristoranti e locali per salvarli qui
                        </p>
                      </div>
                    ) : (
                      state.bookmarks.map((id) => (
                        <div key={id} className="card-gradient card-shadow rounded-xl p-3 flex items-center justify-between">
                          <span className="text-sm text-notte">{id}</span>
                          <button className="text-mare-300 hover:text-corallo transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {tab === 'checklist' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      {Object.entries(state.predefinedTasks).map(([task, done]) => (
                        <label
                          key={task}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => toggleTask(task)}
                            className="w-4 h-4 rounded accent-corallo"
                          />
                          <span className={`text-sm ${done ? 'line-through text-mare-300' : 'text-notte'}`}>
                            {task}
                          </span>
                        </label>
                      ))}
                    </div>

                    {state.customTasks.length > 0 && (
                      <div className="border-t border-ponza-100/50 pt-3 space-y-1">
                        {state.customTasks.map((t) => (
                          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/50 group">
                            <input
                              type="checkbox"
                              checked={t.done}
                              onChange={() => toggleCustom(t.id)}
                              className="w-4 h-4 rounded accent-corallo"
                            />
                            <span className={`flex-1 text-sm ${t.done ? 'line-through text-mare-300' : 'text-notte'}`}>
                              {t.text}
                            </span>
                            <button
                              onClick={() => removeCustomTask(t.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-mare-400 hover:text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustomTask()}
                        placeholder="Aggiungi un task..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white card-shadow text-sm text-notte placeholder:text-mare-300 focus:outline-none focus:ring-2 focus:ring-corallo/20"
                      />
                      <button
                        onClick={addCustomTask}
                        className="px-3 py-2 rounded-xl bg-corallo text-white text-sm font-medium hover:bg-corallo/90 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 border-t border-ponza-100/50 bg-white/60 p-3 text-center">
                <span className="text-[10px] text-mare-300">
                  {completedCount}/{totalCount} task completati · {state.bookmarks.length} salvati
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
