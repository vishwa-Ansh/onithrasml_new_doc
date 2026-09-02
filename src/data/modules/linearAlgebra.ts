import type { ModuleDocumentation } from "../docs/types";

export const linearAlgebra: ModuleDocumentation = {
    slug: "linear-algebra",

    eyebrow: "ONITHRASML · LINEAR ALGEBRA",

    title: "Linear Algebra",

    description:
        "Linear algebra routines for matrix operations, linear systems, least-squares problems, decompositions, matrix functions, and numerical scientific computing.",

    tags: [
        "Matrices",
        "Vectors",
        "Linear Systems",
        "Decompositions",
        "Numerical Computing",
    ],

    sections: [
        {
            id: "overview",
            title: "Overview",
            description:
                "The OnithrasML Linear Algebra module provides a unified interface for numerical linear algebra operations. The implementation can use optimized numerical backends such as NumPy, SciPy, BLAS, and LAPACK while exposing an OnithrasML-oriented API.",

            paragraphs: [
                "Linear algebra is a fundamental part of scientific computing and machine learning. Matrix operations, linear systems, decompositions, norms, eigenvalue problems, and least-squares methods are used throughout numerical algorithms.",
                "OnithrasML is designed to provide these capabilities through its own public API while allowing optimized backend implementations underneath.",
            ],
        },

        {
            id: "basic-routines",
            title: "Basic Routines",
            description:
                "Core operations for matrices, vectors, inverses, determinants, norms, and linear systems.",

            paragraphs: [
                "These routines form the foundation of numerical linear algebra workflows. They are commonly used before or inside more advanced algorithms.",
            ],
        },

        {
            id: "least-squares",
            title: "Least Squares",
            description:
                "Methods for solving overdetermined or underdetermined linear systems and computing generalized inverses.",

            paragraphs: [
                "Least-squares methods are useful when an exact solution does not exist or when a model must be fitted to numerical data.",
            ],
        },

        {
            id: "decompositions",
            title: "Matrix Decompositions",
            description:
                "Matrix factorization techniques used for solving systems, analyzing matrices, and building stable numerical algorithms.",

            paragraphs: [
                "Decompositions transform a matrix into structured factors that are easier to analyze or use computationally.",
            ],
        },

        {
            id: "matrix-functions",
            title: "Matrix Functions",
            description:
                "Functions that operate directly on square matrices, including exponential, logarithmic, trigonometric, and hyperbolic functions.",

            paragraphs: [
                "Matrix functions are important in differential equations, dynamical systems, control theory, numerical analysis, and scientific computing.",
            ],
        },

        {
            id: "special-matrices",
            title: "Special Matrices",
            description:
                "Utilities for constructing structured matrices commonly used in numerical algorithms and scientific applications.",

            paragraphs: [
                "Structured matrices often have mathematical properties that can be exploited for analysis or efficient computation.",
            ],
        },

        {
            id: "advanced",
            title: "Advanced Features",
            description:
                "Advanced capabilities such as batched linear algebra and memory-aware numerical operations.",

            paragraphs: [
                "Advanced operations are intended for workloads where performance, memory usage, or repeated numerical computation becomes important.",
            ],
        },
    ],
};