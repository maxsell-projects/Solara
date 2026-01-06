import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShieldCheck, PieChart, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import financialHero from "@/assets/service-financial.jpg";
import { useTranslation } from "react-i18next"; // <--- Import i18n

const Financial = () => {
  const { t } = useTranslation(); // <--- Hook

  return (
    <div className="min-h-screen font-sans text-neutral-900 bg-white">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative mt-20 pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <img src={financialHero} alt="Financial Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <Badge variant="outline" className="border-white/30 text-white px-4 py-1 text-xs uppercase tracking-widest font-semibold">
              {t('financial.hero.badge')}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
              {t('financial.hero.title_line1')} <br />
              <span className="text-solara-vinho font-medium">{t('financial.hero.title_line2')}</span>
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              {t('financial.hero.description')}
            </p>
            <div className="pt-4">
              <Link to="/contact">
                <Button className="rounded-full bg-white text-neutral-900 hover:bg-solara-vinho hover:text-white transition-all px-8 h-12 text-base">
                  {t('financial.hero.btn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900">
                {t('financial.philosophy.title_line1')} <br />
                <span className="text-solara-vinho font-medium">{t('financial.philosophy.title_line2')}</span>
              </h2>
              <div className="space-y-6 text-neutral-600 font-light leading-relaxed text-lg border-l-4 border-solara-vinho pl-6">
                <p>{t('financial.philosophy.p1')}</p>
                <p>{t('financial.philosophy.p2')}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('financial.philosophy.risk_title')}</h3>
                    <p className="text-neutral-500 font-light text-sm">{t('financial.philosophy.risk_desc')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <PieChart className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('financial.philosophy.asset_title')}</h3>
                    <p className="text-neutral-500 font-light text-sm">{t('financial.philosophy.asset_desc')}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <Landmark className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('financial.philosophy.banking_title')}</h3>
                    <p className="text-neutral-500 font-light text-sm">{t('financial.philosophy.banking_desc')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">{t('financial.grid.title')}</h2>
            <p className="text-neutral-500 font-light max-w-2xl mx-auto">
              {t('financial.grid.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: t('financial.grid.portfolio_title'), 
                desc: t('financial.grid.portfolio_desc'), 
                icon: TrendingUp 
              },
              { 
                title: t('financial.grid.credit_title'), 
                desc: t('financial.grid.credit_desc'), 
                icon: Landmark 
              },
              { 
                title: t('financial.grid.estate_title'), 
                desc: t('financial.grid.estate_desc'), 
                icon: ShieldCheck 
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-solara-vinho/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-solara-vinho transition-colors">
                    <item.icon className="w-8 h-8 text-solara-vinho group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">{t('financial.cta.title')}</h2>
          <p className="text-neutral-500 mb-8 max-w-2xl mx-auto font-light text-lg">
            {t('financial.cta.description')}
          </p>
          <Link to="/contact">
            <Button className="rounded-full bg-neutral-900 text-white hover:bg-solara-vinho px-10 py-6 text-lg">
              {t('financial.cta.btn')} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351123456789" message="Hello, I'm interested in Financial Wealth Management." />
      <BackToTop />
    </div>
  );
};

export default Financial;