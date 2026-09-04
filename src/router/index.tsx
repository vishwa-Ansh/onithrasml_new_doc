import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { DocsPage } from "../pages/Docs/DocsPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { InstallPage } from "../pages/Docs/InstallPage";
import { ContributePage } from "../pages/Contribute/ContributePage";
import { ChangelogPage } from "../pages/Changelog/ChangelogPage";
import { DatasetsPage } from "../pages/Datasets/DatasetsPage";
import { DatasetDetailPage } from "../pages/Datasets/DatasetDetailPage";
// import { VisualizationTestPage } from "../pages/VisualizationTest/VisualizationTestPage";
import { VisualizationsPage } from "../pages/visualizations/VisualizationsPage";
import { AboutPage } from "../pages/About/AboutPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />

      {/* Documentation home / User Guide */}
      <Route path="/docs/:version" element={<DocsPage />} />

      <Route path="/docs/:version/install" element={<InstallPage />} />

      {/* Module pages */}
      <Route path="/docs/:version/modules/:slug" element={<DocsPage />} />

      {/* Method pages */}
      <Route
        path="/docs/:version/modules/:module/:method"
        element={<DocsPage />}
      />
      <Route path="/contribute" element={<ContributePage />} />

      <Route path="/visualizations" element={<VisualizationsPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />

      <Route path="/datasets" element={<DatasetsPage />} />

      <Route path="/datasets/:slug" element={<DatasetDetailPage />} />
      <Route path ="/about" element={<AboutPage />} />  

      {/* 404 */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
