import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("solara_cookie_consent");
    if (!consent) {
      // Pequeno delay para não aparecer logo que a página carrega
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("solara_cookie_consent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Mesmo recusando, salvamos a preferência para não perguntar de novo na sessão
    localStorage.setItem("solara_cookie_consent", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom-full duration-500">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-solara-vinho/10 rounded-full hidden sm:block">
              <Cookie className="w-6 h-6 text-solara-vinho" />
            </div>
            <div className="space-y-1">
              <p className="text-neutral-800 font-medium text-sm md:text-base leading-relaxed">
                {t('cookie_banner.text')}
              </p>
              <Link 
                to="/legal?section=cookies" 
                className="text-xs text-solara-vinho hover:underline inline-block"
              >
                {t('cookie_banner.policy_link')}
              </Link>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              variant="outline" 
              onClick={handleDecline}
              className="flex-1 md:flex-none border-neutral-300"
            >
              {t('cookie_banner.decline')}
            </Button>
            <Button 
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-solara-vinho hover:bg-solara-vinho/90 text-white"
            >
              {t('cookie_banner.accept')}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookieConsent;