import { NavLink } from "react-router-dom";

const moduleItems = [
  {
    label: "Numerical Computing",
    slug: "numerical-computations",
  },
  {
    label: "Linear Algebra",
    slug: "linear-algebra",
  },
  {
    label: "Statistics",
    slug: "statistics",
  },
  {
    label: "Preprocessing",
    slug: "preprocessing",
  },
  {
    label: "Imputation",
    slug: "imputation",
  },
  {
    label: "Linear Models",
    slug: "linear-models",
  },
  {
    label: "Metrics",
    slug: "metrics",
  },
  {
    label: "Optimization",
    slug: "optimization",
  },
  {
    label: "Algorithms",
    slug: "algorithms",
  },
];

const apiItems = [
  {
    label: "Numerical",
    slug: "numerical-computations",
  },
  {
    label: "Linear Algebra",
    slug: "linear-algebra",
  },
  {
    label: "Statistics",
    slug: "statistics",
  },
];

export function DocsSidebar() {
  return (
    <nav className="docs-sidebar" aria-label="Documentation navigation">
      {/* =====================================================
                SIDEBAR HEADER
            ===================================================== */}

      <div className="docs-sidebar-header">
        <span className="docs-sidebar-eyebrow">DOCUMENTATION</span>

        <span className="docs-sidebar-version">v0.3</span>
      </div>

      <div className="docs-sidebar-sections">
        {/* =================================================
                    GETTING STARTED
                ================================================= */}

        {/* =================================================
            COMMUNITY
        ================================================= */}

        <div className="docs-sidebar-section">
          <div className="docs-sidebar-section-title">COMMUNITY</div>

          <div className="docs-sidebar-links">
            <NavLink
              to="/contribute"
              className={({ isActive }) =>
                `docs-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="docs-sidebar-link-dot" />

              <span className="docs-sidebar-link-text">Contributing</span>

              <span className="docs-sidebar-link-arrow">→</span>
            </NavLink>
          </div>
        </div>

        <div className="docs-sidebar-section">
          <div className="docs-sidebar-section-title">GETTING STARTED</div>

          <div className="docs-sidebar-links">
            <NavLink
              to="/docs/v0.3"
              end
              className={({ isActive }) =>
                `docs-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="docs-sidebar-link-dot" />

              <span className="docs-sidebar-link-text">User Guide</span>

              <span className="docs-sidebar-link-arrow">→</span>
            </NavLink>

            <NavLink
              to="/docs/v0.3/install"
              className={({ isActive }) =>
                `docs-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="docs-sidebar-link-dot" />

              <span className="docs-sidebar-link-text">Installation</span>

              <span className="docs-sidebar-link-arrow">→</span>
            </NavLink>

             <NavLink
              to="/visualizations"
              end
              className={({ isActive }) =>
                `docs-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="docs-sidebar-link-dot" />

              <span className="docs-sidebar-link-text">3D visualization</span>

              <span className="docs-sidebar-link-arrow">→</span>
            </NavLink>
          </div>
        </div>

        {/* =================================================
                    MODULES
                ================================================= */}

        <div className="docs-sidebar-section">
          <div className="docs-sidebar-section-title">MODULES</div>

          <div className="docs-sidebar-links">
            {moduleItems.map((item) => (
              <NavLink
                key={item.slug}
                to={`/docs/v0.3/modules/${item.slug}`}
                className={({ isActive }) =>
                  `docs-sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="docs-sidebar-link-dot" />

                <span className="docs-sidebar-link-text">{item.label}</span>

                <span className="docs-sidebar-link-arrow">→</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* =================================================
                    API REFERENCE
                ================================================= */}

        <div className="docs-sidebar-section">
          <div className="docs-sidebar-section-title">API REFERENCE</div>

          <div className="docs-sidebar-links">
            {apiItems.map((item) => (
              <NavLink
                key={item.slug}
                to={`/docs/v0.3/modules/${item.slug}`}
                className={({ isActive }) =>
                  `docs-sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <span className="docs-sidebar-link-dot" />

                <span className="docs-sidebar-link-text">{item.label}</span>

                <span className="docs-sidebar-link-arrow">→</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* =================================================
                    STATUS
                ================================================= */}

        <div className="docs-sidebar-footer">
          <span className="docs-sidebar-status-dot" />

          <div>
            <span className="docs-sidebar-status-label">SYSTEM STATUS</span>

            <strong>Documentation online</strong>
          </div>
        </div>
      </div>
    </nav>
  );
}
