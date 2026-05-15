export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400">
          © {year} Portfolio. Todos los derechos reservados.
        </p>
        <p className="text-xs text-zinc-500">
          Construido con{" "}
          <a
            href="https://nextjs.org"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            Next.js
          </a>{" "}
          &amp;{" "}
          <a
            href="https://tailwindcss.com"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-accent transition-colors"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </footer>
  );
}
