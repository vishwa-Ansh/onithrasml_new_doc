import type { ModuleDocumentation } from "../docs/types";

export const numericalComputing: ModuleDocumentation = {
    slug: "numerical-computations",

    eyebrow: "MODULE · NUMERICAL COMPUTING",

    title: "Numerical Computing",

    description:
        "Learn the foundations of efficient numerical computation with arrays, vectorization, broadcasting, numerical precision, mathematical operations, and performance-aware algorithms.",

    tags: [
        "Arrays",
        "Vectorization",
        "Precision",
        "Performance",
    ],

    sections: [
        {
            id: "introduction",
            title: "Introduction",

            description:
                "Numerical computing focuses on representing and manipulating numerical data efficiently.",

            paragraphs: [
                "OnithrasML uses numerical data as the foundation for mathematical operations, statistics, preprocessing, and machine learning algorithms.",
                "Understanding how numerical data is stored, transformed, and processed is essential for writing efficient scientific Python code.",
            ],

            notes: [
                "Most numerical operations work on arrays rather than individual scalar values.",
                "Vectorized operations are generally preferred over explicit Python loops.",
            ],
        },

        {
            id: "arrays",
            title: "Arrays",

            description:
                "An array is a structured collection of numerical values organized along one or more dimensions.",

            paragraphs: [
                "A one-dimensional array can represent a vector, while higher-dimensional arrays can represent matrices, tensors, datasets, and other structured numerical objects.",
                "The shape of an array describes the number of elements along each dimension.",
            ],

            formula: {
                title: "Array Shape",
                expression:
                    "A \\in \\mathbb{R}^{n \\times m}",
                explanation:
                    "A represents a real-valued matrix containing n rows and m columns.",
            },

            example: {
                language: "python",
                code: `import numpy as np

A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(A.shape)
print(A.ndim)`,

                output: `(2, 3)
2`,

                explanation:
                    "The array contains 2 rows and 3 columns, so its shape is (2, 3) and its number of dimensions is 2.",
            },

            notes: [
                "Array dimensions are zero-indexed when accessing individual elements.",
                "Shape compatibility is important when performing operations between arrays.",
            ],
        },

        {
            id: "vectorization",
            title: "Vectorization",

            description:
                "Vectorization performs operations on entire arrays instead of processing elements one at a time using explicit Python loops.",

            paragraphs: [
                "Vectorized operations can significantly improve performance because the underlying numerical implementation can process many values efficiently.",
                "This approach also produces shorter and more expressive numerical code.",
            ],

            formula: {
                title: "Element-wise Transformation",
                expression:
                    "y_i = f(x_i), \\quad i = 1,2,\\ldots,n",
                explanation:
                    "A vectorized operation applies the same mathematical function f to every element of the input array.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4])

y = x * 2

print(y)`,

                output: `[2 4 6 8]`,

                explanation:
                    "The multiplication is applied to the complete array without explicitly writing a loop.",
            },

            complexity: {
                time: "O(n)",
                space: "O(n)",
            },
        },

        {
            id: "broadcasting",
            title: "Broadcasting",

            description:
                "Broadcasting allows compatible arrays with different shapes to participate in arithmetic operations.",

            paragraphs: [
                "Instead of explicitly copying smaller arrays to match larger arrays, broadcasting conceptually expands their dimensions during an operation.",
                "This is particularly useful when applying a scalar or vector transformation across a matrix.",
            ],

            example: {
                language: "python",
                code: `import numpy as np

A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

b = np.array([10, 20, 30])

result = A + b

print(result)`,

                output: `[11 22 33
 14 25 36]`,

                explanation:
                    "The vector b is broadcast across each row of A before performing element-wise addition.",
            },

            notes: [
                "Broadcasting does not necessarily create a physical copy of the smaller array.",
                "Array dimensions must satisfy broadcasting compatibility rules.",
            ],

            warnings: [
                "Unexpected broadcasting can produce valid-looking but incorrect numerical results.",
            ],
        },

        {
            id: "numerical-precision",
            title: "Numerical Precision",

            description:
                "Computers use finite-precision representations for floating-point numbers, so many real numbers cannot be represented exactly.",

            paragraphs: [
                "Floating-point arithmetic introduces small rounding errors during numerical computations.",
                "These errors are usually tiny, but repeated operations or poorly conditioned problems can amplify them.",
            ],

            formula: {
                title: "Floating-Point Model",
                expression:
                    "\\mathrm{fl}(x) = x(1+\\delta), \\quad |\\delta| \\le \\varepsilon",
                explanation:
                    "Here ε represents a bound related to floating-point precision and δ represents the relative rounding error.",
            },

            example: {
                language: "python",
                code: `x = 0.1 + 0.2

print(x)
print(x == 0.3)`,

                output: `0.30000000000000004
False`,

                explanation:
                    "The result demonstrates that decimal values such as 0.1 and 0.2 are not always represented exactly in binary floating-point arithmetic.",
            },

            warnings: [
                "Avoid relying on exact equality when comparing floating-point results.",
            ],
        },

        {
            id: "tolerance",
            title: "Tolerance",

            description:
                "Tolerance-based comparisons are used when numerical results may contain small floating-point errors.",

            formula: {
                title: "Absolute Error",
                expression:
                    "|a-b| \\le \\varepsilon",
                explanation:
                    "Two values can be considered sufficiently close when their absolute difference is below a chosen tolerance ε.",
            },

            example: {
                language: "python",
                code: `import numpy as np

a = 0.1 + 0.2
b = 0.3

print(np.isclose(a, b))`,

                output: `True`,

                explanation:
                    "np.isclose checks whether two numerical values are sufficiently close according to a numerical tolerance.",
            },

            notes: [
                "Tolerance should be selected according to the scale and numerical properties of the problem.",
            ],
        },

        {
            id: "mathematical-operations",
            title: "Mathematical Operations",

            description:
                "Numerical computing provides common mathematical operations for transforming and analyzing numerical arrays.",

            paragraphs: [
                "Typical operations include addition, subtraction, multiplication, division, powers, square roots, logarithms, exponentials, and trigonometric functions.",
                "These operations can usually be applied element-wise to numerical arrays.",
            ],

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 4, 9, 16])

sqrt_x = np.sqrt(x)
log_x = np.log(x)

print(sqrt_x)
print(log_x)`,

                output: `[1. 2. 3. 4.]
[0.         1.38629436 2.19722458 2.77258872]`,

                explanation:
                    "The mathematical functions are applied independently to every element of the array.",
            },

            complexity: {
                time: "O(n)",
                space: "O(n)",
            },
        },

        {
            id: "aggregation",
            title: "Aggregation",

            description:
                "Aggregation operations reduce multiple numerical values into summary statistics.",

            paragraphs: [
                "Common aggregation operations include sum, mean, minimum, maximum, variance, and standard deviation.",
                "Aggregations can often be performed across the entire array or along a particular axis.",
            ],

            formula: {
                title: "Arithmetic Mean",
                expression:
                    "\\mu = \\frac{1}{n}\\sum_{i=1}^{n}x_i",
                explanation:
                    "The arithmetic mean is calculated by dividing the sum of all observations by the number of observations.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([10, 20, 30, 40])

print(np.sum(x))
print(np.mean(x))
print(np.max(x))`,

                output: `100
25.0
40`,

                explanation:
                    "Aggregation functions reduce the array to scalar summary values.",
            },

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },

        {
            id: "memory-and-performance",
            title: "Memory & Performance",

            description:
                "Efficient numerical computing requires awareness of both computational complexity and memory usage.",

            paragraphs: [
                "Large numerical datasets can consume significant amounts of memory. Choosing appropriate data types and avoiding unnecessary copies can improve performance.",
                "Vectorization can reduce Python-level overhead, while in-place operations may reduce temporary allocations when they are safe to use.",
            ],

            example: {
                language: "python",
                code: `import numpy as np

x = np.ones(1_000_000, dtype=np.float64)

print(x.nbytes)`,

                output: `8000000`,

                explanation:
                    "A float64 value generally occupies 8 bytes, so one million values require approximately 8 MB of storage.",
            },

            notes: [
                "Use smaller numeric dtypes when their precision range is sufficient for the problem.",
                "Avoid unnecessary intermediate arrays for memory-intensive workloads.",
            ],
        },

        {
            id: "numerical-stability",
            title: "Numerical Stability",

            description:
                "Numerical stability describes how sensitive an algorithm is to rounding and representation errors.",

            paragraphs: [
                "A numerically stable algorithm limits the amplification of computational errors.",
                "An unstable formulation can produce inaccurate results even when the underlying mathematical problem is well defined.",
            ],

            formula: {
                title: "Relative Error",
                expression:
                    "\\text{relative error} = \\frac{|x-\\hat{x}|}{|x|}",
                explanation:
                    "Relative error compares the difference between an exact value x and an approximation x̂ relative to the magnitude of x.",
            },

            warnings: [
                "Subtracting nearly equal floating-point values can cause significant loss of precision.",
                "Numerical stability should be considered when implementing iterative or scientific algorithms.",
            ],
        },

        {
            id: "numerical-methods",
            title: "Numerical Methods",

            description:
                "Numerical methods approximate mathematical problems that may not have convenient closed-form solutions.",

            paragraphs: [
                "Examples include numerical integration, root finding, optimization, interpolation, and iterative linear-system solvers.",
                "The quality of a numerical method depends on factors such as convergence, stability, accuracy, and computational cost.",
            ],

            formula: {
                title: "Linear System",
                expression:
                    "Ax=b",
                explanation:
                    "A linear system consists of a matrix A, an unknown vector x, and a known vector b.",
            },

            notes: [
                "Algorithm selection depends on the structure and numerical properties of the problem.",
                "Convergence does not automatically guarantee numerical accuracy.",
            ],
        },

        {
            id: "examples",
            title: "Examples",

            description:
                "The following example combines several numerical operations into a small computation workflow.",

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4, 5])

mean = np.mean(x)
centered = x - mean
squared = centered ** 2

print("Mean:", mean)
print("Centered:", centered)
print("Squared:", squared)`,

                output: `Mean: 3.0
Centered: [-2. -1.  0.  1.  2.]
Squared: [4. 1. 0. 1. 4.]`,

                explanation:
                    "The example calculates the mean, centers the data around that mean, and then squares the centered values.",
            },

            complexity: {
                time: "O(n)",
                space: "O(n)",
            },

            notes: [
                "This workflow is commonly used as a building block for statistical and machine-learning computations.",
            ],
        },
    ],
};