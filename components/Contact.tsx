"use client";
import { useState, type FormEvent, type MouseEvent } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/hooks";
import { services } from "@/data/services";
import { site, whatsappLink } from "@/data/site";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <g transform="translate(7 6.6) scale(.45)"><path strokeWidth="3.6" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></g>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const magnet = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const fallback = whatsappLink || site.email ? " Please reach us on WhatsApp or email instead." : "";
        throw new Error(json.error && json.error !== "not_configured" ? json.error : `Something went wrong.${fallback}`);
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const igHandle = "@" + site.instagram.replace(/[?#].*$/, "").replace(/\/+$/, "").split("/").pop();
  const socials = [
    ["YouTube", site.youtube],
    ["LinkedIn", site.linkedin],
  ].filter((s): s is [string, string] => !!s[1]);

  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <h2><span>Step outside</span><span>the frame.</span></h2>
        <a className="btn" href="#brief" onMouseMove={magnet} onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
          Start a project
        </a>

        <div className="contact-grid" id="brief">
          <form onSubmit={onSubmit} noValidate={false}>
            <label>Name<input name="name" required maxLength={100} autoComplete="name" /></label>
            <label>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
            <label>Phone (optional)<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label>
            <label>
              What do you need?
              <select name="service" defaultValue="">
                <option value="">Not sure yet</option>
                {services.map(([title]) => <option key={title} value={title}>{title}</option>)}
              </select>
            </label>
            <label>Tell us about the project<textarea name="message" required minLength={10} maxLength={3000} rows={5} /></label>
            <div className="hp" aria-hidden="true">
              <label>Leave this field empty<input name="hp_check" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <button className="btn" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <p role="status" aria-live="polite" className={`form-note ${status}`}>
              {status === "sent" && "Thanks, your message is in. We’ll reply soon."}
              {status === "error" && error}
            </p>
          </form>

          <aside className="direct">
            <h3>Or reach us directly</h3>
            <a className="social" href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <span className="ico"><WhatsAppIcon /></span><span>+{site.whatsapp}</span>
            </a>
            <a className="social" href={site.instagram} target="_blank" rel="noopener noreferrer">
              <span className="ico"><InstagramIcon /></span><span>{igHandle}</span>
            </a>
            {site.email && <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>}
            {socials.length > 0 && (
              <ul>
                {socials.map(([label, href]) => (
                  <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
