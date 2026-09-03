import { Link, useParams } from "react-router-dom";
import "./DatasetDetailPage.css";

const datasetData: Record<
    string,
    {
        name: string;
        type: string;
        description: string;
        samples: number;
        features: number;
        target: string;
        columns: string[];
        preview: string[][];
    }
> = {
    iris: {
        name: "Iris",
        type: "Classification",
        description:
            "The Iris dataset contains measurements of iris flowers and is commonly used for classification, visualization, and introductory machine learning experiments.",
        samples: 150,
        features: 4,
        target: "species",
        columns: [
            "sepal_length",
            "sepal_width",
            "petal_length",
            "petal_width",
            "species",
        ],
        preview: [
            ["5.1", "3.5", "1.4", "0.2", "setosa"],
            ["4.9", "3.0", "1.4", "0.2", "setosa"],
            ["4.7", "3.2", "1.3", "0.2", "setosa"],
            ["4.6", "3.1", "1.5", "0.2", "setosa"],
            ["5.0", "3.6", "1.4", "0.2", "setosa"],
        ],
    },

    diabetes: {
        name: "Diabetes",
        type: "Regression",
        description:
            "A numerical regression dataset containing physiological measurements associated with disease progression.",
        samples: 442,
        features: 10,
        target: "disease_progression",
        columns: [
            "age",
            "sex",
            "bmi",
            "bp",
            "s1",
            "s2",
            "s3",
            "s4",
            "s5",
            "s6",
        ],
        preview: [
            ["0.038", "0.051", "0.062", "0.021", "0.043", "0.034", "0.044", "0.019", "0.018", "0.023"],
            ["-0.002", "-0.045", "-0.051", "-0.026", "-0.005", "-0.019", "0.074", "-0.039", "-0.068", "-0.092"],
            ["0.085", "0.050", "0.044", "-0.005", "-0.046", "-0.034", "-0.032", "-0.003", "0.003", "-0.026"],
        ],
    },

    wine: {
        name: "Wine",
        type: "Classification",
        description:
            "A dataset containing chemical analysis measurements of wines belonging to different cultivars.",
        samples: 178,
        features: 13,
        target: "class",
        columns: [
            "alcohol",
            "malic_acid",
            "ash",
            "alcalinity",
            "magnesium",
            "phenols",
        ],
        preview: [
            ["14.23", "1.71", "2.43", "15.6", "127", "2.80"],
            ["13.20", "1.78", "2.14", "11.2", "100", "2.65"],
            ["13.16", "2.36", "2.67", "18.6", "101", "2.80"],
            ["14.37", "1.95", "2.50", "16.8", "113", "3.85"],
        ],
    },
};

export function DatasetDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const dataset = slug ? datasetData[slug] : undefined;

    if (!dataset) {
        return (
            <main className="dataset-not-found">
                <span className="datasets-section-label">
                    DATASET NOT FOUND
                </span>

                <h1>Dataset unavailable.</h1>

                <p>
                    The dataset you are looking for does not exist in the
                    current OnithrasML dataset library.
                </p>

                <Link to="/datasets">← Back to datasets</Link>
            </main>
        );
    }

    return (
        <main className="dataset-detail-page">
            {/* HEADER */}
            <section className="dataset-detail-hero">
                <div className="dataset-detail-hero-inner">
                    <Link
                        to="/datasets"
                        className="dataset-back-link"
                    >
                        ← All datasets
                    </Link>

                    <div className="dataset-detail-eyebrow">
                        ONITHRASML · DATASET
                    </div>

                    <div className="dataset-title-row">
                        <div>
                            <div className="dataset-type-badge">
                                {dataset.type}
                            </div>

                            <h1>{dataset.name}</h1>
                        </div>

                        <span className="dataset-detail-index">
                            #{String(
                                Object.keys(datasetData).indexOf(
                                    dataset.name.toLowerCase()
                                ) + 1
                            ).padStart(2, "0")}
                        </span>
                    </div>

                    <p>{dataset.description}</p>
                </div>
            </section>

            {/* STATS */}
            <section className="dataset-detail-content">
                <div className="dataset-detail-stats">
                    <div>
                        <span>OBSERVATIONS</span>
                        <strong>{dataset.samples}</strong>
                    </div>

                    <div>
                        <span>FEATURES</span>
                        <strong>{dataset.features}</strong>
                    </div>

                    <div>
                        <span>TARGET</span>
                        <strong>{dataset.target}</strong>
                    </div>

                    <div>
                        <span>TASK</span>
                        <strong>{dataset.type}</strong>
                    </div>
                </div>

                {/* DATA PREVIEW */}
                <section className="dataset-preview-section">
                    <div className="dataset-detail-section-heading">
                        <div>
                            <span className="datasets-section-label">
                                DATA PREVIEW
                            </span>

                            <h2>Inspect the data.</h2>
                        </div>

                        <span className="dataset-preview-note">
                            First rows
                        </span>
                    </div>

                    <div className="dataset-preview-wrapper">
                        <table className="dataset-preview-table">
                            <thead>
                                <tr>
                                    <th>#</th>

                                    {dataset.columns.map((column) => (
                                        <th key={column}>{column}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {dataset.preview.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td>{rowIndex}</td>

                                        {row.map((value, columnIndex) => (
                                            <td key={columnIndex}>
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="dataset-columns-section">
                    <div className="dataset-detail-section-heading">
                        <div>
                            <span className="datasets-section-label">
                                FEATURES
                            </span>

                            <h2>Dataset columns.</h2>
                        </div>
                    </div>

                    <div className="dataset-columns-grid">
                        {dataset.columns.map((column, index) => (
                            <div
                                className="dataset-column-card"
                                key={column}
                            >
                                <span>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <code>{column}</code>

                                <small>
                                    {column === dataset.target
                                        ? "Target variable"
                                        : "Feature"}
                                </small>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PYTHON */}
                <section className="dataset-code-section">
                    <div className="dataset-code-info">
                        <span className="datasets-section-label">
                            PYTHON
                        </span>

                        <h2>
                            Load it
                            <br />
                            in your workflow.
                        </h2>

                        <p>
                            Load the dataset and use its features and target
                            directly in your numerical or machine learning
                            workflow.
                        </p>
                    </div>

                    <div className="dataset-detail-code">
                        <div className="dataset-code-top">
                            <span>PYTHON</span>
                            <span>EXAMPLE</span>
                        </div>

                        <pre>
                            <code>{`from onithrasml.datasets import load_${slug}

data = load_${slug}()

X = data.data
y = data.target

print(X.shape)
print(y.shape)`}</code>
                        </pre>
                    </div>
                </section>

                {/* DOWNLOAD */}
                <section className="dataset-download">
                    <div>
                        <span className="datasets-section-label">
                            DOWNLOAD
                        </span>

                        <h2>Take the data with you.</h2>

                        <p>
                            Download the dataset in a format that fits your
                            workflow.
                        </p>
                    </div>

                    <div className="dataset-download-buttons">
                        <button type="button">CSV</button>
                        <button type="button">JSON</button>
                        <button type="button">NumPy</button>
                    </div>
                </section>

                {/* FOOTER */}
                <div className="dataset-detail-footer">
                    <Link to="/datasets">← Dataset library</Link>

                    <Link to="/contribute">
                        Contribute a dataset →
                    </Link>
                </div>
            </section>
        </main>
    );
}