import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion } from 'framer-motion'; 
// Rimosse le importazioni problematiche di GSAP. Si assume che 'gsap' e 'ScrollTrigger' siano disponibili globalmente (es. tramite CDN).
// Se il codice non funziona, assicurati che i tag <script> di GSAP e ScrollTrigger siano caricati nell'HTML.
import { Zap, Menu, X, BatteryCharging, Clock, CheckCircle2 } from 'lucide-react';

// Registra il plugin GSAP (assume che 'gsap' e 'ScrollTrigger' siano definiti a livello globale)
// Nota: Aggiunto un controllo per prevenire ReferenceError se le librerie non sono caricate.
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}


// --- PLACEHOLDER COMPONENTS (Definiti qui per compilazione a file singolo) ---
// Questi componenti simulano il comportamento di ElectricBeam, ServicesScene e BenefitsScene,
// in attesa che tu li implementi in dettaglio.

const ElectricBeam = ({ beamPath, scrollDuration }) => {
    // In un ambiente reale, questo componente gestisce il canvas Three.js.
    // Qui è un placeholder visibile (ma pointer-events-none) per dimostrare l'interazione.
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500/30 text-xs font-mono">
                CANVAS 3D: {beamPath.length} PUNTI MAPPATI
            </div>
        </div>
    );
};

// Hook per simulare la creazione e la restituzione dei riferimenti DOM necessari alla App principale
const usePlaceholderRefs = (onReady, numCards = 3) => {
    const startPointRef = useRef(null);
    const endPointRef = useRef(null);
    // Crea ref per un array di elementi (le card)
    const cardRefs = useRef(Array(numCards).fill(null).map(() => React.createRef()));

    useLayoutEffect(() => {
        // Al completamento del rendering (dove i ref del DOM dovrebbero essere pronti)
        // chiamiamo onReady per passare i riferimenti richiesti al componente App.
        const mockRefs = {
            startPoint: startPointRef.current,
            endPoint: endPointRef.current,
            // Passiamo i riferimenti DOM effettivi delle card (o null se non ancora montati)
            cardRefs: cardRefs.current.map(r => r.current).filter(r => r !== null),
        };

        if (onReady) {
            onReady(mockRefs);
        }
    }, [onReady]);

    return { startPointRef, endPointRef, cardRefs };
};

