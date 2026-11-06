import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/soundEffects';

type ShapeMode = 'icosahedron' | 'torusKnot' | 'octahedron';

export const ThreeHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState<ShapeMode>('icosahedron');
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Renderer setup with safe WebGL try/catch
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    try {
      scene = new THREE.Scene();
      const width = container.clientWidth || 350;
      const height = container.clientHeight || 350;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5.2;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGLError(true);
      return;
    }

    // 2. Determine theme colors
    const isDark = document.documentElement.classList.contains('dark');
    const primaryColor = isDark ? 0xE8613A : 0xC84B26; // Terracotta accent
    const wireframeColor = isDark ? 0x4A4A52 : 0xC5C3BB; // Subtle architectural lines
    const coreColor = isDark ? 0xFFFFFF : 0x141414;

    // 3. Create Main 3D Mesh Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Geometry generators
    let currentMesh: THREE.Group | THREE.Mesh | null = null;

    const buildShape = (mode: ShapeMode) => {
      if (currentMesh) {
        mainGroup.remove(currentMesh);
        currentMesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      const shapeGroup = new THREE.Group();

      let geom: THREE.BufferGeometry;
      if (mode === 'torusKnot') {
        geom = new THREE.TorusKnotGeometry(1.0, 0.32, 100, 16);
      } else if (mode === 'octahedron') {
        geom = new THREE.OctahedronGeometry(1.4, 1);
      } else {
        geom = new THREE.IcosahedronGeometry(1.4, 1);
      }

      // Outer Wireframe
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: wireframeColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.45 : 0.6,
      });
      const wireframeMesh = new THREE.Mesh(geom, wireframeMat);
      shapeGroup.add(wireframeMesh);

      // Corner Vertices Points
      const pointsMat = new THREE.PointsMaterial({
        color: primaryColor,
        size: 0.08,
      });
      const points = new THREE.Points(geom, pointsMat);
      shapeGroup.add(points);

      // Inner solid facet with lighting
      const solidMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1E1E22 : 0xF0EFEA,
        roughness: 0.3,
        metalness: 0.8,
        flatShading: true,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
      const innerMesh = new THREE.Mesh(geom, solidMat);
      shapeGroup.add(innerMesh);

      // Orbital Ring
      const ringGeom = new THREE.RingGeometry(1.9, 1.95, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isDark ? 0.35 : 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      shapeGroup.add(ringMesh);

      currentMesh = shapeGroup;
      mainGroup.add(shapeGroup);
    };

    buildShape(currentMode);

    // 4. Ambient Particle Dust Field
    const particleCount = 70;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(primaryColor, 1.5);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(coreColor, 1.0);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    // 6. Interactive Mouse & Drag Handling
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        mainGroup.rotation.y += deltaX * 0.01;
        mainGroup.rotation.x += deltaY * 0.01;
        previousPointerX = clientX;
        previousPointerY = clientY;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('mousedown', onPointerDown);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const newW = container.clientWidth || 300;
      const newH = container.clientHeight || 300;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion && !isDragging) {
        mainGroup.rotation.y += 0.006;
        mainGroup.rotation.x += 0.003;

        targetX = mouseX * 0.6;
        targetY = mouseY * 0.6;
        mainGroup.rotation.y += (targetX - mainGroup.rotation.y * 0.3) * 0.04;
        mainGroup.rotation.x += (targetY - mainGroup.rotation.x * 0.3) * 0.04;

        mainGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      }

      particles.rotation.y = elapsed * 0.03;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('mousedown', onPointerDown);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, [currentMode]);

  const handleModeChange = (mode: ShapeMode) => {
    sounds.playClick();
    setCurrentMode(mode);
  };

  // Safe Fallback if WebGL isn't supported in environment
  if (hasWebGLError) {
    return (
      <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[400px] mx-auto flex items-center justify-center p-8 text-center border border-surface-light-border dark:border-surface-dark-border rounded bg-surface-light-card dark:bg-surface-dark-card font-mono text-xs">
        <div className="space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-accent dark:border-accent-dark animate-spin" />
          <p className="font-serif text-lg font-normal text-surface-light-text dark:text-surface-dark-text">
            Ademola Adebayo
          </p>
          <p className="text-surface-light-subtext dark:text-surface-dark-subtext">
            Web Developer / Nigeria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[400px] mx-auto select-none">
      {/* 3D WebGL Canvas Host */}
      <div
        ref={containerRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-200 ${
          isInteracting ? 'scale-105' : 'scale-100'
        }`}
        title="Click and drag to spin 3D sculpture"
      />

      {/* 3D Geometry Controls */}
      <div className="absolute bottom-1 inset-x-2 flex items-center justify-between px-3 py-1.5 rounded bg-surface-light-card/90 dark:bg-surface-dark-card/90 backdrop-blur-sm border border-surface-light-border dark:border-surface-dark-border text-[11px] font-mono">
        <span className="text-surface-light-subtext dark:text-surface-dark-subtext flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-accent-dark animate-ping" />
          <span className="hidden sm:inline">Three.js /</span> 3D Core
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('icosahedron')}
            className={`px-2 py-0.5 rounded transition-colors ${
              currentMode === 'icosahedron'
                ? 'bg-accent text-white font-medium'
                : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
            }`}
          >
            Icosa
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('torusKnot')}
            className={`px-2 py-0.5 rounded transition-colors ${
              currentMode === 'torusKnot'
                ? 'bg-accent text-white font-medium'
                : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
            }`}
          >
            Knot
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('octahedron')}
            className={`px-2 py-0.5 rounded transition-colors ${
              currentMode === 'octahedron'
                ? 'bg-accent text-white font-medium'
                : 'text-surface-light-subtext dark:text-surface-dark-subtext hover:text-surface-light-text dark:hover:text-surface-dark-text'
            }`}
          >
            Octa
          </button>
        </div>
      </div>

      {/* Tactile Drag Hint */}
      <div className="absolute top-2 right-2 text-[10px] font-mono text-surface-light-subtext/70 dark:text-surface-dark-subtext/70 pointer-events-none">
        Drag to rotate
      </div>
    </div>
  );
};
