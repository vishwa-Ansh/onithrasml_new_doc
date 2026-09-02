import { SiteHeader } from "./components/layout/SiteHeader";
import { SiteFooter } from "./components/layout/SiteFooter";
import { AppRouter } from "./router";

function App() {
    return (
        <div className="app">
            <SiteHeader />

            <div className="app-main">
                <AppRouter />
            </div>

            <SiteFooter />
        </div>
    );
}

export default App;