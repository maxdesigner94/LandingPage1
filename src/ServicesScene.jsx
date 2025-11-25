// ServicesScene.jsx
import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Factory, ShieldCheck, Cpu, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Dati (solo 4 card)
const servicesData = [
    { icon: Home, title: "Impianti Residenziali", desc: "Sistemi domotici intelligenti e gestione carichi per la massima sicurezza e comfort in casa.", align: 'left' },
    { icon: Factory, title: "Settore Industriale", desc: "Automazione, power center e manutenzione predittiva per la continuità operativa.", align: 'right' },
    { icon: ShieldCheck, title: "Sicurezza & TVCC", desc: "Sistemi antintrusione connessi e videosorveglianza IP ad alta risoluzione.", align: 'left' },
    { icon: Cpu, title: "Automazione Domotica", desc: "Integrazione completa di riscaldamento, clima, sicurezza e multimedia.", align: 'right' },
];

// Componente Card del Servizio
const ServiceCard = React.forwardRef(({ icon: Icon, title, desc, align, className, beamClass }, ref) => {
    const cardRef = useRef(null);
    useLayoutEffect(() => {
        if (!ref) return; // Se ref è null, usiamo solo cardRef

        // Logica GSAP per illuminazione all'arrivo del fascio
        gsap.to(cardRef.current, {
            boxShadow: '0 0 40px 10px rgba(255, 234, 0, 0.6)',
            borderColor: '#FACC15',
            duration: 0.5,
            scrollTrigger: {
                trigger: cardRef.current,
                start: "center 80%", // Si illumina quando la card è 80% visibile (il fascio la raggiunge)
                end: "center 20%",
                toggleActions: "play reverse play reverse",
                // markers: true,
            }
        });
    }, [ref]);

    return (
        <div 
            ref={cardRef} 
            className={`flex flex-col p-8 rounded-xl border border-slate-800 transition-all duration-300 ${className}`}
        >
            <div className={`p-4 inline-flex rounded-full bg-yellow-400/10 text-yellow-400 mb-6 self-${align === 'left' ? 'start' : 'end'}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400">{desc}</p>
            <a href="#contatti" className="mt-4 inline-flex items-center text-yellow-400 font-semibold hover:text-white transition-colors">
                Scopri <ChevronRight className="w-4 h-4 ml-1" />
            </a>
            {/* Elemento fittizio per il tracciamento del fascio */}
            <div ref={ref} className={beamClass} />
        </div>
    );
});
ServiceCard.displayName = 'ServiceCard';

const ServicesScene = React.forwardRef(({ onReady }, ref) => {
    const sectionRef = useRef(null);
    // Ref per gli elementi che il fascio deve attraversare
    const beamRefs = useRef([]);
    // Resettiamo i ref degli elementi per il fascio
    beamRefs.current = servicesData.map((_, i) => beamRefs.current[i] ?? React.createRef());
    
    useLayoutEffect(() => {
        if (sectionRef.current) {
            // Dopo il montaggio, passa l'elenco dei ref per il tracciamento 3D
            const cardCenters = beamRefs.current.map(r => r.current);
            // Il punto di partenza del fascio è il centro dell'intera sezione
            onReady({ startPoint: sectionRef.current, cardRefs: cardCenters });
        }
    }, [onReady]);

    return (
        <section ref={sectionRef} id="servizi" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <p className="text-yellow-400 uppercase font-bold text-sm mb-2">⚡ Progetti Core</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Tecnologia, Sicurezza, Efficienza.</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {servicesData.map((service, index) => (
                        <React.Fragment key={index}>
                            {/* Logica per l'allineamento simmetrico */}
                            <div className={`flex items-center ${service.align === 'left' ? 'lg:col-span-1 lg:justify-end' : 'lg:order-2 lg:col-span-1 lg:justify-start'}`}>
                                <ServiceCard 
                                    icon={service.icon} 
                                    title={service.title} 
                                    desc={service.desc} 
                                    align={service.align}
                                    className={`w-full max-w-md ${service.align === 'left' ? 'bg-slate-900 shadow-xl' : 'bg-slate-900/50 shadow-lg'}`}
                                    // Passiamo il ref specifico per il tracciamento
                                    ref={beamRefs.current[index]}
                                    // Elemento visivo fittizio per il centro del fascio (DEBUG VISIVO)
                                    beamClass="absolute w-4 h-4 rounded-full bg-red-500/0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
                                />
                            </div>
                            <div className={`hidden lg:block ${service.align === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
                                <div className={`h-full flex items-center ${service.align === 'left' ? 'justify-start' : 'justify-end'}`}>
                                    <p className="text-lg text-slate-400 max-w-xs p-4 border-l-4 border-yellow-400/50">
                                        {/* Testo descrittivo opposto */}
                                        {service.desc.substring(0, 50)}...
                                    </p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
});
ServicesScene.displayName = 'ServicesScene';

export default ServicesScene;
