"use client";

import { useState } from "react";
import { Play, Pause, Download, Link } from "lucide-react";
import { useAudioPlayerContext } from "./AudioPlayer";
import type { Song } from "@/data/songs";

interface SongItemProps {
  song: Song;
}

export default function SongItem({ song }: SongItemProps) {
  const { currentSong, isPlaying, toggle } = useAudioPlayerContext();
  const [copied, setCopied] = useState(false);

  const encodedFilename = encodeURIComponent(song.filename);
  const songPath =
    song.category === "featured"
      ? `/songs/featured/${encodedFilename}`
      : `/songs/collection/${encodedFilename}`;

  const isCurrentlyPlaying = currentSong === songPath && isPlaying;

  const handleShare = () => {
    const url = `${window.location.origin}/music?play=${song.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex items-center py-2.5 px-3 rounded-lg hover:bg-gold-900/20 transition-colors group ${isCurrentlyPlaying ? "border-l-2 border-gold-500" : "border-l-2 border-transparent"}`}>
      <button
        onClick={() => toggle(songPath, song.title)}
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gold-800/40 hover:bg-gold-700/60 text-gold-300 hover:text-gold-100 transition-all hover:scale-110 gold-focus"
        aria-label={isCurrentlyPlaying ? `Pause ${song.title}` : `Play ${song.title}`}
      >
        {isCurrentlyPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      <div className="flex items-center shrink-0 ml-1">
        <div className="relative">
          <button
            onClick={handleShare}
            className="p-1.5 text-gold-600 hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity gold-focus"
            aria-label={`Copy link to ${song.title}`}
            title="Copy link"
          >
            <Link size={14} />
          </button>
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-gold-400 bg-gold-900 px-2 py-0.5 rounded whitespace-nowrap animate-fade-out">
              Copied!
            </span>
          )}
        </div>
        <a
          href={songPath}
          download
          className="p-1.5 text-gold-600 hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity gold-focus"
          aria-label={`Download ${song.title}`}
          title="Download"
        >
          <Download size={14} />
        </a>
      </div>
      <span className={`ml-2 text-sm truncate ${isCurrentlyPlaying ? "text-gold-400 font-medium" : "text-gold-200"}`}>
        {song.title}
      </span>
    </div>
  );
}
