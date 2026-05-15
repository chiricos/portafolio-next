/* eslint-disable @next/next/no-img-element */
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/30 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="reveal text-sm font-medium text-accent tracking-widest uppercase mb-4">
              Disponible para proyectos
            </p>
            <h1 className="reveal d1 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-zinc-900 dark:text-white mb-6">
              Hola, soy <span className="text-accent">tu nombre</span>
            </h1>
            <p className="reveal d2 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-md mb-10">
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">Desarrollador Frontend & Drupal</strong>. Construyo productos digitales rápidos, limpios y accesibles que conectan el contenido con las personas.
            </p>
            <div className="reveal d3 flex flex-wrap gap-4">
              <a
                href="#work"
                className="shimmer inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors text-sm"
              >
                Ver mi trabajo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium px-7 py-3.5 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm"
              >
                Contactar
              </a>
            </div>

            <div className="reveal d4 flex gap-8 mt-14 pt-8 border-t border-zinc-100 dark:border-zinc-900">
              <div>
                <p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">20+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Proyectos</p>
              </div>
              <div>
                <p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">15+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Clientes</p>
              </div>
              <div>
                <p className="font-display font-bold text-3xl text-zinc-900 dark:text-white">3y</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Experiencia</p>
              </div>
            </div>
          </div>

          <div className="reveal d2 flex justify-center md:justify-end">
            <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="pf w-full h-full rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Foto de perfil"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-white font-display font-bold text-sm px-4 py-2.5 rounded-2xl shadow-lg">
                Abierto a proyectos
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
