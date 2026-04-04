import { type ChangeEvent, type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import type { ContactForm, ContactErrors } from '../types';

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const env = (import.meta as { env?: Record<string, string | undefined> }).env;
  const emailJsServiceId = env?.VITE_EMAILJS_SERVICE_ID ?? "";
  const emailJsTemplateId = env?.VITE_EMAILJS_TEMPLATE_ID ?? "";
  const emailJsPublicKey = env?.VITE_EMAILJS_PUBLIC_KEY ?? "";

  const [formData, setFormData] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateField = (field: keyof ContactForm, value: string): string => {
    const trimmed = value.trim();

    switch (field) {
      case "name":
        if (!trimmed) return "Name is required.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!trimmed) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
        return "";
      case "subject":
        if (!trimmed) return "Subject is required.";
        if (trimmed.length < 4) return "Subject must be at least 4 characters.";
        return "";
      case "message":
        if (!trimmed) return "Message is required.";
        if (trimmed.length < 20) return "Message must be at least 20 characters.";
        if (trimmed.length > 500) return "Message cannot exceed 500 characters.";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (data: ContactForm): ContactErrors => {
    const nextErrors: ContactErrors = {};

    (Object.keys(data) as Array<keyof ContactForm>).forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) nextErrors[field] = error;
    });

    return nextErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const field = name as keyof ContactForm;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    setIsSubmitted(false);
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setSubmitError("Email service is not configured yet. Add your EmailJS keys to Vite env variables.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        {
          publicKey: emailJsPublicKey,
        }
      );

      setIsSubmitted(true);
      setFormData(initialForm);
    } catch {
      setIsSubmitted(false);
      setSubmitError("Message failed to send. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-content reveal">
        <h2>Let's Work Together</h2>
        <p>
          Have a project in mind? I'd love to hear about it. Let's create something amazing together.
        </p>

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What would you like to build?"
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p className="field-error" id="subject-error">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, goals, and timeline..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : "message-count"}
            />
            <div className="message-meta">
              {errors.message ? (
                <p className="field-error" id="message-error">
                  {errors.message}
                </p>
              ) : (
                <p className="char-count" id="message-count">
                  {formData.message.length}/500 characters
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitError && (
            <p className="form-error" role="alert" aria-live="assertive">
              {submitError}
            </p>
          )}

          {isSubmitted && (
            <p className="form-success" role="status" aria-live="polite">
              Message sent successfully. I will get back to you soon.
            </p>
          )}
        </form>

        <div className="contact-buttons-wrap">
          <p className="quick-contact-title">Prefer direct contact instead?</p>

          <div className="contact-buttons">
          <a
            href="mailto:akhonakhuzwayo2005@gmail.com"
            className="btn btn-secondary"
          >
            Send Direct Email
          </a>

          <a
            href="https://wa.me/27671931298?text=Hi%20Akhona,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;