import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserGuidePage.css";

const modules = [
    {
        name: "impute",
        title: "Missing-value imputation",
        description:
            "Tools for detecting, handling, and replacing missing values in datasets.",
        path: "/docs/v0.3/impute",
    },
    {
        name: "preprocessing",
        title: "Data preprocessing",
        description:
            "Transform, scale, normalize, and prepare features before training machine learning models.",
        path: "/docs/v0.3/preprocessing",
    },
    {
        name: "linear_model",
        title: "Linear machine learning models",
        description:
            "Regression models and linear algorithms for supervised machine learning problems.",
        path: "/docs/v0.3/linear-model",
    },
    {
        name: "metrics",
        title: "Model evaluation",
        description:
            "Metrics and evaluation utilities for measuring machine learning model performance.",
        path: "/docs/v0.3/metrics",
    },
    {
        name: "math",
        title: "Mathematical utilities",
        description:
            "Numerical methods, matrix operations, norms, and mathematical utilities used by algorithms.",
        path: "/docs/v0.3/math",
    },
    {
        name: "algorithms",
        title: "Machine learning algorithms",
        description:
            "Core learning algorithms and reusable training procedures for machine learning workflows.",
        path: "/docs/v0.3/algorithms",
    },
    {
        name: "utils",
        title: "Utility functions",
        description:
            "Common validation helpers and reusable utilities shared across the library.",
        path: "/docs/v0.3/utils",
    },
];

const guides = [
    {
        number: "01",
        label: "FUNDAMENTALS",
        title: "Getting Started",
        description:
            "Install OnithrasML, understand the package structure, import components, and build your first workflow.",
        path: "/docs/v0.3/user-guide/getting-started",
    },
    {
        number: "02",
        label: "MATHEMATICS",
        title: "Mathematical Foundations",
        description:
            "Learn vectors, matrices, norms, gradients, numerical methods, and the mathematics behind machine learning algorithms.",
        path: "/docs/v0.3/user-guide/mathematical-foundations",
    },
    {
        number: "03",
        label: "NUMERICAL",
        title: "Numerical Computing",
        description:
            "Understand arrays, vectorization, numerical precision, memory usage, and efficient numerical computation.",
        path: "/docs/v0.3/user-guide/numerical-computing",
    },
    {
        number: "04",
        label: "DATA",
        title: "Preprocessing",
        description:
            "Learn how to clean, transform, scale, and prepare datasets before model training.",
        path: "/docs/v0.3/user-guide/preprocessing",
    },
    {
        number: "05",
        label: "MACHINE LEARNING",
        title: "Model Building",
        description:
            "Learn the complete workflow for fitting models, generating predictions, and evaluating results.",
        path: "/docs/v0.3/user-guide/model-building",
    },
    {
        number: "06",
        label: "PERFORMANCE",
        title: "Performance & Optimization",
        description:
            "Learn vectorization, memory-efficient operations, numerical stability, and algorithm optimization.",
        path: "/docs/v0.3/user-guide/performance",
    },
];

const performanceTopics = [
    {
        number: "01",
        title: "Vectorization",
        description:
            "Use NumPy-based operations instead of unnecessary Python-level loops to perform numerical calculations efficiently.",
    },
    {
        number: "02",
        title: "Memory Efficiency",
        description:
            "Reduce unnecessary array allocations and copies by using memory-conscious numerical operations where appropriate.",
    },
    {
        number: "03",
        title: "Numerical Stability",
        description:
            "Understand floating-point precision, tolerances, conditioning, and stable numerical algorithms.",
    },
    {
        number: "04",
        title: "Algorithmic Efficiency",
        description:
            "Analyze computational complexity and choose algorithms appropriate for the size of your dataset.",
    },
];

const code = `from onithrasml.impute import SimpleImputer
from onithrasml.preprocessing import StandardScaler
from onithrasml.linear_model import LinearRegression

# Create a small dataset.
# The third row contains a missing value.
X = [
    [1.0, 10.0],
    [2.0, 20.0],
    [3.0, None],
    [4.0, 40.0],
    [5.0, 50.0],
]

# Target values.
y = [10.0, 20.0, 30.0, 40.0, 50.0]

# Step 1: Handle missing values
imputer = SimpleImputer(strategy="mean")
X = imputer.fit_transform(X)

# Step 2: Scale the input features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Step 3: Create the model
model = LinearRegression()

# Step 4: Train the model
model.fit(X, y)

# Step 5: Generate predictions
predictions = model.predict(X)

# Step 6: Calculate mean squared error
errors = []

for actual, predicted in zip(y, predictions):
    error = actual - predicted
    errors.append(error ** 2)

mean_squared_error = sum(errors) / len(errors)

# Display the results
print("Predictions:")
print(predictions)

print("Mean Squared Error:")
print(mean_squared_error)`;

