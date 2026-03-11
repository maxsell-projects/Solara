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
import solaraBg from "@/assets/solara.png";

// --- IMPORTAÇÃO DE ASSETS ---
import logoVision from "@/assets/logo-vision.png";
// REMOVIDO: import logoSolara from "@/assets/logo-solara-full.png"; (Não vamos mais usar aqui)
// REMOVIDO: import camilaImg from "@/assets/camila.png";
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

  // --- EFEITO PARALLAX DO FUNDO ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        className="relative min-h-screen flex items-start justify-center overflow-hidden perspective-1000 pt-10 md:pt-12 pb-24"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={solaraBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center">
          <div className="max-w-5xl mx-auto space-y-2">

            {/* ÁREA DA LOGO - segue o mouse (MESMA CONFIG DA HOME) */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={logoVision}
                alt="Vision Press"
                className="h-56 md:h-72 lg:h-80 w-auto object-contain transition-transform duration-200 ease-out"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                }}
              />
            </div>

            {/* ESTD */}
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-emerald-700 font-bold -mt-2">
              {t('hero.estd')}
            </p>

            {/* BOTÕES - MESMA CONFIG DA HOME */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-0">
              <Link to="/vision/services">
                <Button
                  size="sm"
                  className="rounded-full text-xs bg-white text-emerald-800 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-3 uppercase tracking-widest font-bold"
                >
                  {t('vision_page.hero.btn_services')}
                </Button>
              </Link>

              <Link to="/vision/articles">
                <Button
                  size="sm"
                  className="rounded-full text-xs bg-emerald-800 hover:bg-emerald-900 text-white border-2 border-emerald-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-3 uppercase tracking-widest font-bold"
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
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto group bg-black">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
                  <img
                    src={signatureCamila}
                    alt="Assinatura Camila Montenegro"
                    className="h-44 md:h-52 w-auto object-contain -ml-2"
                    style={{
                      filter: 'invert(37%) sepia(30%) saturate(836%) hue-rotate(113deg) brightness(93%) contrast(89%)' // Emerald-700 Equivalent
                    }}
                  />
                  <p className="text-xs text-neutral-400 mt-2 tracking-widest uppercase">{t('vision_page.about.role')}</p>
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

      {/* --- CTA / FORMULÁRIO DE CONTATO EMBUTIDO (Sem Modal) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Cabeçalho do Formulário */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-neutral-900">
                {t('vision_page.newsletter.title')} <span className="text-emerald-700 font-normal">{t('vision_page.newsletter.title_highlight')}</span>
              </h2>
              <p className="text-lg font-light text-neutral-500">
                {t('vision_page.newsletter.description')}
              </p>
            </div>

            {/* Componente de Formulário Integrado */}
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