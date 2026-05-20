/* eslint-disable @next/next/no-img-element */
import { getArticulos } from "@/lib/drupal";

const CARD_GRADIENTS = [
  "from-orange-500/20 to-amber-500/10",
  "from-violet-500/20 to-indigo-500/10",
  "from-cyan-500/20 to-teal-500/10",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function Blog() {
  const articles = await getArticulos(3);

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
              <div className={`w-full h-44 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-center justify-center`}>
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-display font-bold text-accent/30">
                    {a.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs text-zinc-400">{formatDate(a.created)}</span>
                <a href={`/articulo/${a.slug}`}>
                  <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-white mt-2 mb-2 group-hover:text-accent transition-colors">
                    {a.title}
                  </h3>
                </a>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                  {a.excerpt}
                </p>
                <a
                  href={`/articulo/${a.slug}`}
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
