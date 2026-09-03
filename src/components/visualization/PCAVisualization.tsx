import { Canvas } from "@react-three/fiber";
import {
    Grid,
    Line,
    OrbitControls,
    Text,
} from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

import {
    calculatePCA,
    pcaData,
    projectPoint,
    type PCADataPoint,
    type PCAResult,
} from "../../data/visualizations/pca";

import "./PCAVisualization.css";


/* =========================================================
   CONSTANTS
========================================================= */

const DATA_SCALE = 0.9;
const AXIS_LENGTH = 4.5;


/* =========================================================
   DATA POINTS
========================================================= */

function DataPoints({
    data,
}: {
    data: PCADataPoint[];
}) {
    return (
        <group>
            {data.map((point, index) => (
                <mesh
                    key={index}
                    position={[
                        point.x * DATA_SCALE,
                        point.z * DATA_SCALE,
                        point.y * DATA_SCALE,
                    ]}
                >
                    <sphereGeometry
                        args={[
                            0.09,
                            16,
                            16,
                        ]}
                    />

                    <meshStandardMaterial />
                </mesh>
            ))}
        </group>
    );
}


/* =========================================================
   MEAN POINT
========================================================= */

function MeanPoint({
    result,
}: {
    result: PCAResult;
}) {
    const mean = result.mean;

    return (
        <group>
            <mesh
                position={[
                    mean.x * DATA_SCALE,
                    mean.z * DATA_SCALE,
                    mean.y * DATA_SCALE,
                ]}
            >
                <sphereGeometry
                    args={[
                        0.14,
                        20,
                        20,
                    ]}
                />

                <meshStandardMaterial />
            </mesh>

            <Text
                position={[
                    mean.x * DATA_SCALE,
                    mean.z * DATA_SCALE + 0.3,
                    mean.y * DATA_SCALE,
                ]}
                fontSize={0.16}
                anchorX="center"
                anchorY="middle"
            >
                Mean
            </Text>
        </group>
    );
}


/* =========================================================
   PRINCIPAL COMPONENT AXIS
========================================================= */

function PrincipalAxis({
    origin,
    direction,
    label,
    length,
}: {
    origin: PCAResult["mean"];
    direction: PCAResult["pc1"];
    label: string;
    length: number;
}) {
    const start: [
        number,
        number,
        number
    ] = [
        origin.x * DATA_SCALE -
            direction.x * length,

        origin.z * DATA_SCALE -
            direction.z * length,

        origin.y * DATA_SCALE -
            direction.y * length,
    ];

    const end: [
        number,
        number,
        number
    ] = [
        origin.x * DATA_SCALE +
            direction.x * length,

        origin.z * DATA_SCALE +
            direction.z * length,

        origin.y * DATA_SCALE +
            direction.y * length,
    ];

    const arrowDirection =
        new THREE.Vector3(
            end[0] - start[0],
            end[1] - start[1],
            end[2] - start[2]
        ).normalize();

    const arrowOrigin =
        new THREE.Vector3(
            end[0],
            end[1],
            end[2]
        );

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
                    arrowDirection,
                    arrowOrigin,
                    0.28,
                    undefined,
                    0.14,
                ]}
            />

            <Text
                position={[
                    end[0],
                    end[1] + 0.25,
                    end[2],
                ]}
                fontSize={0.18}
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    );
}


/* =========================================================
   PROJECTION LINES
========================================================= */

function ProjectionLines({
    data,
    result,
}: {
    data: PCADataPoint[];
    result: PCAResult;
}) {
    return (
        <group>
            {data.map((point, index) => {
                const projection =
                    projectPoint(
                        point,
                        result
                    );

                const original: [
                    number,
                    number,
                    number
                ] = [
                    point.x * DATA_SCALE,
                    point.z * DATA_SCALE,
                    point.y * DATA_SCALE,
                ];

                const projectedVector =
                    new THREE.Vector3(
                        result.mean.x +
                            result.pc1.x *
                                projection.x +
                            result.pc2.x *
                                projection.y,

                        result.mean.z +
                            result.pc1.z *
                                projection.x +
                            result.pc2.z *
                                projection.y,

                        result.mean.y +
                            result.pc1.y *
                                projection.x +
                            result.pc2.y *
                                projection.y
                    );

                const projected: [
                    number,
                    number,
                    number
                ] = [
                    projectedVector.x *
                        DATA_SCALE,

                    projectedVector.y *
                        DATA_SCALE,

                    projectedVector.z *
                        DATA_SCALE,
                ];

                return (
                    <Line
                        key={index}
                        points={[
                            original,
                            projected,
                        ]}
                        lineWidth={1.5}
                    />
                );
            })}
        </group>
    );
}


/* =========================================================
   PROJECTED POINTS
========================================================= */

function ProjectedPoints({
    data,
    result,
}: {
    data: PCADataPoint[];
    result: PCAResult;
}) {
    return (
        <group>
            {data.map((point, index) => {
                const projection =
                    projectPoint(
                        point,
                        result
                    );

                const projectedVector =
                    new THREE.Vector3(
                        result.mean.x +
                            result.pc1.x *
                                projection.x +
                            result.pc2.x *
                                projection.y,

                        result.mean.z +
                            result.pc1.z *
                                projection.x +
                            result.pc2.z *
                                projection.y,

                        result.mean.y +
                            result.pc1.y *
                                projection.x +
                            result.pc2.y *
                                projection.y
                    );

                return (
                    <mesh
                        key={index}
                        position={[
                            projectedVector.x *
                                DATA_SCALE,

                            projectedVector.y *
                                DATA_SCALE,

                            projectedVector.z *
                                DATA_SCALE,
                        ]}
                    >
                        <sphereGeometry
                            args={[
                                0.065,
                                14,
                                14,
                            ]}
                        />

                        <meshStandardMaterial />
                    </mesh>
                );
            })}
        </group>
    );
}


