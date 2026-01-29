"use client";

import { useEffect } from "react";
import { AudioPlayerProvider, useAudioPlayerContext } from "@/components/AudioPlayer";
import SongList from "@/components/SongList";
import NowPlayingBar from "@/components/NowPlayingBar";
import { featuredSongs, collectionSongs, getSongById } from "@/data/songs";
import { zachMusicQuote } from "@/data/siteContent";
import { Play, Shuffle } from "lucide-react";
import type { QueueItem } from "@/hooks/useAudioPlayer";

function songToQueueItem(song: { filename: string; title: string; category: string }): QueueItem {
  const encoded = encodeURIComponent(song.filename);
  return {
    src: song.category === "featured"
      ? `/songs/featured/${encoded}`
      : `/songs/collection/${encoded}`,
    title: song.title,
  };
}

function MusicPageContent() {
  const { playQueue, toggle } = useAudioPlayerContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const playId = params.get("play");
    if (!playId) return;
    const song = getSongById(Number(playId));
    if (!song) return;
    const encoded = encodeURIComponent(song.filename);
    const src = song.category === "featured"
      ? `/songs/featured/${encoded}`
      : `/songs/collection/${encoded}`;
    toggle(src, song.title);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playAlbum = () => {
    playQueue(featuredSongs.map(songToQueueItem), false);
  };

  const shuffleAll = () => {
    const allSongs = [...featuredSongs, ...collectionSongs];
    playQueue(allSongs.map(songToQueueItem), true);
  };

  return (
    <>
      <div className="page-container py-10 pb-28">
        <h1 className="text-3xl sm:text-4xl font-heading text-gold-400 mb-6 animate-fade-in-up">
          Music
        </h1>

        <p className="text-gold-200 leading-relaxed mb-10 max-w-3xl animate-fade-in-up-delayed">
          {zachMusicQuote}
        </p>

        <div className="space-y-12 animate-fade-in-up-delayed-2">
          <section>
            <div className="flex flex-wrap items-center gap-4 mb-1">
              <h2 className="text-2xl font-heading text-gold-400">American Sinner</h2>
              <div className="flex gap-2">
                <button
                  onClick={playAlbum}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gold-800/50 hover:bg-gold-700/60 text-gold-200 rounded-lg text-sm font-medium transition-colors gold-focus"
                >
                  <Play size={15} />
                  Play Album
                </button>
                <button
                  onClick={shuffleAll}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gold-900/40 hover:bg-gold-800/50 text-gold-300 rounded-lg text-sm font-medium transition-colors gold-focus"
                >
                  <Shuffle size={15} />
                  Shuffle All
                </button>
              </div>
            </div>
            <p className="text-gold-600 text-sm mb-4">17 featured tracks</p>
            <SongList songs={featuredSongs} />
          </section>

          <SongList
            title="More Songs"
            subtitle={`${collectionSongs.length} tracks — free to stream and download`}
            songs={collectionSongs}
          />
        </div>
      </div>
      <NowPlayingBar />
    </>
  );
}

export default function MusicPage() {
  return (
    <AudioPlayerProvider>
      <MusicPageContent />
    </AudioPlayerProvider>
  );
}
