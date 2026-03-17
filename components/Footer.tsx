function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
          <span>GH</span>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <span>LI</span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
          <span>TW</span>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Portfolio. Built with passion.</p>
    </footer>
  );
}

export default Footer;