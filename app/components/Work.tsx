/* eslint-disable @next/next/no-img-element */
const projects = [
  {
    title: "Drupal Headless + Next.js",
    tags: ["Drupal", "Next.js", "JSON:API"],
    description:
      "Arquitectura headless con Drupal como CMS y Next.js como frontend. Integración completa con JSON:API para contenido dinámico, rutas automáticas y generación estática incremental.\n\nEl backend en Drupal gestiona artículos, páginas y media. El frontend en Next.js consume la API y renderiza el contenido con Server Components para máximo rendimiento.\n\nDesplegado con DDEV en local y optimizado para producción con ISR.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80",
    imageAlt: "Drupal Headless Dashboard",
    large: true,
  },
  {
    title: "Landing Page SaaS",
    tags: ["React", "Tailwind"],
    description: "Página de marketing para producto SaaS. Animaciones scroll-driven y diseño responsive.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "Landing Page SaaS",
    large: false,
  },
  {
    title: "Sitio Corporativo",
    tags: ["Next.js", "CMS"],
    description: "Sitio corporativo con CMS headless, multiidioma y formularios de contacto.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    imageAlt: "Sitio corporativo",
    large: false,
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">
              Proyectos seleccionados
            </h2>
          </div>
          <a
            href="/proyectos"
            className="reveal d1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors self-start sm:self-auto nl"
          >
            Ver todos →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`card-h reveal d${i + 1} group rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-accent ${
                p.large ? "md:row-span-2" : ""
              }`}
            >
              <div className={`pf w-full ${p.large ? "h-64 md:h-80" : "h-48"}`}>
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
              </div>
              <div className={p.large ? "p-7" : "p-6"}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((tag, ti) => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full ${
                        ti === 0
                          ? "bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className={`font-display font-bold text-zinc-900 dark:text-white mb-2 ${
                    p.large ? "text-2xl" : "text-xl mb-1.5"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5 whitespace-pre-line">
                  {p.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white nl"
                >
                  Ver caso de estudio{" "}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
