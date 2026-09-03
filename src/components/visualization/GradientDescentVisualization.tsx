import { Canvas, useFrame } from "@react-three/fiber";
import {
    Grid,
    Line,
    OrbitControls,
    Text,
} from "@react-three/drei";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import * as THREE from "three";

import {
    calculateGradient,
    calculateLoss,
    initialGradientState,
    type GradientState,
} from "../../data/visualizations/gradientDescent";

import "./GradientDescentVisualization.css";


/* =========================================================
   LOSS SURFACE
========================================================= */

function LossSurface() {
    const geometry = useMemo(() => {
        const size = 6;
        const segments = 40;

        const positions: number[] = [];
        const indices: number[] = [];

        for (let iy = 0; iy <= segments; iy++) {
            const y =
                -size +
                (2 * size * iy) / segments;

            for (let ix = 0; ix <= segments; ix++) {
                const x =
                    -size +
                    (2 * size * ix) / segments;

                const loss =
                    calculateLoss(x, y);

                positions.push(
                    x,
                    loss,
                    y
                );
            }
        }

        for (let iy = 0; iy < segments; iy++) {
            for (let ix = 0; ix < segments; ix++) {
                const a =
                    iy * (segments + 1) +
                    ix;

                const b = a + 1;

                const c =
                    a + (segments + 1);

                const d = c + 1;

                indices.push(
                    a,
                    c,
                    b
                );

                indices.push(
                    b,
                    c,
                    d
                );
            }
        }

        const bufferGeometry =
            new THREE.BufferGeometry();

        bufferGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
                positions,
                3
            )
        );

        bufferGeometry.setIndex(indices);

        bufferGeometry.computeVertexNormals();

        return bufferGeometry;
    }, []);

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial
                wireframe
                transparent
                opacity={0.45}
            />
        </mesh>
    );
}


/* =========================================================
   OPTIMIZATION PATH
========================================================= */

function GradientPath({
    history,
}: {
    history: GradientState[];
}) {
    if (history.length < 2) {
        return null;
    }

    return (
        <group>
            <Line
                points={history.map(
                    (point) => [
                        point.x,
                        point.loss,
                        point.y,
                    ]
                )}
                lineWidth={3}
            />

            {history.map(
                (point, index) => {
                    if (index === 0) {
                        return null;
                    }

                    return (
                        <group
                            key={index}
                        >
                            <mesh
                                position={[
                                    point.x,
                                    point.loss,
                                    point.y,
                                ]}
                            >
                                <sphereGeometry
                                    args={[
                                        0.055,
                                        12,
                                        12,
                                    ]}
                                />

                                <meshStandardMaterial />
                            </mesh>

                            <Text
                                position={[
                                    point.x,
                                    point.loss +
                                        0.18,
                                    point.y,
                                ]}
                                fontSize={0.12}
                                anchorX="center"
                                anchorY="middle"
                            >
                                {index}
                            </Text>
                        </group>
                    );
                }
            )}
        </group>
    );
}


/* =========================================================
   GLOBAL MINIMUM
========================================================= */

function MinimumPoint() {
    const loss =
        calculateLoss(0, 0);

    return (
        <group>
            <mesh
                position={[
                    0,
                    loss,
                    0,
                ]}
            >
                <sphereGeometry
                    args={[
                        0.16,
                        24,
                        24,
                    ]}
                />

                <meshStandardMaterial />
            </mesh>

            <Text
                position={[
                    0,
                    loss + 0.3,
                    0,
                ]}
                fontSize={0.18}
                anchorX="center"
                anchorY="middle"
            >
                Global Minimum
            </Text>
        </group>
    );
}


/* =========================================================
   CURRENT OPTIMIZATION POINT
========================================================= */

function CurrentPoint({
    state,
}: {
    state: GradientState;
}) {
    const meshRef =
        useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }

        meshRef.current.position.set(
            state.x,
            state.loss,
            state.y
        );
    });

    return (
        <mesh
            ref={meshRef}
            position={[
                state.x,
                state.loss,
                state.y,
            ]}
        >
            <sphereGeometry
                args={[
                    0.12,
                    24,
                    24,
                ]}
            />

            <meshStandardMaterial />
        </mesh>
    );
}


/* =========================================================
   NEGATIVE GRADIENT ARROW
========================================================= */

