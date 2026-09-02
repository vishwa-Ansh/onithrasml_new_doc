import type { ReactNode } from "react";
import { DocsSidebar } from "./DocsSidebar";
import { DocsTOC } from "./DocsTOC";

interface DocsLayoutProps {
    children: ReactNode;
    title?: string;
    tocItems?: string[];
}

export function DocsLayout({
    children,
    title,
    tocItems = [],
}: DocsLayoutProps) {
    return (
        <div className="docs-layout">
            <aside className="docs-sidebar-column">
                <DocsSidebar />
            </aside>

            <main className="docs-content-column">
                <div className="docs-content">
                    {title && (
                        <div className="docs-mobile-title">
                            {title}
                        </div>
                    )}

                    {children}
                </div>
            </main>

            <aside className="docs-toc-column">
                <DocsTOC items={tocItems} />
            </aside>
        </div>
    );
}