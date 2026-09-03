import { Canvas, useFrame } from "@react-three/fiber";

import { Grid, Line, OrbitControls, Text } from "@react-three/drei";

import { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";

import {
  calculateAccuracy,
  calculateGradientMagnitude,
  calculateLogLoss,
  calculateDecisionBoundaryZ,
  calculateTestAccuracy,
  calculateTestLogLoss,
  calculateTrainingAccuracy,
  calculateTrainingLogLoss,
  initialLogisticCoefficients,
  logisticGradientDescentStep,
  logisticRegressionData,
  predictProbability,
  type LogisticCoefficients,
  type LogisticPoint,
} from "../../data/visualizations/logisticRegression";

import "./LogisticRegressionVisualization.css";

/* =========================================================
   CONSTANTS
========================================================= */

const DATA_SCALE = 0.9;
const SURFACE_SIZE = 4.5;
const SURFACE_STEP = 0.3;

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  class0: "#38bdf8",
  class0Dark: "#0284c7",

  class1: "#fb7185",
  class1Dark: "#e11d48",

  boundary: "#facc15",

  surfaceLow: "#0ea5e9",
  surfaceHigh: "#f43f5e",

  grid: "#334155",

  white: "#ffffff",
};

/* =========================================================
   DATA POINT
========================================================= */

function DataPoint({ point }: { point: LogisticPoint }) {
  const color = point.label === 0 ? COLORS.class0 : COLORS.class1;

  const emissive = point.label === 0 ? COLORS.class0Dark : COLORS.class1Dark;

  return (
    <group position={[point.x * DATA_SCALE, 0.15, point.z * DATA_SCALE]}>
      {/* Outer glow */}
      <mesh scale={1.7}>
        <sphereGeometry args={[0.13, 16, 16]} />

        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>

      {/* Main point */}
      <mesh>
        <sphereGeometry args={[0.12, 24, 24]} />

        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={1.8}
          metalness={0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Class label */}
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.12}
        color={COLORS.white}
        anchorX="center"
        anchorY="middle"
      >
        {point.label === 0 ? "0" : "1"}
      </Text>
    </group>
  );
}

/* =========================================================
   DATA CLOUD
========================================================= */

function DataCloud({ data }: { data: LogisticPoint[] }) {
  return (
    <group>
      {data.map((point, index) => (
        <DataPoint key={index} point={point} />
      ))}
    </group>
  );
}

/* =========================================================
   DECISION BOUNDARY
========================================================= */

function DecisionBoundary({
  coefficients,
}: {
  coefficients: LogisticCoefficients;
}) {
  const points = useMemo(() => {
    const result: [number, number, number][] = [];

    for (let x = -SURFACE_SIZE; x <= SURFACE_SIZE; x += 0.08) {
      const z = calculateDecisionBoundaryZ(x / DATA_SCALE, coefficients);

      if (
        z !== null &&
        Number.isFinite(z) &&
        Math.abs(z) <= SURFACE_SIZE / DATA_SCALE
      ) {
        result.push([x, 0.22, z * DATA_SCALE]);
      }
    }

    return result;
  }, [coefficients]);

  if (points.length < 2) {
    return null;
  }

  const center = points[Math.floor(points.length / 2)];

  return (
    <group>
      {/* Glow */}
      <Line
        points={points}
        color={COLORS.boundary}
        lineWidth={10}
        transparent
        opacity={0.12}
      />

      {/* Main boundary */}
      <Line points={points} color={COLORS.boundary} lineWidth={4} />

      <Text
        position={[center[0], 0.5, center[2]]}
        fontSize={0.18}
        color={COLORS.boundary}
        anchorX="center"
        anchorY="middle"
      >
        P = 0.5
      </Text>
    </group>
  );
}

/* =========================================================
   PROBABILITY SURFACE
========================================================= */

