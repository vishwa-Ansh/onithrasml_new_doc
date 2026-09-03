/* =========================================================
   TYPES
========================================================= */

export interface KMeansPoint {
  x: number;
  y: number;
  z: number;
}

export interface Centroid {
  x: number;
  y: number;
  z: number;
}

export interface KMeansResult {
  assignments: number[];
  centroids: Centroid[];
}

export interface PointAssignment {
  pointIndex: number;
  cluster: number;
  distance: number;
}

export interface KMeansAssignmentResult {
  assignments: number[];
  details: PointAssignment[];
}

export interface CentroidMovement {
  cluster: number;
  distance: number;
}

export interface KMeansStepResult {
  assignments: number[];
  centroids: Centroid[];
  loss: number;
  movement: CentroidMovement[];
}

/* =========================================================
   DATA
========================================================= */

export const kmeansData: KMeansPoint[] = [
  { x: -3.2, y: 1.2, z: -2.4 },
  { x: -2.7, y: 1.8, z: -1.8 },
  { x: -3.5, y: 0.9, z: -1.7 },
  { x: -2.2, y: 1.4, z: -2.7 },
  { x: -3.0, y: 2.1, z: -2.1 },

  { x: 2.2, y: 3.1, z: -2.0 },
  { x: 2.8, y: 3.7, z: -1.4 },
  { x: 3.1, y: 3.2, z: -2.4 },
  { x: 2.5, y: 2.8, z: -1.1 },
  { x: 3.4, y: 3.8, z: -1.8 },

  { x: 0.2, y: 1.0, z: 2.5 },
  { x: 0.8, y: 1.5, z: 3.1 },
  { x: -0.4, y: 1.3, z: 2.9 },
  { x: 0.5, y: 0.6, z: 3.4 },
  { x: -0.7, y: 0.8, z: 2.3 },
];

/* =========================================================
   INITIAL CENTROIDS
========================================================= */

export const initialCentroids: Centroid[] = [
  { x: -1, y: 3, z: -1 },
  { x: 3, y: 1, z: 1 },
  { x: -2, y: 0, z: 2 },
];

/* =========================================================
   EUCLIDEAN DISTANCE
========================================================= */

export function distance(
  point: KMeansPoint,
  centroid: Centroid,
): number {
  const dx =
    point.x - centroid.x;

  const dy =
    point.y - centroid.y;

  const dz =
    point.z - centroid.z;

  return Math.sqrt(
    dx * dx +
      dy * dy +
      dz * dz,
  );
}

/* =========================================================
   ASSIGN ONE POINT
========================================================= */

export function findNearestCentroid(
  point: KMeansPoint,
  centroids: Centroid[],
): {
  cluster: number;
  distance: number;
} {
  let nearestCluster = 0;

  let nearestDistance = Infinity;

  centroids.forEach(
    (centroid, index) => {
      const currentDistance =
        distance(
          point,
          centroid,
        );

      if (
        currentDistance <
        nearestDistance
      ) {
        nearestDistance =
          currentDistance;

        nearestCluster =
          index;
      }
    },
  );

  return {
    cluster: nearestCluster,
    distance: nearestDistance,
  };
}

/* =========================================================
   ASSIGN CLUSTERS
========================================================= */

export function assignClusters(
  data: KMeansPoint[],
  centroids: Centroid[],
): number[] {
  return data.map(
    (point) =>
      findNearestCentroid(
        point,
        centroids,
      ).cluster,
  );
}

/* =========================================================
   DETAILED ASSIGNMENT
========================================================= */

export function assignClustersDetailed(
  data: KMeansPoint[],
  centroids: Centroid[],
): KMeansAssignmentResult {
  const assignments: number[] = [];

  const details: PointAssignment[] = [];

  data.forEach(
    (point, pointIndex) => {
      const result =
        findNearestCentroid(
          point,
          centroids,
        );

      assignments.push(
        result.cluster,
      );

      details.push({
        pointIndex,
        cluster:
          result.cluster,
        distance:
          result.distance,
      });
    },
  );

  return {
    assignments,
    details,
  };
}

/* =========================================================
   UPDATE CENTROIDS
========================================================= */

