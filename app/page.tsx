async function getData() {
  const res = await fetch('http://portafolio.ddev.site/jsonapi/node/article', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Error al cargar datos');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <h1>Artículos</h1>
      {data.data.map((item: any) => (
        <div key={item.id}>
          <h2>{item.attributes.title}</h2>
        </div>
      ))}
    </div>
  );
}