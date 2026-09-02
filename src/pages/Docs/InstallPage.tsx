import { DocsLayout } from "../../components/layout/DocsLayout";
import "./InstallPage.css";

const tocItems = [
    "Requirements",
    "Install OnithrasML",
    "Virtual Environment",
    "Verify Installation",
    "Upgrade",
    "Development Installation",
    "Troubleshooting",
];

interface CodeBlockProps {
    label: string;
    code: string;
    primary?: boolean;
}

function CodeBlock({
    label,
    code,
    primary = false,
}: CodeBlockProps) {
    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            // Clipboard may be unavailable in some browsers.
        }
    };

    return (
        <div
            className={`install-terminal ${
                primary ? "primary" : ""
            }`}
        >
            <div className="install-terminal-bar">
                <div className="install-terminal-left">
                    <div
                        className="install-terminal-dots"
                        aria-hidden="true"
                    >
                        <span />
                        <span />
                        <span />
                    </div>

                    <span className="install-terminal-label">
                        {label}
                    </span>
                </div>

                <button
                    type="button"
                    className="install-copy-button"
                    onClick={copyCode}
                >
                    Copy
                </button>
            </div>

            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}

export function InstallPage() {
    return (
        <DocsLayout
            title="Installation"
            tocItems={tocItems}
        >
            <article className="install-page">

                {/* =================================================
                    HERO
                ================================================= */}

                <header className="install-hero">
                    <div
                        className="install-hero-grid"
                        aria-hidden="true"
                    />

                    <div className="install-hero-content">
                        <div className="install-eyebrow">
                            <span className="install-eyebrow-dot" />
                            GETTING STARTED
                        </div>

                        <h1>
                            Install{" "}
                            <span>OnithrasML</span>
                        </h1>

                        <p>
                            Set up OnithrasML in your Python
                            environment and start building
                            numerical computing, linear algebra,
                            statistics, and machine learning
                            workflows.
                        </p>

                        <div className="install-hero-command">
                            <div className="install-command-label">
                                <span className="install-prompt">
                                    $
                                </span>

                                <code>
                                    python -m pip install
                                    onithrasML
                                </code>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigator.clipboard?.writeText(
                                        "python -m pip install onithrasML"
                                    )
                                }
                            >
                                Copy
                            </button>
                        </div>

                        <div className="install-hero-meta">
                            <span>
                                <i />
                                Python package
                            </span>

                            <span>
                                <i />
                                pip
                            </span>

                            <span>
                                <i />
                                Cross-platform
                            </span>
                        </div>
                    </div>
                </header>

                {/* =================================================
                    REQUIREMENTS
                ================================================= */}

                <section
                    id="requirements"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>01</span>

                        <div>
                            <h2>Requirements</h2>

                            <p>
                                Make sure your environment is ready
                                before installing OnithrasML.
                            </p>
                        </div>
                    </div>

                    <div className="install-requirements">

                        <div className="install-requirement">
                            <div className="install-requirement-icon">
                                Py
                            </div>

                            <div className="install-requirement-main">
                                <strong>Python</strong>
                                <span>3.10 or newer</span>
                            </div>

                            <small>
                                Recommended runtime
                            </small>
                        </div>

                        <div className="install-requirement">
                            <div className="install-requirement-icon">
                                $
                            </div>

                            <div className="install-requirement-main">
                                <strong>pip</strong>
                                <span>23 or newer</span>
                            </div>

                            <small>
                                Python package manager
                            </small>
                        </div>

                        <div className="install-requirement">
                            <div className="install-requirement-icon">
                                OS
                            </div>

                            <div className="install-requirement-main">
                                <strong>Platform</strong>
                                <span>
                                    macOS, Linux, Windows
                                </span>
                            </div>

                            <small>
                                Standard Python environments
                            </small>
                        </div>

                    </div>

                    <CodeBlock
                        label="Check Python"
                        code="python --version"
                    />
                </section>

                {/* =================================================
                    INSTALL
                ================================================= */}

                <section
                    id="install-onithrasml"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>02</span>

                        <div>
                            <h2>Install OnithrasML</h2>

                            <p>
                                Install the latest published package
                                using pip.
                            </p>
                        </div>
                    </div>

                    <CodeBlock
                        label="Terminal"
                        primary
                        code="python -m pip install onithrasML"
                    />

                    <div className="install-tip">
                        <div className="install-tip-mark">
                            i
                        </div>

                        <div>
                            <strong>
                                Why use{" "}
                                <code>python -m pip</code>?
                            </strong>

                            <p>
                                It ensures that pip belongs to the
                                Python interpreter currently being
                                used by your environment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    VIRTUAL ENVIRONMENT
                ================================================= */}

                <section
                    id="virtual-environment"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>03</span>

                        <div>
                            <h2>Virtual Environment</h2>

                            <p>
                                Keep project dependencies isolated
                                from your system Python installation.
                            </p>
                        </div>
                    </div>

                    <div className="install-step-list">

                        <div className="install-step">
                            <div className="install-step-number">
                                01
                            </div>

                            <div className="install-step-content">
                                <h3>
                                    Create an environment
                                </h3>

                                <CodeBlock
                                    label="Terminal"
                                    code="python -m venv .venv"
                                />
                            </div>
                        </div>

                        <div className="install-step">
                            <div className="install-step-number">
                                02
                            </div>

                            <div className="install-step-content">
                                <h3>
                                    Activate — macOS / Linux
                                </h3>

                                <CodeBlock
                                    label="Terminal"
                                    code="source .venv/bin/activate"
                                />
                            </div>
                        </div>

                        <div className="install-step">
                            <div className="install-step-number">
                                03
                            </div>

                            <div className="install-step-content">
                                <h3>
                                    Activate — Windows
                                </h3>

                                <CodeBlock
                                    label="PowerShell"
                                    code={".venv\\Scripts\\Activate.ps1"}
                                />
                            </div>
                        </div>

                        <div className="install-step">
                            <div className="install-step-number">
                                04
                            </div>

                            <div className="install-step-content">
                                <h3>
                                    Install the package
                                </h3>

                                <CodeBlock
                                    label="Terminal"
                                    code="python -m pip install onithrasML"
                                />
                            </div>
                        </div>

                    </div>
                </section>

                {/* =================================================
                    VERIFY
                ================================================= */}

                <section
                    id="verify-installation"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>04</span>

                        <div>
                            <h2>Verify Installation</h2>

                            <p>
                                Confirm that OnithrasML can be
                                imported successfully.
                            </p>
                        </div>
                    </div>

                    <CodeBlock
                        label="Python"
                        code={`import onithrasML as oml

print(oml.__version__)`}
                    />

                    <div className="install-success">
                        <div className="install-success-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Installation successful
                            </strong>

                            <p>
                                If the import completes without an
                                exception, OnithrasML is available
                                in the active Python environment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    UPGRADE
                ================================================= */}

                <section
                    id="upgrade"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>05</span>

                        <div>
                            <h2>Upgrade</h2>

                            <p>
                                Keep your OnithrasML installation
                                up to date.
                            </p>
                        </div>
                    </div>

                    <CodeBlock
                        label="Terminal"
                        code="python -m pip install --upgrade onithrasML"
                    />
                </section>

                {/* =================================================
                    DEVELOPMENT
                ================================================= */}

                <section
                    id="development-installation"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>06</span>

                        <div>
                            <h2>Development Installation</h2>

                            <p>
                                Install OnithrasML from source when
                                developing or contributing to the
                                project.
                            </p>
                        </div>
                    </div>

                    <CodeBlock
                        label="Terminal"
                        code={`git clone <repository-url>
cd onithrasML

python -m venv .venv
source .venv/bin/activate

python -m pip install -e .`}
                    />

                    <div className="install-tip">
                        <div className="install-tip-mark">
                            →
                        </div>

                        <div>
                            <strong>
                                Editable installation
                            </strong>

                            <p>
                                The{" "}
                                <code>-e</code>{" "}
                                option keeps the package linked to
                                your source tree, allowing source
                                changes to be tested without
                                reinstalling the package.
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    TROUBLESHOOTING
                ================================================= */}

                <section
                    id="troubleshooting"
                    className="install-section"
                >
                    <div className="install-section-heading">
                        <span>07</span>

                        <div>
                            <h2>Troubleshooting</h2>

                            <p>
                                Common checks when installation does
                                not behave as expected.
                            </p>
                        </div>
                    </div>

                    <div className="install-troubleshooting">

                        <div className="install-problem">
                            <div className="install-problem-heading">
                                <span>01</span>
                                <h3>Package not found</h3>
                            </div>

                            <p>
                                Check whether OnithrasML is installed
                                in the active Python environment.
                            </p>

                            <CodeBlock
                                label="Terminal"
                                code="python -m pip show onithrasML"
                            />
                        </div>

                        <div className="install-problem">
                            <div className="install-problem-heading">
                                <span>02</span>
                                <h3>
                                    Wrong Python environment
                                </h3>
                            </div>

                            <p>
                                Check which Python interpreter is
                                currently being used.
                            </p>

                            <CodeBlock
                                label="Terminal"
                                code={`python -c "import sys; print(sys.executable)"`}
                            />
                        </div>

                        <div className="install-problem">
                            <div className="install-problem-heading">
                                <span>03</span>
                                <h3>Outdated pip</h3>
                            </div>

                            <p>
                                Upgrade pip and retry the
                                installation.
                            </p>

                            <CodeBlock
                                label="Terminal"
                                code="python -m pip install --upgrade pip"
                            />
                        </div>

                    </div>
                </section>

            </article>
        </DocsLayout>
    );
}