export function updateCentroids(
  data: KMeansPoint[],
  assignments: number[],
  oldCentroids: Centroid[],
): Centroid[] {
  return oldCentroids.map(
    (
      oldCentroid,
      clusterIndex,
    ) => {
      const clusterPoints =
        data.filter(
          (_, index) =>
            assignments[index] ===
            clusterIndex,
        );

      /*
       * Empty cluster:
       * keep the old centroid.
       */
      if (
        clusterPoints.length === 0
      ) {
        return oldCentroid;
      }

      let sumX = 0;
      let sumY = 0;
      let sumZ = 0;

      for (
        const point of clusterPoints
      ) {
        sumX += point.x;
        sumY += point.y;
        sumZ += point.z;
      }

      return {
        x:
          sumX /
          clusterPoints.length,

        y:
          sumY /
          clusterPoints.length,

        z:
          sumZ /
          clusterPoints.length,
      };
    },
  );
}

/* =========================================================
   CENTROID MOVEMENT
========================================================= */

export function calculateCentroidMovement(
  oldCentroids: Centroid[],
  newCentroids: Centroid[],
): CentroidMovement[] {
  return newCentroids.map(
    (centroid, index) => {
      const previous =
        oldCentroids[index];

      if (!previous) {
        return {
          cluster: index,
          distance: 0,
        };
      }

      return {
        cluster: index,
        distance: distance(
          centroid,
          previous,
        ),
      };
    },
  );
}

/* =========================================================
   TOTAL CENTROID MOVEMENT
========================================================= */

export function calculateTotalCentroidMovement(
  oldCentroids: Centroid[],
  newCentroids: Centroid[],
): number {
  const movements =
    calculateCentroidMovement(
      oldCentroids,
      newCentroids,
    );

  return movements.reduce(
    (total, item) =>
      total + item.distance,
    0,
  );
}

/* =========================================================
   K-MEANS STEP
========================================================= */

export function kmeansStep(
  data: KMeansPoint[],
  centroids: Centroid[],
): KMeansResult {
  const assignments =
    assignClusters(
      data,
      centroids,
    );

  const nextCentroids =
    updateCentroids(
      data,
      assignments,
      centroids,
    );

  return {
    assignments,
    centroids:
      nextCentroids,
  };
}

/* =========================================================
   COMPLETE K-MEANS STEP
========================================================= */

export function runKMeansStep(
  data: KMeansPoint[],
  centroids: Centroid[],
): KMeansStepResult {
  const assignmentResult =
    assignClustersDetailed(
      data,
      centroids,
    );

  const nextCentroids =
    updateCentroids(
      data,
      assignmentResult.assignments,
      centroids,
    );

  const loss =
    calculateKMeansLoss(
      data,
      assignmentResult.assignments,
      nextCentroids,
    );

  const movement =
    calculateCentroidMovement(
      centroids,
      nextCentroids,
    );

  return {
    assignments:
      assignmentResult.assignments,

    centroids:
      nextCentroids,

    loss,

    movement,
  };
}

/* =========================================================
   K-MEANS LOSS
========================================================= */

export function calculateKMeansLoss(
  data: KMeansPoint[],
  assignments: number[],
  centroids: Centroid[],
): number {
  let total = 0;

  for (
    let i = 0;
    i < data.length;
    i++
  ) {
    const point = data[i];

    const cluster =
      assignments[i];

    const centroid =
      centroids[cluster];

    if (!point || !centroid) {
      continue;
    }

    const d = distance(
      point,
      centroid,
    );

    total += d * d;
  }

  return total;
}

/* =========================================================
   CLUSTER COUNTS
========================================================= */

export function calculateClusterCounts(
  assignments: number[],
  clusterCount: number,
): number[] {
  const counts =
    new Array<number>(
      clusterCount,
    ).fill(0);

  for (
    const cluster of assignments
  ) {
    if (
      cluster >= 0 &&
      cluster < clusterCount
    ) {
      counts[cluster]++;
    }
  }

  return counts;
}

/* =========================================================
   CLUSTER POINTS
========================================================= */

export function getClusterPoints(
  data: KMeansPoint[],
  assignments: number[],
  clusterIndex: number,
): KMeansPoint[] {
  return data.filter(
    (_, index) =>
      assignments[index] ===
      clusterIndex,
  );
}



/* =========================================================
   CENTROID MEAN
========================================================= */

export function calculateClusterMean(
  data: KMeansPoint[],
  assignments: number[],
  clusterIndex: number,
): Centroid | null {
  const points = data.filter(
    (_, index) =>
      assignments[index] ===
      clusterIndex,
  );

  if (points.length === 0) {
    return null;
  }

  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (const point of points) {
    sumX += point.x;
    sumY += point.y;
    sumZ += point.z;
  }

  return {
    x: sumX / points.length,
    y: sumY / points.length,
    z: sumZ / points.length,
  };
}