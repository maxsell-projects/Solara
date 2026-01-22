import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.png";
import fundo from "@/assets/fundo.jpg"; 
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);

      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const logoTiltX = isHoveringLogo ? 0 : mousePosition.y * -15;
  const logoTiltY = isHoveringLogo ? 0 : mousePosition.x * 15;

  // Sombra intensa apenas para o Título e Logo
  const intenseWhiteGlow = "0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.7)";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* --- FUNDO --- */}
      <img 
        src={fundo} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center pt-20">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Logo Section */}
          <div className="flex flex-col items-center gap-8 mb-8">
            <div className="block perspective-container relative group">
              <div
                className="flex items-center justify-center transition-all duration-500 ease-out will-change-transform relative"
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
                style={{
                  transform: `perspective(1000px) rotateX(${logoTiltX}deg) rotateY(${logoTiltY}deg) scale3d(${isHoveringLogo ? 1.02 : 1}, ${isHoveringLogo ? 1.02 : 1}, 1)`,
                }}
              >
                {/* Glow Vinho */}
                <div
                  className={`absolute inset-0 bg-solara-vinho rounded-full blur-[80px] transition-all duration-500 ${isHoveringLogo ? 'opacity-25 scale-125' : 'opacity-0 scale-50'}`}
                  style={{ zIndex: -1 }}
                />

                <img
                  src={logoSolara}
                  alt="Solara Project"
                  className="h-40 md:h-56 w-auto object-contain transition-all duration-300 relative z-10"
                  style={{
                    filter: isHoveringLogo
                      ? `drop-shadow(0 0 30px rgba(92, 6, 30, 0.4))`
                      : `drop-shadow(0 0 25px rgba(255,255,255,0.8))`
                  }}
                />
              </div>
            </div>
          </div>

          {/* TÍTULO (Mantido na Hero) */}
          <div style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.2s ease-out'
          }}>
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-black tracking-tight"
              style={{ textShadow: intenseWhiteGlow }}
            >
              {t('hero.title_main')}
              <br />
              <span className="text-solara-vinho font-medium relative inline-block">
                {t('hero.title_sub')}
              </span>
            </h1>
          </div>

          {/* BOTÕES (Mantidos para navegação rápida) */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Link to="/services">
              <Button size="lg" className="rounded-full text-base bg-solara-vinho hover:bg-[#4a1223] text-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold shadow-white/50">
                {t('hero.btn_services')}
              </Button>
            </Link>

            <Link to="/vision">
              <Button size="lg" variant="outline" className="rounded-full text-base border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold bg-white/70 backdrop-blur-md">
                {t('hero.btn_vision')}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;