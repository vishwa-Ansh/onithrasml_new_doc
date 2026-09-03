export interface PCADataPoint {
    x: number;
    y: number;
    z: number;
}

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface PCAResult {
    mean: Vector3;
    pc1: Vector3;
    pc2: Vector3;
    eigenvalue1: number;
    eigenvalue2: number;
    explainedVariance1: number;
    explainedVariance2: number;
}

export const pcaData: PCADataPoint[] = [
    { x: -3.0, y: -2.4, z: -1.8 },
    { x: -2.4, y: -2.0, z: -1.4 },
    { x: -1.8, y: -1.5, z: -1.2 },
    { x: -1.2, y: -1.1, z: -0.7 },
    { x: -0.6, y: -0.5, z: -0.4 },
    { x: 0.0, y: 0.1, z: 0.1 },
    { x: 0.7, y: 0.6, z: 0.5 },
    { x: 1.3, y: 1.1, z: 0.9 },
    { x: 1.9, y: 1.6, z: 1.4 },
    { x: 2.5, y: 2.1, z: 1.8 },
    { x: 3.1, y: 2.7, z: 2.3 },
    { x: -2.5, y: -1.8, z: -2.2 },
    { x: -1.5, y: -1.0, z: -1.5 },
    { x: 0.5, y: 0.4, z: 0.8 },
    { x: 2.0, y: 1.8, z: 1.0 },
];

function dot(a: Vector3, b: Vector3): number {
    return (
        a.x * b.x +
        a.y * b.y +
        a.z * b.z
    );
}

function magnitude(v: Vector3): number {
    return Math.sqrt(
        v.x * v.x +
        v.y * v.y +
        v.z * v.z
    );
}

function normalize(v: Vector3): Vector3 {
    const length = magnitude(v);

    if (length === 0) {
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    }

    return {
        x: v.x / length,
        y: v.y / length,
        z: v.z / length,
    };
}

function subtract(
    a: Vector3,
    b: Vector3
): Vector3 {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z,
    };
}

function multiply(
    vector: Vector3,
    scalar: number
): Vector3 {
    return {
        x: vector.x * scalar,
        y: vector.y * scalar,
        z: vector.z * scalar,
    };
}

function calculateMean(
    data: PCADataPoint[]
): Vector3 {
    if (data.length === 0) {
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    }

    let x = 0;
    let y = 0;
    let z = 0;

    for (const point of data) {
        x += point.x;
        y += point.y;
        z += point.z;
    }

    return {
        x: x / data.length,
        y: y / data.length,
        z: z / data.length,
    };
}

function calculateCovarianceMatrix(
    data: PCADataPoint[],
    mean: Vector3
): number[][] {
    const covariance = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    if (data.length < 2) {
        return covariance;
    }

    for (const point of data) {
        const centered = {
            x: point.x - mean.x,
            y: point.y - mean.y,
            z: point.z - mean.z,
        };

        covariance[0][0] +=
            centered.x * centered.x;

        covariance[0][1] +=
            centered.x * centered.y;

        covariance[0][2] +=
            centered.x * centered.z;

        covariance[1][0] +=
            centered.y * centered.x;

        covariance[1][1] +=
            centered.y * centered.y;

        covariance[1][2] +=
            centered.y * centered.z;

        covariance[2][0] +=
            centered.z * centered.x;

        covariance[2][1] +=
            centered.z * centered.y;

        covariance[2][2] +=
            centered.z * centered.z;
    }

    const scale = 1 / (data.length - 1);

    return covariance.map((row) =>
        row.map((value) => value * scale)
    );
}

function matrixVectorMultiply(
    matrix: number[][],
    vector: Vector3
): Vector3 {
    return {
        x:
            matrix[0][0] * vector.x +
            matrix[0][1] * vector.y +
            matrix[0][2] * vector.z,

        y:
            matrix[1][0] * vector.x +
            matrix[1][1] * vector.y +
            matrix[1][2] * vector.z,

        z:
            matrix[2][0] * vector.x +
            matrix[2][1] * vector.y +
            matrix[2][2] * vector.z,
    };
}

function powerIteration(
    matrix: number[][],
    iterations = 100
): {
    vector: Vector3;
    eigenvalue: number;
} {
    let vector: Vector3 = normalize({
        x: 1,
        y: 1,
        z: 1,
    });

    for (let i = 0; i < iterations; i++) {
        vector = normalize(
            matrixVectorMultiply(
                matrix,
                vector
            )
        );
    }

    const transformed =
        matrixVectorMultiply(
            matrix,
            vector
        );

    const eigenvalue =
        dot(vector, transformed);

    return {
        vector,
        eigenvalue,
    };
}

function deflateMatrix(
    matrix: number[][],
    vector: Vector3,
    eigenvalue: number
): number[][] {
    const components = [
        vector.x,
        vector.y,
        vector.z,
    ];

    return matrix.map(
        (row, i) =>
            row.map(
                (value, j) =>
                    value -
                    eigenvalue *
                        components[i] *
                        components[j]
            )
    );
}

export function calculatePCA(
    data: PCADataPoint[]
): PCAResult {
    const mean = calculateMean(data);

    const covariance =
        calculateCovarianceMatrix(
            data,
            mean
        );

    const first =
        powerIteration(covariance);

    const deflated =
        deflateMatrix(
            covariance,
            first.vector,
            first.eigenvalue
        );

    const second =
        powerIteration(deflated);

    const totalVariance =
        Math.max(
            first.eigenvalue +
                second.eigenvalue,
            Number.EPSILON
        );

    return {
        mean,

        pc1: normalize(
            first.vector
        ),

        pc2: normalize(
            second.vector
        ),

        eigenvalue1:
            first.eigenvalue,

        eigenvalue2:
            second.eigenvalue,

        explainedVariance1:
            first.eigenvalue /
            totalVariance,

        explainedVariance2:
            second.eigenvalue /
            totalVariance,
    };
}

export function projectPoint(
    point: PCADataPoint,
    result: PCAResult
): Vector3 {
    const centered = subtract(
        point,
        result.mean
    );

    return {
        x:
            dot(
                centered,
                result.pc1
            ),

        y:
            dot(
                centered,
                result.pc2
            ),

        z: 0,
    };
}

export function reconstructPoint(
    projection: Vector3,
    result: PCAResult
): Vector3 {
    const firstComponent =
        multiply(
            result.pc1,
            projection.x
        );

    const secondComponent =
        multiply(
            result.pc2,
            projection.y
        );

    return {
        x:
            result.mean.x +
            firstComponent.x +
            secondComponent.x,

        y:
            result.mean.y +
            firstComponent.y +
            secondComponent.y,

        z:
            result.mean.z +
            firstComponent.z +
            secondComponent.z,
    };
}

export const pcaResult =
    calculatePCA(pcaData);