export interface LogisticPoint {
    x: number;
    y: number;
    z: number;
    label: 0 | 1;
}

export interface LogisticCoefficients {
    intercept: number;
    xCoefficient: number;
    zCoefficient: number;
}

export interface LogisticGradients {
    intercept: number;
    xCoefficient: number;
    zCoefficient: number;
}

export interface LogisticStepResult {
    coefficients: LogisticCoefficients;
    loss: number;
    gradients: LogisticGradients;
}

export const logisticRegressionData: LogisticPoint[] = [
    // Class 0
    { x: -3.0, y: 0.0, z: -2.2, label: 0 },
    { x: -2.5, y: 0.0, z: -1.7, label: 0 },
    { x: -2.2, y: 0.0, z: -2.8, label: 0 },
    { x: -1.8, y: 0.0, z: -1.2, label: 0 },
    { x: -1.4, y: 0.0, z: -2.0, label: 0 },
    { x: -0.8, y: 0.0, z: -1.4, label: 0 },
    { x: -2.0, y: 0.0, z: -0.6, label: 0 },
    { x: -1.0, y: 0.0, z: -0.4, label: 0 },

    // Class 1
    { x: 0.8, y: 0.0, z: 1.0, label: 1 },
    { x: 1.3, y: 0.0, z: 1.6, label: 1 },
    { x: 1.8, y: 0.0, z: 0.8, label: 1 },
    { x: 2.2, y: 0.0, z: 1.9, label: 1 },
    { x: 2.6, y: 0.0, z: 1.2, label: 1 },
    { x: 3.0, y: 0.0, z: 2.4, label: 1 },
    { x: 1.5, y: 0.0, z: 2.5, label: 1 },
    { x: 2.4, y: 0.0, z: 2.8, label: 1 },
];


/* =========================================================
   INITIAL PARAMETERS
========================================================= */

export const initialLogisticCoefficients: LogisticCoefficients = {
    intercept: 0,
    xCoefficient: 0,
    zCoefficient: 0,
};


/* =========================================================
   SIGMOID
========================================================= */

export function sigmoid(value: number): number {
    /*
     * Numerically stable sigmoid.
     */
    if (value >= 0) {
        const expValue = Math.exp(-value);

        return 1 / (1 + expValue);
    }

    const expValue = Math.exp(value);

    return expValue / (1 + expValue);
}


/* =========================================================
   LINEAR SCORE
========================================================= */

export function calculateScore(
    point: LogisticPoint,
    coefficients: LogisticCoefficients,
): number {
    return (
        coefficients.intercept +
        coefficients.xCoefficient * point.x +
        coefficients.zCoefficient * point.z
    );
}


/* =========================================================
   PREDICT PROBABILITY
========================================================= */

export function predictProbability(
    point: LogisticPoint,
    coefficients: LogisticCoefficients,
): number {
    const score = calculateScore(
        point,
        coefficients,
    );

    return sigmoid(score);
}


/* =========================================================
   BINARY PREDICTION
========================================================= */

export function predictClass(
    point: LogisticPoint,
    coefficients: LogisticCoefficients,
    threshold = 0.5,
): 0 | 1 {
    const probability = predictProbability(
        point,
        coefficients,
    );

    return probability >= threshold ? 1 : 0;
}


/* =========================================================
   LOG LOSS
========================================================= */

export function calculateLogLoss(
    data: LogisticPoint[],
    coefficients: LogisticCoefficients,
): number {
    if (data.length === 0) {
        return 0;
    }

    const epsilon = 1e-15;

    let totalLoss = 0;

    for (const point of data) {
        const probability =
            predictProbability(
                point,
                coefficients,
            );

        const clippedProbability =
            Math.min(
                Math.max(
                    probability,
                    epsilon,
                ),
                1 - epsilon,
            );

        totalLoss +=
            -(
                point.label *
                    Math.log(
                        clippedProbability,
                    ) +
                (1 - point.label) *
                    Math.log(
                        1 - clippedProbability,
                    )
            );
    }

    return totalLoss / data.length;
}


/* =========================================================
   GRADIENTS
========================================================= */

export function calculateGradients(
    data: LogisticPoint[],
    coefficients: LogisticCoefficients,
): LogisticGradients {
    if (data.length === 0) {
        return {
            intercept: 0,
            xCoefficient: 0,
            zCoefficient: 0,
        };
    }

    let interceptGradient = 0;
    let xGradient = 0;
    let zGradient = 0;

    for (const point of data) {
        const probability =
            predictProbability(
                point,
                coefficients,
            );

        const error =
            probability - point.label;

        interceptGradient += error;

        xGradient +=
            error * point.x;

        zGradient +=
            error * point.z;
    }

    const scale = 1 / data.length;

    return {
        intercept:
            interceptGradient * scale,

        xCoefficient:
            xGradient * scale,

        zCoefficient:
            zGradient * scale,
    };
}


