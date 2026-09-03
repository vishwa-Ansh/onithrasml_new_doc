import { useEffect, useMemo, useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls, Grid, Text, Line } from "@react-three/drei";

import * as THREE from "three";

import {
  linearRegressionData,
  initialCoefficients,
  gradientDescentStep,
  calculateLoss,
  calculateGradients,
  predict,
  type RegressionCoefficients,
  type RegressionGradients,
} from "../../data/visualizations/linearRegression";

import {
  kmeansData,
  initialCentroids,
  assignClusters,
  updateCentroids,
  calculateKMeansLoss,
  distance,
  calculateClusterMean,
  type Centroid,
} from "../../data/visualizations/kmeans";

import "./MLVisualization.css";

/* =========================================================
   TYPES
========================================================= */

type Algorithm = "linear-regression" | "k-means";

type KMeansPhase = "assignment" | "update" | "loss";

type RegressionPhase =
  | "prediction"
  | "gradient"
  | "update"
  | "loss";

interface MLVisualizationProps {
  algorithm?: Algorithm;
}

/* =========================================================
   COLORS
========================================================= */

const CLUSTER_COLORS = [
  "#aa3bff",
  "#ff9418",
  "#1687ff",
];

/* =========================================================
   LINEAR REGRESSION
========================================================= */

