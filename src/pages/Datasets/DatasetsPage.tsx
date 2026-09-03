import { Link } from "react-router-dom";
import { datasets } from "../../data/datasets";
import "./DatasetsPage.css";

const featuredDatasets = datasets.slice(0, 3);

export function DatasetsPage() {
    const firstDataset = datasets[0];

    return (
        <main className="datasets-page">
            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="datasets-hero">
                <div className="datasets-hero-inner">
                    <div className="datasets-eyebrow">
                        ONITHRASML · DATASETS
                    </div>

                    <h1>
                        Data to
                        <span> experiment.</span>
                    </h1>

                    <p>
                        Ready-to-use datasets for scientific computing,
                        machine learning, tutorials, examples, and experiments.
                    </p>

                    <div className="datasets-hero-actions">
                        <a
                            href="#datasets"
                            className="datasets-primary-button"
                        >
                            Explore datasets
                            <span>↓</span>
                        </a>

                        <Link
                            to="/docs/v0.3"
                            className="datasets-secondary-button"
                        >
                            Documentation
                            <span>→</span>
                        </Link>
                    </div>

                    <div className="datasets-hero-meta">
                        <span>
                            <i />
                            Open datasets
                        </span>

                        <span>
                            {datasets.length}{" "}
                            {datasets.length === 1
                                ? "dataset"
                                : "datasets"}
                        </span>

                        <span>CSV · NumPy · JSON</span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FEATURED DATASETS
            ===================================================== */}

            <section className="datasets-featured">
                <div className="datasets-section-heading">
                    <div>
                        <span className="datasets-section-label">
                            FEATURED
                        </span>

                        <h2>Start experimenting.</h2>
                    </div>

                    <p>
                        Begin with a collection of datasets designed for
                        learning, testing, analysis, and machine learning
                        experiments.
                    </p>
                </div>

                {featuredDatasets.length > 0 ? (
                    <div className="datasets-featured-grid">
                        {featuredDatasets.map((dataset, index) => (
                            <Link
                                to={`/datasets/${dataset.slug}`}
                                className="dataset-featured-card"
                                key={dataset.slug}
                            >
                                <div className="dataset-card-top">
                                    <span className="dataset-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="dataset-type">
                                        {dataset.type}
                                    </span>
                                </div>

                                <h3>{dataset.name}</h3>

                                <p>{dataset.description}</p>

                                <div className="dataset-stats">
                                    <div>
                                        <strong>
                                            {dataset.samples.toLocaleString()}
                                        </strong>

                                        <span>Samples</span>
                                    </div>

                                    <div>
                                        <strong>{dataset.features}</strong>

                                        <span>Features</span>
                                    </div>

                                    <div>
                                        <strong>{dataset.target}</strong>

                                        <span>Target</span>
                                    </div>
                                </div>

                                <div className="dataset-card-link">
                                    <span>View dataset</span>
                                    <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="datasets-empty">
                        No datasets are currently available.
                    </div>
                )}
            </section>

            {/* =====================================================
                ALL DATASETS
            ===================================================== */}

            <section
                className="datasets-all"
                id="datasets"
            >
                <div className="datasets-section-heading">
                    <div>
                        <span className="datasets-section-label">
                            DATA LIBRARY
                        </span>

                        <h2>All datasets.</h2>
                    </div>

                    <div className="datasets-count">
                        <strong>{datasets.length}</strong>

                        <span>
                            {datasets.length === 1
                                ? "available dataset"
                                : "available datasets"}
                        </span>
                    </div>
                </div>

                {datasets.length > 0 ? (
                    <div className="datasets-table">
                        <div className="datasets-table-header">
                            <span>DATASET</span>
                            <span>TYPE</span>
                            <span>SAMPLES</span>
                            <span>FEATURES</span>
                            <span />
                        </div>

                        {datasets.map((dataset, index) => (
                            <Link
                                to={`/datasets/${dataset.slug}`}
                                className="datasets-table-row"
                                key={dataset.slug}
                            >
                                <div className="dataset-table-name">
                                    <span>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <div>
                                        <strong>{dataset.name}</strong>

                                        <small>
                                            Target: {dataset.target}
                                        </small>
                                    </div>
                                </div>

                                <span className="dataset-table-type">
                                    {dataset.type}
                                </span>

                                <span>
                                    {dataset.samples.toLocaleString()}
                                </span>

                                <span>{dataset.features}</span>

                                <span className="dataset-table-arrow">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="datasets-empty">
                        No datasets are currently available.
                    </div>
                )}
            </section>

            {/* =====================================================
                QUICK START
            ===================================================== */}

            {firstDataset && (
                <section className="datasets-usage">
                    <div className="datasets-usage-content">
                        <span className="datasets-section-label">
                            QUICK START
                        </span>

                        <h2>
                            Load data.
                            <br />
                            Start computing.
                        </h2>

                        <p>
                            Use datasets directly in your Python workflow
                            and combine them with OnithrasML's numerical
                            and machine learning tools.
                        </p>
                    </div>

                    <div className="datasets-code-card">
                        <div className="datasets-code-header">
                            <span>PYTHON</span>

                            <span>{firstDataset.name.toUpperCase()}</span>
                        </div>

                        <pre>
                            <code>{`from onithrasml.datasets import load_${firstDataset.slug}

data = load_${firstDataset.slug}()

X = data.data
y = data.target

print(X.shape)
print(y.shape)`}</code>
                        </pre>

                        <div className="datasets-code-output">
                            <span>OUTPUT</span>

                            <code>{`(${firstDataset.samples}, ${firstDataset.features})
(${firstDataset.samples},)`}</code>
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================
                DATA FORMATS
            ===================================================== */}

            <section className="datasets-formats">
                <div>
                    <span className="datasets-section-label">
                        DATA FORMATS
                    </span>

                    <h2>Use the format you need.</h2>
                </div>

                <div className="datasets-format-grid">
                    <div className="datasets-format-card">
                        <span>01</span>

                        <strong>CSV</strong>

                        <p>
                            Simple tabular data for spreadsheets, scripts,
                            and data analysis.
                        </p>
                    </div>

                    <div className="datasets-format-card">
                        <span>02</span>

                        <strong>JSON</strong>

                        <p>
                            Structured data suitable for applications and
                            programmatic workflows.
                        </p>
                    </div>

                    <div className="datasets-format-card">
                        <span>03</span>

                        <strong>NumPy</strong>

                        <p>
                            Numerical arrays ready to use in scientific
                            computing workflows.
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="datasets-cta">
                <div>
                    <span className="datasets-section-label">
                        BUILD WITH DATA
                    </span>

                    <h2>
                        Have a dataset
                        <br />
                        to contribute?
                    </h2>

                    <p>
                        Help expand the OnithrasML dataset collection by
                        contributing useful datasets and examples.
                    </p>
                </div>

                <Link
                    to="/contribute"
                    className="datasets-cta-button"
                >
                    Contributing
                    <span>→</span>
                </Link>
            </section>
        </main>
    );
}