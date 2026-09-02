import { useEffect, useState } from "react";

interface DocsTOCProps {
    items?: string[];
}

function createId(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function DocsTOC({ items = [] }: DocsTOCProps) {
    const [activeId, setActiveId] = useState("");

    const sections = items.map((item) => ({
        label: item,
        id: createId(item),
    }));

    useEffect(() => {
        if (sections.length === 0) return;

        const elements = sections
            .map(({ id }) => document.getElementById(id))
            .filter((element): element is HTMLElement => element !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-100px 0px -65% 0px",
                threshold: 0,
            }
        );

        elements.forEach((element) => observer.observe(element));

        const initialHash = window.location.hash.replace("#", "");

        if (
            initialHash &&
            elements.some((element) => element.id === initialHash)
        ) {
            setActiveId(initialHash);
        } else {
            setActiveId(elements[0].id);
        }

        return () => observer.disconnect();
    }, [items]);

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        event.preventDefault();

        const element = document.getElementById(id);

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}#${id}`
        );

        setActiveId(id);
    };

    return (
        <nav className="docs-toc" aria-label="On this page">
            <div className="docs-toc-title">ON THIS PAGE</div>

            {sections.length > 0 ? (
                <div className="docs-toc-list">
                    {sections.map((section, index) => (
                        <a
                            key={`${section.id}-${index}`}
                            href={`#${section.id}`}
                            className={`docs-toc-link ${
                                activeId === section.id ? "active" : ""
                            }`}
                            onClick={(event) =>
                                handleClick(event, section.id)
                            }
                        >
                            <span className="docs-toc-line" />
                            <span>{section.label}</span>
                        </a>
                    ))}
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