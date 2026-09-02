import { Link, useParams } from "react-router-dom";

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
    statistics,
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

    /*
     * VERSION
     */

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

    /*
     * METHOD PAGE
     *
     * /docs/v0.3/modules/linear-algebra/inv
     */

    if (module && method) {
        if (module !== "linear-algebra") {
            return (
                <div className="docs-not-found">
                    <span>ONITHRASML · V0.3</span>

                    <h1>Method not found</h1>

                    <p>
                        Methods for the "{module}"
                        module are not available yet.
                    </p>
                </div>
            );
        }

        const methodDoc = linearAlgebraMethods[method];

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

            ...(methodDoc.numericalConsiderations?.length
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

    /*
     * USER GUIDE
     *
     * /docs/v0.3
     */

    if (!slug) {
        return (
            <DocsLayout
                title="User Guide"
                tocItems={[
                    "Introduction",
                    "Modules",
                    "Getting Started",
                    "Documentation Structure",
                ]}
            >
                <article className="docs-page">

                    <header className="docs-page-header">
                        <div className="docs-page-eyebrow">
                            <span className="docs-page-eyebrow-dot" />

                            ONITHRASML · DOCUMENTATION
                        </div>

                        <h1>User Guide</h1>

                        <p className="docs-page-description">
                            Learn how to use OnithrasML for
                            numerical computing, machine
                            learning, statistics, and
                            scientific computation.
                        </p>

                        <div className="docs-page-tags">
                            <span className="docs-page-tag">
                                v0.3
                            </span>

                            <span className="docs-page-tag">
                                Python
                            </span>

                            <span className="docs-page-tag">
                                Scientific Computing
                            </span>
                        </div>
                    </header>

                    <div className="docs-page-content">

                        <section
                            className="doc-section"
                            id="introduction"
                        >
                            <div className="doc-section-number">
                                01
                            </div>

                            <div className="doc-section-content">
                                <h2>Introduction</h2>

                                <p className="doc-section-description">
                                    OnithrasML is a Python-friendly
                                    scientific computing and machine
                                    learning library designed around
                                    optimized numerical computation.
                                </p>

                                <p className="doc-section-paragraph">
                                    The documentation is organized
                                    into modules. Each module contains
                                    detailed concepts, examples, and
                                    links to its individual methods.
                                </p>
                            </div>
                        </section>

                        <section
                            className="doc-section"
                            id="modules"
                        >
                            <div className="doc-section-number">
                                02
                            </div>

                            <div className="doc-section-content">
                                <h2>Modules</h2>

                                <p className="doc-section-description">
                                    Choose a module to explore its
                                    concepts, examples, and API.
                                </p>

                                <div className="doc-parameter-list">

                                    {Object.values(moduleDocs).map(
                                        (moduleDoc) => (
                                            <Link
                                                key={moduleDoc.slug}
                                                to={`/docs/${version}/modules/${moduleDoc.slug}`}
                                                className="doc-parameter"
                                            >
                                                <div className="doc-parameter-header">
                                                    <code>
                                                        {moduleDoc.title}
                                                    </code>

                                                    <span>
                                                        Explore module →
                                                    </span>
                                                </div>

                                                <p>
                                                    {moduleDoc.description}
                                                </p>
                                            </Link>
                                        )
                                    )}

                                </div>
                            </div>
                        </section>

                        <section
                            className="doc-section"
                            id="getting-started"
                        >
                            <div className="doc-section-number">
                                03
                            </div>

                            <div className="doc-section-content">
                                <h2>Getting Started</h2>

                                <p className="doc-section-description">
                                    Install OnithrasML and import
                                    it into your Python project.
                                </p>

                                <div className="doc-example">
                                    <div className="doc-example-header">
                                        <span>PYTHON</span>
                                        <span>Example</span>
                                    </div>

                                    <pre>
                                        <code>
{`import onithrasML as oml

print(oml)`}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </section>

                        <section
                            className="doc-section"
                            id="documentation-structure"
                        >
                            <div className="doc-section-number">
                                04
                            </div>

                            <div className="doc-section-content">
                                <h2>Documentation Structure</h2>

                                <p className="doc-section-description">
                                    Each module has its own overview
                                    followed by categorized methods.
                                </p>

                                <p className="doc-section-paragraph">
                                    Select a module such as{" "}
                                    <strong>
                                        Linear Algebra
                                    </strong>{" "}
                                    to see its detailed documentation
                                    and available methods.
                                </p>
                            </div>
                        </section>

                    </div>

                    <footer className="docs-page-footer">
                        <div>
                            <span>DOCUMENTATION</span>
                            <strong>V0.3</strong>
                        </div>

                        <div className="docs-page-footer-next">
                            <span>MORE TO EXPLORE</span>

                            <strong>
                                Select a module from the list →
                            </strong>
                        </div>
                    </footer>

                </article>
            </DocsLayout>
        );
    }

    /*
     * MODULE PAGE
     */

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

    const tocItems = [
        ...page.sections.map(
            (section) => section.title
        ),

        ...(page.methodCategories?.length
            ? ["Methods"]
            : []),
    ];

    return (
        <DocsLayout
            title={page.title}
            tocItems={tocItems}
        >
            <article className="docs-page">

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

                <div className="docs-page-content">

                    {/* MODULE CONTENT */}

                    {page.sections.map(
                        (section, index) => (
                            <DocSection
                                key={section.id}
                                section={section}
                                number={index + 1}
                            />
                        )
                    )}

                    {/* METHOD CATALOG */}

                    {page.methodCategories &&
                        page.methodCategories.length > 0 && (
                            <section
                                className="doc-section docs-method-catalog"
                                id="methods"
                            >
                                <div className="doc-section-number">
                                    {String(
                                        page.sections.length + 1
                                    ).padStart(2, "0")}
                                </div>

                                <div className="doc-section-content">

                                    <h2>Methods</h2>

                                    <p className="doc-section-description">
                                        Explore the available
                                        Linear Algebra methods.
                                        Select a method to open
                                        its complete documentation.
                                    </p>

                                    <div className="docs-method-categories">

                                        {page.methodCategories.map(
                                            (category) => (
                                                <div
                                                    className="docs-method-category"
                                                    key={category.id}
                                                >
                                                    <div className="docs-method-category-header">

                                                        <h3>
                                                            {category.title}
                                                        </h3>

                                                        {category.description && (
                                                            <p>
                                                                {
                                                                    category.description
                                                                }
                                                            </p>
                                                        )}

                                                    </div>

                                                    <div className="docs-method-list">

                                                        {category.methods.map(
                                                            (methodItem) => (
                                                                <Link
                                                                    key={
                                                                        methodItem.slug
                                                                    }
                                                                    to={`/docs/${version}/modules/${page.slug}/${methodItem.slug}`}
                                                                    className="docs-method-card"
                                                                >
                                                                    <div className="docs-method-card-main">

                                                                        <div className="docs-method-card-name">
                                                                            <code>
                                                                                {
                                                                                    methodItem.name
                                                                                }
                                                                            </code>

                                                                            {methodItem.status ===
                                                                                "planned" && (
                                                                                <span className="docs-method-status">
                                                                                    PLANNED
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <h4>
                                                                            {
                                                                                methodItem.title
                                                                            }
                                                                        </h4>

                                                                        <p>
                                                                            {
                                                                                methodItem.description
                                                                            }
                                                                        </p>

                                                                    </div>

                                                                    <span className="docs-method-card-arrow">
                                                                        →
                                                                    </span>
                                                                </Link>
                                                            )
                                                        )}

                                                    </div>
                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            </section>
                        )}

                </div>

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