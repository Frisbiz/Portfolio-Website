/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

// Preload 3D assets to avoid 404s and first-frame hitches
(useGLTF as any).preload?.("/lanyard/card.glb");
(useTexture as any).preload?.("/lanyard/lanyard.png");

type Vec3 = [number, number, number];

export interface LanyardProps {
  position?: Vec3;
  gravity?: Vec3;
  fov?: number;
  transparent?: boolean;
  className?: string;
}

export default function LanyardClient({
  position = [0, 0, 22],       // pulled back so it’s visible
  gravity = [0, -40, 0],     // softer for stability
  fov = 22,
  transparent = true,
  className = "w-full h-screen",
}: LanyardProps) {
  return (
    <div className={`relative z-0 flex items-center justify-center ${className}`}>
      <Canvas
        className="pointer-events-auto"
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>

        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ maxSpeed = 50, minSpeed = 0 }: BandProps) {
  const { size } = useThree();
  const band = useRef<THREE.Mesh | null>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  // Assets
  const gltf = useGLTF("/lanyard/card.glb") as any;
  const nodes = gltf?.nodes;
  const materials = gltf?.materials;

  const texture = useTexture("/lanyard/lanyard.png");
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  // Seed meshline geometry with points at frame 0 to prevent "count" errors
    const [meshLineGeometry] = useState(() => {
    const g = new MeshLineGeometry();
    // seed with a gentle arc; actual rope points come from physics joints so this is just a safe seed
    g.setPoints([
      new THREE.Vector3(0, 12, 0),
      new THREE.Vector3(0.5, 9, 0),
      new THREE.Vector3(1, 6, 0),
      new THREE.Vector3(1.5, 3, 0),
      new THREE.Vector3(2, 0, 0),
    ]);
    return g;
  });

  // Debug logs to confirm assets and nodes load at runtime (temporary)
  // eslint-disable-next-line no-console
  console.log("Lanyard assets:", { nodes, materials, texture, meshLinePoints: (meshLineGeometry as any)?.array?.length ?? "unknown" });

  // Rope curve
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        // match the seeded geometry: gentle arc; runtime updates come from Rapier joints
        new THREE.Vector3(0, 12, 0),
        new THREE.Vector3(0.5, 9, 0),
        new THREE.Vector3(1, 6, 0),
        new THREE.Vector3(1.5, 3, 0),
        new THREE.Vector3(2, 0, 0),
      ])
  );
  (curve as any).curveType = "chordal";

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);
  const [isSmall, setIsSmall] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 1024 : false));

  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  // Joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useFrame((state, delta) => {
    // Drag
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    // Rope + geometry update
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = ref.current.lerped.distanceTo(ref.current.translation());
        const clamped = Math.max(0.1, Math.min(1, d));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clamped * (maxSpeed - minSpeed)));
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      const geom: any = (band.current as any).geometry;
      if (geom?.setPoints) {
        const pts = curve.getPoints(32);
        if (pts && pts.length) geom.setPoints(pts);
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[-1, 7, 0]}>
        {/* anchor the top of the band above the hero so it extends slightly off-screen */}
        <RigidBody ref={fixed} position={[0, 18, 0]} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 12, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.12]} />
        </RigidBody>
        <RigidBody position={[1, 6, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.11]} />
        </RigidBody>
        <RigidBody position={[1.5, 2, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.10]} />
        </RigidBody>

        <RigidBody position={[2, -4, 0]} ref={card} {...segmentProps} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              (e.currentTarget as any).releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e: any) => {
              (e.currentTarget as any).setPointerCapture(e.pointerId);
              setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {nodes?.card ? (
              <>
                <mesh geometry={nodes.card.geometry}>
                  <meshPhysicalMaterial
                    map={materials?.base?.map}
                    clearcoat={1}
                    clearcoatRoughness={0.15}
                    roughness={0.9}
                    metalness={0.8}
                  />
                </mesh>
                {nodes.clip && <mesh geometry={nodes.clip.geometry} material={materials.metal} />}
                {nodes.clamp && <mesh geometry={nodes.clamp.geometry} material={materials.metal} />}
              </>
            ) : (
              <mesh geometry={new THREE.BoxGeometry(1.6, 2.25, 0.02)}>
                <meshPhysicalMaterial color="#8B5CF6" metalness={0.2} roughness={0.6} clearcoat={1} clearcoatRoughness={0.15} />
              </mesh>
            )}
          </group>
        </RigidBody>
        {/* Debug marker: visible red sphere to confirm the Canvas and scene are rendering */}
        <mesh position={[2, -4, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="red" emissive="red" />
        </mesh>
      </group>

      <mesh ref={band} geometry={meshLineGeometry as any} renderOrder={50}>
        <meshLineMaterial
          color="#8B5CF6"
          depthTest={false}
          depthWrite={false}
          transparent={true}
          opacity={1}
          resolution={[size.width, size.height]}
          useMap={!!texture}
          map={texture as any}
          repeat={[-4, 1]}
          lineWidth={0.12}
        />
      </mesh>
    </>
  );
}