function GradientVector({
    state,
}: {
    state: GradientState;
}) {
    const gradient =
        calculateGradient(
            state.x,
            state.y
        );

    const scale = 0.5;

    const start: [
        number,
        number,
        number
    ] = [
        state.x,
        state.loss,
        state.y,
    ];

    const endX =
        state.x -
        gradient.x * scale;

    const endY =
        state.y -
        gradient.y * scale;

    const endLoss =
        calculateLoss(
            endX,
            endY
        );

    const end: [
        number,
        number,
        number
    ] = [
        endX,
        endLoss,
        endY,
    ];

    const direction =
        new THREE.Vector3(
            endX - state.x,
            endLoss - state.loss,
            endY - state.y
        );

    const length =
        direction.length();

    if (length === 0) {
        return null;
    }

    direction.normalize();

    const arrowHeadLength =
        Math.min(
            0.22,
            length * 0.35
        );

    const arrowHeadWidth =
        arrowHeadLength * 0.55;

    return (
        <group>
            <Line
                points={[
                    start,
                    end,
                ]}
                lineWidth={4}
            />

            <arrowHelper
                args={[
                    direction,
                    new THREE.Vector3(
                        endX,
                        endLoss,
                        endY
                    ),
                    arrowHeadLength,
                    undefined,
                    arrowHeadWidth,
                ]}
            />
        </group>
    );
}


/* =========================================================
   3D SCENE
========================================================= */

function Scene({
    state,
    history,
}: {
    state: GradientState;
    history: GradientState[];
}) {
    return (
        <>
            <ambientLight
                intensity={1.5}
            />

            <directionalLight
                position={[
                    5,
                    8,
                    5,
                ]}
                intensity={2}
            />

            <Grid
                args={[
                    14,
                    14,
                ]}
                position={[
                    0,
                    0,
                    0,
                ]}
                cellSize={1}
                sectionSize={3}
                fadeDistance={18}
            />

            <axesHelper args={[4]} />

            <LossSurface />

            <GradientPath
                history={history}
            />

            <MinimumPoint />

            <GradientVector
                state={state}
            />

            <CurrentPoint
                state={state}
            />

            <Text
                position={[
                    3,
                    0,
                    3,
                ]}
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
            >
                Parameter X
            </Text>

            <Text
                position={[
                    -3,
                    0,
                    3,
                ]}
                fontSize={0.25}
                anchorX="center"
                anchorY="middle"
            >
                Parameter Y
            </Text>

            <Text
                position={[
                    0,
                    4,
                    0,
                ]}
                fontSize={0.3}
                anchorX="center"
                anchorY="middle"
            >
                Loss
            </Text>

            <OrbitControls
                enableDamping
                dampingFactor={0.08}
            />
        </>
    );
}


/* =========================================================
   LOSS CURVE
========================================================= */

