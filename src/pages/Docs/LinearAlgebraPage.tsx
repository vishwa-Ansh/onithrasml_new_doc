import { Link } from "react-router-dom";
import "./LinearAlgebraPage.css";

interface LinearAlgebraMethod {
    slug: string;
    name: string;
    description: string;
    status?: "implemented" | "planned";
}

interface MethodGroup {
    title: string;
    description: string;
    methods: LinearAlgebraMethod[];
}

const methodGroups: MethodGroup[] = [
    {
        title: "Basic Routines",
        description:
            "Core operations for matrices, vectors, norms, determinants, inverses, and linear systems.",
        methods: [
            {
                slug: "inv",
                name: "inv",
                description:
                    "Compute the inverse of a square matrix.",
                status: "planned",
            },
            {
                slug: "solve",
                name: "solve",
                description:
                    "Solve a system of linear equations.",
                status: "planned",
            },
            {
                slug: "det",
                name: "det",
                description:
                    "Compute the determinant of a square matrix.",
                status: "planned",
            },
            {
                slug: "norm",
                name: "norm",
                description:
                    "Compute vector or matrix norms.",
                status: "planned",
            },
        ],
    },

    {
        title: "Least Squares",
        description:
            "Tools for least-squares problems and generalized matrix inverses.",
        methods: [
            {
                slug: "lstsq",
                name: "lstsq",
                description:
                    "Solve a linear least-squares problem.",
                status: "planned",
            },
            {
                slug: "pinv",
                name: "pinv",
                description:
                    "Compute the Moore–Penrose pseudoinverse.",
                status: "planned",
            },
        ],
    },

    {
        title: "Decompositions",
        description:
            "Factorization and spectral methods for numerical linear algebra.",
        methods: [
            {
                slug: "eig",
                name: "eig",
                description:
                    "Compute eigenvalues and eigenvectors.",
                status: "planned",
            },
            {
                slug: "eigvals",
                name: "eigvals",
                description:
                    "Compute eigenvalues without eigenvectors.",
                status: "planned",
            },
            {
                slug: "svd",
                name: "svd",
                description:
                    "Compute the singular value decomposition.",
                status: "planned",
            },
            {
                slug: "lu",
                name: "lu",
                description:
                    "Compute an LU decomposition.",
                status: "planned",
            },
            {
                slug: "lu_factor",
                name: "lu_factor",
                description:
                    "Compute an LU factorization for repeated solves.",
                status: "planned",
            },
            {
                slug: "lu_solve",
                name: "lu_solve",
                description:
                    "Solve a system using an LU factorization.",
                status: "planned",
            },
            {
                slug: "cholesky",
                name: "cholesky",
                description:
                    "Compute a Cholesky factorization.",
                status: "planned",
            },
            {
                slug: "cho_factor",
                name: "cho_factor",
                description:
                    "Compute a Cholesky factor for repeated solves.",
                status: "planned",
            },
            {
                slug: "cho_solve",
                name: "cho_solve",
                description:
                    "Solve a system using a Cholesky factorization.",
                status: "planned",
            },
            {
                slug: "qr",
                name: "qr",
                description:
                    "Compute a QR decomposition.",
                status: "planned",
            },
            {
                slug: "schur",
                name: "schur",
                description:
                    "Compute the Schur decomposition.",
                status: "planned",
            },
        ],
    },

    {
        title: "Matrix Functions",
        description:
            "Functions applied directly to square matrices.",
        methods: [
            {
                slug: "expm",
                name: "expm",
                description:
                    "Compute the matrix exponential.",
                status: "planned",
            },
            {
                slug: "logm",
                name: "logm",
                description:
                    "Compute the matrix logarithm.",
                status: "planned",
            },
            {
                slug: "sinm",
                name: "sinm",
                description:
                    "Compute the matrix sine.",
                status: "planned",
            },
            {
                slug: "cosm",
                name: "cosm",
                description:
                    "Compute the matrix cosine.",
                status: "planned",
            },
            {
                slug: "tanm",
                name: "tanm",
                description:
                    "Compute the matrix tangent.",
                status: "planned",
            },
            {
                slug: "sinhm",
                name: "sinhm",
                description:
                    "Compute the matrix hyperbolic sine.",
                status: "planned",
            },
            {
                slug: "coshm",
                name: "coshm",
                description:
                    "Compute the matrix hyperbolic cosine.",
                status: "planned",
            },
            {
                slug: "tanhm",
                name: "tanhm",
                description:
                    "Compute the matrix hyperbolic tangent.",
                status: "planned",
            },
            {
                slug: "funm",
                name: "funm",
                description:
                    "Apply a scalar function to a square matrix.",
                status: "planned",
            },
        ],
    },

    {
        title: "Special Matrices",
        description:
            "Construct structured matrices commonly used in numerical computing.",
        methods: [
            {
                slug: "block_diag",
                name: "block_diag",
                description:
                    "Construct a block diagonal matrix.",
                status: "planned",
            },
            {
                slug: "circulant",
                name: "circulant",
                description:
                    "Construct a circulant matrix.",
                status: "planned",
            },
            {
                slug: "companion",
                name: "companion",
                description:
                    "Construct a companion matrix.",
                status: "planned",
            },
            {
                slug: "convolution_matrix",
                name: "convolution_matrix",
                description:
                    "Construct a convolution matrix.",
                status: "planned",
            },
            {
                slug: "dft",
                name: "dft",
                description:
                    "Construct a discrete Fourier transform matrix.",
                status: "planned",
            },
            {
                slug: "fiedler",
                name: "fiedler",
                description:
                    "Construct a symmetric Fiedler matrix.",
                status: "planned",
            },
            {
                slug: "hadamard",
                name: "hadamard",
                description:
                    "Construct a Hadamard matrix.",
                status: "planned",
            },
            {
                slug: "hankel",
                name: "hankel",
                description:
                    "Construct a Hankel matrix.",
                status: "planned",
            },
            {
                slug: "helmert",
                name: "helmert",
                description:
                    "Construct a Helmert matrix.",
                status: "planned",
            },
            {
                slug: "hilbert",
                name: "hilbert",
                description:
                    "Construct a Hilbert matrix.",
                status: "planned",
            },
            {
                slug: "invhilbert",
                name: "invhilbert",
                description:
                    "Construct the inverse Hilbert matrix.",
                status: "planned",
            },
            {
                slug: "leslie",
                name: "leslie",
                description:
                    "Construct a Leslie matrix.",
                status: "planned",
            },
            {
                slug: "pascal",
                name: "pascal",
                description:
                    "Construct a Pascal matrix.",
                status: "planned",
            },
            {
                slug: "invpascal",
                name: "invpascal",
                description:
                    "Construct the inverse Pascal matrix.",
                status: "planned",
            },
            {
                slug: "toeplitz",
                name: "toeplitz",
                description:
                    "Construct a Toeplitz matrix.",
                status: "planned",
            },
        ],
    },
];

