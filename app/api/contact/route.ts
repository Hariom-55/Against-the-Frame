import { NextResponse } from "next/server";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const service = clean(body.service, 100);
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 3000) : "";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please add your name, a valid email and a short message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) {
    console.log("[contact] email not configured. Enquiry:", { name, email, phone, service, message });
    // In dev, let the UI complete so you can test the flow. In production this must be a visible failure.
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ ok: true, dev: true });
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "ATF Website <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}${service ? ` (${service})` : ""}`,
      html: `<h2>New website enquiry</h2>
<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone) || "-"}<br><b>Interested in:</b> ${esc(service) || "-"}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "We couldn't send your message." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
