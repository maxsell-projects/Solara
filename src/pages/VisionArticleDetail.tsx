import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next"; 
import { LeadForm } from "@/components/LeadForm"; 
import { HeroBackground } from "@/components/HeroBackground"; 

// --- IMPORTAÇÃO DE ASSETS ---
import logoVision from "@/assets/logo-vision.png";
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Vision = () => {
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- ESTADOS PARA O EFEITO HERO 3D ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);

      requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        // Opcional: toast.error("Erro ao carregar destaques.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return logoVision;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 bg-white text-neutral-900">
      <Header />

      {/* --- HERO SECTION CLEAN --- */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white perspective-1000 pt-20"
      >
        <HeroBackground brand="vision" />

        <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center pt-10">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* ÁREA DA LOGO */}
            <div className="flex flex-col items-center gap-8 mb-8">
              <div className="block perspective-container relative group">
                <div
                  className="flex items-center justify-center transition-all duration-500 ease-out will-change-transform relative"
                  onMouseEnter={() => setIsHoveringLogo(true)}
                  onMouseLeave={() => setIsHoveringLogo(false)}
                  style={{
                    transform: `perspective(1000px) rotateX(${logoTiltX}deg) rotateY(${logoTiltY}deg) scale3d(${isHoveringLogo ? 1.02 : 1}, ${isHoveringLogo ? 1.02 : 1}, 1)`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-emerald-500 rounded-full blur-[80px] transition-all duration-500 ${isHoveringLogo ? 'opacity-25 scale-125' : 'opacity-0 scale-50'}`}
                    style={{ zIndex: -1 }}
                  />

                  <img
                    src={logoVision}
                    alt="Vision Press"
                    className="h-40 md:h-56 w-auto object-contain transition-all duration-300 relative z-10"
                    style={{
                      filter: isHoveringLogo
                        ? `drop-shadow(0 0 30px rgba(16, 185, 129, 0.4))`
                        : `drop-shadow(${mousePosition.x * -10}px ${mousePosition.y * 10}px 15px rgba(0,0,0,0.05))`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Título Magnético */}
            <div style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              transition: 'transform 0.2s ease-out'
            }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-neutral-900 tracking-tight">
                {t('vision_page.hero.title_main')}
                <br />
                <span className="text-emerald-700 font-medium relative inline-block">
                  {t('vision_page.hero.title_highlight')}
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl font-light text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              {t('vision_page.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
              <Link to="/vision/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold"
                >
                  {t('vision_page.hero.btn_services')}
                </Button>
              </Link>

              <Link to="/vision/articles">
                <Button
                  size="lg"
                  className="rounded-full text-base bg-emerald-800 hover:bg-emerald-900 text-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-10 py-7 uppercase tracking-widest text-xs font-bold"
                >
                  {t('vision_page.hero.btn_articles')}
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
              {t('vision_page.highlights.title')} <span className="text-emerald-700 font-normal">{t('vision_page.highlights.title_highlight')}</span>
            </h2>
            <p className="text-lg font-light text-neutral-500 max-w-2xl mx-auto">
              {t('vision_page.highlights.subtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 font-light">
              {t('vision_page.highlights.no_articles')}
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
                {t('vision_page.highlights.btn_view_all')}
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
                  {t('vision_page.about.label')}
                </p>
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-neutral-900">
                  Camila <span className="font-serif italic text-emerald-700">Montenegro</span>
                </h2>
              </div>

              <div className="prose prose-lg text-neutral-600 font-light leading-relaxed">
                <p>
                  {t('vision_page.about.p1')}
                </p>
                <p>
                  {t('vision_page.about.p2')}
                </p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center sm:items-end gap-8 border-t border-neutral-200 mt-8">
                <div className="flex-1">
                  {/* --- AQUI ESTÁ A ASSINATURA VERDE E GIGANTE --- */}
                  <img
                    src={signatureCamila}
                    alt="Assinatura Camila Montenegro"
                    className="h-32 md:h-40 w-auto object-contain"
                    style={{ 
                      // Filtro CSS mágico para transformar preto em Verde Esmeralda
                      filter: 'invert(38%) sepia(55%) saturate(709%) hue-rotate(106deg) brightness(93%) contrast(89%)' 
                    }}
                  />
                  <p className="text-xs text-neutral-400 mt-2 tracking-widest uppercase pl-2">{t('vision_page.about.role')}</p>
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

      {/* --- CTA / FORMULÁRIO --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-neutral-900">
                {t('vision_page.newsletter.title')} <span className="text-emerald-700 font-normal">{t('vision_page.newsletter.title_highlight')}</span>
              </h2>
              <p className="text-lg font-light text-neutral-500">
                {t('vision_page.newsletter.description')}
              </p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100">
                <LeadForm brand="vision" />
            </div>

            <p className="text-xs text-neutral-400 font-light mt-8 text-center">
              {t('vision_page.newsletter.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton
        phoneNumber="+351123456789"
        message={t('vision_page.whatsapp_msg')}
        brand="vision"
      />
      <BackToTop />
      <ExitIntentPopup brand="vision" />
    </div>
  );
};

export default Vision;