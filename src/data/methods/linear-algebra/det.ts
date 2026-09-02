import type { MethodDocumentation } from "../../docs/types";

export const det: MethodDocumentation = {
    slug: "det",
    name: "oml.linalg.det",
    category: "Basic Routines",
    title: "Matrix Determinant",

    description:
        "Compute the determinant of a square matrix. The determinant is a scalar value associated with a square matrix and provides important information about matrix singularity, invertibility, and geometric scaling.",

    status: "planned",

    signature:
        "oml.linalg.det(a, overwrite_a=False, check_finite=True)",

    parameters: [
        {
            name: "a",
            type: "array_like",
            shape: "(..., M, M)",
            description:
                "Input matrix or batch of matrices for which the determinant is computed. The final two dimensions must form square matrices of shape (M, M). Any preceding dimensions are treated as batch dimensions.",
            required: true,
        },
        {
            name: "overwrite_a",
            type: "bool",
            description:
                "If True, OnithrasML may overwrite the input array during computation. This can reduce memory usage and may improve performance, but the original input array should not be relied upon after the operation.",
            default: "False",
        },
        {
            name: "check_finite",
            type: "bool",
            description:
                "If True, verify that the input contains only finite values before computation. Disabling this check may improve performance, but NaN or infinite values can produce invalid numerical results or unexpected behavior.",
            default: "True",
        },
    ],

    returns: {
        name: "det",
        type: "float | complex | ndarray",
        shape: "(...)",
        description:
            "The determinant of the input matrix. For a single matrix, a scalar is returned. For batched input with shape (..., M, M), one determinant is returned for every M × M matrix slice, producing an output with shape (...).",
    },

    raises: [
        {
            error: "ValueError",
            description:
                "Raised when the input does not have a valid square matrix shape, or when the final two dimensions do not have equal size.",
        },
        {
            error: "LinAlgError",
            description:
                "Raised when the determinant computation fails because of an invalid or unsupported matrix operation.",
        },
    ],

    formula: {
        title: "Determinant",

        expression:
            "det(A) = |A|",

        explanation:
            "The determinant maps a square matrix to a scalar. A determinant of zero indicates that the matrix is singular and therefore does not have a conventional inverse. A non-zero determinant indicates that the matrix is nonsingular.",
    },

    examples: [
        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Create a square matrix
A = np.array([
    [1.0, 2.0],
    [3.0, 4.0]
])

# Compute the determinant
det_A = oml.linalg.det(A)

print("Matrix:")
print(A)

print("\\nDeterminant:")
print(det_A)`,

            output: `Matrix:
[[1. 2.]
 [3. 4.]]

Determinant:
-2.0`,

            explanation:
                "For a 2 × 2 matrix, the determinant is calculated as (a × d) − (b × c). Therefore, det(A) = (1 × 4) − (2 × 3) = -2.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Singular matrix
A = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0]
])

det_A = oml.linalg.det(A)

print("Determinant:")
print(det_A)

print("\\nIs singular:")
print(np.isclose(det_A, 0.0))`,

            output: `Determinant:
0.0

Is singular:
True`,

            explanation:
                "The rows of this matrix are linearly dependent, so its determinant is zero. A zero determinant indicates a singular matrix.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Nonsingular matrix
A = np.array([
    [0.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0]
])

det_A = oml.linalg.det(A)

print("Matrix:")
print(A)

print("\\nDeterminant:")
print(det_A)`,

            output: `Matrix:
[[0. 2. 3.]
 [4. 5. 6.]
 [7. 8. 9.]]

Determinant:
3.0`,

            explanation:
                "This matrix is nonsingular because its determinant is non-zero.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Batch of 2 × 2 matrices
A = np.array([
    [
        [1.0, 2.0],
        [3.0, 4.0]
    ],
    [
        [5.0, 6.0],
        [7.0, 8.0]
    ],
    [
        [2.0, 0.0],
        [0.0, 3.0]
    ]
])

det_A = oml.linalg.det(A)

print("Input shape:")
print(A.shape)

print("\\nDeterminants:")
print(det_A)

print("\\nOutput shape:")
print(det_A.shape)`,

            output: `Input shape:
(3, 2, 2)

Determinants:
[-2. -2.  6.]

Output shape:
(3,)`,

            explanation:
                "The final two dimensions represent each 2 × 2 matrix. The first dimension is treated as the batch dimension, so one determinant is produced for each matrix.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Batch with two batch dimensions
A = np.array([
    [
        [[1.0, 2.0],
         [3.0, 4.0]],

        [[5.0, 6.0],
         [7.0, 8.0]]
    ],
    [
        [[2.0, 0.0],
         [0.0, 3.0]],

        [[4.0, 1.0],
         [2.0, 5.0]]
    ]
])

det_A = oml.linalg.det(A)

print("Input shape:")
print(A.shape)

print("\\nDeterminants:")
print(det_A)

print("\\nOutput shape:")
print(det_A.shape)`,

            output: `Input shape:
(2, 2, 2, 2)

Determinants:
[[-2. -2.]
 [ 6. 18.]]

Output shape:
(2, 2)`,

            explanation:
                "When the input has shape (P, Q, M, M), OnithrasML treats every M × M slice as an independent matrix and returns an array of shape (P, Q).",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [4.0, 0.0, 0.0],
    [0.0, 5.0, 0.0],
    [0.0, 0.0, 6.0]
])

det_A = oml.linalg.det(A)

expected = 4.0 * 5.0 * 6.0

print("Computed determinant:")
print(det_A)

print("\\nExpected determinant:")
print(expected)

print("\\nMatches:")
print(np.isclose(det_A, expected))`,

            output: `Computed determinant:
120.0

Expected determinant:
120.0

Matches:
True`,

            explanation:
                "For a diagonal matrix, the determinant is the product of the diagonal elements.",
        },
    ],

    implementation: [
        "For dense matrices, OnithrasML computes the determinant using an LU factorization.",
        "The determinant is obtained from the diagonal elements of the resulting upper-triangular factor.",
        "Row permutations introduced during factorization are accounted for when determining the sign of the determinant.",
        "For batched input, the same determinant operation is applied independently to every matrix represented by the final two dimensions.",
    ],

    numericalConsiderations: [
        "The determinant can become extremely large or extremely small for matrices with large dynamic ranges.",
        "Floating-point round-off can produce a very small non-zero value for a matrix that is mathematically singular.",
        "Use np.isclose() or np.allclose() rather than direct equality when testing whether a floating-point determinant is zero.",
        "A determinant close to zero can indicate that a matrix is singular or poorly conditioned, but determinant magnitude alone is not a reliable condition-number measure.",
        "For solving linear systems, oml.linalg.solve() is generally preferable to explicitly computing a determinant or inverse.",
    ],

    notes: [
        "The final two dimensions of the input must represent square matrices.",
        "For a triangular matrix, the determinant is the product of its diagonal elements.",
        "For a diagonal matrix, the determinant is also the product of its diagonal elements.",
        "det(A @ B) = det(A) × det(B) for square matrices of compatible size.",
        "det(Aᵀ) = det(A).",
        "det(A⁻¹) = 1 / det(A) when A is nonsingular.",
        "A zero determinant means that the matrix is singular.",
    ],

    warnings: [
        "Disabling check_finite may improve performance but allows NaN and infinite values to reach the numerical backend.",
        "Do not use determinant values as the sole test for numerical matrix stability.",
    ],

    errors: [
        "Input matrices must be square.",
        "The final two dimensions must have the same size.",
        "Invalid numerical values may cause unreliable results when check_finite=False.",
    ],

    complexity: {
        time: "O(M³) per matrix",
        space: "O(M²) per matrix",
    },

    relatedMethods: [
        "oml.linalg.inv",
        "oml.linalg.solve",
        "oml.linalg.norm",
        "oml.linalg.pinv",
    ],
};