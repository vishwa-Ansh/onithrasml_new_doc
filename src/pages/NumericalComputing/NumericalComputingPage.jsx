import { Link } from "react-router-dom";
import "./NumericalComputingPage.css";

const topics = [
    {
        number: "01",
        title: "Arrays",
        description:
            "Understand numerical arrays, dimensions, shapes, indexing, slicing, and common array operations.",
        path: "#arrays",
    },
    {
        number: "02",
        title: "Vectorization",
        description:
            "Replace unnecessary Python loops with efficient vectorized numerical operations.",
        path: "#vectorization",
    },
    {
        number: "03",
        title: "Numerical Precision",
        description:
            "Learn floating-point representation, precision, tolerances, and numerical error.",
        path: "#precision",
    },
    {
        number: "04",
        title: "Memory Usage",
        description:
            "Understand array memory layout, data types, copies, views, and efficient memory usage.",
        path: "#memory",
    },
];

const arrayOperations = [
    ["Creating arrays", "Build numerical arrays from Python sequences and generated values."],
    ["Shape & dimensions", "Inspect and reason about the structure of multidimensional arrays."],
    ["Indexing", "Access individual elements and regions of an array."],
    ["Slicing", "Select ranges and sub-arrays efficiently."],
    ["Reshaping", "Change array dimensions without changing the underlying data."],
    ["Element-wise operations", "Perform arithmetic operations across array elements."],
];

const vectorizationExamples = [
    {
        title: "Python loop",
        code: `result = []

for x in values:
    result.append(x * 2)`,
    },
    {
        title: "Vectorized operation",
        code: `result = values * 2`,
    },
];

