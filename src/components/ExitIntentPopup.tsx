import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <--- Import

interface ExitIntentPopupProps {
  brand?: "solara" | "vision";
}

const ExitIntentPopup = ({ brand = "solara" }: ExitIntentPopupProps) => {
  const { t } = useTranslation(); // <--- Hook
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleStay = () => {
    setIsVisible(false);
  };

  const handleGoBack = () => {
    navigate(-1);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-fade-in">
      <Card className="relative max-w-md mx-4 p-8 shadow-2xl">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center space-y-6">
          <h3 className="text-2xl font-light">
            {t('exit_popup.title')}
          </h3>
          
          <p className="text-muted-foreground font-light leading-relaxed">
            {brand === "solara" 
              ? t('exit_popup.text_solara')
              : t('exit_popup.text_vision')
            }
          </p>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleStay}
              size="lg"
              style={{
                backgroundColor: brand === "solara" ? 'hsl(18, 84%, 68%)' : 'hsl(100, 19%, 64%)',
                color: 'white'
              }}
            >
              {t('exit_popup.btn_stay')}
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outline"
              size="lg"
            >
              {t('exit_popup.btn_back')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExitIntentPopup;