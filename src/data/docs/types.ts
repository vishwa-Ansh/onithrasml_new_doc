export interface MethodParameter {
    name: string;
    type: string;
    shape?: string;
    description: string;
    default?: string;
    required?: boolean;
}

export interface MethodReturn {
    name?: string;
    type: string;
    shape?: string;
    description: string;
}

export interface MethodRaise {
    error: string;
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

    raises?: MethodRaise[];

    formula?: Formula;

    examples?: MethodExample[];

    notes?: string[];

    implementation?: string[];

    numericalConsiderations?: string[];

    warnings?: string[];

    errors?: string[];

    complexity?: Complexity;

    relatedMethods?: string[];
}