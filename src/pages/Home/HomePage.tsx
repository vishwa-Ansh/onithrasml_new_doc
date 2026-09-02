import { Link } from "react-router-dom";
import "./HomePage.css";

const modules = [
    {
        number: "01",
        name: "Numerical Computing",
        description:
            "Build a strong foundation for numerical computation with arrays, vectorized operations, numerical precision, memory-aware computation, and efficient data processing.",
        path: "/docs/v0.3/modules/numerical-computations",
        topics: [
            "Arrays",
            "Vectorization",
            "Precision",
            "Numerical Methods",
        ],
    },
    {
        number: "02",
        name: "Linear Algebra",
        description:
            "Work with vectors and matrices, solve linear systems, perform decompositions, compute eigenvalues, and build reliable numerical linear algebra workflows.",
        path: "/docs/v0.3/modules/linear-algebra",
        topics: [
            "Matrices",
            "Solvers",
            "Decompositions",
            "Eigenvalues",
        ],
    },
    {
        number: "03",
        name: "Statistics",
        description:
            "Perform statistical computation and data analysis using descriptive statistics, probability concepts, distributions, aggregation, and numerical statistical methods.",
        path: "/docs/v0.3/modules/statistics",
        topics: [
            "Statistics",
            "Probability",
            "Distributions",
            "Analysis",
        ],
    },
    {
        number: "04",
        name: "Integration",
        description:
            "Evaluate definite integrals numerically and explore quadrature-based techniques for problems where analytical solutions are difficult or unavailable.",
        path: "/docs/v0.3/modules/integration",
        topics: [
            "Quadrature",
            "Integrals",
            "Numerical Methods",
            "Approximation",
        ],
    },
    {
        number: "05",
        name: "Optimization",
        description:
            "Formulate and solve numerical optimization problems using efficient algorithms, objective functions, constraints, and iterative optimization techniques.",
        path: "/docs/v0.3/modules/optimization",
        topics: [
            "Minimize",
            "Constraints",
            "Algorithms",
            "Objectives",
        ],
    },
    {
        number: "06",
        name: "Scientific Tools",
        description:
            "Explore additional scientific-computing capabilities, utilities, numerical routines, and APIs as the OnithrasML ecosystem continues to grow.",
        path: "/docs/v0.3",
        topics: [
            "Scientific Computing",
            "Utilities",
            "API",
            "Reference",
        ],
    },
];

const principles = [
    {
        number: "01",
        title: "Clear mathematical foundations",
        description:
            "Every numerical API should be understandable from both a programming and mathematical perspective. Documentation explains what an operation does, why it is useful, and how it behaves numerically.",
    },
    {
        number: "02",
        title: "Practical Python APIs",
        description:
            "OnithrasML is designed around Python workflows so that numerical algorithms can be integrated naturally into scientific applications, experiments, and machine-learning projects.",
    },
    {
        number: "03",
        title: "Numerical reliability",
        description:
            "Numerical software must consider precision, stability, edge cases, input validation, and algorithmic behavior rather than treating mathematical operations as black boxes.",
    },
    {
        number: "04",
        title: "Documentation-first development",
        description:
            "The documentation is organized to take you from concepts and modules to classes, functions, parameters, return values, examples, and implementation details.",
    },
];

const learningPath = [
    {
        number: "01",
        title: "Start with the fundamentals",
        description:
            "Learn the numerical concepts and data structures that form the foundation of scientific computation.",
    },
    {
        number: "02",
        title: "Explore the modules",
        description:
            "Choose a specialized area such as numerical computing, linear algebra, statistics, integration, or optimization.",
    },
    {
        number: "03",
        title: "Understand the API",
        description:
            "Read function signatures, parameters, return values, numerical behavior, and practical usage examples.",
    },
    {
        number: "04",
        title: "Build with OnithrasML",
        description:
            "Apply the APIs to real Python projects, experiments, mathematical workflows, and scientific applications.",
    },
];

