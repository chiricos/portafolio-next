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

export async function getServicios(): Promise<Servicio[]> {
  const params = new URLSearchParams({
    "fields[node--servicio]": "title,body,field_icon",
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
