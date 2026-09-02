import type { MethodDocumentation } from "../../docs/types";
import { det } from "./det";
import { inv } from "./inv";
import { lstsq } from "./lstsq";
import { norm } from "./norm";
import { solve } from "./solve";

export const linearAlgebraMethods: Record<
    string,
    MethodDocumentation
> = {
    [inv.slug]: inv,
    [det.slug]: det,
    [norm.slug]: norm,
    [solve.slug]: solve,
    [lstsq.slug]: lstsq,
};