export function LinearAlgebraPage() {
    return (
        <main className="linear-algebra-page">
            <header className="linear-algebra-header">
                <div className="linear-algebra-eyebrow">
                    <span />
                    ONITHRASML · V0.3
                </div>

                <h1>Linear Algebra</h1>

                <p>
                    Numerical linear algebra tools for matrix
                    operations, linear systems, decompositions,
                    matrix functions, and structured matrices.
                </p>

                <div className="linear-algebra-meta">
                    <span>NUMERICAL COMPUTING</span>
                    <span>LINEAR ALGEBRA</span>
                    <span>SCIENTIFIC COMPUTING</span>
                </div>
            </header>

            <section className="linear-algebra-methods">
                {methodGroups.map((group) => (
                    <section
                        className="linear-algebra-group"
                        key={group.title}
                    >
                        <div className="linear-algebra-group-header">
                            <div>
                                <h2>{group.title}</h2>

                                <p>
                                    {group.description}
                                </p>
                            </div>

                            <span className="linear-algebra-group-count">
                                {String(
                                    group.methods.length
                                ).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="linear-algebra-method-list">
                            {group.methods.map((method) => (
                                <Link
                                    key={method.slug}
                                    to={`/docs/v0.3/modules/linear-algebra/${method.slug}`}
                                    className="linear-algebra-method"
                                >
                                    <div className="linear-algebra-method-main">
                                        <code>
                                            {method.name}()
                                        </code>

                                        <p>
                                            {method.description}
                                        </p>
                                    </div>

                                    <div className="linear-algebra-method-side">
                                        {method.status && (
                                            <span
                                                className={`linear-algebra-method-status linear-algebra-method-status-${method.status}`}
                                            >
                                                {method.status}
                                            </span>
                                        )}

                                        <span className="linear-algebra-method-arrow">
                                            →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </section>
        </main>
    );
}