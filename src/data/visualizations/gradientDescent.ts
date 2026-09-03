export interface GradientPoint {
    x: number;
    y: number;
    loss: number;
}

export interface GradientState {
    x: number;
    y: number;
    loss: number;
}

export interface Gradient {
    x: number;
    y: number;
}

export function calculateLoss(x: number, y: number): number {
    return (
        0.5 * x * x +
        0.8 * y * y +
        0.25 * x * y
    );
}

export function calculateGradient(
    x: number,
    y: number
): Gradient {
    return {
        x: x + 0.25 * y,
        y: 1.6 * y + 0.25 * x,
    };
}

export function gradientDescentStep(
    state: GradientState,
    learningRate: number
): GradientState {
    const gradient = calculateGradient(
        state.x,
        state.y
    );

    const nextX =
        state.x -
        learningRate * gradient.x;

    const nextY =
        state.y -
        learningRate * gradient.y;

    return {
        x: nextX,
        y: nextY,
        loss: calculateLoss(nextX, nextY),
    };
}

export function calculateGradientMagnitude(
    gradient: Gradient
): number {
    return Math.sqrt(
        gradient.x * gradient.x +
        gradient.y * gradient.y
    );
}

export const initialGradientState: GradientState = {
    x: 3,
    y: 2.5,
    loss: calculateLoss(3, 2.5),
};