import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

import {
    naiveBayesData,
    initialQueryPoint,
    initialClassStatistics,
    predictNaiveBayes,
    calculateFeatureLikelihood,
    type ClassLabel,
} from "../../data/visualizations/naiveBayes";

import "./NaiveBayesVisualization.css";


/* =========================================================
   TYPES
========================================================= */

type TrainingStep =
    | "prior"
    | "likelihood"
    | "posterior"
    | "prediction";


/* =========================================================
   CONSTANTS
========================================================= */

const STEP_ORDER: TrainingStep[] = [
    "prior",
    "likelihood",
    "posterior",
    "prediction",
];

const STEP_LABELS: Record<TrainingStep, string> = {
    prior: "Prior Probability",
    likelihood: "Feature Likelihood",
    posterior: "Posterior Probability",
    prediction: "Final Prediction",
};


/* =========================================================
   COLORS
========================================================= */

const CLASS_0_COLOR = "#2563eb";
const CLASS_0_EMISSIVE = "#1d4ed8";

const CLASS_1_COLOR = "#f97316";
const CLASS_1_EMISSIVE = "#ea580c";

const QUERY_COLOR = "#a855f7";
const QUERY_EMISSIVE = "#9333ea";

const PREDICTION_COLOR = "#16a34a";


/* =========================================================
   HELPERS
========================================================= */

function formatProbability(
    value: number,
): string {
    return `${(value * 100).toFixed(1)}%`;
}


function clamp(
    value: number,
    min: number,
    max: number,
): number {
    return Math.max(
        min,
        Math.min(max, value),
    );
}


/* =========================================================
   GRID
========================================================= */

function Grid() {
    return (
        <gridHelper
            args={[10, 10]}
            position={[4, 0, 4]}
        />
    );
}


/* =========================================================
   AXES
========================================================= */

function Axes() {
    return (
        <group>
            {/* X axis */}
            <mesh
                position={[4, 0.01, 0]}
            >
                <boxGeometry
                    args={[9, 0.035, 0.035]}
                />

                <meshBasicMaterial
                    color="#64748b"
                />
            </mesh>

            {/* Z axis */}
            <mesh
                position={[0, 0.01, 4]}
            >
                <boxGeometry
                    args={[0.035, 0.035, 9]}
                />

                <meshBasicMaterial
                    color="#64748b"
                />
            </mesh>

            {/* X label */}
            <Text
                position={[8.7, 0.18, 0]}
                fontSize={0.28}
                color="#334155"
                anchorX="center"
                anchorY="middle"
            >
                Feature X
            </Text>

            {/* Y label */}
            <Text
                position={[-0.25, 4.5, 0]}
                fontSize={0.28}
                color="#334155"
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0, 0]}
            >
                Probability
            </Text>

            {/* Z label */}
            <Text
                position={[0, 0.18, 8.7]}
                fontSize={0.28}
                color="#334155"
                anchorX="center"
                anchorY="middle"
            >
                Feature Y
            </Text>
        </group>
    );
}


/* =========================================================
   DATA POINT
========================================================= */

interface DataPointProps {
    x: number;
    y: number;
    label: ClassLabel;
}

function DataPoint({
    x,
    y,
    label,
}: DataPointProps) {
    const isClass0 = label === 0;

    const color = isClass0
        ? CLASS_0_COLOR
        : CLASS_1_COLOR;

    const emissive = isClass0
        ? CLASS_0_EMISSIVE
        : CLASS_1_EMISSIVE;

    return (
        <group
            position={[
                x,
                0.22,
                y,
            ]}
        >
            {/* Glow */}
            <mesh>
                <sphereGeometry
                    args={[0.23, 20, 20]}
                />

                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.13}
                />
            </mesh>

            {/* Main point */}
            <mesh>
                <sphereGeometry
                    args={[0.13, 20, 20]}
                />

                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.45}
                    roughness={0.3}
                    metalness={0.05}
                />
            </mesh>
        </group>
    );
}


/* =========================================================
   CLASS CENTER
========================================================= */

interface ClassCenterProps {
    x: number;
    y: number;
    label: ClassLabel;
    visible: boolean;
}

