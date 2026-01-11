import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Users, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

// Assets
import signatureCamila from "@/assets/signature-camila.png";
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";
import camilaImg from "@/assets/camila.png"; 

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t('about.hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
            {t('about.hero.title_line1')}
            <br />
            <span className="text-solara-vinho font-medium">{t('about.hero.title_highlight')}</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {t('about.hero.description')}
          </p>
        </div>
      </section>

      {/* --- QUEM SOMOS (Empresa + Camila) --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Coluna Esquerda: Manifesto & Assinatura */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight text-neutral-900">
                  {t('about.manifesto.title_start')} <span className="text-solara-vinho italic font-serif">{t('about.manifesto.title_end')}</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed">
                <p>{t('about.manifesto.p1')}</p>
                <p>{t('about.manifesto.p2')}</p>
                <p>{t('about.manifesto.p3')}</p>
                <p>{t('about.manifesto.p4')}</p>
                <p>{t('about.manifesto.p5')}</p>
                <p className="text-solara-vinho font-medium italic border-l-2 border-solara-vinho pl-4 py-2 my-6">
                  "{t('about.manifesto.highlight')}"
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <img
                  src={signatureCamila}
                  alt="Camila Montenegro signature"
                  className="h-16 w-auto opacity-80 -ml-2"
                />
                <p className="text-sm text-muted-foreground font-light mt-2 uppercase tracking-widest">
                  {t('about.manifesto.role')}
                </p>
              </div>
            </div>

            {/* Coluna Direita: Foto da Camila + Card Vertentes */}
            <div className="space-y-8 flex flex-col">
              
              {/* 1. Foto Humanizada */}
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl group">
                 <img 
                   src={camilaImg} 
                   alt="Camila Montenegro" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-solara-vinho/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-1000"></div>
              </div>

              {/* 2. Card Vertentes (Logo abaixo da foto) */}
              <Card className="bg-neutral-50 border-0 p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-light mb-6 text-solara-vinho">{t('about.verticals.title')}</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-solara-vinho pl-6">
                    <h4 className="font-medium text-lg mb-2 text-neutral-900">{t('about.verticals.item1_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {t('about.verticals.item1_desc')}
                    </p>
                  </div>
                  <div className="border-l-4 border-solara-vinho pl-6">
                    <h4 className="font-medium text-lg mb-2 text-neutral-900">{t('about.verticals.item2_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {t('about.verticals.item2_desc')}
                    </p>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* --- NOSSA FILOSOFIA --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              {t('about.philosophy.title_start')} <span className="text-solara-vinho font-medium">{t('about.philosophy.title_end')}</span>
            </h2>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground italic max-w-3xl mx-auto font-serif">
              "{t('about.philosophy.quote')}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">{t('about.philosophy.cards.clarity_title')}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('about.philosophy.cards.clarity_desc')}
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">{t('about.philosophy.cards.sustainability_title')}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('about.philosophy.cards.sustainability_desc')}
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">{t('about.philosophy.cards.connection_title')}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('about.philosophy.cards.connection_desc')}
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">{t('about.philosophy.cards.purpose_title')}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {t('about.philosophy.cards.purpose_desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* --- TRANSIÇÃO VISION PRESS --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-emerald-900/10 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-white transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={visionImg}
                  alt="Vision Press workspace"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="mb-8">
                <img
                  src={logoVision}
                  alt="Vision Press"
                  className="h-20 w-auto mb-6"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                {t('about.vision.title_start')} <span className="font-serif italic text-emerald-600">{t('about.vision.title_highlight')}</span>
              </h2>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {t('about.vision.p1')}
              </p>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {t('about.vision.p2')}
              </p>

              <div className="pt-4">
                <Link to="/vision">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 px-8 py-6 text-base"
                  >
                    {t('about.vision.btn')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton
        phoneNumber="+351123456789"
        message={t('whatsapp_button.default_msg')}
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default About;