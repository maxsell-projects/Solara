import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2, Building2, TrendingUp, ShieldCheck, Globe, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-premium-property.jpg";
// Note: Removi o import não usado 'visionImage' para limpar o código, 
// a menos que queiras usar noutro sítio.
import { useTranslation } from "react-i18next"; // <--- Import i18n

const API_URL = import.meta.env.VITE_API_URL;

interface Market {
  id: number;
  name: string;
  slug: string;
  tag: string;
  shortDescription: string;
  yieldRate: string;
  appreciationRate: string;
  imageUrl: string;
}

const RealEstate = () => {
  const { t } = useTranslation(); // <--- Hook
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Referência para o Scroll Automático
  const marketsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToMarkets = () => {
    marketsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetch(`${API_URL}/markets`)
      .then(res => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setMarkets(data);
        } else {
          setMarkets([]);
        }
      })
      .catch(err => {
        console.error(err);
        setMarkets([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans bg-neutral-50 text-neutral-900">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <Badge variant="outline" className="border-solara-vinho text-solara-vinho px-4 py-1 text-xs uppercase tracking-widest font-semibold">
                {t('real_estate.hero.badge')}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight text-neutral-900">
                {t('real_estate.hero.title_line1')} <br />
                <span className="text-solara-vinho font-medium">{t('real_estate.hero.title_line2')}</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-lg">
                {t('real_estate.hero.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Botão com Scroll Suave */}
                <Button
                  onClick={scrollToMarkets}
                  className="bg-solara-vinho hover:bg-solara-vinho/90 text-white px-8 h-12 text-base"
                >
                  {t('real_estate.hero.btn_markets')} <ChevronDown className="ml-2 w-4 h-4" />
                </Button>

                {/* Botão com Link para Contato */}
                <Link to="/contact">
                  <Button variant="outline" className="border-neutral-300 hover:bg-neutral-50 px-8 h-12 text-base w-full sm:w-auto">
                    {t('real_estate.hero.btn_contact')}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative h-[550px] w-full animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-tr-[100px] rounded-bl-[100px] shadow-2xl">
                <img src={heroImage} alt="Luxury Architecture" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STRATEGIC VISION (TEXTO CORRIDO) --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Texto Narrativo */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900">
                {t('real_estate.vision.title')}
              </h2>
              <div className="space-y-6 text-neutral-600 font-light leading-relaxed text-lg">
                <p>{t('real_estate.vision.p1')}</p>
                <p>{t('real_estate.vision.p2')}</p>
                <p>{t('real_estate.vision.p3')}</p>
              </div>
            </div>

            {/* Grid de Ícones Conceituais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <TrendingUp className="w-8 h-8 text-solara-vinho mb-4" />
                <h3 className="font-medium text-lg mb-2">{t('real_estate.vision.icons.appreciation_title')}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{t('real_estate.vision.icons.appreciation_desc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <Building2 className="w-8 h-8 text-solara-vinho mb-4" />
                <h3 className="font-medium text-lg mb-2">{t('real_estate.vision.icons.yield_title')}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{t('real_estate.vision.icons.yield_desc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <ShieldCheck className="w-8 h-8 text-solara-vinho mb-4" />
                <h3 className="font-medium text-lg mb-2">{t('real_estate.vision.icons.hedge_title')}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{t('real_estate.vision.icons.hedge_desc')}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <Globe className="w-8 h-8 text-solara-vinho mb-4" />
                <h3 className="font-medium text-lg mb-2">{t('real_estate.vision.icons.diversification_title')}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{t('real_estate.vision.icons.diversification_desc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MARKETS LISTING --- */}
      <section ref={marketsSectionRef} className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light mb-4">{t('real_estate.listings.title')}</h2>
              <p className="text-neutral-500 font-light text-lg">
                {t('real_estate.listings.subtitle')}
              </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-neutral-100 mx-8 mb-4"></div>
            <div className="text-right">
              <span className="block text-4xl font-light text-solara-vinho">{markets.length}</span>
              <span className="text-xs uppercase tracking-wider text-neutral-400">{t('real_estate.listings.stat_active')}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-solara-vinho" />
              <p className="text-neutral-400 font-light">{t('real_estate.listings.loading')}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {markets.length > 0 ? (
                markets.map((market) => (
                  <Link to={`/services/real-estate/${market.slug}`} key={market.id} className="group block h-full">
                    <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full bg-white overflow-hidden rounded-2xl">

                      {/* Image Area */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-white/95 text-neutral-900 hover:bg-white border-0 shadow-sm px-3 py-1 font-normal tracking-wide">
                            {market.tag}
                          </Badge>
                        </div>
                        <img
                          src={market.imageUrl || heroImage}
                          alt={market.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        <h3 className="absolute bottom-6 left-6 text-3xl font-light text-white tracking-wide">
                          {market.name}
                        </h3>
                      </div>

                      {/* Content Area */}
                      <CardContent className="p-8 flex flex-col flex-grow">
                        <p className="text-neutral-500 font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                          {market.shortDescription}
                        </p>

                        <Separator className="bg-neutral-100 mb-6" />

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest mb-1">{t('real_estate.listings.card_yield')}</p>
                            <p className="text-xl font-medium text-solara-vinho">{market.yieldRate}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest mb-1">{t('real_estate.listings.card_appreciation')}</p>
                            <p className="text-xl font-medium text-neutral-700">{market.appreciationRate}</p>
                          </div>
                        </div>

                        <Button variant="ghost" className="w-full justify-between hover:bg-neutral-50 text-neutral-900 font-normal px-0 hover:px-4 transition-all">
                          {t('real_estate.listings.btn_explore')} <ArrowRight className="w-4 h-4 text-solara-vinho" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                  <p className="text-neutral-500">{t('real_estate.listings.empty')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">{t('real_estate.cta.title')}</h2>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto font-light text-lg">
            {t('real_estate.cta.description')}
          </p>
          <Link to="/contact">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-200 px-8 py-6 text-lg">
              {t('real_estate.cta.btn')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351912345678" message="Hello, I would like to know more about Solara Real Estate." />
      <BackToTop />
    </div>
  );
};

export default RealEstate;