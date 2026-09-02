import { Link } from "react-router-dom";

interface DocsTOCProps {
    items?: string[];
}

export function DocsTOC({ items = [] }: DocsTOCProps) {
    return (
        <nav className="docs-toc" aria-label="On this page">
            <div className="docs-toc-title">
                ON THIS PAGE
            </div>

            {items.length > 0 ? (
                <div className="docs-toc-list">
                    {items.map((item, index) => {
                        const id = item
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "");

                        return (
                            <Link
                                key={`${id}-${index}`}
                                to={`#${id}`}
                                className={`docs-toc-link ${
                                    index === 0 ? "active" : ""
                                }`}
                            >
                                <span className="docs-toc-line" />
                                <span>{item}</span>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="docs-toc-empty">
                    <span>No sections</span>
                </div>
            )}

            <div className="docs-toc-divider" />

            <div className="docs-toc-meta">
                <span className="docs-toc-meta-dot" />
                <span>OnithrasML</span>
                <strong>v0.3</strong>
            </div>
        </nav>
    );
}