function ProbabilitySurface({
  coefficients,
}: {
  coefficients: LogisticCoefficients;
}) {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const count = Math.floor((SURFACE_SIZE * 2) / SURFACE_STEP) + 1;

    const lowColor = new THREE.Color(COLORS.surfaceLow);

    const highColor = new THREE.Color(COLORS.surfaceHigh);

    for (let ix = 0; ix < count; ix++) {
      const x = -SURFACE_SIZE + ix * SURFACE_STEP;

      for (let iz = 0; iz < count; iz++) {
        const z = -SURFACE_SIZE + iz * SURFACE_STEP;

        const point: LogisticPoint = {
          x: x / DATA_SCALE,
          y: 0,
          z: z / DATA_SCALE,
          label: 0,
        };

        const probability = predictProbability(point, coefficients);

        /*
         * Probability controls
         * the height of the surface.
         */
        const y = 0.45 + probability * 1.8;

        positions.push(x, y, z);

        const vertexColor = lowColor.clone().lerp(highColor, probability);

        colors.push(vertexColor.r, vertexColor.g, vertexColor.b);
      }
    }

    for (let ix = 0; ix < count - 1; ix++) {
      for (let iz = 0; iz < count - 1; iz++) {
        const a = ix * count + iz;

        const b = (ix + 1) * count + iz;

        const c = (ix + 1) * count + (iz + 1);

        const d = ix * count + (iz + 1);

        indices.push(
          a,
          b,
          d,

          b,
          c,
          d,
        );
      }
    }

    const buffer = new THREE.BufferGeometry();

    buffer.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    buffer.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    buffer.setIndex(indices);

    buffer.computeVertexNormals();

    return buffer;
  }, [coefficients]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        vertexColors
        transparent
        opacity={0.48}
        roughness={0.35}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* =========================================================
   PROBABILITY COLUMNS
========================================================= */

