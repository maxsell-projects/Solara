import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
// Importamos os dois logos
import logoSolara from "@/assets/logo-solara-full.png";
import logoVision from "@/assets/logo-vision.png";
import HamburgerMenu from "@/components/HamburgerMenu";
// Novos Imports para Tradução
import LanguageSwitcher from "@/components/LanguageSwitcher"; 
import { useTranslation } from "react-i18next"; 

const Header = () => {
  const { t } = useTranslation(); // <--- Hook de tradução
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
  // Se estiver na Vision, vai para /vision/services. Se não, vai para o Hub de Serviços (/services)
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
              {t('header.home')}
            </Link>

            {/* LINK SERVIÇOS DINÂMICO */}
            <Link to={servicesLink} className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              {t('header.services')}
            </Link>

            <Link to="/about" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              {t('header.about')}
            </Link>
            <Link to="/contact" className={`text-sm font-light transition-colors ${navLinkHoverClass}`}>
              {t('header.contact')}
            </Link>

            {/* Botão de Troca de Marca (Switch) */}
            {!isVisionSection && (
              <Link to="/vision">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  {t('header.vision_btn')}
                </Button>
              </Link>
            )}

            {isVisionSection && (
              <Link to="/">
                <Button variant="outline" size="sm" className="rounded-full border-2 border-solara-vinho text-solara-vinho hover:bg-solara-vinho/10">
                  {t('header.solara_btn')}
                </Button>
              </Link>
            )}

            <Link to="/contact">
              <Button variant="default" size="sm" className="rounded-full bg-solara-vinho hover:bg-solara-vinho/90 text-white">
                {t('header.book_meeting')}
              </Button>
            </Link>

            {/* --- NOVO: Botão de Idioma (Desktop) --- */}
            <div className="pl-4 border-l border-gray-200 h-6 flex items-center">
              <LanguageSwitcher />
            </div>

          </nav>

          {/* Mobile Menu & Switcher */}
          <div className="flex items-center md:hidden relative">
            {/* CORREÇÃO AQUI: Adicionei 'mr-12' (margem direita) para afastar o globo do menu */}
            <div className="mr-12">
                <LanguageSwitcher />
            </div>
            
            {/* O HamburgerMenu provavelmente tem 'absolute' interno, então ele vai ficar nesse espaço que criamos */}
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;