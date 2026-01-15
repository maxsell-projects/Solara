import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.png";
import { useTranslation } from "react-i18next";
import { HeroBackground } from "@/components/HeroBackground"; // <--- Import do Background Animado

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white perspective-1000"
    >
      {/* --- FUNDO ANIMADO (HeroBackground) --- */}
      {/* Substitui os divs estáticos anteriores. Configurado para SOLARA. */}
      <HeroBackground brand="solara" />

      <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center pt-20">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Logo Section Principal: SOLARA */}
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
                {/* EFEITO GLOW (BRILHO VINHO) NO HOVER */}
                <div
                  className={`absolute inset-0 bg-solara-vinho rounded-full blur-[80px] transition-all duration-500 ${isHoveringLogo ? 'opacity-25 scale-125' : 'opacity-0 scale-50'}`}
                  style={{ zIndex: -1 }}
                />

                {/* Logo Solara */}
                <img
                  src={logoSolara}
                  alt="Solara Project"
                  className="h-40 md:h-56 w-auto object-contain transition-all duration-300 relative z-10"
                  style={{
                    // Drop shadow Vinho RGB(92, 6, 30)
                    filter: isHoveringLogo
                      ? `drop-shadow(0 0 30px rgba(92, 6, 30, 0.4))`
                      : `drop-shadow(${mousePosition.x * -10}px ${mousePosition.y * 10}px 15px rgba(0,0,0,0.05))`
                  }}
                />
              </div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold animate-fade-in">
            {t('hero.estd')}
          </p>

          {/* TÍTULO */}
          <div style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.2s ease-out'
          }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-neutral-900 tracking-tight">
              {t('hero.title_main')}
              <br />
              <span className="text-solara-vinho font-medium relative inline-block">
                {t('hero.title_sub')}
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl font-light text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* BOTÕES */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Link to="/services">
              <Button size="lg" className="rounded-full text-base bg-solara-vinho hover:bg-[#4a1223] text-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold">
                {t('hero.btn_services')}
              </Button>
            </Link>

            <Link to="/vision">
              <Button size="lg" variant="outline" className="rounded-full text-base border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold">
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