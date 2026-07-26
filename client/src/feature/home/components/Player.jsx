import React, { useRef, useState, useEffect } from 'react'
import { useSong } from '../hooks/useSong'
import './player.scss'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0')

    return `${m}:${s}`
}

const Player = () => {
    const { song } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const [speed, setSpeed] = useState(1)
    const [showSpeed, setShowSpeed] = useState(false)

    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if (!audioRef.current) return

        audioRef.current.load()

        setIsPlaying(false)
        setCurrentTime(0)
    }, [song?.url])

    if (!song) return null

    const togglePlay = () => {
        const audio = audioRef.current

        if (!audio) return

        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }

        setIsPlaying(!isPlaying)
    }

    const skip = (seconds) => {
        const audio = audioRef.current

        if (!audio) return

        audio.currentTime = Math.min(
            Math.max(audio.currentTime + seconds, 0),
            duration
        )
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleSongEnd = () => {
        setCurrentTime(0)
        setIsPlaying(false)
    }

    const handleProgressClick = (e) => {
        const rect = progressRef.current.getBoundingClientRect()

        const percent = (e.clientX - rect.left) / rect.width

        const newTime = percent * duration

        audioRef.current.currentTime = newTime

        setCurrentTime(newTime)
    }

    const handleSpeed = (value) => {
        setSpeed(value)

        audioRef.current.playbackRate = value

        setShowSpeed(false)
    }

    const handleVolume = (e) => {
        const value = Number(e.target.value)

        setVolume(value)

        audioRef.current.volume = value

        setIsMuted(value === 0)
    }

    const toggleMute = () => {
        if (isMuted) {
            audioRef.current.volume = volume
            setIsMuted(false)
        } else {
            audioRef.current.volume = 0
            setIsMuted(true)
        }
    }

    const progress = duration
        ? (currentTime / duration) * 100
        : 0

    return (
        <div className="player">

            <audio
                ref={audioRef}
                src={song.url}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleSongEnd}
            />

            {/* LEFT */}

            <div className="player__info">

                <img
                    src={song.posterUrl}
                    alt={song.title}
                    className="player__poster"
                />

                <div className="player__meta">

                    <h3 className="player__title">
                        {song.title}
                    </h3>

                    <p className="player__mood">
                        {song.mood}
                    </p>

                </div>

            </div>

            {/* CENTER */}

            <div className="player__center">

                <div className="player__controls">

                    <button
                        className="player__btn"
                        onClick={() => skip(-5)}
                    >
                        ⏪ 5s
                    </button>

                    <button
                        className="player__play"
                        onClick={togglePlay}
                    >
                        {isPlaying ? '❚❚' : '▶'}
                    </button>

                    <button
                        className="player__btn"
                        onClick={() => skip(5)}
                    >
                        5s ⏩
                    </button>

                </div>

                <div className="player__progress-wrap">

                    <span className="player__time">
                        {formatTime(currentTime)}
                    </span>

                    <div
                        className="player__progress"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >

                        <div
                            className="player__progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                        <div
                            className="player__progress-thumb"
                            style={{
                                left: `${progress}%`
                            }}
                        />

                    </div>

                    <span className="player__time">
                        {formatTime(duration)}
                    </span>

                </div>

            </div>

            {/* RIGHT */}

            <div className="player__right">

                <div className="player__speed-wrap">

                    <button
                        className="player__speed-btn"
                        onClick={() =>
                            setShowSpeed(!showSpeed)
                        }
                    >
                        {speed}×
                    </button>

                    {showSpeed && (

                        <div className="player__speed-menu">

                            {SPEED_OPTIONS.map((value) => (

                                <button
                                    key={value}
                                    className={`player__speed-option ${
                                        value === speed
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        handleSpeed(value)
                                    }
                                >
                                    {value}×
                                </button>

                            ))}

                        </div>

                    )}

                </div>

                <button
                    className="player__mute"
                    onClick={toggleMute}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>

                <input
                    className="player__volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                />

            </div>

        </div>
    )
}

export default Player