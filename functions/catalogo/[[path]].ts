const API = 'https://jandrea-catalog-api.llampukaq.workers.dev';

export async function onRequest(context: EventContext<unknown, string, Record<string, string>>) {
  const url = new URL(context.request.url);
  const target = `${API}/api/catalogs${url.pathname.replace(/^\/catalogo/, '')}`;

  const response = await fetch(target, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
