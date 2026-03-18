function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-content reveal">
        <h2>Let's Work Together</h2>
        <p>
          Have a project in mind? I'd love to hear about it. Let's create something amazing together.
        </p>

        <div className="contact-buttons">
          {/* Email Button */}
          <a
            href="mailto:akhonakhuzwayo2005@gmail.com"
            className="btn btn-primary"
          >
            Get In Touch
          </a>

          {/* WhatsApp Button */}
         <a
            href="https://wa.me/27671931298?text=Hi%20Akhona,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
        >
            💬 WhatsApp Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;