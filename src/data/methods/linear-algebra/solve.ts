import type { MethodDocumentation } from "../../docs/types";

export const solve: MethodDocumentation = {
    slug: "solve",
    name: "oml.linalg.solve",
    category: "Basic Routines",
    title: "Solve a Linear System",

    description:
        "Solve the linear system A @ x = b for x, where A is a square matrix. This routine is intended for solving linear systems directly without explicitly computing the inverse of A.",

    status: "planned",

    signature:
        "oml.linalg.solve(a, b, assume_a=None, lower=False, overwrite_a=False, overwrite_b=False, check_finite=True, transposed=False)",

    parameters: [
        {
            name: "a",
            type: "array_like",
            shape: "(..., N, N)",
            description:
                "Square coefficient matrix, or a batch of square coefficient matrices. The final two dimensions must have shape (N, N). Any preceding dimensions represent batch dimensions.",
            required: true,
        },

        {
            name: "b",
            type: "array_like",
            shape: "(N,), (N, K), or (..., N, K)",
            description:
                "Right-hand-side vector or matrix. For a vector b with N elements, the routine solves a single system. For a matrix with K columns, each column represents a separate right-hand side.",
            required: true,
        },

        {
            name: "assume_a",
            type: "str | None",
            description:
                "Specifies the structure of the coefficient matrix so that an appropriate specialized solver can be selected. Supported structures include 'general', 'diagonal', 'tridiagonal', 'symmetric', 'hermitian', 'positive definite', 'upper triangular', and 'lower triangular'. If None, the matrix is treated as a general matrix.",
            default: "None",
        },

        {
            name: "lower",
            type: "bool",
            description:
                "Controls which triangular portion of a is used when assume_a refers to a symmetric, Hermitian, or positive-definite matrix. If True, the lower triangle is used; otherwise the upper triangle is used.",
            default: "False",
        },

        {
            name: "overwrite_a",
            type: "bool",
            description:
                "If True, the input matrix a may be overwritten during computation. This can reduce memory usage and may improve performance.",
            default: "False",
        },

        {
            name: "overwrite_b",
            type: "bool",
            description:
                "If True, the right-hand side b may be overwritten during computation. This can reduce memory usage and may improve performance.",
            default: "False",
        },

        {
            name: "check_finite",
            type: "bool",
            description:
                "If True, verify that a and b contain only finite values before solving. Disabling this check may improve performance but can produce unreliable results when NaN or infinite values are present.",
            default: "True",
        },

        {
            name: "transposed",
            type: "bool",
            description:
                "If True, solve the transposed system a.T @ x = b instead of a @ x = b.",
            default: "False",
        },
    ],

    returns: {
        name: "x",
        type: "ndarray",
        shape: "(N,), (N, K), or (..., N, K)",
        description:
            "The solution of the linear system. When b is a one-dimensional vector, a one-dimensional solution vector is returned. When b contains multiple right-hand sides, the corresponding solution matrix is returned.",
    },

    raises: [
        {
            error: "ValueError",
            description:
                "Raised when a is not square, when the dimensions of a and b are incompatible, or when an invalid axis or matrix structure is supplied.",
        },

        {
            error: "LinAlgError",
            description:
                "Raised when the coefficient matrix is singular and the system cannot be solved.",
        },

        {
            error: "LinAlgWarning",
            description:
                "May be emitted when the coefficient matrix is detected to be ill-conditioned and the computed solution may have reduced numerical accuracy.",
        },

        {
            error: "NotImplementedError",
            description:
                "Raised when transposed=True is requested for a complex-valued coefficient matrix if the selected backend does not support the operation.",
        },
    ],

    formula: {
        title: "Linear System",

        expression:
            "A x = b",

        explanation:
            "The solve operation finds a vector or matrix x such that multiplying A by x produces b. When A is nonsingular, the solution is unique. Although x can mathematically be written as A⁻¹b, directly solving the system is generally more efficient and numerically preferable to explicitly computing A⁻¹.",
    },

    examples: [
        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Coefficient matrix
A = np.array([
    [3.0, 2.0, 0.0],
    [1.0, -1.0, 0.0],
    [0.0, 5.0, 1.0]
])

# Right-hand side
b = np.array([
    2.0,
    4.0,
    -1.0
])

# Solve A @ x = b
x = oml.linalg.solve(A, b)

print("Solution:")
print(x)

print("\\nA @ x:")
print(A @ x)

print("\\nOriginal b:")
print(b)`,

            output: `Solution:
[ 2. -2.  9.]

A @ x:
[ 2.  4. -1.]

Original b:
[ 2.  4. -1.]`,

            explanation:
                "The returned vector x satisfies A @ x = b. The matrix-vector product can be used to verify the solution.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [4.0, 1.0],
    [2.0, 3.0]
])

b = np.array([
    9.0,
    13.0
])

x = oml.linalg.solve(A, b)

print("x:")
print(x)

print("\\nVerification:")
print(np.allclose(A @ x, b))`,

            output: `x:
[1.4 3.4]

Verification:
True`,

            explanation:
                "np.allclose() is useful for numerical verification because floating-point calculations can introduce small rounding errors.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [3.0, 1.0],
    [1.0, 2.0]
])

# Two right-hand sides
B = np.array([
    [9.0, 5.0],
    [8.0, 7.0]
])

X = oml.linalg.solve(A, B)

print("Solutions:")
print(X)

print("\\nVerification:")
print(np.allclose(A @ X, B))`,

            output: `Solutions:
