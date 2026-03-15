import RecentlyPlayedCarousel from './RecentlyPlayedCarousel'
import AudioCard from './AudioCard'
import MiniPlayer from './MiniPlayer'
import usePlayerStore from '../store/usePlayerStore'

function AudioListView() {
  const audios = usePlayerStore(s => s.audios)
  const currentIndex = usePlayerStore(s => s.currentIndex)

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-10 pb-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">Biblioteca de Áudios</h1>
        <p className="text-zinc-500 text-sm mt-1">{audios.length} áudios</p>
      </div>

      {/* Recently Played */}
      <RecentlyPlayedCarousel />

      {/* Divider */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500">Todos os Áudios</h2>
      </div>

      {/* Audio List */}
      <div className="flex-1 flex flex-col gap-1 px-2 pb-28">
        {audios.map((audio, index) => (
          <AudioCard key={audio.ref} audio={audio} index={index} />
        ))}
      </div>

      {/* Mini Player — only shown when something is selected */}
      {currentIndex !== null && <MiniPlayer />}
    </div>
  )
}

export default AudioListView