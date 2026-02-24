import { useState } from "react";
import { X, Menu, Instagram, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.jpg";

interface HamburgerMenuProps {
  brand?: "solara" | "vision";
}

const HamburgerMenu = ({ brand = "solara" }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isVisionSection = location.pathname.startsWith('/vision');
  const currentBrand = isVisionSection ? "vision" : "solara";

  const iconColor = currentBrand === "solara" ? "hsl(356, 69%, 22%)" : "hsl(100, 22%, 13%)";
  const accentColor = currentBrand === "solara" ? "hsl(23, 86%, 70%)" : "hsl(100, 19%, 74%)";

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-[60] p-2"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-7 h-7" style={{ color: iconColor }} />
        ) : (
          <Menu className="w-7 h-7" style={{ color: iconColor }} />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[55] md:hidden backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-[56] transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="flex flex-col h-full p-8 pt-20">
          {/* Header */}
          <div className="mb-12">
            <Link to="/" onClick={closeMenu}>
              <img
                src={logoSolara}
                alt="Solara Project"
                className="h-10 w-auto mb-4"
              />
            </Link>
            <Link
              to="/vision"
              onClick={closeMenu}
              className="text-sm font-light hover:opacity-80 transition-opacity"
              style={{ color: accentColor }}
            >
              Conheça a Vision Press
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Home
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Serviços
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
            <Link
              to="/services/real-estate#markets"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Imóveis
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Sobre
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
            <Link
              to="/vision/articles"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Artigos
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-2xl font-normal text-[#1E1E1E] hover:opacity-70 transition-opacity relative group"
            >
              Contacto
              <span
                className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              />
            </Link>
          </nav>

          {/* Footer */}
          <div className="mt-auto space-y-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" style={{ color: iconColor }} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" style={{ color: iconColor }} />
              </a>
            </div>

            {/* Language Selector */}
            <div className="text-sm font-light text-[#1E1E1E]">
              <button className="hover:opacity-70 transition-opacity">PT</button>
              <span className="mx-2">|</span>
              <button className="hover:opacity-70 transition-opacity">EN</button>
            </div>

            {/* Copyright */}
            <p className="text-xs font-light text-muted-foreground">
              © 2025 Solara Project & Vision Press
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
