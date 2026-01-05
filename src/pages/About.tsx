import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import signatureCamila from "@/assets/signature-camila.png";
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";
import { Link } from "react-router-dom";
import { Lightbulb, Target, Users, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4">
            A Nossa História
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            O Sol, luz que guia
            <br />
            <span className="text-primary">os investimentos conscientes</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Solara é uma consultoria que integra estratégia, comunicação e impacto
          </p>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                  Investir com propósito <span className="text-primary">significa iluminar</span>
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
                <p className="text-primary font-normal italic">
                  Solara. Onde o futuro é semeado com consciência e colhido com brilho.
                </p>
              </div>

              <div className="pt-4">
                <img
                  src={signatureCamila}
                  alt="Camila Montenegro signature"
                  className="h-12 w-auto opacity-80"
                />
                <p className="text-sm text-muted-foreground font-light mt-2">
                  Camila Montenegro, Founder & CEO
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-neutral-50 border-0 p-8">
                <h3 className="text-2xl font-light mb-6">Vertentes da Solara</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-light text-lg mb-2">Investimentos Conscientes</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      Consultoria financeira e gestão de ativos com foco em ética, sustentabilidade, autenticidade e visão de longo prazo.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <h4 className="font-light text-lg mb-2">Imobiliária Essencial</h4>
                    <p className="text-sm text-muted-foreground font-light">
                      Curadoria boutique e desenvolvimento de projetos que valorizam o território, o bem-estar e o coletivo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Filosofia */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Nossa <span className="text-primary">Filosofia</span>
            </h2>
            <p className="text-2xl md:text-3xl font-light text-muted-foreground italic max-w-3xl mx-auto">
              "Investir é um ato de consciência."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-light mb-4">Clareza</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Transparência total em processos, dados e comunicação com nossos clientes
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-light mb-4">Sustentabilidade</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Investimentos que geram valor de longo prazo e impacto positivo
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-light mb-4">Conexão</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Parcerias autênticas baseadas em confiança e objetivos partilhados
              </p>
            </Card>

            <Card className="border-0 shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-light mb-4">Propósito</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Cada investimento alinhado com valores e visão de futuro consciente
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Transição para Vision Press */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={visionImg}
                  alt="Vision Press workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="mb-8">
                <img
                  src={logoVision}
                  alt="Vision Press"
                  className="h-16 w-auto mb-6 opacity-90"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                A força da <span style={{ color: 'hsl(100, 19%, 64%)' }}>informação</span>
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

              <Link to="/vision">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2"
                  style={{ borderColor: 'hsl(100, 19%, 74%)', color: 'hsl(100, 22%, 13%)' }}
                >
                  Visite a Vision Press
                </Button>
              </Link>
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