import usePlayerStore from '../store/usePlayerStore'

function AudioCard({ audio, index }) {
  const setCurrentIndex = usePlayerStore(s => s.setCurrentIndex)
  const currentIndex = usePlayerStore(s => s.currentIndex)
  const isPlaying = usePlayerStore(s => s.isPlaying)
  const togglePlay = usePlayerStore(s => s.togglePlay)

  const isActive = currentIndex === index

  const handleClick = () => {
    if (isActive) {
      togglePlay()
    } else {
      setCurrentIndex(index)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-colors cursor-pointer ${isActive ? 'bg-zinc-800' : 'hover:bg-zinc-900'}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800">
        <img src="/icon.png" alt={audio.title} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
          {audio.title}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">Número {audio.ref}</p>
      </div>

      {/* Play button */}
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">
        {isActive && isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  )
}

export default AudioCard