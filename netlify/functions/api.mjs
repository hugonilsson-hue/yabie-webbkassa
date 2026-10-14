// Grupper för personalutbildning: en chef skapar en grupp, personalen skriver sitt namn
// och deras framsteg i guiderna sparas här. Data ligger i Netlify Blobs.
import { getStore } from "@netlify/blobs";

const MAX_MEMBERS = 500;
const ID_RE = /^[a-z0-9]{6,32}$/;
const ALPH = "abcdefghjkmnpqrstuvwxyz23456789";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const rand = (n) => {
  const b = crypto.getRandomValues(new Uint8Array(n));
  return Array.from(b, (x) => ALPH[x % ALPH.length]).join("");
};

const sha = async (s) => {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d), (x) => x.toString(16).padStart(2, "0")).join("");
};

const clean = (s, n) => String(s ?? "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, n);

const cleanProgress = (p) => {
  const done = Array.isArray(p?.done)
    ? [...new Set(p.done.filter((x) => typeof x === "string" && /^[a-z0-9-]{1,40}$/.test(x)))].slice(0, 300)
    : [];
  const quiz = {};
  for (const app of ["pos", "bs", "mob"]) {
    const q = p?.quiz?.[app];
    if (q && Number.isFinite(q.s) && Number.isFinite(q.t)) {
      quiz[app] = { s: Math.max(0, Math.min(50, q.s | 0)), t: Math.max(1, Math.min(50, q.t | 0)), at: clean(q.at, 10) };
    }
  }
  return { done, quiz };
};

async function readJSON(req) {
  try {
    const t = await req.text();
    if (t.length > 20000) return null;
    return JSON.parse(t || "{}");
  } catch {
    return null;
  }
}

async function isAdmin(store, gid, req) {
  const key = req.headers.get("x-admin-key") || "";
  if (!key) return false;
  const g = await store.get(`g/${gid}`, { type: "json" });
  return !!g && g.keyHash === (await sha(key));
}

export async function handle(req, store) {
  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/(\.netlify\/functions\/api|api)\/?/, "").split("/").filter(Boolean);
  const m = req.method;

  // POST /api/groups  -> skapa grupp
  if (parts.length === 1 && parts[0] === "groups" && m === "POST") {
    const body = await readJSON(req);
    const name = clean(body?.name, 80);
    if (!name) return json({ error: "name_required" }, 400);
    const id = rand(10);
    const key = rand(24);
    await store.setJSON(`g/${id}`, { name, keyHash: await sha(key), created: new Date().toISOString() });
    return json({ id, key, name }, 201);
  }

  if (parts[0] !== "groups" || !ID_RE.test(parts[1] || "")) return json({ error: "not_found" }, 404);
  const gid = parts[1];
  const group = await store.get(`g/${gid}`, { type: "json" });
  if (!group) return json({ error: "group_not_found" }, 404);

  // GET /api/groups/:id  -> gruppens namn (öppet för alla med länken)
  if (parts.length === 2 && m === "GET") return json({ id: gid, name: group.name });

  // PATCH /api/groups/:id  -> byt namn (admin)
  if (parts.length === 2 && m === "PATCH") {
    if (!(await isAdmin(store, gid, req))) return json({ error: "forbidden" }, 403);
    const body = await readJSON(req);
    const name = clean(body?.name, 80);
    if (!name) return json({ error: "name_required" }, 400);
    await store.setJSON(`g/${gid}`, { ...group, name });
    return json({ id: gid, name });
  }

  // GET /api/groups/:id/members  -> alla deltagare (admin)
  if (parts.length === 3 && parts[2] === "members" && m === "GET") {
    if (!(await isAdmin(store, gid, req))) return json({ error: "forbidden" }, 403);
    const { blobs } = await store.list({ prefix: `m/${gid}/` });
    const members = (
      await Promise.all(blobs.map(async (b) => ({ id: b.key.split("/").pop(), ...(await store.get(b.key, { type: "json" })) })))
    ).filter((x) => x && x.name);
    return json({ id: gid, name: group.name, members });
  }

  if (parts.length === 4 && parts[2] === "members" && ID_RE.test(parts[3])) {
    const mk = `m/${gid}/${parts[3]}`;

    // PUT /api/groups/:id/members/:mid  -> spara namn och framsteg (deltagaren själv)
    if (m === "PUT") {
      const body = await readJSON(req);
      if (!body) return json({ error: "bad_json" }, 400);
      const name = clean(body.name, 60);
      if (!name) return json({ error: "name_required" }, 400);
      const prev = await store.get(mk, { type: "json" });
      if (!prev) {
        const { blobs } = await store.list({ prefix: `m/${gid}/` });
        if (blobs.length >= MAX_MEMBERS) return json({ error: "group_full" }, 409);
      }
      const rec = { name, ...cleanProgress(body), joined: prev?.joined || new Date().toISOString(), at: new Date().toISOString() };
      await store.setJSON(mk, rec);
      return json({ ok: true });
    }

    // DELETE /api/groups/:id/members/:mid  -> ta bort deltagare (admin)
    if (m === "DELETE") {
      if (!(await isAdmin(store, gid, req))) return json({ error: "forbidden" }, 403);
      await store.delete(mk);
      return json({ ok: true });
    }
  }

  return json({ error: "not_found" }, 404);
}

export default async (req) => {
  try {
    return await handle(req, getStore({ name: "kassaskolan", consistency: "strong" }));
  } catch (e) {
    return json({ error: "server_error" }, 500);
  }
};

export const config = { path: ["/api/groups", "/api/groups/*"] };
