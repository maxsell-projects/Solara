import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.png";
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-start justify-center overflow-hidden perspective-1000 pt-32"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center">
        <div className="max-w-5xl mx-auto space-y-2">

          {/* Logo Section - AUMENTADA E MAIS ALTA */}
          <div className="flex flex-col items-center gap-8">
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
                  className="h-64 md:h-80 lg:h-96 w-auto object-contain transition-all duration-300 relative z-10"
                  style={{
                    filter: isHoveringLogo
                      ? `drop-shadow(0 0 30px rgba(92, 6, 30, 0.4))`
                      : `drop-shadow(0 0 25px rgba(255,255,255,0.8))`
                  }}
                />
              </div>
            </div>
          </div>

          {/* ESTD */}
          <p className="text-xs uppercase tracking-[0.3em] text-solara-vinho font-bold">
            {t('hero.estd')}
          </p>

          {/* BOTÕES - MAIS PRÓXIMOS M E FINOS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-0">
            <Link to="/services">
              <Button
                size="sm"
                className="rounded-full text-xs bg-white text-solara-vinho border-2 border-solara-vinho hover:bg-solara-vinho hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-3 uppercase tracking-widest font-bold"
              >
                {t('hero.btn_services')}
              </Button>
            </Link>

            <Link to="/vision">
              <Button
                size="sm"
                className="rounded-full text-xs bg-white text-emerald-800 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-3 uppercase tracking-widest font-bold"
              >
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