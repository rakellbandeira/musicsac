import { useEffect, useRef, useState } from 'react'
import AudioListView from './components/AudioListView'
import AudioPlayer from './components/AudioPlayer'
import usePlayerStore from './store/usePlayerStore'

function App() {
  const isPlayerOpen = usePlayerStore(s => s.isPlayerOpen)
  const { audios, currentIndex, isPlaying, isRepeat, playNext } = usePlayerStore()

  const audioRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audio = currentIndex !== null ? audios[currentIndex] : null

  // Sync play/pause
  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentIndex])

  // When track changes, reload and play
  useEffect(() => {
    if (!audioRef.current || !audio) return
    audioRef.current.load()
    setProgress(0)
    if (isPlaying) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentIndex])

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      playNext()
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setProgress(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (val) => {
    audioRef.current.currentTime = val
    setProgress(val)
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans">

      {/* Global audio element — always mounted, never unmounts */}
      {audio && (
        <audio
          ref={audioRef}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="auto"
        >
          <source src={`/audio/${audio.ref}.mp3`} type="audio/mpeg" />
        </audio>
      )}

      {isPlayerOpen
        ? <AudioPlayer progress={progress} duration={duration} onSeek={handleSeek} />
        : <AudioListView />
      }
    </div>
  )
}

export default App