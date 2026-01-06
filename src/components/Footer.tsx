import { Link } from "react-router-dom";
import logoSolara from "@/assets/logo-solara-full.png";
import logoVision from "@/assets/logo-vision.png";
import logoMaxSell from "@/assets/maxsell.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-200 py-16 border-t border-neutral-800">
      <div className="container mx-auto px-6 lg:px-8">

        {/* GRID PRINCIPAL */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* COLUNA 1: MARCAS & IDENTIDADE */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* Logo Solara */}
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img
                  src={logoSolara}
                  alt="Solara Project"
                  // Aumentado e com cores originais (removido filtro invert/brightness)
                  className="h-20 w-auto object-contain"
                />
              </Link>
              {/* Separator visual */}
              <div className="hidden sm:block h-10 w-px bg-neutral-700"></div>
              {/* Logo Vision */}
              <Link to="/vision" className="hover:opacity-80 transition-opacity">
                <img
                  src={logoVision}
                  alt="Vision Press"
                  // Aumentado e com cores originais
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>
            <p className="text-sm font-light opacity-60 leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* COLUNA 2: SOLARA (INVESTIMENTOS) */}
          <div>
            <h4 className="font-medium text-white text-lg mb-6">{t('footer.col_solara')}</h4>
            <ul className="space-y-3 text-sm font-light opacity-70">
              <li>
                <Link to="/services/real-estate" className="hover:text-solara-vinho hover:opacity-100 transition-colors">
                  {t('footer.links.real_estate')}
                </Link>
              </li>
              <li>
                <Link to="/services/financial" className="hover:text-solara-vinho hover:opacity-100 transition-colors">
                  {t('footer.links.financial')}
                </Link>
              </li>
              <li>
                <Link to="/services/consultancy" className="hover:text-solara-vinho hover:opacity-100 transition-colors">
                  {t('footer.links.consultancy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: VISION PRESS (COMUNICAÇÃO) */}
          <div>
            <h4 className="font-medium text-white text-lg mb-6">{t('footer.col_vision')}</h4>
            <ul className="space-y-3 text-sm font-light opacity-70">
              <li>
                <Link to="/vision" className="hover:text-emerald-400 hover:opacity-100 transition-colors">
                  {t('footer.links.editorial')}
                </Link>
              </li>
              <li>
                <Link to="/vision/services" className="hover:text-emerald-400 hover:opacity-100 transition-colors">
                  {t('footer.links.branding')}
                </Link>
              </li>
              <li>
                <Link to="/vision/articles" className="hover:text-emerald-400 hover:opacity-100 transition-colors">
                  {t('footer.links.intelligence')}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4: INSTITUCIONAL */}
          <div>
            <h4 className="font-medium text-white text-lg mb-6">{t('footer.col_company')}</h4>
            <ul className="space-y-3 text-sm font-light opacity-70">
              <li>
                <Link to="/about" className="hover:text-white hover:opacity-100 transition-colors">
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:opacity-100 transition-colors">
                  {t('footer.links.contact')}
                </Link>
              </li>
              <li className="pt-4">
                <a href="mailto:info@solaraproject.pt" className="text-white hover:text-solara-vinho transition-colors">
                  info@solaraproject.pt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* RODAPÉ INFERIOR */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light opacity-50">

            <p className="order-2 md:order-1">
              © {currentYear} Solara Project®. {t('footer.copyright')}
            </p>

            <div className="flex gap-6 order-1 md:order-2">
              <Link to="#" className="hover:opacity-100 transition-opacity">{t('footer.privacy')}</Link>
              <Link to="#" className="hover:opacity-100 transition-opacity">{t('footer.terms')}</Link>
            </div>

            <div className="flex items-center gap-2 order-3">
              <span>{t('footer.powered')}</span>
              <img src={logoMaxSell} alt="MaxSell" className="h-4 w-auto invert brightness-0 opacity-70" />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;