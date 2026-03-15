import usePlayerStore from '../store/usePlayerStore'

function MiniPlayer() {
  const { audios, currentIndex, isPlaying, togglePlay, togglePlayer } = usePlayerStore()

  const audio = currentIndex !== null ? audios[currentIndex] : null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-3 flex items-center gap-3 cursor-pointer z-50"
    >
      {/* Tap area to open full player */}
      <div className="flex-1 flex items-center gap-3" onClick={togglePlayer}>
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
          <img src="/icon.png" alt="now playing" className="w-full h-full object-cover" />
        </div>
        <p className="text-sm font-medium truncate text-white">
          {audio ? audio.title : 'Nenhum áudio selecionado'}
        </p>
      </div>

      {/* Play/Pause */}
      <button
        onClick={(e) => { e.stopPropagation(); togglePlay() }}
        className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Chevron up */}
      <button onClick={togglePlayer} className="text-zinc-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}

export default MiniPlayer