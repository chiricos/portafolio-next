/* eslint-disable @next/next/no-img-element */
import { getClientes } from "@/lib/drupal";

const StarIcon = () => (
  <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default async function Testimonials() {
  const clientes = await getClientes();

  return (
    <section id="reviews" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
            Prueba social
          </p>
          <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white">
            Lo que dicen los clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {clientes.map((t, i) => {
            const dark = i % 3 === 1;
            return (
              <blockquote
                key={t.id}
                className={`reveal d${i + 1} rounded-2xl p-7 border ${
                  dark
                    ? "bg-zinc-900 dark:bg-zinc-800 border-zinc-800"
                    : "bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
                }`}
              >
                <div
                  className="flex gap-0.5 mb-5"
                  aria-label={`${t.estrellas} estrellas`}
                >
                  {Array.from({ length: t.estrellas }).map((_, si) => (
                    <StarIcon key={si} />
                  ))}
                </div>
                <div
                  className={`text-sm leading-relaxed mb-6 italic [&_p]:m-0 ${
                    dark ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-400"
                  }`}
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
                <footer className="flex items-center gap-3">
                  {t.avatarUrl && (
                    <div className="pf w-10 h-10 rounded-full shrink-0 overflow-hidden">
                      <img src={t.avatarUrl} alt={t.name} loading="lazy" width={40} height={40} />
                    </div>
                  )}
                  <div>
                    <p
                      className={`font-medium text-sm ${
                        dark ? "text-white" : "text-zinc-900 dark:text-white"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-zinc-500">{t.cargo}</p>
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
