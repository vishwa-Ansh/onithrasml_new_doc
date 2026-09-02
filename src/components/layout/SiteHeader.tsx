import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../styles/SiteHeader.css";

export function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [versionOpen, setVersionOpen] = useState(false);

const versions = [
    {
        label: "v0.3",
        path: "/docs/v0.3",
        latest: true,
    },
    {
        label: "v0.2",
        path: "/docs/v0.2",
    },
    {
        label: "v0.1",
        path: "/docs/v0.1",
    },
];

   const closeMenu = () => {
    setMenuOpen(false);
    setVersionOpen(false);
};

    return (
        <header className="premium-header">
            <div className="header-shell">
                <Link
    to="/"
    className="premium-brand"
    onClick={closeMenu}
>
    <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" role="img">
            <circle
                cx="20"
                cy="20"
                r="18"
                fill="#F7931E"
            />

            <path
                d="M11 25c3.2-8.4 7.1-12.6 11.8-12.6
                3.2 0 5.4 2.1 5.4 5.1
                0 6.4-8.7 8.1-8.7 12.3"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
            />

            <circle
                cx="25.4"
                cy="31.2"
                r="1.8"
                fill="#fff"
            />
        </svg>
    </span>

    <span className="logo-text">
        <strong>onithrasML</strong>
        <em>Machine learning in Python</em>
    </span>
</Link>

                {/* =====================================================
            DESKTOP NAV
        ===================================================== */}

                <nav
                    className="premium-nav"
                    aria-label="Primary navigation"
                >

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `premium-nav-link ${isActive ? "active" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>


                    <NavLink
                        to="/docs/v0.3"
                        className={({ isActive }) =>
                            `premium-nav-link ${isActive ? "active" : ""
                            }`
                        }
                    >
                        <span>User Guide</span>
                    </NavLink>


                    <NavLink
                        to="/docs/v0.3#install"
                        className="premium-nav-link"
                    >
                        Install
                    </NavLink>


                    <NavLink
                        to="/docs/v0.3#api"
                        className="premium-nav-link api-link"
                    >
                        API
                    </NavLink>

                </nav>


                {/* =====================================================
            RIGHT ACTIONS
        ===================================================== */}

                <div className="header-right">
                    <div className="version-switcher">

    <button
        type="button"
        className={`version-switcher-button ${
            versionOpen ? "open" : ""
        }`}
        onClick={() => setVersionOpen(!versionOpen)}
        aria-haspopup="listbox"
        aria-expanded={versionOpen}
    >
        <span className="version-dot" />

        <span>
            v0.3
        </span>

        <span className="version-chevron">
           ⌄
        </span>
    </button>


    {versionOpen && (
        <div
            className="version-dropdown"
            role="listbox"
            aria-label="Documentation version"
        >

            <div className="version-dropdown-title">
                DOCUMENTATION VERSION
            </div>


            {versions.map((version) => (

                <Link
                    key={version.label}
                    to={version.path}
                    role="option"
                    aria-selected={version.latest === true}
                    className={`version-option ${
                        version.latest ? "selected" : ""
                    }`}
                    onClick={() => {
                        setVersionOpen(false);
                        setMenuOpen(false);
                    }}
                >

                    <span className="version-option-main">

                        <span>
                            {version.label}
                        </span>

                        {version.latest && (
                            <small>
                                Latest
                            </small>
                        )}

                    </span>


                    {version.latest && (
                        <span className="version-check">
                            ✓
                        </span>
                    )}

                </Link>

            ))}

        </div>
    )}

</div>

                    <div className="header-divider" />

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="github-button"
                        aria-label="Open OnithrasML on GitHub"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                -.908-.62.069-.607.069-.607 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951
                0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65
                0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337
                1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65
                .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
                .359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
                0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017
                C22 6.486 17.523 2 12 2Z"
                            />
                        </svg>

                        <span>
                            GitHub
                        </span>

                        <span className="github-arrow">
                            ↗
                        </span>

                    </a>

                </div>


                {/* =====================================================
            MOBILE BUTTON
        ===================================================== */}

                <button
                    type="button"
                    className={`premium-menu ${menuOpen ? "open" : ""
                        }`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                </button>

            </div>


            {/* =====================================================
          MOBILE MENU
      ===================================================== */}

            <div
                className={`premium-mobile-menu ${menuOpen ? "open" : ""
                    }`}
            >

                <div className="mobile-menu-inner">

                    <div className="mobile-menu-heading">
                        <span>
                            NAVIGATION
                        </span>

                        <span>
                            ONITHRASML · V0.3
                        </span>
                    </div>


                    <nav>

                        <NavLink
                            to="/"
                            end
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `mobile-link ${isActive ? "active" : ""
                                }`
                            }
                        >
                            <span className="mobile-index">
                                01
                            </span>

                            <span>
                                Home
                            </span>

                            <span className="mobile-arrow">
                                →
                            </span>
                        </NavLink>


                        <NavLink
                            to="/docs/v0.3"
                            onClick={closeMenu}
                            className="mobile-link"
                        >
                            <span className="mobile-index">
                                02
                            </span>

                            <span>
                                User Guide
                            </span>

                            <span className="mobile-arrow">
                                →
                            </span>
                        </NavLink>


                        <NavLink
                            to="/docs/v0.3#install"
                            onClick={closeMenu}
                            className="mobile-link"
                        >
                            <span className="mobile-index">
                                03
                            </span>

                            <span>
                                Installation
                            </span>

                            <span className="mobile-arrow">
                                →
                            </span>
                        </NavLink>


                        <NavLink
                            to="/docs/v0.3#api"
                            onClick={closeMenu}
                            className="mobile-link"
                        >
                            <span className="mobile-index">
                                04
                            </span>

                            <span>
                                API Reference
                            </span>

                            <span className="mobile-arrow">
                                →
                            </span>
                        </NavLink>


                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            onClick={closeMenu}
                            className="mobile-link"
                        >
                            <span className="mobile-index">
                                05
                            </span>

                            <span>
                                GitHub
                            </span>

                            <span className="mobile-arrow">
                                ↗
                            </span>
                        </a>

                    </nav>


                    <div className="mobile-menu-footer">

                        <span className="online-indicator" />

                        <span>
                            Documentation
                        </span>

                        <strong>
                            v0.3
                        </strong>

                    </div>

                </div>

            </div>

        </header>
    );
}