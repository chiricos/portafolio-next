/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import NavServer from "@/app/components/NavServer";
import Footer from "@/app/components/Footer";
import { getArticulos } from "@/lib/drupal";

export const metadata: Metadata = {
  title: "Blog — Portfolio",
  description: "Artículos sobre desarrollo frontend, Drupal, Next.js y más.",
};

const CARD_GRADIENTS = [
  "from-orange-500/20 to-amber-500/10",
  "from-violet-500/20 to-indigo-500/10",
  "from-cyan-500/20 to-teal-500/10",
  "from-emerald-500/20 to-green-500/10",
  "from-pink-500/20 to-rose-500/10",
  "from-sky-500/20 to-blue-500/10",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ArticulosPage() {
  const articles = await getArticulos();

  return (
    <>
      <NavServer />

      <main className="pt-24">
        {/* Page header */}
        <section className="py-16 border-b border-zinc-100 dark:border-zinc-900">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Ideas &amp; aprendizajes
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="font-display font-bold text-5xl md:text-6xl text-zinc-900 dark:text-white">
                Blog
              </h1>
              <span className="text-sm text-zinc-400">
                {articles.length} artículo{articles.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </section>

        {/* Article grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a, i) => (
                <article
                  key={a.id}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-accent hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className={`w-full h-48 bg-gradient-to-br ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]} flex items-center justify-center overflow-hidden`}
                  >
                    {a.imageUrl ? (
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-display font-bold text-accent/25 select-none">
                        {a.title.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <time
                      dateTime={a.created}
                      className="text-xs text-zinc-400"
                    >
                      {formatDate(a.created)}
                    </time>

                    <a href={`/articulo/${a.slug}`}>
                      <h2 className="font-display font-bold text-lg text-zinc-900 dark:text-white group-hover:text-accent transition-colors leading-snug">
                        {a.title}
                      </h2>
                    </a>

                    {a.excerpt && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {a.excerpt}
                      </p>
                    )}

                    <a
                      href={`/articulo/${a.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-white hover:text-accent transition-colors"
                    >
                      Leer artículo
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
      </main>

      <Footer />
    </>
  );
}
