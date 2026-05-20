/* eslint-disable @next/next/no-img-element */
import { getAbout } from "../../lib/drupal";

export default async function About() {
  const about = await getAbout();

  const subtitulo  = about?.subtitulo   ?? "Sobre mí";
  const titulo     = about?.titulo      ?? "Un poco sobre quién soy";
  const body       = about?.body        ?? "";
  const habilidades = about?.habilidades ?? [];
  const fotoUrl    = about?.fotoUrl     ?? "";
  const fotoAlt    = about?.fotoAlt     ?? "Foto de perfil";

  return (
    <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="reveal order-2 md:order-1">
            <div className="pf w-full aspect-square max-w-sm mx-auto rounded-3xl">
              {fotoUrl ? (
                <img src={fotoUrl} alt={fotoAlt} loading="lazy" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 rounded-3xl" />
              )}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
              {subtitulo}
            </p>
            <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-6">
              {titulo}
            </h2>
            <div
              className="reveal d2 text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 prose prose-zinc dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: body }}
            />

            {habilidades.length > 0 && (
              <div className="reveal d4">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
                  Stack y herramientas
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Habilidades">
                  {habilidades.map((skill) => (
                    <span
                      key={skill}
                      role="listitem"
                      className="stag text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3.5 py-1.5 rounded-full hover:border-accent cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
