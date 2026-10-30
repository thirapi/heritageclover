"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-contact.css";

export type HclContactProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  addressLabel?: string;
  address?: string;
  emailInfoLabel?: string;
  email?: string;
  whatsappInfoLabel?: string;
  whatsapp?: string;
  whatsappLabel?: string;
  hoursLabel?: string;
  hours?: string;
  mapEmbedUrl?: string;
  mapTitle?: string;
  formTitle?: string;
  nameLabel?: string;
  emailLabel?: string;
  subjectLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  requiredError?: string;
  emailError?: string;
  successTitle?: string;
  successText?: string;
  resetLabel?: string;
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclContactDefaults: Required<Omit<HclContactProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Get in touch",
  title: "Write to the spice house",
  body: "Questions about our cloves, a gift for someone dear, or an order for your kitchen or company: we read every message and reply within one working day.",
  addressLabel: "Visit",
  address: "Jl. Placeholder No. 1, Ternate\nNorth Maluku, Indonesia",
  emailInfoLabel: "Email",
  email: "hello@heritageclover.com",
  whatsappInfoLabel: "WhatsApp",
  whatsapp: "+62 812-0000-0000",
  whatsappLabel: "Chat with us on WhatsApp",
  hoursLabel: "Hours",
  hours: "Monday to Friday, 09.00 to 17.00 WIT\nSaturday, 09.00 to 13.00 WIT",
  mapEmbedUrl: "https://www.google.com/maps?q=Kota+Ternate,+Maluku+Utara,+Indonesia&z=13&output=embed",
  mapTitle: "Map of Ternate, North Maluku, Indonesia",
  formTitle: "Send us a message",
  nameLabel: "Your name",
  emailLabel: "Email address",
  subjectLabel: "Subject",
  messageLabel: "Message",
  submitLabel: "Send message",
  requiredError: "Please fill in this field.",
  emailError: "Please enter a valid email address.",
  successTitle: "Thank you",
  successText: "Your message is on its way. We will reply within one working day.",
  resetLabel: "Send another message",
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

