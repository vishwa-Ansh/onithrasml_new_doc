import { Link } from "react-router-dom";
import "./ChangelogPage.css";

const releases = [
    {
        version: "v0.3",
        date: "September 2026",
        status: "Current",
        changes: [
            {
                type: "Added",
                items: [
                    "Numerical Computing module",
                    "Linear Algebra module",
                    "Statistics module",
                    "Module-level documentation",
                    "Method-level API documentation",
                    "Interactive documentation navigation",
                    "Responsive documentation layout",
                    "Installation guide",
                    "Community contribution page",
                ],
            },
            {
                type: "Improved",
                items: [
                    "Documentation structure and navigation",
                    "API reference organization",
                    "Mobile documentation experience",
                    "Code examples and mathematical explanations",
                ],
            },
            {
                type: "Fixed",
                items: [
                    "Documentation routing",
                    "Responsive layout overflow issues",
                    "Mobile navigation behavior",
                ],
            },
        ],
    },
    {
        version: "v0.2",
        date: "Previous release",
        status: "Previous",
        changes: [
            {
                type: "Added",
                items: [
                    "Initial scientific computing modules",
                    "Core numerical functionality",
                    "Initial Python API structure",
                ],
            },
            {
                type: "Improved",
                items: [
                    "Core package organization",
                    "Internal module structure",
                ],
            },
        ],
    },
    {
        version: "v0.1",
        date: "Initial release",
        status: "Previous",
        changes: [
            {
                type: "Added",
                items: [
                    "Initial OnithrasML project",
                    "Base Python package structure",
                    "Initial scientific computing foundation",
                ],
            },
        ],
    },
];

export function ChangelogPage() {
    return (
        <main className="changelog-page">
            <section className="changelog-hero">
                <div className="changelog-hero-inner">
                    <div className="changelog-eyebrow">
                        ONITHRASML · CHANGELOG
                    </div>

                    <h1>
                        What's new in
                        <span> OnithrasML</span>
                    </h1>

                    <p>
                        A chronological record of new features, improvements,
                        fixes, and changes across OnithrasML releases.
                    </p>

                    <div className="changelog-hero-meta">
                        <span>
                            <i />
                            Latest release
                        </span>

                        <strong>v0.3</strong>

                        <span>September 2026</span>
                    </div>
                </div>
            </section>

            <section className="changelog-content">
                <div className="changelog-intro">
                    <div>
                        <span className="changelog-section-label">
                            RELEASE HISTORY
                        </span>

                        <h2>
                            Built incrementally.
                            <br />
                            Improved continuously.
                        </h2>
                    </div>

                    <p>
                        Each release of OnithrasML focuses on expanding its
                        scientific computing capabilities while keeping the
                        API and documentation clear and approachable.
                    </p>
                </div>

                <div className="changelog-timeline">
                    {releases.map((release, releaseIndex) => (
                        <article
                            className="changelog-release"
                            key={release.version}
                        >
                            <div className="changelog-release-marker">
                                <span />
                            </div>

                            <div className="changelog-release-main">
                                <header className="changelog-release-header">
                                    <div>
                                        <div className="changelog-version-row">
                                            <h2>{release.version}</h2>

                                            {release.status === "Current" && (
                                                <span className="changelog-current">
                                                    CURRENT
                                                </span>
                                            )}
                                        </div>

                                        <span className="changelog-date">
                                            {release.date}
                                        </span>
                                    </div>

                                    <span className="changelog-release-number">
                                        {String(releases.length - releaseIndex).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>
                                </header>

                                <div className="changelog-change-groups">
                                    {release.changes.map((change) => (
                                        <section
                                            className={`changelog-change-group changelog-${change.type.toLowerCase()}`}
                                            key={change.type}
                                        >
                                            <div className="changelog-change-heading">
                                                <span className="changelog-change-icon">
                                                    {change.type === "Added"
                                                        ? "+"
                                                        : change.type ===
                                                            "Improved"
                                                          ? "↗"
                                                          : "✓"}
                                                </span>

                                                <h3>{change.type}</h3>
                                            </div>

                                            <ul>
                                                {change.items.map((item) => (
                                                    <li key={item}>
                                                        <span className="change-bullet" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <section className="changelog-footer-card">
                    <div>
                        <span className="changelog-section-label">
                            WANT TO HELP?
                        </span>

                        <h2>
                            Help shape the
                            <br />
                            next release.
                        </h2>

                        <p>
                            Contribute code, documentation, tests, ideas, or
                            bug reports to help improve OnithrasML.
                        </p>
                    </div>

                    <Link
                        to="/contribute"
                        className="changelog-contribute-button"
                    >
                        <span>Contributing</span>
                        <span>→</span>
                    </Link>
                </section>
            </section>
        </main>
    );
}