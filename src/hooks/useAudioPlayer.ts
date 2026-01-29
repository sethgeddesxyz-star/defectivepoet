"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export interface QueueItem {
  src: string;
  title: string;
}

export interface AudioPlayerState {
  currentSong: string | null;
  currentTitle: string | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  queue: QueueItem[];
  queueIndex: number;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    currentSong: null,
    currentTitle: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    queue: [],
    queueIndex: -1,
  });

  // We need a ref for the queue so the "ended" handler can read current values
  const stateRef = useRef(state);
  stateRef.current = state;

  const playSource = useCallback((src: string, title: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.src !== window.location.origin + src) {
      audio.src = src;
      audio.load();
    }
    setState((prev) => ({
      ...prev,
      currentSong: src,
      currentTitle: title,
    }));
    audio.play().catch(() => {});
  }, []);

  const playNext = useCallback(() => {
    const { queue, queueIndex } = stateRef.current;
    if (queue.length === 0) return;
    const nextIndex = queueIndex + 1;
    if (nextIndex < queue.length) {
      const next = queue[nextIndex];
      setState((prev) => ({ ...prev, queueIndex: nextIndex }));
      playSource(next.src, next.title);
    } else {
      // Queue finished
      setState((prev) => ({
        ...prev,
        isPlaying: false,
        progress: 0,
        queue: [],
        queueIndex: -1,
      }));
    }
  }, [playSource]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      setState((prev) => ({ ...prev, progress: audio.currentTime }));
    });

    audio.addEventListener("loadedmetadata", () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    });

    audio.addEventListener("ended", () => {
      const { queue, queueIndex } = stateRef.current;
      if (queue.length > 0 && queueIndex + 1 < queue.length) {
        // Auto-advance to next in queue
        const nextIndex = queueIndex + 1;
        const next = queue[nextIndex];
        setState((prev) => ({
          ...prev,
          queueIndex: nextIndex,
          currentSong: next.src,
          currentTitle: next.title,
          progress: 0,
        }));
        audio.src = next.src;
        audio.load();
        audio.play().catch(() => {});
      } else {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          progress: 0,
          queue: [],
          queueIndex: -1,
        }));
      }
    });

    audio.addEventListener("pause", () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    });

    audio.addEventListener("play", () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback((src: string, title: string) => {
    // Clear queue when playing a single song directly
    setState((prev) => ({ ...prev, queue: [], queueIndex: -1 }));
    playSource(src, title);
  }, [playSource]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(
    (src: string, title: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (state.currentSong === src && state.isPlaying) {
        pause();
      } else {
        play(src, title);
      }
    },
    [state.currentSong, state.isPlaying, play, pause]
  );

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setState({
        currentSong: null,
        currentTitle: null,
        isPlaying: false,
        progress: 0,
        duration: 0,
        queue: [],
        queueIndex: -1,
      });
    }
  }, []);

  const playPrev = useCallback(() => {
    const { queue, queueIndex } = stateRef.current;
    if (queue.length === 0 || queueIndex <= 0) return;
    const prevIndex = queueIndex - 1;
    const prev = queue[prevIndex];
    setState((prev_) => ({ ...prev_, queueIndex: prevIndex }));
    playSource(prev.src, prev.title);
  }, [playSource]);

  const playQueue = useCallback((items: QueueItem[], shuffle: boolean) => {
    let list = [...items];
    if (shuffle) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    if (list.length === 0) return;
    setState((prev) => ({
      ...prev,
      queue: list,
      queueIndex: 0,
      currentSong: list[0].src,
      currentTitle: list[0].title,
    }));
    const audio = audioRef.current;
    if (audio) {
      audio.src = list[0].src;
      audio.load();
      audio.play().catch(() => {});
    }
  }, []);

  return {
    ...state,
    play,
    pause,
    toggle,
    seek,
    stop,
    playNext,
    playPrev,
    playQueue,
  };
}
