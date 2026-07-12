export async function api(path, options = {}) {
  const session = JSON.parse(localStorage.getItem('INARA-session') || 'null');
  const token = session?.token;

  const response = await fetch(`/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Error en la solicitud');
  }

  return data;
}
