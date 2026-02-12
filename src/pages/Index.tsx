import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import VisionConnection from "@/components/VisionConnection";
import FeaturedProperties from "@/components/FeaturedProperties"; // [!code ++] Importação da nova dobra
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="services">
          <Services />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="vision">
          <VisionConnection />
        </div>

        {/* NOVA DOBRA: Imóveis (Efeito Baralho / Scroll Horizontal) */}
        {/* Posicionado como a última dobra antes do footer, conforme solicitado */}
        <div id="properties-showcase">
          <FeaturedProperties /> {/* [!code ++] */}
        </div>
      </main>

      <Footer />
      
      <WhatsAppButton 
        phoneNumber="+351123456789" 
        message={t('index_page.whatsapp_msg')} 
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default Index;