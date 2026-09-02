import type { DocumentationSection } from "../../data/docs/types";
import { Formula } from "./Formula";
import "./DocSection.css";

interface DocSectionProps {
    section: DocumentationSection;
    number: number;
}

export function DocSection({
    section,
    number,
}: DocSectionProps) {
    return (
        <section className="doc-section" id={section.id}>
            <div className="doc-section-number">
                {String(number).padStart(2, "0")}
            </div>

            <div className="doc-section-content">
                <h2>{section.title}</h2>

                {section.description && (
                    <p className="doc-section-description">
                        {section.description}
                    </p>
                )}

                {/* Paragraphs */}
                {section.paragraphs?.map((paragraph, index) => (
                    <p
                        className="doc-section-paragraph"
                        key={index}
                    >
                        {paragraph}
                    </p>
                ))}

                {/* Formula */}
                {section.formula && (
                    <Formula
                        title={section.formula.title}
                        expression={section.formula.expression}
                        explanation={section.formula.explanation}
                    />
                )}

                {/* Parameters */}
                {section.parameters &&
                    section.parameters.length > 0 && (
                        <div className="doc-parameters">
                            <h3>Parameters</h3>

                            <div className="doc-parameter-list">
                                {section.parameters.map(
                                    (parameter) => (
                                        <div
                                            className="doc-parameter"
                                            key={parameter.name}
                                        >
                                            <div className="doc-parameter-header">
                                                <code>
                                                    {parameter.name}
                                                </code>

                                                <span>
                                                    {parameter.type}
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
                                                <div className="doc-parameter-default">
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
                    )}

                {/* Returns */}
                {section.returns && (
                    <div className="doc-returns">
                        <h3>Returns</h3>

                        <div className="doc-return">
                            {section.returns.name && (
                                <code>
                                    {section.returns.name}
                                </code>
                            )}

                            <span>
                                {section.returns.type}
                            </span>

                            <p>
                                {section.returns.description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Example */}
                {section.example && (
                    <div className="doc-example">
                        <div className="doc-example-header">
                            <span>
                                {section.example.language.toUpperCase()}
                            </span>

                            <span>Example</span>
                        </div>

                        <pre>
                            <code>
                                {section.example.code}
                            </code>
                        </pre>

                        {/* Output */}
                        {section.example.output && (
                            <div className="doc-output">
                                <div className="doc-output-label">
                                    OUTPUT
                                </div>

                                <pre>
                                    <code>
                                        {section.example.output}
                                    </code>
                                </pre>
                            </div>
                        )}

                        {/* Explanation */}
                        {section.example.explanation && (
                            <p className="doc-example-explanation">
                                {
                                    section.example
                                        .explanation
                                }
                            </p>
                        )}
                    </div>
                )}

                {/* Notes */}
                {section.notes &&
                    section.notes.length > 0 && (
                        <div className="doc-callout doc-note">
                            <div className="doc-callout-label">
                                NOTE
                            </div>

                            <ul>
                                {section.notes.map(
                                    (note, index) => (
                                        <li key={index}>
                                            {note}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                {/* Warnings */}
                {section.warnings &&
                    section.warnings.length > 0 && (
                        <div className="doc-callout doc-warning">
                            <div className="doc-callout-label">
                                WARNING
                            </div>

                            <ul>
                                {section.warnings.map(
                                    (warning, index) => (
                                        <li key={index}>
                                            {warning}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                {/* Complexity */}
                {section.complexity && (
                    <div className="doc-complexity">
                        <h3>Complexity</h3>

                        <div className="doc-complexity-grid">
                            {section.complexity.time && (
                                <div>
                                    <span>TIME</span>
                                    <code>
                                        {
                                            section
                                                .complexity
                                                .time
                                        }
                                    </code>
                                </div>
                            )}

                            {section.complexity.space && (
                                <div>
                                    <span>SPACE</span>
                                    <code>
                                        {
                                            section
                                                .complexity
                                                .space
                                        }
                                    </code>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}