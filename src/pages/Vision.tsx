import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

// --- IMPORTAÇÃO DE ASSETS ---
import logoVision from "@/assets/logo-vision.png";
import logoSolara from "@/assets/logo-solara-full.png";
import camilaImg from "@/assets/camila.png";
import signatureCamila from "@/assets/signature-camila.png";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  createdAt: string;
  author?: string;
}

// Configuração dinâmica da API baseada no ambiente
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const BASE_URL = API_URL.replace('/api', '');

const Vision = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- ESTADOS PARA O EFEITO HERO 3D (Clean & Premium) ---
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Coordenadas normalizadas (-1 a 1)
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);

      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Tilt suave da logo
  const logoTiltX = isHoveringLogo ? 0 : mousePosition.y * -15;
  const logoTiltY = isHoveringLogo ? 0 : mousePosition.x * 15;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
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
    if (!imagePath) return logoVision;
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 bg-white text-neutral-900">
      <Header />

      {/* --- HERO SECTION CLEAN (Fundo Branco + Efeitos Físicos) --- */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white perspective-1000 pt-20"
      >
        {/* CAMADA DE FUNDO LIMPA */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Textura de Grão Sutil */}
          <div className="absolute inset-0 opacity-[0.03] z-10 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
          {/* Gradiente Radial Suave */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-50 via-white to-white opacity-80"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center pt-10">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* ÁREA DAS LOGOS */}
            <div className="flex flex-col items-center gap-8 mb-8">

              {/* LOGO VISION EM DESTAQUE (HERO) */}
              <div className="block perspective-container relative group">
                <div
                  className="flex items-center justify-center transition-all duration-500 ease-out will-change-transform relative"
                  onMouseEnter={() => setIsHoveringLogo(true)}
                  onMouseLeave={() => setIsHoveringLogo(false)}
                  style={{
                    transform: `perspective(1000px) rotateX(${logoTiltX}deg) rotateY(${logoTiltY}deg) scale3d(${isHoveringLogo ? 1.02 : 1}, ${isHoveringLogo ? 1.02 : 1}, 1)`,
                  }}
                >
                  {/* GLOW VERDE NO HOVER */}
                  <div
                    className={`absolute inset-0 bg-emerald-500 rounded-full blur-[80px] transition-all duration-500 ${isHoveringLogo ? 'opacity-25 scale-125' : 'opacity-0 scale-50'}`}
                    style={{ zIndex: -1 }}
                  />

                  <img
                    src={logoVision}
                    alt="Vision Press"
                    className="h-40 md:h-56 w-auto object-contain transition-all duration-300 relative z-10"
                    style={{
                      // Sombra Verde Esmeralda
                      filter: isHoveringLogo
                        ? `drop-shadow(0 0 30px rgba(16, 185, 129, 0.4))`
                        : `drop-shadow(${mousePosition.x * -10}px ${mousePosition.y * 10}px 15px rgba(0,0,0,0.05))`
                    }}
                  />
                </div>
              </div>

              {/* LOGO SOLARA (PARCEIRA) */}
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="h-px w-8 bg-neutral-300"></div>
                <img
                  src={logoSolara}
                  alt="Solara Project"
                  className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
                <div className="h-px w-8 bg-neutral-300"></div>
              </div>
            </div>

            {/* Título Magnético */}
            <div style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              transition: 'transform 0.2s ease-out'
            }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-neutral-900 tracking-tight">
                Information is
                <br />
                <span className="text-emerald-700 font-medium relative inline-block">
                  Your New Asset
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl font-light text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Uncovering market trends, shaping narratives, and empowering decisions with data-driven clarity.
            </p>

            {/* BOTÕES ARREDONDADOS (Pill Shape) */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
              <Link to="/vision/articles">
                <Button
                  size="lg"
                  className="rounded-full text-base bg-emerald-800 hover:bg-emerald-900 text-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold"
                >
                  Read Articles
                </Button>
              </Link>
              <Link to="/vision/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold"
                >
                  Agency Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTAQUES RECENTES --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-neutral-900">
              Destaques <span className="text-emerald-700 font-normal">Recentes</span>
            </h2>
            <p className="text-lg font-light text-neutral-500 max-w-2xl mx-auto">
              Insights e análises que transformam informação em visão estratégica
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 font-light">
              Ainda não há artigos publicados.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((article) => (
                <Link to={`/vision/articles/${article.slug}`} key={article.id} className="block h-full group">
                  <Card className="border-0 shadow-lg overflow-hidden h-full flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                    <div className="aspect-[3/2] overflow-hidden relative">
                      <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-colors duration-500 z-10" />
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-8 flex flex-col flex-grow bg-white">
                      <div className="mb-4">
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium px-3 py-1 rounded-full uppercase text-[10px] tracking-widest border-0">
                          {article.category}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-light mb-4 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 text-neutral-900">
                        {article.title}
                      </h3>

                      <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-neutral-400 font-light border-t border-neutral-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-emerald-600" />
                          <span>Camila Montenegro</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-emerald-600" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/vision/articles">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8"
              >
                Ver Todos os Artigos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SOBRE MIM --- */}
      <section className="py-24 bg-neutral-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto group">
                <img
                  src={camilaImg}
                  alt="Camila Montenegro"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-medium mb-4">
                  Sobre Mim
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-neutral-900">
                  Camila <span className="font-serif italic text-emerald-700">Montenegro</span>
                </h2>
              </div>

              <div className="prose prose-lg text-neutral-600 font-light leading-relaxed">
                <p>
                  A Vision Press nasce da convicção de que a comunicação é a ponte mais forte entre o valor financeiro e o valor humano.
                </p>
                <p>
                  Ela simboliza a transparência, o crescimento orgânico e a conexão profunda com o propósito. Não é apenas uma marca gráfica; é o compromisso de que cada palavra escrita carrega a intenção de construir um futuro mais consciente.
                </p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center sm:items-end gap-8 border-t border-neutral-200 mt-8">
                <div className="flex-1">
                  <img
                    src={signatureCamila}
                    alt="Assinatura Camila Montenegro"
                    className="h-20 w-auto object-contain opacity-80"
                  />
                  <p className="text-xs text-neutral-400 mt-2 tracking-widest uppercase">Founding Partner & Editor-in-Chief</p>
                </div>

                <div className="relative group cursor-help">
                  <img
                    src={logoVision}
                    alt="Estampa Vision Press"
                    className="relative h-24 w-24 object-contain opacity-30 mix-blend-multiply rotate-12 group-hover:rotate-0 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                    title="Selo de Autenticidade Vision Press"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <Card className="border-0 shadow-2xl overflow-hidden bg-neutral-900 text-white rounded-3xl">
            <CardContent className="p-12 md:p-20 text-center relative overflow-hidden">
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-light mb-6">
                  Receba os principais <span className="text-emerald-400 font-normal">insights</span>
                </h2>
                <p className="text-lg font-light text-neutral-400 mb-10 max-w-2xl mx-auto">
                  Subscreva a newsletter da Vision Press e receba análises exclusivas de mercado diretamente na sua caixa de entrada.
                </p>

                <form className="max-w-md mx-auto flex gap-4">
                  <Input
                    type="email"
                    placeholder="O seu e-mail"
                    className="h-14 flex-1 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-emerald-500 rounded-full px-6"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 transition-all duration-300"
                  >
                    Subscrever
                  </Button>
                </form>

                <p className="text-xs text-neutral-500 font-light mt-6">
                  Ao subscrever, concorda com a nossa Política de Privacidade.
                </p>
              </div>
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