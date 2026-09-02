import type { MethodDocumentation } from "../../docs/types";

export const inv: MethodDocumentation = {
    slug: "inv",

    name: "inv",

    category: "Basic Routines",

    title: "Matrix Inverse",

    description:
        "Compute the multiplicative inverse of a square matrix. The inverse matrix A⁻¹ satisfies A A⁻¹ = A⁻¹ A = I, where I is the identity matrix.",

    status: "planned",

    signature: "oml.linalg.inv(A)",

    parameters: [
        {
            name: "A",
            type: "array-like",
            description:
                "A square, non-singular matrix whose inverse is required.",
            required: true,
        },
    ],

    returns: {
        type: "2-D array",
        description:
            "The inverse of the input matrix A.",
    },

    formula: {
        title: "Matrix Inverse",
        expression: "AA^{-1}=A^{-1}A=I",
        explanation:
            "A matrix has an inverse when it is square and non-singular. The product of a matrix and its inverse is the identity matrix.",
    },

    examples: [
        {
            language: "python",
            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 3.0],
    [2.0, 4.0]
])

A_inv = oml.linalg.inv(A)

print(A_inv)`,
            output: `[
    [-2.0,  1.5],
    [ 1.0, -0.5]
]`,
            explanation:
                "The returned matrix is the inverse of A. Multiplying A by A_inv produces the identity matrix up to floating-point precision.",
        },
    ],

    implementation: [
        "OnithrasML exposes the inverse operation through its own linear algebra API.",
        "The underlying implementation may dispatch the computation to an optimized numerical backend such as SciPy/LAPACK or a BLAS-compatible C++ backend.",
        "The backend choice is an implementation detail and does not change the public OnithrasML interface.",
    ],

    numericalConsiderations: [
        "The input matrix must be square.",
        "A singular matrix does not have a finite inverse.",
        "Matrices that are close to singular can produce numerically sensitive results.",
        "For solving A x = b, using inv(A) followed by matrix multiplication is generally less preferable than using a dedicated solve operation.",
        "Floating-point results should be compared using an appropriate numerical tolerance rather than exact equality.",
    ],

    notes: [
        "The inverse operation is primarily intended for cases where the inverse matrix itself is explicitly required.",
        "For repeated linear-system solves with the same matrix, a factorization-based workflow can be more efficient.",
    ],

    warnings: [
        "Explicit matrix inversion can be more expensive and less numerically stable than directly solving a linear system.",
    ],

    errors: [
        "Non-square input matrices are invalid.",
        "Singular matrices cannot be inverted.",
        "Ill-conditioned matrices may produce inaccurate results because small numerical errors can be strongly amplified.",
    ],

    complexity: {
        time: "O(n³)",
        space: "O(n²)",
    },

    relatedMethods: [
        "solve",
        "det",
        "norm",
        "pinv",
    ],
};