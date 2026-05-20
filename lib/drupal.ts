const DRUPAL_BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ?? "http://portafolio.ddev.site";

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  weight: number;
  enabled: boolean;
  parent: string;
}

export interface Servicio {
  id: string;
  title: string;
  body: string;
  icon: string;
}

export async function getMenuItems(menuName: string): Promise<MenuItem[]> {
  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/menu_items/${menuName}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch menu "${menuName}": ${res.status}`);
  }

  const json = await res.json();

  const items: MenuItem[] = (json.data as Array<{ id: string; attributes: Record<string, unknown> }>)
    .filter((item) => item.attributes.enabled)
    .map((item) => ({
      id: item.id,
      title: item.attributes.title as string,
      url: item.attributes.url as string,
      weight: item.attributes.weight as number,
      enabled: item.attributes.enabled as boolean,
      parent: item.attributes.parent as string,
    }))
    .sort((a, b) => a.weight - b.weight);

  return items;
}

export interface Cliente {
  id: string;
  name: string;
  cargo: string;
  estrellas: number;
  body: string;
  avatarUrl: string;
}

export async function getClientes(): Promise<Cliente[]> {
  const params = new URLSearchParams({
    "fields[node--cliente]": "title,body,field_cargo,field_estrellas,field_imagen_destacada",
    include: "field_imagen_destacada",
    "fields[file--file]": "uri,url",
    "filter[status]": "1",
  });

  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/cliente?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch clientes: ${res.status}`);
  }

  const json = await res.json();

  const files = new Map<string, string>(
    (json.included ?? []).map((f: { id: string; attributes: { uri: { url: string } } }) => [
      f.id,
      `${DRUPAL_BASE_URL}${f.attributes.uri.url}`,
    ])
  );

  return (json.data as Array<{ id: string; attributes: Record<string, unknown>; relationships: Record<string, { data: { id: string } | null }> }>).map((item) => {
    const body = item.attributes.body as { processed?: string } | null;
    const imgRel = item.relationships.field_imagen_destacada?.data;
    return {
      id: item.id,
      name: (item.attributes.title as string).trim(),
      cargo: item.attributes.field_cargo as string,
      estrellas: item.attributes.field_estrellas as number,
      body: body?.processed ?? "",
      avatarUrl: imgRel ? (files.get(imgRel.id) ?? "") : "",
    };
  });
}

export interface Articulo {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  created: string;
  imageUrl: string;
}

export async function getArticulos(limit?: number): Promise<Articulo[]> {
  const params = new URLSearchParams({
    "fields[node--articulo]": "title,created,path,field_extracto,field_imagen_destacada",
    include: "field_imagen_destacada",
    "fields[file--file]": "uri",
    "filter[status]": "1",
    sort: "-created",
  });
  if (limit) params.set("page[limit]", String(limit));

  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/articulo?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch articulos: ${res.status}`);

  const json = await res.json();

  const files = new Map<string, string>(
    (json.included ?? []).map((f: { id: string; attributes: { uri: { url: string } } }) => [
      f.id,
      `${DRUPAL_BASE_URL}${f.attributes.uri.url}`,
    ])
  );

  return (
    json.data as Array<{
      id: string;
      attributes: Record<string, unknown>;
      relationships: Record<string, { data: { id: string } | null }>;
    }>
  ).map((item) => {
    const alias = (item.attributes.path as { alias?: string })?.alias ?? "";
    const slug = alias.split("/").pop() ?? item.id;
    const imgRel = item.relationships.field_imagen_destacada?.data;
    return {
      id: item.id,
      title: item.attributes.title as string,
      slug,
      excerpt: (item.attributes.field_extracto as string) ?? "",
      created: item.attributes.created as string,
      imageUrl: imgRel ? (files.get(imgRel.id) ?? "") : "",
    };
  });
}

export interface Proyecto {
  id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  url: string;
}

export async function getProyectosDestacados(): Promise<Proyecto[]> {
  const params = new URLSearchParams({
    "fields[node--proyecto]": "title,body,field_tecnologias,field_imagenes,field_url_proyecto",
    "filter[status]": "1",
    "filter[field_destacado]": "1",
    include: "field_imagenes",
    "fields[file--file]": "uri",
  });

  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/proyecto?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`Failed to fetch proyectos: ${res.status}`);

  const json = await res.json();

  const files = new Map<string, { url: string; alt: string }>(
    (json.included ?? []).map((f: {
      id: string;
      attributes: { uri: { url: string }; filename: string };
      meta?: { alt?: string };
    }) => [
      f.id,
      { url: `${DRUPAL_BASE_URL}${f.attributes.uri.url}`, alt: f.meta?.alt ?? f.attributes.filename },
    ])
  );

  return (
    json.data as Array<{
      id: string;
      attributes: Record<string, unknown>;
      relationships: Record<string, { data: { id: string; meta?: { alt?: string } } | { id: string; meta?: { alt?: string } }[] | null }>;
    }>
  ).map((item) => {
    const a = item.attributes;
    const tags = (a.field_tecnologias as string[] | null) ?? [];
    const imgData = item.relationships.field_imagenes?.data;
    const firstImg = Array.isArray(imgData) ? imgData[0] : imgData;
    const imgFile = firstImg ? files.get(firstImg.id) : null;
    const urlField = a.field_url_proyecto as { uri?: string } | null;

    return {
      id: item.id,
      title: a.title as string,
      body: (a.body as { processed?: string } | null)?.processed ?? "",
      tags,
      imageUrl: imgFile?.url ?? "",
      imageAlt: firstImg?.meta?.alt ?? (a.title as string),
      url: urlField?.uri ?? "#",
    };
  });
}

export interface About {
  subtitulo: string;
  titulo: string;
  body: string;
  habilidades: string[];
  fotoUrl: string;
  fotoAlt: string;
}

export async function getAbout(): Promise<About | null> {
  const params = new URLSearchParams({
    "fields[block_content--about]":
      "field_subtitulo,field_titulo_about,body,field_habilidades,field_foto_perfil",
    include: "field_foto_perfil",
    "fields[file--file]": "uri",
    "page[limit]": "1",
  });

  const res = await fetch(
    `${DRUPAL_BASE_URL}/jsonapi/block_content/about?${params}`,
    {
      headers: { Accept: "application/vnd.api+json" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch about block: ${res.status}`);

  const json = await res.json();
  if (!json.data?.length) return null;

  const item = json.data[0] as {
    attributes: Record<string, unknown>;
    relationships: Record<string, { data: { id: string; meta?: { alt?: string } } | null }>;
  };
  const a = item.attributes;

  const imgRel = item.relationships.field_foto_perfil?.data;
  let fotoUrl = "";
  let fotoAlt = "";
  if (imgRel) {
    const file = (json.included ?? []).find(
      (f: { id: string }) => f.id === imgRel.id
    ) as { attributes: { uri: { url: string } } } | undefined;
    if (file) fotoUrl = `${DRUPAL_BASE_URL}${file.attributes.uri.url}`;
    fotoAlt = imgRel.meta?.alt ?? "";
  }

  const rawHabilidades = a.field_habilidades;
  const habilidades: string[] = Array.isArray(rawHabilidades)
    ? (rawHabilidades as string[])
    : [];

  return {
    subtitulo: (a.field_subtitulo as string) ?? "Sobre mí",
    titulo: (a.field_titulo_about as string) ?? "",
    body: (a.body as { processed?: string } | null)?.processed ?? "",
    habilidades,
    fotoUrl,
    fotoAlt,
  };
}

