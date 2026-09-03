export interface RegressionPoint {
    x: number;
    y: number;
    z: number;
}

export interface RegressionCoefficients {
    intercept: number;
    xCoefficient: number;
    zCoefficient: number;
}

export interface RegressionGradients {
    intercept: number;
    xCoefficient: number;
    zCoefficient: number;
}

export const linearRegressionData: RegressionPoint[] = [
    { x: -3, y: 1.2, z: -2 },
    { x: -2.2, y: 1.7, z: -1 },
    { x: -1.5, y: 2.1, z: 0 },
    { x: -0.7, y: 2.4, z: 1 },
    { x: 0, y: 3, z: 1.5 },
    { x: 0.8, y: 3.2, z: 2 },
    { x: 1.6, y: 3.8, z: 2.5 },
    { x: 2.5, y: 4.2, z: 3 },
];

export const initialCoefficients: RegressionCoefficients = {
    intercept: 0,
    xCoefficient: 0,
    zCoefficient: 0,
};

export function predict(
    point: RegressionPoint,
    coefficients: RegressionCoefficients
): number {
    return (
        coefficients.intercept +
        coefficients.xCoefficient * point.x +
        coefficients.zCoefficient * point.z
    );
}

/**
 * Mean Squared Error
 *
 * J(w,b) = 1/n Σ(prediction - actual)²
 */
export function calculateLoss(
    data: RegressionPoint[],
    coefficients: RegressionCoefficients
): number {
    if (data.length === 0) {
        return 0;
    }

    let totalError = 0;

    for (const point of data) {
        const prediction = predict(point, coefficients);
        const error = prediction - point.y;

        totalError += error * error;
    }

    return totalError / data.length;
}

/**
 * Calculate the gradient of the MSE loss.
 *
 * ∂J/∂b  = 2/n Σ(error)
 * ∂J/∂w₁ = 2/n Σ(error × x)
 * ∂J/∂w₂ = 2/n Σ(error × z)
 */
export function calculateGradients(
    data: RegressionPoint[],
    coefficients: RegressionCoefficients
): RegressionGradients {
    if (data.length === 0) {
        return {
            intercept: 0,
            xCoefficient: 0,
            zCoefficient: 0,
        };
    }

    let gradientIntercept = 0;
    let gradientX = 0;
    let gradientZ = 0;

    for (const point of data) {
        const prediction = predict(point, coefficients);
        const error = prediction - point.y;

        gradientIntercept += error;
        gradientX += error * point.x;
        gradientZ += error * point.z;
    }

    const scale = 2 / data.length;

    return {
        intercept: scale * gradientIntercept,
        xCoefficient: scale * gradientX,
        zCoefficient: scale * gradientZ,
    };
}

/**
 * Perform one Gradient Descent parameter update.
 *
 * parameter_new =
 * parameter_old - learningRate × gradient
 */
export function gradientDescentStep(
    data: RegressionPoint[],
    coefficients: RegressionCoefficients,
    learningRate: number
): RegressionCoefficients {
    const gradients = calculateGradients(data, coefficients);

    return {
        intercept:
            coefficients.intercept -
            learningRate * gradients.intercept,

        xCoefficient:
            coefficients.xCoefficient -
            learningRate * gradients.xCoefficient,

        zCoefficient:
            coefficients.zCoefficient -
            learningRate * gradients.zCoefficient,
    };
}