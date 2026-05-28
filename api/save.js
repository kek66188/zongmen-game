const crypto = require("crypto");

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_RE = /^ZM-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;
const MAX_SAVE_BYTES = 100 * 1024;

function setHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

function json(res, status, data) {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

function kvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    return { error: "云存档服务未配置 KV_REST_API_URL / KV_REST_API_TOKEN" };
  }
  return { url: url.replace(/\/$/, ""), token };
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function generateCode() {
  let raw = "";
  for (let i = 0; i < 8; i += 1) {
    raw += ALPHABET[crypto.randomInt(0, ALPHABET.length)];
  }
  return `ZM-${raw.slice(0, 4)}-${raw.slice(4)}`;
}

async function kvGet(config, key) {
  const response = await fetch(`${config.url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "KV 读取失败");
  return data.result;
}

async function kvSet(config, key, value) {
  const response = await fetch(`${config.url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "KV 写入失败");
  return data.result;
}

module.exports = async function handler(req, res) {
  setHeaders(res);
  if (req.method === "OPTIONS") return json(res, 200, { ok: true });
  if (req.method !== "POST") return json(res, 405, { ok: false, error: "只支持 POST /api/save" });
  if (!String(req.headers["content-type"] || "").includes("application/json")) {
    return json(res, 415, { ok: false, error: "只接受 JSON 请求" });
  }

  const config = kvConfig();
  if (config.error) return json(res, 503, { ok: false, error: config.error });

  try {
    const body = await readBody(req);
    const saveData = body && body.saveData;
    if (!saveData || typeof saveData !== "object" || Array.isArray(saveData)) {
      return json(res, 400, { ok: false, error: "saveData 必须是对象" });
    }
    const size = Buffer.byteLength(JSON.stringify(saveData), "utf8");
    if (size > MAX_SAVE_BYTES) return json(res, 413, { ok: false, error: "存档数据超过 100KB 限制" });

    for (let i = 0; i < 8; i += 1) {
      const code = generateCode();
      if (!CODE_RE.test(code)) continue;
      const key = `cloudsave:${code}`;
      const exists = await kvGet(config, key);
      if (exists !== null && exists !== undefined) continue;
      const updatedAt = Date.now();
      await kvSet(config, key, { saveData, updatedAt });
      return json(res, 200, { ok: true, code, updatedAt });
    }
    return json(res, 500, { ok: false, error: "存档码生成失败，请重试" });
  } catch (error) {
    return json(res, 500, { ok: false, error: error.message || "云存档上传失败" });
  }
};
