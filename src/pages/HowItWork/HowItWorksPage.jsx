import React from "react";
import "./HowItWorksPage.css";

const architecture = [
    {
        number: "01",
        layer: "USER LAYER",
        title: "Your Python code starts the workflow",
        description:
            "Everything begins with your Python application. You import the required OnithrasML component and provide the data, parameters or configuration required for the operation.",
        input: "Python code + data",
        process: "User defines the task",
        output: "Library request",
        side: "right"
    },
    {
        number: "02",
        layer: "PUBLIC API",
        title: "The public API receives your request",
        description:
            "The public API acts as the entry point into OnithrasML. It exposes the library functionality through predictable classes, functions and methods.",
        input: "API call",
        process: "Dispatch to component",
        output: "Validated operation",
        side: "left"
    },
    {
        number: "03",
        layer: "CORE",
        title: "Inputs and parameters are validated",
        description:
            "Before computation starts, the library checks the structure and compatibility of the supplied inputs and parameters required by the selected operation.",
        input: "Raw inputs",
        process: "Validation + preparation",
        output: "Usable inputs",
        side: "right"
    },
    {
        number: "04",
        layer: "NUMERICAL COMPUTING",
        title: "Numerical operations prepare the computation",
        description:
            "Numerical computing provides the foundation for working with numerical values, arrays, mathematical operations and statistical calculations.",
        input: "Numerical data",
        process: "Math + numerical operations",
        output: "Computed values",
        side: "left"
    },
    {
        number: "05",
        layer: "LINEAR ALGEBRA",
        title: "Vectors and matrices power the mathematics",
        description:
            "Many machine learning algorithms depend on linear algebra. OnithrasML uses vectors, matrices, matrix operations and numerical solvers as computational building blocks.",
        input: "Arrays / matrices",
        process: "Linear algebra operations",
        output: "Transformed mathematical state",
        side: "right"
    },
    {
        number: "06",
        layer: "DATA PROCESSING",
        title: "Data is transformed for the model",
        description:
            "Preprocessing prepares data before an algorithm consumes it. Transformations, scaling, encoding and imputation can be applied according to the workflow.",
        input: "Raw dataset",
        process: "Transform + preprocess",
        output: "Model-ready data",
        side: "left"
    },
    {
        number: "07",
        layer: "ALGORITHM",
        title: "The selected algorithm executes",
        description:
            "The prepared data enters the selected machine learning algorithm. The algorithm performs its mathematical procedure to learn patterns or generate results.",
        input: "Prepared features",
        process: "Algorithm execution",
        output: "Model / prediction",
        side: "right"
    },
    {
        number: "08",
        layer: "OPTIMIZATION",
        title: "Parameters are optimized when required",
        description:
            "Optimization methods iteratively adjust parameters to reduce an objective or loss function and improve the model's solution.",
        input: "Parameters + objective",
        process: "Optimization iterations",
        output: "Optimized parameters",
        side: "left"
    },
    {
        number: "09",
        layer: "METRICS",
        title: "The result is evaluated",
        description:
            "Metrics measure how the generated model or prediction performs. Evaluation turns raw model output into interpretable performance information.",
        input: "Predictions + targets",
        process: "Metric calculation",
        output: "Performance values",
        side: "right"
    },
    {
        number: "10",
        layer: "OUTPUT",
        title: "The result returns to your workflow",
        description:
            "The final result is returned to your Python application. You can inspect it, visualize it, compare it, save it or use it as the input to another stage.",
        input: "Computed result",
        process: "Return to application",
        output: "Actionable result",
        side: "left"
    }
];

const layers = [
    {
        number: "01",
        title: "Numerical Computing",
        description:
            "The mathematical foundation for numerical data and scientific computation.",
        items: ["Arrays", "Operations", "Statistics"]
    },
    {
        number: "02",
        title: "Linear Algebra",
        description:
            "The vector and matrix layer used by many machine learning computations.",
        items: ["Vectors", "Matrices", "Solvers"]
    },
    {
        number: "03",
        title: "Preprocessing",
        description:
            "Transforms raw data into a form suitable for algorithms and models.",
        items: ["Scaling", "Encoding", "Imputation"]
    },
    {
        number: "04",
        title: "Algorithms",
        description:
            "Machine learning algorithms consume prepared data and produce models or predictions.",
        items: ["Regression", "Classification", "Clustering"]
    },
    {
        number: "05",
        title: "Optimization",
        description:
            "Optimization methods improve model parameters using mathematical objectives.",
        items: ["Loss", "Gradients", "Iterations"]
    },
    {
        number: "06",
        title: "Metrics",
        description:
            "Evaluation methods quantify the quality and behavior of generated results.",
        items: ["Evaluation", "Comparison", "Performance"]
    }
];

