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
  const xp = Number.isFinite(p?.xp) ? Math.max(0, Math.min(1e6, p.xp | 0)) : 0;
  const badges = Array.isArray(p?.badges) ? [...new Set(p.badges.filter((x) => typeof x === "string" && /^[a-z0-9-]{1,24}$/.test(x)))].slice(0, 40) : [];
  return { done, quiz, xp, badges };
};

const cleanIds = (a, max = 300) =>
  Array.isArray(a) ? [...new Set(a.filter((x) => typeof x === "string" && /^[a-z0-9-]{1,40}$/.test(x)))].slice(0, max) : [];
const cleanDate = (d) => (/^\d{4}-\d{2}-\d{2}$/.test(String(d || "")) ? String(d) : "");

// Anonym användningsstatistik per webbläsare: {s:{guide:n}, d:{guide:n}, p:{guide:n}, q:{app:{qhash:[rätt,fel]}}, f, l}
const cleanCounts = (o, keyRe, max) => {
  const r = {};
  if (o && typeof o === "object")
    for (const [k, v] of Object.entries(o).slice(0, max)) if (keyRe.test(k) && Number.isFinite(v)) r[k] = Math.max(0, Math.min(1e5, v | 0));
  return r;
};
const cleanEv = (e) => {
  const q = {};
  for (const app of ["pos", "bs", "mob"]) {
    const src = e?.q?.[app];
    if (!src || typeof src !== "object") continue;
    q[app] = {};
    for (const [k, v] of Object.entries(src).slice(0, 200))
      if (/^[a-z0-9]{1,12}$/.test(k) && Array.isArray(v)) q[app][k] = [Math.max(0, v[0] | 0), Math.max(0, v[1] | 0)];
  }
  const G = /^[a-z0-9-]{1,40}$/;
  return { s: cleanCounts(e?.s, G, 400), d: cleanCounts(e?.d, G, 400), p: cleanCounts(e?.p, G, 400), q, f: cleanDate(e?.f), l: cleanDate(e?.l), lang: clean(e?.lang, 5) };
};

async function listAll(store, prefix) {
  const { blobs } = await store.list({ prefix }); // hämtar alla sidor
  return blobs;
}

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

  // PUT /api/ev/:cid  -> anonym statistik från en webbläsare
  if (parts[0] === "ev" && parts.length === 2 && m === "PUT") {
    if (!/^[a-z0-9]{8,32}$/.test(parts[1])) return json({ error: "bad_id" }, 400);
    const body = await readJSON(req);
    if (!body) return json({ error: "bad_json" }, 400);
    await store.setJSON(`ev/${parts[1]}`, cleanEv(body));
    return json({ ok: true });
  }

  // GET /api/stats  -> samlad statistik (kräver STATS_KEY)
  if (parts[0] === "stats" && parts.length === 1 && m === "GET") {
    const want = (globalThis.Netlify?.env?.get?.("STATS_KEY")) || process.env.STATS_KEY || "";
    if (!want || req.headers.get("x-stats-key") !== want) return json({ error: "forbidden" }, 403);
    const today = new Date();
    const ago = (d) => (d ? (today - new Date(d + "T00:00:00Z")) / 864e5 : 1e9);
    const [gs, ms, evs] = await Promise.all([listAll(store, "g/"), listAll(store, "m/"), listAll(store, "ev/")]);
    const guides = {}, quiz = { pos: {}, bs: {}, mob: {} }, langs = {};
    let a7 = 0, a30 = 0;
    const evDocs = await Promise.all(evs.map((b) => store.get(b.key, { type: "json" }).catch(() => null)));
    for (const e of evDocs) {
      if (!e) continue;
      if (ago(e.l) <= 7) a7++;
      if (ago(e.l) <= 30) a30++;
      if (e.lang) langs[e.lang] = (langs[e.lang] || 0) + 1;
      for (const [k, key] of [["s", "starts"], ["d", "done"], ["p", "practice"]])
        for (const [id, n] of Object.entries(e[k] || {})) {
          const g = (guides[id] ||= { starts: 0, done: 0, practice: 0, people: 0, peopleDone: 0 });
          g[key] += n;
          if (k === "s") g.people++;
          if (k === "d") g.peopleDone++;
        }
      for (const app of ["pos", "bs", "mob"])
        for (const [h, [r, w]] of Object.entries(e.q?.[app] || {})) {
          const x = (quiz[app][h] ||= [0, 0]);
          x[0] += r;
          x[1] += w;
        }
    }
    const memDocs = await Promise.all(ms.map((b) => store.get(b.key, { type: "json" }).catch(() => null)));
    const members = memDocs.filter(Boolean);
    const diplomas = members.reduce((n, m) => n + Object.values(m.quiz || {}).filter((q) => q.t >= 25 && q.s >= Math.ceil(q.t * 0.8)).length, 0);
    const groupsActive = new Set(ms.filter((b, i) => memDocs[i] && ago(String(memDocs[i].at || "").slice(0, 10)) <= 30).map((b) => b.key.split("/")[1])).size;
    return json({
      at: today.toISOString(),
      totals: { visitors: evs.length, active7: a7, active30: a30, groups: gs.length, groupsActive30: groupsActive, members: members.length, diplomas },
      langs, guides, quiz,
    });
  }

  if (parts[0] !== "groups" || !ID_RE.test(parts[1] || "")) return json({ error: "not_found" }, 404);
  const gid = parts[1];
  const group = await store.get(`g/${gid}`, { type: "json" });
  if (!group) return json({ error: "group_not_found" }, 404);

  // GET /api/groups/:id  -> gruppens namn (öppet för alla med länken)
  if (parts.length === 2 && m === "GET") return json({ id: gid, name: group.name, assigned: group.assigned || [], due: group.due || "" });

  // PATCH /api/groups/:id  -> byt namn (admin)
  if (parts.length === 2 && m === "PATCH") {
    if (!(await isAdmin(store, gid, req))) return json({ error: "forbidden" }, 403);
    const body = await readJSON(req);
    if (!body) return json({ error: "bad_json" }, 400);
    const next = { ...group };
    if ("name" in body) {
      const name = clean(body.name, 80);
      if (!name) return json({ error: "name_required" }, 400);
      next.name = name;
    }
    if ("assigned" in body) next.assigned = cleanIds(body.assigned, 120);
    if ("due" in body) next.due = cleanDate(body.due);
    await store.setJSON(`g/${gid}`, next);
    return json({ id: gid, name: next.name, assigned: next.assigned || [], due: next.due || "" });
  }

  // GET /api/groups/:id/members  -> alla deltagare (admin)
  if (parts.length === 3 && parts[2] === "members" && m === "GET") {
    if (!(await isAdmin(store, gid, req))) return json({ error: "forbidden" }, 403);
    const { blobs } = await store.list({ prefix: `m/${gid}/` });
    const members = (
      await Promise.all(blobs.map(async (b) => ({ id: b.key.split("/").pop(), ...(await store.get(b.key, { type: "json" })) })))
    ).filter((x) => x && x.name);
    return json({ id: gid, name: group.name, assigned: group.assigned || [], due: group.due || "", members });
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

export const config = { path: ["/api/groups", "/api/groups/*", "/api/ev/*", "/api/stats"] };
