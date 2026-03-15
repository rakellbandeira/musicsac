import usePlayerStore from '../store/usePlayerStore'

function AudioPlayer({ progress, duration, onSeek }) {
  const {
    audios,
    currentIndex,
    isPlaying,
    isRepeat,
    togglePlay,
    toggleRepeat,
    togglePlayer,
    playNext,
    playPrev,
  } = usePlayerStore()

  const audio = currentIndex !== null ? audios[currentIndex] : null

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-between px-6 py-10">

      {/* Top bar */}
      <div className="w-full flex items-center justify-between">
        <button onClick={togglePlayer} className="text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-xs uppercase tracking-widest text-zinc-500">Now Playing</span>
        <div className="w-6" />
      </div>

      {/* Album Art */}
      <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 mt-8">
        <img src="/icon.png" alt="cover" className="w-full h-full object-cover" />
      </div>

      {/* Title & Ref */}
      <div className="w-full text-center mt-6">
        <h2 className="text-xl font-bold text-white truncate">
          {audio.ref}. {audio ? audio.title : 'No audio selected'}
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-6">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={progress}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="w-full h-1 accent-white cursor-pointer"
        />
        <div className="flex justify-between text-xs text-zinc-500 mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full flex items-center justify-between px-4 mt-6">

        {/* Repeat */}
        <button
          onClick={toggleRepeat}
          className={`transition-colors ${isRepeat ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 0 1 17.17-6.33l1.33-1.33A.75.75 0 0 1 22 4.94v4a.75.75 0 0 1-.75.75h-4a.75.75 0 0 1-.53-1.28l1.14-1.14A8.25 8.25 0 1 0 20.25 12a.75.75 0 0 1 1.5 0A9.75 9.75 0 0 1 2.25 12zm9-4.5a.75.75 0 0 1 .75.75v4.19l2.03 2.03a.75.75 0 0 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1-.22-.53V8.25a.75.75 0 0 1 .75-.75z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Prev */}
        <button onClick={playPrev} className="text-zinc-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button onClick={playNext} className="text-zinc-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
          </svg>
        </button>

        <div className="w-6" />
      </div>

      <div className="h-6" />
    </div>
  )
}

export default AudioPlayer