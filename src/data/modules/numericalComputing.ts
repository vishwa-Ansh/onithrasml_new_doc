export interface DocumentationSection {
    id: string;
    title: string;
    content: string;
}

export interface ModuleDocumentation {
    slug: string;
    eyebrow: string;
    title: string;
    description: string;
    tags: string[];
    sections: DocumentationSection[];
}

export const numericalComputing: ModuleDocumentation = {
    slug: "numerical-computations",

    eyebrow: "MODULE · SCIENTIFIC COMPUTING",

    title: "Numerical Computing",

    description:
        "Understand arrays, vectorization, numerical precision, memory usage, and efficient numerical computation.",

    tags: [
        "Arrays",
        "Vectorization",
        "Numerical Precision",
        "Performance",
    ],

    sections: [
        {
            id: "introduction",

            title: "Introduction",

            content:
                "Numerical computing is the foundation of scientific computing and machine learning. It focuses on representing numerical data and performing mathematical operations efficiently, accurately, and reliably. OnithrasML provides numerical tools that help build computational workflows without unnecessary complexity.",
        },

        {
            id: "arrays",

            title: "Arrays",

            content:
                "Arrays are fundamental data structures for numerical computation. They allow numerical values to be organised into one-dimensional vectors, two-dimensional matrices, and higher-dimensional structures. Understanding shape, dimensions, indexing, slicing, and reshaping is essential for working with numerical data.",
        },

        {
            id: "vectorization",

            title: "Vectorization",

            content:
                "Vectorization means applying an operation to an entire collection of numerical values instead of processing each element through an explicit Python loop. Vectorized computation can improve performance, simplify mathematical expressions, and make numerical programs easier to reason about.",
        },

        {
            id: "numerical-precision",

            title: "Numerical Precision",

            content:
                "Computers represent most real numbers using finite-precision floating-point formats. As a result, numerical calculations can introduce rounding errors and small differences from exact mathematical results. Understanding floating-point precision, rounding, overflow, underflow, and numerical comparisons is important when developing reliable scientific software.",
        },

        {
            id: "mathematical-operations",

            title: "Mathematical Operations",

            content:
                "Numerical computing commonly requires operations such as addition, subtraction, multiplication, division, powers, square roots, absolute values, sums, minimums, maximums, and other mathematical transformations. These operations form the basic building blocks of larger numerical algorithms.",
        },

        {
            id: "memory-and-performance",

            title: "Memory and Performance",

            content:
                "Numerical performance depends on both computation time and memory usage. Avoiding unnecessary allocations, choosing appropriate data representations, reusing existing results, and favouring efficient vectorized operations can make numerical workloads substantially faster and more memory-efficient.",
        },

        {
            id: "numerical-methods",

            title: "Numerical Methods",

            content:
                "Numerical methods provide practical algorithms for solving mathematical problems that may not have convenient closed-form solutions. Important areas include root finding, numerical integration, numerical differentiation, approximation, interpolation, and the solution of linear systems.",
        },

        {
            id: "examples",

            title: "Examples",

            content:
                "The examples in this section demonstrate how numerical concepts can be applied to practical scientific-computing problems. Each example will progressively introduce numerical data, mathematical operations, vectorized computation, precision considerations, and performance-aware implementations.",
        },
    ],
};