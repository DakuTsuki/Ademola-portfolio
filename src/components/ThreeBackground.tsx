import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Setup Scene, Camera & Renderer
    let renderer: THREE.WebGLRenderer;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 22);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      // Graceful exit if WebGL fails
      return;
    }

    // 2. Theme & Fog configuration
    const updateThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const fogColor = isDark ? 0x111112 : 0xFAF9F6;
      scene.fog = new THREE.FogExp2(fogColor, 0.035);
      return {
        isDark,
        accentColor: isDark ? 0xE8613A : 0xC84B26,
        wireColor: isDark ? 0x2A2A30 : 0xDDDCD5,
        gridColor: isDark ? 0x222226 : 0xEAE8E2,
        particleColor: isDark ? 0xE8613A : 0xB8421E,
      };
    };

    let colors = updateThemeColors();

    // 3. 3D Wave Wireframe Terrain Mesh (Floor / Depth Grid)
    const gridCols = 55;
    const gridRows = 55;
    const terrainGeom = new THREE.PlaneGeometry(60, 60, gridCols, gridRows);
    terrainGeom.rotateX(-Math.PI / 2);
    terrainGeom.translate(0, -6, -5);

    const posAttr = terrainGeom.attributes.position;
    const originalY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalY[i] = posAttr.getY(i);
    }

    const terrainMat = new THREE.MeshBasicMaterial({
      color: colors.wireColor,
      wireframe: true,
      transparent: true,
      opacity: colors.isDark ? 0.35 : 0.45,
    });
    const terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
    scene.add(terrainMesh);

    // 4. Floating 3D Geometric Objects (Icosahedrons & Octahedrons drifting in 3D space)
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    const shapes: {
      mesh: THREE.Group;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      initY: number;
      offset: number;
    }[] = [];

    const numObjects = 9;
    for (let i = 0; i < numObjects; i++) {
      const group = new THREE.Group();
      const isIcosa = i % 2 === 0;
      const geom = isIcosa
        ? new THREE.IcosahedronGeometry(1.2 + Math.random() * 0.8, 1)
        : new THREE.OctahedronGeometry(1.0 + Math.random() * 0.7, 1);

      // Wireframe
      const wireMat = new THREE.MeshBasicMaterial({
        color: colors.wireColor,
        wireframe: true,
        transparent: true,
        opacity: colors.isDark ? 0.4 : 0.5,
      });
      const wire = new THREE.Mesh(geom, wireMat);
      group.add(wire);

      // Point vertices
      const ptsMat = new THREE.PointsMaterial({
        color: colors.accentColor,
        size: 0.08,
      });
      const pts = new THREE.Points(geom, ptsMat);
      group.add(pts);

      // Position in 3D volume
      const spreadX = 34;
      const spreadY = 16;
      const spreadZ = 20;

      group.position.set(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY + 3,
        (Math.random() - 0.5) * spreadZ - 2
      );

      floatGroup.add(group);
      shapes.push({
        mesh: group,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.008,
        },
        floatSpeed: 0.8 + Math.random() * 0.8,
        initY: group.position.y,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // 5. 3D Particle Cloud (Ambient Space Dust)
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i + 2] = (Math.random() - 0.5) * 35;
    }

    particleGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: colors.particleColor,
      size: 0.06,
      transparent: true,
      opacity: colors.isDark ? 0.55 : 0.4,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse & Scroll Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // 7. Window Resize
    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 8. Theme change observer
    const observer = new MutationObserver(() => {
      colors = updateThemeColors();
      terrainMat.color.setHex(colors.wireColor);
      terrainMat.opacity = colors.isDark ? 0.35 : 0.45;
      particleMat.color.setHex(colors.particleColor);
      particleMat.opacity = colors.isDark ? 0.55 : 0.4;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // 9. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Camera parallax
      targetX = mouseX * 2.5;
      targetY = -mouseY * 2.0;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY + 5 - (scrollY * 0.005) - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Undulate the 3D terrain wave
        const pos = terrainGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = (i % (gridCols + 1)) * 0.25;
          const v = Math.floor(i / (gridCols + 1)) * 0.25;
          const wave =
            Math.sin(u + elapsed * 0.8) * 0.6 +
            Math.cos(v + elapsed * 0.6) * 0.6;
          pos.setY(i, originalY[i] + wave);
        }
        pos.needsUpdate = true;

        // Animate floating 3D objects
        shapes.forEach((s) => {
          s.mesh.rotation.x += s.rotSpeed.x;
          s.mesh.rotation.y += s.rotSpeed.y;
          s.mesh.rotation.z += s.rotSpeed.z;
          s.mesh.position.y = s.initY + Math.sin(elapsed * s.floatSpeed + s.offset) * 0.8;
        });

        // Rotate particles slowly
        particles.rotation.y = elapsed * 0.02;
        particles.rotation.x = elapsed * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      observer.disconnect();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeom.dispose();
      terrainMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
