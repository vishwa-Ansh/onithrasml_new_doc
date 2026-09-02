import type { MethodDocumentation } from "../../docs/types";
import { inv } from "./inv";

export const linearAlgebraMethods: Record<
    string,
    MethodDocumentation
> = {
    [inv.slug]: inv,
};