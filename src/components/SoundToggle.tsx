"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/Piano.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.error("Audio playback failed:", err);
      }
    }
  };

  return (
    <button
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/80 bg-white/70 text-ink shadow-glow backdrop-blur-xl transition hover:bg-white"
      onClick={toggleAudio}
      title={playing ? "Mute music" : "Play music"}
      type="button"
    >
      {playing ? <Volume2 size={19} /> : <VolumeX size={19} />}
    </button>
  );
}