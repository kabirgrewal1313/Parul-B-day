"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const nodes = useRef<Array<OscillatorNode | GainNode>>([]);

  const stop = () => {
    nodes.current.forEach((node) => {
      if ("stop" in node) {
        node.stop();
      }
      node.disconnect();
    });
    nodes.current = [];
    setPlaying(false);
  };

  const start = async () => {
    const context = new AudioContext();
    audioContext.current = context;
    const master = context.createGain();
    master.gain.value = 0.032;
    master.connect(context.destination);

    const notes = [261.63, 329.63, 392, 493.88];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.16 / (index + 1);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(index * 0.16);
      nodes.current.push(oscillator, gain);
    });

    const softLoop = () => {
      if (!audioContext.current || audioContext.current.state === "closed") {
        return;
      }
      const now = audioContext.current.currentTime;
      [329.63, 392, 523.25].forEach((frequency, index) => {
        const oscillator = audioContext.current!.createOscillator();
        const gain = audioContext.current!.createGain();
        oscillator.type = "triangle";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, now + index * 0.36);
        gain.gain.linearRampToValueAtTime(0.045, now + index * 0.36 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.36 + 1.4);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(now + index * 0.36);
        oscillator.stop(now + index * 0.36 + 1.5);
      });
      window.setTimeout(softLoop, 4200);
    };

    softLoop();
    setPlaying(true);
  };

  return (
    <button
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/80 bg-white/70 text-ink shadow-glow backdrop-blur-xl transition hover:bg-white"
      onClick={() => (playing ? stop() : start())}
      title={playing ? "Mute piano" : "Play soft piano"}
      type="button"
    >
      {playing ? <Volume2 size={19} /> : <VolumeX size={19} />}
    </button>
  );
}
