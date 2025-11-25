import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, Home, Factory, ShieldCheck, Cpu, Phone, ArrowRight, 
  BatteryCharging, Menu, X, Lightbulb, CheckCircle2, ChevronRight,
  ClipboardCheck, HardHat, Clock, Layers, TrendingUp
} from 'lucide-react';

// Varianti di animazione per il testo
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- COMPONENTE: SVG che Traccia lo Scroll ---
const ScrollPathSVG = React.forwardRef(({ heightInViewBox = "1000", widthInViewBox = "200" }, ref) => {
  
  // Traccia lo scroll sull'elemento referenziato (passato da HeroRef)
  const { scrollYProgress } = useScroll({
    target: ref, 
    offset: ["start end", "end start"]
  });

  // Usa useSpring per ammorbidire l'animazione del tracciato
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Path per un'inclinazione:
  // Parte da X=50 e finisce a X=150.
  const pathD = `M 50 0 L 150 ${heightInViewBox}`; 

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${widthInViewBox} ${heightInViewBox}`} 
        preserveAspectRatio="xMidYMin slice" 
        className="w-full h-full"
      >
        <motion.path
          d={pathD} 
          fill="none"
          stroke="#FACC15"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
});

ScrollPathSVG.displayName = 'ScrollPathSVG';

// Logo del brand
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

// Bottone Elettrico (CTA principale)
const ElectricButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative group px-8 py-3 bg-yellow-400 text-slate-900 font-bold overflow-hidden rounded-lg shadow-xl shadow-yellow-400/30 transition-all"
    >
      {/* Effetto Shimmer/Zap su Hover */}
      <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 group-hover:animate-shimmer opacity-0 group-hover:opacity-100" />

      <span className="relative z-10 flex items-center gap-2 uppercase tracking-wider text-sm">
        {text}
        <Zap className="w-4 h-4 text-slate-900" />
      </span>
    </motion.button>
  );
};

// Barra di Navigazione Fissa e Responsiva
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
          <ElectricButton text="Preventivo Gratuito" onClick={() => setIsOpen(false)} />
        </div>
      </motion.div>
    </nav>
  );
};

// Sezione Eroe (Hero - MODIFICATO per accettare servicesRef)
const Hero = ({ servicesRef }) => {
  const [startX, setStartX] = useState(null); 
  const [startY, setStartY] = useState(null); 
  // pathHeight deve contenere la distanza in pixel dalla fine dell'icona al centro dei servizi
  const [pathHeight, setPathHeight] = useState('0px'); 
  const heroRef = useRef(null); 
  const imageRef = useRef(null); 

  useEffect(() => {
    const calculatePosition = () => {
      // Calcolo Posizione Iniziale (Icona)
      if (!imageRef.current || !heroRef.current || !servicesRef.current) {
         // Se i ref non sono ancora pronti, usciamo
         setStartX(null);
         setStartY(null);
         setPathHeight('0px');
         return;
      }

      const imageRect = imageRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const servicesRect = servicesRef.current.getBoundingClientRect();

      const centerAbsoluteX = imageRect.left + imageRect.width / 2;
      const centerRelativeXToHero = centerAbsoluteX - heroRect.left;
      
      const bottomRelativeYToHero = imageRect.bottom - heroRect.top;
      
      // Calcolo Posizione Finale (Centro ServicesGrid)
      // Calcola il centro verticale della sezione Servizi rispetto al top della Hero
      const servicesCenterAbsoluteY = servicesRect.top + servicesRect.height / 2;
      const endRelativeYToHero = servicesCenterAbsoluteY - heroRect.top;

      // Nuova altezza: dalla fine dell'icona al centro della sezione Servizi
      const newPathHeight = endRelativeYToHero - bottomRelativeYToHero;
        
      if (imageRect.width !== 0 && newPathHeight > 0) {
        setStartX(centerRelativeXToHero);
        setStartY(bottomRelativeYToHero);
        setPathHeight(`${newPathHeight}px`);
      } else {
        setStartX(null);
        setStartY(null);
        setPathHeight('0px');
      }
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);

    const timeout = setTimeout(calculatePosition, 100); 

    return () => {
      window.removeEventListener('resize', calculatePosition);
      clearTimeout(timeout);
    };
  }, [servicesRef]); // Aggiunto servicesRef come dipendenza per ricalcolare quando mounta

  // Stile dinamico per il container della scia (immutato)
  const scrollPathContainerStyle = {
    // Allinea il punto di partenza (x=50 nella viewBox 200) con il centro dell'icona
    left: startX !== null ? `${startX - 25}px` : '50%', 
    top: startY !== null ? `${startY}px` : 'auto', 
    height: pathHeight, 
    width: '100px', 
    transform: startX === null || startY === null ? 'translateX(-50%)' : 'none', 
  };


  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-slate-950 z-10">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animazione di sfondo energetica */}
        <div className="absolute top-[-20%] right-[-10%] w-[50vw] min-w-[300px] h-[50vw] min-h-[300px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] min-w-[300px] h-[60vw] min-h-[300px] bg-yellow-400/5 rounded-full blur-[80px] animate-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>

      {/* Contenuto Principale */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-12 gap-12 items-center flex-grow">
        <motion.div 
          className="lg:col-span-7 pt-12 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { 
              transition: { 
                staggerChildren: 0.2, 
                delayChildren: 0.3 
              } 
            }
          }}
        >
          <motion.div variants={textVariants} className="flex flex-wrap gap-3 mb-6">
            <ServiceTag text="PRONTO INTERVENTO H24" icon={Clock} />
            <ServiceTag text="CERTIFICAZIONE GARANTITA" icon={CheckCircle2} />
          </motion.div>
          
          <motion.h1 
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-6"
          >
            LA TUA ENERGIA
<br />
            <span
className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400
via-yellow-200 to-white">
              A NORMA.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={textVariants}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
          >
            Specialisti in progettazione, installazione e manutenzione di impianti elettrici certificati, domotici e fotovoltaici.
          </motion.p>
          
          <motion.div variants={textVariants} className="flex flex-wrap gap-4 items-center">
            <ElectricButton text="Richiedi Sopralluogo" />
            <a
              href="#servizi" 
              className="px-6 py-3 group flex items-center gap-2 font-semibold text-white border-2 border-transparent hover:border-yellow-400/50 rounded-lg transition-colors"
            >
              Scopri di più
              <ChevronRight className="w-5 h-5 text-yellow-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Icona 3D Impianto (Elemento visivo) - Con il ref per il calcolo della posizione */}
        <div
          className="lg:col-span-5 relative hidden lg:flex items-center justify-center h-full min-h-[400px]"
        >
          <motion.div 
            ref={imageRef} 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 50 }}
            className="relative w-80 h-80 flex items-center justify-center bg-slate-900 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <BatteryCharging className="w-40 h-40 text-yellow-400 opacity-20 relative z-10" />
            <Zap className="w-20 h-20 text-yellow-400 absolute drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] z-20" />
            {/* Dettagli in background */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600/30 rounded-full blur-xl" />
            <div className="absolute bottom-4 left-4 w-10 h-10 bg-yellow-400/30 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>

      {/* INTEGRAZIONE DELLA SCIA - Posizionamento dinamico e Inclinazione */}
      <div 
        className="absolute z-20 pointer-events-none overflow-hidden" 
        style={scrollPathContainerStyle}
      >
        {/* Passiamo heroRef alla ScrollPathSVG per tracciare lo scroll della Hero */}
        <ScrollPathSVG ref={heroRef} heightInViewBox={1000} widthInViewBox={200} /> 
      </div>
      
    </section>
  );
};
 
// Componente per le Tagline di Servizio
const ServiceTag = ({ text, icon: Icon }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-yellow-500/30 text-slate-200 text-xs font-bold whitespace-nowrap uppercase tracking-wider`}>
        <Icon className="w-3 h-3 text-yellow-400" />
        {text}
    </div>
);
 
