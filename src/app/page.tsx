import Countdown from "@/components/Countdown";
import CommentsSection from "@/components/CommentsSection";
import BackgroundMusic from "@/components/BackgroundMusic";
import FloatingMobs from "@/components/FloatingMobs";

export default function Home() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <BackgroundMusic />
      <FloatingMobs />

      <div className="relative z-10">
        {/* ========== HEADER / HERO ========== */}
        <header className="relative overflow-hidden border-b-4 border-[#2d1f14] bg-[#1a1a1a] min-h-[85vh] flex items-center">
          {/* Video de fondo en bucle (solo en la parte de los títulos) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/videos/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="absolute top-0 left-0 right-0 h-[72px] grass-strip" />

          <div className="relative max-w-4xl mx-auto text-center px-4 pt-24 pb-16">
            {/* Logo: pico + creeper */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src="/img/pickaxe.png" alt="Pico de diamante" width={96} height={96} className="w-20 h-20 sm:w-24 sm:h-24 pixel-bg" />
              <img
                src="/img/creeper.png"
                alt="Creeper"
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 pixel-bg border-4 border-black"
                style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.6)" }}
              />
            </div>
            <h1
              className="font-pixel text-xl sm:text-3xl md:text-4xl text-[#4CAF50] tracking-wider leading-relaxed mb-4"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              SERVER DE MINECRAFT PARA LOS PAPUPANAS
            </h1>
            <h2
              className="font-pixel text-xs sm:text-base text-[#FFC107] tracking-wide mb-3"
              style={{ textShadow: "3px 3px 0 #000" }}
            >
              SERVER PRIVADO
            </h2>
            <p className="text-sm text-[#E0E0E0] font-mono tracking-wider" style={{ textShadow: "2px 2px 0 #000" }}>
              Para los jugadores de Minecraft &amp; los Papupanas
            </p>

            <div className="flex justify-center gap-1 mt-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 border border-[#2d1f14] ${
                    i === 4 ? "bg-[#4CAF50]" : i % 2 === 0 ? "bg-[#8B6914]" : "bg-[#757575]"
                  }`}
                  style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.1), inset -1px -1px 0 rgba(0,0,0,0.3)" }}
                />
              ))}
            </div>
          </div>
        </header>

        {/* ========== COUNTDOWN ========== */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="inline-block bg-black/70 px-4 py-2 text-xl sm:text-2xl font-bold text-[#FFC107] font-mono tracking-wider mb-4">
              🕐 CUENTA REGRESIVA
            </h2>
            <p className="inline-block bg-black/70 px-3 py-1 text-[#E0E0E0] font-mono mb-8 text-sm">
              Faltan para el <span className="text-[#4CAF50] font-bold">28 de Diciembre</span>
            </p>
            <Countdown />
          </div>
        </section>

        {/* ========== INFORMACIÓN ========== */}
        <section className="py-12 px-4 border-y-4 border-[#2d1f14] bg-black/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8"><h2 className="inline-block bg-black/70 px-4 py-2 text-xl sm:text-2xl font-bold text-[#4CAF50] font-mono tracking-wider">
              📋 ¿QUÉ VA A PASAR?
            </h2></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tarjeta 1 */}
              <div
                className="p-6 bg-[#2d2d2d] border-4 border-[#4a3728]"
                style={{
                  boxShadow:
                    "inset 2px 2px 0 #3d3d3d, inset -2px -2px 0 #1d1d1d, 4px 4px 0 #0a0a0a",
                }}
              >
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="text-lg font-bold text-[#4CAF50] font-mono mb-2">
                  Actualizaciones del Servidor
                </h3>
                <p className="text-[#BDBDBD] font-mono text-sm leading-relaxed">
                  Próximamente se implementarán actualizaciones importantes en el
                  servidor. Nuevos plugins, mejoras de rendimiento y
                  configuraciones optimizadas para una mejor experiencia de
                  juego.
                </p>
              </div>

              {/* Tarjeta 2 */}
              <div
                className="p-6 bg-[#2d2d2d] border-4 border-[#4a3728]"
                style={{
                  boxShadow:
                    "inset 2px 2px 0 #3d3d3d, inset -2px -2px 0 #1d1d1d, 4px 4px 0 #0a0a0a",
                }}
              >
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-lg font-bold text-[#4CAF50] font-mono mb-2">
                  Opiniones y Feedback
                </h3>
                <p className="text-[#BDBDBD] font-mono text-sm leading-relaxed">
                  Se abrirá un espacio para que los jugadores compartan sus
                  opiniones sobre el servidor. Tu voz importa y ayudará a
                  mejorar la experiencia para todos.
                </p>
              </div>

              {/* Tarjeta 3 */}
              <div
                className="p-6 bg-[#2d2d2d] border-4 border-[#4a3728]"
                style={{
                  boxShadow:
                    "inset 2px 2px 0 #3d3d3d, inset -2px -2px 0 #1d1d1d, 4px 4px 0 #0a0a0a",
                }}
              >
                <div className="text-3xl mb-3">🎮</div>
                <h3 className="text-lg font-bold text-[#4CAF50] font-mono mb-2">
                  Retomando el Servidor
                </h3>
                <p className="text-[#BDBDBD] font-mono text-sm leading-relaxed">
                  El servidor será retomado con nuevas energías. Se planean
                  eventos especiales, nuevas modalidades de juego y una
                  comunidad más activa que nunca.
                </p>
              </div>

              {/* Tarjeta 4 */}
              <div
                className="p-6 bg-[#2d2d2d] border-4 border-[#4a3728]"
                style={{
                  boxShadow:
                    "inset 2px 2px 0 #3d3d3d, inset -2px -2px 0 #1d1d1d, 4px 4px 0 #0a0a0a",
                }}
              >
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="text-lg font-bold text-[#4CAF50] font-mono mb-2">
                  Nuevas Construcciones
                </h3>
                <p className="text-[#BDBDBD] font-mono text-sm leading-relaxed">
                  Se prepararán nuevas zonas de construcción, worlds
                  personalizados y proyectos colaborativos para que todos los
                  Papupanas puedan disfrutar.
                </p>
              </div>
            </div>

            {/* Mensaje destacado */}
            <div
              className="mt-8 p-4 bg-[#2E7D32]/20 border-2 border-[#4CAF50] text-center"
              style={{
                boxShadow: "inset 0 0 20px rgba(76,175,80,0.1)",
              }}
            >
              <p className="text-[#4CAF50] font-mono text-sm tracking-wide">
                📅 <strong>28 de Diciembre</strong> — ¡La fecha del
                renacimiento del servidor! ¡Prepárate!
              </p>
            </div>
          </div>
        </section>

        {/* ========== FORO / COMENTARIOS ========== */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-3"><h2 className="inline-block bg-black/70 px-4 py-2 text-xl sm:text-2xl font-bold text-[#4CAF50] font-mono tracking-wider">
              💬 FORO DE COMENTARIOS
            </h2></div>
            <p className="text-center mb-8"><span className="inline-block bg-black/70 px-3 py-1 text-[#E0E0E0] font-mono text-sm">
              Deja tu mensaje — será enviado directamente al correo del
              administrador
            </span></p>

            <div
              className="p-6 bg-[#2d2d2d] border-4 border-[#4a3728]"
              style={{
                boxShadow:
                  "inset 2px 2px 0 #3d3d3d, inset -2px -2px 0 #1d1d1d",
              }}
            >
              <CommentsSection />
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="py-8 px-4 border-t-4 border-[#2d1f14] bg-[#2d2d2d]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-3 mb-4">
              {["creeper", "enderman", "skeleton"].map((m) => (
                <img key={m} src={`/img/${m}.png`} alt="" width={40} height={40} className="w-10 h-10 pixel-bg border-2 border-black" />
              ))}
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 border border-[#2d1f14] ${
                    i % 3 === 0
                      ? "bg-[#4CAF50]"
                      : i % 3 === 1
                        ? "bg-[#8B6914]"
                        : "bg-[#757575]"
                  }`}
                  style={{
                    boxShadow:
                      "inset 1px 1px 0 rgba(255,255,255,0.1), inset -1px -1px 0 rgba(0,0,0,0.3)",
                  }}
                />
              ))}
            </div>
            <p className="text-[#757575] font-mono text-xs tracking-wider">
              ⛏ Server de Minecraft para los Papupanas © {new Date().getFullYear()}
            </p>
            <p className="text-[#555] font-mono text-xs mt-1">
              Para los jugadores de Minecraft &amp; los Papupanas
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
