import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import VisionConnection from "@/components/VisionConnection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FeaturedProperties from "@/components/FeaturedProperties";
import heroCamilaVideo from "@/assets/hero-camila.mp4";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero com vídeo de fundo */}
        <div className="relative w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={heroCamilaVideo}
          />
          <div className="absolute inset-0 bg-white/30 z-10" />
          <div className="relative z-20">
            <Hero />
          </div>
        </div>

        {/* Services com fundo próprio (SEM a imagem) */}
        <div id="services">
          <Services />
        </div>

        {/* Quem Somos (About) - acima dos imóveis */}
        <div id="about">
          <About />
        </div>

        {/* Imóveis em Destaque (FeaturedProperties) */}
        <FeaturedProperties />

        <div id="vision">
          <VisionConnection />
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