// Componente Card del Servizio
const ServiceCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: delay }}
      className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-4 inline-flex rounded-full bg-yellow-400/10 text-yellow-400 mb-6">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{desc}</p>
      <a href="#contatti"
className="mt-4 inline-flex items-center text-yellow-400 font-semibold
hover:text-white transition-colors">
        Scopri
&nbsp;<ChevronRight className="w-4 h-4" />
      </a>
    </motion.div>
);
 
// Sezione Servizi (Grid Layout - MODIFICATO con forwardRef)
const ServicesGrid = React.forwardRef((props, ref) => {
    const services = [
      { icon: Home, title: "Impianti Residenziali", desc: "Sistemi domotici intelligenti, gestione carichi e quadri elettrici a norma per la massima sicurezza e comfort in casa." },
      { icon: Factory, title: "Settore Industriale", desc: "Cabine di trasformazione, power center, automazione industriale e manutenzione predittiva per la continuità operativa." },
      { icon: ShieldCheck, title: "Sicurezza & TVCC", desc: "Sistemi antintrusione connessi, videosorveglianza IP ad alta risoluzione e controlli accessi perimetrali." },
      { icon: BatteryCharging, title: "Fotovoltaico & Storage", desc: "Progettazione e installazione di impianti fotovoltaici con accumulatori per l'indipendenza energetica totale." },
      { icon: Lightbulb, title: "Illuminazione LED", desc: "Soluzioni di illuminazione ad alta efficienza e design, incluse l'illuminazione pubblica e industriale." },
      { icon: Cpu, title: "Automazione Domotica", desc: "Integrazione completa di riscaldamento, clima, sicurezza e multimedia in un unico sistema gestibile da remoto." },
    ];
 
    return (
      // Assegna il ref qui
      <section ref={ref} id="servizi" className="py-24 bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Titolo Sezione */}
              <div className="text-center max-w-4xl mx-auto mb-16">
                  <p className="text-yellow-400 uppercase font-bold text-sm mb-2">I Nostri Servizi Core</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Tecnologia, Sicurezza, Efficienza.</h2>
              </div>
 
              {/* Griglia di Card */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                      <ServiceCard key={index} {...service} delay={index * 0.15} />
                  ))}
              </div>
          </div>
      </section>
    );
});
ServicesGrid.displayName = 'ServicesGrid';
 
