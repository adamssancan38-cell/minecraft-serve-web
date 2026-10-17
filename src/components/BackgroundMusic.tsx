"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Música de fondo en bucle infinito.
 * Intenta sonar apenas se entra al sitio. Los navegadores bloquean el audio
 * automático hasta que haya una interacción, así que si falla, arranca con
 * el primer clic / toque / tecla. El botón flotante permite silenciarla.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    const events = ["pointerdown", "touchstart", "keydown"] as const;
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, startOnInteraction));

    const startOnInteraction = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          cleanup();
        })
        .catch(() => {});
    };

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        events.forEach((e) =>
          window.addEventListener(e, startOnInteraction, { passive: true })
        );
      });

    return cleanup;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        onError={() => setAvailable(false)}
      >
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>
      {available && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Silenciar música" : "Activar música"}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 text-2xl bg-[#2d2d2d] border-4 border-[#4a3728] hover:border-[#4CAF50] cursor-pointer"
          style={{ boxShadow: "inset 2px 2px 0 #3d3d3d, 3px 3px 0 #0a0a0a" }}
        >
          {playing ? "🔊" : "🔇"}
        </button>
      )}
    </>
  );
}
