import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/Home/HomePage";
import { DocsPage } from "../pages/Docs/DocsPage";
// import { NotFoundPage } from "../pages/NotFound/NotFoundPage";

export function AppRouter() {
    return (
        <Routes>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Documentation */}
            <Route
                path="/docs/:version"
                element={<DocsPage />}
            />

            {/* Documentation modules */}
            <Route
                path="/docs/:version/modules/:slug"
                element={<DocsPage />}
            />

            {/* 404 */}
            {/* <Route
                path="*"
                element={<NotFoundPage />}
            /> */}
        </Routes>
    );
}