function ClassCenter({
    x,
    y,
    label,
    visible,
}: ClassCenterProps) {
    if (!visible) {
        return null;
    }

    const isClass0 = label === 0;

    const color = isClass0
        ? CLASS_0_COLOR
        : CLASS_1_COLOR;

    const emissive = isClass0
        ? CLASS_0_EMISSIVE
        : CLASS_1_EMISSIVE;

    return (
        <group
            position={[
                x,
                0.38,
                y,
            ]}
        >
            {/* Outer ring */}
            <mesh
                rotation={[
                    Math.PI / 2,
                    0,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        0.38,
                        0.055,
                        16,
                        32,
                    ]}
                />

                <meshBasicMaterial
                    color={color}
                />
            </mesh>

            {/* Center */}
            <mesh>
                <octahedronGeometry
                    args={[0.25, 0]}
                />

                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.5}
                    roughness={0.25}
                />
            </mesh>

            <Text
                position={[
                    0,
                    0.55,
                    0,
                ]}
                fontSize={0.25}
                color={color}
                anchorX="center"
                anchorY="middle"
            >
                {`Class ${label} mean`}
            </Text>
        </group>
    );
}


/* =========================================================
   QUERY POINT
========================================================= */

interface QueryPointProps {
    x: number;
    y: number;
    visible: boolean;
    predictedClass: ClassLabel;
}

function QueryPoint({
    x,
    y,
    visible,
    predictedClass,
}: QueryPointProps) {
    if (!visible) {
        return null;
    }

    const predictedColor =
        predictedClass === 0
            ? CLASS_0_COLOR
            : CLASS_1_COLOR;

    return (
        <group
            position={[
                x,
                0.58,
                y,
            ]}
        >
            {/* Large glow */}
            <mesh>
                <sphereGeometry
                    args={[0.48, 24, 24]}
                />

                <meshBasicMaterial
                    color={QUERY_COLOR}
                    transparent
                    opacity={0.12}
                />
            </mesh>

            {/* Outer ring */}
            <mesh
                rotation={[
                    Math.PI / 2,
                    0,
                    0,
                ]}
            >
                <torusGeometry
                    args={[
                        0.38,
                        0.055,
                        16,
                        40,
                ]}
                />

                <meshBasicMaterial
                    color={QUERY_COLOR}
                />
            </mesh>

            {/* Query point */}
            <mesh>
                <sphereGeometry
                    args={[0.2, 24, 24]}
                />

                <meshStandardMaterial
                    color={QUERY_COLOR}
                    emissive={QUERY_EMISSIVE}
                    emissiveIntensity={1}
                    roughness={0.2}
                />
            </mesh>

            {/* Prediction ring */}
            <mesh
                rotation={[
                    0,
                    0,
                    Math.PI / 4,
                ]}
            >
                <torusGeometry
                    args={[
                        0.52,
                        0.025,
                        12,
                        32,
                ]}
                />

                <meshBasicMaterial
                    color={predictedColor}
                />
            </mesh>

            <Text
                position={[
                    0,
                    0.72,
                    0,
                ]}
                fontSize={0.24}
                color={QUERY_COLOR}
                anchorX="center"
                anchorY="middle"
            >
                Query
            </Text>
        </group>
    );
}


/* =========================================================
   CONNECTION TO CLASS MEANS
========================================================= */

interface LikelihoodLinesProps {
    queryX: number;
    queryY: number;
    show: boolean;
}

function LikelihoodLines({
    queryX,
    queryY,
    show,
}: LikelihoodLinesProps) {
    if (!show) {
        return null;
    }

    const class0 = initialClassStatistics[0];
    const class1 = initialClassStatistics[1];

    return (
        <group>
            {/* Query → Class 0 */}
            <line>
                <bufferGeometry
                    attach="geometry"
                    onUpdate={(geometry) => {
                        geometry.setFromPoints([
                            {
                                x: queryX,
                                y: 0.4,
                                z: queryY,
                            },
                            {
                                x: class0.meanX,
                                y: 0.4,
                                z: class0.meanY,
                            },
                        ] as never);
                    }}
                />

                <lineBasicMaterial
                    color={CLASS_0_COLOR}
                    transparent
                    opacity={0.45}
                />
            </line>

            {/* Query → Class 1 */}
            <line>
                <bufferGeometry
                    attach="geometry"
                    onUpdate={(geometry) => {
                        geometry.setFromPoints([
                            {
                                x: queryX,
                                y: 0.4,
                                z: queryY,
                            },
                            {
                                x: class1.meanX,
                                y: 0.4,
                                z: class1.meanY,
                            },
                        ] as never);
                    }}
                />

                <lineBasicMaterial
                    color={CLASS_1_COLOR}
                    transparent
                    opacity={0.45}
                />
            </line>
        </group>
    );
}


