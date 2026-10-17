/* Caras de mobs (creeper, enderman, esqueleto) decorando los bordes del sitio. */
const MOBS = [
  { src: "creeper", side: "left", top: "6%", size: 84, delay: 0 },
  { src: "skeleton", side: "right", top: "11%", size: 72, delay: 1.2 },
  { src: "enderman", side: "left", top: "27%", size: 76, delay: 0.6 },
  { src: "creeper", side: "right", top: "38%", size: 64, delay: 1.8 },
  { src: "skeleton", side: "left", top: "50%", size: 80, delay: 0.3 },
  { src: "enderman", side: "right", top: "61%", size: 84, delay: 1.5 },
  { src: "creeper", side: "left", top: "73%", size: 68, delay: 0.9 },
  { src: "skeleton", side: "right", top: "83%", size: 76, delay: 0.2 },
  { src: "enderman", side: "left", top: "92%", size: 72, delay: 1.1 },
] as const;

export default function FloatingMobs() {
  return (
    <div aria-hidden className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      {MOBS.map((m, i) => (
        <img
          key={i}
          src={`/img/${m.src}.png`}
          alt=""
          width={m.size}
          height={m.size}
          className="mob-float absolute border-4 border-black/70 opacity-30 sm:opacity-90"
          style={{
            top: m.top,
            [m.side]: "-14px",
            width: m.size,
            height: m.size,
            imageRendering: "pixelated",
            animationDelay: `${m.delay}s`,
            boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
          }}
        />
      ))}
    </div>
  );
}
