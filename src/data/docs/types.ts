export interface Formula {
    title?: string;
    expression: string;
    explanation?: string;
}

export interface Parameter {
    name: string;
    type: string;
    description: string;
    default?: string;
    required?: boolean;
}

export interface ReturnValue {
    name?: string;
    type: string;
    description: string;
}

export interface CodeExample {
    language: string;
    code: string;
    output?: string;
    explanation?: string;
}

export interface Complexity {
    time?: string;
    space?: string;
}

export interface DocumentationSection {
    id: string;
    title: string;
    description?: string;
    paragraphs?: string[];
    formula?: Formula;
    parameters?: Parameter[];
    returns?: ReturnValue;
    example?: CodeExample;
    notes?: string[];
    warnings?: string[];
    complexity?: Complexity;
}

/* ─────────────────────────────────────────────
   Method Documentation
   ───────────────────────────────────────────── */

export interface MethodParameter {
    name: string;
    type: string;
    description: string;
    default?: string;
    required?: boolean;
}

export interface MethodReturn {
    type: string;
    description: string;
}

export interface MethodExample {
    language: string;
    code: string;
    output?: string;
    explanation?: string;
}

export interface MethodDocumentation {
    slug: string;

    name: string;

    category: string;

    title: string;

    description: string;

    status?: "implemented" | "planned";

    signature: string;

    parameters?: MethodParameter[];

    returns?: MethodReturn;

    formula?: Formula;

    examples?: MethodExample[];

    implementation?: string[];

    numericalConsiderations?: string[];

    notes?: string[];

    warnings?: string[];

    errors?: string[];

    complexity?: Complexity;

    relatedMethods?: string[];
}

/* ─────────────────────────────────────────────
   Module Documentation
   ───────────────────────────────────────────── */

export interface ModuleDocumentation {
    slug: string;

    eyebrow: string;

    title: string;

    description: string;

    tags?: string[];

    sections: DocumentationSection[];
}