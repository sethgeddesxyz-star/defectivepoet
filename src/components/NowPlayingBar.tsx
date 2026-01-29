"use client";

import { Play, Pause, X, SkipBack, SkipForward } from "lucide-react";
import { useAudioPlayerContext } from "./AudioPlayer";

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function NowPlayingBar() {
  const {
    currentSong,
    currentTitle,
    isPlaying,
    progress,
    duration,
    queue,
    queueIndex,
    toggle,
    seek,
    stop,
    playNext,
    playPrev,
  } = useAudioPlayerContext();

  if (!currentSong) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const hasQueue = queue.length > 0;
  const canPrev = hasQueue && queueIndex > 0;
  const canNext = hasQueue && queueIndex < queue.length - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-memorial-bg/95 backdrop-blur-md border-t border-gold-700/50 shadow-[0_-4px_24px_rgba(254,190,0,0.08)] z-50">
      {/* Progress bar */}
      <div
        className="group/progress h-1.5 bg-gold-900/30 cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          seek(pct * duration);
        }}
      >
        <div
          className="h-full gold-gradient transition-[width] duration-200 relative"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(254,190,0,0.6)] opacity-0 group-hover/progress:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="page-container py-4 flex items-center gap-4">
        {/* Skip prev */}
        {hasQueue && (
          <button
            onClick={playPrev}
            disabled={!canPrev}
            className="shrink-0 p-1.5 text-gold-500 hover:text-gold-300 disabled:opacity-30 transition-colors gold-focus"
            aria-label="Previous track"
          >
            <SkipBack size={20} />
          </button>
        )}

        {/* Play/pause */}
        <button
          onClick={() => toggle(currentSong, currentTitle || "")}
          className="shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gold-700/40 hover:bg-gold-600/50 text-gold-200 transition-all hover:scale-105 hover:shadow-[0_0_16px_rgba(254,190,0,0.2)] gold-focus"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>

        {/* Skip next */}
        {hasQueue && (
          <button
            onClick={playNext}
            disabled={!canNext}
            className="shrink-0 p-1.5 text-gold-500 hover:text-gold-300 disabled:opacity-30 transition-colors gold-focus"
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </button>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-gold-100 text-base font-medium truncate">
            {currentTitle}
          </p>
          <p className="text-gold-600 text-sm">
            {formatTime(progress)} / {formatTime(duration)}
            {hasQueue && (
              <span className="ml-2 text-gold-500">
                {queueIndex + 1} of {queue.length}
              </span>
            )}
          </p>
        </div>

        <button
          onClick={stop}
          className="shrink-0 p-2 text-gold-700 hover:text-gold-400 transition-colors gold-focus"
          aria-label="Close player"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
