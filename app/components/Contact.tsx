"use client";

import { useActionState, useState, useEffect } from "react";
import { submitContact, type ContactFormState } from "../actions/contact";

const initialState: ContactFormState = { ok: false };

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Restore values from state when the action returns an error (React 19 resets form fields)
  useEffect(() => {
    if (!state.ok && state.values) {
      setName(state.values.name);
      setEmail(state.values.email);
      setSubject(state.values.subject);
      setMessage(state.values.message);
    }
  }, [state]);

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">

            <div>
              <p className="reveal text-xs font-medium text-accent tracking-widest uppercase mb-3">
                Trabajemos juntos
              </p>
              <h2 className="reveal d1 font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
                Hablemos de<br />tu proyecto
              </h2>
              <p className="reveal d2 text-zinc-400 leading-relaxed mb-8">
                Estoy abierto a proyectos frontend, integraciones Drupal y desarrollo de sitios completos. Cuéntame en qué puedo ayudarte.
              </p>

              <div className="reveal d3 flex flex-col gap-4">
                <a
                  href="mailto:hola@tudominio.com"
                  className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="text-sm">hola@tudominio.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/tu-perfil"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </span>
                  <span className="text-sm">linkedin.com/in/tu-perfil</span>
                </a>
                <a
                  href="https://github.com/tu-usuario"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-9 h-9 flex items-center justify-center bg-zinc-800 rounded-lg group-hover:bg-accent/20 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </span>
                  <span className="text-sm">github.com/tu-usuario</span>
                </a>
              </div>
            </div>

            <div className="reveal d2">
              {state.ok ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <div className="w-14 h-14 flex items-center justify-center bg-accent/20 rounded-full">
                    <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-display font-bold text-xl text-white">¡Mensaje enviado!</p>
                  <p className="text-zinc-400 text-sm">Te responderé en menos de 24 horas.</p>
                </div>
              ) : (
                <form action={formAction} noValidate>
                  {state.error && (
                    <p className="mb-4 text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
                      {state.error}
                    </p>
                  )}
                  <div className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fname" className="block text-xs font-medium text-zinc-400 mb-1.5">
                          Nombre <span aria-hidden="true">*</span>
                        </label>
                        <input
                          type="text"
                          id="fname"
                          name="name"
                          placeholder="Ana García"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors aria-[invalid]:border-red-500"
                          aria-invalid={state.fieldErrors?.name ? true : undefined}
                        />
                        {state.fieldErrors?.name && (
                          <p className="mt-1 text-xs text-red-400">{state.fieldErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="femail" className="block text-xs font-medium text-zinc-400 mb-1.5">
                          Email <span aria-hidden="true">*</span>
                        </label>
                        <input
                          type="email"
                          id="femail"
                          name="email"
                          placeholder="ana@empresa.com"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors aria-[invalid]:border-red-500"
                          aria-invalid={state.fieldErrors?.email ? true : undefined}
                        />
                        {state.fieldErrors?.email && (
                          <p className="mt-1 text-xs text-red-400">{state.fieldErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="fsubject" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Asunto
                      </label>
                        <input
                        type="text"
                        id="fsubject"
                        name="subject"
                        placeholder="Consulta sobre proyecto"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="fmessage" className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Mensaje <span aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="fmessage"
                        name="message"
                        rows={4}
                        placeholder="Cuéntame sobre tu proyecto..."
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-xl px-4 py-3 placeholder-zinc-600 focus:outline-none focus:border-accent transition-colors resize-none aria-[invalid]:border-red-500"
                        aria-invalid={state.fieldErrors?.message ? true : undefined}
                      />
                      {state.fieldErrors?.message && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.message}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isPending}
                      className="shimmer w-full bg-accent text-white font-display font-bold text-sm py-3.5 rounded-xl hover:bg-accent-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Enviando…" : "Enviar mensaje →"}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
