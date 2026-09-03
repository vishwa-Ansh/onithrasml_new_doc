import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { datasets } from "../../data/datasets";
import "./DatasetDetailPage.css";

interface CsvData {
    headers: string[];
    rows: string[][];
}

function parseCSV(text: string): CsvData {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                cell += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === "," && !insideQuotes) {
            row.push(cell);
            cell = "";
        } else if (
            (char === "\n" || char === "\r") &&
            !insideQuotes
        ) {
            if (char === "\r" && nextChar === "\n") {
                i++;
            }

            row.push(cell);
            cell = "";

            if (row.some((value) => value.trim() !== "")) {
                rows.push(row);
            }

            row = [];
        } else {
            cell += char;
        }
    }

    if (cell.length > 0 || row.length > 0) {
        row.push(cell);

        if (row.some((value) => value.trim() !== "")) {
            rows.push(row);
        }
    }

    if (rows.length === 0) {
        return {
            headers: [],
            rows: [],
        };
    }

    return {
        headers: rows[0],
        rows: rows.slice(1),
    };
}

export function DatasetDetailPage() {
    const { slug } = useParams<{ slug: string }>();

    const dataset = datasets.find(
        (item) => item.slug === slug
    );

    const [csvData, setCsvData] = useState<CsvData>({
        headers: [],
        rows: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!dataset) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function loadDataset() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(dataset.file);

                if (!response.ok) {
                    throw new Error(
                        `Failed to load dataset (${response.status})`
                    );
                }

                const text = await response.text();
                const parsed = parseCSV(text);

                if (!cancelled) {
                    setCsvData(parsed);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load dataset."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadDataset();

        return () => {
            cancelled = true;
        };
    }, [dataset]);

    const previewRows = useMemo(
        () => csvData.rows.slice(0, 10),
        [csvData.rows]
    );

    const columns = dataset?.columns ?? [];

    if (!dataset) {
        return (
            <main className="dataset-detail-page">
                <section className="dataset-not-found">
                    <span className="datasets-section-label">
                        DATASET NOT FOUND
                    </span>

                    <h1>We couldn't find that dataset.</h1>

                    <p>
                        The dataset you are looking for does not exist
                        or may have been removed.
                    </p>

                    <Link
                        to="/datasets"
                        className="dataset-back-button"
                    >
                        <span>Back to datasets</span>
                        <span>←</span>
                    </Link>
                </section>
            </main>
        );
    }

    const actualSamples =
        csvData.rows.length > 0
            ? csvData.rows.length
            : dataset.samples;

    const previewHeaders =
        csvData.headers.length > 0
            ? csvData.headers
            : columns.map((column) => column.name);

    return (
        <main className="dataset-detail-page">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="dataset-detail-hero">
                <div className="dataset-detail-hero-inner">

                    <Link
                        to="/datasets"
                        className="dataset-back-link"
                    >
                        <span>←</span>
                        Back to datasets
                    </Link>

                    <div className="dataset-detail-eyebrow">
                        ONITHRASML · DATASET
                    </div>

                    <div className="dataset-detail-heading">

                        <div>
                            <span className="dataset-detail-type">
                                {dataset.type}
                            </span>

                            <h1>{dataset.name}</h1>

                            <p>{dataset.description}</p>
                        </div>

                        <div className="dataset-detail-download">

                            <a
                                href={dataset.file}
                                download
                                className="dataset-download-button"
                            >
                                <span>Download CSV</span>
                                <span>↓</span>
                            </a>

                            <small>
                                {dataset.file}
                            </small>

                        </div>

                    </div>

                    <div className="dataset-detail-stats">

                        <div>
                            <span>SAMPLES</span>
                            <strong>
                                {actualSamples.toLocaleString()}
                            </strong>
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
                            <span>FORMAT</span>
                            <strong>CSV</strong>
                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
                DATA PREVIEW
            ===================================================== */}

            <section className="dataset-preview-section">

                <div className="dataset-section-heading">

                    <div>
                        <span className="datasets-section-label">
                            DATA PREVIEW
                        </span>

                        <h2>Inspect the data.</h2>
                    </div>

                    <p>
                        A preview of the first 10 rows is shown below.
                        Download the complete dataset for your experiments.
                    </p>

                </div>

                <div className="dataset-preview-card">

                    {loading && (
                        <div className="dataset-loading">
                            <span className="dataset-loading-dot" />
                            Loading dataset...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="dataset-error">
                            <strong>Unable to load preview.</strong>

                            <p>{error}</p>

                            <a
                                href={dataset.file}
                                download
                                className="dataset-download-button"
                            >
                                Download CSV
                                <span>↓</span>
                            </a>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        previewHeaders.length > 0 && (
                            <div className="dataset-table-wrapper">

                                <table className="dataset-preview-table">

                                    <thead>
                                        <tr>
                                            <th>#</th>

                                            {previewHeaders.map(
                                                (header) => (
                                                    <th key={header}>
                                                        {header}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {previewRows.map(
                                            (row, rowIndex) => (
                                                <tr key={rowIndex}>

                                                    <td>
                                                        {rowIndex + 1}
                                                    </td>

                                                    {previewHeaders.map(
                                                        (_, columnIndex) => (
                                                            <td
                                                                key={
                                                                    columnIndex
                                                                }
                                                            >
                                                                {row[
                                                                    columnIndex
                                                                ] ?? "—"}
                                                            </td>
                                                        )
                                                    )}

                                                </tr>
                                            )
                                        )}
                                    </tbody>

                                </table>

                            </div>
                        )}

                    {!loading &&
                        !error &&
                        previewRows.length === 0 && (
                            <div className="dataset-empty-preview">
                                No preview data available.
                            </div>
                        )}

                </div>

                <div className="dataset-preview-footer">
                    <span>
                        Showing{" "}
                        <strong>
                            {Math.min(
                                10,
                                actualSamples
                            )}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {actualSamples.toLocaleString()}
                        </strong>{" "}
                        rows
                    </span>

                    <a
                        href={dataset.file}
                        download
                    >
                        Download complete dataset →
                    </a>
                </div>

            </section>

            {/* =====================================================
                COLUMNS
            ===================================================== */}

            <section className="dataset-columns-section">

                <div className="dataset-section-heading">

                    <div>
                        <span className="datasets-section-label">
                            SCHEMA
                        </span>

                        <h2>Understand every column.</h2>
                    </div>

                    <p>
                        Each column is documented so you can understand
                        the structure of the dataset before modeling.
                    </p>

                </div>

                <div className="dataset-columns-grid">

                    {columns.map((column, index) => {

                        const isTarget =
                            column.name === dataset.target;

                        return (
                            <article
                                className={`dataset-column-card ${
                                    isTarget
                                        ? "target"
                                        : ""
                                }`}
                                key={column.name}
                            >

                                <div className="dataset-column-top">

                                    <span>
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    {isTarget && (
                                        <small>
                                            TARGET
                                        </small>
                                    )}

                                </div>

                                <h3>
                                    {column.name}
                                </h3>

                                <code>
                                    {column.type}
                                </code>

                                <p>
                                    {column.description}
                                </p>

                            </article>
                        );
                    })}

                </div>

            </section>

            {/* =====================================================
                MACHINE LEARNING
            ===================================================== */}

            <section className="dataset-ml-section">

                <div className="dataset-ml-content">

                    <span className="datasets-section-label">
                        MACHINE LEARNING
                    </span>

                    <h2>
                        A dataset for
                        <br />
                        experimentation.
                    </h2>

                    <p>
                        Use this dataset for exploratory data analysis,
                        preprocessing, feature engineering, regression
                        experiments, model evaluation, and learning.
                    </p>

                </div>

                <div className="dataset-ml-card">

                    <div className="dataset-ml-card-header">
                        <span>DATASET PROFILE</span>
                        <span>v0.3</span>
                    </div>

                    <div className="dataset-ml-list">

                        <div>
                            <span>Problem type</span>
                            <strong>
                                {dataset.type}
                            </strong>
                        </div>

                        <div>
                            <span>Target variable</span>
                            <strong>
                                {dataset.target}
                            </strong>
                        </div>

                        <div>
                            <span>Input columns</span>
                            <strong>
                                {dataset.features}
                            </strong>
                        </div>

                        <div>
                            <span>Dataset size</span>
                            <strong>
                                {actualSamples.toLocaleString()} rows
                            </strong>
                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
                PYTHON
            ===================================================== */}

            <section className="dataset-python-section">

                <div className="dataset-section-heading">

                    <div>
                        <span className="datasets-section-label">
                            PYTHON
                        </span>

                        <h2>Load it in seconds.</h2>
                    </div>

                    <p>
                        The CSV file can be loaded directly into your
                        Python data workflow.
                    </p>

                </div>

                <div className="dataset-python-card">

                    <div className="dataset-python-header">
                        <span>PYTHON</span>
                        <span>
                            {dataset.name.toUpperCase()}
                        </span>
                    </div>

                    <pre>
                        <code>{`import pandas as pd

data = pd.read_csv("${dataset.slug}.csv")

print(data.shape)
print(data.head())`}</code>
                    </pre>

                    <div className="dataset-python-output">

                        <span>OUTPUT</span>

                        <code>
                            ({actualSamples},{" "}
                            {dataset.columns.length})
                        </code>

                    </div>

                </div>

            </section>

            {/* =====================================================
                DOWNLOAD CTA
            ===================================================== */}

            <section className="dataset-detail-cta">

                <div>
                    <span className="datasets-section-label">
                        READY TO EXPERIMENT?
                    </span>

                    <h2>
                        Download the
                        <br />
                        complete dataset.
                    </h2>

                    <p>
                        Get the full CSV file and start working with
                        {` ${dataset.name}`} in your own environment.
                    </p>
                </div>

                <a
                    href={dataset.file}
                    download
                    className="dataset-cta-download"
                >
                    <span>Download CSV</span>
                    <span>↓</span>
                </a>

            </section>

        </main>
    );
}