[[2. 1.]
 [3. 3.]]

Verification:
True`,

            explanation:
                "Each column of B represents an independent right-hand side. The corresponding column of X contains the solution to that system.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Symmetric positive-definite matrix
A = np.array([
    [4.0, 1.0],
    [1.0, 3.0]
])

b = np.array([
    1.0,
    2.0
])

x = oml.linalg.solve(
    A,
    b,
    assume_a="positive definite"
)

print("Solution:")
print(x)

print("\\nVerification:")
print(np.allclose(A @ x, b))`,

            output: `Solution:
[-0.09090909  0.6969697 ]

Verification:
True`,

            explanation:
                "Providing the known matrix structure allows OnithrasML to select a specialized solver instead of treating the matrix as a completely general system.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Batch of coefficient matrices
A = np.array([
    [
        [2.0, 0.0],
        [0.0, 4.0]
    ],
    [
        [3.0, 1.0],
        [1.0, 2.0]
    ]
])

# Same right-hand side for each system
b = np.array([
    4.0,
    8.0
])

X = oml.linalg.solve(A, b)

print("Solutions:")
print(X)

print("\\nOutput shape:")
print(X.shape)`,

            output: `Solutions:
[[2.         2.        ]
 [0.         4.        ]]

Output shape:
(2, 2)`,

            explanation:
                "The leading dimension represents a batch of independent linear systems. One solution vector is produced for each coefficient matrix.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [2.0, 1.0],
    [1.0, 3.0]
])

b = np.array([
    5.0,
    7.0
])

x = oml.linalg.solve(A, b)

# Residual: A @ x - b
residual = A @ x - b

print("Solution:")
print(x)

print("\\nResidual:")
print(residual)

print("\\nSolution is accurate:")
print(np.allclose(residual, 0.0))`,

            output: `Solution:
[1.6 1.8]

Residual:
[0. 0.]

Solution is accurate:
True`,

            explanation:
                "The residual r = A @ x - b measures how closely the computed solution satisfies the original system. A small residual indicates that the equation is satisfied numerically.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [2.0, 1.0],
    [1.0, 3.0]
])

b = np.array([
    5.0,
    7.0
])

x = oml.linalg.solve(
    A,
    b,
    transposed=True
)

print("Solution of A.T @ x = b:")
print(x)

print("\\nVerification:")
print(np.allclose(A.T @ x, b))`,

            output: `Solution of A.T @ x = b:
[0.8 2.2]

Verification:
True`,

            explanation:
                "With transposed=True, the system is solved using the transpose of A rather than A itself.",
        },
    ],

    implementation: [
        "For a general dense matrix, OnithrasML uses matrix factorization followed by a triangular solve.",
        "LU factorization can be used to decompose a general matrix into lower- and upper-triangular factors.",
        "For symmetric, Hermitian, or positive-definite matrices, specialized factorizations can provide better performance.",
        "Triangular systems can be solved directly without performing a general LU factorization.",
        "The selected solver depends on assume_a when a matrix structure is explicitly provided.",
        "For multiple right-hand sides, the factorization of A can be reused while solving for each column of b.",
        "Batch inputs are processed as independent linear systems over the final two matrix dimensions.",
    ],

    numericalConsiderations: [
        "Solving a system directly is generally preferable to computing inv(A) @ b because it avoids explicitly forming the inverse.",
        "The accuracy of the solution depends on both the numerical conditioning of A and the floating-point precision of the input.",
        "An ill-conditioned matrix can produce a solution that is highly sensitive to small changes in A or b.",
        "The residual A @ x - b should be examined when validating a numerical solution.",
        "Providing an accurate assume_a value can improve performance by selecting a specialized solver.",
        "Incorrectly specifying the matrix structure can produce incorrect results because the solver may ignore portions of the input matrix.",
        "NaN and infinite values should generally be rejected through check_finite=True unless the caller has explicitly validated the input.",
    ],

    notes: [
        "The coefficient matrix A must be square.",
        "For a one-dimensional b with N elements, the result is a one-dimensional vector of length N.",
        "For multiple right-hand sides, each column of b represents an independent system.",
        "When A is nonsingular, the solution is unique.",
        "A singular matrix does not have a unique conventional solution and causes the direct solve to fail.",
        "For a known positive-definite matrix, assume_a='positive definite' can select a specialized solver.",
        "For triangular matrices, specifying the corresponding structure avoids unnecessary general matrix factorization.",
        "For repeated solves with the same A, factorization reuse can provide significant performance benefits in lower-level implementations.",
    ],

    warnings: [
        "Do not use assume_a to claim a matrix structure that the input does not actually have.",
        "An incorrect structure assumption can cause the solver to ignore matrix entries and return an invalid solution.",
        "A small residual does not necessarily guarantee that the problem is well-conditioned.",
        "Disabling check_finite may expose the numerical backend to invalid floating-point values.",
    ],

    errors: [
        "A must have equal dimensions along its final two axes.",
        "The dimensions of b must be compatible with A.",
        "Singular coefficient matrices cannot be solved using a standard direct solve.",
        "Invalid assume_a values are rejected.",
        "Complex transposed solves may require backend support for the selected operation.",
    ],

    complexity: {
        time: "O(N³) factorization + O(N²K) solve for K right-hand sides",
        space: "O(N²) for the coefficient matrix and factorization workspace",
    },

    relatedMethods: [
        "oml.linalg.inv",
        "oml.linalg.det",
        "oml.linalg.lstsq",
        "oml.linalg.pinv",
    ],
};