/* =========================================================
   GRADIENT DESCENT STEP
========================================================= */

export function logisticGradientDescentStep(
    data: LogisticPoint[],
    coefficients: LogisticCoefficients,
    learningRate: number,
): LogisticStepResult {
    const gradients =
        calculateGradients(
            data,
            coefficients,
        );

    const nextCoefficients: LogisticCoefficients = {
        intercept:
            coefficients.intercept -
            learningRate *
                gradients.intercept,

        xCoefficient:
            coefficients.xCoefficient -
            learningRate *
                gradients.xCoefficient,

        zCoefficient:
            coefficients.zCoefficient -
            learningRate *
                gradients.zCoefficient,
    };

    const loss =
        calculateLogLoss(
            data,
            nextCoefficients,
        );

    return {
        coefficients:
            nextCoefficients,

        loss,

        gradients,
    };
}


/* =========================================================
   GRADIENT MAGNITUDE
========================================================= */

export function calculateGradientMagnitude(
    gradients: LogisticGradients,
): number {
    return Math.sqrt(
        gradients.intercept *
            gradients.intercept +
        gradients.xCoefficient *
            gradients.xCoefficient +
        gradients.zCoefficient *
            gradients.zCoefficient,
    );
}


/* =========================================================
   ACCURACY
========================================================= */

export function calculateAccuracy(
    data: LogisticPoint[],
    coefficients: LogisticCoefficients,
    threshold = 0.5,
): number {
    if (data.length === 0) {
        return 0;
    }

    let correct = 0;

    for (const point of data) {
        const prediction =
            predictClass(
                point,
                coefficients,
                threshold,
            );

        if (prediction === point.label) {
            correct++;
        }
    }

    return correct / data.length;
}


/* =========================================================
   DECISION BOUNDARY
========================================================= */

export function calculateDecisionBoundaryZ(
    x: number,
    coefficients: LogisticCoefficients,
): number | null {
    /*
     * Logistic regression predicts 0.5 when:

     * sigmoid(score) = 0.5

     * which means:

     * score = 0

     * Therefore:

     * b0 + b1*x + b2*z = 0

     * z = -(b0 + b1*x) / b2
     */

    if (
        Math.abs(
            coefficients.zCoefficient,
        ) < 1e-12
    ) {
        return null;
    }

    return -(
        coefficients.intercept +
        coefficients.xCoefficient * x
    ) / coefficients.zCoefficient;
}


/* =========================================================
   INITIAL LOSS
========================================================= */

export const initialLogisticLoss =
    calculateLogLoss(
        logisticRegressionData,
        initialLogisticCoefficients,
    );


/* =========================================================
   INITIAL ACCURACY
========================================================= */

export const initialLogisticAccuracy =
    calculateAccuracy(
        logisticRegressionData,
        initialLogisticCoefficients,
    );

    /* =========================================================
   TRAIN / TEST SPLIT
========================================================= */

export const trainingData: LogisticPoint[] =
    logisticRegressionData.slice(0, 12);

export const testingData: LogisticPoint[] =
    logisticRegressionData.slice(12);


/* =========================================================
   TEST ACCURACY
========================================================= */

export function calculateTestAccuracy(
    coefficients: LogisticCoefficients,
    threshold = 0.5,
): number {
    return calculateAccuracy(
        testingData,
        coefficients,
        threshold,
    );
}


/* =========================================================
   TEST LOG LOSS
========================================================= */

export function calculateTestLogLoss(
    coefficients: LogisticCoefficients,
): number {
    return calculateLogLoss(
        testingData,
        coefficients,
    );
}


/* =========================================================
   TRAIN ACCURACY
========================================================= */

export function calculateTrainingAccuracy(
    coefficients: LogisticCoefficients,
    threshold = 0.5,
): number {
    return calculateAccuracy(
        trainingData,
        coefficients,
        threshold,
    );
}


/* =========================================================
   TRAIN LOG LOSS
========================================================= */

export function calculateTrainingLogLoss(
    coefficients: LogisticCoefficients,
): number {
    return calculateLogLoss(
        trainingData,
        coefficients,
    );
}