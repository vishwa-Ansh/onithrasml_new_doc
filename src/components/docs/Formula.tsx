import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

interface FormulaProps {
    expression: string;
    title?: string;
    explanation?: string;
}

export function Formula({
    expression,
    title,
    explanation,
}: FormulaProps) {
    return (
        <div className="doc-formula">
            {title && (
                <div className="doc-formula-title">
                    {title}
                </div>
            )}

            <div className="doc-formula-expression">
                <BlockMath math={expression} />
            </div>

            {explanation && (
                <p className="doc-formula-explanation">
                    {explanation}
                </p>
            )}
        </div>
    );
}