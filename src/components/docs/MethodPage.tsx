import type { MethodDocumentation } from "../../data/docs/types";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "./MethodPage.css";

interface MethodPageProps {
    method: MethodDocumentation;
}

function highlightPython(code: string) {
    return Prism.highlight(
        code,
        Prism.languages.python,
        "python"
    );
}

export function MethodPage({ method }: MethodPageProps) {
    let sectionNumber = 1;

    const getNumber = () =>
        String(sectionNumber++).padStart(2, "0");

    return (
        <article className="method-page">

            {/* HEADER */}
            <header className="method-page-header">
                <div className="method-page-eyebrow">
                    {method.category}
                </div>

                <h1>{method.title}</h1>

                <p className="method-page-description">
                    {method.description}
                </p>

                <div className="method-page-meta">
                    <code>{method.name}</code>

                    {method.status && (
                        <span
                            className={`method-status ${method.status}`}
                        >
                            {method.status}
                        </span>
                    )}
                </div>
            </header>

            {/* SIGNATURE */}
            <section
                id="signature"
                className="method-section"
            >
                <div className="method-section-number">
                    {getNumber()}
                </div>

                <div className="method-section-content">
                    <h2>Signature</h2>

                    <pre className="method-signature">
                        <code>{method.signature}</code>
                    </pre>
                </div>
            </section>

            {/* PARAMETERS */}
            {method.parameters &&
                method.parameters.length > 0 && (
                    <section
                        id="parameters"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Parameters</h2>

                            <div className="method-parameters">
                                {method.parameters.map(
                                    (parameter) => (
                                        <div
                                            key={parameter.name}
                                            className="method-parameter"
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

                                                {parameter.shape && (
                                                    <small>
                                                        shape:{" "}
                                                        {
                                                            parameter.shape
                                                        }
                                                    </small>
                                                )}

                                                {parameter.required && (
                                                    <small>
                                                        required
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

            {/* RETURNS */}
            {method.returns && (
                <section
                    id="returns"
                    className="method-section"
                >
                    <div className="method-section-number">
                        {getNumber()}
                    </div>

                    <div className="method-section-content">
                        <h2>Returns</h2>

                        <div className="method-return">
                            <div className="method-return-header">
                                {method.returns.name && (
                                    <code>
                                        {method.returns.name}
                                    </code>
                                )}

                                <span>
                                    {method.returns.type}
                                </span>

                                {method.returns.shape && (
                                    <small>
                                        shape:{" "}
                                        {method.returns.shape}
                                    </small>
                                )}
                            </div>

                            <p>
                                {method.returns.description}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* RAISES */}
            {method.raises &&
                method.raises.length > 0 && (
                    <section
                        id="raises"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Raises</h2>

                            <div className="method-raises">
                                {method.raises.map(
                                    (item) => (
                                        <div
                                            key={item.error}
                                            className="method-raise"
                                        >
                                            <code>
                                                {item.error}
                                            </code>

                                            <p>
                                                {
                                                    item.description
                                                }
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

            {/* FORMULA */}
            {method.formula && (
                <section
                    id="mathematical-concept"
                    className="method-section"
                >
                    <div className="method-section-number">
                        {getNumber()}
                    </div>

                    <div className="method-section-content">
                        <h2>Mathematical Concept</h2>

                        <div className="method-formula">
                            <div className="method-formula-title">
                                {method.formula.title}
                            </div>

                            <div className="method-formula-expression">
                                {method.formula.expression}
                            </div>

                            {method.formula.explanation && (
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

            {/* EXAMPLES */}
            {method.examples &&
                method.examples.length > 0 && (
                    <section
                        id="examples"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Examples</h2>

                            <div className="method-examples">
                                {method.examples.map(
                                    (example, index) => (
                                        <div
                                            key={index}
                                            className="method-example"
                                        >
                                            <div className="method-example-header">
                                                <span>
                                                    {
                                                        example.language
                                                    }
                                                </span>

                                                <span>
                                                    Example{" "}
                                                    {index + 1}
                                                </span>
                                            </div>

                                            <pre className="method-code">
                                                <code
                                                    className={`language-${example.language.toLowerCase()}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            example.language.toLowerCase() ===
                                                            "python"
                                                                ? highlightPython(
                                                                      example.code
                                                                  )
                                                                : example.code
                                                                    .replace(
                                                                        /&/g,
                                                                        "&amp;"
                                                                    )
                                                                    .replace(
                                                                        /</g,
                                                                        "&lt;"
                                                                    )
                                                                    .replace(
                                                                        />/g,
                                                                        "&gt;"
                                                                    ),
                                                    }}
                                                />
                                            </pre>

                                            {example.output && (
                                                <div className="method-output">
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

            {/* IMPLEMENTATION */}
            {method.implementation &&
                method.implementation.length > 0 && (
                    <section
                        id="implementation"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Implementation</h2>

                            <ul className="method-list">
                                {method.implementation.map(
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

            {/* NUMERICAL CONSIDERATIONS */}
            {method.numericalConsiderations &&
                method.numericalConsiderations.length > 0 && (
                    <section
                        id="numerical-considerations"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
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

            {/* COMPLEXITY */}
            {method.complexity && (
                <section
                    id="complexity"
                    className="method-section"
                >
                    <div className="method-section-number">
                        {getNumber()}
                    </div>

                    <div className="method-section-content">
                        <h2>Complexity</h2>

                        <div className="method-complexity">
                            {method.complexity.time && (
                                <div>
                                    <span>TIME</span>
                                    <code>
                                        {method.complexity.time}
                                    </code>
                                </div>
                            )}

                            {method.complexity.space && (
                                <div>
                                    <span>SPACE</span>
                                    <code>
                                        {method.complexity.space}
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* NOTES */}
            {method.notes &&
                method.notes.length > 0 && (
                    <section
                        id="notes"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Notes</h2>

                            <div className="method-callout method-note">
                                <ul>
                                    {method.notes.map(
                                        (note, index) => (
                                            <li key={index}>
                                                {note}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

            {/* WARNINGS */}
            {method.warnings &&
                method.warnings.length > 0 && (
                    <section
                        id="warnings"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Warnings</h2>

                            <div className="method-callout method-warning">
                                <ul>
                                    {method.warnings.map(
                                        (warning, index) => (
                                            <li key={index}>
                                                {warning}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

            {/* ERRORS */}
            {method.errors &&
                method.errors.length > 0 && (
                    <section
                        id="errors"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Errors</h2>

                            <div className="method-callout method-error">
                                <ul>
                                    {method.errors.map(
                                        (error, index) => (
                                            <li key={index}>
                                                {error}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

            {/* RELATED METHODS */}
            {method.relatedMethods &&
                method.relatedMethods.length > 0 && (
                    <section
                        id="related-methods"
                        className="method-section"
                    >
                        <div className="method-section-number">
                            {getNumber()}
                        </div>

                        <div className="method-section-content">
                            <h2>Related Methods</h2>

                            <div className="method-related">
                                {method.relatedMethods.map(
                                    (related) => (
                                        <span
                                            key={related}
                                            className="method-related-item"
                                        >
                                            {related}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}
        </article>
    );
}