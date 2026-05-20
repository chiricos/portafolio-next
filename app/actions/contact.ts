"use server";

const DRUPAL_BASE_URL =
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? "http://portafolio.ddev.site";

function basicAuthHeader(): string {
  const user = process.env.DRUPAL_CONTACT_USER ?? "";
  const pass = process.env.DRUPAL_CONTACT_PASS ?? "";
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

export interface ContactFormState {
  ok: boolean;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
  values?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  const values = { name, email, subject, message };

  // Validate required fields.
  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "El nombre es obligatorio.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = "Ingresa un email válido.";
  if (!message) fieldErrors.message = "El mensaje es obligatorio.";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, values };
  }

  try {
    const body = {
      data: {
        type: "node--contact_submission",
        attributes: {
          title: name,
          field_email_remitente: email,
          field_asunto: subject || null,
          field_mensaje: { value: message, format: "plain_text" },
        },
      },
    };

    const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/contact_submission`, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: basicAuthHeader(),
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);
      const detail = errJson?.errors?.[0]?.detail ?? `Error ${res.status}`;
      console.error("[contact] Drupal error:", detail);
      return { ok: false, error: "No se pudo enviar el mensaje. Intenta nuevamente.", values };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] Network error:", err);
    return { ok: false, error: "Error de red. Intenta nuevamente.", values };
  }
}
