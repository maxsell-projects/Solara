import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Users, Globe } from "lucide-react";

// Assets
import signatureCamila from "@/assets/signature-camila.png";
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";
import camilaImg from "@/assets/camila.png"; // <--- Import da Foto

const About = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            A Nossa História
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
            O Sol, luz que guia
            <br />
            <span className="text-solara-vinho font-medium">os investimentos conscientes</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            A Solara é uma consultoria que integra estratégia, comunicação e impacto.
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
                  Investir com propósito <span className="text-solara-vinho italic font-serif">significa iluminar</span>
                </h2>
              </div>

              <div className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed">
                <p>
                  A Solara é a energia vital, ela comunica com alma e nasce da convicção de que a verdadeira prosperidade é enraizada na consciência.
                </p>
                <p>
                  Uma plataforma de investimentos imobiliários e financeiros, para quem busca além de retorno: significado, impacto, e crescimento iluminado por valores.
                </p>
                <p>
                  Inspirados na inteligência da natureza e na energia vital do Sol, acreditamos que investir é um gesto espiritual, uma escolha, um reflexo de quem somos e do mundo que construímos.
                </p>
                <p>
                  Na Solara, cultivamos e iluminamos caminhos no desenvolvimento sólido de patrimônios sustentáveis, projetos com alma, e futuros a brilhar com autenticidade. Porque quando propósito e estratégia caminham juntos, o resultado é luz em movimento.
                </p>
                <p>
                  Escolher investir com intenção é estar consciente de que o verdadeiro valor está na interdependência entre pessoas, ideias e territórios. Para quem entende que brilhar é partilhar luz.
                </p>
                <p className="text-solara-vinho font-medium italic border-l-2 border-solara-vinho pl-4 py-2 my-6">
                  Solara. Onde o futuro é semeado com consciência e colhido com brilho.
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <img
                  src={signatureCamila}
                  alt="Camila Montenegro signature"
                  className="h-16 w-auto opacity-80 -ml-2"
                />
                <p className="text-sm text-muted-foreground font-light mt-2 uppercase tracking-widest">
                  Camila Montenegro, Founder & CEO
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
                <h3 className="text-2xl font-light mb-6 text-solara-vinho">Vertentes da Solara</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-solara-vinho pl-6">
                    <h4 className="font-medium text-lg mb-2 text-neutral-900">Investimentos Conscientes</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Consultoria financeira e gestão de ativos com foco em ética, sustentabilidade, autenticidade e visão de longo prazo.
                    </p>
                  </div>
                  <div className="border-l-4 border-solara-vinho pl-6">
                    <h4 className="font-medium text-lg mb-2 text-neutral-900">Imobiliária Essencial</h4>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      Curadoria boutique e desenvolvimento de projetos que valorizam o território, o bem-estar e o coletivo.
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
              Nossa <span className="text-solara-vinho font-medium">Filosofia</span>
            </h2>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground italic max-w-3xl mx-auto font-serif">
              "Investir é um ato de consciência."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">Clareza</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Transparência total em processos, dados e comunicação com nossos clientes
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">Sustentabilidade</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Investimentos que geram valor de longo prazo e impacto positivo
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">Conexão</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Parcerias autênticas baseadas em confiança e objetivos partilhados
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-solara-vinho/10 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-solara-vinho" />
              </div>
              <h3 className="text-xl font-light mb-4">Propósito</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Cada investimento alinhado com valores e visão de futuro consciente
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
                A força da <span className="font-serif italic text-emerald-600">informação</span>
              </h2>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                A Solara acredita na força da informação. Por isso, criou a Vision Press,
                uma plataforma de análise, conteúdo e inteligência de mercado.
              </p>

              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                A Vision Press é o braço editorial e de comunicação estratégica da Solara,
                transformando insights de mercado em narrativas que educam, inspiram e
                ampliam a visão dos investidores conscientes.
              </p>

              <div className="pt-4">
                <Link to="/vision">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-2 border-emerald-600 text-emerald-800 hover:bg-emerald-50 px-8 py-6 text-base"
                  >
                    Visite a Vision Press
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
        message="Olá! Gostaria de saber mais sobre a Solara."
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default About;