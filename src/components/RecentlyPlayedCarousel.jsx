import usePlayerStore from '../store/usePlayerStore'

function RecentlyPlayedCarousel() {
  const recentlyPlayed = usePlayerStore(s => s.recentlyPlayed)
  const setCurrentIndex = usePlayerStore(s => s.setCurrentIndex)
  const audios = usePlayerStore(s => s.audios)

  if (recentlyPlayed.length === 0) return null

  return (
    <div className="px-4 pt-6 pb-2">
      <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">Tocados Recentemente</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {recentlyPlayed.map((audio) => {
          const index = audios.findIndex(a => a.ref === audio.ref)
          return (
            <button
              key={audio.ref}
              onClick={() => setCurrentIndex(index)}
              className="flex-shrink-0 flex flex-col items-center gap-2 w-20"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800">
                <img src="/icon.png" alt={audio.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-zinc-400 text-center leading-tight line-clamp-2 w-full">
                {audio.title}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RecentlyPlayedCarousel