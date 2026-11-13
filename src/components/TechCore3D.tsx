import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/soundEffects';

interface TechNode {
  id: string;
  name: string;
  category: string;
  color: number;
  position: [number, number, number];
  detail: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: 'react',
    name: 'React & TS',
    category: 'Client Layer',
    color: 0xC84B26,
    position: [2.5, 0.8, 1.2],
    detail: 'Responsive SPAs, modular components, and fast Tailwind interfaces.',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend Engine',
    color: 0xE8613A,
    position: [-2.4, 1.2, 1.0],
    detail: 'REST APIs, authentication middleware, and asynchronous services.',
  },
  {
    id: 'php',
    name: 'PHP APIs',
    category: 'Server Layer',
    color: 0xC84B26,
    position: [1.8, -1.8, 1.5],
    detail: 'Custom REST endpoints, session handling, and backend scripts.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    color: 0xE8613A,
    position: [-2.2, -1.5, -1.2],
    detail: 'Relational data schemas, phpMyAdmin queries, and migration safety.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Edge Hosting',
    color: 0xC84B26,
    position: [0.0, 2.6, -1.0],
    detail: 'Automated CI/CD deployments and global edge CDN caching.',
  },
  {
    id: 'cpanel',
    name: 'cPanel & SSL',
    category: 'Infrastructure',
    color: 0xE8613A,
    position: [0.0, -2.5, 1.5],
    detail: 'DNS records, SSL setup, subdomains, and live host migrations.',
  },
];

export const TechCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<TechNode>(TECH_NODES[0]);
  const [webGLOk, setWebGLOk] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    const scene = new THREE.Scene();

    const w = container.clientWidth || 360;
    const h = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLOk(false);
      return;
    }

    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = isDark ? 0xE8613A : 0xC84B26;
    const wireColor = isDark ? 0x3F3F46 : 0xB4B2A8;

    // 1. Central Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 2. Central Polyhedral Core
    const coreGeom = new THREE.DodecahedronGeometry(1.2, 0);

    const coreSolidMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1E1E22 : 0xF4F2EB,
      metalness: 0.8,
      roughness: 0.25,
      flatShading: true,
    });
    const coreSolid = new THREE.Mesh(coreGeom, coreSolidMat);
    coreGroup.add(coreSolid);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreWire = new THREE.Mesh(coreGeom, coreWireMat);
    coreGroup.add(coreWire);

    // 3. Orbital Rings
    const ring1Geom = new THREE.TorusGeometry(2.6, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.4 : 0.5,
    });

    const ring1 = new THREE.Mesh(ring1Geom, ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ring1Geom, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 4;
    coreGroup.add(ring2);

    // 4. Orbiting Satellite Nodes
    const nodeMeshes: { mesh: THREE.Mesh; node: TechNode }[] = [];

    TECH_NODES.forEach((node) => {
      const nodeGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(...node.position);
      coreGroup.add(nodeMesh);

      // Connecting line to center
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...node.position),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: wireColor,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      coreGroup.add(line);

      nodeMeshes.push({ mesh: nodeMesh, node });
    });

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(primaryColor, 1.8);
    dirLight.position.set(5, 6, 5);
    scene.add(dirLight);

    // 6. Safe Interaction (Touch-Friendly, NEVER hijacking vertical page scrolling)
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      coreGroup.rotation.y += dx * 0.008;
      coreGroup.rotation.x += dy * 0.008;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 300;
      const nh = container.clientHeight || 300;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        // Subtle continuous idle rotation
        coreGroup.rotation.y += 0.005;
        coreGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.12;

        // Animate counter-rotating rings
        ring1.rotation.z += 0.008;
        ring2.rotation.z -= 0.006;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeom.dispose();
      coreSolidMat.dispose();
      coreWireMat.dispose();
      ring1Geom.dispose();
      ringMat.dispose();
    };
  }, []);

  const selectNode = (node: TechNode) => {
    sounds.playClick();
    setActiveNode(node);
  };

  if (!webGLOk) {
    return null;
  }

  return (
    <section className="py-14 sm:py-20 border-b border-surface-light-border dark:border-surface-dark-border overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10 font-mono text-xs tracking-wider uppercase text-surface-light-subtext dark:text-surface-dark-subtext">
          <span className="text-accent dark:text-accent-dark font-semibold">03</span>
          <span className="w-6 h-px bg-surface-light-border dark:bg-surface-dark-border" />
          <span>Interactive 3D Tech Core</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 3D Visual Centerpiece */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[380px] rounded-lg border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card/80 dark:bg-surface-dark-card/80 backdrop-blur-md p-2 flex items-center justify-center shadow-lg select-none">
              
              {/* Three.js Canvas Container with touch-action: pan-y (Permits natural vertical scrolling on phones) */}
              <div
                ref={containerRef}
                style={{ touchAction: 'pan-y' }}
                className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
                title="Desktop: Click and drag to spin 3D core • Mobile: Tap tabs below"
              />

              {/* Status pill on canvas */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-surface-light-bg/90 dark:bg-surface-dark-bg/90 border border-surface-light-border dark:border-surface-dark-border text-[10px] font-mono text-surface-light-subtext dark:text-surface-dark-subtext">
                <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark animate-pulse" />
                <span>Three.js 3D Orbital Core</span>
              </div>

              {/* Safe instruction */}
              <div className="absolute bottom-3 inset-x-3 text-center text-[10px] font-mono text-surface-light-subtext/70 dark:text-surface-dark-subtext/70 pointer-events-none">
                Interactive Satellite View
              </div>
            </div>
          </div>

          {/* Controls & Tech Exploration */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-surface-light-text dark:text-surface-dark-text font-normal tracking-tight mb-3">
                Full-Stack Architecture Orbit
              </h2>
              <p className="text-base text-surface-light-subtext dark:text-surface-dark-subtext font-sans font-light leading-relaxed">
                A 3D model of the web systems I build. Tap any component in the orbit to inspect how each piece connects from client edge to server database.
              </p>
            </div>

            {/* Interactive Tech Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TECH_NODES.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => selectNode(node)}
                    className={`p-3 rounded border text-left transition-all ${
                      isSelected
                        ? 'border-accent bg-accent text-white shadow-sm font-medium'
                        : 'border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card hover:border-accent/40 text-surface-light-text dark:text-surface-dark-text'
                    }`}
                  >
                    <span className="block text-[10px] font-mono opacity-80 uppercase mb-0.5">
                      {node.category}
                    </span>
                    <span className="font-mono text-xs font-semibold">
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Node Highlight Card */}
            <div className="p-4 rounded border border-surface-light-border dark:border-surface-dark-border bg-surface-light-card dark:bg-surface-dark-card space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent dark:text-accent-dark font-semibold uppercase">
                  {activeNode.name} • {activeNode.category}
                </span>
                <span className="text-[11px] text-surface-light-subtext dark:text-surface-dark-subtext">
                  Active Focus
                </span>
              </div>
              <p className="text-sm font-sans text-surface-light-subtext dark:text-surface-dark-subtext leading-relaxed">
                {activeNode.detail}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