export async function getServicios(): Promise<Servicio[]> {
  const params = new URLSearchParams({
    "filter[status]": "1",
    sort: "title",
  });

  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/servicio?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch servicios: ${res.status}`);
  }

  const json = await res.json();

  return (json.data as Array<{ id: string; attributes: Record<string, unknown> }>).map((item) => {
    const body = item.attributes.body as { processed?: string } | null;
    return {
      id: item.id,
      title: item.attributes.title as string,
      body: body?.processed ?? "",
      icon: (item.attributes.field_icon as string) ?? "",
    };
  });
}

export interface ArticuloDetalle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  created: string;
  changed: string;
  imageUrl: string;
}

/** Resolves slug → UUID via decoupled_router, then fetches the full article. */
export async function getArticuloBySlug(slug: string): Promise<ArticuloDetalle | null> {
  const routerRes = await fetch(
    `${DRUPAL_BASE_URL}/router/translate-path?path=/blog/${slug}`,
    { headers: { Accept: "application/json" }, next: { revalidate: 3600 } }
  );
  if (!routerRes.ok) return null;

  const router = await routerRes.json();
  const apiUrl: string | undefined = router?.jsonapi?.individual;
  if (!apiUrl) return null;

  const params = new URLSearchParams({
    "fields[node--articulo]": "title,body,created,changed,path,field_extracto,field_imagen_destacada",
    include: "field_imagen_destacada",
    "fields[file--file]": "uri",
  });

  const res = await fetch(`${apiUrl}?${params}`, {
    headers: { Accept: "application/vnd.api+json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;

  const json = await res.json();
  const item = json.data;
  const a = item.attributes as Record<string, unknown>;
  const imgRel = item.relationships?.field_imagen_destacada?.data as { id: string } | null;

  let imageUrl = "";
  if (imgRel) {
    const file = (json.included ?? []).find(
      (f: { id: string }) => f.id === imgRel.id
    ) as { attributes: { uri: { url: string } } } | undefined;
    if (file) imageUrl = `${DRUPAL_BASE_URL}${file.attributes.uri.url}`;
  }

  const alias = (a.path as { alias?: string })?.alias ?? "";
  return {
    id: item.id,
    title: a.title as string,
    slug: alias.split("/").pop() ?? slug,
    excerpt: (a.field_extracto as string) ?? "",
    body: (a.body as { processed?: string } | null)?.processed ?? "",
    created: a.created as string,
    changed: a.changed as string,
    imageUrl,
  };
}
