// === Ajusta esta URL al host de tu backend Flask ===
export const API_BASE_URL = "http://54.166.113.53:5000/api/iot-devices";

async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { method: "GET", mode: "cors" });
  if (!res.ok) throw new Error(await res.text() || `GET ${path} failed`);
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text() || `POST ${path} failed`);
  return res.json();
}

// Endpoints correctos según tu backend Flask
export const getLast5 = () => apiGet("/last5");
export const getLastStatusTexto = () => apiGet("/last-status-texto");
export const insertStatus = (payload) => apiPost("/", payload);

// Obtener IP pública del cliente
export async function fetchPublicIP() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const j = await r.json();
    return j.ip || "0.0.0.0";
  } catch {
    return "0.0.0.0";
  }
}
