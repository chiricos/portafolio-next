/* eslint-disable @next/next/no-img-element */
interface DrupalArticle {
  id: string;
  attributes: {
    title: string;
    created: string;
    body?: { summary?: string; value?: string };
    path?: { alias?: string };
    field_category?: string;
  };
}

const fallbackArticles = [
  {
    id: "1",
    title: "Drupal Headless: por qué elegir Next.js como frontend",
    summary: "Ventajas de separar el CMS del frontend y cómo la arquitectura headless mejora el rendimiento y la experiencia de desarrollo.",
    date: "Mar 8, 2025",
    category: "Drupal",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80",
    href: "/articulo/drupal-headless-nextjs",
  },
  {
    id: "2",
    title: "JSON:API en Drupal: guía práctica para consumir contenido",
    summary: "Cómo estructurar las peticiones a la API de Drupal, filtrar contenido y tipar las respuestas en TypeScript.",
    date: "Feb 21, 2025",
    category: "Dev",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=700&q=80",
    href: "/articulo/jsonapi-drupal-guia",
  },
  {
    id: "3",
    title: "Tailwind CSS v4: lo que cambia y cómo migrar",
    summary: "Análisis de los cambios más importantes de Tailwind v4 y el proceso para actualizar proyectos existentes sin romper nada.",
    date: "Ene 14, 2025",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80",
    href: "/articulo/tailwind-v4-migracion",
  },
];

async function getArticles() {
  try {
    const res = await fetch(
      "http://portafolio.ddev.site/jsonapi/node/article?page[limit]=3&sort=-created",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as DrupalArticle[];
  } catch {
    return null;
  }
}

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Blog() {
  const drupalArticles = await getArticles();

  const articles = drupalArticles
    ? drupalArticles.map((a, i) => ({
        id: a.id,
        title: a.attributes.title,
        summary:
          a.attributes.body?.summary ||
          (a.attributes.body?.value
            ? a.attributes.body.value.replace(/<[^>]*>/g, "").slice(0, 120) + "…"
            : ""),
        date: formatDate(a.attributes.created),
        category: a.attributes.field_category ?? "Artículo",
        image: fallbackArticles[i % fallbackArticles.length].image,
        href: a.attributes.path?.alias ?? "#",
      }))
    : fallbackArticles;

  return (
    <section id="blog" className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Ideas
            </p>
            <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">
              Del blog
            </h2>
          </div>
          <a
            href="/articulos"
            className="reveal d1 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors self-start sm:self-auto nl"
          >
            Todos los artículos →
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <article
              key={a.id}
              className={`reveal d${i + 1} card-h group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-accent`}
            >
              <div className="pf w-full h-44">
                <img src={a.image} alt={a.title} loading="lazy" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-orange-50 dark:bg-zinc-800 text-accent border border-orange-200 dark:border-zinc-700 px-2.5 py-1 rounded-full">
                    {a.category}
                  </span>
                  <span className="text-xs text-zinc-400">{a.date}</span>
                </div>
                <a href={a.href}>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                </a>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  {a.summary}
                </p>
                <a
                  href={a.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white nl"
                >
                  Leer más →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
