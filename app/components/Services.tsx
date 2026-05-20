import { getServicios } from "@/lib/drupal";

export default async function Services() {
  const services = await getServicios();

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
          {services.map((s, i) => {
            const dark = i % 3 === 1;
            return (
              <article
                key={s.id}
                className={`reveal d${i + 1} card-h group rounded-2xl p-8 border hover:border-accent ${
                  dark
                    ? "bg-zinc-900 dark:bg-zinc-800 border-zinc-800"
                    : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800"
                }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-accent/10 transition-colors ${
                    dark
                      ? "bg-zinc-800 dark:bg-zinc-700 group-hover:bg-accent/20"
                      : "bg-orange-50 dark:bg-zinc-800"
                  }`}
                  dangerouslySetInnerHTML={{ __html: s.icon }}
                />
                <h3
                  className={`font-display font-bold text-xl mb-3 ${
                    dark ? "text-white" : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {s.title}
                </h3>
                <div
                  className={`text-sm leading-relaxed [&_p]:m-0 ${
                    dark ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
