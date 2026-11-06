import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Setup Scene, Camera & Renderer
    let renderer: THREE.WebGLRenderer;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 24);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 2. High-contrast theme colors
    const updateThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark');
      // Gentle fog so objects remain crisp and clearly visible
      scene.fog = new THREE.Fog(isDark ? 0x111112 : 0xFAF9F6, 18, 55);
      return {
        isDark,
        accentColor: isDark ? 0xE8613A : 0xC84B26,
        wireColor: isDark ? 0x52525B : 0x9E9D95, // High contrast visible lines
        faceColor: isDark ? 0x1C1C20 : 0xEAE8E1,
        pointColor: isDark ? 0xFF7043 : 0xC84B26,
        particleColor: isDark ? 0xE8613A : 0xBA421E,
      };
    };

    let colors = updateThemeColors();

    // 3. Lighting for 3D Shading
    const ambientLight = new THREE.AmbientLight(0xffffff, colors.isDark ? 0.9 : 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(colors.accentColor, 2.0);
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    // 4. Large 3D Wave Wireframe Terrain Grid (Floor / Horizon)
    const gridCols = 45;
    const gridRows = 45;
    const terrainGeom = new THREE.PlaneGeometry(75, 75, gridCols, gridRows);
    terrainGeom.rotateX(-Math.PI / 2.2);
    terrainGeom.translate(0, -7, -2);

    const posAttr = terrainGeom.attributes.position;
    const originalY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalY[i] = posAttr.getY(i);
    }

    const terrainMat = new THREE.MeshBasicMaterial({
      color: colors.wireColor,
      wireframe: true,
      transparent: true,
      opacity: colors.isDark ? 0.45 : 0.55,
    });
    const terrainMesh = new THREE.Mesh(terrainGeom, terrainMat);
    scene.add(terrainMesh);

    // 5. Floating 3D Polyhedra with Solid Shaded Facets & Wireframe Edges
    const floatGroup = new THREE.Group();
    scene.add(floatGroup);

    const shapes: {
      mesh: THREE.Group;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      initY: number;
      offset: number;
    }[] = [];

    const numObjects = 12;
    for (let i = 0; i < numObjects; i++) {
      const group = new THREE.Group();
      const geomType = i % 3;

      let geom: THREE.BufferGeometry;
      if (geomType === 0) {
        geom = new THREE.IcosahedronGeometry(1.6 + (i % 3) * 0.4, 0);
      } else if (geomType === 1) {
        geom = new THREE.OctahedronGeometry(1.4 + (i % 2) * 0.5, 0);
      } else {
        geom = new THREE.DodecahedronGeometry(1.5, 0);
      }

      // 1. Shaded solid facet mesh (catches directional light for realistic 3D appearance)
      const solidMat = new THREE.MeshStandardMaterial({
        color: colors.faceColor,
        roughness: 0.3,
        metalness: 0.7,
        flatShading: true,
        transparent: true,
        opacity: colors.isDark ? 0.75 : 0.85,
      });
      const solidMesh = new THREE.Mesh(geom, solidMat);
      group.add(solidMesh);

      // 2. High-contrast wireframe outer lines
      const wireMat = new THREE.MeshBasicMaterial({
        color: colors.wireColor,
        wireframe: true,
        transparent: true,
        opacity: colors.isDark ? 0.7 : 0.8,
      });
      const wire = new THREE.Mesh(geom, wireMat);
      group.add(wire);

      // 3. Glowing vertex points
      const ptsMat = new THREE.PointsMaterial({
        color: colors.pointColor,
        size: 0.14,
      });
      const pts = new THREE.Points(geom, ptsMat);
      group.add(pts);

      // Position in wide 3D space
      const spreadX = 38;
      const spreadY = 22;
      const spreadZ = 24;

      group.position.set(
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY + 1,
        (Math.random() - 0.5) * spreadZ - 2
      );

      floatGroup.add(group);
      shapes.push({
        mesh: group,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.018,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: 0.7 + Math.random() * 0.8,
        initY: group.position.y,
        offset: Math.random() * Math.PI * 2,
      });
    }

    // 6. Prominent 3D Particle Constellation
    const particleCount = 220;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 55;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particleGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: colors.particleColor,
      size: 0.12,
      transparent: true,
      opacity: colors.isDark ? 0.7 : 0.55,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 7. Mouse & Scroll Parallax
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

    // 8. Window Resize Handling
    const onResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 9. Theme Mutation Observer
    const observer = new MutationObserver(() => {
      colors = updateThemeColors();
      terrainMat.color.setHex(colors.wireColor);
      terrainMat.opacity = colors.isDark ? 0.45 : 0.55;
      particleMat.color.setHex(colors.particleColor);
      particleMat.opacity = colors.isDark ? 0.7 : 0.55;
      dirLight1.color.setHex(colors.accentColor);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Camera parallax responsiveness
      targetX = mouseX * 3.5;
      targetY = -mouseY * 2.8;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY + 4 - (scrollY * 0.008) - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        // Continuous 3D wave undulation
        const pos = terrainGeom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = (i % (gridCols + 1)) * 0.3;
          const v = Math.floor(i / (gridCols + 1)) * 0.3;
          const wave =
            Math.sin(u + elapsed * 1.1) * 0.8 +
            Math.cos(v + elapsed * 0.9) * 0.8;
          pos.setY(i, originalY[i] + wave);
        }
        pos.needsUpdate = true;

        // Animate floating 3D polyhedra
        shapes.forEach((s) => {
          s.mesh.rotation.x += s.rotSpeed.x;
          s.mesh.rotation.y += s.rotSpeed.y;
          s.mesh.rotation.z += s.rotSpeed.z;
          s.mesh.position.y = s.initY + Math.sin(elapsed * s.floatSpeed + s.offset) * 1.1;
        });

        // Rotate particles
        particles.rotation.y = elapsed * 0.03;
        particles.rotation.x = elapsed * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
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

  if (!webGLSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    />
  );
};
