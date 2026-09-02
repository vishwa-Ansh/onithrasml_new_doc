import type { MethodDocumentation } from "../../docs/types";

export const norm: MethodDocumentation = {
    slug: "norm",
    name: "oml.linalg.norm",
    category: "Basic Routines",
    title: "Vector and Matrix Norm",

    description:
        "Compute a vector or matrix norm. The norm provides a numerical measure of the magnitude of a vector or matrix and can be used to measure distance, error, matrix size, and numerical stability.",

    status: "planned",

    signature:
        "oml.linalg.norm(a, ord=None, axis=None, keepdims=False, check_finite=True)",

    parameters: [
        {
            name: "a",
            type: "array_like",
            shape: "(M,), (M, N), or higher-dimensional",
            description:
                "Input vector, matrix, or array. When axis is not specified, one-dimensional inputs are interpreted as vectors and two-dimensional inputs as matrices. Higher-dimensional inputs require an explicit axis configuration or a supported default norm operation.",
            required: true,
        },

        {
            name: "ord",
            type: "int | float | str | None",
            description:
                "Order of the norm. Supported values depend on whether the operation is a vector norm or matrix norm. Common values include None, 1, 2, -1, -2, inf, -inf, 'fro', and 'nuc'.",
            default: "None",
        },

        {
            name: "axis",
            type: "int | tuple[int, int] | None",
            description:
                "Axis or axes over which the norm is computed. An integer selects an axis for vector norms. A two-element tuple identifies the two axes containing a matrix for matrix norms. If None, the operation is inferred from the dimensionality of the input.",
            default: "None",
        },

        {
            name: "keepdims",
            type: "bool",
            description:
                "If True, the dimensions reduced by the norm operation are retained with size one. This allows the result to broadcast naturally against the original input.",
            default: "False",
        },

        {
            name: "check_finite",
            type: "bool",
            description:
                "If True, verify that the input contains only finite values before computing the norm. Disabling the check may improve performance but can produce unreliable results when NaN or infinite values are present.",
            default: "True",
        },
    ],

    returns: {
        name: "n",
        type: "float | ndarray",
        shape: "scalar or reduced shape",
        description:
            "The computed norm. A scalar is returned when the selected axes reduce the complete input. When operating over batches or selected axes, an array containing one norm for each remaining slice is returned.",
    },

    raises: [
        {
            error: "ValueError",
            description:
                "Raised when an unsupported norm order, invalid axis, or incompatible input shape is provided.",
        },

        {
            error: "ValueError",
            description:
                "Raised when a matrix-only norm such as 'fro' or 'nuc' is requested for an input that does not represent a matrix.",
        },

        {
            error: "LinAlgError",
            description:
                "Raised when a numerical linear-algebra operation required for the requested norm fails.",
        },
    ],

    formula: {
        title: "Vector p-Norm",

        expression:
            "||x||ₚ = (Σᵢ |xᵢ|ᵖ)¹ᐟᵖ",

        explanation:
            "The p-norm measures the magnitude of a vector. Different values of p produce different notions of magnitude. The most commonly used cases are the 1-norm, 2-norm, and infinity norm.",
    },

    examples: [
        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

x = np.array([
    3.0,
    4.0
])

# Default vector norm
n = oml.linalg.norm(x)

print("Vector:")
print(x)

print("\\nNorm:")
print(n)`,

            output: `Vector:
[3. 4.]

Norm:
5.0`,

            explanation:
                "For a vector, the default norm is the Euclidean (2-) norm. For [3, 4], the result is √(3² + 4²) = 5.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

x = np.array([
    -4.0,
    3.0,
    -2.0,
    1.0
])

l1 = oml.linalg.norm(x, ord=1)
l2 = oml.linalg.norm(x, ord=2)
linf = oml.linalg.norm(x, ord=np.inf)

print("L1 norm:")
print(l1)

print("\\nL2 norm:")
print(l2)

print("\\nInfinity norm:")
print(linf)`,

            output: `L1 norm:
10.0

L2 norm:
5.477225575051661

Infinity norm:
4.0`,

            explanation:
                "The L1 norm is the sum of absolute values, the L2 norm is the Euclidean magnitude, and the infinity norm is the largest absolute element.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 2.0],
    [3.0, 4.0]
])

fro = oml.linalg.norm(A, ord="fro")
spectral = oml.linalg.norm(A, ord=2)

print("Matrix:")
print(A)

print("\\nFrobenius norm:")
print(fro)

print("\\nSpectral norm:")
print(spectral)`,

            output: `Matrix:
[[1. 2.]
 [3. 4.]]

Frobenius norm:
5.477225575051661

Spectral norm:
5.464985704219043`,

            explanation:
                "The Frobenius norm is the square root of the sum of squared matrix elements. The matrix 2-norm is the largest singular value.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, -2.0],
    [3.0,  4.0]
])

row_max = oml.linalg.norm(
    A,
    ord=np.inf
)

column_max = oml.linalg.norm(
    A,
    ord=1
)

print("Matrix infinity norm:")
print(row_max)

print("\\nMatrix 1-norm:")
print(column_max)`,

            output: `Matrix infinity norm:
7.0

Matrix 1-norm:
6.0`,

            explanation:
                "For matrices, the infinity norm is the maximum absolute row sum, while the 1-norm is the maximum absolute column sum.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

