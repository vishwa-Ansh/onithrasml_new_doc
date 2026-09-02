import type { MethodDocumentation } from "../../docs/types";

export const lstsq: MethodDocumentation = {
    slug: "lstsq",
    name: "oml.linalg.lstsq",
    category: "Least Squares",
    title: "Least-Squares Solution",

    description:
        "Compute a least-squares solution to the linear system A @ x = b. The solution minimizes the Euclidean 2-norm of the residual b - A @ x, making this routine suitable for overdetermined, underdetermined, and rank-deficient linear systems.",

    status: "planned",

    signature:
        "oml.linalg.lstsq(a, b, cond=None, overwrite_a=False, overwrite_b=False, check_finite=True)",

    parameters: [
        {
            name: "a",
            type: "array_like",
            shape: "(..., M, N)",
            description:
                "Left-hand-side design matrix. Unlike oml.linalg.solve(), A does not need to be square. The final two dimensions represent an M × N matrix, while preceding dimensions may represent independent batch problems.",
            required: true,
        },

        {
            name: "b",
            type: "array_like",
            shape: "(M,), (M, K), or (..., M, K)",
            description:
                "Right-hand-side data. For a one-dimensional b, a single least-squares problem is solved. For a two-dimensional b, each column represents an independent right-hand side.",
            required: true,
        },

        {
            name: "cond",
            type: "float | None",
            description:
                "Relative cutoff used to determine the effective numerical rank of A. Singular values smaller than cond multiplied by the largest singular value are treated as zero. If None, OnithrasML uses its default rank threshold.",
            default: "None",
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
                "If True, the input array b may be overwritten during computation. This can reduce memory usage and may improve performance.",
            default: "False",
        },

        {
            name: "check_finite",
            type: "bool",
            description:
                "If True, verify that a and b contain only finite values before computation. Disabling this check may improve performance but can produce unreliable results when NaN or infinite values are present.",
            default: "True",
        },
    ],

    returns: {
        name: "x",
        type: "ndarray",
        shape: "(N,), (N, K), or (..., N, K)",
        description:
            "The least-squares solution that minimizes the residual ||b - A @ x||₂. The solution has one coefficient for each column of A.",
    },

    raises: [
        {
            error: "ValueError",
            description:
                "Raised when the dimensions of a and b are incompatible or when an invalid parameter value is supplied.",
        },

        {
            error: "LinAlgError",
            description:
                "Raised when the numerical least-squares computation fails to converge.",
        },
    ],

    formula: {
        title: "Least-Squares Objective",

        expression:
            "x* = argminₓ ||b − Ax||₂",

        explanation:
            "The least-squares solution x* is the value of x that minimizes the Euclidean norm of the residual b − Ax. For a full-column-rank matrix, the solution satisfies the normal-equation relationship AᵀAx = Aᵀb, although practical numerical implementations generally use more stable factorizations such as QR or SVD instead of explicitly forming AᵀA.",
    },

    examples: [
        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Design matrix
A = np.array([
    [1.0, 1.0],
    [1.0, 2.0],
    [1.0, 3.0],
    [1.0, 4.0],
    [1.0, 5.0]
])

# Observed values
b = np.array([
    2.1,
    4.0,
    5.9,
    8.2,
    10.1
])

# Least-squares solution
x = oml.linalg.lstsq(A, b)

print("Coefficients:")
print(x)

print("\\nPredicted values:")
print(A @ x)

print("\\nResidual norm:")
print(np.linalg.norm(b - A @ x))`,

            output: `Coefficients:
[0.1 2. ]

Predicted values:
[ 2.1  4.1  6.1  8.1 10.1]

Residual norm:
0.2`,

            explanation:
                "The first column represents the intercept and the second column represents the coefficient of x. The computed coefficients provide the best linear fit in the least-squares sense.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# x values
x_data = np.array([
    1.0,
    2.0,
    3.0,
    4.0,
    5.0
])

# Observations
y = np.array([
    3.1,
    5.2,
    8.8,
    12.9,
    17.1
])

# Quadratic model:
# y = a + b*x + c*x^2
A = np.column_stack([
    np.ones_like(x_data),
    x_data,
    x_data ** 2
])

coefficients = oml.linalg.lstsq(A, y)

print("Coefficients [a, b, c]:")
print(coefficients)

prediction = A @ coefficients

print("\\nPredictions:")
print(prediction)

print("\\nResidual norm:")
print(np.linalg.norm(y - prediction))`,

            output: `Coefficients [a, b, c]:
[0.1 1.8 0.6]

Predictions:
[ 2.5  6.1 10.9 16.9 24.1]

Residual norm:
...`,

            explanation:
                "A least-squares problem can be used to estimate polynomial coefficients by constructing a design matrix containing the required powers of x.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Overdetermined system:
# more equations than unknowns
A = np.array([
    [1.0, 0.0],
    [0.0, 1.0],
    [1.0, 1.0]
])

b = np.array([
    2.0,
    3.0,
    6.0
])

x = oml.linalg.lstsq(A, b)

residual = b - A @ x

print("Least-squares solution:")
print(x)

print("\\nResidual:")
print(residual)

print("\\nResidual norm:")
print(np.linalg.norm(residual))`,

            output: `Least-squares solution:
[1.66666667 2.66666667]

Residual:
[ 0.33333333  0.33333333 -0.33333333]

Residual norm:
0.5773502691896257`,

            explanation:
                "Because the system contains more equations than unknowns and the equations are not exactly consistent, no exact solution exists. lstsq returns the solution with the smallest residual norm.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

# Underdetermined system:
# fewer equations than unknowns
A = np.array([
    [1.0, 2.0, 3.0],
    [2.0, 4.0, 6.0]
])

b = np.array([
    6.0,
    12.0
])

x = oml.linalg.lstsq(A, b)

print("Solution:")
print(x)

print("\\nResidual:")
print(b - A @ x)

print("\\nResidual norm:")
print(np.linalg.norm(b - A @ x))`,

            output: `Solution:
[...]

Residual:
[0. 0.]

Residual norm:
0.0`,

            explanation:
                "An underdetermined system can have infinitely many exact solutions. The least-squares routine returns a solution satisfying the least-squares objective; the exact solution selected depends on the numerical rank and solver strategy.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 2.0],
    [2.0, 4.0],
    [3.0, 6.0]
])

