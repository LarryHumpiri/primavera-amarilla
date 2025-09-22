import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, VolumeX, MousePointerClick, X } from "lucide-react";


export default function PrimaveraAmarilla() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    const tryPlay = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.8;
          await audioRef.current.play();
          setAutoplayBlocked(false);
        }
      } catch {
        setAutoplayBlocked(true);
      }
    };
    tryPlay();
    const onFirstGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    window.addEventListener("scroll", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  // =============================
  // ELEMENTOS DECORATIVOS
  // =============================
  const Petalo = ({ delay = 0, x = 0, scale = 1 }: { delay?: number; x?: number; scale?: number }) => (
    <motion.div
      initial={{ y: -80, opacity: 0, x }}
      animate={{ y: "105vh", opacity: [0, 1, 1, 0], x: x + (Math.random() * 60 - 30) }}
      transition={{ duration: 10 + Math.random() * 8, delay, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute top-0"
      style={{ left: `${Math.random() * 100}%`, transform: `scale(${scale})` }}
    >
      <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="petaloA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="60%" stopColor="#FFEB3B" />
            <stop offset="100%" stopColor="#FBC02D" />
          </linearGradient>
          <filter id="sombra" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#00000055" />
          </filter>
        </defs>
        <path d="M32 6 C40 16, 46 28, 32 58 C18 28, 24 16, 32 6 Z" fill="url(#petaloA)" filter="url(#sombra)" />
      </svg>
    </motion.div>
  );

  const Petalos = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <Petalo key={i} delay={i * 0.4} x={(i % 8) * 8} scale={0.7 + Math.random() * 1.2} />
      ))}
    </div>
  );

  // =============================
  // GIRASOL SVG
  // =============================
  const Sunflower = () => (
    <div className="relative w-[22rem] h-[22rem] md:w-[26rem] md:h-[26rem] mx-auto">
      {/* halo */}
      <motion.div
        className="absolute inset-0 rounded-full bg-yellow-200/50 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* pétalos: 3 coronas con offset y nervaduras */}
      {[
        {n: 32, r: 150, w: 60, h: 130, off: -8, from: "#FFF9C4", via: "#FFD54F", to: "#F9A825"},
        {n: 26, r: 122, w: 52, h: 110, off: -4, from: "#FFECB3", via: "#FFC107", to: "#F57F17"},
        {n: 20, r: 96,  w: 44, h: 92,  off:  0, from: "#FFF3E0", via: "#FFE082", to: "#F9A825"},
      ].map((c, idx) => (
        <svg key={idx} className="absolute inset-0" viewBox="-200 -200 400 400">
          <defs>
            <radialGradient id={`petalGrad${idx}`} cx="50%" cy="30%">
              <stop offset="0%" stopColor={c.from} />
              <stop offset="60%" stopColor={c.via} />
              <stop offset="100%" stopColor={c.to} />
            </radialGradient>
          </defs>
          {Array.from({ length: c.n }).map((_, i) => {
            const ang = (i * 360) / c.n + (idx === 1 ? 10 : idx === 2 ? -10 : 0);
            return (
              <g key={i} transform={`rotate(${ang}) translate(0 ${-c.r})`}>
                <path d={`M0 ${c.off} C ${c.w/2} ${c.h/3}, ${c.w/2} ${c.h*0.8}, 0 ${c.h} C ${-c.w/2} ${c.h*0.8}, ${-c.w/2} ${c.h/3}, 0 ${c.off}`} fill={`url(#petalGrad${idx})`} stroke="#E69A13" strokeOpacity="0.18" />
                {Array.from({length:3}).map((_,k)=> (
                  <path key={k} d={`M${(k-1)*6} ${c.off+8} C ${(k-1)*6} ${c.h*0.45}, ${(k-1)*6} ${c.h*0.75}, 0 ${c.h-6}`} stroke="#DDAA3B" strokeOpacity="0.25" fill="none" />
                ))}
              </g>
            );
          })}
        </svg>
      ))}
      {/* disco central */}
      <svg className="absolute inset-0" viewBox="-200 -200 400 400">
        <defs>
          <radialGradient id="centerG" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#6D4C41" />
            <stop offset="100%" stopColor="#4E342E" />
          </radialGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2E7D32"/>
            <stop offset="100%" stopColor="#1B5E20"/>
          </linearGradient>
        </defs>
        <circle cx="0" cy="0" r="76" fill="url(#centerG)" stroke="#8D6E63" strokeWidth="10" />
        <circle cx="-18" cy="-22" r="18" fill="#ffffff22" />
        {Array.from({ length: 340 }).map((_, i) => {
          const phi = (Math.sqrt(5) + 1) / 2;
          const a = i * (360 / (phi * phi));
          const r = Math.sqrt(i) * 4.6;
          const x = r * Math.cos((a * Math.PI) / 180);
          const y = r * Math.sin((a * Math.PI) / 180);
          return <circle key={i} cx={x/4} cy={y/4} r={(i % 3) * 0.6 + 0.6} fill={i % 4 === 0 ? "#3E2723" : "#5D4037"} opacity="0.92" />;
        })}
        {/* tallo */}
        <rect x="-6" y="76" width="12" height="180" rx="6" fill="#1B5E20" />
        {/* hojas realistas con vena central */}
        <g transform="translate(-10,180) rotate(-22)">
          <path d="M0 0 C 40 -10, 78 10, 96 34 C 78 22, 40 20, 0 24 Z" fill="url(#leafGrad)" />
          <path d="M8 20 C 30 18, 54 22, 86 32" stroke="#A5D6A7" strokeWidth="1.5" fill="none" opacity="0.8"/>
          <path d="M28 18 C 38 20, 46 24, 58 28" stroke="#81C784" strokeWidth="1" fill="none" opacity="0.7"/>
        </g>
        <g transform="translate(10,210) rotate(158)">
          <path d="M0 0 C 40 -10, 78 10, 96 34 C 78 22, 40 20, 0 24 Z" fill="url(#leafGrad)" />
          <path d="M8 20 C 30 18, 54 22, 86 32" stroke="#A5D6A7" strokeWidth="1.5" fill="none" opacity="0.8"/>
          <path d="M28 18 C 38 20, 46 24, 58 28" stroke="#81C784" strokeWidth="1" fill="none" opacity="0.7"/>
        </g>
      </svg>
    </div>
  );

  // =============================
  // BOTELLA (click para abrir/cerrar carta)
  // =============================
  const Bottle = () => (
    <motion.button
      type="button"
      onClick={() => setLetterOpen(v => !v)}
      className="mx-auto w-32 md:w-40 focus:outline-none"
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{ y: [0, -6, 0], rotate: [-2, 2, -2], opacity: 1 }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      aria-label="Abrir carta"
    >
      <svg viewBox="0 0 128 220" className="drop-shadow-xl">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D1F2FF" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#B2EBF2" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B3E5FC"/>
            <stop offset="100%" stopColor="#4FC3F7"/>
          </linearGradient>
        </defs>
        {/* mar */}
        <path d="M0 200 Q32 190 64 200 T128 200 L128 220 L0 220 Z" fill="url(#sea)" opacity="0.6"/>
        {/* botella */}
        <g transform="translate(24,20)">
          <rect x="24" y="0" width="32" height="24" rx="6" fill="#795548"/>
          <rect x="22" y="24" width="36" height="8" rx="4" fill="#C8E6C9"/>
          <path d="M16 32 L72 32 L84 160 Q64 188 24 160 Z" fill="url(#glass)" stroke="#90CAF9" strokeWidth="2"/>
          {/* carta adentro */}
          <rect x="34" y="64" width="28" height="56" rx="3" fill="#FFF8E1" stroke="#E6D9B6"/>
        </g>
      </svg>
      <div className="mt-2 text-xs md:text-sm text-amber-800/80 inline-flex items-center gap-1">
        <MousePointerClick className="w-4 h-4" /> {letterOpen ? "Cerrar carta" : "Toca la botella"}
      </div>
    </motion.button>
  );

  // Carta desplegable con logo y tono integrado
  const ScrollLetter = ({ children }: { children: any }) => (
    <motion.div
      initial={{ y: 60, scale: 0.96, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      exit={{ y: 60, scale: 0.96, opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative mx-auto max-w-3xl rounded-[22px] border border-amber-300/70 shadow-2xl overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #fff5da 0%, #fbeac7 55%, #f7dfb7 100%)",
      }}
    >
      {/* textura */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(0,0,0,0.06),transparent_35%),radial-gradient(circle_at_90%_90%,rgba(0,0,0,0.06),transparent_35%)]"/>
      <div className="relative p-7 md:p-12">
        <div className="flex items-center justify-center">
          <div className="h-px w-16 bg-amber-600/30"/>
          <div className="mx-3 text-amber-800 tracking-[0.3em] font-semibold text-xs md:text-sm">VERNALIS</div>
          <div className="h-px w-16 bg-amber-600/30"/>
        </div>
        <h3 className="text-center mt-3 text-3xl md:text-4xl font-serif font-bold text-amber-800">Carta de Primavera</h3>

        <div className="mt-6 text-amber-900/95 font-serif tracking-wide leading-relaxed text-lg md:text-xl">
          <span className="float-left text-5xl md:text-6xl font-bold pr-2 leading-[0.8] text-amber-700">C</span>
          uando el día se hace más largo y el cielo huele a estreno, la tierra recuerda su viejo truco: florecer. No hay hechizo más antiguo ni más nuevo que este. Una luz se posa en tu hombro y todo lo cotidiano se vuelve extraordinario.
        </div>
        <p className="mt-4 text-amber-900/95 font-serif tracking-wide leading-relaxed text-lg md:text-xl">
          Que esta estación te encuentre con el alma abierta: que te rías sin miedo, que camines ligero, que lo que anhelas encuentre camino. Si alguna vez dudas, mira un pétalo: también fue semilla, también tembló.
        </p>
        <p className="mt-4 text-amber-900/95 font-serif tracking-wide leading-relaxed text-lg md:text-xl">
          Hoy te dejo flores amarillas para que recuerdes que la alegría es terca y vuelve, siempre vuelve. Si hay viento, que te empuje. Si hay sol, que te nombre.
        </p>

        {/* firma con tu logo integrado al tono pergamino */}
        <div className="mt-8 flex items-end justify-end gap-4">
          <div className="relative w-[68px] h-[68px] rounded-full overflow-hidden shadow" style={{
            background: "linear-gradient(135deg,#FFE0B2,#FFCC80)",
            border: "2px solid #D7A86E"
          }}>
            <img
              src="/lions-logo.png"
              alt="Lions King"
              className="w-full h-full object-cover"
              style={{
                mixBlendMode: "multiply" as any,
                filter: "grayscale(0.15) sepia(0.35) saturate(0.95) hue-rotate(-10deg) brightness(1.02)",
                opacity: 0.95
              }}
            />
          </div>
          <div className="text-right">
            <div className="text-xl md:text-2xl font-serif font-semibold text-amber-900">Con mucho cariño,</div>
            <div className="-mt-1 text-2xl md:text-3xl italic text-amber-800">Lions King</div>
          </div>
        </div>

        {/* botón cerrar */}
        <button
          onClick={() => setLetterOpen(false)}
          className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-2 rounded-full bg-amber-600/90 hover:bg-amber-700 text-white text-xs shadow"
        >
          <X className="w-3 h-3"/> Cerrar
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full overflow-hidden" style={{background:"linear-gradient(to bottom,#FFF8E1,#FFFDE7)"}}>
      {/* Luz de fondo */}
      <motion.div
        className="fixed inset-0 -z-10"
        animate={{ background: [
          "radial-gradient(60% 60% at 50% 40%, rgba(255,249,196,0.8) 0%, rgba(255,236,179,0.2) 50%, transparent 75%)",
          "radial-gradient(60% 60% at 50% 40%, rgba(255,236,179,0.8) 0%, rgba(255,224,130,0.2) 50%, transparent 75%)",
          "radial-gradient(60% 60% at 50% 40%, rgba(255,249,196,0.8) 0%, rgba(255,236,179,0.2) 50%, transparent 75%)",
        ] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <Petalos />

      <header className="relative z-10 px-6 pt-8 flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-yellow-600 drop-shadow-sm"
        >
          Primavera Amarilla
        </motion.h1>
        <button onClick={toggleMute} className="rounded-full p-2 bg-white/70 hover:bg-white shadow-md backdrop-blur" aria-label="Silenciar o activar sonido">
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-28">
        {/* Portada */}
        <section className="text-center mt-10 md:mt-16">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 text-sm md:text-base px-4 py-2 rounded-full bg-white/60 backdrop-blur shadow"
          >
            <Sparkles className="w-4 h-4" /> Inicio de la Primavera • 21 de septiembre 🌸
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-amber-700 via-yellow-600 to-amber-800"
          >
            ¡Feliz Día de la Primavera!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 text-base md:text-lg text-neutral-700"
          >
            El sol vuelve a escribir su carta sobre nuestras manos: es tiempo de florecer.
          </motion.p>
        </section>

        {/* Girasol */}
        <section className="mt-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Sunflower />
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl leading-relaxed text-neutral-800"
            >
              En el borde del invierno, una semilla escucha el llamado. Rompe la tierra, bebe la lluvia y memoriza el idioma del sol. Lo que fue espera se vuelve color. Lo que fue silencio, canción.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mt-4 text-lg md:text-xl leading-relaxed text-neutral-800"
            >
              De ese impulso nace un girasol: primero tímido, luego faro. Sus pétalos no piden permiso para brillar; al brillar, recuerdan que la vida insiste.
            </motion.p>
          </div>
        </section>

        {/* Botella con carta que emerge */}
        <section className="mt-20">
          <div className="flex flex-col items-center gap-6">
            <Bottle />
            <div className="text-xs md:text-sm text-amber-900/80">Una carta mítica ha llegado con la marea…</div>
          </div>

          <div className="mt-8">
            <AnimatePresence>{letterOpen && (
              <ScrollLetter>
                {/* texto ya definido arriba dentro del componente */}
              </ScrollLetter>
            )}</AnimatePresence>
          </div>
        </section>
      </main>

      {/* Música */}
      <audio ref={audioRef} src="/spring-melody.mp3" loop preload="auto" autoPlay playsInline />

      {/* Nota autoplay */}
      {autoplayBlocked && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="px-5 py-3 rounded-full bg-amber-500 text-white font-semibold shadow-lg">
            Toca la pantalla para activar la música 🎵
          </div>
        </div>
      )}

      {/* Accesibilidad */}
      <div className="sr-only" aria-live="polite">
        La música intenta reproducirse automáticamente. Si no la escuchas, toca la pantalla una vez.
      </div>
    </div>
  );
}
