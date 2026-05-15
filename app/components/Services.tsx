const services = [
  {
    title: "Desarrollo Frontend",
    description:
      "Interfaces modernas con Next.js, React y Tailwind CSS. Código de producción, responsive, accesible y optimizado para SEO.",
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    dark: false,
  },
  {
    title: "Drupal & CMS",
    description:
      "Desarrollo e integración con Drupal como headless CMS. API REST y JSON:API para conectar tu contenido con cualquier frontend.",
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    dark: true,
  },
  {
    title: "Landing Pages",
    description:
      "Páginas de alta conversión para productos y marcas. Diseñadas para comunicar valor desde el primer scroll y generar acción.",
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    dark: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
            Lo que hago
          </p>
          <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">
            Servicios
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`reveal d${i + 1} card-h group rounded-2xl p-8 border hover:border-accent ${
                s.dark
                  ? "bg-zinc-900 dark:bg-zinc-800 border-zinc-800"
                  : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-accent/10 transition-colors ${
                  s.dark
                    ? "bg-zinc-800 dark:bg-zinc-700 group-hover:bg-accent/20"
                    : "bg-orange-50 dark:bg-zinc-800"
                }`}
              >
                {s.icon}
              </div>
              <h3
                className={`font-display font-bold text-xl mb-3 ${
                  s.dark ? "text-white" : "text-zinc-900 dark:text-white"
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  s.dark ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
