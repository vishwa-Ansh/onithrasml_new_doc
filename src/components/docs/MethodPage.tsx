import type { MethodDocumentation } from "../../data/docs/types";
import "./MethodPage.css";

interface MethodPageProps {
    method: MethodDocumentation;
}

export function MethodPage({ method }: MethodPageProps) {
    return (
        <article className="method-page">

            {/* Header */}
            <header className="method-page-header">
                <div className="method-page-eyebrow">
                    <span className="method-page-eyebrow-dot" />
                    {method.category}
                </div>

                <div className="method-page-title-row">
                    <div>
                        <h1>{method.title}</h1>

                        <div className="method-page-name">
                            <code>{method.name}()</code>

                            {method.status && (
                                <span
                                    className={`method-status method-status-${method.status}`}
                                >
                                    {method.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <p className="method-page-description">
                    {method.description}
                </p>
            </header>

            {/* Signature */}
            <section
                className="method-section"
                id="signature"
            >
                <div className="method-section-number">
                    01
                </div>

                <div className="method-section-content">
                    <h2>Signature</h2>

                    <div className="method-signature">
                        <code>{method.signature}</code>
                    </div>
                </div>
            </section>

            {/* Parameters */}
            {method.parameters &&
                method.parameters.length > 0 && (
                    <section
                        className="method-section"
                        id="parameters"
                    >
                        <div className="method-section-number">
                            02
                        </div>

                        <div className="method-section-content">
                            <h2>Parameters</h2>

                            <div className="method-parameter-list">
                                {method.parameters.map(
                                    (parameter) => (
                                        <div
                                            className="method-parameter"
                                            key={parameter.name}
                                        >
                                            <div className="method-parameter-header">
                                                <code>
                                                    {
                                                        parameter.name
                                                    }
                                                </code>

                                                <span>
                                                    {
                                                        parameter.type
                                                    }
                                                </span>

                                                {parameter.required !==
                                                    undefined && (
                                                    <small>
                                                        {parameter.required
                                                            ? "required"
                                                            : "optional"}
                                                    </small>
                                                )}
                                            </div>

                                            <p>
                                                {
                                                    parameter.description
                                                }
                                            </p>

                                            {parameter.default && (
                                                <div className="method-parameter-default">
                                                    Default:{" "}
                                                    <code>
                                                        {
                                                            parameter.default
                                                        }
                                                    </code>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Returns */}
            {method.returns && (
                <section
                    className="method-section"
                    id="returns"
                >
                    <div className="method-section-number">
                        03
                    </div>

                    <div className="method-section-content">
                        <h2>Returns</h2>

                        <div className="method-return">
                            <code>
                                {method.returns.type}
                            </code>

                            <p>
                                {
                                    method.returns
                                        .description
                                }
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Mathematical Formula */}
            {method.formula && (
                <section
                    className="method-section"
                    id="mathematical-concept"
                >
                    <div className="method-section-number">
                        04
                    </div>

                    <div className="method-section-content">
                        <h2>
                            Mathematical Concept
                        </h2>

                        <div className="method-formula">
                            {method.formula.title && (
                                <div className="method-formula-title">
                                    {
                                        method.formula
                                            .title
                                    }
                                </div>
                            )}

                            <div className="method-formula-expression">
                                <code>
                                    {
                                        method.formula
                                            .expression
                                    }
                                </code>
                            </div>

                            {method.formula
                                .explanation && (
                                <p>
                                    {
                                        method.formula
                                            .explanation
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Examples */}
            {method.examples &&
                method.examples.length > 0 && (
                    <section
                        className="method-section"
                        id="examples"
                    >
                        <div className="method-section-number">
                            05
                        </div>

                        <div className="method-section-content">
                            <h2>Examples</h2>

                            <div className="method-examples">
                                {method.examples.map(
                                    (example, index) => (
                                        <div
                                            className="method-example"
                                            key={index}
                                        >
                                            <div className="method-example-header">
                                                <span>
                                                    {example.language.toUpperCase()}
                                                </span>

                                                <span>
                                                    Example{" "}
                                                    {index +
                                                        1}
                                                </span>
                                            </div>

                                            <pre>
                                                <code>
                                                    {
                                                        example.code
                                                    }
                                                </code>
                                            </pre>

                                            {example.output && (
                                                <div className="method-example-output">
                                                    <div className="method-output-label">
                                                        OUTPUT
                                                    </div>

                                                    <pre>
                                                        <code>
                                                            {
                                                                example.output
                                                            }
                                                        </code>
                                                    </pre>
                                                </div>
                                            )}

                                            {example.explanation && (
                                                <p className="method-example-explanation">
                                                    {
                                                        example.explanation
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* Implementation */}
            {method.implementation &&
                method.implementation.length > 0 && (
                    <section
                        className="method-section"
                        id="implementation"
                    >
                        <div className="method-section-number">
                            06
                        </div>

                        <div className="method-section-content">
                            <h2>
                                Implementation
                            </h2>

                            {method.implementation.map(
                                (paragraph, index) => (
                                    <p
                                        className="method-paragraph"
                                        key={index}
                                    >
                                        {paragraph}
                                    </p>
                                )
                            )}
                        </div>
                    </section>
                )}

            {/* Numerical Considerations */}
            {method.numericalConsiderations &&
                method.numericalConsiderations.length >
                    0 && (
                    <section
                        className="method-section"
                        id="numerical-considerations"
                    >
                        <div className="method-section-number">
                            07
                        </div>

                        <div className="method-section-content">
                            <h2>
                                Numerical Considerations
                            </h2>

                            <ul className="method-list">
                                {method.numericalConsiderations.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </section>
                )}

            {/* Complexity */}
            {method.complexity && (
                <section
                    className="method-section"
                    id="complexity"
                >
                    <div className="method-section-number">
                        08
                    </div>

                    <div className="method-section-content">
                        <h2>Complexity</h2>

                        <div className="method-complexity">
                            {method.complexity.time && (
                                <div>
                                    <span>TIME</span>
                                    <code>
                                        {
                                            method
                                                .complexity
                                                .time
                                        }
                                    </code>
                                </div>
                            )}

                            {method.complexity.space && (
                                <div>
                                    <span>SPACE</span>
                                    <code>
                                        {
                                            method
                                                .complexity
                                                .space
                                        }
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Notes */}
            {method.notes &&
                method.notes.length > 0 && (
                    <section
                        className="method-callout method-note"
                        id="notes"
                    >
                        <div className="method-callout-label">
                            NOTE
                        </div>

                        <ul>
                            {method.notes.map(
                                (note, index) => (
                                    <li key={index}>
                                        {note}
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                )}

            {/* Warnings */}
            {method.warnings &&
                method.warnings.length > 0 && (
                    <section
                        className="method-callout method-warning"
                        id="warnings"
                    >
                        <div className="method-callout-label">
                            WARNING
                        </div>

                        <ul>
                            {method.warnings.map(
                                (warning, index) => (
                                    <li key={index}>
                                        {warning}
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                )}

            {/* Errors */}
            {method.errors &&
                method.errors.length > 0 && (
                    <section
                        className="method-callout method-errors"
                        id="errors"
                    >
                        <div className="method-callout-label">
                            ERRORS & EDGE CASES
                        </div>

                        <ul>
                            {method.errors.map(
                                (error, index) => (
                                    <li key={index}>
                                        {error}
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                )}

            {/* Related Methods */}
            {method.relatedMethods &&
                method.relatedMethods.length > 0 && (
                    <section
                        className="method-related"
                        id="related-methods"
                    >
                        <h2>Related Methods</h2>

                        <div className="method-related-list">
                            {method.relatedMethods.map(
                                (related) => (
                                    <span
                                        key={related}
                                        className="method-related-item"
                                    >
                                        <code>
                                            {related}()
                                        </code>
                                        <span>→</span>
                                    </span>
                                )
                            )}
                        </div>
                    </section>
                )}
        </article>
    );
}