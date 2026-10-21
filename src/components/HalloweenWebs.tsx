"use client";

import { useEffect, useRef } from "react";

/* Decoración de Halloween: telarañas en las esquinas de arriba y arañas
   colgando de hilos que bajan, suben y se balancean al hacer scroll
   (y reaccionan un poco al mover el mouse). Es una capa fija que no
   bloquea clics ni cambia nada del resto del sitio. */

const SPIDERS = [
  { left: "6%", base: 50, factor: 0.18, max: 230, size: 40, phase: 0 },
  { left: "22%", base: 24, factor: 0.1, max: 120, size: 30, phase: 1.7 },
  { left: "47%", base: 18, factor: 0.07, max: 80, size: 26, phase: 3.1 },
  { left: "74%", base: 34, factor: 0.13, max: 170, size: 34, phase: 4.4 },
  { left: "93%", base: 56, factor: 0.2, max: 260, size: 42, phase: 5.6 },
] as const;

const RAYS = 6;
const RADII = [38, 70, 104, 142];

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [r * Math.cos(a), r * Math.sin(a)] as const;
}

function Web({ flip }: { flip?: boolean }) {
  const angles = Array.from({ length: RAYS }, (_, i) => (90 / (RAYS - 1)) * i);
  const arcs: string[] = [];
  RADII.forEach((r) => {
    for (let i = 0; i < RAYS - 1; i++) {
      const [x1, y1] = polar(r, angles[i]);
      const [x2, y2] = polar(r, angles[i + 1]);
      const [cx, cy] = polar(r * 0.82, (angles[i] + angles[i + 1]) / 2);
      arcs.push(`M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
  });
  return (
    <svg
      viewBox="0 0 150 150"
      className="absolute top-0 w-[110px] h-[110px] sm:w-[190px] sm:h-[190px]"
      style={{ [flip ? "right" : "left"]: 0, transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1"
      strokeLinecap="round"
    >
      {angles.map((a) => {
        const [x, y] = polar(146, a);
        return <line key={a} x1="0" y1="0" x2={x.toFixed(1)} y2={y.toFixed(1)} />;
      })}
      <path d={arcs.join(" ")} />
    </svg>
  );
}

function Spider({ size }: { size: number }) {
  const legs = [
    "M20 24 Q8 14 3 17",
    "M20 26 Q7 22 2 27",
    "M20 28 Q8 31 3 38",
    "M20 30 Q10 38 8 45",
    "M20 24 Q32 14 37 17",
    "M20 26 Q33 22 38 27",
    "M20 28 Q32 31 37 38",
    "M20 30 Q30 38 32 45",
  ];
  return (
    <svg viewBox="0 0 40 48" width={size} height={size * 1.2} className="spider-legs block">
      <g stroke="#0d0d0d" strokeWidth="2" fill="none" strokeLinecap="round">
        {legs.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <ellipse cx="20" cy="30" rx="8" ry="9.5" fill="#141414" stroke="#6b6b6b" strokeWidth="0.8" />
      <circle cx="20" cy="19" r="5.5" fill="#141414" stroke="#6b6b6b" strokeWidth="0.8" />
      <circle cx="17.8" cy="18" r="1.3" fill="#ff3b30" />
      <circle cx="22.2" cy="18" r="1.3" fill="#ff3b30" />
      <path d="M20 26 L22.5 30 L20 34 L17.5 30 Z" fill="#ff6a00" opacity="0.85" />
    </svg>
  );
}

export default function HalloweenWebs() {
  const rootRefs = useRef<(HTMLDivElement | null)[]>([]);
  const threadRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = window.scrollY;
    let target = window.scrollY;
    let mouse = 0;
    let raf = 0;

    const onScroll = () => {
      target = window.scrollY;
    };
    const onMouse = (e: MouseEvent) => {
      mouse = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const tick = (t: number) => {
      current += (target - current) * 0.07;
      const time = t / 1000;
      SPIDERS.forEach((s, i) => {
        const root = rootRefs.current[i];
        const thread = threadRefs.current[i];
        if (!root || !thread) return;
        const len = Math.min(s.base + current * s.factor, s.max) + (reduce ? 0 : Math.sin(time * 1.6 + s.phase) * 5);
        const angle = reduce ? 0 : Math.sin(current * 0.012 + s.phase) * 7 + Math.sin(time * 0.9 + s.phase) * 2 + mouse * 4;
        thread.style.height = `${len}px`;
        root.style.transform = `rotate(${angle}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 h-screen z-40 pointer-events-none overflow-hidden">
      <Web />
      <Web flip />
      {SPIDERS.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            rootRefs.current[i] = el;
          }}
          className="absolute top-0 flex flex-col items-center"
          style={{ left: s.left, transformOrigin: "top center", marginLeft: -s.size / 2, width: s.size }}
        >
          <div
            ref={(el) => {
              threadRefs.current[i] = el;
            }}
            style={{ width: 1, height: s.base, background: "rgba(255,255,255,0.65)" }}
          />
          <Spider size={s.size} />
        </div>
      ))}
    </div>
  );
}