const ServicesScene = ({ onReady }) => {
    // 3 card per i servizi
    const { startPointRef, cardRefs } = usePlaceholderRefs(onReady, 3);
    
    return (
        <section id="servizi" className="py-20 bg-slate-900 relative">
            {/* Punto di inizio del fascio elettrico (al centro della sezione) */}
            <div ref={startPointRef} className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-yellow-400/20 border-2 border-yellow-400 pointer-events-none" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-4xl font-bold text-center text-white mb-12">I Nostri Servizi</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} ref={cardRefs.current[i]} className="p-6 bg-slate-800/50 rounded-xl border border-yellow-400/20 shadow-2xl text-center backdrop-blur-sm transition-all hover:bg-slate-700/50 hover:shadow-yellow-400/10">
                            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white">Progettazione Impianti {i + 1}</h3>
                            <p className="text-slate-400 mt-2">Soluzioni su misura per ogni esigenza, garantendo sicurezza e conformità normativa.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const BenefitsScene = ({ onReady }) => {
    // 3 card per i vantaggi
    const { cardRefs, endPointRef } = usePlaceholderRefs(onReady, 3);
    
    return (
        <section id="vantaggi" className="py-20 bg-slate-950 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-4xl font-bold text-center text-white mb-12">Perché Sceglierci</h2>
                <div className="grid md:grid-cols-3 gap-8">
                     {Array(3).fill(0).map((_, i) => (
                        <div key={i} ref={cardRefs.current[i]} className="p-6 bg-slate-800/50 rounded-xl border border-yellow-400/20 shadow-2xl text-center backdrop-blur-sm transition-all hover:bg-slate-700/50 hover:shadow-yellow-400/10">
                            <CheckCircle2 className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white">Qualità Garantita {i + 1}</h3>
                            <p className="text-slate-400 mt-2">Usiamo solo materiali certificati per assicurare la massima durata e affidabilità.</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Punto di fine del fascio elettrico (verso il basso della sezione) */}
             <div ref={endPointRef} className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-yellow-400/20 border-2 border-yellow-400 pointer-events-none" />
        </section>
    );
};

// --- COMPONENTI UI GENERALI ---

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

// Componente Bottone con effetto Elettrico
const ElectricButton = ({ text, className = "" }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`relative group px-8 py-3 bg-yellow-400 text-slate-900 font-bold overflow-hidden rounded-lg shadow-xl shadow-yellow-400/30 transition-all ${className}`}
    >
        <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
            {text}
            <Zap className="w-4 h-4 text-slate-900" />
        </span>
    </motion.button>
);


// Componente Navbar (Corretto per includere ElectricButton)
const Navbar = () => {
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
            {/* INSERIMENTO: Bottone per desktop */}
            <ElectricButton text="Preventivo Gratuito" />
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
            <div className="pt-2">
                 {/* INSERIMENTO: Bottone per mobile */}
                 <ElectricButton text="Preventivo Gratuito" className="w-full justify-center"/>
            </div>
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

// Componente Contatti (Corretto per includere ElectricButton)
const Contact = () => (
    <section id="contatti" className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contattaci: Il Fascio Si Ferma Qui.</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
                La tua richiesta è il prossimo passo.
            </p>
             <div className="mt-8">
                <ElectricButton text="Richiedi Preventivo" />
            </div>
        </div>
    </section>
);

// Componente Footer (Corretto)
const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-10 border-t border-white/10">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col gap-2 items-center md:items-start">
        <Logo />
        <p className="text-xs mt-2 text-slate-600">P.IVA 01234567890 | Via dell'Energia, 1 - 00100 Roma (RM)</p>
        <p className="text-xs text-slate-400">© 2024 FlashImpianti. Tutti i diritti riservati.</p>
      </div>
      <div className="flex gap-4 text-sm font-medium">
        <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Termini di Servizio</a>
      </div>
    </div>
  </footer>
);


// --- COMPONENTE PRINCIPALE (ORCHESTRATORE) ---
export default function App() {
    // Stato per i dati del percorso 3D (punti X, Y, Z e durata scroll)
    const [pathData, setPathData] = useState({ beamPath: [], scrollDuration: 0 });
    // Ref per memorizzare i riferimenti DOM dai componenti ServicesScene e BenefitsScene
    const servicesDataRef = useRef({});
    const benefitsDataRef = useRef({});
    
    // Callback per raccogliere i dati dai componenti figlio (Servizi)
    const handleServicesReady = useCallback((data) => {
        servicesDataRef.current = data;
        // Se i dati di Benefits sono già pronti, calcola il percorso
        if (benefitsDataRef.current.endPoint) {
            calculateBeamPath();
        }
    }, []);

    // Callback per raccogliere i dati dai componenti figlio (Vantaggi)
    const handleBenefitsReady = useCallback((data) => {
        benefitsDataRef.current = data;
        // Se i dati di Services sono già pronti, calcola il percorso
        if (servicesDataRef.current.startPoint) {
            calculateBeamPath();
        }
    }, []);


    // Funzione principale per calcolare il percorso 3D
    const calculateBeamPath = () => {
        // Aggiungiamo un piccolo ritardo per assicurarci che tutti i riferimenti DOM siano pronti
        setTimeout(() => {
            const { startPoint, cardRefs: serviceCardRefs } = servicesDataRef.current;
            const { cardRefs: benefitCardRefs, endPoint } = benefitsDataRef.current;
            
            if (!startPoint || !serviceCardRefs || !endPoint) return;

            // --- 1. Mappatura dei Punti in Coordinate Schermo/Three.js ---
            const viewportHeight = window.innerHeight;
            // Ordine dei riferimenti: Inizio Servizi -> Card Servizi -> Card Vantaggi -> Fine Vantaggi
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
                    
                    // Coordinate per Three.js (Normalizzate per frustum [-2, 2])
                    const threeX = (centerX / window.innerWidth) * 4 - 2; 
                    // Y invertita per Three.js
                    const threeY = -((centerY / viewportHeight) * 4 - 2); 
                    
                    pathPoints.push({ x: threeX, y: threeY, z: 0 });

                    // Calcolo della distanza totale di scroll (dal centro del primo elemento)
                    const absoluteY = rect.top + window.scrollY;
                    if (index === 0) {
                        minScrollY = absoluteY - viewportHeight / 2; 
                    }
                    if (index === targetRefs.length - 1) {
                        maxScrollY = absoluteY - viewportHeight / 2; 
                    }
                }
            });
            
            // --- 2. Aggiornamento dello Stato ---
            const totalDuration = maxScrollY - minScrollY;

            if (totalDuration > 0 && pathPoints.length > 1) {
                 setPathData({ 
                    beamPath: pathPoints, 
                    scrollDuration: totalDuration 
                });
            }
            
            // Rinfresca GSAP dopo il calcolo - aggiunto controllo di esistenza
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }

        }, 100); 
    };

    // Ricalcola al resize e avvia la logica (dopo il mount)
    useLayoutEffect(() => {
        // Avvia il calcolo (importante che i dati siano stati ricevuti dai figli)
        calculateBeamPath(); 

        window.addEventListener('resize', calculateBeamPath);
        return () => window.removeEventListener('resize', calculateBeamPath);
    }, []);


    return (
        <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-yellow-400 selection:text-black overflow-x-hidden">
            
            {/* Il canvas Three.js (ElectricBeam) viene reso solo se il percorso è stato calcolato */}
            {pathData.beamPath.length > 1 && (
                <ElectricBeam 
                    beamPath={pathData.beamPath} 
                    scrollDuration={pathData.scrollDuration} 
                />
            )}
            
            <Navbar />
            <main>
                <Hero />
                {/* La ServicesScene passa i riferimenti dei punti iniziali al componente App */}
                <ServicesScene onReady={handleServicesReady} />
                <div style={{ height: '5vh' }} className="bg-slate-900" /> 
                {/* La BenefitsScene passa i riferimenti dei punti intermedi e finali al componente App */}
                <BenefitsScene onReady={handleBenefitsReady} />
                <div style={{ height: '5vh' }} className="bg-slate-950" />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
