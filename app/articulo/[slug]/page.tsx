/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NavServer from "@/app/components/NavServer";
import Footer from "@/app/components/Footer";
import { getArticuloBySlug, getArticulos } from "@/lib/drupal";

const HERO_GRADIENTS = [
  "from-orange-500/30 via-amber-400/10 to-transparent",
  "from-violet-500/30 via-indigo-400/10 to-transparent",
  "from-cyan-500/30 via-teal-400/10 to-transparent",
  "from-emerald-500/30 via-green-400/10 to-transparent",
  "from-pink-500/30 via-rose-400/10 to-transparent",
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function readingTime(html: string) {
  const words = html.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  const articles = await getArticulos();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticuloBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Blog`,
    description: article.excerpt,
    openGraph: article.imageUrl ? { images: [article.imageUrl] } : undefined,
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticuloBySlug(slug);
  if (!article) notFound();

  const gradient =
    HERO_GRADIENTS[
      article.slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
        HERO_GRADIENTS.length
    ];

  const minutes = readingTime(article.body);

  return (
    <>
      <NavServer />

      <main className="pt-16">
        {/* Hero */}
        <div className={`relative bg-gradient-to-b ${gradient} border-b border-zinc-100 dark:border-zinc-900`}>
          {article.imageUrl && (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover opacity-15"
              />
            </div>
          )}
          <div className="relative max-w-3xl mx-auto px-6 py-20">
            <a
              href="/articulos"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Todos los artículos
            </a>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={article.created}>
                {formatDate(article.created)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{minutes} min de lectura</span>
              {article.created !== article.changed && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Actualizado {formatDate(article.changed)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div
            className="prose text-zinc-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <a
              href="/articulos"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al blog
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium shimmer bg-accent text-white px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors"
            >
              Contáctame
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
