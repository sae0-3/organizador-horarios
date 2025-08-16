export const fetchJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al cargar " + url)
  return res.json()
}
