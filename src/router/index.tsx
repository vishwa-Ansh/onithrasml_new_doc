import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/Home/HomePage";
import { DocsPage } from "../pages/Docs/DocsPage";
import { LinearAlgebraPage } from "../pages/Docs/LinearAlgebraPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";

export function AppRouter() {
    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/docs/:version"
                element={<DocsPage />}
            />

            {/* Linear Algebra overview */}
            <Route
                path="/docs/:version/modules/linear-algebra"
                element={<LinearAlgebraPage />}
            />

            {/* Individual method documentation */}
            <Route
                path="/docs/:version/modules/:module/:method"
                element={<DocsPage />}
            />

            {/* Other module documentation */}
            <Route
                path="/docs/:version/modules/:slug"
                element={<DocsPage />}
            />

            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
}