function UserGuidePage() {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1600);
        } catch {
            setCopied(false);
        }
    };

    return (
        <main className="user-guide-page">

            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            <header className="user-guide-header">

                <div className="user-guide-breadcrumb">
                    <Link to="/">OnithrasML</Link>

                    <span>/</span>

                    <span>User Guide</span>
                </div>

                <span className="user-guide-eyebrow">
                    ONITHRASML DOCUMENTATION
                </span>

                <h1>User Guide</h1>

                <p className="user-guide-header-description">
                    OnithrasML is a Python machine learning library designed
                    for numerical computing, data preprocessing, machine
                    learning algorithms, model evaluation, and efficient
                    scientific computation. It provides reusable classes,
                    functions, and utilities for building machine learning
                    workflows with a clean and modular API.
                </p>

                <div className="user-guide-tags">
                    <span>Python</span>
                    <span>Machine Learning</span>
                    <span>Numerical Computing</span>
                    <span>Open Source</span>
                </div>

            </header>


            {/* =====================================================
                01 — MODULES
            ====================================================== */}

            <section
                className="ug-section"
                id="modules"
            >
                <div className="ug-section-heading">

                    <span className="ug-section-number">
                        01
                    </span>

                    <div>
                        <span className="ug-section-eyebrow">
                            EXPLORE THE LIBRARY
                        </span>

                        <h2>
                            Modules and User Guides
                        </h2>
                    </div>

                </div>


                <div className="ug-section-intro">

                    <p>
                        OnithrasML is organized into focused modules
                        covering different areas of machine learning,
                        numerical computing, data preprocessing,
                        mathematical operations, and model evaluation.
                    </p>

                    <p>
                        Each module has its own documentation containing
                        an overview, available classes and functions,
                        usage examples, parameters, and implementation
                        details.
                    </p>

                </div>


                <div className="ug-module-table">

                    <div className="ug-table-head">
                        <span>Module</span>
                        <span>Description and User Guide</span>
                    </div>

                    {modules.map((module) => (
                        <div
                            className="ug-module-row"
                            key={module.name}
                        >

                            <div className="ug-module-name">
                                <Link to={module.path}>
                                    <code>
                                        {module.name}
                                    </code>
                                </Link>
                            </div>

                            <div className="ug-module-content">

                                <Link
                                    to={module.path}
                                    className="ug-module-title"
                                >
                                    {module.title}
                                </Link>

                                <p>
                                    {module.description}
                                </p>

                                <Link
                                    to={module.path}
                                    className="ug-explore-link"
                                >
                                    Explore
                                    <span>→</span>
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>

            </section>


            {/* =====================================================
                02 — ADDITIONAL GUIDES
            ====================================================== */}

            <section
                className="ug-section"
                id="guides"
            >

                <div className="ug-section-heading">

                    <span className="ug-section-number">
                        02
                    </span>

                    <div>
                        <span className="ug-section-eyebrow">
                            LEARN THE CONCEPTS
                        </span>

                        <h2>
                            Additional User Guides
                        </h2>
                    </div>

                </div>

                <div className="ug-section-intro">
                    <p>
                        These guides explain concepts and workflows that
                        apply across multiple OnithrasML modules.
                    </p>
                </div>


                <div className="ug-guide-grid">

                    {guides.map((guide) => (
                        <article
                            className="ug-guide-card"
                            key={guide.number}
                        >

                            <div className="ug-guide-number">
                                {guide.number}
                            </div>

                            <div className="ug-guide-content">

                                <span className="ug-guide-label">
                                    {guide.label}
                                </span>

                                <h3>
                                    {guide.title}
                                </h3>

                                <p>
                                    {guide.description}
                                </p>

                                <Link to={guide.path}>
                                    Read guide
                                    <span>→</span>
                                </Link>

                            </div>

                        </article>
                    ))}

                </div>

            </section>


            {/* =====================================================
                03 — IMPORTING
            ====================================================== */}

            <section
                className="ug-section"
                id="importing"
            >

                <div className="ug-section-heading">

                    <span className="ug-section-number">
                        03
                    </span>

                    <div>
                        <span className="ug-section-eyebrow">
                            FIRST WORKFLOW
                        </span>

                        <h2>
                            Importing from OnithrasML
                        </h2>
                    </div>

                </div>


                <div className="ug-section-intro">

                    <p>
                        OnithrasML uses a modular package structure.
                        You can import only the classes and functions
                        required for your workflow. The following example
                        demonstrates a complete workflow using
                        preprocessing and a linear regression model.
                    </p>

                </div>


                {/* Code editor */}

                <div className="ug-code-example">

                    <div className="ug-code-header">

                        <div className="ug-code-title">

                            <div className="ug-window-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <span>
                                basic_workflow.py
                            </span>

                        </div>


                        <div className="ug-code-actions">

                            <span className="ug-language">
                                Python
                            </span>

                            <button
                                type="button"
                                className={`ug-copy-button ${
                                    copied ? "copied" : ""
                                }`}
                                onClick={copyCode}
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <rect
                                        x="9"
                                        y="9"
                                        width="11"
                                        height="11"
                                        rx="2"
                                    />

                                    <path
                                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                    />
                                </svg>

                                <span>
                                    {copied ? "Copied!" : "Copy"}
                                </span>

                            </button>

                        </div>

                    </div>


                    <pre>
                        <code>{code}</code>
                    </pre>

                </div>


                {/* Workflow */}

                <div className="ug-workflow">

                    {[
                        ["01", "Imputation"],
                        ["02", "Scaling"],
                        ["03", "Training"],
                        ["04", "Prediction"],
                        ["05", "Evaluation"],
                    ].map(([number, label], index) => (
                        <div
                            className="ug-workflow-item"
                            key={number}
                        >

                            <div className="ug-workflow-step">

                                <span>
                                    {number}
                                </span>

                                <strong>
                                    {label}
                                </strong>

                            </div>

                            {index < 4 && (
                                <div className="ug-workflow-arrow">
                                    →
                                </div>
                            )}

                        </div>
                    ))}

                </div>


                <p className="ug-after-code">

                    This workflow demonstrates the typical structure of
                    an OnithrasML machine learning pipeline:

                    <strong>
                        imputation → scaling → model training →
                        prediction → evaluation.
                    </strong>

                    Each step can be used independently or combined with
                    other OnithrasML components to build larger workflows.

                </p>

            </section>


            {/* =====================================================
                04 — PERFORMANCE
            ====================================================== */}

            <section
                className="ug-section"
                id="performance"
            >

                <div className="ug-section-heading">

                    <span className="ug-section-number">
                        04
                    </span>

                    <div>
                        <span className="ug-section-eyebrow">
                            BUILD FASTER
                        </span>

                        <h2>
                            Performance and Optimization
                        </h2>
                    </div>

                </div>


                <div className="ug-section-intro">

                    <p>
                        Efficient numerical code is important when working
                        with large datasets and computationally intensive
                        machine learning algorithms. OnithrasML focuses on
                        vectorized operations, efficient memory usage,
                        numerical stability, and algorithmic efficiency.
                    </p>

                </div>


                <div className="ug-performance-grid">

                    {performanceTopics.map((item) => (
                        <article
                            className="ug-performance-card"
                            key={item.number}
                        >

                            <span className="ug-performance-number">
                                {item.number}
                            </span>

                            <h3>
                                {item.title}
                            </h3>

                            <p>
                                {item.description}
                            </p>

                            <Link to="/docs/v0.3/user-guide/performance">
                                Learn more →
                            </Link>

                        </article>
                    ))}

                </div>

            </section>


            {/* =====================================================
                DEVELOPER RESOURCES
            ====================================================== */}

            <section
                className="ug-developer-panel"
                id="developer-resources"
            >

                <div className="ug-developer-content">

                    <span className="ug-section-eyebrow">
                        FOR DEVELOPERS
                    </span>

                    <h2>
                        Build with OnithrasML
                    </h2>

                    <p>
                        Explore the API, internal architecture, and
                        contribution resources to understand how OnithrasML
                        works and how you can extend the library.
                    </p>

                </div>


                <div className="ug-developer-links">

                    <Link
                        to="/docs/v0.3/api-reference"
                        className="ug-developer-link"
                    >
                        <div>
                            <span>API</span>
                            <strong>API Reference</strong>
                        </div>

                        <span>→</span>
                    </Link>


                    <Link
                        to="/docs/v0.3/developer-guide"
                        className="ug-developer-link"
                    >
                        <div>
                            <span>DEVELOPMENT</span>
                            <strong>Developer Guide</strong>
                        </div>

                        <span>→</span>
                    </Link>


                    <Link
                        to="/docs/v0.3/contributing"
                        className="ug-developer-link"
                    >
                        <div>
                            <span>COMMUNITY</span>
                            <strong>Contributing</strong>
                        </div>

                        <span>→</span>
                    </Link>

                </div>

            </section>


            {/* =====================================================
                ON THIS PAGE
            ====================================================== */}

            <nav
                className="ug-documentation-nav"
                aria-label="Documentation navigation"
            >

                <span>
                    On this page
                </span>

                <a href="#modules">
                    Modules
                </a>

                <a href="#guides">
                    User Guides
                </a>

                <a href="#importing">
                    Importing
                </a>

                <a href="#performance">
                    Performance
                </a>

                <a href="#developer-resources">
                    Developer Resources
                </a>

            </nav>

        </main>
    );
}

export default UserGuidePage;