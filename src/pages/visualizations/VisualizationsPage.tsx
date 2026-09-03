import { useState } from "react";

import { MLVisualization } from "../../components/visualization/MLVisualization";
import { GradientDescentVisualization } from "../../components/visualization/GradientDescentVisualization";
import { PCAVisualization } from "../../components/visualization/PCAVisualization";
import { LogisticRegressionVisualization } from "../../components/visualization/LogisticRegressionVisualization";
import { NaiveBayesVisualization } from "../../components/visualization/NaiveBayesVisualization";

import "./VisualizationsPage.css";


/* =========================================================
   ALGORITHMS
========================================================= */

type Algorithm =
    | "linear-regression"
    | "k-means"
    | "gradient-descent"
    | "pca"
    | "logistic-regression"
    | "naive-bayes";


/* =========================================================
   PAGE
========================================================= */

export function VisualizationsPage() {
    const [algorithm, setAlgorithm] =
        useState<Algorithm>(
            "linear-regression",
        );

    const isKMeans =
        algorithm === "k-means";

    const isGradientDescent =
        algorithm === "gradient-descent";

    const isPCA =
        algorithm === "pca";

    const isLogisticRegression =
        algorithm ===
        "logistic-regression";

    const isNaiveBayes =
        algorithm === "naive-bayes";


    return (
        <main className="visualizations-page">

            {/* =================================================
                HERO
            ================================================= */}

            <section className="visualizations-hero">
                <div className="visualizations-container">

                    <span className="visualizations-eyebrow">
                        ONITHRASML · INTERACTIVE LAB
                    </span>

                    <h1>
                        Machine learning,
                        <span> visualized.</span>
                    </h1>

                    <p>
                        Explore machine-learning
                        algorithms interactively.
                        Train models, inspect
                        parameters, observe loss,
                        and understand how
                        algorithms learn.
                    </p>

                </div>
            </section>


            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="visualizations-content">
                <div className="visualizations-container">

                    {/* =================================================
                        ALGORITHM SELECTOR
                    ================================================= */}

                    <div className="visualizations-selector">

                        <button
                            type="button"
                            className={
                                algorithm ===
                                "linear-regression"
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "linear-regression",
                                )
                            }
                        >
                            Linear Regression
                        </button>


                        <button
                            type="button"
                            className={
                                isKMeans
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "k-means",
                                )
                            }
                        >
                            K-Means
                        </button>


                        <button
                            type="button"
                            className={
                                isGradientDescent
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "gradient-descent",
                                )
                            }
                        >
                            Gradient Descent
                        </button>


                        <button
                            type="button"
                            className={
                                isPCA
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "pca",
                                )
                            }
                        >
                            PCA
                        </button>


                        <button
                            type="button"
                            className={
                                isLogisticRegression
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "logistic-regression",
                                )
                            }
                        >
                            Logistic Regression
                        </button>


                        <button
                            type="button"
                            className={
                                isNaiveBayes
                                    ? "visualization-selector-button active"
                                    : "visualization-selector-button"
                            }
                            onClick={() =>
                                setAlgorithm(
                                    "naive-bayes",
                                )
                            }
                        >
                            Naive Bayes
                        </button>

                    </div>


                    {/* =================================================
                        SECTION HEADING
                    ================================================= */}

                    <div className="visualizations-section-heading">

                        <div>

                            <span className="visualizations-label">

                                {isNaiveBayes
                                    ? "PROBABILISTIC CLASSIFICATION"
                                    : isLogisticRegression
                                        ? "CLASSIFICATION"
                                        : isPCA
                                            ? "DIMENSIONALITY REDUCTION"
                                            : isGradientDescent
                                                ? "OPTIMIZATION"
                                                : isKMeans
                                                    ? "CLUSTERING"
                                                    : "REGRESSION"}

                            </span>


                            <h2>

                                {isNaiveBayes
                                    ? "Naive Bayes"
                                    : isLogisticRegression
                                        ? "Logistic Regression"
                                        : isPCA
                                            ? "Principal Component Analysis"
                                            : isGradientDescent
                                                ? "Gradient Descent"
                                                : isKMeans
                                                    ? "K-Means"
                                                    : "Linear Regression"}

                            </h2>

                        </div>


                        <p>

                            {isNaiveBayes
                                ? "See how prior probabilities and feature likelihoods combine to calculate posterior probabilities and classify a new observation."
                                : isLogisticRegression
                                    ? "Watch logistic regression transform a linear score into probabilities and learn a decision boundary between two classes."
                                    : isPCA
                                        ? "See how PCA finds the directions of maximum variance and projects data onto a lower-dimensional space."
                                        : isGradientDescent
                                            ? "Follow the gradient downhill as the optimizer searches for the minimum of the loss function."
                                            : isKMeans
                                                ? "Watch K-Means assign points to the nearest centroid and repeatedly update the centroid positions."
                                                : "Watch gradient descent update the regression coefficients and fit a plane to three-dimensional training data."}

                        </p>

                    </div>


                    {/* =================================================
                        VISUALIZATION
                    ================================================= */}

                    {isNaiveBayes ? (
                        <NaiveBayesVisualization />

                    ) : isLogisticRegression ? (
                        <LogisticRegressionVisualization />

                    ) : isPCA ? (
                        <PCAVisualization />

                    ) : isGradientDescent ? (
                        <GradientDescentVisualization />

                    ) : (
                        <MLVisualization
                            algorithm={algorithm}
                        />
                    )}

                </div>
            </section>

        </main>
    );
}