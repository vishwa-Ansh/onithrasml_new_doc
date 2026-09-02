import { useParams } from "react-router-dom";
import { DocsLayout } from "../../components/layout/DocsLayout";
import {
    numericalComputing,
    type ModuleDocumentation,
} from "../../data/modules/numericalComputing";
import "./DocsPage.css";

const moduleDocs: Record<string, ModuleDocumentation> = {
    "numerical-computations": numericalComputing,
};

export function DocsPage() {
    const { version = "v0.3", slug } = useParams<{
        version: string;
        slug?: string;
    }>();

    /*
     * At the moment we are building v0.3.
     * More versions will be added later without changing
     * the documentation component itself.
     */
    if (version !== "v0.3") {
        return (
            <div className="docs-not-found">
                <span>DOCUMENTATION</span>

                <h1>Version not found</h1>

                <p>
                    The documentation version "{version}" is
                    not available yet.
                </p>
            </div>
        );
    }

    /*
     * /docs/v0.3
     *
     * User Guide will be connected here later.
     */
    if (!slug) {
        return (
            <div className="docs-not-found">
                <span>ONITHRASML · V0.3</span>

                <h1>User Guide</h1>

                <p>
                    Welcome to the OnithrasML documentation.
                    Select a module from the sidebar to begin.
                </p>
            </div>
        );
    }

    const page = moduleDocs[slug];

    /*
     * Unknown module
     */
    if (!page) {
        return (
            <div className="docs-not-found">
                <span>ONITHRASML · V0.3</span>

                <h1>Page not found</h1>

                <p>
                    The documentation page "{slug}" does not
                    exist.
                </p>
            </div>
        );
    }

    const tocItems = page.sections.map(
        (section) => section.title
    );

    return (
        <DocsLayout
            title={page.title}
            tocItems={tocItems}
        >
            <article className="docs-page">
                {/* =========================================
                    PAGE HEADER
                   ========================================= */}

                <header className="docs-page-header">
                    <div className="docs-page-eyebrow">
                        <span className="docs-page-eyebrow-dot" />

                        {page.eyebrow}
                    </div>

                    <h1>{page.title}</h1>

                    <p className="docs-page-description">
                        {page.description}
                    </p>

                    <div className="docs-page-tags">
                        {page.tags.map((tag) => (
                            <span
                                className="docs-page-tag"
                                key={tag}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* =========================================
                    DOCUMENTATION CONTENT
                   ========================================= */}

                <div className="docs-page-content">
                    {page.sections.map(
                        (section, index) => (
                            <section
                                className="docs-section"
                                id={section.id}
                                key={section.id}
                            >
                                <div className="docs-section-number">
                                    {String(index + 1).padStart(
                                        2,
                                        "0"
                                    )}
                                </div>

                                <div className="docs-section-body">
                                    <h2>
                                        {section.title}
                                    </h2>

                                    <p>
                                        {section.content}
                                    </p>
                                </div>
                            </section>
                        )
                    )}
                </div>

                {/* =========================================
                    PAGE FOOTER
                   ========================================= */}

                <footer className="docs-page-footer">
                    <div>
                        <span>DOCUMENTATION</span>

                        <strong>V0.3</strong>
                    </div>

                    <div className="docs-page-footer-next">
                        <span>MORE TO EXPLORE</span>

                        <strong>
                            Explore the documentation →
                        </strong>
                    </div>
                </footer>
            </article>
        </DocsLayout>
    );
}