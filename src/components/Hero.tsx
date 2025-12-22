import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoVision from "@/assets/logo-vision.png";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ 
    x: 0, 
    y: 0,
    pixelX: 0, // Posição exata em pixels para o spotlight
    pixelY: 0
  });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      
      // Coordenadas normalizadas (-1 a 1) para rotações
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);

      // Coordenadas exatas para o feixe de luz (Spotlight)
      const pixelX = event.clientX;
      const pixelY = event.clientY;

      requestAnimationFrame(() => {
        setMousePosition({ x, y, pixelX, pixelY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- CÁLCULOS DE FÍSICA PARA OS PRISMAS ---
  
  // Movimento base
  const moveX = mousePosition.x * 30; 
  const moveY = mousePosition.y * 30;

  // Rotação dinâmica: Os prismas giram levemente para "olhar" para o mouse
  const rotateDynamic = mousePosition.x * 5; // +/- 5 graus
  
  // Skew (Inclinação): Dá a sensação de elasticidade/vidro
  const skewDynamic = mousePosition.y * 2; 

  // Tilt da logo (mantido)
  const logoTiltX = isHoveringLogo ? 0 : mousePosition.y * -25;
  const logoTiltY = isHoveringLogo ? 0 : mousePosition.x * 25;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f8f8] perspective-1000"
    >
      {/* --- CAMADA DE FUNDO INTERATIVA --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. TEXTURA DE GRÃO (NOISE) - Sempre presente para elegância */}
        <div className="absolute inset-0 opacity-[0.04] z-10 mix-blend-multiply" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
             }} 
        />

        {/* 2. SPOTLIGHT (HOLOFOTE) - Segue o mouse */}
        {/* Esta camada cria uma luz branca suave onde o mouse passa, revelando mais cores */}
        <div 
          className="absolute inset-0 z-20 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.pixelX}px ${mousePosition.pixelY}px, rgba(255,255,255,0.8), transparent 40%)`
          }}
        />

        {/* 3. FEIXES DE LUZ (PRISMAS) COM REAÇÃO FÍSICA */}
        
        {/* Feixe Vinho (Esquerda) */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[140vh] bg-gradient-to-br from-solara-vinho via-[#701c35] to-transparent opacity-20 blur-[50px]"
          style={{
            // Aqui combinamos movimento, rotação e inclinação (skew) baseados no mouse
            transform: `translate(${moveX * -1.5}px, ${moveY * -1.5}px) rotate(${-15 + rotateDynamic}deg) skewX(${skewDynamic}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Feixe Verde (Direita) */}
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[120vh] bg-gradient-to-tl from-vision-green via-[#5e8c61] to-transparent opacity-25 blur-[50px]"
          style={{
            transform: `translate(${moveX * 1.5}px, ${moveY * 1.5}px) rotate(${15 + rotateDynamic}deg) skewY(${skewDynamic * -1}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {/* Feixe Dourado (Luz Central) - Reage mais rápido */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-400/10 rounded-full blur-[100px] mix-blend-multiply"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px) scale(${1 + Math.abs(mousePosition.x * 0.1)})`,
            transition: 'transform 0.15s ease-out'
          }}
        />

      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center pt-32">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-4 opacity-100">
              <div className="h-[2px] w-12 bg-vision-green/50"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-vision-green font-bold">em parceria com</span>
              <div className="h-[2px] w-12 bg-vision-green/50"></div>
            </div>

            <Link to="/vision" className="block perspective-container relative group">
              <div 
                className="flex items-center justify-center transition-all duration-300 ease-out will-change-transform relative"
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
                style={{
                  transform: `perspective(1000px) rotateX(${logoTiltX}deg) rotateY(${logoTiltY}deg) scale3d(${isHoveringLogo ? 1.05 : 1}, ${isHoveringLogo ? 1.05 : 1}, 1)`,
                }}
              >
                {/* Glow interativo da logo */}
                <div 
                  className={`absolute inset-0 bg-[#8FB390] rounded-full blur-[60px] transition-all duration-500 ${isHoveringLogo ? 'opacity-40 scale-110' : 'opacity-0 scale-90'}`}
                  style={{ zIndex: -1 }}
                />

                <img 
                  src={logoVision} 
                  alt="Vision Press" 
                  className="h-64 w-auto object-contain transition-all duration-300 relative z-10"
                  style={{
                    filter: isHoveringLogo 
                      ? `drop-shadow(0 15px 35px rgba(143, 179, 144, 0.3))` 
                      : `drop-shadow(${mousePosition.x * -15}px ${mousePosition.y * 15}px 20px rgba(0,0,0,0.1))`
                  }}
                />
              </div>
            </Link>
          </div>
          
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold animate-fade-in">
            ESTD 2025
          </p>
          
          {/* TÍTULO MAGNÉTICO - Segue levemente o mouse */}
          <div style={{
             transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
             transition: 'transform 0.1s ease-out'
          }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-foreground tracking-tight">
              Strategic Investment
              <br />
              <span className="text-solara-vinho font-medium relative inline-block">
                Conscious Growth
              </span>
            </h1>
          </div>
          
          <p className="text-lg md:text-xl font-normal text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Solara Project delivers tailored investment solutions and strategic consultancy, 
            combining financial expertise with authentic vision for sustainable prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Button size="lg" className="text-base bg-solara-vinho hover:bg-[#4a1223] text-white border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 px-8 py-6 rounded-none uppercase tracking-widest text-xs font-bold">
              Explore Services
            </Button>
            <Link to="/vision">
              <Button size="lg" variant="outline" className="text-base border border-vision-green text-vision-green hover:bg-vision-green/5 hover:text-vision-green shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 px-8 py-6 rounded-none uppercase tracking-widest text-xs font-bold">
                Discover Vision Press
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;