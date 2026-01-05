import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
// Importamos os dois logos
import logoSolara from "@/assets/logo-solara-full.png";
import logoVision from "@/assets/logo-vision.png";
import HamburgerMenu from "@/components/HamburgerMenu";

const Header = () => {
  const location = useLocation();
  // Verifica se estamos na rota /vision ou sub-rotas
  const isVisionSection = location.pathname.startsWith('/vision');
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar o scroll
  useEffect(() => {
    const handleScroll = () => {
      // Ativa o fundo se rolar mais de 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define a classe de hover baseada na secção atual
  const navLinkHoverClass = isVisionSection
    ? "hover:text-emerald-600"
    : "hover:text-solara-vinho";

  // Lógica de Links Dinâmicos
  const homeLink = isVisionSection ? "/vision" : "/";
  // Se estiver na Vision, vai para /vision/services. Se não, vai para o Hub de Serviços (/services) ou direto para /services/financial se preferir
  const servicesLink = isVisionSection ? "/vision/services" : "/services";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm py-2"
          : "bg-transparent border-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">

          {/* LÓGICA DO LOGO: Muda a imagem e o link dependendo da secção */}
          <Link to={homeLink} className="flex items-center group">
            <div className="flex items-center justify-center transition-transform group-hover:scale-105">
              {isVisionSection ? (
                // Logo Vision Press
                <img
                  src={logoVision}
                  alt="Vision Press"
                  className="h-20 md:h-28 w-auto object-contain"
                />
              ) : (
                // Logo Solara
                <img
                  src={logoSolara}
                  alt="Solara Project"
                  className="h-24 w-auto object-contain"
                />
              )}
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {/* LINK HOME DINÂMICO */}
            <Link to={homeLink} className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Home
            </Link>

            {/* LINK SERVIÇOS DINÂMICO */}
            <Link to={servicesLink} className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Serviços
            </Link>

            <Link to="/about" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Sobre
            </Link>
            <Link to="/contact" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Contacto
            </Link>

            {/* Botão de Troca de Marca (Switch) */}
            {!isVisionSection && (
              <Link to="/vision">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  Conheça a Vision Press
                </Button>
              </Link>
            )}

            {isVisionSection && (
              <Link to="/">
                <Button variant="outline" size="sm" className="rounded-full border-2 border-solara-vinho text-solara-vinho hover:bg-solara-vinho/10">
                  Voltar à Solara
                </Button>
              </Link>
            )}

            <Link to="/contact">
              <Button variant="default" size="sm" className="rounded-full bg-solara-vinho hover:bg-solara-vinho/90 text-white">
                Agende uma Reunião
              </Button>
            </Link>
          </nav>

          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;