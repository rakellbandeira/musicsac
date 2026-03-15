import { create } from 'zustand'
import audios from '../audios.json'

const usePlayerStore = create((set, get) => ({
  audios,
  currentIndex: null,
  isPlaying: false,
  isRepeat: false,
  recentlyPlayed: [],
  isPlayerOpen: false,

  setCurrentIndex: (index) => {
    const { recentlyPlayed, audios } = get()
    const audio = audios[index]
    const filtered = recentlyPlayed.filter(r => r.ref !== audio.ref)
    const updated = [audio, ...filtered].slice(0, 10)
    set({ currentIndex: index, recentlyPlayed: updated, isPlaying: true })
  },

  togglePlay: () => set(s => ({ isPlaying: !s.isPlaying })),
  toggleRepeat: () => set(s => ({ isRepeat: !s.isRepeat })),
  togglePlayer: () => set(s => ({ isPlayerOpen: !s.isPlayerOpen })),

  playNext: () => {
    const { currentIndex, audios } = get()
    if (currentIndex === null) return
    const next = (currentIndex + 1) % audios.length
    get().setCurrentIndex(next)
  },

  playPrev: () => {
    const { currentIndex, audios } = get()
    if (currentIndex === null) return
    const prev = (currentIndex - 1 + audios.length) % audios.length
    get().setCurrentIndex(prev)
  },
}))

export default usePlayerStore