type Field = "name" | "email" | "subject" | "message";
const FIELDS: Field[] = ["name", "email", "subject", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HclContact(props: HclContactProps) {
  const p = withHclDefaults(hclContactDefaults, props);
  const uid = useId();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  const labels: Record<Field, string> = {
    name: p.nameLabel,
    email: p.emailLabel,
    subject: p.subjectLabel,
    message: p.messageLabel,
  };

  const validate = (field: Field, value: string): string | undefined => {
    if (!value.trim()) return p.requiredError;
    if (field === "email" && !EMAIL_RE.test(value.trim())) return p.emailError;
    return undefined;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    for (const f of FIELDS) {
      const err = validate(f, values[f]);
      if (err) next[f] = err;
    }
    setErrors(next);
    const firstInvalid = FIELDS.find((f) => next[f]);
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    setSent(true);
  };

  const onChange = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  };

  const reset = () => {
    setValues({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSent(false);
  };

  const waDigits = p.whatsapp.replace(/\D/g, "");

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-contact"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container hcl-contact__grid">
        <HclReveal isCanvas={p.isCanvas} className="hcl-contact__info">
          {p.eyebrow && <p className="hcl-eyebrow hcl-contact__eyebrow">{p.eyebrow}</p>}
          {p.title && <h2 className="hcl-contact__title">{p.title}</h2>}
          <span className="hcl-contact__rule" aria-hidden="true" />
          {p.body && <p className="hcl-contact__body">{p.body}</p>}

          <dl className="hcl-contact__list">
            {p.address && (
              <div className="hcl-contact__row">
                <dt className="hcl-contact__label">
                  <MapPin className="hcl-contact__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  {p.addressLabel}
                </dt>
                <dd className="hcl-contact__value">
                  <address className="hcl-contact__address">{p.address}</address>
                </dd>
              </div>
            )}
            {p.email && (
              <div className="hcl-contact__row">
                <dt className="hcl-contact__label">
                  <Mail className="hcl-contact__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  {p.emailInfoLabel}
                </dt>
                <dd className="hcl-contact__value">
                  <HclLink href={`mailto:${p.email}`} className="hcl-contact__link">
                    {p.email}
                  </HclLink>
                </dd>
              </div>
            )}
            {waDigits && (
              <div className="hcl-contact__row">
                <dt className="hcl-contact__label">
                  <MessageCircle className="hcl-contact__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  {p.whatsappInfoLabel}
                </dt>
                <dd className="hcl-contact__value">
                  <HclLink href={`https://wa.me/${waDigits}`} className="hcl-contact__link">
                    {p.whatsapp}
                  </HclLink>
                  {p.whatsappLabel && (
                    <HclLink href={`https://wa.me/${waDigits}`} className="hcl-contact__wa">
                      {p.whatsappLabel}
                    </HclLink>
                  )}
                </dd>
              </div>
            )}
            {p.hours && (
              <div className="hcl-contact__row">
                <dt className="hcl-contact__label">
                  <Clock className="hcl-contact__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                  {p.hoursLabel}
                </dt>
                <dd className="hcl-contact__value hcl-contact__multiline">{p.hours}</dd>
              </div>
            )}
          </dl>

          {p.mapEmbedUrl && (
            <div className="hcl-contact__map">
              <iframe
                className="hcl-contact__iframe"
                src={p.mapEmbedUrl}
                title={p.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </HclReveal>

        <HclReveal isCanvas={p.isCanvas} delay={0.12} className="hcl-contact__panel">
          <span className="hcl-contact__corner hcl-contact__corner--tl" aria-hidden="true" />
          <span className="hcl-contact__corner hcl-contact__corner--br" aria-hidden="true" />
          {sent ? (
            <div className="hcl-contact__success" role="status">
              <CheckCircle2 className="hcl-contact__success-icon" size={40} strokeWidth={1.25} aria-hidden="true" />
              {p.successTitle && <h3 className="hcl-contact__form-title">{p.successTitle}</h3>}
              <p className="hcl-contact__success-text">{p.successText}</p>
              {p.resetLabel && (
                <button type="button" className="hcl-btn hcl-btn--ghost hcl-contact__reset" onClick={reset}>
                  {p.resetLabel}
                </button>
              )}
            </div>
          ) : (
            <form className="hcl-contact__form" noValidate onSubmit={onSubmit}>
              {p.formTitle && <h3 className="hcl-contact__form-title">{p.formTitle}</h3>}
              <div className="hcl-contact__fields">
                {FIELDS.map((f) => {
                  const id = `${uid}-${f}`;
                  const err = errors[f];
                  const common = {
                    id,
                    name: f,
                    value: values[f],
                    required: true,
                    "aria-invalid": err ? true : undefined,
                    "aria-describedby": err ? `${id}-error` : undefined,
                    className: cn("hcl-contact__input", err && "hcl-contact__input--error"),
                  };
                  return (
                    <div
                      key={f}
                      className={cn(
                        "hcl-contact__field",
                        (f === "subject" || f === "message") && "hcl-contact__field--wide",
                      )}
                    >
                      <label htmlFor={id} className="hcl-contact__field-label">
                        {labels[f]}
                      </label>
                      {f === "message" ? (
                        <textarea {...common} rows={6} onChange={(e) => onChange(f, e.target.value)} />
                      ) : (
                        <input
                          {...common}
                          type={f === "email" ? "email" : "text"}
                          autoComplete={f === "name" ? "name" : f === "email" ? "email" : "off"}
                          onChange={(e) => onChange(f, e.target.value)}
                        />
                      )}
                      {err && (
                        <p id={`${id}-error`} className="hcl-contact__error">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <button type="submit" className="hcl-btn hcl-btn--primary hcl-contact__submit">
                {p.submitLabel}
              </button>
            </form>
          )}
        </HclReveal>
      </div>
    </HclRoot>
  );
}