const dataFlow = [
    {
        number: "01",
        title: "Input",
        value: "X, y",
        description: "Your data enters the workflow."
    },
    {
        number: "02",
        title: "Transform",
        value: "X′, y′",
        description: "Data is prepared for computation."
    },
    {
        number: "03",
        title: "Compute",
        value: "θ",
        description: "The algorithm learns or calculates."
    },
    {
        number: "04",
        title: "Predict",
        value: "ŷ",
        description: "The model generates an output."
    },
    {
        number: "05",
        title: "Evaluate",
        value: "score",
        description: "Metrics measure the result."
    }
];

const concepts = [
    {
        number: "01",
        title: "Composable",
        description:
            "Individual library components can be combined into larger scientific and machine learning workflows."
    },
    {
        number: "02",
        title: "Mathematical",
        description:
            "The architecture is built around numerical computation, linear algebra and optimization."
    },
    {
        number: "03",
        title: "Transparent",
        description:
            "The workflow keeps the relationship between input, computation and output easy to understand."
    },
    {
        number: "04",
        title: "Extensible",
        description:
            "The layered structure makes it possible to expand the library with additional algorithms and utilities."
    }
];

export default function HowItWorksPage() {
    return (
        <main className="oni-how-page">

            <section className="oni-how-hero">
                <div className="oni-how-grid"></div>

                <div className="oni-how-orb oni-how-orb-one"></div>
                <div className="oni-how-orb oni-how-orb-two"></div>

                <div className="oni-how-container">
                    <div className="oni-how-hero-content">
                        <span className="oni-how-eyebrow">
                            ONITHRASML ARCHITECTURE
                        </span>

                        <h1>
                            How OnithrasML
                            <span>actually works.</span>
                        </h1>

                        <p>
                            Understand the complete path from your Python code
                            to numerical computation, data processing,
                            machine learning algorithms, optimization,
                            evaluation and the final result.
                        </p>

                        <div className="oni-how-hero-meta">
                            <div>
                                <strong>10</strong>
                                <span>Architecture stages</span>
                            </div>

                            <div>
                                <strong>06</strong>
                                <span>Core layers</span>
                            </div>

                            <div>
                                <strong>01</strong>
                                <span>Connected workflow</span>
                            </div>
                        </div>
                    </div>

                    <div className="oni-how-architecture-preview">
                        <div className="oni-preview-top">
                            <span>ONITHRASML</span>
                            <span>ARCHITECTURE</span>
                        </div>

                        <div className="oni-preview-flow">
                            <div className="oni-preview-node active">
                                <span>01</span>
                                <div>
                                    <strong>Python</strong>
                                    <small>User Code</small>
                                </div>
                            </div>

                            <div className="oni-preview-line"></div>

                            <div className="oni-preview-node">
                                <span>02</span>
                                <div>
                                    <strong>API</strong>
                                    <small>Public Interface</small>
                                </div>
                            </div>

                            <div className="oni-preview-line"></div>

                            <div className="oni-preview-node">
                                <span>03</span>
                                <div>
                                    <strong>Core</strong>
                                    <small>Validation</small>
                                </div>
                            </div>

                            <div className="oni-preview-line"></div>

                            <div className="oni-preview-node">
                                <span>04</span>
                                <div>
                                    <strong>Compute</strong>
                                    <small>Numerical Layer</small>
                                </div>
                            </div>

                            <div className="oni-preview-line"></div>

                            <div className="oni-preview-node">
                                <span>05</span>
                                <div>
                                    <strong>ML</strong>
                                    <small>Algorithms</small>
                                </div>
                            </div>

                            <div className="oni-preview-line"></div>

                            <div className="oni-preview-node">
                                <span>06</span>
                                <div>
                                    <strong>Output</strong>
                                    <small>Final Result</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="oni-how-overview">
                <div className="oni-how-container">
                    <div className="oni-overview-layout">
                        <div>
                            <span className="oni-section-label">
                                THE BIG PICTURE
                            </span>

                            <h2>
                                One workflow.
                                <br />
                                Multiple layers.
                            </h2>
                        </div>

                        <div className="oni-overview-copy">
                            <p>
                                OnithrasML is not a single algorithm. It is a
                                connected computational stack where lower-level
                                numerical components support higher-level
                                machine learning operations.
                            </p>

                            <p>
                                A typical workflow moves through several
                                layers, with each layer responsible for a
                                specific part of the computation.
                            </p>
                        </div>
                    </div>

                    <div className="oni-stack">
                        <div className="oni-stack-user">
                            <span>YOUR CODE</span>
                            <strong>Python Application</strong>
                        </div>

                        <div className="oni-stack-arrow">↓</div>

                        <div className="oni-stack-api">
                            <span>PUBLIC INTERFACE</span>
                            <strong>OnithrasML API</strong>
                        </div>

                        <div className="oni-stack-arrow">↓</div>

                        <div className="oni-stack-grid">
                            <div>
                                <span>COMPUTE</span>
                                <strong>Numerical Computing</strong>
                            </div>

                            <div>
                                <span>MATHEMATICS</span>
                                <strong>Linear Algebra</strong>
                            </div>

                            <div>
                                <span>DATA</span>
                                <strong>Preprocessing</strong>
                            </div>

                            <div>
                                <span>MODEL</span>
                                <strong>Algorithms</strong>
                            </div>
                        </div>

                        <div className="oni-stack-arrow">↓</div>

                        <div className="oni-stack-bottom">
                            <div>
                                <span>OPTIMIZATION</span>
                                <strong>Parameter Learning</strong>
                            </div>

                            <div>
                                <span>EVALUATION</span>
                                <strong>Metrics</strong>
                            </div>

                            <div>
                                <span>OUTPUT</span>
                                <strong>Result</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="oni-architecture-section">
                <div className="oni-how-grid oni-section-grid"></div>

                <div className="oni-how-container">
                    <div className="oni-architecture-header">
                        <div>
                            <span className="oni-section-label">
                                COMPLETE WORKFLOW
                            </span>

                            <h2>
                                What happens
                                <br />
                                at every stage.
                            </h2>
                        </div>

                        <p>
                            Follow the data through the architecture and see
                            exactly what each layer receives, what it does and
                            what it produces.
                        </p>
                    </div>

                    <div className="oni-timeline">
                        {architecture.map((item) => (
                            <article
                                className={`oni-timeline-step oni-timeline-${item.side}`}
                                key={item.number}
                            >
                                <div className="oni-step-card">
                                    <span className="oni-step-layer">
                                        {item.layer}
                                    </span>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>

                                    <div className="oni-step-data">
                                        <div>
                                            <span>INPUT</span>
                                            <strong>{item.input}</strong>
                                        </div>

                                        <div>
                                            <span>PROCESS</span>
                                            <strong>{item.process}</strong>
                                        </div>

                                        <div>
                                            <span>OUTPUT</span>
                                            <strong>{item.output}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="oni-step-number">
                                    {item.number}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="oni-layers-section">
                <div className="oni-how-container">
                    <div className="oni-centered-heading">
                        <span className="oni-section-label">
                            CORE ARCHITECTURE
                        </span>

                        <h2>
                            The layers behind
                            <br />
                            the workflow.
                        </h2>

                        <p>
                            Each layer has a focused responsibility, but they
                            are designed to work together as one computational
                            system.
                        </p>
                    </div>

                    <div className="oni-layers-grid">
                        {layers.map((layer) => (
                            <article className="oni-layer-card" key={layer.number}>
                                <div className="oni-layer-top">
                                    <span>{layer.number}</span>
                                    <span>ONITHRASML</span>
                                </div>

                                <div className="oni-layer-icon">
                                    {layer.number}
                                </div>

                                <h3>{layer.title}</h3>

                                <p>{layer.description}</p>

                                <div className="oni-layer-items">
                                    {layer.items.map((item) => (
                                        <span key={item}>{item}</span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="oni-dataflow-section">
                <div className="oni-how-container">
                    <div className="oni-dataflow-box">
                        <div className="oni-dataflow-header">
                            <div>
                                <span className="oni-section-label">
                                    DATA FLOW
                                </span>

                                <h2>
                                    Follow one dataset
                                    <br />
                                    through the system.
                                </h2>
                            </div>

                            <p>
                                The same fundamental pattern appears across
                                many workflows: input, transformation,
                                computation, prediction and evaluation.
                            </p>
                        </div>

                        <div className="oni-dataflow">
                            {dataFlow.map((item, index) => (
                                <React.Fragment key={item.number}>
                                    <div className="oni-dataflow-item">
                                        <span>{item.number}</span>

                                        <small>{item.title}</small>

                                        <strong>{item.value}</strong>

                                        <p>{item.description}</p>
                                    </div>

                                    {index !== dataFlow.length - 1 && (
                                        <div className="oni-dataflow-arrow">
                                            →
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="oni-example-section">
                <div className="oni-how-container">
                    <div className="oni-example-layout">
                        <div className="oni-example-copy">
                            <span className="oni-section-label">
                                CONCRETE EXAMPLE
                            </span>

                            <h2>
                                A linear regression
                                <br />
                                workflow.
                            </h2>

                            <p>
                                A simple regression example demonstrates how
                                multiple layers cooperate. The model receives
                                data, performs mathematical computation,
                                learns parameters and produces predictions.
                            </p>

                            <div className="oni-example-points">
                                <div>
                                    <span>01</span>
                                    <p>
                                        Numerical arrays represent X and y.
                                    </p>
                                </div>

                                <div>
                                    <span>02</span>
                                    <p>
                                        Linear algebra supports the model
                                        computation.
                                    </p>
                                </div>

                                <div>
                                    <span>03</span>
                                    <p>
                                        Optimization can determine model
                                        parameters.
                                    </p>
                                </div>

                                <div>
                                    <span>04</span>
                                    <p>
                                        Metrics evaluate the predictions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="oni-code-window">
                            <div className="oni-code-top">
                                <div className="oni-code-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>

                                <span>linear_regression.py</span>

                                <span>PYTHON</span>
                            </div>

                            <pre>
                                <code>
{`import numpy as np

from onithrasML.linear_model import (
    LinearRegression
)

X = np.array([
    [1],
    [2],
    [3],
    [4]
])

y = np.array([
    2,
    4,
    6,
    8
])

model = LinearRegression()

model.fit(X, y)

prediction = model.predict(
    np.array([[5]])
)

print(prediction)`}
                                </code>
                            </pre>

                            <div className="oni-code-result">
                                <span>OUTPUT</span>
                                <strong>prediction → [10]</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="oni-concepts-section">
                <div className="oni-how-container">
                    <div className="oni-concepts-layout">
                        <div>
                            <span className="oni-section-label">
                                ARCHITECTURAL PRINCIPLES
                            </span>

                            <h2>
                                Designed as a
                                <br />
                                learning system.
                            </h2>

                            <p>
                                The architecture is intended to make
                                computational workflows understandable while
                                remaining useful for real experimentation and
                                development.
                            </p>
                        </div>

                        <div className="oni-concepts-list">
                            {concepts.map((concept) => (
                                <div
                                    className="oni-concept"
                                    key={concept.number}
                                >
                                    <span>{concept.number}</span>

                                    <div>
                                        <h3>{concept.title}</h3>
                                        <p>{concept.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="oni-final-section">
                <div className="oni-final-grid"></div>

                <div className="oni-how-container">
                    <div className="oni-final-content">
                        <span className="oni-section-label">
                            NOW YOU KNOW THE ARCHITECTURE
                        </span>

                        <h2>
                            Go from
                            <br />
                            understanding to building.
                        </h2>

                        <p>
                            Explore each layer in the documentation and see
                            how the individual components work internally.
                        </p>

                        <div className="oni-final-actions">
                            <a href="/docs" className="oni-primary-button">
                                Explore Documentation
                                <span>→</span>
                            </a>

                            <a
                                href="/contribute"
                                className="oni-secondary-button"
                            >
                                Contribute
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}