// Componente Vantaggio con animazione
const BenefitItem = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7, delay: delay }}
    className="flex items-start p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-lg"
  >
    <div className="p-3 mr-4 rounded-full
bg-yellow-400/10 text-yellow-400 flex-shrink-0">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{desc}</p>
    </div>
  </motion.div>
);
 
// Sezione Vantaggi (Perché Sceglierci)
const Benefits = () => {
  const benefits = [
    { icon: ClipboardCheck, title: "Certificazione Garantita", desc: "Tutti i nostri impianti sono rilasciati con dichiarazione di conformità (DiCo) secondo le normative CEI in vigore." },
    { icon: TrendingUp, title: "Efficienza Massima", desc: "Utilizziamo solo componenti ad alta efficienza per minimizzare i consumi e massimizzare il risparmio energetico." },
    { icon: Layers, title: "Soluzioni Chiavi in Mano", desc: "Dalla progettazione alla messa in opera, gestiamo ogni fase del tuo progetto senza stress per te." },
    { icon: HardHat, title: "Team Qualificato", desc: "I nostri tecnici sono costantemente aggiornati sulle ultime tecnologie e protocolli di sicurezza." },
  ];
 
  return (
    <section id="vantaggi" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenuto Testuale */}
          <div className="lg:pr-10">
            <p className="text-yellow-400 uppercase font-bold text-sm mb-2">Il Nostro Valore Aggiunto</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Scegliere Flash Impianti è Scegliere la Qualità.</h2>
            <p className="text-slate-300 text-lg mb-8">
              Non siamo solo installatori, siamo consulenti energetici. Ti aiutiamo a fare scelte informate che impattano positivamente sull'ambiente e sul tuo bilancio.
            </p>
            <ElectricButton text="Inizia la tua Trasformazione" />
          </div>
 
          {/* Lista dei Vantaggi */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index} {...benefit} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
 
 
// Sezione Contatti con Form
const Contact = () => {
  // Funzione fittizia per la sottomissione
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati inviati per il preventivo.");
    document.getElementById('contact-message').textContent = "Richiesta inviata! Sarai ricontattato a breve.";
    document.getElementById('contact-message').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('contact-message').classList.add('hidden');
    }, 4000);
  };
 
  return (
    <section id="contatti" className="py-24 bg-slate-950 relative overflow-hidden">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Accendiamo il tuo Progetto?</h2>
            <p className="text-slate-400 text-lg">Inviaci i dettagli per un preventivo gratuito e non vincolante.</p>
          </div>
          
          <motion.form 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg mx-auto p-8 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl space-y-5" 
            onSubmit={handleSubmit}
          >
            <div id="contact-message" className="hidden p-3 bg-yellow-400 text-slate-950 font-semibold rounded-lg text-center mb-4 transition-all"></div>
            <input
              type="text" placeholder="Nome Completo" required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-colors"
            />
            <input
              type="tel" placeholder="Numero di Telefono" required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-colors"
            />
            <input
              type="email" placeholder="Email (obbligatoria per DiCo)"
              required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-colors"
            />
            <textarea
              rows="4" placeholder="Descrivi la tua esigenza (tipo di impianto, ubicazione, urgenza...)"
              required className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-colors resize-none"
            ></textarea>
            
            <button
              type="submit" 
              className="w-full py-3 bg-yellow-400 text-slate-900 font-bold rounded-lg hover:bg-yellow-300 transition-all uppercase text-lg shadow-xl shadow-yellow-400/30"
            >
              Invia la Mia Richiesta
            </button>
          </motion.form>
       </div>
    </section>
  );
};
 
// Footer (Piè di Pagina)
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
 
// Componente Principale App (MODIFICATO per gestire e passare i ref)
export default function App() {
  // 1. Definisci il Ref per la sezione Servizi
  const servicesRef = useRef(null); 

  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      
      <Navbar />
      <main>
        {/* 2. Passa il ref a Hero (per calcolare la fine) */}
        <Hero servicesRef={servicesRef} />
        {/* 3. Passa il ref a ServicesGrid (per misurare la posizione) */}
        <ServicesGrid ref={servicesRef} />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
