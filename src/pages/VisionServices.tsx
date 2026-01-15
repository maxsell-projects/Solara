import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Users, Hammer, ArrowRight } from "lucide-react"; 
// Importação do Modal
import { LeadModal } from "@/components/LeadModal"; 
import { useTranslation } from "react-i18next";

const VisionServices = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <Header />

      {/* --- HERO VISION --- */}
      <section className="pt-32 pb-20 bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 text-center animate-in fade-in zoom-in duration-700">
          <span className="text-emerald-600 font-medium tracking-[0.2em] text-xs uppercase mb-6 block">
            {t('vision_services.hero.label')}
          </span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 max-w-4xl mx-auto leading-tight">
            {t('vision_services.hero.title_line1')} <br className="hidden md:block" />
            <span className="italic font-serif text-emerald-800">{t('vision_services.hero.title_highlight')}</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
            {t('vision_services.hero.description')}
          </p>
        </div>
      </section>

      {/* --- MANIFESTO (TEXTO POÉTICO) --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-8">
              {t('vision_services.manifesto.title')}
            </h2>
            
            <div className="prose prose-lg prose-neutral mx-auto font-light leading-loose text-neutral-600">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-emerald-800 first-letter:float-left first-letter:mr-3">
                {t('vision_services.manifesto.p1')}
              </p>
              <p>{t('vision_services.manifesto.p2')}</p>
              <p className="italic text-emerald-900/80 font-serif text-xl border-l-2 border-emerald-500 pl-6 my-8">
                "{t('vision_services.manifesto.p3')}"
              </p>
              <p>{t('vision_services.manifesto.p4')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6"><Separator className="bg-neutral-100" /></div>

      {/* --- VERTENTES DA PRESS (CARDS COM MODAL) --- */}
      <section className="py-24 bg-neutral-50/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-neutral-900">
              {t('vision_services.vertentes.title')}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CARD 1: COMUNICAÇÃO CRIATIVA */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-neutral-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-light mb-4 text-emerald-900">
                {t('vision_services.vertentes.creative.title')}
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light flex-grow">
                {t('vision_services.vertentes.creative.description')}
              </p>
              <div className="mt-8 pt-6 border-t border-neutral-100">
                 {/* MODAL WRAPPER */}
                 <LeadModal 
                    brand="vision" 
                    defaultService="Comunicação Criativa" 
                    title={t('vision_services.vertentes.creative.title')}
                 >
                    <Button variant="ghost" className="text-emerald-700 p-0 hover:text-emerald-900 hover:bg-transparent">
                        {t('vision_services.vertentes.btn_saiba_mais')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                 </LeadModal>
              </div>
            </div>

            {/* CARD 2: AGÊNCIA DE TALENTOS */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-neutral-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-light mb-4 text-emerald-900">
                {t('vision_services.vertentes.talent.title')}
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light flex-grow">
                {t('vision_services.vertentes.talent.description')}
              </p>
              <div className="mt-8 pt-6 border-t border-neutral-100">
                 {/* MODAL WRAPPER */}
                 <LeadModal 
                    brand="vision" 
                    defaultService="Agência de Talentos"
                    title={t('vision_services.vertentes.talent.title')}
                 >
                    <Button variant="ghost" className="text-emerald-700 p-0 hover:text-emerald-900 hover:bg-transparent">
                        {t('vision_services.vertentes.btn_saiba_mais')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                 </LeadModal>
              </div>
            </div>

            {/* CARD 3: CONSTRUTOR DE CAMPO */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300 border border-neutral-100 flex flex-col">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Hammer className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-light mb-4 text-emerald-900">
                {t('vision_services.vertentes.builder.title')}
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light flex-grow">
                {t('vision_services.vertentes.builder.description')}
              </p>
              <div className="mt-8 pt-6 border-t border-neutral-100">
                 {/* MODAL WRAPPER */}
                 <LeadModal 
                    brand="vision" 
                    defaultService="Construtor de Campo"
                    title={t('vision_services.vertentes.builder.title')}
                 >
                    <Button variant="ghost" className="text-emerald-700 p-0 hover:text-emerald-900 hover:bg-transparent">
                        {t('vision_services.vertentes.btn_saiba_mais')} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                 </LeadModal>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA (COM MODAL) --- */}
      <section className="py-24 bg-emerald-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-light mb-8">{t('vision_services.cta.title')}</h2>
          <p className="text-emerald-100/80 mb-10 max-w-2xl mx-auto font-light text-lg">
            {t('vision_services.cta.description')}
          </p>
          
          {/* BOTÃO DO MODAL GERAL */}
          <LeadModal brand="vision" title={t('vision_services.cta.title')}>
            <Button className="rounded-full bg-white text-emerald-900 hover:bg-emerald-50 px-10 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                {t('vision_services.cta.btn')}
            </Button>
          </LeadModal>

        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351123456789" message={t('vision_services.whatsapp_msg')} brand="vision" />
      <BackToTop />
    </div>
  );
};

export default VisionServices;  