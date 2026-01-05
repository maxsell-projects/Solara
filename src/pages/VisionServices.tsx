import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Megaphone, PenTool, Radio, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Importando imagens reais do seu projeto para dar vida aos serviços
import brandingImg from "@/assets/vision-editorial.jpg";
import marketingImg from "@/assets/service-consulting-premium.jpg"; // Reutilizando uma imagem premium
import pressImg from "@/assets/service-consulting.jpg"; // Reutilizando imagem de consultoria

const VisionServices = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <Header />

      {/* --- HERO VISION --- */}
      <section className="pt-32 pb-20 bg-neutral-50 border-b border-neutral-100">
        <div className="container mx-auto px-6 lg:px-8 text-center animate-in fade-in zoom-in duration-700">
          <span className="text-emerald-600 font-medium tracking-[0.2em] text-xs uppercase mb-6 block">
            Vision Press Agency
          </span>
          <h1 className="text-4xl md:text-6xl font-light mb-8 max-w-4xl mx-auto leading-tight">
            Comunicação, Jornalismo e <br className="hidden md:block" />
            <span className="italic font-serif text-emerald-800">Inteligência de Mercado</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
            Transformamos informação em autoridade. Nossas soluções de branding e conteúdo posicionam sua marca no centro das conversas que importam.
          </p>
        </div>
      </section>

      {/* --- LISTA DE SERVIÇOS --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8 space-y-32">

          {/* SERVIÇO 1: BRANDING */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
                <PenTool className="w-7 h-7 text-emerald-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-neutral-900">Branding & Estratégia</h2>
              <p className="text-neutral-500 leading-relaxed mb-8 text-lg font-light">
                Criação de marcas que respiram e se conectam. Do design visual ao tom de voz, construímos identidades sólidas que resistem ao tempo.
              </p>
              <ul className="space-y-4 text-neutral-600 font-light mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Posicionamento de Mercado
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Identidade Visual & Verbal
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Gestão de Reputação
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="link" className="text-emerald-700 p-0 hover:text-emerald-900 text-base">
                  Iniciar Projeto de Branding <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-all duration-500 z-10" />
              <img
                src={brandingImg}
                alt="Branding e Estratégia"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <Separator className="bg-neutral-100" />

          {/* SERVIÇO 2: MARKETING */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-1 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-all duration-500 z-10" />
              <img
                src={marketingImg}
                alt="Marketing e Performance"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="order-2">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
                <Megaphone className="w-7 h-7 text-emerald-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-neutral-900">Marketing & Performance</h2>
              <p className="text-neutral-500 leading-relaxed mb-8 text-lg font-light">
                Estratégias orientadas a dados para ampliar alcance e conversão. Unimos criatividade com métricas precisas.
              </p>
              <ul className="space-y-4 text-neutral-600 font-light mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Tráfego Pago & SEO
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Social Media & Automação
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Marketing de Influência
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="link" className="text-emerald-700 p-0 hover:text-emerald-900 text-base">
                  Ampliar seu Alcance <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <Separator className="bg-neutral-100" />

          {/* SERVIÇO 3: ASSESSORIA */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-8">
                <Radio className="w-7 h-7 text-emerald-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-neutral-900">Assessoria de Imprensa</h2>
              <p className="text-neutral-500 leading-relaxed mb-8 text-lg font-light">
                Conectamos sua marca aos principais veículos de comunicação, gerenciando crises e criando narrativas de impacto.
              </p>
              <ul className="space-y-4 text-neutral-600 font-light mb-8">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Relações Públicas (PR)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Media Training
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> Conteúdos Institucionais
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="link" className="text-emerald-700 p-0 hover:text-emerald-900 text-base">
                  Consultar Assessoria <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-all duration-500 z-10" />
              <img
                src={pressImg}
                alt="Assessoria de Imprensa"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-emerald-900 text-white text-center relative overflow-hidden">
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-light mb-8">Pronto para elevar sua comunicação?</h2>
          <p className="text-emerald-100/80 mb-10 max-w-2xl mx-auto font-light text-lg">
            Agende uma reunião estratégica com nossa equipe editorial e descubra o poder de uma narrativa bem construída.
          </p>
          <Link to="/contact">
            <Button className="rounded-full bg-white text-emerald-900 hover:bg-emerald-50 px-10 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Fale com a Vision Press
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351123456789" message="Olá, gostaria de saber mais sobre os serviços da Vision Press." brand="vision" />
      <BackToTop />
    </div>
  );
};

export default VisionServices;