/* =========================================================
   PROBABILITY BARS
========================================================= */

interface ProbabilityBarsProps {
    probability0: number;
    probability1: number;
}

function ProbabilityBars({
    probability0,
    probability1,
}: ProbabilityBarsProps) {
    const height0 = clamp(
        probability0 * 3.6,
        0.08,
        3.6,
    );

    const height1 = clamp(
        probability1 * 3.6,
        0.08,
        3.6,
    );

    return (
        <group
            position={[
                7.2,
                0,
                1,
            ]}
        >
            {/* Class 0 bar */}
            <mesh
                position={[
                    0,
                    height0 / 2,
                    0,
                ]}
            >
                <boxGeometry
                    args={[
                        0.6,
                        height0,
                        0.6,
                    ]}
                />

                <meshStandardMaterial
                    color={CLASS_0_COLOR}
                    emissive={CLASS_0_EMISSIVE}
                    emissiveIntensity={0.25}
                    roughness={0.35}
                />
            </mesh>

            {/* Class 1 bar */}
            <mesh
                position={[
                    0,
                    height1 / 2,
                    2,
                ]}
            >
                <boxGeometry
                    args={[
                        0.6,
                        height1,
                        0.6,
                    ]}
                />

                <meshStandardMaterial
                    color={CLASS_1_COLOR}
                    emissive={CLASS_1_EMISSIVE}
                    emissiveIntensity={0.25}
                    roughness={0.35}
                />
            </mesh>

            <Text
                position={[
                    0,
                    3.95,
                    0,
                ]}
                fontSize={0.22}
                color={CLASS_0_COLOR}
                anchorX="center"
                anchorY="middle"
            >
                {`Class 0 ${(
                    probability0 * 100
                ).toFixed(0)}%`}
            </Text>

            <Text
                position={[
                    0,
                    3.95,
                    2,
                ]}
                fontSize={0.22}
                color={CLASS_1_COLOR}
                anchorX="center"
                anchorY="middle"
            >
                {`Class 1 ${(
                    probability1 * 100
                ).toFixed(0)}%`}
            </Text>
        </group>
    );
}


/* =========================================================
   SCENE
========================================================= */

interface NaiveBayesSceneProps {
    queryX: number;
    queryY: number;
    probability0: number;
    probability1: number;
    predictedClass: ClassLabel;
    step: TrainingStep;
}