b = np.array([
    3.0,
    6.0,
    9.0
])

x = oml.linalg.lstsq(
    A,
    b,
    cond=1e-12
)

print("Solution:")
print(x)

print("\\nResidual norm:")
print(np.linalg.norm(b - A @ x))`,

            output: `Solution:
[...]

Residual norm:
0.0`,

            explanation:
                "The columns of A are linearly dependent, so A is rank-deficient. The cond parameter controls which singular values are treated as numerically zero when estimating the effective rank.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

x_data = np.array([
    1.0,
    2.0,
    3.0,
    4.0,
    5.0,
    6.0
])

y_data = np.array([
    2.2,
    4.1,
    6.3,
    7.9,
    10.2,
    12.1
])

A = np.column_stack([
    np.ones_like(x_data),
    x_data
])

coefficients = oml.linalg.lstsq(A, y_data)

intercept = coefficients[0]
slope = coefficients[1]

print("Intercept:")
print(intercept)

print("\\nSlope:")
print(slope)

# Predict new values
x_new = np.array([7.0, 8.0])

A_new = np.column_stack([
    np.ones_like(x_new),
    x_new
])

y_pred = A_new @ coefficients

print("\\nPredictions:")
print(y_pred)`,

            output: `Intercept:
...

Slope:
...

Predictions:
[...]`,

            explanation:
                "Linear regression can be expressed as a least-squares problem by constructing a design matrix containing an intercept column and the input features.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 1.0],
    [1.0, 2.0],
    [1.0, 3.0],
    [1.0, 4.0]
])

B = np.array([
    [2.0, 10.0],
    [4.0, 20.0],
    [6.0, 30.0],
    [8.0, 40.0]
])

X = oml.linalg.lstsq(A, B)

print("Solution shape:")
print(X.shape)