function NumericalComputingPage() {
    return (
        <main className="numerical-page">

            {/* =====================================================
                BREADCRUMB
            ====================================================== */}

            <div className="numerical-breadcrumb">
                <Link to="/">OnithrasML</Link>
                <span>/</span>

                <Link to="/docs/v0.3">
                    User Guide
                </Link>

                <span>/</span>

                <span>Numerical Computing</span>
            </div>


            {/* =====================================================
                PAGE HEADER
            ====================================================== */}

            <header className="numerical-header">

                <div className="numerical-header-meta">
                    <span className="numerical-eyebrow">
                        MODULE 01
                    </span>

                    <span className="numerical-version">
                        v0.3
                    </span>
                </div>

                <h1>
                    Numerical Computing
                </h1>

                <p>
                    Numerical computing provides the foundation for scientific
                    computing and machine learning. This module covers arrays,
                    vectorization, numerical precision, memory usage, and
                    efficient mathematical computation.
                </p>

                <div className="numerical-tags">
                    <span>Arrays</span>
                    <span>Vectorization</span>
                    <span>Precision</span>
                    <span>Performance</span>
                </div>

            </header>


            {/* =====================================================
                CONTENT LAYOUT
            ====================================================== */}

            <div className="numerical-layout">

                {/* =================================================
                    SIDEBAR
                ================================================== */}

                <aside className="numerical-sidebar">

                    <div className="sidebar-title">
                        ON THIS PAGE
                    </div>

                    <a href="#overview">
                        Overview
                    </a>

                    <a href="#arrays">
                        Arrays
                    </a>

                    <a href="#vectorization">
                        Vectorization
                    </a>

                    <a href="#precision">
                        Numerical Precision
                    </a>

                    <a href="#memory">
                        Memory & Performance
                    </a>

                    <a href="#workflow">
                        Workflow
                    </a>

                    <a href="#api">
                        API Reference
                    </a>

                </aside>


                {/* =================================================
                    MAIN CONTENT
                ================================================== */}

                <div className="numerical-content">

                    {/* =================================================
                        OVERVIEW
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="overview"
                    >

                        <div className="numerical-section-heading">

                            <span>01</span>

                            <div>
                                <small>
                                    FOUNDATION
                                </small>

                                <h2>
                                    Overview
                                </h2>
                            </div>

                        </div>

                        <p>
                            Numerical computing is the foundation of
                            OnithrasML. Machine learning algorithms operate
                            on numerical data, and efficient numerical
                            operations are essential for building scalable
                            scientific applications.
                        </p>

                        <p>
                            OnithrasML uses array-oriented computation to
                            represent data and perform mathematical operations.
                            Understanding arrays, data types, vectorization,
                            precision, and memory behavior will help you write
                            faster and more reliable numerical code.
                        </p>


                        <div className="topic-grid">

                            {topics.map((topic) => (
                                <a
                                    href={topic.path}
                                    className="topic-card"
                                    key={topic.number}
                                >

                                    <span className="topic-number">
                                        {topic.number}
                                    </span>

                                    <h3>
                                        {topic.title}
                                    </h3>

                                    <p>
                                        {topic.description}
                                    </p>

                                    <span className="topic-arrow">
                                        →
                                    </span>

                                </a>
                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        ARRAYS
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="arrays"
                    >

                        <div className="numerical-section-heading">

                            <span>02</span>

                            <div>
                                <small>
                                    CORE CONCEPT
                                </small>

                                <h2>
                                    Arrays
                                </h2>
                            </div>

                        </div>

                        <p>
                            Arrays are the primary data structure used for
                            numerical computation. They provide an efficient
                            representation for vectors, matrices, and
                            multidimensional numerical data.
                        </p>

                        <p>
                            Before working with machine learning algorithms,
                            you should understand how arrays are created,
                            indexed, sliced, reshaped, and operated on.
                        </p>


                        <div className="array-operations">

                            {arrayOperations.map(
                                ([title, description], index) => (
                                    <div
                                        className="array-operation"
                                        key={title}
                                    >

                                        <span>
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <div>
                                            <h3>
                                                {title}
                                            </h3>

                                            <p>
                                                {description}
                                            </p>
                                        </div>

                                    </div>
                                )
                            )}

                        </div>


                        {/* CODE */}

                        <div className="numerical-code">

                            <div className="numerical-code-header">

                                <div className="code-file">

                                    <div className="code-dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <span>
                                        arrays.py
                                    </span>

                                </div>

                                <span>
                                    Python
                                </span>

                            </div>

                            <pre>
                                <code>{`import numpy as np

# Create a one-dimensional array
x = np.array([10, 20, 30, 40])

# Create a two-dimensional array
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
])

# Access an element
value = matrix[0, 1]

# Slice an array
row = matrix[0, :]

# Reshape
reshaped = x.reshape(2, 2)

print(matrix)
print(value)
print(row)
print(reshaped)`}</code>
                            </pre>

                        </div>

                    </section>


                    {/* =================================================
                        VECTORIZATION
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="vectorization"
                    >

                        <div className="numerical-section-heading">

                            <span>03</span>

                            <div>
                                <small>
                                    PERFORMANCE
                                </small>

                                <h2>
                                    Vectorization
                                </h2>
                            </div>

                        </div>

                        <p>
                            Vectorization means applying an operation to an
                            entire array instead of processing individual
                            elements through a Python loop.
                        </p>

                        <p>
                            Vectorized operations generally provide better
                            performance because the underlying numerical
                            implementation can operate on many values at once.
                        </p>


                        <div className="comparison-grid">

                            {vectorizationExamples.map((example) => (
                                <div
                                    className="comparison-card"
                                    key={example.title}
                                >

                                    <div className="comparison-header">
                                        {example.title}
                                    </div>

                                    <pre>
                                        <code>
                                            {example.code}
                                        </code>
                                    </pre>

                                </div>
                            ))}

                        </div>


                        <div className="info-note">

                            <span className="info-icon">
                                i
                            </span>

                            <p>
                                Vectorization should be preferred when an
                                operation can naturally be expressed as an
                                array operation. Python loops are still useful
                                when the computation contains logic that cannot
                                be efficiently vectorized.
                            </p>

                        </div>

                    </section>


                    {/* =================================================
                        PRECISION
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="precision"
                    >

                        <div className="numerical-section-heading">

                            <span>04</span>

                            <div>
                                <small>
                                    RELIABILITY
                                </small>

                                <h2>
                                    Numerical Precision
                                </h2>
                            </div>

                        </div>

                        <p>
                            Computers represent real numbers using finite
                            precision. As a result, numerical calculations can
                            introduce rounding errors that become important in
                            scientific and machine learning applications.
                        </p>


                        <div className="precision-grid">

                            <article>
                                <span>01</span>

                                <h3>
                                    Floating Point
                                </h3>

                                <p>
                                    Understand how floating-point numbers are
                                    represented and why some decimal values
                                    cannot be represented exactly.
                                </p>
                            </article>

                            <article>
                                <span>02</span>

                                <h3>
                                    Tolerance
                                </h3>

                                <p>
                                    Use numerical tolerances when comparing
                                    values that may differ because of rounding
                                    errors.
                                </p>
                            </article>

                            <article>
                                <span>03</span>

                                <h3>
                                    Stability
                                </h3>

                                <p>
                                    Prefer algorithms that limit error
                                    amplification during numerical computation.
                                </p>
                            </article>

                        </div>


                        <div className="numerical-code small-code">

                            <div className="numerical-code-header">

                                <div className="code-file">

                                    <div className="code-dots">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                    <span>
                                        precision.py
                                    </span>

                                </div>

                                <span>
                                    Python
                                </span>

                            </div>

                            <pre>
                                <code>{`import math

a = 0.1 + 0.2
b = 0.3

print(a == b)

# Compare using a tolerance
print(math.isclose(a, b))`}</code>
                            </pre>

                        </div>

                    </section>


                    {/* =================================================
                        MEMORY
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="memory"
                    >

                        <div className="numerical-section-heading">

                            <span>05</span>

                            <div>
                                <small>
                                    EFFICIENCY
                                </small>

                                <h2>
                                    Memory & Performance
                                </h2>
                            </div>

                        </div>

                        <p>
                            Numerical applications can process millions of
                            values. Understanding memory allocation and data
                            representation is therefore important for building
                            efficient applications.
                        </p>


                        <div className="memory-list">

                            <div>
                                <span>01</span>

                                <strong>
                                    Choose appropriate data types
                                </strong>

                                <p>
                                    Select numerical representations that
                                    provide sufficient precision without
                                    unnecessary memory consumption.
                                </p>
                            </div>

                            <div>
                                <span>02</span>

                                <strong>
                                    Avoid unnecessary copies
                                </strong>

                                <p>
                                    Repeatedly copying large arrays can
                                    significantly increase memory usage.
                                </p>
                            </div>

                            <div>
                                <span>03</span>

                                <strong>
                                    Prefer efficient operations
                                </strong>

                                <p>
                                    Use optimized numerical primitives whenever
                                    they provide the required behavior.
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        WORKFLOW
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="workflow"
                    >

                        <div className="numerical-section-heading">

                            <span>06</span>

                            <div>
                                <small>
                                    PRACTICAL WORKFLOW
                                </small>

                                <h2>
                                    Numerical Computing Workflow
                                </h2>
                            </div>

                        </div>


                        <div className="workflow-diagram">

                            <div>
                                <span>01</span>
                                <strong>Input</strong>
                                <small>Data</small>
                            </div>

                            <b>→</b>

                            <div>
                                <span>02</span>
                                <strong>Represent</strong>
                                <small>Arrays</small>
                            </div>

                            <b>→</b>

                            <div>
                                <span>03</span>
                                <strong>Compute</strong>
                                <small>Operations</small>
                            </div>

                            <b>→</b>

                            <div>
                                <span>04</span>
                                <strong>Validate</strong>
                                <small>Precision</small>
                            </div>

                            <b>→</b>

                            <div>
                                <span>05</span>
                                <strong>Optimize</strong>
                                <small>Performance</small>
                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        API
                    ================================================== */}

                    <section
                        className="numerical-section"
                        id="api"
                    >

                        <div className="numerical-section-heading">

                            <span>07</span>

                            <div>
                                <small>
                                    REFERENCE
                                </small>

                                <h2>
                                    API Reference
                                </h2>
                            </div>

                        </div>

                        <p>
                            Explore the numerical computing APIs available
                            throughout OnithrasML. Individual classes,
                            functions, parameters, and implementation details
                            can be documented on dedicated reference pages.
                        </p>


                        <div className="api-panel">

                            <div>
                                <code>
                                    onithrasml
                                </code>

                                <span>
                                    Core package
                                </span>
                            </div>

                            <Link to="/docs/v0.3">
                                Open API Reference →
                            </Link>

                        </div>

                    </section>


                    {/* =================================================
                        NEXT
                    ================================================== */}

                    <div className="next-module">

                        <div>
                            <span>
                                NEXT MODULE
                            </span>

                            <strong>
                                Linear Algebra
                            </strong>
                        </div>

                        <Link to="/docs/v0.3/modules/linear-algebra">
                            Continue →
                        </Link>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default NumericalComputingPage;