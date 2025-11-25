// ElectricBeam.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Parametri globali (devono essere sincronizzati con i dati passati da App.jsx)
const SCENE_WIDTH = 4;
const BEAM_COLOR = 0xFFEA00; // Giallo neon

const ElectricBeam = ({ beamPath, scrollDuration, scrollTriggers }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const pathRef = useRef(null);
  const geometryRef = useRef(null);
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || !beamPath || beamPath.length < 2) return;

    // --- 1. SETUP SCENA ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Sfondo trasparente

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    // Posiziona la telecamera per guardare lungo l'asse Y (verticale)
    camera.position.set(0, 0, 5); 

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // --- 2. LUCI ---
    const ambientLight = new THREE.AmbientLight(0x404040, 5); // soft white light
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(BEAM_COLOR, 10, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // --- 3. CREAZIONE PATH 3D ---
    // Trasforma i punti 2D (x, y) del path in vettori 3D (x, y, 0)
    const points = beamPath.map(p => new THREE.Vector3(p.x, p.y, 0));
    const curve = new THREE.CatmullRomCurve3(points);
    pathRef.current = curve;

    // Crea la geometria del tubo (fascio)
    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
    geometryRef.current = tubeGeometry;

    // Materiale per l'effetto neon/elettrico
    const electricMaterial = new THREE.MeshStandardMaterial({
        color: BEAM_COLOR,
        emissive: BEAM_COLOR,
        emissiveIntensity: 3,
        transparent: true,
        opacity: 0.8,
        wireframe: true // Opzionale per effetto "energia"
    });
    materialRef.current = electricMaterial;

    const tubeMesh = new THREE.Mesh(tubeGeometry, electricMaterial);
    meshRef.current = tubeMesh;
    scene.add(tubeMesh);
    
    // Inizializza il fascio come invisibile (0,0)
    tubeGeometry.setDrawRange(0, 0);

    // --- 4. FUNZIONE DI SCROLL E ANIMAZIONE ---
    // Definiamo un oggetto GSAP per tracciare la posizione del fascio (0.0 a 1.0)
    const beamProgress = { u: 0 }; 

    // Anima beamProgress in sincronia con lo scroll
    gsap.to(beamProgress, {
        u: 1, // L'animazione completa il fascio (drawRange arriva a 1)
        ease: "none",
        scrollTrigger: {
            trigger: mountRef.current, // L'intero contenitore è il trigger
            start: "top top", // Inizia l'animazione GSAP
            end: `+=${scrollDuration}px`, // Fine basata sulla distanza totale calcolata
            scrub: true,
            onUpdate: (self) => {
                // Aggiorna il drawRange del tubo in base al progresso di scroll
                const u = beamProgress.u;
                const totalLength = tubeGeometry.parameters.path.getLength();
                const progressLength = totalLength * u;

                // Anima il fascio da 0.0 a u
                tubeGeometry.setDrawRange(0, u * tubeGeometry.parameters.path.getLength());
                tubeGeometry.attributes.position.needsUpdate = true; // Necessario per il refresh
                
                // Aggiorna la telecamera per seguire il fascio lungo il sito
                const p = curve.getPoint(u);
                camera.position.x = p.x;
                camera.position.y = p.y;
                camera.position.z = 5; 
                camera.lookAt(p.x, p.y, 0); // La telecamera guarda il punto corrente
            },
        },
    });
    
    // --- 5. RENDER LOOP E CLEANUP ---
    const animate = () => {
      requestAnimationFrame(animate);
      // Animazione di rotazione per dare dinamicità al fascio 
      tubeMesh.rotation.z += 0.005; 
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      ScrollTrigger.getAll().forEach(st => st.kill());
      scene.clear();
      geometryRef.current.dispose();
      materialRef.current.dispose();
      renderer.dispose();
    };

  }, [beamPath, scrollDuration]);

  // Il canvas deve coprire l'intera area che verrà tracciata dallo scroll
  return <div ref={mountRef} id="threejs-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-40" />;
};

export default ElectricBeam;
