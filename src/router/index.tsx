import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/Home/HomePage";
import { DocsPage } from "../pages/Docs/DocsPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { InstallPage } from "../pages/Docs/InstallPage";

export function AppRouter() {
    return (
        <Routes>
            {/* Home */}
            <Route
                path="/"
                element={<HomePage />}
            />

            {/* Documentation home / User Guide */}
            <Route
                path="/docs/:version"
                element={<DocsPage />}
            />

            <Route

                path="/docs/:version/install"

                element={<InstallPage />}

            />

            {/* Module pages */}
            <Route
                path="/docs/:version/modules/:slug"
                element={<DocsPage />}
            />

            {/* Method pages */}
            <Route
                path="/docs/:version/modules/:module/:method"
                element={<DocsPage />}
            />

            {/* 404 */}
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    );
}