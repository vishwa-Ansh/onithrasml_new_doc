import type { ModuleDocumentation } from "../docs/types";

export const statistics: ModuleDocumentation = {
    slug: "statistics",

    eyebrow: "MODULE · STATISTICS",

    title: "Statistics",

    description:
        "Learn how to summarize, measure, and analyze numerical data using descriptive statistics, dispersion, covariance, correlation, and probability.",

    tags: [
        "Mean",
        "Variance",
        "Correlation",
        "Probability",
        "Distributions",
    ],

    sections: [
        {
            id: "introduction",
            title: "Introduction",

            description:
                "Statistics provides methods for understanding patterns, variability, and relationships within numerical data.",

            paragraphs: [
                "Statistical operations are fundamental to data analysis and machine learning. They help transform raw observations into meaningful summaries.",
                "OnithrasML uses statistical concepts for data exploration, preprocessing, model evaluation, and numerical analysis.",
            ],

            notes: [
                "Descriptive statistics summarize observed data.",
                "Inferential statistics use samples to reason about larger populations.",
                "The quality of statistical conclusions depends strongly on the quality and structure of the data.",
            ],
        },

        {
            id: "descriptive-statistics",
            title: "Descriptive Statistics",

            description:
                "Descriptive statistics summarize the central tendency, spread, and distribution of a dataset.",

            paragraphs: [
                "Common descriptive statistics include mean, median, minimum, maximum, variance, and standard deviation.",
                "These measurements provide a compact representation of a dataset and are often the first step in exploratory data analysis.",
            ],

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([10, 20, 20, 30, 40])

print("Mean:", np.mean(x))
print("Median:", np.median(x))
print("Minimum:", np.min(x))
print("Maximum:", np.max(x))`,

                output: `Mean: 24.0
Median: 20.0
Minimum: 10
Maximum: 40`,

                explanation:
                    "These operations provide basic information about the center and range of the dataset.",
            },
        },

        {
            id: "mean",
            title: "Mean",

            description:
                "The arithmetic mean represents the average value of a numerical dataset.",

            formula: {
                title: "Arithmetic Mean",
                expression:
                    "\\mu = \\frac{1}{n}\\sum_{i=1}^{n}x_i",
                explanation:
                    "The mean is calculated by adding all observations and dividing by the number of observations.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([2, 4, 6, 8, 10])

mean = np.mean(x)

print(mean)`,

                output: `6.0`,

                explanation:
                    "The average of the five values is 6.",
            },

            notes: [
                "The mean is sensitive to extreme values.",
                "For symmetric distributions, the mean can be a useful measure of central tendency.",
            ],

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },

        {
            id: "median",
            title: "Median",

            description:
                "The median is the middle value of an ordered dataset.",

            paragraphs: [
                "When the number of observations is odd, the median is the central observation. When the number is even, it is commonly calculated as the average of the two central observations.",
                "The median is generally less sensitive to extreme values than the arithmetic mean.",
            ],

            formula: {
                title: "Median for Ordered Data",
                expression:
                    "\\operatorname{median}(x)=x_{\\frac{n+1}{2}}",
                explanation:
                    "For odd n, the median is the observation at the central position after sorting.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([7, 2, 9, 4, 5])

median = np.median(x)

print(median)`,

                output: `5.0`,

                explanation:
                    "After sorting, the values are [2, 4, 5, 7, 9], so the middle value is 5.",
            },

            notes: [
                "Median is often useful for skewed datasets.",
                "Sorting is generally required when computing a median directly.",
            ],
        },

        {
            id: "variance",
            title: "Variance",

            description:
                "Variance measures how far observations tend to deviate from their mean.",

            formula: {
                title: "Population Variance",
                expression:
                    "\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i-\\mu)^2",
                explanation:
                    "Population variance is the average squared deviation from the population mean.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4, 5])

variance = np.var(x)

print(variance)`,

                output: `2.0`,

                explanation:
                    "The population variance of the dataset is 2.",
            },

            notes: [
                "Variance is expressed in squared units of the original data.",
                "Large variance indicates greater dispersion around the mean.",
            ],

            warnings: [
                "Population variance and sample variance use different normalization factors.",
            ],

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },

        {
            id: "standard-deviation",
            title: "Standard Deviation",

            description:
                "Standard deviation measures the typical magnitude of deviations from the mean.",

            formula: {
                title: "Population Standard Deviation",
                expression:
                    "\\sigma = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(x_i-\\mu)^2}",
                explanation:
                    "Standard deviation is the square root of variance and is expressed in the same units as the original data.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4, 5])

std = np.std(x)

print(std)`,

                output: `1.4142135623730951`,

                explanation:
                    "The standard deviation is √2 for this dataset.",
            },

            notes: [
                "Standard deviation is easier to interpret than variance because it uses the original measurement units.",
                "A small standard deviation indicates that observations are concentrated around the mean.",
            ],

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },

        {
            id: "range",
            title: "Range",

            description:
                "The range measures the difference between the largest and smallest observations.",

            formula: {
                title: "Range",
                expression:
                    "\\operatorname{range}(x)=\\max(x)-\\min(x)",
                explanation:
                    "Range provides a simple measure of the total spread of a dataset.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([4, 8, 2, 15, 7])

data_range = np.max(x) - np.min(x)

print(data_range)`,

                output: `13`,

                explanation:
                    "The maximum value is 15 and the minimum value is 2, giving a range of 13.",
            },

            notes: [
                "Range is simple to calculate but can be strongly affected by outliers.",
            ],

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },

        {
            id: "covariance",
            title: "Covariance",

            description:
                "Covariance measures how two variables change together.",

            formula: {
                title: "Population Covariance",
                expression:
                    "\\operatorname{Cov}(X,Y)=\\frac{1}{n}\\sum_{i=1}^{n}(x_i-\\mu_X)(y_i-\\mu_Y)",
                explanation:
                    "Positive covariance indicates that the variables tend to increase together, while negative covariance indicates an inverse relationship.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([2, 4, 6, 8])

covariance = np.cov(x, y, bias=True)[0, 1]

print(covariance)`,

                output: `2.5`,

                explanation:
                    "The variables increase together, producing a positive covariance.",
            },

            notes: [
                "The magnitude of covariance depends on the units of the variables.",
                "Covariance alone is difficult to compare across datasets with different scales.",
            ],
        },

        {
            id: "correlation",
            title: "Correlation",

            description:
                "Correlation measures the strength and direction of a linear relationship between two variables.",

            formula: {
                title: "Pearson Correlation",
                expression:
                    "\\rho_{XY}=\\frac{\\operatorname{Cov}(X,Y)}{\\sigma_X\\sigma_Y}",
                explanation:
                    "Pearson correlation normalizes covariance by the standard deviations of the two variables.",
            },

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([2, 4, 6, 8])

correlation = np.corrcoef(x, y)[0, 1]

print(correlation)`,

                output: `1.0`,

                explanation:
                    "The variables have a perfect positive linear relationship.",
            },

            notes: [
                "Correlation values lie between -1 and 1.",
                "A value near 1 indicates strong positive linear association.",
                "A value near -1 indicates strong negative linear association.",
                "A value near 0 indicates weak linear association.",
            ],

            warnings: [
                "Correlation does not imply causation.",
                "Pearson correlation measures linear association and may not detect nonlinear relationships.",
            ],
        },

        {
            id: "probability-basics",
            title: "Probability Basics",

            description:
                "Probability provides a mathematical framework for representing uncertainty and random events.",

            paragraphs: [
                "A probability describes how likely an event is to occur. Probabilities range from 0 to 1.",
                "Probability concepts form the foundation for statistical inference, probability distributions, and many machine-learning methods.",
            ],

            formula: {
                title: "Probability Bounds",
                expression:
                    "0 \\le P(A) \\le 1",
                explanation:
                    "Every event A has a probability between 0 and 1 inclusive.",
            },

            notes: [
                "P(A) = 0 represents an impossible event.",
                "P(A) = 1 represents a certain event.",
                "Values between 0 and 1 represent varying degrees of likelihood.",
            ],
        },

        {
            id: "expected-value",
            title: "Expected Value",

            description:
                "Expected value represents the long-run average outcome of a random variable.",

            formula: {
                title: "Discrete Expected Value",
                expression:
                    "\\mathbb{E}[X]=\\sum_x xP(X=x)",
                explanation:
                    "For a discrete random variable, expected value is the weighted average of possible outcomes.",
            },

            example: {
                language: "python",
                code: `values = [1, 2, 3]
probabilities = [0.2, 0.5, 0.3]

expected_value = sum(
    x * p
    for x, p in zip(values, probabilities)
)

print(expected_value)`,

                output: `2.1`,

                explanation:
                    "Each possible value is multiplied by its probability and the results are summed.",
            },

            notes: [
                "Expected value does not necessarily have to be an outcome that can actually occur.",
            ],
        },

        {
            id: "percentiles",
            title: "Percentiles",

            description:
                "A percentile indicates the relative position of a value within an ordered dataset.",

            paragraphs: [
                "The p-th percentile is a value below which approximately p percent of observations fall, depending on the percentile convention used.",
                "Percentiles are useful for understanding the distribution and identifying unusually high or low observations.",
            ],

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([10, 20, 30, 40, 50])

p90 = np.percentile(x, 90)

print(p90)`,

                output: `46.0`,

                explanation:
                    "The 90th percentile provides the value below which approximately 90% of the observations lie under the selected interpolation convention.",
            },

            notes: [
                "Different statistical libraries can provide different interpolation or quantile conventions.",
            ],
        },

        {
            id: "practical-analysis",
            title: "Practical Analysis",

            description:
                "The following example combines several descriptive statistics to analyze a dataset.",

            example: {
                language: "python",
                code: `import numpy as np

x = np.array([12, 15, 14, 18, 21, 15, 17])

mean = np.mean(x)
median = np.median(x)
std = np.std(x)
minimum = np.min(x)
maximum = np.max(x)

print("Mean:", mean)
print("Median:", median)
print("Std:", std)
print("Min:", minimum)
print("Max:", maximum)`,

                output: `Mean: 16.0
Median: 15.0
Std: 2.8284271247461903
Min: 12
Max: 21`,

                explanation:
                    "These statistics provide a compact summary of the dataset's central tendency and spread.",
            },

            notes: [
                "Descriptive statistics should generally be interpreted together rather than in isolation.",
                "Visualization can provide additional information that numerical summaries may hide.",
            ],

            complexity: {
                time: "O(n)",
                space: "O(1)",
            },
        },
    ],
};