import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import VisionConnection from "@/components/VisionConnection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useTranslation } from "react-i18next"; // <--- Import

const Index = () => {
  const { t } = useTranslation(); // <--- Hook

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <VisionConnection />
      <Footer />
      <WhatsAppButton 
        phoneNumber="+351123456789" 
        message={t('index_page.whatsapp_msg')} // <--- Tradução aqui
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default Index;