/* =========================================================
   NAIVE BAYES VISUALIZATION DATA
========================================================= */

export type ClassLabel = 0 | 1;

export interface NaiveBayesPoint {
    x: number;
    y: number;
    label: ClassLabel;
}

export interface ClassStatistics {
    label: ClassLabel;
    prior: number;
    meanX: number;
    meanY: number;
    varianceX: number;
    varianceY: number;
}

export interface NaiveBayesPrediction {
    probabilityClass0: number;
    probabilityClass1: number;
    predictedClass: ClassLabel;
}

/* =========================================================
   TRAINING DATA
========================================================= */

export const naiveBayesData: NaiveBayesPoint[] = [
    { x: 1.0, y: 1.2, label: 0 },
    { x: 1.4, y: 1.0, label: 0 },
    { x: 1.8, y: 1.5, label: 0 },
    { x: 2.0, y: 1.8, label: 0 },
    { x: 2.3, y: 1.4, label: 0 },
    { x: 2.6, y: 2.0, label: 0 },
    { x: 2.8, y: 1.7, label: 0 },
    { x: 3.0, y: 2.2, label: 0 },

    { x: 5.2, y: 5.0, label: 1 },
    { x: 5.5, y: 5.6, label: 1 },
    { x: 5.8, y: 5.2, label: 1 },
    { x: 6.1, y: 5.9, label: 1 },
    { x: 6.4, y: 6.2, label: 1 },
    { x: 6.8, y: 5.7, label: 1 },
    { x: 7.1, y: 6.4, label: 1 },
    { x: 7.5, y: 6.0, label: 1 },
];


/* =========================================================
   EPSILON
========================================================= */

const EPSILON = 1e-9;


/* =========================================================
   GET CLASS POINTS
========================================================= */

export function getClassPoints(
    data: NaiveBayesPoint[],
    label: ClassLabel,
): NaiveBayesPoint[] {
    return data.filter(
        (point) => point.label === label,
    );
}


/* =========================================================
   MEAN
========================================================= */

export function calculateMean(
    values: number[],
): number {
    if (values.length === 0) {
        return 0;
    }

    return (
        values.reduce(
            (sum, value) => sum + value,
            0,
        ) / values.length
    );
}


/* =========================================================
   VARIANCE
========================================================= */

export function calculateVariance(
    values: number[],
): number {
    if (values.length === 0) {
        return 0;
    }

    const mean = calculateMean(values);

    return (
        values.reduce(
            (sum, value) =>
                sum +
                Math.pow(
                    value - mean,
                    2,
                ),
            0,
        ) / values.length
    );
}


/* =========================================================
   CLASS STATISTICS
========================================================= */

export function calculateClassStatistics(
    data: NaiveBayesPoint[],
    label: ClassLabel,
): ClassStatistics {
    const classPoints = getClassPoints(
        data,
        label,
    );

    const xValues = classPoints.map(
        (point) => point.x,
    );

    const yValues = classPoints.map(
        (point) => point.y,
    );

    const prior =
        classPoints.length /
        data.length;

    return {
        label,
        prior,

        meanX: calculateMean(
            xValues,
        ),

        meanY: calculateMean(
            yValues,
        ),

        varianceX:
            calculateVariance(
                xValues,
            ) + EPSILON,

        varianceY:
            calculateVariance(
                yValues,
            ) + EPSILON,
    };
}


/* =========================================================
   ALL CLASS STATISTICS
========================================================= */

export const initialClassStatistics: ClassStatistics[] =
    [
        calculateClassStatistics(
            naiveBayesData,
            0,
        ),

        calculateClassStatistics(
            naiveBayesData,
            1,
        ),
    ];


/* =========================================================
   GAUSSIAN PROBABILITY DENSITY
========================================================= */

export function gaussianProbability(
    value: number,
    mean: number,
    variance: number,
): number {
    const coefficient =
        1 /
        Math.sqrt(
            2 *
                Math.PI *
                variance,
        );

    const exponent =
        -Math.pow(
            value - mean,
            2,
        ) /
        (2 * variance);

    return (
        coefficient *
        Math.exp(exponent)
    );
}


/* =========================================================
   FEATURE LIKELIHOOD
========================================================= */

export function calculateFeatureLikelihood(
    x: number,
    y: number,
    statistics: ClassStatistics,
): number {
    const probabilityX =
        gaussianProbability(
            x,
            statistics.meanX,
            statistics.varianceX,
        );

    const probabilityY =
        gaussianProbability(
            y,
            statistics.meanY,
            statistics.varianceY,
        );

    /*
     * Naive Bayes assumes
     * conditional independence
     * between features.
     *
     * P(X,Y | C)
     * =
     * P(X | C) P(Y | C)
     */

    return (
        probabilityX *
        probabilityY
    );
}


/* =========================================================
   POSTERIOR PROBABILITY
========================================================= */

export function predictNaiveBayes(
    x: number,
    y: number,
    statistics: ClassStatistics[] =
        initialClassStatistics,
): NaiveBayesPrediction {
    const class0 =
        statistics.find(
            (item) => item.label === 0,
        );

    const class1 =
        statistics.find(
            (item) => item.label === 1,
        );

    if (!class0 || !class1) {
        return {
            probabilityClass0: 0.5,
            probabilityClass1: 0.5,
            predictedClass: 0,
        };
    }

    const likelihood0 =
        calculateFeatureLikelihood(
            x,
            y,
            class0,
        );

    const likelihood1 =
        calculateFeatureLikelihood(
            x,
            y,
            class1,
        );

    const posterior0 =
        likelihood0 *
        class0.prior;

    const posterior1 =
        likelihood1 *
        class1.prior;

    const evidence =
        posterior0 +
        posterior1;

    if (evidence <= EPSILON) {
        return {
            probabilityClass0: 0.5,
            probabilityClass1: 0.5,
            predictedClass: 0,
        };
    }

    const probabilityClass0 =
        posterior0 / evidence;

    const probabilityClass1 =
        posterior1 / evidence;

    return {
        probabilityClass0,
        probabilityClass1,

        predictedClass:
            probabilityClass1 >
            probabilityClass0
                ? 1
                : 0,
    };
}


/* =========================================================
   INITIAL QUERY POINT
========================================================= */

export const initialQueryPoint = {
    x: 4.0,
    y: 3.8,
};


/* =========================================================
   INITIAL PREDICTION
========================================================= */

export const initialPrediction =
    predictNaiveBayes(
        initialQueryPoint.x,
        initialQueryPoint.y,
    );