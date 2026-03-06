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
      className="relative min-h-[142vh] flex items-start justify-center overflow-hidden perspective-1000 pt-10 md:pt-12 pb-24"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center">
        <div className="max-w-5xl mx-auto space-y-2">

          {/* Logo Section - AUMENTADA E MAIS ALTA */}
          <div className="flex flex-col items-center gap-4">
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
                  className="h-56 md:h-72 lg:h-80 w-auto object-contain transition-all duration-300 relative z-10"
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
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-solara-vinho font-bold -mt-2">
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

      {/* Torn Paper Effect at the bottom */}
      <div className="absolute bottom-0 w-full left-0 z-40 overflow-hidden leading-none transform translate-y-[1px]">
        <svg
          className="w-[calc(100%+1.3px)] h-[30px] md:h-[50px] lg:h-[70px] block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="#fafafa" /* Assuming the next section is neutral-50 from LatestProperties */
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;