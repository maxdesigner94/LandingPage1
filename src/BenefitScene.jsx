// BenefitsScene.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, TrendingUp, Layers, HardHat } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Dati
const benefitsData = [
    { icon: ClipboardCheck, title: "Certificazione Garantita", desc: "Impianti rilasciati con DiCo secondo le normative CEI in vigore." },
    { icon: TrendingUp, title: "Efficienza Massima", desc: "Utilizzo di componenti ad alta efficienza per minimizzare i consumi." },
    { icon: Layers, title: "Soluzioni Chiavi in Mano", desc: "Gestione completa del progetto dalla progettazione alla messa in opera." },
    { icon: HardHat, title: "Team Qualificato", desc: "Tecnici costantemente aggiornati sulle ultime tecnologie e protocolli." },
];

// Componente Card del Vantaggio
const BenefitCard = React.forwardRef(({ icon: Icon, title, desc, delay, beamClass }, ref) => {
    const cardRef = useRef(null);

    useLayoutEffect(() => {
        // Logica GSAP per illuminazione all'arrivo del fascio
        gsap.to(cardRef.current, {
            boxShadow: '0 0 30px 5px rgba(255, 234, 0, 0.4)',
            borderColor: '#FACC15',
            duration: 0.4,
            scrollTrigger: {
                trigger: cardRef.current,
                start: "center 80%", // Si illumina quando la card è 80% visibile
                end: "center 20%",
                toggleActions: "play reverse play reverse",
                // markers: true,
            }
        });
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: delay }}
            className="flex items-start p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-lg relative"
        >
            <div className="p-3 mr-4 rounded-full bg-yellow-400/10 text-yellow-400 flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400">{desc}</p>
            </div>
            {/* Elemento fittizio per il tracciamento del fascio */}
            <div ref={ref} className={beamClass} />
        </motion.div>
    );
});
BenefitCard.displayName = 'BenefitCard';


const BenefitsScene = React.forwardRef(({ onReady }, ref) => {
    const sectionRef = useRef(null);
    const beamRefs = useRef([]);
    // Resettiamo i ref degli elementi per il fascio
    beamRefs.current = benefitsData.map((_, i) => beamRefs.current[i] ?? React.createRef());
    
    useLayoutEffect(() => {
        if (sectionRef.current) {
            // Dopo il montaggio, passa l'elenco dei ref per il tracciamento 3D
            const cardCenters = beamRefs.current.map(r => r.current);
            // Il punto di arrivo finale è l'ultima card della sezione
            onReady({ cardRefs: cardCenters, endPoint: beamRefs.current[beamRefs.current.length - 1].current });
        }
    }, [onReady]);

    return (
        <section ref={sectionRef} id="vantaggi" className="py-24 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Contenuto Testuale */}
                    <div className="lg:pr-10">
                        <p className="text-yellow-400 uppercase font-bold text-sm mb-2">Il Nostro Valore Aggiunto</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Scegliere Flash Impianti è Scegliere la Qualità.</h2>
                        <p className="text-slate-300 text-lg mb-8">
                            Non siamo solo installatori, siamo consulenti energetici.
                        </p>
                        {/* Placeholder per non interrompere il flusso */}
                    </div>
        
                    {/* Lista dei Vantaggi */}
                    <div className="space-y-6">
                        {benefitsData.map((benefit, index) => (
                            <BenefitCard 
                                key={index} 
                                {...benefit} 
                                delay={index * 0.1}
                                ref={beamRefs.current[index]} 
                                // Elemento visivo fittizio per il centro del fascio (DEBUG VISIVO)
                                beamClass="absolute w-3 h-3 rounded-full bg-red-500/0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});
BenefitsScene.displayName = 'BenefitsScene';

export default BenefitsScene;
