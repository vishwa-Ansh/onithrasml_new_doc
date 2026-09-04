import { useState } from "react";
import { Link } from "react-router-dom";
import "./ContributePage.css";

const contributionTypes = [
    {
        number: "01",
        title: "Report a bug",
        description:
            "Found incorrect behavior, unexpected output, or an edge case? Report it so it can be investigated and fixed.",
        icon: "!",
    },
    {
        number: "02",
        title: "Improve algorithms",
        description:
            "Contribute numerical methods, linear algebra routines, statistical algorithms, or improvements to existing implementations.",
        icon: "∑",
    },
    {
        number: "03",
        title: "Improve documentation",
        description:
            "Fix unclear explanations, add examples, improve mathematical descriptions, or correct documentation errors.",
        icon: "↗",
    },
    {
        number: "04",
        title: "Add tests",
        description:
            "Add unit tests, numerical validation, edge-case coverage, and regression tests for existing functionality.",
        icon: "✓",
    },
    {
        number: "05",
        title: "Suggest features",
        description:
            "Have an idea for a useful scientific-computing feature? Open a discussion or feature request and explain the use case.",
        icon: "+",
    },
    {
        number: "06",
        title: "Improve performance",
        description:
            "Help make algorithms faster, more memory-efficient, and better suited for real scientific workloads.",
        icon: "⚡",
    },
];

const workflow = [
    {
        number: "01",
        title: "Fork the repository",
        description:
            "Create your own fork of the OnithrasML repository on GitHub.",
    },
    {
        number: "02",
        title: "Create a branch",
        description:
            "Create a focused branch for the feature, fix, documentation change, or experiment.",
    },
    {
        number: "03",
        title: "Make your changes",
        description:
            "Keep changes focused and follow the existing project structure and coding conventions.",
    },
    {
        number: "04",
        title: "Test everything",
        description:
            "Run the relevant tests and verify that your changes do not introduce regressions.",
    },
    {
        number: "05",
        title: "Open a Pull Request",
        description:
            "Describe what changed, why it changed, and include relevant examples or test information.",
    },
];

const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    githubUsername: "",
    contributionType: "",
    contributionTitle: "",
    repository: "",
    contributionDate: "",
    technologies: "",
    description: "",
    linkedin: "",
    portfolio: "",
    additionalMessage: "",
};

