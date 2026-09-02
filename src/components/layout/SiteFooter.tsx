import { Link } from "react-router-dom";
import "../../styles/SiteFooter.css";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid" />

      <div className="footer-shell">
        {/* =========================
                    FOOTER TOP
                ========================= */}

        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand-area">
            <Link to="/" className="footer-brand">
              <span className="footer-logo" aria-hidden="true">
                <svg viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="#F7931E" />

                  <path
                    d="M11 25c3.2-8.4 7.1-12.6 11.8-12.6
                                        3.2 0 5.4 2.1 5.4 5.1
                                        0 6.4-8.7 8.1-8.7 12.3"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />

                  <circle cx="25.4" cy="31.2" r="1.8" fill="#fff" />
                </svg>
              </span>

              <span className="footer-brand-text">
                <strong>onithrasML</strong>
                <span>Machine learning in Python</span>
              </span>
            </Link>

            <p className="footer-description">
              A focused scientific computing library for numerical methods,
              linear algebra, statistics, optimization, and machine learning in
              Python.
            </p>

            <div className="footer-status">
              <span className="footer-status-dot" />
              <span>Documentation online</span>
              <span className="footer-status-version">v0.3</span>
            </div>
          </div>

          {/* Documentation */}
          <div className="footer-column">
            <span className="footer-column-label">DOCUMENTATION</span>

            <Link to="/docs/v0.3">User Guide</Link>

            <Link to="/docs/v0.3#install">Installation</Link>

            <Link to="/docs/v0.3#api">API Reference</Link>

            <Link to="/docs/v0.3">Examples</Link>
          </div>

          {/* Modules */}
          <div className="footer-column">
            <span className="footer-column-label">MODULES</span>

            <Link to="/docs/v0.3/modules/numerical-computations">
              Numerical Computing
            </Link>

            <Link to="/docs/v0.3/modules/linear-algebra">Linear Algebra</Link>

            <Link to="/docs/v0.3/modules/statistics">Statistics</Link>

            <Link to="/docs/v0.3/modules/optimization">Optimization</Link>
          </div>

          {/* Project */}
          <div className="footer-column">
            <span className="footer-column-label">PROJECT</span>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
              <span>↗</span>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              Source Code
              <span>↗</span>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              Issues
              <span>↗</span>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              Contributing
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* =========================
                    TERMINAL STRIP
                ========================= */}

        <div className="footer-terminal">
          <span className="terminal-prompt">$</span>

          <span className="terminal-command">pip install onithrasml</span>

          <span className="terminal-cursor" />
        </div>

        {/* =========================
                    FOOTER BOTTOM
                ========================= */}

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} <span>onithrasML</span>
          </div>

          <div className="footer-version">ONITHRASML · V0.3</div>

          <div className="footer-bottom-links">
            <Link to="/">Home</Link>

            <Link to="/docs/v0.3">Documentation</Link>

            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
