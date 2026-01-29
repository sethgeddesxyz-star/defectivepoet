"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAudioPlayer, AudioPlayerState, QueueItem } from "@/hooks/useAudioPlayer";

interface AudioPlayerContextType extends AudioPlayerState {
  play: (src: string, title: string) => void;
  pause: () => void;
  toggle: (src: string, title: string) => void;
  seek: (time: number) => void;
  stop: () => void;
  playNext: () => void;
  playPrev: () => void;
  playQueue: (items: QueueItem[], shuffle: boolean) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const player = useAudioPlayer();

  return (
    <AudioPlayerContext.Provider value={player}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayerContext() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayerContext must be used within AudioPlayerProvider"
    );
  }
  return context;
}
