/* eslint-disable @next/next/no-img-element */
const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Drupal", "PHP", "JSON:API", "REST API",
  "HTML / CSS", "Git", "DDEV", "Figma",
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="reveal order-2 md:order-1">
            <div className="pf w-full aspect-square max-w-sm mx-auto rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Foto"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
              Sobre mí
            </p>
            <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white leading-tight mb-6">
              Un poco sobre<br />quién soy
            </h2>
            <p className="reveal d2 text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
              Soy desarrollador frontend especializado en la integración de Drupal como CMS headless con Next.js. Con años de experiencia construyendo proyectos digitales, disfruto el punto de encuentro entre un buen diseño y código limpio.
            </p>
            <p className="reveal d3 text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
              Creo que las mejores interfaces son las que no se notan — simplemente funcionan. Mi trabajo es rápido, accesible y construido para durar.
            </p>

            <div className="reveal d4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
                Stack y herramientas
              </p>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Habilidades">
                {skills.map((skill) => (
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
          </div>

        </div>
      </div>
    </section>
  );
}