/* =========================================================
   PCA PLANE
========================================================= */

function PCAPlane({
    result,
}: {
    result: PCAResult;
}) {
    const geometry =
        useMemo(() => {
            const size = 4;

            const positions = [
                -size,
                0,
                -size,

                size,
                0,
                -size,

                size,
                0,
                size,

                -size,
                0,
                size,
            ];

            const bufferGeometry =
                new THREE.BufferGeometry();

            bufferGeometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(
                    positions,
                    3
                )
            );

            bufferGeometry.setIndex([
                0,
                1,
                2,
                0,
                2,
                3,
            ]);

            bufferGeometry.computeVertexNormals();

            return bufferGeometry;
        }, []);

    const quaternion =
        useMemo(() => {
            const normal =
                new THREE.Vector3(
                    result.pc1.y *
                        result.pc2.z -
                        result.pc1.z *
                            result.pc2.y,

                    result.pc1.z *
                        result.pc2.x -
                        result.pc1.x *
                            result.pc2.z,

                    result.pc1.x *
                        result.pc2.y -
                        result.pc1.y *
                            result.pc2.x
                ).normalize();

            const up =
                new THREE.Vector3(
                    0,
                    1,
                    0
                );

            return new THREE.Quaternion().setFromUnitVectors(
                up,
                normal
            );
        }, [
            result.pc1,
            result.pc2,
        ]);

    return (
        <mesh
            geometry={geometry}
            position={[
                result.mean.x *
                    DATA_SCALE,

                result.mean.z *
                    DATA_SCALE,

                result.mean.y *
                    DATA_SCALE,
            ]}
            quaternion={quaternion}
            scale={[
                DATA_SCALE,
                DATA_SCALE,
                DATA_SCALE,
            ]}
        >
            <meshBasicMaterial
                transparent
                opacity={0.08}
                side={
                    THREE.DoubleSide
                }
            />
        </mesh>
    );
}


/* =========================================================
   SCENE
========================================================= */

function Scene({
    data,
    result,
}: {
    data: PCADataPoint[];
    result: PCAResult;
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
                cellSize={1}
                sectionSize={3}
                fadeDistance={18}
            />

            <axesHelper
                args={[
                    AXIS_LENGTH,
                ]}
            />

            <PCAPlane
                result={result}
            />

            <DataPoints
                data={data}
            />

            <ProjectionLines
                data={data}
                result={result}
            />

            <ProjectedPoints
                data={data}
                result={result}
            />

            <MeanPoint
                result={result}
            />

            <PrincipalAxis
                origin={result.mean}
                direction={result.pc1}
                label="PC1"
                length={3.8}
            />

            <PrincipalAxis
                origin={result.mean}
                direction={result.pc2}
                label="PC2"
                length={3}
            />

            <Text
                position={[
                    4,
                    0,
                    0,
                ]}
                fontSize={0.22}
                anchorX="center"
                anchorY="middle"
            >
                Feature X
            </Text>

            <Text
                position={[
                    0,
                    4,
                    0,
                ]}
                fontSize={0.22}
                anchorX="center"
                anchorY="middle"
            >
                Feature Z
            </Text>

            <Text
                position={[
                    0,
                    0,
                    4,
                ]}
                fontSize={0.22}
                anchorX="center"
                anchorY="middle"
            >
                Feature Y
            </Text>

            <OrbitControls
                enableDamping
                dampingFactor={0.08}
            />
        </>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export function PCAVisualization() {
    const result = useMemo(
        () => calculatePCA(pcaData),
        []
    );

    return (
        <div className="pca-visualization">

            <div className="pca-canvas">
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
                        data={pcaData}
                        result={result}
                    />
                </Canvas>
            </div>

            <div className="pca-info">

                <div>
                    <strong>
                        DATA POINTS
                    </strong>

                    <span>
                        {pcaData.length}
                    </span>
                </div>

                <div>
                    <strong>
                        PC1 EIGENVALUE
                    </strong>

                    <span>
                        {result.eigenvalue1.toFixed(
                            4
                        )}
                    </span>
                </div>

                <div>
                    <strong>
                        PC1 VARIANCE
                    </strong>

                    <span>
                        {(
                            result.explainedVariance1 *
                            100
                        ).toFixed(2)}
                        %
                    </span>
                </div>

                <div>
                    <strong>
                        PC2 EIGENVALUE
                    </strong>

                    <span>
                        {result.eigenvalue2.toFixed(
                            4
                        )}
                    </span>
                </div>

                <div>
                    <strong>
                        PC2 VARIANCE
                    </strong>

                    <span>
                        {(
                            result.explainedVariance2 *
                            100
                        ).toFixed(2)}
                        %
                    </span>
                </div>

                <div>
                    <strong>
                        TOTAL EXPLAINED
                    </strong>

                    <span>
                        {(
                            (result.explainedVariance1 +
                                result.explainedVariance2) *
                            100
                        ).toFixed(2)}
                        %
                    </span>
                </div>

            </div>

        </div>
    );
}