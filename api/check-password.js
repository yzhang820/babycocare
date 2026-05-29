export default function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false });
    return;
  }

  const expected = process.env.DEMO_PASSWORD || "xiaobao-demo-2026";
  const password = request.body?.password || "";
  response.status(200).json({ ok: password === expected });
}
