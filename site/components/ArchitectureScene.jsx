"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_DATA = [
  { label: "Client Apps", position: [-3.4, 1.8, 0], color: 0x3f7f91 },
  { label: "API Layer", position: [-1.4, 0.8, 0.7], color: 0x2f6f8f },
  { label: "Agent Orchestrator", position: [0.4, 0, 0], color: 0x132a3a },
  { label: "Model Router", position: [2.2, 1.1, 0.6], color: 0x8b5f2f },
  { label: "Provider Adapters", position: [3.6, 0.1, -0.2], color: 0x763d5b },
  { label: "Tool Registry", position: [1.8, -1.2, 0.9], color: 0x275b72 },
  { label: "Memory Service", position: [-0.9, -1.8, -0.3], color: 0x58683a },
  { label: "Database Connectors", position: [-3.0, -0.9, -0.8], color: 0x9b5a2a }
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 7],
  [2, 6],
  [6, 7],
  [6, 3]
];

function makeTextSprite(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  context.fillStyle = "rgba(255,255,255,0.92)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(19,42,58,0.18)";
  context.lineWidth = 4;
  context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
  context.fillStyle = "#132a3a";
  context.font = "700 36px Inter, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.75, 0.44, 1);
  return sprite;
}

export default function ArchitectureScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071316);

    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.1, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 5, 5);
    scene.add(keyLight);

    const baseGeometry = new THREE.CylinderGeometry(0.38, 0.46, 0.22, 36);
    const nodes = NODE_DATA.map((item) => {
      const material = new THREE.MeshStandardMaterial({
        color: item.color,
        metalness: 0.32,
        roughness: 0.38
      });
      const mesh = new THREE.Mesh(baseGeometry, material);
      mesh.position.set(...item.position);
      mesh.rotation.x = Math.PI / 2.2;
      mesh.userData.baseY = item.position[1];
      group.add(mesh);

      const label = makeTextSprite(item.label);
      label.position.set(item.position[0], item.position[1] - 0.55, item.position[2] + 0.05);
      group.add(label);

      return mesh;
    });

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x486468, transparent: true, opacity: 0.58 });
    const edgeLines = EDGES.map(([from, to]) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        nodes[from].position,
        nodes[to].position
      ]);
      const line = new THREE.Line(geometry, lineMaterial);
      group.add(line);
      return line;
    });

    const orbitGeometry = new THREE.TorusGeometry(2.9, 0.008, 8, 160);
    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x6d8480, transparent: true, opacity: 0.28 });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2.6;
    orbit.rotation.z = -0.42;
    group.add(orbit);

    let frameId = 0;
    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      group.rotation.y = Math.sin(t * 0.35) * 0.11;
      group.rotation.x = Math.cos(t * 0.28) * 0.04;
      orbit.rotation.z += 0.003;
      nodes.forEach((node, index) => {
        node.position.y = node.userData.baseY + Math.sin(t + index * 0.8) * 0.06;
      });
      edgeLines.forEach((line, index) => {
        const [from, to] = EDGES[index];
        line.geometry.setFromPoints([nodes[from].position, nodes[to].position]);
        line.geometry.attributes.position.needsUpdate = true;
      });
      renderer.render(scene, camera);
    };

    const applyResponsiveSceneLayout = () => {
      if (mount.clientWidth < 700) {
        group.position.set(1.35, -1.35, 0);
        group.scale.setScalar(0.5);
        return;
      }

      group.position.set(2.8, -0.1, 0);
      group.scale.setScalar(0.66);
    };

    const resize = () => {
      applyResponsiveSceneLayout();
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", resize);
    applyResponsiveSceneLayout();
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="architecture-canvas" ref={mountRef} aria-label="3D high-level architecture diagram" />;
}
