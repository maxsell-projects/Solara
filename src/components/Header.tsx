import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.jpg";
import HamburgerMenu from "@/components/HamburgerMenu";

const Header = () => {
  const location = useLocation();
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
    ? "hover:text-vision-green" 
    : "hover:text-solara-vinho";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm py-2" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          <Link to="/" className="flex items-center group">
            {/* O container do logo pode encolher levemente no scroll se quiser, 
                aqui mantive a lógica original mas adicionei shadow condicional */}
            <div className={`h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-solara-vinho p-1.5 bg-white overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 ${!isScrolled ? "shadow-lg" : ""}`}>
              <img 
                src={logoSolara} 
                alt="Solara Project" 
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Home
            </Link>
            <Link to="/services" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Serviços
            </Link>
            <Link to="/about" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Sobre
            </Link>
            <Link to="/contact" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              Contacto
            </Link>
            {!isVisionSection && (
              <Link to="/vision">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-2 border-vision-green text-vision-green hover:bg-vision-light/20 hover:text-vision-green transition-colors"
                >
                  Conheça a Vision Press
                </Button>
              </Link>
            )}
            {isVisionSection && (
              <Link to="/">
                <Button variant="outline" size="sm" className="border-2 border-solara-vinho text-solara-vinho hover:bg-solara-vinho/10">
                  Voltar à Solara
                </Button>
              </Link>
            )}
            <Link to="/contact">
              <Button variant="default" size="sm" className="bg-solara-vinho hover:bg-solara-vinho/90">
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