export function HomePage() {
    return (
        <main className="docs-home">

            {/* =========================================================
                HERO
            ========================================================= */}
<section className="home-hero">
    <div className="hero-content">
        <div className="hero-eyebrow">
            ONITHRASML · SCIENTIFIC COMPUTING
        </div>

        <h1>
            Scientific computing,
            <br />
            <span>built for Python.</span>
        </h1>

        <p className="hero-description">
            OnithrasML is a Python-focused scientific computing
            library for numerical computation, linear algebra,
            statistics, mathematical algorithms, and machine-learning
            workflows. Explore the concepts behind the APIs,
            understand how the algorithms behave, and use them
            directly in your projects.
        </p>

        <div className="hero-actions">
            <Link to="/docs/v0.3" className="primary-button">
                Read the User Guide
                <span>→</span>
            </Link>

            <Link
                to="/docs/v0.3/modules/numerical-computations"
                className="secondary-button"
            >
                Explore Modules
            </Link>
        </div>

        <div className="hero-meta">
            <span>
                <i className="status-dot" />
                Documentation
            </span>

            <strong>v0.3</strong>

            <span className="meta-divider" />

            <span>Python scientific computing</span>
        </div>
    </div>


    {/* =====================================================
        MATHEMATICAL VISUALIZATION
       ===================================================== */}

    <div className="hero-math-visual">

        <div className="math-visual-label">
            <span className="math-live-dot" />
            NUMERICAL FIELD
        </div>


        <svg
            className="math-scene"
            viewBox="0 0 700 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >

            {/* =========================================
                BACKGROUND GRID
               ========================================= */}

            <g className="math-grid">

                {Array.from({ length: 11 }).map((_, i) => (
                    <line
                        key={`h-${i}`}
                        x1="90"
                        y1={100 + i * 32}
                        x2="630"
                        y2={100 + i * 32}
                    />
                ))}

                {Array.from({ length: 18 }).map((_, i) => (
                    <line
                        key={`v-${i}`}
                        x1={90 + i * 32}
                        y1="100"
                        x2={90 + i * 32}
                        y2="420"
                    />
                ))}

            </g>


            {/* =========================================
                3D FLOOR PLANES
               ========================================= */}

            <path
                className="math-plane"
                d="M90 420L360 505L630 420L360 335L90 420Z"
            />

            <path
                className="math-plane-line"
                d="M90 420L360 505L630 420"
            />

            <path
                className="math-plane-line"
                d="M90 420L360 335L630 420"
            />


            {/* =========================================
                X AXIS
               ========================================= */}

            <line
                className="math-axis"
                x1="360"
                y1="335"
                x2="625"
                y2="420"
            />

            <path
                className="math-axis-arrow"
                d="M625 420L608 408M625 420L604 421"
            />

            <text
                className="math-axis-label"
                x="636"
                y="426"
            >
                x
            </text>


            {/* =========================================
                Y AXIS
               ========================================= */}

            <line
                className="math-axis"
                x1="360"
                y1="335"
                x2="95"
                y2="420"
            />

            <path
                className="math-axis-arrow"
                d="M95 420L112 408M95 420L116 421"
            />

            <text
                className="math-axis-label"
                x="76"
                y="426"
            >
                y
            </text>


            {/* =========================================
                Z AXIS
               ========================================= */}

            <line
                className="math-axis"
                x1="360"
                y1="335"
                x2="360"
                y2="65"
            />

            <path
                className="math-axis-arrow"
                d="M360 65L349 83M360 65L371 83"
            />

            <text
                className="math-axis-label"
                x="373"
                y="70"
            >
                z
            </text>


            {/* =========================================
                MATHEMATICAL SURFACE
               ========================================= */}

            <path
                className="surface surface-back"
                d="
                    M105 300
                    C150 245 195 250 235 290
                    C275 330 315 325 350 270
                    C390 210 425 210 465 255
                    C510 305 555 310 620 255
                "
            />

            <path
                className="surface surface-main"
                d="
                    M95 320
                    C145 255 185 265 225 305
                    C270 350 315 345 355 280
                    C395 215 430 225 470 275
                    C515 330 560 330 625 270
                "
            />

            <path
                className="surface surface-front"
                d="
                    M95 345
                    C145 280 185 290 225 330
                    C270 375 315 370 355 305
                    C395 240 430 250 470 300
                    C515 355 560 355 625 295
                "
            />


            {/* =========================================
                SURFACE WIREFRAME
               ========================================= */}

            <path
                className="surface-wire"
                d="M105 300C150 350 190 350 235 290"
            />

            <path
                className="surface-wire"
                d="M155 275C200 325 245 330 285 275"
            />

            <path
                className="surface-wire"
                d="M210 270C250 315 300 320 340 255"
            />

            <path
                className="surface-wire"
                d="M275 275C315 315 355 315 395 245"
            />

            <path
                className="surface-wire"
                d="M340 265C380 310 420 310 455 255"
            />

            <path
                className="surface-wire"
                d="M405 245C445 295 490 310 525 275"
            />

            <path
                className="surface-wire"
                d="M470 255C515 300 560 315 610 270"
            />


            {/* =========================================
                VECTOR
               ========================================= */}

            <line
                className="math-vector"
                x1="360"
                y1="335"
                x2="505"
                y2="245"
            />

            <path
                className="math-vector-arrow"
                d="M505 245L484 249M505 245L497 263"
            />

            <circle
                className="math-origin"
                cx="360"
                cy="335"
                r="7"
            />

            <circle
                className="math-vector-point"
                cx="505"
                cy="245"
                r="7"
            />


            {/* =========================================
                FLOATING DATA POINTS
               ========================================= */}

            <circle
                className="math-particle particle-1"
                cx="190"
                cy="240"
                r="4"
            />

            <circle
                className="math-particle particle-2"
                cx="535"
                cy="180"
                r="4"
            />

            <circle
                className="math-particle particle-3"
                cx="590"
                cy="350"
                r="4"
            />

            <circle
                className="math-particle particle-4"
                cx="250"
                cy="160"
                r="3"
            />


            {/* =========================================
                FORMULA
               ========================================= */}

            <text
                className="math-formula"
                x="115"
                y="135"
            >
                f(x, y)
            </text>

            <text
                className="math-formula-small"
                x="115"
                y="160"
            >
                ∂f / ∂x → ∇f
            </text>

        </svg>


        {/* =============================================
            FLOATING INFO CARD
           ============================================= */}

        <div className="math-info-card">

            <div className="math-info-top">
                <span>VECTOR FIELD</span>
                <span className="math-status">LIVE</span>
            </div>

            <div className="math-info-value">
                ∇f(x, y)
            </div>

            <div className="math-info-description">
                Numerical gradient
            </div>

        </div>


        {/* =============================================
            MATRIX CARD
           ============================================= */}

        <div className="math-matrix-card">

            <span className="matrix-label">
                MATRIX A
            </span>

            <div className="matrix">
                <span>4</span>
                <span>2</span>
                <span>1</span>
                <span>3</span>
            </div>

        </div>

    </div>
</section>


            {/* =========================================================
                INTRODUCTION
            ========================================================= */}

            <section className="intro-section">

                <div className="section-label">
                    01 · ABOUT ONITHRASML
                </div>

                <div className="intro-grid">

                    <div className="intro-heading">

                        <h2>
                            Numerical tools for
                            <br />
                            <span>real computational work.</span>
                        </h2>

                    </div>

                    <div className="intro-content">

                        <p>
                            Scientific computing sits at the foundation of
                            modern engineering, machine learning, data science,
                            simulation, optimization, and mathematical research.
                        </p>

                        <p>
                            OnithrasML brings these computational building blocks
                            together through a Python-oriented API. Instead of
                            treating numerical algorithms as isolated functions,
                            the documentation is structured around the concepts,
                            mathematics, APIs, and practical workflows that make
                            scientific software easier to understand and use.
                        </p>

                        <p>
                            Whether you are learning numerical methods,
                            implementing a mathematical model, experimenting
                            with machine learning, or building a larger
                            scientific application, the documentation provides
                            a path from the underlying concept to executable
                            Python code.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================================================
                MODULES
            ========================================================= */}

            <section className="modules-section">

                <div className="section-intro">

                    <div>

                        <span className="section-eyebrow">
                            02 · USER GUIDE
                        </span>

                        <h2>
                            Explore OnithrasML
                        </h2>

                    </div>

                    <p>
                        Start with the fundamentals and progressively move into
                        specialized numerical and scientific-computing modules.
                        Each module is organized around concepts, APIs, examples,
                        and practical usage.
                    </p>

                </div>


                <div className="module-grid">

                    {modules.map((module) => (

                        <Link
                            key={module.number}
                            to={module.path}
                            className="module-card"
                        >

                            <div className="module-number">
                                {module.number}
                            </div>

                            <div className="module-card-content">

                                <div className="module-card-heading">

                                    <h3>
                                        {module.name}
                                    </h3>

                                    <span className="module-arrow">
                                        ↗
                                    </span>

                                </div>

                                <p>
                                    {module.description}
                                </p>

                                <div className="module-topics">

                                    {module.topics.map((topic) => (

                                        <span key={topic}>
                                            {topic}
                                        </span>

                                    ))}

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>


            {/* =========================================================
                WHY ONITHRASML
            ========================================================= */}

            <section className="principles-section">

                <div className="section-label">
                    03 · DESIGN PRINCIPLES
                </div>

                <div className="principles-header">

                    <h2>
                        Built around
                        <br />
                        <span>understandable computation.</span>
                    </h2>

                    <p>
                        Scientific software is most useful when its behavior is
                        predictable, its APIs are understandable, and its
                        numerical foundations are clearly documented.
                    </p>

                </div>


                <div className="principles-grid">

                    {principles.map((principle) => (

                        <article
                            key={principle.number}
                            className="principle-card"
                        >

                            <span className="principle-number">
                                {principle.number}
                            </span>

                            <h3>
                                {principle.title}
                            </h3>

                            <p>
                                {principle.description}
                            </p>

                        </article>

                    ))}

                </div>

            </section>


            {/* =========================================================
                WORKFLOW
            ========================================================= */}

            <section className="workflow-section">

                <div className="workflow-copy">

                    <span className="section-eyebrow">
                        04 · DOCUMENTATION WORKFLOW
                    </span>

                    <h2>
                        From concept
                        <br />
                        to implementation.
                    </h2>

                    <p>
                        The documentation is designed to follow the way
                        developers actually learn scientific software:
                        understand the problem, explore the available API,
                        and then implement the solution in a real Python
                        workflow.
                    </p>

                    <Link
                        to="/docs/v0.3"
                        className="text-link"
                    >
                        Browse the complete guide
                        <span>→</span>
                    </Link>

                </div>


                <div className="workflow-steps">

                    {learningPath.map((step, index) => (

                        <div
                            key={step.number}
                            className="workflow-step-wrapper"
                        >

                            <div className="workflow-step">

                                <span className="step-number">
                                    {step.number}
                                </span>

                                <div>

                                    <strong>
                                        {step.title}
                                    </strong>

                                    <p>
                                        {step.description}
                                    </p>

                                </div>

                            </div>

                            {index < learningPath.length - 1 && (
                                <div className="workflow-line" />
                            )}

                        </div>

                    ))}

                </div>

            </section>


            {/* =========================================================
                API EXPERIENCE
            ========================================================= */}

            <section className="api-section">

                <div className="api-header">

                    <span className="section-eyebrow">
                        05 · API REFERENCE
                    </span>

                    <h2>
                        Learn the API,
                        <br />
                        not just the function name.
                    </h2>

                    <p>
                        Every API should answer more than one question. What
                        does the function do? What inputs does it accept?
                        What does it return? What happens at the numerical
                        boundaries? And when should you use it instead of
                        another method?
                    </p>

                </div>


                <div className="api-feature-grid">

                    <div className="api-feature">
                        <span className="api-feature-index">A</span>

                        <h3>Signature</h3>

                        <p>
                            Understand the function signature, required
                            arguments, optional parameters, defaults, and
                            expected input types.
                        </p>
                    </div>


                    <div className="api-feature">
                        <span className="api-feature-index">B</span>

                        <h3>Parameters</h3>

                        <p>
                            Learn what each parameter represents and how
                            changing it affects the numerical operation.
                        </p>
                    </div>


                    <div className="api-feature">
                        <span className="api-feature-index">C</span>

                        <h3>Returns</h3>

                        <p>
                            Understand the returned value, its structure,
                            numerical meaning, and how it can be used in
                            subsequent operations.
                        </p>
                    </div>


                    <div className="api-feature">
                        <span className="api-feature-index">D</span>

                        <h3>Examples</h3>

                        <p>
                            See practical Python examples that demonstrate
                            the API in a realistic numerical-computing
                            workflow.
                        </p>
                    </div>

                </div>

            </section>


            {/* =========================================================
                CODE PHILOSOPHY
            ========================================================= */}

            <section className="code-section">

                <div className="code-section-copy">

                    <span className="section-eyebrow">
                        06 · PYTHON WORKFLOW
                    </span>

                    <h2>
                        Simple code.
                        <br />
                        Serious computation.
                    </h2>

                    <p>
                        Scientific computing APIs should remain readable even
                        when the mathematics behind them is complex. OnithrasML
                        aims to make numerical operations composable inside
                        normal Python programs without hiding the underlying
                        computational model.
                    </p>

                    <Link
                        to="/docs/v0.3"
                        className="text-link"
                    >
                        View the documentation
                        <span>→</span>
                    </Link>

                </div>


                <div className="large-code-window">

                    <div className="large-code-header">

                        <div className="terminal-dots">
                            <span />
                            <span />
                            <span />
                        </div>

                        <span>
                            linear_system.py
                        </span>

                    </div>


                    <div className="large-code-body">

                        <div>
                            <span className="code-keyword">
                                import
                            </span>{" "}
                            <span className="code-module">
                                numpy
                            </span>{" "}
                            <span className="code-keyword">
                                as
                            </span>{" "}
                            <span className="code-module">
                                np
                            </span>
                        </div>

                        <div>
                            <span className="code-keyword">
                                from
                            </span>{" "}
                            <span className="code-module">
                                onithrasml
                            </span>{" "}
                            <span className="code-keyword">
                                import
                            </span>{" "}
                            <span className="code-function">
                                linalg
                            </span>
                        </div>

                        <div className="code-space" />

                        <div className="code-comment">
                            # Define a linear system Ax = b
                        </div>

                        <div>
                            A = np.array(
                            <span className="code-bracket">
                                [
                            </span>
                        </div>

                        <div className="code-indent">
                            [4.0, 2.0],
                        </div>

                        <div className="code-indent">
                            [1.0, 3.0]
                        </div>

                        <div>
                            <span className="code-bracket">
                                ]
                            </span>
                            )
                        </div>

                        <div>
                            b = np.array(
                            <span className="code-bracket">
                                [8.0, 7.0]
                            </span>
                            )
                        </div>

                        <div className="code-space" />

                        <div className="code-comment">
                            # Solve the system
                        </div>

                        <div>
                            x = linalg.
                            <span className="code-function">
                                solve
                            </span>
                            (A, b)
                        </div>

                        <div className="code-space" />

                        <div className="code-comment">
                            # Verify the solution
                        </div>

                        <div>
                            residual = A @ x - b
                        </div>

                        <div className="code-space" />

                        <div className="code-output">
                            <span>→</span>{" "}
                            residual ≈ [0.0, 0.0]
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                VERSION
            ========================================================= */}

            <section className="version-section">

                <div className="version-card">

                    <div className="version-main">

                        <span className="section-eyebrow">
                            CURRENT RELEASE
                        </span>

                        <h2>
                            OnithrasML
                            <span> v0.3</span>
                        </h2>

                        <p>
                            Explore the current documentation and API reference
                            for the latest documented version of OnithrasML.
                        </p>

                    </div>


                    <div className="version-actions">

                        <Link
                            to="/docs/v0.3"
                            className="primary-button"
                        >
                            Open v0.3 Documentation
                            <span>→</span>
                        </Link>

                        <span className="version-note">
                            Versioned documentation
                        </span>

                    </div>

                </div>

            </section>


            {/* =========================================================
                FINAL CTA
            ========================================================= */}

            <section className="home-cta">

                <div>

                    <span className="section-eyebrow">
                        07 · GET STARTED
                    </span>

                    <h2>
                        Ready to explore?
                    </h2>

                    <p>
                        Start with the user guide, choose a module, and move
                        from mathematical concepts to practical Python
                        implementations with OnithrasML.
                    </p>

                </div>


                <div className="cta-actions">

                    <Link
                        to="/docs/v0.3"
                        className="primary-button"
                    >
                        Open Documentation
                        <span>→</span>
                    </Link>

                    <Link
                        to="/docs/v0.3/modules/numerical-computations"
                        className="secondary-button"
                    >
                        Explore Numerical Computing
                    </Link>

                </div>

            </section>

        </main>
    );
}