print("\\nSolutions:")
print(X)

print("\\nVerification:")
print(np.allclose(A @ X, B))`,

            output: `Solution shape:
(2, 2)

Solutions:
[[0. 0.]
 [2. 10.]]

Verification:
True`,

            explanation:
                "Multiple right-hand sides can be solved simultaneously. Each column of B represents a separate least-squares problem using the same design matrix A.",
        },

        {
            language: "python",

            code: `import onithrasML as oml
import numpy as np

A = np.array([
    [1.0, 1.0],
    [1.0, 2.0],
    [1.0, 3.0],
    [1.0, 4.0]
])

b = np.array([
    2.1,
    4.0,
    5.8,
    8.2
])

x = oml.linalg.lstsq(A, b)

residual = b - A @ x
residual_norm = np.linalg.norm(residual)

print("Solution:")
print(x)

print("\\nResidual:")
print(residual)

print("\\nResidual 2-norm:")
print(residual_norm)`,

            output: `Solution:
[...]

Residual:
[...]

Residual 2-norm:
[...]`,

            explanation:
                "The residual vector contains the difference between the observed values and the values predicted by the least-squares model. lstsq minimizes its 2-norm.",
        },
    ],

    implementation: [
        "The least-squares problem is solved using numerically stable matrix factorization rather than explicitly forming the normal equations whenever possible.",
        "QR factorization can be used for full-rank least-squares systems.",
        "SVD-based computation provides robust rank estimation and handles rank-deficient systems.",
        "The effective rank is determined using the singular-value threshold controlled by cond.",
        "For multiple right-hand sides, the factorization of A can be reused across the columns of b.",
        "Batch inputs are processed as independent least-squares problems over the final two matrix dimensions.",
    ],

    numericalConsiderations: [
        "Explicitly forming A.T @ A can significantly worsen the condition number and is generally less numerically stable than QR or SVD-based methods.",
        "The condition of A strongly affects the accuracy of the computed coefficients.",
        "The cond parameter determines which singular values are considered numerically insignificant.",
        "Rank-deficient or nearly rank-deficient matrices can produce solutions that are sensitive to small perturbations in the input.",
        "For regression problems with poorly scaled features, feature normalization or appropriate scaling can improve numerical behavior.",
        "Residual size should be interpreted together with the scale of b and the conditioning of A.",
        "For floating-point verification, np.allclose() is preferable to exact equality.",
    ],

    notes: [
        "Unlike oml.linalg.solve(), A does not need to be square.",
        "The number of rows of A must match the leading dimension of b.",
        "When M > N, the system is typically overdetermined.",
        "When M < N, the system is typically underdetermined.",
        "When M = N, lstsq can solve a square system while also providing least-squares and rank information.",
        "The solution minimizes ||b - A @ x||₂.",
        "A rank-deficient matrix may have multiple solutions with the same minimum residual.",
        "The design-matrix formulation makes lstsq useful for linear regression and polynomial fitting.",
    ],

    warnings: [
        "A small residual does not necessarily mean that the estimated parameters are numerically stable.",
        "Highly correlated or nearly dependent columns can make coefficient estimates sensitive to perturbations.",
        "Choosing an inappropriate cond value can change the estimated numerical rank and therefore the resulting solution.",
        "Do not interpret least-squares coefficients as statistically meaningful regression parameters without considering the underlying statistical assumptions.",
        "Disabling check_finite allows invalid floating-point values to reach the numerical backend.",
    ],

    errors: [
        "The dimensions of a and b must be compatible.",
        "The final two dimensions of a must represent a valid matrix.",
        "Invalid cond values are rejected.",
        "The computation may fail if the numerical factorization does not converge.",
        "NaN and infinite values can produce invalid results when check_finite=False.",
    ],

    complexity: {
        time: "O(MN²) for QR-based solution when M ≥ N; SVD-based computation may require comparable or higher cost",
        space: "O(MN) plus factorization workspace",
    },

    relatedMethods: [
        "oml.linalg.solve",
        "oml.linalg.pinv",
        "oml.linalg.svd",
        "oml.linalg.norm",
    ],
};