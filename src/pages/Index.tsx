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
import LatestProperties from "@/components/LatestProperties";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FeaturedProperties from "@/components/FeaturedProperties";
import retanguloImg from "@/assets/Retangulo.jpeg";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero com imagem de fundo */}
        <div
          className="relative w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${retanguloImg})` }}
        >
          <Hero />
        </div>

        {/* Últimos Imóveis em Destaque */}
        <LatestProperties />

        {/* Services com fundo próprio (SEM a imagem) */}
        <div id="services">
          <Services />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="vision">
          <VisionConnection />
        </div>

        {/* Imóveis em Destaque (FeaturedProperties) */}
        <FeaturedProperties />
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