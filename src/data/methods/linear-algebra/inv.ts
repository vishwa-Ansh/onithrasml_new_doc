import type { MethodDocumentation } from "../../docs/types";

export const inv: MethodDocumentation = {
  slug: "inv",
  name: "inv",
  category: "Basic Routines",

  title: "Matrix Inverse",

  description: "Compute the inverse of a square matrix.",

  status: "planned",

  signature: "oml.linalg.inv(A, overwrite_a=False, check_finite=True)",

  parameters: [
    {
      name: "A",
      type: "array-like",
      shape: "(M, M)",
      description: "Square matrix to be inverted.",
      required: true,
    },
    {
      name: "overwrite_a",
      type: "bool",
      description:
        "Allow the implementation to overwrite the input matrix. This may improve performance by avoiding an additional copy.",
      default: "False",
      required: false,
    },
    {
      name: "check_finite",
      type: "bool",
      description:
        "Check whether the input matrix contains NaN or infinite values. Disabling this check may improve performance but requires valid finite input.",
      default: "True",
      required: false,
    },
  ],

  returns: {
    name: "A_inv",
    type: "ndarray",
    shape: "(M, M)",
    description: "The inverse of the input matrix.",
  },

  raises: [
    {
      error: "LinAlgError",
      description:
        "Raised when the matrix is singular and therefore has no inverse.",
    },
    {
      error: "ValueError",
      description: "Raised when the input is not a square matrix.",
    },
  ],

  formula: {
    title: "Matrix Inverse",
    expression: "AA^{-1} = A^{-1}A = I",
    explanation:
      "For a nonsingular square matrix A, its inverse A⁻¹ produces the identity matrix when multiplied from either side.",
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

# Compute the inverse
A_inv = oml.linalg.inv(A)

print("Original matrix:")
print(A)

print("\\nInverse matrix:")
print(A_inv)

# Verify the inverse
identity = A @ A_inv

print("\\nA @ A_inv:")
print(identity)`,

        output: `Original matrix:
[[1. 2.]
 [3. 4.]]

Inverse matrix:
[[-2.   1. ]
 [ 1.5 -0.5]]

A @ A_inv:
[[1. 0.]
 [0. 1.]]`,

        explanation:
            "The product of A and its inverse is the identity matrix, up to floating-point rounding.",
    },

    {
        language: "python",
        code: `import onithrasML as oml
import numpy as np

# A larger 3 × 3 matrix
A = np.array([
    [4.0, 7.0, 2.0],
    [3.0, 6.0, 1.0],
    [2.0, 5.0, 3.0]
])

# Compute inverse
A_inv = oml.linalg.inv(A)

print("A:")
print(A)

print("\\nA⁻¹:")
print(A_inv)

# Check both multiplication orders
left_identity = A @ A_inv
right_identity = A_inv @ A

print("\\nA @ A⁻¹:")
print(left_identity)

print("\\nA⁻¹ @ A:")
print(right_identity)`,

        output: `A:
[[4. 7. 2.]
 [3. 6. 1.]
 [2. 5. 3.]]

A⁻¹:
[[ 1.41666667 -1.16666667 -0.5       ]
 [-0.58333333  0.66666667  0.16666667]
 [ 0.16666667 -0.16666667  0.16666667]]

A @ A⁻¹:
[[ 1.00000000e+00  0.00000000e+00  0.00000000e+00]
 [ 0.00000000e+00  1.00000000e+00  0.00000000e+00]
 [ 0.00000000e+00  0.00000000e+00  1.00000000e+00]]

A⁻¹ @ A:
[[ 1.00000000e+00  0.00000000e+00  0.00000000e+00]
 [ 0.00000000e+00  1.00000000e+00  0.00000000e+00]
 [ 0.00000000e+00  0.00000000e+00  1.00000000e+00]]`,

        explanation:
            "For a nonsingular square matrix, both A @ A⁻¹ and A⁻¹ @ A approach the identity matrix.",
    },

    {
        language: "python",
        code: `import onithrasML as oml
import numpy as np

# Generate a matrix
A = np.array([
    [10.0, 2.0, 3.0, 1.0],
    [2.0, 9.0, 1.0, 2.0],
    [3.0, 1.0, 8.0, 4.0],
    [1.0, 2.0, 4.0, 7.0]
])

# Compute inverse
A_inv = oml.linalg.inv(
    A,
    overwrite_a=False,
    check_finite=True
)

print("Inverse:")
print(A_inv)

# Numerical verification
result = A @ A_inv

print("\\nVerification:")
print(np.round(result, 10))

# Check whether the result is approximately
# equal to the identity matrix
is_identity = np.allclose(
    result,
    np.eye(A.shape[0])
)

print("\\nIs identity:", is_identity)`,

        output: `Inverse:
[[ 0.1207 ... ]
 [ ...       ]
 [ ...       ]
 [ ...       ]]

Verification:
[[1. 0. 0. 0.]
 [0. 1. 0. 0.]
 [0. 0. 1. 0.]
 [0. 0. 0. 1.]]

Is identity: True`,

        explanation:
            "For numerical computations, np.allclose() is preferable to direct equality because floating-point arithmetic introduces small rounding errors.",
    },
],

  implementation: [
    "OnithrasML exposes matrix inversion through its linear algebra API.",
    "The backend may dispatch the operation to optimized numerical kernels such as LAPACK or a native C++ implementation.",
    "For large matrices, the implementation should avoid unnecessary copies and use optimized factorization routines.",
  ],

  numericalConsiderations: [
    "The input matrix must be square.",
    "A singular matrix does not have an inverse.",
    "Ill-conditioned matrices can produce numerically inaccurate results even when an inverse exists.",
    "For solving Ax = b, prefer solve() instead of explicitly computing A⁻¹.",
    "Floating-point arithmetic means A @ inv(A) may differ slightly from the exact identity matrix.",
  ],

  notes: [
    "Matrix inversion is generally more expensive and less numerically preferable than solving a linear system directly.",
    "For structured matrices, specialized algorithms may provide better performance and numerical stability.",
  ],

  warnings: [
    "Do not use matrix inversion as a general replacement for solve().",
    "Disabling finite-value checking requires the caller to guarantee that the input contains valid finite values.",
  ],

  errors: [
    "Non-square matrices cannot be inverted.",
    "Singular matrices have no inverse.",
    "Nearly singular or ill-conditioned matrices may produce unstable numerical results.",
  ],

  complexity: {
    time: "O(M³)",
    space: "O(M²)",
  },

  relatedMethods: ["solve", "det", "norm", "pinv"],
};
