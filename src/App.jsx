// App.jsx
import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Menu, X, Clock, CheckCircle2, BatteryCharging } from 'lucide-react';

// Importazione dei nuovi moduli
import ElectricBeam from './ElectricBeam';
import ServicesScene from './ServicesScene';
import BenefitsScene from './BenefitsScene';

gsap.registerPlugin(ScrollTrigger);

// Componente Logo
const Logo = () => (
  <a href="#" className="flex items-center gap-2 group cursor-pointer select-none z-50 relative">
    <div className="relative w-10 h-10 flex items-center justify-center bg-yellow-500/10 rounded-lg border border-yellow-500/20 group-hover:border-yellow-400/50 transition-colors">
      <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400/20 group-hover:fill-yellow-400 transition-all duration-300" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-black text-xl text-white tracking-tighter">FLASH</span>
      <span className="font-bold text-xs text-yellow-400 tracking-[0.2em] uppercase">Impianti</span>
    </div>
  </a>
);

// Componente Navbar (omesso per brevità, usa la versione precedente)
const Navbar = () => { /* ... Logica Navbar ... */ 
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Servizi', href: '#servizi' },
        { name: 'Vantaggi', href: '#vantaggi' },
        { name: 'Contatti', href: '#contatti' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-slate-950/95 backdrop-blur-lg border-b border-white/5 shadow-2xl' : 'py-6 bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Logo />
            
            {/* Navigazione Desktop */}
            <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition-colors relative group"
                >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </a>
            ))}
            {/* Bottone ElectricButton omesso per brevità ma era qui */}
            </div>

            {/* Toggle Mobile */}
            <button
            className="md:hidden text-white p-2 focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle Menu"
            >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Menu Mobile */}
        <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 shadow-lg overflow-hidden"
        >
            <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
                <a
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-white hover:text-yellow-400 border-b border-slate-800/50 pb-2" 
                onClick={() => setIsOpen(false)}
                >
                {link.name}
                </a>
            ))}
            {/* Bottone ElectricButton omesso per brevità ma era qui */}
            </div>
        </motion.div>
        </nav>
    );
};
const Hero = () => (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-white">
                    FLASH
                </span> Energia
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10">
                L'impiantistica che si illumina con lo scroll. Scorri per accendere la linea elettrica!
            </p>
            <div className="inline-flex items-center gap-3">
                <div className="p-2 inline-flex rounded-full bg-yellow-400/10 text-yellow-400">
                    <BatteryCharging className="w-6 h-6" />
                </div>
                <div className="p-2 inline-flex rounded-full bg-yellow-400/10 text-yellow-400">
                    <Zap className="w-6 h-6" />
                </div>
            </div>
        </div>
        <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
    </section>
);

// Componente Contatti (Omesso il form per brevità)
const Contact = () => (
    <section id="contatti" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contattaci: Il Fascio Si Ferma Qui.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
                La tua richiesta è il prossimo passo.
            </p>
            {/* ... Form ... */}
        </div>
    </section>
);

// Componente Principale App
export default function App() {
    const [pathData, setPathData] = useState({ beamPath: [], scrollDuration: 0 });
    const servicesDataRef = useRef({});
    const benefitsDataRef = useRef({});
    
    // Callback per raccogliere i dati dai componenti figlio (Servizi e Vantaggi)
    const handleServicesReady = useCallback((data) => {
        servicesDataRef.current = data;
        // Trigger il calcolo finale solo dopo che entrambi i componenti hanno reso i dati
        if (benefitsDataRef.current.endPoint) {
            calculateBeamPath();
        }
    }, []);

    const handleBenefitsReady = useCallback((data) => {
        benefitsDataRef.current = data;
        // Trigger il calcolo finale solo dopo che entrambi i componenti hanno reso i dati
        if (servicesDataRef.current.startPoint) {
            calculateBeamPath();
        }
    }, []);


    // Funzione principale per calcolare il percorso 3D
    const calculateBeamPath = () => {
        const { startPoint, cardRefs: serviceCardRefs } = servicesDataRef.current;
        const { cardRefs: benefitCardRefs, endPoint } = benefitsDataRef.current;
        
        if (!startPoint || !serviceCardRefs || !endPoint) return;

        // --- 1. Mappatura dei Punti in Coordinate Schermo/Three.js ---
        // Le coordinate Y sono invertite in Three.js rispetto al DOM.
        const viewportHeight = window.innerHeight;
        const targetRefs = [
            startPoint, 
            ...serviceCardRefs, 
            ...benefitCardRefs, 
            endPoint
        ];

        let pathPoints = [];
        let minScrollY = window.scrollY; // Punto di scroll dove inizia il tracciamento
        let maxScrollY = 0;

        targetRefs.forEach((ref, index) => {
            if (ref && ref.getBoundingClientRect) {
                const rect = ref.getBoundingClientRect();
                
                // Centro dell'elemento nel viewport
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Coordinate per Three.js (Normalizzate per un View frustum gestibile)
                const threeX = (centerX / window.innerWidth) * 4 - 2; // Mappa da [0, W] a [-2, 2]
                // Y invertita per Three.js: Mappa da [H, 0] a [-2, 2]
                const threeY = -((centerY / viewportHeight) * 4 - 2); 
                
                pathPoints.push({ x: threeX, y: threeY, z: 0 });

                // Calcolo della distanza totale di scroll (dal centro del primo elemento)
                const absoluteY = rect.top + window.scrollY;
                if (index === 0) {
                    minScrollY = absoluteY - viewportHeight / 2; // Inizio quando il centro è nel viewport
                }
                if (index === targetRefs.length - 1) {
                    maxScrollY = absoluteY - viewportHeight / 2; // Fine quando il centro è nel viewport
                }
            }
        });
        
        // --- 2. Aggiornamento dello Stato ---
        const totalDuration = maxScrollY - minScrollY;

        // Garantisce che il tracciamento GSAP inizi al punto corretto
        if (totalDuration > 0 && pathPoints.length > 1) {
             setPathData({ 
                beamPath: pathPoints, 
                scrollDuration: totalDuration 
            });
        }
        
        // Rinfresca GSAP dopo il calcolo
        ScrollTrigger.refresh();
    };

    // Ricalcola al mount e al resize
    useLayoutEffect(() => {
        window.addEventListener('resize', calculateBeamPath);
        return () => window.removeEventListener('resize', calculateBeamPath);
    }, []);


    return (
        <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-yellow-400 selection:text-black overflow-x-hidden">
            
            {/* Il canvas Three.js deve stare sopra tutto ma non bloccare gli eventi */}
            {pathData.beamPath.length > 1 && (
                <ElectricBeam 
                    beamPath={pathData.beamPath} 
                    scrollDuration={pathData.scrollDuration} 
                />
            )}
            
            <Navbar />
            <main>
                <Hero />
                <ServicesScene onReady={handleServicesReady} />
                <div style={{ height: '5vh' }} className="bg-slate-900" /> {/* Spaziatore visivo */}
                <BenefitsScene onReady={handleBenefitsReady} />
                <div style={{ height: '5vh' }} className="bg-slate-950" /> {/* Spaziatore visivo */}
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
