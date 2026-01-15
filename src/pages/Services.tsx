import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Adicionei ArrowRight aos imports
import { Building2, TrendingUp, Users, Briefcase, ChartLine, Shield, ArrowRight } from "lucide-react";
import realEstateImg from "@/assets/service-real-estate.jpg";
import financialImg from "@/assets/service-financial.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LeadModal } from "@/components/LeadModal"; // <--- Import do Modal

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4">
            {t('services_hub.hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            {t('services_hub.hero.title_line1')}
            <br />
            <span className="text-primary">{t('services_hub.hero.title_line2')}</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('services_hub.hero.description')}
          </p>
        </div>
      </section>

      {/* Investimentos Imobiliários */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={realEstateImg} 
                  alt="Real Estate Investment" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-light">
                {t('services_hub.real_estate.title')} <span className="text-primary">{t('services_hub.real_estate.title_highlight')}</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {t('services_hub.real_estate.description')}
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <Building2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.real_estate.item1_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.real_estate.item1_desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ChartLine className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.real_estate.item2_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.real_estate.item2_desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.real_estate.item3_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.real_estate.item3_desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão Modal Adicionado */}
              <div className="pt-6">
                <LeadModal brand="solara" defaultService="Consultoria e Oportunidades" title={t('services_hub.real_estate.title')}>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                        Saiba Mais <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>
                </LeadModal>
              </div>
            </div>
          </div>

          {/* Investimentos Financeiros */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light">
                {t('services_hub.financial.title')} <span className="text-primary">{t('services_hub.financial.title_highlight')}</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                {t('services_hub.financial.description')}
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.financial.item1_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.financial.item1_desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Briefcase className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.financial.item2_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.financial.item2_desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-light text-lg mb-1">{t('services_hub.financial.item3_title')}</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      {t('services_hub.financial.item3_desc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Botão Modal Adicionado */}
              <div className="pt-6">
                <LeadModal brand="solara" defaultService="Planeamento e Gestão de Carteira" title={t('services_hub.financial.title')}>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12">
                        Saiba Mais <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>
                </LeadModal>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={financialImg} 
                alt="Financial Investment" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              {t('services_hub.differentials.title')} <span className="text-primary">{t('services_hub.differentials.title_highlight')}</span>
            </h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
              {t('services_hub.differentials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <ChartLine className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">{t('services_hub.differentials.card1_title')}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {t('services_hub.differentials.card1_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">{t('services_hub.differentials.card2_title')}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {t('services_hub.differentials.card2_desc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">{t('services_hub.differentials.card3_title')}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {t('services_hub.differentials.card3_desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            {/* Link substituído por Modal */}
            <LeadModal brand="solara" title={t('services_hub.differentials.btn_study')}>
              <Button size="lg" className="text-base px-8 h-12">
                {t('services_hub.differentials.btn_study')}
              </Button>
            </LeadModal>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-b from-background to-neutral-50">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            {t('services_hub.cta.title')} <span className="text-primary">{t('services_hub.cta.title_highlight')}</span>?
          </h2>
          <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('services_hub.cta.description')}
          </p>
          {/* Link substituído por Modal */}
          <LeadModal brand="solara" title={t('services_hub.cta.title')}>
            <Button size="lg" className="text-base px-10 h-14">
              {t('services_hub.cta.btn')}
            </Button>
          </LeadModal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton 
        phoneNumber="+351123456789" 
        message={t('services_hub.whatsapp_msg')}
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default Services;