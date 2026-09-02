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
                "The OnithrasML Linear Algebra module provides a unified interface for numerical linear algebra operations.",

            paragraphs: [
                "Linear algebra is a fundamental part of scientific computing and machine learning. Matrix operations, linear systems, decompositions, norms, eigenvalue problems, and least-squares methods are used throughout numerical algorithms.",

                "OnithrasML exposes these capabilities through its own public API while allowing optimized numerical backends underneath.",
            ],

            formula: {
                title: "Linear System",

                expression: "Ax=b",

                explanation:
                    "A linear system represents a set of equations where A is the coefficient matrix, x is the unknown vector, and b is the right-hand-side vector.",
            },
        },

        {
            id: "basic-routines",
            title: "Basic Routines",

            description:
                "Core matrix and vector operations used throughout numerical computing.",

            paragraphs: [
                "Basic routines provide the foundation for more advanced linear algebra algorithms.",
            ],
        },

        {
            id: "least-squares",
            title: "Least Squares",

            description:
                "Methods for solving overdetermined and underdetermined systems and computing generalized inverses.",

            paragraphs: [
                "Least-squares methods are commonly used when an exact solution does not exist or when numerical data must be fitted to a mathematical model.",
            ],

            formula: {
                title: "Least-Squares Problem",

                expression:
                    "\\min_x \\|Ax-b\\|_2^2",

                explanation:
                    "The objective is to find the vector x that minimizes the squared Euclidean error between Ax and b.",
            },
        },

        {
            id: "decompositions",
            title: "Matrix Decompositions",

            description:
                "Factorization techniques used to analyze matrices and construct stable numerical algorithms.",

            paragraphs: [
                "Matrix decompositions express a matrix as a product or transformation of simpler matrices. They are widely used for solving systems, eigenvalue problems, and numerical optimization.",
            ],
        },

        {
            id: "matrix-functions",
            title: "Matrix Functions",

            description:
                "Functions that operate directly on square matrices.",

            paragraphs: [
                "Matrix functions extend familiar scalar functions such as exponential, logarithm, and trigonometric functions to matrices.",
            ],

            formula: {
                title: "Matrix Exponential",

                expression:
                    "e^A=\\sum_{k=0}^{\\infty}\\frac{A^k}{k!}",

                explanation:
                    "The matrix exponential is defined using the same power-series concept as the scalar exponential.",
            },
        },

        {
            id: "special-matrices",
            title: "Special Matrices",

            description:
                "Utilities for constructing structured matrices used in numerical algorithms and scientific applications.",

            paragraphs: [
                "Structured matrices have specific mathematical patterns that can be exploited for analysis and efficient computation.",
            ],
        },

        {
            id: "advanced",
            title: "Advanced Features",

            description:
                "Advanced functionality for performance-oriented numerical workloads.",

            paragraphs: [
                "Advanced linear algebra operations may support batched computations, memory-aware workflows, and optimized numerical backends.",
            ],
        },
    ],

    methodCategories: [
        {
            id: "basic-routines",
            title: "Basic Routines",

            description:
                "Fundamental matrix and vector operations.",

            methods: [
                {
                    slug: "inv",
                    name: "inv",
                    title: "Matrix Inverse",
                    category: "Basic Routines",
                    description:
                        "Compute the multiplicative inverse of a square matrix.",
                    status: "planned",
                },
                {
                    slug: "solve",
                    name: "solve",
                    title: "Solve Linear System",
                    category: "Basic Routines",
                    description:
                        "Solve a linear system of equations Ax = b.",
                    status: "planned",
                },
                {
                    slug: "det",
                    name: "det",
                    title: "Determinant",
                    category: "Basic Routines",
                    description:
                        "Compute the determinant of a square matrix.",
                    status: "planned",
                },
                {
                    slug: "norm",
                    name: "norm",
                    title: "Matrix or Vector Norm",
                    category: "Basic Routines",
                    description:
                        "Compute a vector or matrix norm.",
                    status: "planned",
                },
            ],
        },

        {
            id: "least-squares",
            title: "Least Squares",

            description:
                "Methods for least-squares problems and generalized inverses.",

            methods: [
                {
                    slug: "lstsq",
                    name: "lstsq",
                    title: "Least-Squares Solution",
                    category: "Least Squares",
                    description:
                        "Compute a least-squares solution to a linear system.",
                    status: "planned",
                },
                {
                    slug: "pinv",
                    name: "pinv",
                    title: "Pseudoinverse",
                    category: "Least Squares",
                    description:
                        "Compute the Moore-Penrose pseudoinverse of a matrix.",
                    status: "planned",
                },
            ],
        },

        {
            id: "decompositions",
            title: "Decompositions",

            description:
                "Matrix factorization and eigenvalue algorithms.",

            methods: [
                {
                    slug: "eig",
                    name: "eig",
                    title: "Eigenvalue Decomposition",
                    category: "Decompositions",
                    description:
                        "Compute eigenvalues and eigenvectors of a square matrix.",
                    status: "planned",
                },
                {
                    slug: "eigvals",
                    name: "eigvals",
                    title: "Eigenvalues",
                    category: "Decompositions",
                    description:
                        "Compute the eigenvalues of a square matrix.",
                    status: "planned",
                },
                {
                    slug: "svd",
                    name: "svd",
                    title: "Singular Value Decomposition",
                    category: "Decompositions",
                    description:
                        "Compute the singular value decomposition of a matrix.",
                    status: "planned",
                },
                {
                    slug: "lu",
                    name: "lu",
                    title: "LU Decomposition",
                    category: "Decompositions",
                    description:
                        "Factor a matrix into lower and upper triangular components.",
                    status: "planned",
                },
                {
                    slug: "qr",
                    name: "qr",
                    title: "QR Decomposition",
                    category: "Decompositions",
                    description:
                        "Compute the QR decomposition of a matrix.",
                    status: "planned",
                },
                {
                    slug: "cholesky",
                    name: "cholesky",
                    title: "Cholesky Decomposition",
                    category: "Decompositions",
                    description:
                        "Compute the Cholesky factorization of a positive-definite matrix.",
                    status: "planned",
                },
            ],
        },

        {
            id: "matrix-functions",
            title: "Matrix Functions",

            description:
                "Functions evaluated directly on square matrices.",

            methods: [
                {
                    slug: "expm",
                    name: "expm",
                    title: "Matrix Exponential",
                    category: "Matrix Functions",
                    description:
                        "Compute the matrix exponential.",
                    status: "planned",
                },
                {
                    slug: "logm",
                    name: "logm",
                    title: "Matrix Logarithm",
                    category: "Matrix Functions",
                    description:
                        "Compute the matrix logarithm.",
                    status: "planned",
                },
                {
                    slug: "sinm",
                    name: "sinm",
                    title: "Matrix Sine",
                    category: "Matrix Functions",
                    description:
                        "Compute the matrix sine.",
                    status: "planned",
                },
                {
                    slug: "cosm",
                    name: "cosm",
                    title: "Matrix Cosine",
                    category: "Matrix Functions",
                    description:
                        "Compute the matrix cosine.",
                    status: "planned",
                },
                {
                    slug: "tanm",
                    name: "tanm",
                    title: "Matrix Tangent",
                    category: "Matrix Functions",
                    description:
                        "Compute the matrix tangent.",
                    status: "planned",
                },
            ],
        },

        {
            id: "special-matrices",
            title: "Special Matrices",

            description:
                "Constructors for structured and special-purpose matrices.",

            methods: [
                {
                    slug: "block-diag",
                    name: "block_diag",
                    title: "Block Diagonal Matrix",
                    category: "Special Matrices",
                    description:
                        "Construct a block diagonal matrix from multiple input matrices.",
                    status: "planned",
                },
                {
                    slug: "toeplitz",
                    name: "toeplitz",
                    title: "Toeplitz Matrix",
                    category: "Special Matrices",
                    description:
                        "Construct a Toeplitz structured matrix.",
                    status: "planned",
                },
                {
                    slug: "hilbert",
                    name: "hilbert",
                    title: "Hilbert Matrix",
                    category: "Special Matrices",
                    description:
                        "Construct a Hilbert matrix.",
                    status: "planned",
                },
                {
                    slug: "hadamard",
                    name: "hadamard",
                    title: "Hadamard Matrix",
                    category: "Special Matrices",
                    description:
                        "Construct a Hadamard matrix.",
                    status: "planned",
                },
            ],
        },
    ],
};