x = np.array([
    [3.0, 4.0],
    [5.0, 12.0]
])

# Compute the norm along each row
row_norms = oml.linalg.norm(
    x,
    axis=1
)

print("Input:")
print(x)

print("\\nRow norms:")
print(row_norms)`,

            output: `Input:
[[ 3.  4.]
 [ 5. 12.]]

Row norms:
[ 5. 13.]`,

            explanation:
                "Setting axis=1 computes a vector norm independently for each row.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

x = np.array([
    [3.0, 4.0],
    [5.0, 12.0]
])

row_norms = oml.linalg.norm(
    x,
    axis=1,
    keepdims=True
)

print("Input shape:")
print(x.shape)

print("\\nNorm shape:")
print(row_norms.shape)

print("\\nRow norms:")
print(row_norms)`,

            output: `Input shape:
(2, 2)

Norm shape:
(2, 1)

Row norms:
[[ 5.]
 [13.]]`,

            explanation:
                "keepdims=True preserves the reduced axis with size one, making the result suitable for broadcasting against the original array.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 2.0],
    [3.0, 4.0]
])

fro = oml.linalg.norm(A, ord="fro")

manual = np.sqrt(
    np.sum(np.abs(A) ** 2)
)

print("Computed norm:")
print(fro)

print("\\nManual calculation:")
print(manual)

print("\\nEqual:")
print(np.isclose(fro, manual))`,

            output: `Computed norm:
5.477225575051661

Manual calculation:
5.477225575051661

Equal:
True`,

            explanation:
                "The Frobenius norm can be verified directly from its mathematical definition.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])

# Nuclear norm
nuclear = oml.linalg.norm(
    A,
    ord="nuc"
)

print("Nuclear norm:")
print(nuclear)`,

            output: `Nuclear norm:
9.525518091565107`,

            explanation:
                "The nuclear norm is the sum of the singular values of a matrix and is commonly used in matrix optimization and low-rank problems.",
        },
    ],

    implementation: [
        "Vector norms are computed from the selected vector order and absolute element magnitudes.",
        "The Euclidean vector norm is computed using a numerically stable accumulation strategy.",
        "Matrix norms such as the 1-norm and infinity norm are computed from column and row absolute sums.",
        "The Frobenius norm is computed from the square root of the sum of squared magnitudes.",
        "The matrix 2-norm is obtained from the largest singular value.",
        "The matrix -2 norm corresponds to the smallest singular value.",
        "The nuclear norm is computed as the sum of singular values.",
        "Axis selection is applied before the final reduction so that batched and multidimensional inputs can be handled consistently.",
    ],

    numericalConsiderations: [
        "The 2-norm of a matrix requires singular-value information and is generally more expensive than simple element-wise or sum-based norms.",
        "The nuclear norm requires singular-value computation and can therefore be significantly more expensive than the Frobenius norm.",
        "For floating-point input, very small differences between mathematically equivalent norm calculations can occur because of rounding.",
        "For complex-valued arrays, magnitudes are computed using absolute values rather than treating real and imaginary components independently.",
        "When comparing norms numerically, np.isclose() or np.allclose() should generally be preferred over exact equality.",
        "For very large arrays, accumulation strategy can affect numerical precision and performance.",
    ],

    notes: [
        "For a vector, ord=1 computes the sum of absolute values.",
        "For a vector, ord=2 computes the Euclidean norm.",
        "For a vector, ord=np.inf computes the maximum absolute element.",
        "For a matrix, ord=1 computes the maximum absolute column sum.",
        "For a matrix, ord=np.inf computes the maximum absolute row sum.",
        "For a matrix, ord='fro' computes the Frobenius norm.",
        "For a matrix, ord='nuc' computes the nuclear norm.",
        "Norm orders less than or equal to zero are useful in some numerical applications but do not always satisfy the mathematical definition of a norm.",
        "The Frobenius and nuclear norms are matrix-specific operations.",
    ],

    warnings: [
        "Matrix-only norm orders should not be used with vector inputs.",
        "Disabling check_finite can improve performance but may allow NaN or infinite values to propagate through the calculation.",
        "A norm is not a substitute for a condition number when assessing numerical stability.",
    ],

    errors: [
        "Invalid axis values are rejected.",
        "Unsupported norm orders are rejected.",
        "Matrix-specific orders require a valid matrix-shaped input.",
        "Invalid numerical values may produce unreliable results when check_finite=False.",
    ],

    complexity: {
        time: "O(M) for vector norms; O(MN) for basic matrix norms; SVD-based norms may require O(min(M,N)MN)",
        space: "O(1) additional space for basic reductions; SVD-based norms require additional workspace",
    },

    relatedMethods: [
        "oml.linalg.svd",
        "oml.linalg.inv",
        "oml.linalg.solve",
        "oml.linalg.det",
    ],
};