function RegressionDataPoints({
  coefficients,
}: {
  coefficients: RegressionCoefficients;
}) {
  return (
    <group>
      {linearRegressionData.map((point, index) => {
        const prediction = predict(point, coefficients);

        return (
          <group key={index}>
            {/* Actual data point */}

            <mesh position={[point.x, point.y, point.z]}>
              <sphereGeometry args={[0.09, 16, 16]} />

              <meshStandardMaterial color="#08060d" />
            </mesh>

            {/* Predicted point */}

            <mesh position={[point.x, prediction, point.z]}>
              <sphereGeometry args={[0.07, 14, 14]} />

              <meshStandardMaterial color="#aa3bff" />
            </mesh>

            {/* Residual */}

            <Line
              points={[
                [point.x, point.y, point.z],
                [point.x, prediction, point.z],
              ]}
              color="#aa3bff"
              transparent
              opacity={0.45}
              lineWidth={1}
            />
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   REGRESSION PLANE
========================================================= */

function RegressionPlane({
  coefficients,
}: {
  coefficients: RegressionCoefficients;
}) {
  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(
      7,
      7,
      20,
      20,
    );

    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);

      const z = position.getY(i);

      const y =
        coefficients.intercept +
        coefficients.xCoefficient * x +
        coefficients.zCoefficient * z;

      position.setXYZ(i, x, y, z);
    }

    position.needsUpdate = true;

    geometry.computeVertexNormals();

    return geometry;
  }, [coefficients]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#aa3bff"
        transparent
        opacity={0.22}
        side={THREE.DoubleSide}
        roughness={0.7}
      />
    </mesh>
  );
}

/* =========================================================
   REGRESSION SCENE
========================================================= */

function RegressionScene({
  coefficients,
}: {
  coefficients: RegressionCoefficients;
}) {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
      />

      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={2}
        sectionThickness={1}
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
      />

      <axesHelper args={[4]} />

      <RegressionDataPoints
        coefficients={coefficients}
      />

      <RegressionPlane
        coefficients={coefficients}
      />

      <Text
        position={[4.3, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Feature 1
      </Text>

      <Text
        position={[0, 4.3, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Target
      </Text>

      <Text
        position={[0, 0, 4.3]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Feature 2
      </Text>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

/* =========================================================
   K-MEANS ASSIGNMENT LINES
========================================================= */

function KMeansAssignmentLines({
  assignments,
  centroids,
}: {
  assignments: number[];
  centroids: Centroid[];
}) {
  return (
    <group>
      {kmeansData.map((point, index) => {
        const cluster = assignments[index];

        const centroid = centroids[cluster];

        if (!centroid) {
          return null;
        }

        const color =
          CLUSTER_COLORS[cluster] ??
          CLUSTER_COLORS[0];

        const pointDistance = distance(
          point,
          centroid,
        );

        const opacity = Math.min(
          0.65,
          0.18 + pointDistance * 0.035,
        );

        return (
          <group key={index}>
            <Line
              points={[
                [point.x, point.y, point.z],
                [
                  centroid.x,
                  centroid.y,
                  centroid.z,
                ],
              ]}
              color={color}
              transparent
              opacity={opacity}
              lineWidth={1}
            />

            <Text
              position={[
                (point.x + centroid.x) / 2,
                (point.y + centroid.y) / 2,
                (point.z + centroid.z) / 2,
              ]}
              fontSize={0.105}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {pointDistance.toFixed(2)}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   K-MEANS POINTS
========================================================= */

function KMeansPoints({
  assignments,
}: {
  assignments: number[];
}) {
  return (
    <group>
      {kmeansData.map((point, index) => {
        const cluster =
          assignments[index] ?? 0;

        const color =
          CLUSTER_COLORS[cluster] ??
          CLUSTER_COLORS[0];

        return (
          <mesh
            key={index}
            position={[
              point.x,
              point.y,
              point.z,
            ]}
          >
            <sphereGeometry
              args={[0.13, 18, 18]}
            />

            <meshStandardMaterial
              color={color}
              roughness={0.45}
              metalness={0.05}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================
   ANIMATED CENTROID
========================================================= */

function AnimatedCentroid({
  centroid,
  index,
}: {
  centroid: Centroid;
  index: number;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const initialized = useRef(false);

  const target = useMemo(
    () =>
      new THREE.Vector3(
        centroid.x,
        centroid.y,
        centroid.z,
      ),
    [
      centroid.x,
      centroid.y,
      centroid.z,
    ],
  );

  useEffect(() => {
    if (
      !groupRef.current ||
      initialized.current
    ) {
      return;
    }

    groupRef.current.position.copy(target);

    initialized.current = true;
  }, [target]);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.position.lerp(
      target,
      0.12,
    );
  });

  const color =
    CLUSTER_COLORS[index] ??
    CLUSTER_COLORS[0];

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry
          args={[0.24, 20, 20]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      <Text
        position={[0, 0.4, 0]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        C{index + 1}
      </Text>
    </group>
  );
}

/* =========================================================
   K-MEANS CENTROID MOVEMENT
========================================================= */

function KMeansCentroidMovement({
  previousCentroids,
  centroids,
  assignments,
}: {
  previousCentroids: Centroid[];
  centroids: Centroid[];
  assignments: number[];
}) {
  return (
    <group>
      {centroids.map((centroid, index) => {
        const previous =
          previousCentroids[index];

        if (!previous) {
          return null;
        }

        const color =
          CLUSTER_COLORS[index] ??
          CLUSTER_COLORS[0];

        const mean =
          calculateClusterMean(
            kmeansData,
            assignments,
            index,
          );

        if (!mean) {
          return null;
        }

        return (
          <group key={index}>
            {/* OLD CENTROID */}

            <mesh
              position={[
                previous.x,
                previous.y,
                previous.z,
              ]}
            >
              <sphereGeometry
                args={[0.08, 12, 12]}
              />

              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.35}
              />
            </mesh>

            {/* OLD → NEW MOVEMENT */}

            <Line
              points={[
                [
                  previous.x,
                  previous.y,
                  previous.z,
                ],
                [
                  centroid.x,
                  centroid.y,
                  centroid.z,
                ],
              ]}
              color={color}
              transparent
              opacity={0.8}
              lineWidth={2}
            />

            {/* CALCULATED MEAN */}

            <mesh
              position={[
                mean.x,
                mean.y,
                mean.z,
              ]}
            >
              <sphereGeometry
                args={[0.045, 10, 10]}
              />

              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.75}
              />
            </mesh>

            {/* MEAN LABEL */}

            <Text
              position={[
                mean.x,
                mean.y + 0.18,
                mean.z,
              ]}
              fontSize={0.09}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              mean
            </Text>
          </group>
        );
      })}
    </group>
  );
}

/* =========================================================
   K-MEANS CENTROIDS
========================================================= */

function KMeansCentroids({
  centroids,
}: {
  centroids: Centroid[];
}) {
  return (
    <group>
      {centroids.map((centroid, index) => (
        <AnimatedCentroid
          key={index}
          centroid={centroid}
          index={index}
        />
      ))}
    </group>
  );
}

/* =========================================================
   K-MEANS SCENE
========================================================= */

function KMeansScene({
  assignments,
  centroids,
  previousCentroids,
}: {
  assignments: number[];
  centroids: Centroid[];
  previousCentroids: Centroid[];
}) {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
      />

      <Grid
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={2}
        sectionThickness={1}
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
      />

      <axesHelper args={[4]} />

      <KMeansAssignmentLines
        assignments={assignments}
        centroids={centroids}
      />

      <KMeansPoints
        assignments={assignments}
      />

      <KMeansCentroids
        centroids={centroids}
      />

      <KMeansCentroidMovement
        previousCentroids={
          previousCentroids
        }
        centroids={centroids}
        assignments={assignments}
      />

      <Text
        position={[4.3, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Feature 1
      </Text>

      <Text
        position={[0, 4.3, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Feature 2
      </Text>

      <Text
        position={[0, 0, 4.3]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.22}
        color="#55505c"
      >
        Feature 3
      </Text>

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

/* =========================================================
   LOSS GRAPH
========================================================= */

function LossGraph({
  values,
  label,
}: {
  values: number[];
  label: string;
}) {
  if (values.length < 2) {
    return (
      <div className="ml-viz-loss-empty">
        Start training to observe {label}.
      </div>
    );
  }

  const width = 420;
  const height = 70;

  const max = Math.max(...values);

  const min = Math.min(...values);

  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x =
        (index / (values.length - 1)) *
        width;

      const y =
        height -
        ((value - min) / range) *
          (height - 8) -
        4;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="ml-viz-loss-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="#aa3bff"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function MLVisualization({
  algorithm = "linear-regression",
}: MLVisualizationProps) {
  const isKMeans =
    algorithm === "k-means";

  /* =====================================================
     REGRESSION STATE
  ===================================================== */

  const [coefficients, setCoefficients] =
    useState<RegressionCoefficients>(
      initialCoefficients,
    );

  const [gradients, setGradients] =
    useState<RegressionGradients>({
      intercept: 0,
      xCoefficient: 0,
      zCoefficient: 0,
    });

  /* =====================================================
     K-MEANS STATE
  ===================================================== */

  const [centroids, setCentroids] =
    useState<Centroid[]>(
      initialCentroids,
    );

  const [previousCentroids, setPreviousCentroids] =
    useState<Centroid[]>(
      initialCentroids,
    );

  const [assignments, setAssignments] =
    useState<number[]>(
      assignClusters(
        kmeansData,
        initialCentroids,
      ),
    );

  const [regressionPhase, setRegressionPhase] =
    useState<RegressionPhase>(
      "prediction",
    );

  const [kmeansPhase, setKMeansPhase] =
    useState<KMeansPhase>(
      "assignment",
    );

  /* =====================================================
     TRAINING STATE
  ===================================================== */

  const [running, setRunning] =
    useState(false);

  const [learningRate, setLearningRate] =
    useState(0.03);

  const [iteration, setIteration] =
    useState(0);

  const [lossHistory, setLossHistory] =
    useState<number[]>([]);

  const [maxIterations, setMaxIterations] =
    useState(50);

  const [kmeansConverged, setKMeansConverged] =
    useState(false);

  /* =====================================================
     RESET WHEN ALGORITHM CHANGES
  ===================================================== */

  useEffect(() => {
    setRunning(false);

    setIteration(0);

    setLossHistory([]);

    setCoefficients(
      initialCoefficients,
    );

    setGradients({
      intercept: 0,
      xCoefficient: 0,
      zCoefficient: 0,
    });

    setCentroids(
      initialCentroids,
    );

    setPreviousCentroids(
      initialCentroids,
    );

    setAssignments(
      assignClusters(
        kmeansData,
        initialCentroids,
      ),
    );

    setKMeansConverged(false);

    setKMeansPhase("assignment");

    setRegressionPhase(
      "prediction",
    );
  }, [algorithm]);

  /* =====================================================
     CURRENT LOSS
  ===================================================== */

  const currentLoss = isKMeans
    ? calculateKMeansLoss(
        kmeansData,
        assignments,
        centroids,
      )
    : calculateLoss(
        linearRegressionData,
        coefficients,
      );

  /* =====================================================
     TRAINING LOOP
  ===================================================== */

  useEffect(() => {
    if (!running) {
      return;
    }

    if (
      iteration >= maxIterations ||
      (isKMeans && kmeansConverged)
    ) {
      setRunning(false);
      return;
    }

    const timer = window.setTimeout(() => {
      /* ===============================================
         K-MEANS
      =============================================== */

      if (isKMeans) {
        /* ---------------------------------------------
           PHASE 1 — ASSIGNMENT
        --------------------------------------------- */

        if (
          kmeansPhase === "assignment"
        ) {
          const nextAssignments =
            assignClusters(
              kmeansData,
              centroids,
            );

          setAssignments(
            nextAssignments,
          );

          setKMeansPhase("update");

          return;
        }

        /* ---------------------------------------------
           PHASE 2 — CENTROID UPDATE
        --------------------------------------------- */

        if (
          kmeansPhase === "update"
        ) {
          const oldCentroids =
            centroids.map((centroid) => ({
              ...centroid,
            }));

          setPreviousCentroids(
            oldCentroids,
          );

          const nextCentroids =
            updateCentroids(
              kmeansData,
              assignments,
              centroids,
            );

          setCentroids(
            nextCentroids,
          );

          setKMeansPhase("loss");

          return;
        }

        /* ---------------------------------------------
           PHASE 3 — LOSS
        --------------------------------------------- */

        if (
          kmeansPhase === "loss"
        ) {
          const loss =
            calculateKMeansLoss(
              kmeansData,
              assignments,
              centroids,
            );

          setLossHistory(
            (history) => [
              ...history,
              loss,
            ],
          );

          const movement =
            centroids.reduce(
              (
                total,
                centroid,
                index,
              ) => {
                const previous =
                  previousCentroids[
                    index
                  ];

                if (!previous) {
                  return total;
                }

                const dx =
                  centroid.x -
                  previous.x;

                const dy =
                  centroid.y -
                  previous.y;

                const dz =
                  centroid.z -
                  previous.z;

                return (
                  total +
                  Math.sqrt(
                    dx * dx +
                      dy * dy +
                      dz * dz,
                  )
                );
              },
              0,
            );

          const nextIteration =
            iteration + 1;

          setIteration(
            nextIteration,
          );

          /* Convergence */

          if (
            movement < 0.001
          ) {
            setKMeansConverged(
              true,
            );

            setRunning(false);

            return;
          }

          /* Maximum iterations */

          if (
            nextIteration >=
            maxIterations
          ) {
            setRunning(false);

            return;
          }

          /* Continue */

          setKMeansPhase(
            "assignment",
          );

          return;
        }
      }

      /* ===============================================
         LINEAR REGRESSION
      =============================================== */

      /* ---------------------------------------------
         PHASE 1 — PREDICTION
      --------------------------------------------- */

      if (
        regressionPhase ===
        "prediction"
      ) {
        setRegressionPhase(
          "gradient",
        );

        return;
      }

      /* ---------------------------------------------
         PHASE 2 — GRADIENT
      --------------------------------------------- */

      if (
        regressionPhase ===
        "gradient"
      ) {
        const nextGradients =
          calculateGradients(
            linearRegressionData,
            coefficients,
          );

        setGradients(
          nextGradients,
        );

        setRegressionPhase(
          "update",
        );

        return;
      }

      /* ---------------------------------------------
         PHASE 3 — PARAMETER UPDATE
      --------------------------------------------- */

      if (
        regressionPhase ===
        "update"
      ) {
        const next =
          gradientDescentStep(
            linearRegressionData,
            coefficients,
            learningRate,
          );

        setCoefficients(next);

        setRegressionPhase(
          "loss",
        );

        return;
      }

      /* ---------------------------------------------
         PHASE 4 — LOSS
      --------------------------------------------- */

      if (
        regressionPhase ===
        "loss"
      ) {
        const loss =
          calculateLoss(
            linearRegressionData,
            coefficients,
          );

        setLossHistory(
          (history) => [
            ...history,
            loss,
          ],
        );

        const nextIteration =
          iteration + 1;

        setIteration(
          nextIteration,
        );

        if (
          nextIteration >=
          maxIterations
        ) {
          setRunning(false);

          return;
        }

        setRegressionPhase(
          "prediction",
        );
      }
    }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    running,
    isKMeans,
    kmeansPhase,
    regressionPhase,
    coefficients,
    centroids,
    previousCentroids,
    assignments,
    learningRate,
    iteration,
    maxIterations,
    kmeansConverged,
  ]);

  /* =====================================================
     K-MEANS MANUAL NEXT STEP
  ===================================================== */

  const handleKMeansStep =
    () => {
      if (
        !isKMeans ||
        running ||
        kmeansConverged
      ) {
        return;
      }

      /* ASSIGNMENT */

      if (
        kmeansPhase ===
        "assignment"
      ) {
        const nextAssignments =
          assignClusters(
            kmeansData,
            centroids,
          );

        setAssignments(
          nextAssignments,
        );

        setKMeansPhase(
          "update",
        );

        return;
      }

      /* UPDATE */

      if (
        kmeansPhase === "update"
      ) {
        const oldCentroids =
          centroids.map(
            (centroid) => ({
              ...centroid,
            }),
          );

        setPreviousCentroids(
          oldCentroids,
        );

        const nextCentroids =
          updateCentroids(
            kmeansData,
            assignments,
            centroids,
          );

        setCentroids(
          nextCentroids,
        );

        setKMeansPhase(
          "loss",
        );

        return;
      }

      /* LOSS */

      if (
        kmeansPhase === "loss"
      ) {
        const loss =
          calculateKMeansLoss(
            kmeansData,
            assignments,
            centroids,
          );

        setLossHistory(
          (history) => [
            ...history,
            loss,
          ],
        );

        const movement =
          centroids.reduce(
            (
              total,
              centroid,
              index,
            ) => {
              const previous =
                previousCentroids[
                  index
                ];

              if (!previous) {
                return total;
              }

              const dx =
                centroid.x -
                previous.x;

              const dy =
                centroid.y -
                previous.y;

              const dz =
                centroid.z -
                previous.z;

              return (
                total +
                Math.sqrt(
                  dx * dx +
                    dy * dy +
                    dz * dz,
                )
              );
            },
            0,
          );

        const nextIteration =
          iteration + 1;

        setIteration(
          nextIteration,
        );

        if (
          movement < 0.001
        ) {
          setKMeansConverged(
            true,
          );

          return;
        }

        if (
          nextIteration >=
          maxIterations
        ) {
          return;
        }

        setKMeansPhase(
          "assignment",
        );
      }
    };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setRunning(false);

    setIteration(0);

    setLossHistory([]);

    setCoefficients(
      initialCoefficients,
    );

    setGradients({
      intercept: 0,
      xCoefficient: 0,
      zCoefficient: 0,
    });

    setCentroids(
      initialCentroids,
    );

    setPreviousCentroids(
      initialCentroids,
    );

    setAssignments(
      assignClusters(
        kmeansData,
        initialCentroids,
      ),
    );

    setKMeansConverged(false);

    setKMeansPhase(
      "assignment",
    );

    setRegressionPhase(
      "prediction",
    );
  };

  /* =====================================================
     PHASE LABEL
  ===================================================== */

  const phaseLabel = isKMeans
    ? kmeansPhase ===
      "assignment"
      ? "Assignment"
      : kmeansPhase ===
        "update"
        ? "Centroid Update"
        : "Loss"
    : regressionPhase ===
        "prediction"
      ? "Prediction"
      : regressionPhase ===
          "gradient"
        ? "Gradient Calculation"
        : regressionPhase ===
            "update"
          ? "Parameter Update"
          : "Loss";

  /* =====================================================
     PHASE DESCRIPTION
  ===================================================== */

  const phaseDescription =
    isKMeans
      ? kmeansPhase ===
        "assignment"
        ? "Assign each point to its nearest centroid using Euclidean distance."
        : kmeansPhase ===
            "update"
          ? "Move each centroid to the mean position of the points assigned to it."
          : "Calculate the total squared distance between points and their assigned centroids."
      : regressionPhase ===
          "prediction"
        ? "Calculate the predicted target value for every training point."
        : regressionPhase ===
            "gradient"
          ? "Calculate how the loss changes with respect to each model parameter."
          : regressionPhase ===
              "update"
            ? "Update the parameters using the learning rate and calculated gradients."
            : "Measure the Mean Squared Error after the parameter update.";

  /* =====================================================
     PROGRESS
  ===================================================== */

  const progress =
    maxIterations > 0
      ? Math.min(
          (iteration /
            maxIterations) *
            100,
          100,
        )
      : 0;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="ml-visualization">
      {/* =================================================
          3D CANVAS
      ================================================= */}

      <div className="ml-viz-canvas">
        <Canvas
          camera={{
            position: [7, 6, 8],
            fov: 45,
          }}
          dpr={[1, 2]}
        >
          {isKMeans ? (
            <KMeansScene
              assignments={
                assignments
              }
              centroids={centroids}
              previousCentroids={
                previousCentroids
              }
            />
          ) : (
            <RegressionScene
              coefficients={
                coefficients
              }
            />
          )}
        </Canvas>
      </div>

      {/* =================================================
          MAIN CONTROLS
      ================================================= */}

      <div className="ml-viz-controls">
        <button
          type="button"
          className="ml-viz-button primary"
          onClick={() =>
            setRunning(
              (value) => !value,
            )
          }
          disabled={
            isKMeans &&
            kmeansConverged
          }
        >
          {running ? "Pause" : "Start"}
        </button>

        {isKMeans && (
          <button
            type="button"
            className="ml-viz-button"
            onClick={
              handleKMeansStep
            }
            disabled={
              running ||
              kmeansConverged
            }
          >
            Next Step
          </button>
        )}

        <button
          type="button"
          className="ml-viz-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* =================================================
          TRAINING CONTROLS
      ================================================= */}

      <div className="ml-viz-training">
        {/* ITERATIONS */}

        <div className="ml-viz-row">
          <label>
            Iterations
          </label>

          <input
            className="ml-viz-range"
            type="range"
            min="1"
            max="100"
            step="1"
            value={
              maxIterations
            }
            onChange={(event) =>
              setMaxIterations(
                Number(
                  event.target
                    .value,
                ),
              )
            }
          />

          <span>
            {maxIterations}
          </span>
        </div>

        {/* LEARNING RATE */}

        {!isKMeans && (
          <div className="ml-viz-row">
            <label>
              Learning Rate
            </label>

            <input
              className="ml-viz-range"
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={
                learningRate
              }
              onChange={(
                event,
              ) =>
                setLearningRate(
                  Number(
                    event.target
                      .value,
                  ),
                )
              }
            />

            <span>
              {learningRate.toFixed(
                3,
              )}
            </span>
          </div>
        )}

        {/* PHASE INDICATOR */}

        <div className="ml-viz-phase">
          {isKMeans ? (
            <>
              <span
                className={
                  kmeansPhase ===
                  "assignment"
                    ? "active"
                    : ""
                }
              >
                01 Assignment
              </span>

              <span
                className={
                  kmeansPhase ===
                  "update"
                    ? "active"
                    : ""
                }
              >
                02 Update
              </span>

              <span
                className={
                  kmeansPhase ===
                  "loss"
                    ? "active"
                    : ""
                }
              >
                03 Loss
              </span>
            </>
          ) : (
            <>
              <span
                className={
                  regressionPhase ===
                  "prediction"
                    ? "active"
                    : ""
                }
              >
                01 Prediction
              </span>

              <span
                className={
                  regressionPhase ===
                  "gradient"
                    ? "active"
                    : ""
                }
              >
                02 Gradient
              </span>

              <span
                className={
                  regressionPhase ===
                  "update"
                    ? "active"
                    : ""
                }
              >
                03 Update
              </span>

              <span
                className={
                  regressionPhase ===
                  "loss"
                    ? "active"
                    : ""
                }
              >
                04 Loss
              </span>
            </>
          )}
        </div>

        {/* PHASE DESCRIPTION */}

        <div className="ml-viz-phase-description">
          {phaseDescription}
        </div>

        {/* CURRENT PHASE */}

        <div className="ml-viz-iteration">
          Phase:{" "}
          <strong>
            {phaseLabel}
          </strong>
        </div>

        {/* ITERATION */}

        <div className="ml-viz-iteration">
          Iteration{" "}
          <strong>
            {iteration}
          </strong>{" "}
          / {maxIterations}
        </div>

        {/* PROGRESS */}

        <div className="ml-viz-progress">
          <div
            className="ml-viz-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* =================================================
          FORMULA
      ================================================= */}

      <div className="ml-viz-formula">
        {isKMeans ? (
          <>
            <strong>
              K-Means Objective
            </strong>

            <span>
              Σ ‖xᵢ − μcᵢ‖²
            </span>
          </>
        ) : (
          <>
            <strong>
              {regressionPhase ===
              "prediction"
                ? "Prediction"
                : regressionPhase ===
                    "gradient"
                  ? "Gradient"
                  : regressionPhase ===
                      "update"
                    ? "Parameter Update"
                    : "Loss"}
            </strong>

            <span>
              {regressionPhase ===
              "prediction"
                ? "ŷ = b + w₁x + w₂z"
                : regressionPhase ===
                    "gradient"
                  ? "∇J = (∂J/∂b, ∂J/∂w₁, ∂J/∂w₂)"
                  : regressionPhase ===
                      "update"
                    ? "θ ← θ − α∇J"
                    : "J = 1/n Σ(ŷ − y)²"}
            </span>
          </>
        )}
      </div>

      {/* =================================================
          MODEL PARAMETERS / CENTROIDS
      ================================================= */}

      <div
        className={
          isKMeans
            ? "ml-viz-model ml-viz-model-parameters"
            : "ml-viz-model ml-viz-model-parameters"
        }
      >
        {isKMeans ? (
          <>
            <div className="ml-viz-model-title">
              Centroids
            </div>

            {centroids.map(
              (centroid, index) => (
                <div
                  className="ml-viz-row"
                  key={index}
                >
                  <span>
                    C{index + 1}
                  </span>

                  <span>
                    (
                    {centroid.x.toFixed(
                      2,
                    )}
                    ,{" "}
                    {centroid.y.toFixed(
                      2,
                    )}
                    ,{" "}
                    {centroid.z.toFixed(
                      2,
                    )}
                    )
                  </span>
                </div>
              ),
            )}
          </>
        ) : (
          <>
            <div className="ml-viz-model-title">
              Model Parameters
            </div>

            <div className="ml-viz-row">
              <span>
                Intercept
              </span>

              <span>
                {coefficients.intercept.toFixed(
                  4,
                )}
              </span>
            </div>

            <div className="ml-viz-row">
              <span>w₁</span>

              <span>
                {coefficients.xCoefficient.toFixed(
                  4,
                )}
              </span>
            </div>

            <div className="ml-viz-row">
              <span>w₂</span>

              <span>
                {coefficients.zCoefficient.toFixed(
                  4,
                )}
              </span>
            </div>
          </>
        )}
      </div>

      {/* =================================================
          GRADIENT VALUES
      ================================================= */}

      {!isKMeans && (
        <div className="ml-viz-model ml-viz-model-gradients">
          <div className="ml-viz-model-title">
            Gradients
          </div>

          <div className="ml-viz-row">
            <span>
              ∂J / ∂b
            </span>

            <span>
              {gradients.intercept.toFixed(
                4,
              )}
            </span>
          </div>

          <div className="ml-viz-row">
            <span>
              ∂J / ∂w₁
            </span>

            <span>
              {gradients.xCoefficient.toFixed(
                4,
              )}
            </span>
          </div>

          <div className="ml-viz-row">
            <span>
              ∂J / ∂w₂
            </span>

            <span>
              {gradients.zCoefficient.toFixed(
                4,
              )}
            </span>
          </div>
        </div>
      )}

      {/* =================================================
          LOSS
      ================================================= */}

      <div className="ml-viz-loss">
        <div className="ml-viz-loss-header">
          <span className="ml-viz-loss-title">
            {isKMeans
              ? "Cluster SSE"
              : "Mean Squared Error"}
          </span>

          <span className="ml-viz-loss-type">
            {currentLoss.toFixed(
              4,
            )}
          </span>
        </div>

        <LossGraph
          values={lossHistory}
          label={
            isKMeans
              ? "cluster loss"
              : "loss"
          }
        />
      </div>

      {/* =================================================
          K-MEANS LEGEND
      ================================================= */}

      {isKMeans && (
        <div className="ml-viz-legend">
          <div className="ml-viz-legend-title">
            Clusters
          </div>

          {CLUSTER_COLORS.map(
            (color, index) => (
              <div
                className="ml-viz-legend-item"
                key={index}
              >
                <span
                  className="ml-viz-legend-dot"
                  style={{
                    background: color,
                  }}
                />

                <span>
                  Cluster {index + 1}
                </span>
              </div>
            ),
          )}

          <div className="ml-viz-legend-divider" />

          <div className="ml-viz-legend-item">
            <span className="ml-viz-legend-centroid">
              C
            </span>

            <span>
              Centroid
            </span>
          </div>
        </div>
      )}
    </section>
  );
}