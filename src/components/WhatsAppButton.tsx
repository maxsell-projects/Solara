import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next"; // <--- Import

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  brand?: "solara" | "vision";
}

const WhatsAppButton = ({ 
  phoneNumber, 
  message, 
  brand = "solara" 
}: WhatsAppButtonProps) => {
  const { t } = useTranslation(); // <--- Hook

  // Se não for passada mensagem, usa a traduzida padrão
  const finalMessage = message || t('whatsapp_button.default_msg');

  const handleClick = () => {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(finalMessage);
    const url = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
      style={{
        backgroundColor: '#25D366',
        color: 'white'
      }}
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </Button>
  );
};

export default WhatsAppButton;