import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";
import signatureCamila from "@/assets/signature-camila.png";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  createdAt: string;
  author?: string; // Opcional, caso queiras adicionar no backend depois
}

const Vision = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Busca todos os posts (o backend já ordena por mais recente)
        const response = await fetch('http://localhost:3001/posts');
        if (response.ok) {
          const data = await response.json();
          // Pega apenas os 3 primeiros para os destaques
          setRecentPosts(data.slice(0, 3));
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar destaques.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return visionImg; // Fallback
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:3001${imagePath}`; // Caminho local do backend
  };

  return (
    <div className="min-h-screen font-sans selection:bg-vision-light/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-vision-light/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src={logoVision} 
                alt="Vision Press" 
                className="relative h-32 w-auto mx-auto mb-8 drop-shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-vision-green font-medium mb-4">
              Creative Communication
            </p>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground">
              Conteúdo é
              <br />
              <span className="text-vision-green font-normal">Investimento</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed mb-8">
              Análises, tendências e narrativas que ampliam a visão do mercado
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vision/articles">
                <Button 
                  size="lg" 
                  className="text-base bg-vision-green hover:bg-vision-light hover:text-vision-green transition-all duration-300 border border-transparent hover:border-vision-green"
                >
                  Ler Artigos
                </Button>
              </Link>
              <Link to="/">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base border-2 border-vision-green text-vision-green hover:bg-vision-green/10"
                >
                  Conheça a Solara
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles (Agora Dinâmico) */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Destaques <span className="text-vision-green font-normal">Recentes</span>
            </h2>
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
              Insights e análises que transformam informação em visão estratégica
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-vision-green" />
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground font-light">
              Ainda não há artigos publicados.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((article) => (
                <Link to={`/vision/articles/${article.slug}`} key={article.id} className="block h-full">
                  <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl hover:shadow-vision-green/10 transition-all duration-500 cursor-pointer h-full flex flex-col">
                    <div className="aspect-[3/2] overflow-hidden relative">
                      <div className="absolute inset-0 bg-vision-green/0 group-hover:bg-vision-green/10 transition-colors duration-500 z-10" />
                      <img 
                        src={getImageUrl(article.image)} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <Badge 
                          className="mb-4 font-normal bg-vision-green/10 text-vision-green hover:bg-vision-green hover:text-white transition-colors" 
                        >
                          {article.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-light mb-3 leading-tight group-hover:text-vision-green transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-light border-t border-border pt-4 mt-auto">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-vision-green" />
                          <span>Camila Montenegro</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-vision-green" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/vision/articles">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-vision-green text-vision-green hover:bg-vision-green hover:text-white transition-all duration-300 group"
              >
                Ver Todos os Artigos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Secção Sobre Mim / Estampa */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl max-w-md mx-auto">
                <img 
                  src={visionImg} 
                  alt="Camila Montenegro" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-vision-green/10 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-vision-light/20 rounded-full blur-3xl -z-10"></div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-vision-green font-medium mb-4">
                  Sobre Mim
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
                  Camila <span className="font-serif italic text-vision-green">Montenegro</span>
                </h2>
              </div>

              <div className="prose prose-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  A Vision Press nasce da convicção de que a comunicação é a ponte mais forte entre o valor financeiro e o valor humano. Esta estampa, que carrega o nosso símbolo, representa o selo de autenticidade que aplicamos em cada narrativa.
                </p>
                <p>
                  Ela simboliza a transparência, o crescimento orgânico e a conexão profunda com o propósito. Não é apenas uma marca gráfica; é o compromisso de que cada palavra escrita e cada estratégia desenhada carrega a intenção de construir um futuro mais consciente.
                </p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center sm:items-end gap-8 border-t border-vision-green/20 mt-8">
                <div className="flex-1">
                  <img 
                    src={signatureCamila} 
                    alt="Assinatura Camila Montenegro" 
                    className="h-20 w-auto object-contain opacity-90"
                  />
                  <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">Founding Partner & Editor-in-Chief</p>
                </div>
                
                <div className="relative group cursor-help">
                  <div className="absolute inset-0 bg-vision-green/5 rounded-full blur-xl group-hover:bg-vision-green/10 transition-colors"></div>
                  <img 
                    src={logoVision} 
                    alt="Estampa Vision Press" 
                    className="relative h-24 w-24 object-contain opacity-40 mix-blend-multiply rotate-12 group-hover:rotate-0 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                    title="Selo de Autenticidade Vision Press"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Collaboration with Solara */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="border-l-4 pl-8 border-vision-green">
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Em parceria com a <span className="text-solara-vinho font-normal">Solara</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground leading-relaxed mb-6">
                A Vision Press trabalha em colaboração direta com a Solara Project, 
                explorando a interseção entre investimento, comunicação e consciência global.
              </p>
              <p className="text-lg font-light text-muted-foreground leading-relaxed">
                Cada artigo, análise e conteúdo é desenvolvido com o mesmo rigor e 
                transparência que orientam as estratégias de investimento da Solara.
              </p>
              <Link to="/">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-8 border-2 border-vision-green text-vision-green hover:bg-vision-green hover:text-white transition-colors"
                >
                  Ver Projetos Conjuntos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="border-0 shadow-2xl overflow-hidden ring-1 ring-vision-green/10">
            <CardContent className="p-12 md:p-16 text-center bg-gradient-to-br from-vision-green/5 to-background">
              <h2 className="text-3xl md:text-4xl font-light mb-4">
                Receba os principais <span className="text-vision-green font-normal">insights</span>
              </h2>
              <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscreva a newsletter da Vision Press e receba análises exclusivas de mercado
              </p>
              
              <form className="max-w-md mx-auto flex gap-4">
                <Input 
                  type="email" 
                  placeholder="O seu e-mail" 
                  className="h-12 flex-1 border-vision-green/20 focus-visible:ring-vision-green"
                  required
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-vision-green hover:bg-vision-light hover:text-vision-green transition-all duration-300"
                >
                  Subscrever
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground font-light mt-4">
                Ao subscrever, concorda com a nossa Política de Privacidade
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton 
        phoneNumber="+351123456789" 
        message="Olá! Gostaria de saber mais sobre a Vision Press."
        brand="vision"
      />
      <BackToTop />
      <ExitIntentPopup brand="vision" />
    </div>
  );
};

export default Vision;