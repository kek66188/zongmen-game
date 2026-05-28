const CODE_RE = /^ZM-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;

function setHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
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

async function kvGet(config, key) {
  const response = await fetch(`${config.url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${config.token}` },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "KV 读取失败");
  return data.result;
}

module.exports = async function handler(req, res) {
  setHeaders(res);
  if (req.method === "OPTIONS") return json(res, 200, { ok: true });
  if (req.method !== "GET") return json(res, 405, { ok: false, error: "只支持 GET /api/load" });

  const config = kvConfig();
  if (config.error) return json(res, 503, { ok: false, error: config.error });

  try {
    const rawCode = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;
    const code = String(rawCode || "").trim().toUpperCase();
    if (!CODE_RE.test(code)) return json(res, 400, { ok: false, error: "存档码格式不正确" });
    const record = await kvGet(config, `cloudsave:${code}`);
    if (record === null || record === undefined) return json(res, 404, { ok: false, error: "存档码不存在" });
    const parsed = typeof record === "string" ? JSON.parse(record) : record;
    if (!parsed || typeof parsed !== "object" || !parsed.saveData) {
      return json(res, 500, { ok: false, error: "云存档数据损坏" });
    }
    return json(res, 200, {
      ok: true,
      code,
      saveData: parsed.saveData,
      updatedAt: parsed.updatedAt || 0,
    });
  } catch (error) {
    return json(res, 500, { ok: false, error: error.message || "云存档读取失败" });
  }
};