function GradientDescentLossCurve({
    history,
}: {
    history: GradientState[];
}) {
    if (history.length < 2) {
        return null;
    }

    const width = 360;
    const height = 160;
    const padding = 20;

    const losses =
        history.map(
            (point) => point.loss
        );

    const maxLoss =
        Math.max(...losses);

    const minLoss =
        Math.min(...losses);

    const lossRange =
        maxLoss - minLoss || 1;

    const points =
        history
            .map(
                (point, index) => {
                    const x =
                        padding +
                        (index /
                            Math.max(
                                history.length -
                                    1,
                                1
                            )) *
                            (width -
                                padding *
                                    2);

                    const y =
                        height -
                        padding -
                        ((point.loss -
                            minLoss) /
                            lossRange) *
                            (height -
                                padding *
                                    2);

                    return `${x},${y}`;
                }
            )
            .join(" ");

    const lastPoint =
        history[
            history.length - 1
        ];

    const lastX =
        padding +
        ((history.length - 1) /
            Math.max(
                history.length - 1,
                1
            )) *
            (width -
                padding * 2);

    const lastY =
        height -
        padding -
        ((lastPoint.loss -
            minLoss) /
            lossRange) *
            (height -
                padding * 2);

    return (
        <div className="gradient-descent-loss-curve">
            <div className="gradient-descent-loss-title">
                LOSS HISTORY
            </div>

            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
            >
                <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={
                        height -
                        padding
                    }
                    stroke="currentColor"
                    opacity="0.25"
                />

                <line
                    x1={padding}
                    y1={
                        height -
                        padding
                    }
                    x2={
                        width -
                        padding
                    }
                    y2={
                        height -
                        padding
                    }
                    stroke="currentColor"
                    opacity="0.25"
                />

                <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <circle
                    cx={lastX}
                    cy={lastY}
                    r="5"
                    fill="currentColor"
                />
            </svg>

            <div className="gradient-descent-loss-axis">
                <span>
                    Iteration 0
                </span>

                <span>
                    Iteration{" "}
                    {history.length - 1}
                </span>
            </div>
        </div>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export function GradientDescentVisualization() {
    const [state, setState] =
        useState<GradientState>(
            initialGradientState
        );

    const [history, setHistory] =
        useState<GradientState[]>([
            initialGradientState,
        ]);

    const [learningRate, setLearningRate] =
        useState(0.08);

    const [iteration, setIteration] =
        useState(0);

    const [running, setRunning] =
        useState(false);

    const [converged, setConverged] =
        useState(false);

    const [diverged, setDiverged] =
        useState(false);

    const maxIterations = 100;


    /* =====================================================
       AUTOMATIC TRAINING
    ===================================================== */

    useEffect(() => {
        if (!running) {
            return;
        }

        if (converged || diverged) {
            return;
        }

        if (
            iteration >=
            maxIterations
        ) {
            setRunning(false);
            return;
        }

        const timer =
            window.setTimeout(() => {
                const gradient =
                    calculateGradient(
                        state.x,
                        state.y
                    );

                const nextX =
                    state.x -
                    learningRate *
                        gradient.x;

                const nextY =
                    state.y -
                    learningRate *
                        gradient.y;

                const nextLoss =
                    calculateLoss(
                        nextX,
                        nextY
                    );

                const nextState: GradientState =
                    {
                        x: nextX,
                        y: nextY,
                        loss: nextLoss,
                    };

                const gradientMagnitude =
                    Math.sqrt(
                        gradient.x *
                            gradient.x +
                            gradient.y *
                                gradient.y
                    );

                const nextIteration =
                    iteration + 1;


                /* -----------------------------------------
                   DIVERGENCE CHECK
                ----------------------------------------- */

                if (
                    !Number.isFinite(
                        nextLoss
                    ) ||
                    Math.abs(nextX) >
                        100 ||
                    Math.abs(nextY) >
                        100 ||
                    nextLoss > 10000
                ) {
                    setDiverged(true);
                    setRunning(false);
                    return;
                }


                setState(nextState);

                setHistory(
                    (currentHistory) => [
                        ...currentHistory,
                        nextState,
                    ]
                );

                setIteration(
                    nextIteration
                );


                /* -----------------------------------------
                   CONVERGENCE CHECK
                ----------------------------------------- */

                if (
                    gradientMagnitude <
                    0.001
                ) {
                    setConverged(true);
                    setRunning(false);
                    return;
                }


                /* -----------------------------------------
                   MAX ITERATIONS
                ----------------------------------------- */

                if (
                    nextIteration >=
                    maxIterations
                ) {
                    setRunning(false);
                }
            }, 150);

        return () => {
            window.clearTimeout(
                timer
            );
        };
    }, [
        running,
        converged,
        diverged,
        iteration,
        state,
        learningRate,
    ]);


    /* =====================================================
       MANUAL STEP
    ===================================================== */

    function handleStep() {
        if (
            converged ||
            diverged ||
            running
        ) {
            return;
        }

        if (
            iteration >=
            maxIterations
        ) {
            return;
        }

        const gradient =
            calculateGradient(
                state.x,
                state.y
            );

        const nextX =
            state.x -
            learningRate *
                gradient.x;

        const nextY =
            state.y -
            learningRate *
                gradient.y;

        const nextLoss =
            calculateLoss(
                nextX,
                nextY
            );

        const nextState: GradientState =
            {
                x: nextX,
                y: nextY,
                loss: nextLoss,
            };

        const gradientMagnitude =
            Math.sqrt(
                gradient.x *
                    gradient.x +
                    gradient.y *
                        gradient.y
            );

        const nextIteration =
            iteration + 1;


        if (
            !Number.isFinite(
                nextLoss
            ) ||
            Math.abs(nextX) >
                100 ||
            Math.abs(nextY) >
                100 ||
            nextLoss > 10000
        ) {
            setDiverged(true);
            return;
        }


        setState(nextState);

        setHistory(
            (currentHistory) => [
                ...currentHistory,
                nextState,
            ]
        );

        setIteration(
            nextIteration
        );


        if (
            gradientMagnitude <
            0.001
        ) {
            setConverged(true);
        }

        if (
            nextIteration >=
            maxIterations
        ) {
            setRunning(false);
        }
    }


    /* =====================================================
       START / STOP
    ===================================================== */

    function handleStartStop() {
        if (
            converged ||
            diverged
        ) {
            return;
        }

        if (
            iteration >=
            maxIterations
        ) {
            return;
        }

        setRunning(
            (currentRunning) =>
                !currentRunning
        );
    }


    /* =====================================================
       RESET
    ===================================================== */

    function handleReset() {
        setRunning(false);
        setConverged(false);
        setDiverged(false);

        setState(
            initialGradientState
        );

        setHistory([
            initialGradientState,
        ]);

        setIteration(0);
    }


    /* =====================================================
       CURRENT METRICS
    ===================================================== */

    const gradient =
        calculateGradient(
            state.x,
            state.y
        );

    const gradientMagnitude =
        Math.sqrt(
            gradient.x *
                gradient.x +
                gradient.y *
                    gradient.y
        );


    let learningRateStatus =
        "Stable";

    if (
        learningRate < 0.04
    ) {
        learningRateStatus =
            "Slow";
    } else if (
        learningRate > 0.14
    ) {
        learningRateStatus =
            "Aggressive";
    }


    let status =
        "Ready";

    if (diverged) {
        status = "Diverged";
    } else if (converged) {
        status = "Converged";
    } else if (running) {
        status = "Training";
    }


    return (
        <div className="gradient-descent-viz">

            {/* =============================================
                3D VISUALIZATION
            ============================================= */}

            <div className="gradient-descent-canvas">
                <Canvas
                    camera={{
                        position: [
                            8,
                            7,
                            8,
                        ],
                        fov: 45,
                    }}
                >
                    <Scene
                        state={state}
                        history={history}
                    />
                </Canvas>
            </div>


            {/* =============================================
                CONTROLS
            ============================================= */}

            <div className="gradient-descent-controls">

                <button
                    type="button"
                    onClick={
                        handleStartStop
                    }
                    disabled={
                        converged ||
                        diverged ||
                        iteration >=
                            maxIterations
                    }
                >
                    {running
                        ? "Stop"
                        : converged
                            ? "Converged"
                            : diverged
                                ? "Diverged"
                                : "Start"}
                </button>


                <button
                    type="button"
                    onClick={
                        handleStep
                    }
                    disabled={
                        running ||
                        converged ||
                        diverged ||
                        iteration >=
                            maxIterations
                    }
                >
                    Step
                </button>


                <button
                    type="button"
                    onClick={
                        handleReset
                    }
                >
                    Reset
                </button>


                <label>
                    <span>
                        Learning Rate
                    </span>

                    <input
                        type="range"
                        min="0.01"
                        max="0.2"
                        step="0.01"
                        value={
                            learningRate
                        }
                        disabled={running}
                        onChange={(
                            event
                        ) =>
                            setLearningRate(
                                Number(
                                    event
                                        .target
                                        .value
                                )
                            )
                        }
                    />

                    <strong>
                        {learningRate.toFixed(
                            2
                        )}
                    </strong>
                </label>

            </div>


            {/* =============================================
                METRICS
            ============================================= */}

            <div className="gradient-descent-info">

                <div>
                    <strong>
                        Status
                    </strong>

                    <span>
                        {status}
                    </span>
                </div>


                <div>
                    <strong>
                        Iteration
                    </strong>

                    <span>
                        {iteration} /{" "}
                        {maxIterations}
                    </span>
                </div>


                <div>
                    <strong>
                        Loss
                    </strong>

                    <span>
                        {state.loss.toFixed(
                            4
                        )}
                    </span>
                </div>


                <div>
                    <strong>
                        Gradient
                    </strong>

                    <span>
                        (
                        {gradient.x.toFixed(
                            3
                        )}
                        ,{" "}
                        {gradient.y.toFixed(
                            3
                        )}
                        )
                    </span>
                </div>


                <div>
                    <strong>
                        Gradient Magnitude
                    </strong>

                    <span>
                        {gradientMagnitude.toFixed(
                            4
                        )}
                    </span>
                </div>


                <div>
                    <strong>
                        Position
                    </strong>

                    <span>
                        (
                        {state.x.toFixed(
                            3
                        )}
                        ,{" "}
                        {state.y.toFixed(
                            3
                        )}
                        )
                    </span>
                </div>


                <div>
                    <strong>
                        Learning Rate
                    </strong>

                    <span>
                        {learningRate.toFixed(
                            2
                        )}
                    </span>
                </div>


                <div>
                    <strong>
                        Step Behavior
                    </strong>

                    <span>
                        {learningRateStatus}
                    </span>
                </div>

            </div>


            {/* =============================================
                LOSS HISTORY
            ============================================= */}

            <GradientDescentLossCurve
                history={history}
            />

        </div>
    );
}