export function ContributePage() {
    const [formData, setFormData] = useState(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://localhost:3000/api/contributions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to submit contribution."
                );
            }

            setMessage(
                `Contribution submitted successfully. Certificate ID: ${result.certificateId}`
            );

            if (result.downloadUrl) {
                window.open(result.downloadUrl, "_blank");
            }

            // setFormData(initialFormData);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="contribute-page">
            <section className="contribute-hero">
                <div className="contribute-hero-inner">
                    <div className="contribute-eyebrow">
                        <span />
                        ONITHRASML · OPEN SOURCE
                    </div>

                    <h1>
                        Build OnithrasML
                        <br />
                        <span>with the community.</span>
                    </h1>

                    <p className="contribute-hero-description">
                        OnithrasML is built to make scientific computing
                        accessible, understandable, and useful in Python.
                        Contributions help improve the algorithms,
                        documentation, performance, and developer experience.
                    </p>

                    <div className="contribute-actions">
                        <a
                            className="contribute-primary-button"
                            href="#contributor-form"
                        >
                            Become a contributor
                            <span>↓</span>
                        </a>

                        <a
                            className="contribute-secondary-button"
                            href="https://github.com/vishwa-Ansh/onithrasml_new_doc"
                            target="_blank"
                            rel="noreferrer"
                        >
                            View GitHub
                            <span>↗</span>
                        </a>
                    </div>

                    <div className="contribute-meta">
                        <span>OPEN SOURCE</span>
                        <i />
                        <span>PYTHON</span>
                        <i />
                        <span>SCIENTIFIC COMPUTING</span>
                    </div>
                </div>

                <div className="contribute-hero-visual" aria-hidden="true">
                    <div className="contribute-grid" />

                    <div className="contribute-orbit orbit-one" />
                    <div className="contribute-orbit orbit-two" />
                    <div className="contribute-orbit orbit-three" />

                    <div className="contribute-core">
                        <span>∑</span>
                    </div>

                    <div className="contribute-node node-one">
                        <span>f(x)</span>
                    </div>

                    <div className="contribute-node node-two">
                        <span>A⁻¹</span>
                    </div>

                    <div className="contribute-node node-three">
                        <span>∇</span>
                    </div>

                    <div className="contribute-coordinate">
                        x = 0.42
                        <br />
                        y = 0.81
                    </div>
                </div>
            </section>

            <section className="contribute-section contribute-intro">
                <div className="contribute-section-label">
                    <span>01</span>
                    WHY CONTRIBUTE
                </div>

                <div className="contribute-intro-grid">
                    <h2>
                        Every contribution
                        <br />
                        <span>moves the project forward.</span>
                    </h2>

                    <div>
                        <p>
                            Scientific software becomes stronger when
                            different people test it, question it, improve
                            it, and document how it works.
                        </p>

                        <p>
                            You do not need to implement a large algorithm to
                            contribute. A documentation fix, a test, a bug
                            report, or a useful example can make a real
                            difference.
                        </p>
                    </div>
                </div>
            </section>

            <section className="contribute-section">
                <div className="contribute-section-label">
                    <span>02</span>
                    WAYS TO CONTRIBUTE
                </div>

                <div className="contribution-grid">
                    {contributionTypes.map((item) => (
                        <article
                            className="contribution-card"
                            key={item.number}
                        >
                            <div className="contribution-card-top">
                                <span className="contribution-number">
                                    {item.number}
                                </span>

                                <span className="contribution-icon">
                                    {item.icon}
                                </span>
                            </div>

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                className="contribute-section contribute-workflow"
                id="workflow"
            >
                <div className="contribute-section-label">
                    <span>03</span>
                    CONTRIBUTION WORKFLOW
                </div>

                <div className="workflow-heading">
                    <h2>
                        From idea
                        <br />
                        <span>to Pull Request.</span>
                    </h2>

                    <p>
                        Keep contributions focused, tested, and easy to
                        review. A simple workflow helps maintain the quality
                        of the project as it grows.
                    </p>
                </div>

                <div className="contribution-workflow-list">
                    {workflow.map((item, index) => (
                        <div
                            className="contribution-workflow-item"
                            key={item.number}
                        >
                            <div className="workflow-item-number">
                                {item.number}
                            </div>

                            <div className="workflow-item-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>

                            {index < workflow.length - 1 && (
                                <div className="workflow-connector" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="contribute-section development-section">
                <div className="contribute-section-label">
                    <span>04</span>
                    DEVELOPMENT
                </div>

                <div className="development-grid">
                    <div className="development-copy">
                        <h2>
                            Set up your
                            <br />
                            <span>development environment.</span>
                        </h2>

                        <p>
                            Clone the project, create your development
                            environment, install the package in editable
                            mode, and start working on your contribution.
                        </p>

                        <Link
                            className="development-link"
                            to="/docs/v0.3/install"
                        >
                            Installation guide
                            <span>→</span>
                        </Link>
                    </div>

                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <span>terminal</span>
                        </div>

                        <div className="terminal-body">
                            <div>
                                <span className="terminal-muted">$</span>{" "}
                                <span className="terminal-command">
                                    git clone &lt;repository&gt;
                                </span>
                            </div>

                            <div>
                                <span className="terminal-muted">$</span>{" "}
                                <span className="terminal-command">
                                    cd onithrasml
                                </span>
                            </div>

                            <div className="terminal-space" />

                            <div>
                                <span className="terminal-muted">$</span>{" "}
                                <span className="terminal-command">
                                    python -m venv .venv
                                </span>
                            </div>

                            <div>
                                <span className="terminal-muted">$</span>{" "}
                                <span className="terminal-command">
                                    pip install -e .
                                </span>
                            </div>

                            <div className="terminal-space" />

                            <div className="terminal-success">
                                ✓ development environment ready
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contribute-section guidelines-section">
                <div className="contribute-section-label">
                    <span>05</span>
                    CONTRIBUTION GUIDELINES
                </div>

                <div className="guidelines-grid">
                    <div className="guideline">
                        <span>01</span>

                        <div>
                            <h3>Keep changes focused</h3>

                            <p>
                                One Pull Request should ideally solve one
                                problem or introduce one focused improvement.
                            </p>
                        </div>
                    </div>

                    <div className="guideline">
                        <span>02</span>

                        <div>
                            <h3>Write tests</h3>

                            <p>
                                Numerical code should be validated against
                                expected results, edge cases, and known
                                mathematical behavior.
                            </p>
                        </div>
                    </div>

                    <div className="guideline">
                        <span>03</span>

                        <div>
                            <h3>Document public APIs</h3>

                            <p>
                                New public functions, classes, and algorithms
                                should include clear documentation and useful
                                examples.
                            </p>
                        </div>
                    </div>

                    <div className="guideline">
                        <span>04</span>

                        <div>
                            <h3>Explain your PR</h3>

                            <p>
                                Explain the problem, your approach, and how
                                you verified the implementation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="contribute-section contributor-registration"
                id="contributor-form"
            >
                <div className="contribute-section-label">
                    <span>06</span>
                    CONTRIBUTOR REGISTRATION
                </div>

                <div className="contributor-registration-heading">
                    <div>
                        <h2>
                            Tell us about
                            <br />
                            <span>your contribution.</span>
                        </h2>
                    </div>

                    <p>
                        Submit your contribution details and receive your
                        OnithrasML contribution certificate.
                    </p>
                </div>

                <form
                    className="contributor-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-section">
                        <div className="form-section-heading">
                            <span>01</span>

                            <div>
                                <h3>Personal information</h3>

                                <p>
                                    Tell us how we can identify and contact
                                    you.
                                </p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-field form-field-full">
                                <label htmlFor="fullName">
                                    Full name *
                                </label>

                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="email">
                                    Email address *
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="phone">
                                    Phone number
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 XXXXX XXXXX"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="country">
                                    Country
                                </label>

                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="India"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="city">
                                    City
                                </label>

                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Lucknow"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-heading">
                            <span>02</span>

                            <div>
                                <h3>Contribution information</h3>

                                <p>
                                    Give us the details of your contribution.
                                </p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="contributionType">
                                    Contribution type *
                                </label>

                                <select
                                    id="contributionType"
                                    name="contributionType"
                                    value={formData.contributionType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select contribution type
                                    </option>

                                    <option value="Bug Report">
                                        Bug Report
                                    </option>

                                    <option value="Algorithm">
                                        Algorithm / Code
                                    </option>

                                    <option value="Documentation">
                                        Documentation
                                    </option>

                                    <option value="Testing">
                                        Testing
                                    </option>

                                    <option value="Feature">
                                        Feature / Idea
                                    </option>

                                    <option value="Performance">
                                        Performance Improvement
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="contributionDate">
                                    Contribution date *
                                </label>

                                <input
                                    id="contributionDate"
                                    name="contributionDate"
                                    type="date"
                                    value={formData.contributionDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="contributionTitle">
                                    Contribution title *
                                </label>

                                <input
                                    id="contributionTitle"
                                    name="contributionTitle"
                                    type="text"
                                    value={formData.contributionTitle}
                                    onChange={handleChange}
                                    placeholder="Example: Improved matrix multiplication performance"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="githubUsername">
                                    GitHub username *
                                </label>

                                <input
                                    id="githubUsername"
                                    name="githubUsername"
                                    type="text"
                                    value={formData.githubUsername}
                                    onChange={handleChange}
                                    placeholder="your-github-username"
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="repository">
                                    Repository / PR link
                                </label>

                                <input
                                    id="repository"
                                    name="repository"
                                    type="url"
                                    value={formData.repository}
                                    onChange={handleChange}
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="technologies">
                                    Technologies / tools used
                                </label>

                                <input
                                    id="technologies"
                                    name="technologies"
                                    type="text"
                                    value={formData.technologies}
                                    onChange={handleChange}
                                    placeholder="Python, NumPy, C++, pytest..."
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="description">
                                    Contribution description *
                                </label>

                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe what you contributed, what problem it solves, and how you tested it."
                                    rows={7}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-section-heading">
                            <span>03</span>

                            <div>
                                <h3>Additional information</h3>

                                <p>
                                    Add your professional links.
                                </p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="linkedin">
                                    LinkedIn
                                </label>

                                <input
                                    id="linkedin"
                                    name="linkedin"
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="portfolio">
                                    Portfolio / Website
                                </label>

                                <input
                                    id="portfolio"
                                    name="portfolio"
                                    type="url"
                                    value={formData.portfolio}
                                    onChange={handleChange}
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>

                            <div className="form-field form-field-full">
                                <label htmlFor="additionalMessage">
                                    Additional message
                                </label>

                                <textarea
                                    id="additionalMessage"
                                    name="additionalMessage"
                                    value={formData.additionalMessage}
                                    onChange={handleChange}
                                    placeholder="Anything else you would like us to know?"
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="contributor-submit-area">
                        <div className="contributor-submit-info">
                            <strong>
                                Your contribution certificate
                            </strong>

                            <p>
                                Submit your contribution and receive a
                                generated OnithrasML certificate.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="contributor-submit-button"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Generating..."
                                : "Submit contribution"}

                            <span>→</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-success-message">
                            <span>✓</span>
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="form-error-message">
                            <span>!</span>
                            {error}
                        </div>
                    )}
                </form>
            </section>

            <section className="contribute-final">
                <div>
                    <div className="contribute-section-label">
                        <span>07</span>
                        JOIN THE PROJECT
                    </div>

                    <h2>
                        Have something
                        <br />
                        <span>to improve?</span>
                    </h2>

                    <p>
                        Start with an issue, a documentation improvement, a
                        test, or your own idea.
                    </p>
                </div>

                <a
                    className="contribute-final-button"
                    href="https://github.com/vishwa-Ansh/onithrasml_new_doc"
                    target="_blank"
                    rel="noreferrer"
                >
                    Contribute on GitHub
                    <span>↗</span>
                </a>
            </section>
        </main>
    );
}