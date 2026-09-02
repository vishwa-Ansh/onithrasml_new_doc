import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export function NotFoundPage() {
    return (
        <main className="not-found-page">
            <div className="not-found-content">
                <span className="not-found-code">404</span>

                <span className="not-found-eyebrow">
                    ONITHRASML · DOCUMENTATION
                </span>

                <h1>Page not found</h1>

                <p>
                    The documentation page you're looking for
                    doesn't exist or may have moved.
                </p>

                <div className="not-found-actions">
                    <Link
                        to="/docs/v0.3"
                        className="not-found-primary"
                    >
                        Documentation
                    </Link>

                    <Link
                        to="/"
                        className="not-found-secondary"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}