"use client";

import SongItem from "./SongItem";
import type { Song } from "@/data/songs";

interface SongListProps {
  songs: Song[];
  title?: string;
  subtitle?: string;
}

export default function SongList({ songs, title, subtitle }: SongListProps) {
  return (
    <section>
      {title && <h2 className="text-2xl font-heading text-gold-400 mb-1">{title}</h2>}
      {subtitle && (
        <p className="text-gold-600 text-sm mb-4">{subtitle}</p>
      )}
      <div className="divide-y divide-gold-900/20">
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
}
