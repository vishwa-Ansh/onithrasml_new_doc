import { NavLink } from "react-router-dom";

const sections = [
    {
        label: "GETTING STARTED",
        items: [
            {
                label: "User Guide",
                path: "/docs/v0.3",
            },
        ],
    },
    {
        label: "MODULES",
        items: [
            {
                label: "Numerical Computing",
                path: "/docs/v0.3/modules/numerical-computations",
            },
            {
                label: "Linear Algebra",
                path: "/docs/v0.3/modules/linear-algebra",
            },
            {
                label: "Statistics",
                path: "/docs/v0.3/modules/statistics",
            },
            {
                label: "Preprocessing",
                path: "/docs/v0.3/modules/preprocessing",
            },
            {
                label: "Imputation",
                path: "/docs/v0.3/modules/imputation",
            },
            {
                label: "Linear Models",
                path: "/docs/v0.3/modules/linear-models",
            },
            {
                label: "Metrics",
                path: "/docs/v0.3/modules/metrics",
            },
            {
                label: "Optimization",
                path: "/docs/v0.3/modules/optimization",
            },
            {
                label: "Algorithms",
                path: "/docs/v0.3/modules/algorithms",
            },
        ],
    },
    {
        label: "API REFERENCE",
        items: [
            {
                label: "Numerical",
                path: "/docs/v0.3/api/numerical",
            },
            {
                label: "Linear Algebra",
                path: "/docs/v0.3/api/linear-algebra",
            },
            {
                label: "Statistics",
                path: "/docs/v0.3/api/statistics",
            },
        ],
    },
];

export function DocsSidebar() {
    return (
        <nav className="docs-sidebar" aria-label="Documentation navigation">
            <div className="docs-sidebar-header">
                <span className="docs-sidebar-eyebrow">
                    ONITHRASML
                </span>

                <span className="docs-sidebar-version">
                    V0.3
                </span>
            </div>

            <div className="docs-sidebar-sections">
                {sections.map((section) => (
                    <section
                        className="docs-sidebar-section"
                        key={section.label}
                    >
                        <div className="docs-sidebar-section-title">
                            {section.label}
                        </div>

                        <div className="docs-sidebar-links">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === "/docs/v0.3"}
                                    className={({ isActive }) =>
                                        `docs-sidebar-link ${
                                            isActive ? "active" : ""
                                        }`
                                    }
                                >
                                    <span className="docs-sidebar-link-dot" />

                                    <span className="docs-sidebar-link-text">
                                        {item.label}
                                    </span>

                                    <span className="docs-sidebar-link-arrow">
                                        →
                                    </span>
                                </NavLink>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <div className="docs-sidebar-footer">
                <span className="docs-sidebar-status-dot" />

                <div>
                    <span className="docs-sidebar-status-label">
                        DOCUMENTATION
                    </span>

                    <strong>v0.3</strong>
                </div>
            </div>
        </nav>
    );
}