function NaiveBayesScene({
    queryX,
    queryY,
    probability0,
    probability1,
    predictedClass,
    step,
}: NaiveBayesSceneProps) {
    const showCenters =
        step !== "prior";

    const showQuery =
        step !== "prior";

    const showLines =
        step === "likelihood" ||
        step === "posterior" ||
        step === "prediction";

    return (
        <>
            <color
                attach="background"
                args={["#f8fafc"]}
            />

            <ambientLight
                intensity={1.8}
            />

            <directionalLight
                position={[
                    5,
                    9,
                    6,
                ]}
                intensity={3}
            />

            <pointLight
                position={[
                    -3,
                    5,
                    4,
                ]}
                intensity={1.5}
            />

            <Grid />

            <Axes />

            {/* Training points */}
            {naiveBayesData.map(
                (point, index) => (
                    <DataPoint
                        key={`${point.label}-${index}`}
                        x={point.x}
                        y={point.y}
                        label={point.label}
                    />
                ),
            )}

            {/* Class means */}
            <ClassCenter
                x={initialClassStatistics[0].meanX}
                y={initialClassStatistics[0].meanY}
                label={0}
                visible={showCenters}
            />

            <ClassCenter
                x={initialClassStatistics[1].meanX}
                y={initialClassStatistics[1].meanY}
                label={1}
                visible={showCenters}
            />

            {/* Query → class connections */}
            <LikelihoodLines
                queryX={queryX}
                queryY={queryY}
                show={showLines}
            />

            {/* Query */}
            <QueryPoint
                x={queryX}
                y={queryY}
                visible={showQuery}
                predictedClass={
                    predictedClass
                }
            />

            {/* Probability bars */}
            {step === "prediction" && (
                <ProbabilityBars
                    probability0={
                        probability0
                    }
                    probability1={
                        probability1
                    }
                />
            )}

            <OrbitControls
                enablePan={false}
                minDistance={5}
                maxDistance={18}
                target={[
                    4,
                    0.5,
                    4,
                ]}
            />
        </>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export function NaiveBayesVisualization() {
    const [stepIndex, setStepIndex] =
        useState(0);

    const [queryX, setQueryX] =
        useState(
            initialQueryPoint.x,
        );

    const [queryY, setQueryY] =
        useState(
            initialQueryPoint.y,
        );

    const step =
        STEP_ORDER[stepIndex];


    /* =====================================================
       PREDICTION
    ===================================================== */

    const prediction = useMemo(
        () =>
            predictNaiveBayes(
                queryX,
                queryY,
            ),
        [queryX, queryY],
    );


    const class0Stats =
        initialClassStatistics[0];

    const class1Stats =
        initialClassStatistics[1];


    /* =====================================================
       LIKELIHOOD
    ===================================================== */

    const likelihood0 =
        calculateFeatureLikelihood(
            queryX,
            queryY,
            class0Stats,
        );

    const likelihood1 =
        calculateFeatureLikelihood(
            queryX,
            queryY,
            class1Stats,
        );


    /* =====================================================
       JOINT SCORE
    ===================================================== */

    const jointScore0 =
        likelihood0 *
        class0Stats.prior;

    const jointScore1 =
        likelihood1 *
        class1Stats.prior;


    /* =====================================================
       CONTROLS
    ===================================================== */

    const nextStep = () => {
        setStepIndex(
            (current) =>
                Math.min(
                    current + 1,
                    STEP_ORDER.length - 1,
                ),
        );
    };


    const previousStep = () => {
        setStepIndex(
            (current) =>
                Math.max(
                    current - 1,
                    0,
                ),
        );
    };


    const reset = () => {
        setStepIndex(0);

        setQueryX(
            initialQueryPoint.x,
        );

        setQueryY(
            initialQueryPoint.y,
        );
    };


    return (
        <section className="nb-visualization">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="nb-header">

                <div>

                    <span className="nb-eyebrow">
                        PROBABILISTIC CLASSIFICATION
                    </span>

                    <h3>
                        Gaussian Naive Bayes
                    </h3>

                    <p>
                        Follow how prior probabilities,
                        feature likelihoods and posterior
                        probabilities combine to classify
                        a new observation.
                    </p>

                </div>


                <div className="nb-status">
                    Step {stepIndex + 1} /{" "}
                    {STEP_ORDER.length}
                </div>

            </div>


            {/* =================================================
                3D GRAPH
            ================================================= */}

            <div className="nb-canvas">

                <Canvas
                    camera={{
                        position: [
                            10,
                            8,
                            10,
                        ],
                        fov: 45,
                    }}
                    dpr={[1, 2]}
                >

                    <NaiveBayesScene
                        queryX={queryX}
                        queryY={queryY}
                        probability0={
                            prediction.probabilityClass0
                        }
                        probability1={
                            prediction.probabilityClass1
                        }
                        predictedClass={
                            prediction.predictedClass
                        }
                        step={step}
                    />

                </Canvas>

            </div>


            {/* =================================================
                STEP CONTROLS
            ================================================= */}

            <div className="nb-controls">

                <div className="nb-step-title">

                    <span>
                        {STEP_LABELS[step]}
                    </span>

                    <strong>
                        {stepIndex + 1}
                    </strong>

                </div>


                <div className="nb-step-actions">

                    <button
                        type="button"
                        onClick={previousStep}
                        disabled={
                            stepIndex === 0
                        }
                    >
                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={
                            stepIndex ===
                            STEP_ORDER.length - 1
                        }
                    >
                        Next Step
                    </button>

                    <button
                        type="button"
                        onClick={reset}
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* =================================================
                QUERY
            ================================================= */}

            <div className="nb-query">

                <div className="nb-query-heading">

                    <span className="nb-section-label">
                        NEW OBSERVATION
                    </span>

                    <h4>
                        Move the query point
                    </h4>

                </div>


                <div className="nb-query-inputs">

                    <label>

                        <span>
                            Feature X
                        </span>

                        <input
                            type="range"
                            min="0.5"
                            max="7.8"
                            step="0.1"
                            value={queryX}
                            onChange={(event) =>
                                setQueryX(
                                    Number(
                                        event.target.value,
                                    ),
                                )
                            }
                        />

                        <strong>
                            {queryX.toFixed(1)}
                        </strong>

                    </label>


                    <label>

                        <span>
                            Feature Y
                        </span>

                        <input
                            type="range"
                            min="0.5"
                            max="7.8"
                            step="0.1"
                            value={queryY}
                            onChange={(event) =>
                                setQueryY(
                                    Number(
                                        event.target.value,
                                    ),
                                )
                            }
                        />

                        <strong>
                            {queryY.toFixed(1)}
                        </strong>

                    </label>

                </div>

            </div>


            {/* =================================================
                PROBABILITY CARDS
            ================================================= */}

            <div className="nb-probabilities">

                <div className="nb-probability-card">

                    <span>
                        P(Class 0 | X)
                    </span>

                    <strong
                        style={{
                            color: CLASS_0_COLOR,
                        }}
                    >
                        {formatProbability(
                            prediction.probabilityClass0,
                        )}
                    </strong>

                    <small>
                        Posterior probability
                    </small>

                </div>


                <div className="nb-probability-card">

                    <span>
                        P(Class 1 | X)
                    </span>

                    <strong
                        style={{
                            color: CLASS_1_COLOR,
                        }}
                    >
                        {formatProbability(
                            prediction.probabilityClass1,
                        )}
                    </strong>

                    <small>
                        Posterior probability
                    </small>

                </div>


                <div className="nb-probability-card nb-prediction-card">

                    <span>
                        Prediction
                    </span>

                    <strong
                        style={{
                            color: PREDICTION_COLOR,
                        }}
                    >
                        Class{" "}
                        {prediction.predictedClass}
                    </strong>

                    <small>
                        Highest posterior
                    </small>

                </div>

            </div>


            {/* =================================================
                MATHEMATICAL DETAILS
            ================================================= */}

            <div className="nb-details">

                <div className="nb-detail-card">

                    <span className="nb-section-label">
                        PRIOR
                    </span>

                    <h4>
                        P(Class)
                    </h4>

                    <p>
                        Class 0
                        <strong>
                            {formatProbability(
                                class0Stats.prior,
                            )}
                        </strong>
                    </p>

                    <p>
                        Class 1
                        <strong>
                            {formatProbability(
                                class1Stats.prior,
                            )}
                        </strong>
                    </p>

                </div>


                <div className="nb-detail-card">

                    <span className="nb-section-label">
                        LIKELIHOOD
                    </span>

                    <h4>
                        P(X | Class)
                    </h4>

                    <p>
                        Class 0
                        <strong>
                            {likelihood0.toFixed(
                                6,
                            )}
                        </strong>
                    </p>

                    <p>
                        Class 1
                        <strong>
                            {likelihood1.toFixed(
                                6,
                            )}
                        </strong>
                    </p>

                </div>


                <div className="nb-detail-card">

                    <span className="nb-section-label">
                        JOINT SCORE
                    </span>

                    <h4>
                        P(X | C) · P(C)
                    </h4>

                    <p>
                        Class 0
                        <strong>
                            {jointScore0.toFixed(
                                6,
                            )}
                        </strong>
                    </p>

                    <p>
                        Class 1
                        <strong>
                            {jointScore1.toFixed(
                                6,
                            )}
                        </strong>
                    </p>

                </div>

            </div>


            {/* =================================================
                FORMULA
            ================================================= */}

            <div className="nb-formula">

                <span>
                    Bayes' Theorem
                </span>

                <code>
                    P(C | X) = P(X | C) · P(C) / P(X)
                </code>

                <p>
                    Naive Bayes assumes that the
                    features are conditionally independent
                    given the class.
                </p>

            </div>


            {/* =================================================
                LEGEND
            ================================================= */}

            <div className="nb-legend">

                <div>
                    <span
                        className="nb-dot"
                        style={{
                            background:
                                CLASS_0_COLOR,
                        }}
                    />

                    Class 0
                </div>


                <div>
                    <span
                        className="nb-dot"
                        style={{
                            background:
                                CLASS_1_COLOR,
                        }}
                    />

                    Class 1
                </div>


                <div>
                    <span
                        className="nb-dot"
                        style={{
                            background:
                                QUERY_COLOR,
                        }}
                    />

                    Query point
                </div>

            </div>

        </section>
    );
}