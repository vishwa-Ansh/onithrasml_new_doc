import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";

const modules = [
    {
        number: "01",
        title: "Numerical Computing",
        text: "Reliable numerical methods and computational tools for scientific and engineering workloads."
    },
    {
        number: "02",
        title: "Linear Algebra",
        text: "Vectors, matrices, decompositions, solvers and the mathematical foundations behind modern computing."
    },
    {
        number: "03",
        title: "Scientific Computing",
        text: "Practical computational infrastructure designed for experimentation, research and real-world problems."
    },
    {
        number: "04",
        title: "Machine Learning",
        text: "Building toward accessible and powerful machine learning capabilities on top of a strong computational foundation."
    }
];

const principles = [
    {
        number: "01",
        title: "Clarity",
        text: "Complex computational concepts should be understandable, structured and practical."
    },
    {
        number: "02",
        title: "Performance",
        text: "Computational tools should be designed with efficiency, scalability and reliability in mind."
    },
    {
        number: "03",
        title: "Open Source",
        text: "Knowledge and software become stronger when developers can inspect, improve and contribute to them."
    },
    {
        number: "04",
        title: "Community",
        text: "OnithrasML is built to grow through developers, researchers and contributors working together."
    }
];

export function AboutPage() {
    const [contributors, setContributors] = useState([]);
    const [loadingContributors, setLoadingContributors] = useState(true);

    useEffect(() => {
        const loadContributors = async () => {
            try {
                const response = await fetch("/api/contributors");

                if (!response.ok) {
                    throw new Error("Failed to load contributors");
                }

                const data = await response.json();

                setContributors(
                    Array.isArray(data)
                        ? data
                        : Array.isArray(data.contributors)
                            ? data.contributors
                            : []
                );
            } catch {
                setContributors([]);
            } finally {
                setLoadingContributors(false);
            }
        };

        loadContributors();
    }, []);

    return (
        <main className="premium-about">
            <section className="premium-about-hero">
                <div className="premium-about-container">
                    <div className="premium-about-eyebrow">
                        ONITHRASML · ABOUT
                    </div>

                    <h1>
                        Building the
                        <span> computational future.</span>
                    </h1>

                    <p className="premium-about-hero-text">
                        OnithrasML is an open-source computational platform focused
                        on numerical computing, linear algebra, scientific computing
                        and machine learning.
                    </p>

                    <div className="premium-about-hero-actions">
                        <a
                            href="https://github.com/vishwa-Ansh/onithrasml_new_doc"
                            target="_blank"
                            rel="noreferrer"
                            className="premium-about-button premium-about-button-dark"
                        >
                            GitHub
                        </a>

                        <Link
                            to="/docs"
                            className="premium-about-button premium-about-button-light"
                        >
                            Explore Documentation
                        </Link>
                    </div>
                </div>
            </section>

            <section className="premium-about-creator">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        THE CREATOR
                    </div>

                    <div className="premium-about-creator-grid">
                        <div className="premium-about-profile">
                            <div className="premium-about-profile-image">
                                <img
                                    src="/images/profile.jpg"
                                    alt="Vishwa Ansh"
                                />
                            </div>
                        </div>

                        <div className="premium-about-creator-content">
                            <div className="premium-about-small-label">
                                FOUNDER · DEVELOPER
                            </div>

                            <h2>
                                Vishwa <em>Ansh</em>
                            </h2>

                            <p>
                                I am building OnithrasML as an open-source
                                computational platform for developers, students,
                                researchers and anyone interested in scientific
                                computing and machine learning.
                            </p>

                            <p>
                                The goal is to create a clean, powerful and
                                accessible ecosystem where mathematical concepts
                                can become practical computational tools.
                            </p>

                            <div className="premium-about-profile-links">
                                <a
                                    href="https://github.com/vishwa-Ansh"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub ↗
                                </a>

                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="premium-about-team">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        OUR TEAM
                    </div>

                    <div className="premium-about-team-heading">
                        <div>
                            <h2>
                                Built by
                                <em> contributors.</em>
                            </h2>
                        </div>

                        <p>
                            OnithrasML grows with every developer who contributes
                            code, documentation, ideas and improvements.
                        </p>
                    </div>

                    <div className="premium-about-team-grid">
                        <article className="premium-about-team-card premium-about-team-card-founder">
                            <div className="premium-about-team-image">
                                <img
                                    src="/images/profile.jpg"
                                    alt="Vishwa Ansh"
                                />
                            </div>

                            <div className="premium-about-team-info">
                                <div className="premium-about-team-role">
                                    CREATOR
                                </div>

                                <h3>Vishwa Ansh</h3>

                                <p>
                                    Creator and developer of OnithrasML.
                                </p>

                                <a
                                    href="https://github.com/vishwa-Ansh"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub ↗
                                </a>
                            </div>
                        </article>

                        {contributors.map((contributor) => (
                            <article
                                className="premium-about-team-card"
                                key={contributor.id || contributor.username}
                            >
                                <div className="premium-about-team-image">
                                    <img
                                        src={
                                            contributor.image ||
                                            contributor.profileImage ||
                                            "/images/default-profile.png"
                                        }
                                        alt={contributor.name}
                                    />
                                </div>

                                <div className="premium-about-team-info">
                                    <div className="premium-about-team-role">
                                        {contributor.role || "CONTRIBUTOR"}
                                    </div>

                                    <h3>{contributor.name}</h3>

                                    <p>
                                        {contributor.bio ||
                                            "Contributor to the OnithrasML project."}
                                    </p>

                                    <div className="premium-about-team-links">
                                        {contributor.github && (
                                            <a
                                                href={contributor.github}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                GitHub ↗
                                            </a>
                                        )}

                                        {contributor.linkedin && (
                                            <a
                                                href={contributor.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                LinkedIn ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {!loadingContributors && contributors.length === 0 && (
                        <div className="premium-about-empty-team">
                            <span>+</span>
                            <h3>Be part of OnithrasML</h3>
                            <p>
                                Your profile can appear here after your
                                contribution is approved.
                            </p>

                            <Link to="/contribute">
                                Become a Contributor →
                            </Link>
                        </div>
                    )}

                    {loadingContributors && (
                        <div className="premium-about-team-loading">
                            Loading contributors...
                        </div>
                    )}
                </div>
            </section>

            <section className="premium-about-library">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        THE LIBRARY
                    </div>

                    <div className="premium-about-library-heading">
                        <h2>
                            One ecosystem.
                            <br />
                            <em>Multiple disciplines.</em>
                        </h2>

                        <p>
                            OnithrasML is being developed as a computational
                            foundation where different areas of mathematics,
                            science and machine learning can work together.
                        </p>
                    </div>

                    <div className="premium-about-modules">
                        {modules.map((module) => (
                            <div
                                className="premium-about-module"
                                key={module.number}
                            >
                                <span>{module.number}</span>

                                <div>
                                    <h3>{module.title}</h3>
                                    <p>{module.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="premium-about-statement">
                <div className="premium-about-container">
                    <p>
                        “The future of computational software should not be
                        limited by complexity. It should be shaped by people
                        who are willing to build it.”
                    </p>
                </div>
            </section>

            <section className="premium-about-principles">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        WHAT WE BELIEVE
                    </div>

                    <div className="premium-about-principles-grid">
                        {principles.map((principle) => (
                            <div
                                className="premium-about-principle"
                                key={principle.number}
                            >
                                <span>{principle.number}</span>

                                <h3>{principle.title}</h3>

                                <p>{principle.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="premium-about-stack">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        TECHNOLOGY
                    </div>

                    <div className="premium-about-stack-content">
                        <h2>
                            Built with
                            <em> modern tools.</em>
                        </h2>

                        <div className="premium-about-stack-list">
                            <span>Python</span>
                            <span>NumPy</span>
                            <span>SciPy</span>
                            <span>Machine Learning</span>
                            <span>React</span>
                            <span>TypeScript</span>
                            <span>Vite</span>
                            <span>Open Source</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="premium-about-journey">
                <div className="premium-about-container">
                    <div className="premium-about-section-label">
                        THE JOURNEY
                    </div>

                    <div className="premium-about-journey-grid">
                        <div>
                            <span>01</span>
                            <h3>Start</h3>
                            <p>
                                Building the first computational foundations
                                and documentation.
                            </p>
                        </div>

                        <div>
                            <span>02</span>
                            <h3>Expand</h3>
                            <p>
                                Growing numerical computing and linear algebra
                                capabilities.
                            </p>
                        </div>

                        <div>
                            <span>03</span>
                            <h3>Collaborate</h3>
                            <p>
                                Opening the ecosystem to developers and
                                contributors.
                            </p>
                        </div>

                        <div>
                            <span>04</span>
                            <h3>Build</h3>
                            <p>
                                Creating a complete computational ecosystem
                                together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="premium-about-open-source">
                <div className="premium-about-container">
                    <div className="premium-about-open-source-box">
                        <span>OPEN SOURCE</span>

                        <h2>
                            Build something
                            <em> meaningful.</em>
                        </h2>

                        <p>
                            If you want to contribute code, documentation,
                            research ideas or new computational capabilities,
                            there is a place for you in the project.
                        </p>

                        <div className="premium-about-open-source-actions">
                            <a
                                href="https://github.com/vishwa-Ansh/onithrasml_new_doc"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View GitHub →
                            </a>

                            <Link to="/contribute">
                                Contribute →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="premium-about-final">
                <div className="premium-about-container">
                    <div className="premium-about-final-label">
                        ONITHRASML
                    </div>

                    <h2>
                        Let's build the
                        <br />
                        <em>future of computing.</em>
                    </h2>

                    <Link to="/contribute">
                        Join the project →
                    </Link>
                </div>
            </section>
        </main>
    );
}