function ProbabilityColumns({
  data,
  coefficients,
}: {
  data: LogisticPoint[];
  coefficients: LogisticCoefficients;
}) {
  return (
    <group>
      {data.map((point, index) => {
        const probability = predictProbability(point, coefficients);

        const height = 0.45 + probability * 1.8;

        const color = point.label === 0 ? COLORS.class0 : COLORS.class1;

        return (
          <group key={index}>
            <Line
              points={[
                [point.x * DATA_SCALE, 0.16, point.z * DATA_SCALE],
                [point.x * DATA_SCALE, height, point.z * DATA_SCALE],
              ]}
              color={color}
              lineWidth={1.5}
              transparent
              opacity={0.5}
            />
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   PROBABILITY LABELS
========================================================= */

function ProbabilityLabels({
  data,
  coefficients,
}: {
  data: LogisticPoint[];
  coefficients: LogisticCoefficients;
}) {
  return (
    <group>
      {data.map((point, index) => {
        const probability = predictProbability(point, coefficients);

        const height = 0.55 + probability * 1.8;

        return (
          <Text
            key={index}
            position={[point.x * DATA_SCALE, height, point.z * DATA_SCALE]}
            fontSize={0.1}
            color={COLORS.white}
            anchorX="center"
            anchorY="middle"
          >
            {probability.toFixed(2)}
          </Text>
        );
      })}
    </group>
  );
}

/* =========================================================
   DECISION REGIONS
========================================================= */

function DecisionRegions() {
  return (
    <group>
      <mesh position={[-1.7, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 8.5]} />

        <meshBasicMaterial
          color={COLORS.class0}
          transparent
          opacity={0.055}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[1.7, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 8.5]} />

        <meshBasicMaterial
          color={COLORS.class1}
          transparent
          opacity={0.055}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CLASS LABELS
========================================================= */

function ClassLabels() {
  return (
    <>
      <Text
        position={[-3.4, 0.3, 3.7]}
        fontSize={0.2}
        color={COLORS.class0}
        anchorX="center"
      >
        CLASS 0
      </Text>

      <Text
        position={[3.4, 0.3, 3.7]}
        fontSize={0.2}
        color={COLORS.class1}
        anchorX="center"
      >
        CLASS 1
      </Text>
    </>
  );
}

/* =========================================================
   TRAINING INDICATOR
========================================================= */

function TrainingIndicator({ running }: { running: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += delta * (running ? 2.5 : 0.3);

    const scale = 1 + Math.sin(performance.now() * 0.004) * 0.08;

    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={ref} position={[0, 0.2, -4.5]}>
      <torusGeometry args={[0.18, 0.035, 12, 32]} />

      <meshBasicMaterial color={running ? COLORS.class1 : COLORS.boundary} />
    </mesh>
  );
}

/* =========================================================
   SCENE
========================================================= */

function Scene({
  data,
  coefficients,
  running,
}: {
  data: LogisticPoint[];
  coefficients: LogisticCoefficients;
  running: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#020617"]} />

      <fog attach="fog" args={["#020617", 9, 20]} />

      <ambientLight intensity={0.7} />

      <directionalLight position={[5, 8, 5]} intensity={2.5} />

      <pointLight position={[-5, 4, -5]} intensity={25} distance={14} />

      <pointLight position={[5, 3, 5]} intensity={20} distance={14} />

      <Grid
        args={[14, 14]}
        cellSize={0.5}
        sectionSize={2}
        fadeDistance={16}
        cellThickness={0.5}
        sectionThickness={1}
        cellColor="#1e293b"
        sectionColor="#475569"
      />

      <axesHelper args={[5]} />

      <DecisionRegions />

      <ProbabilitySurface coefficients={coefficients} />

      <ProbabilityColumns data={data} coefficients={coefficients} />

      <ProbabilityLabels data={data} coefficients={coefficients} />

      <DataCloud data={data} />

      <DecisionBoundary coefficients={coefficients} />

      <ClassLabels />

      <TrainingIndicator running={running} />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={5}
        maxDistance={18}
        maxPolarAngle={Math.PI * 0.82}
      />
    </>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function LogisticRegressionVisualization() {
  /* =====================================================
       MODEL STATE
  ===================================================== */

  const [coefficients, setCoefficients] = useState<LogisticCoefficients>(
    initialLogisticCoefficients,
  );

  const [learningRate, setLearningRate] = useState(0.08);

  const [iteration, setIteration] = useState(0);

  const [running, setRunning] = useState(false);

  /* =====================================================
       LOSS HISTORY
  ===================================================== */

  const [history, setHistory] = useState<number[]>([
    calculateLogLoss(logisticRegressionData, initialLogisticCoefficients),
  ]);

  /* =====================================================
       CURRENT MODEL METRICS
  ===================================================== */

  const loss = useMemo(
    () => calculateLogLoss(logisticRegressionData, coefficients),
    [coefficients],
  );

  const accuracy = useMemo(
    () => calculateAccuracy(logisticRegressionData, coefficients),
    [coefficients],
  );

  /* =====================================================
       GRADIENT
  ===================================================== */

  const gradients = useMemo(
    () =>
      logisticGradientDescentStep(
        logisticRegressionData,
        coefficients,
        learningRate,
      ).gradients,
    [coefficients, learningRate],
  );

  const gradientMagnitude = calculateGradientMagnitude(gradients);

  /* =====================================================
       MODEL EVALUATION
  ===================================================== */

  const trainingAccuracy = useMemo(
    () => calculateTrainingAccuracy(coefficients),
    [coefficients],
  );

  const testingAccuracy = useMemo(
    () => calculateTestAccuracy(coefficients),
    [coefficients],
  );

  const trainingLogLoss = useMemo(
    () => calculateTrainingLogLoss(coefficients),
    [coefficients],
  );

  const testingLogLoss = useMemo(
    () => calculateTestLogLoss(coefficients),
    [coefficients],
  );

  /* =====================================================
       EVALUATION SCORE
       
       This combines testing accuracy and testing
       loss into a simple visualization score.
       
       NOTE:
       This is a UI score, not a standard ML metric.
  ===================================================== */

  const evaluationScore = useMemo(() => {
    const accuracyScore = testingAccuracy * 100;

    const lossScore = Math.max(0, 100 - testingLogLoss * 100);

    return accuracyScore * 0.7 + lossScore * 0.3;
  }, [testingAccuracy, testingLogLoss]);

  /* =====================================================
       TRAINING STEP
  ===================================================== */

  const step = () => {
    const result = logisticGradientDescentStep(
      logisticRegressionData,
      coefficients,
      learningRate,
    );

    setCoefficients(result.coefficients);

    setIteration((value) => value + 1);

    setHistory((previous) => [...previous, result.loss]);
  };

  /* =====================================================
       AUTO TRAINING
  ===================================================== */

  useEffect(() => {
    if (!running) {
      return;
    }

    if (iteration >= 100) {
      setRunning(false);
      return;
    }

    const timer = window.setTimeout(step, 120);

    return () => window.clearTimeout(timer);
  }, [running, iteration, coefficients, learningRate]);

  /* =====================================================
       RESET
  ===================================================== */

  const reset = () => {
    setRunning(false);

    setCoefficients(initialLogisticCoefficients);

    setIteration(0);

    setHistory([
      calculateLogLoss(logisticRegressionData, initialLogisticCoefficients),
    ]);
  };

  return (
    <div className="logistic-regression-viz">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="logistic-regression-header">
        <div>
          <span>BINARY CLASSIFICATION</span>

          <h3>Logistic Regression</h3>
        </div>

        <div
          className={running ? "training-status running" : "training-status"}
        >
          <i />

          {running ? "TRAINING" : "READY"}
        </div>
      </div>

      {/* =================================================
          3D CANVAS
      ================================================= */}

      <div className="logistic-regression-canvas">
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [8, 6, 8],
            fov: 45,
          }}
        >
          <Scene
            data={logisticRegressionData}
            coefficients={coefficients}
            running={running}
          />
        </Canvas>
      </div>

      {/* =================================================
          CONTROLS
      ================================================= */}

      <div className="logistic-regression-controls">
        <button type="button" onClick={() => setRunning((value) => !value)}>
          {running ? "Stop Training" : "Start Training"}
        </button>

        <button type="button" onClick={step} disabled={running}>
          Single Step
        </button>

        <button type="button" onClick={reset}>
          Reset
        </button>

        <label>
          <span>Learning Rate</span>

          <input
            type="range"
            min="0.005"
            max="0.5"
            step="0.005"
            value={learningRate}
            onChange={(event) => setLearningRate(Number(event.target.value))}
          />

          <strong>{learningRate.toFixed(3)}</strong>
        </label>
      </div>

      {/* =================================================
          CURRENT MODEL METRICS
      ================================================= */}

      <div className="logistic-regression-info">
        <div>
          <strong>ITERATION</strong>

          <span>{iteration}</span>
        </div>

        <div>
          <strong>LOG LOSS</strong>

          <span>{loss.toFixed(5)}</span>
        </div>

        <div>
          <strong>ACCURACY</strong>

          <span>{(accuracy * 100).toFixed(2)}%</span>
        </div>

        <div>
          <strong>GRADIENT</strong>

          <span>{gradientMagnitude.toFixed(5)}</span>
        </div>

        <div>
          <strong>INTERCEPT</strong>

          <span>{coefficients.intercept.toFixed(4)}</span>
        </div>

        <div>
          <strong>X COEFFICIENT</strong>

          <span>{coefficients.xCoefficient.toFixed(4)}</span>
        </div>

        <div>
          <strong>Z COEFFICIENT</strong>

          <span>{coefficients.zCoefficient.toFixed(4)}</span>
        </div>

        <div>
          <strong>SAMPLES</strong>

          <span>{logisticRegressionData.length}</span>
        </div>
      </div>

      {/* =================================================
          MODEL EVALUATION
      ================================================= */}

      <section className="logistic-regression-evaluation">
        <div className="evaluation-header">
          <div>
            <span>MODEL EVALUATION</span>

            <h4>Testing Performance</h4>

            <p>
              Evaluate the trained classifier on data that was not used for the
              training metrics.
            </p>
          </div>

          <div className="evaluation-score">
            <span>TEST SCORE</span>

            <strong>
              {evaluationScore.toFixed(1)}
              <small>/100</small>
            </strong>
          </div>
        </div>

        <div className="evaluation-grid">
          {/* Training Accuracy */}
          <div className="evaluation-card">
            <span>TRAIN ACCURACY</span>

            <strong>{(trainingAccuracy * 100).toFixed(2)}%</strong>

            <small>Model fit on training data</small>
          </div>

          {/* Testing Accuracy */}
          <div className="evaluation-card testing">
            <span>TEST ACCURACY</span>

            <strong>{(testingAccuracy * 100).toFixed(2)}%</strong>

            <small>Unseen test data</small>
          </div>

          {/* Training Loss */}
          <div className="evaluation-card">
            <span>TRAIN LOG LOSS</span>

            <strong>{trainingLogLoss.toFixed(5)}</strong>

            <small>Lower is better</small>
          </div>

          {/* Testing Loss */}
          <div className="evaluation-card testing">
            <span>TEST LOG LOSS</span>

            <strong>{testingLogLoss.toFixed(5)}</strong>

            <small>Lower is better</small>
          </div>

          {/* Training Samples */}
          <div className="evaluation-card compact">
            <span>TRAIN SAMPLES</span>

            <strong>12</strong>

            <small>Training set</small>
          </div>

          {/* Testing Samples */}
          <div className="evaluation-card compact">
            <span>TEST SAMPLES</span>

            <strong>{Math.max(logisticRegressionData.length - 12, 0)}</strong>

            <small>Holdout set</small>
          </div>
        </div>

        {/* Evaluation explanation */}
        <div className="evaluation-explanation">
          <div>
            <span className="evaluation-dot train" />

            <div>
              <strong>Training</strong>

              <p>
                Measures how well the current model fits the examples used
                during optimization.
              </p>
            </div>
          </div>

          <div>
            <span className="evaluation-dot test" />

            <div>
              <strong>Testing</strong>

              <p>
                Measures performance on held-out examples that were not used to
                update the coefficients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          LEGEND
      ================================================= */}

      <div className="logistic-regression-legend">
        <div>
          <i className="legend-class-0" />

          <span>Class 0</span>
        </div>

        <div>
          <i className="legend-class-1" />

          <span>Class 1</span>
        </div>

        <div>
          <i className="legend-boundary" />

          <span>Decision Boundary</span>
        </div>

        <div>
          <span>Probability: 0 → 1</span>
        </div>
      </div>

      {/* =================================================
          LOSS CURVE
      ================================================= */}

      <div className="logistic-regression-loss">
        <div className="logistic-regression-loss-header">
          <div>
            <strong>TRAINING LOSS</strong>

            <span>Binary Cross-Entropy / Log Loss</span>
          </div>

          <strong>{loss.toFixed(5)}</strong>
        </div>

        <svg viewBox="0 0 700 180" preserveAspectRatio="none">
          {history.length > 1 && (
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={history
                .map((value, index) => {
                  const max = Math.max(...history);

                  const min = Math.min(...history);

                  const range = Math.max(max - min, 0.000001);

                  const x = (index / Math.max(history.length - 1, 1)) * 700;

                  const y = 165 - ((value - min) / range) * 145;

                  return `${x},${y}`;
                })
                .join(" ")}
            />
          )}
        </svg>
      </div>
    </div>
  );
}
