import { useParams } from "react-router-dom";

import { DocsLayout } from "../../components/layout/DocsLayout";
import { DocSection } from "../../components/docs/DocSection";
import { MethodPage } from "../../components/docs/MethodPage";

import { numericalComputing } from "../../data/modules/numericalComputing";
import { linearAlgebra } from "../../data/modules/linearAlgebra";
import { statistics } from "../../data/modules/statistics";

import { linearAlgebraMethods } from "../../data/methods/linear-algebra";

import type { ModuleDocumentation } from "../../data/docs/types";

import "./DocsPage.css";

const moduleDocs: Record<string, ModuleDocumentation> = {
    "numerical-computations": numericalComputing,
    "linear-algebra": linearAlgebra,
    statistics: statistics,
};

export function DocsPage() {
    const {
        version = "v0.3",
        slug,
        module,
        method,
    } = useParams<{
        version: string;
        slug?: string;
        module?: string;
        method?: string;
    }>();

    /* ─────────────────────────────────────────
       Version validation
    ───────────────────────────────────────── */

    if (version !== "v0.3") {
        return (
            <div className="docs-not-found">
                <span>DOCUMENTATION</span>

                <h1>Version not found</h1>

                <p>
                    The documentation version "{version}"
                    is not available yet.
                </p>
            </div>
        );
    }

    /* ─────────────────────────────────────────
       Method documentation
    ───────────────────────────────────────── */

    if (module && method) {
        if (module !== "linear-algebra") {
            return (
                <div className="docs-not-found">
                    <span>ONITHRASML · V0.3</span>

                    <h1>Method not found</h1>

                    <p>
                        Methods for the "{module}" module
                        are not available yet.
                    </p>
                </div>
            );
        }

        const methodDoc =
            linearAlgebraMethods[method];

        if (!methodDoc) {
            return (
                <div className="docs-not-found">
                    <span>
                        ONITHRASML · LINEAR ALGEBRA
                    </span>

                    <h1>Method not found</h1>

                    <p>
                        The method "{method}" does not
                        exist in the documentation.
                    </p>
                </div>
            );
        }

        const tocItems = [
            "Signature",
            ...(methodDoc.parameters?.length
                ? ["Parameters"]
                : []),
            ...(methodDoc.returns
                ? ["Returns"]
                : []),
            ...(methodDoc.formula
                ? ["Mathematical Concept"]
                : []),
            ...(methodDoc.examples?.length
                ? ["Examples"]
                : []),
            ...(methodDoc.implementation?.length
                ? ["Implementation"]
                : []),
            ...(methodDoc.numericalConsiderations
                ?.length
                ? ["Numerical Considerations"]
                : []),
            ...(methodDoc.complexity
                ? ["Complexity"]
                : []),
            ...(methodDoc.notes?.length
                ? ["Notes"]
                : []),
            ...(methodDoc.warnings?.length
                ? ["Warnings"]
                : []),
            ...(methodDoc.errors?.length
                ? ["Errors & Edge Cases"]
                : []),
            ...(methodDoc.relatedMethods?.length
                ? ["Related Methods"]
                : []),
        ];

        return (
            <DocsLayout
                title={methodDoc.title}
                tocItems={tocItems}
            >
                <MethodPage method={methodDoc} />
            </DocsLayout>
        );
    }

    /* ─────────────────────────────────────────
       Documentation home
    ───────────────────────────────────────── */

    if (!slug) {
        return (
            <div className="docs-not-found">
                <span>ONITHRASML · V0.3</span>

                <h1>User Guide</h1>

                <p>
                    Welcome to the OnithrasML
                    documentation. Select a module
                    from the sidebar to begin.
                </p>
            </div>
        );
    }

    /* ─────────────────────────────────────────
       Module documentation
    ───────────────────────────────────────── */

    const page = moduleDocs[slug];

    if (!page) {
        return (
            <div className="docs-not-found">
                <span>ONITHRASML · V0.3</span>

                <h1>Page not found</h1>

                <p>
                    The documentation page "{slug}"
                    does not exist.
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

                {/* Header */}
                <header className="docs-page-header">

                    <div className="docs-page-eyebrow">
                        <span className="docs-page-eyebrow-dot" />

                        {page.eyebrow}
                    </div>

                    <h1>{page.title}</h1>

                    <p className="docs-page-description">
                        {page.description}
                    </p>

                    {page.tags &&
                        page.tags.length > 0 && (
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
                        )}
                </header>

                {/* Content */}
                <div className="docs-page-content">
                    {page.sections.map(
                        (section, index) => (
                            <DocSection
                                key={section.id}
                                section={section}
                                number={index + 1}
                            />
                        )
                    )}
                </div>

                {/* Footer */}
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