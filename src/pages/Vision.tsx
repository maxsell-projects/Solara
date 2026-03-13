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
import solaraBg from "@/assets/solara.webp";

// --- IMPORTAÇÃO DE ASSETS ---
import logoVision from "@/assets/logo-vision.png";
import signatureCamila from "@/assets/signature-camila.png";

// Novos assets do Hero e Serviços
import heroCamilaVideo from "@/assets/hero-camila.mp4";
import realEstateImg from "@/assets/realestate.jpeg";
import financialGif from "@/assets/financial.gif";
import consultingImg from "@/assets/investiments.jpeg";

function AnimatedCard({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setStaticFrame(canvas.toDataURL("image/jpeg", 0.95));
      }
    };
    img.src = src;
  }, [src]);

  return (
    <div
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? src : (staticFrame || src)}
        alt={alt}
        className={className}
      />
    </div>
  );
}

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
        {/* Background Video */}
        <div className="absolute inset-0 w-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={heroCamilaVideo}
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-30 text-center">
          <div className="max-w-5xl mx-auto space-y-2">

            {/* ÁREA DA LOGO - segue o mouse (MESMA CONFIG DA HOME) */}
            <div className="flex flex-col items-center gap-4">
              <div className="block perspective-container relative group">
                <div
                  className="flex items-center justify-center transition-all duration-500 ease-out will-change-transform relative"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                  }}
                >
                  <img
                    src={logoVision}
                    alt="Vision Press"
                    className="h-56 md:h-72 lg:h-80 w-auto object-contain transition-transform duration-200 ease-out relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* ESTD */}
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-emerald-700 font-bold -mt-2">
              {t('hero.estd')}
            </p>

            {/* BOTÕES - MESMA CONFIG DA HOME */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-0">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button
                  size="sm"
                  className="rounded-full text-xs bg-white text-emerald-800 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 px-6 py-3 uppercase tracking-widest font-bold"
                >
                  {t('vision_page.hero.btn_services')}
                </Button>
              </a>

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

        {/* Torn Paper Effect at the bottom */}
        <div className="absolute bottom-0 w-full left-0 z-40 overflow-hidden leading-none transform translate-y-[1px]">
          <svg
            className="w-[calc(100%+1.3px)] h-[30px] md:h-[50px] lg:h-[70px] block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
              fill="#ffffff" /* Adapts to next section bg-white */
            />
          </svg>
        </div>
      </section>

      <section id="services" className="relative py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900">
              {t('vision_services.vertentes.title')}
            </h2>
            <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="w-24 h-1 bg-emerald-800/20 mx-auto rounded-full mt-8" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Creative Communication */}
            <Link to="/vision/services" className="block h-full transform hover:-translate-y-2 transition-transform duration-500">
              <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:bg-emerald-800 h-full flex flex-col">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={realEstateImg} alt={t('vision_services.vertentes.creative.title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-8 flex flex-col flex-grow bg-white group-hover:bg-emerald-800 transition-colors duration-500">
                  <h3 className="text-2xl font-light mb-4 text-neutral-900 group-hover:text-white transition-colors duration-300">
                    {t('vision_services.vertentes.creative.title')}
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {t('vision_services.vertentes.creative.description')}
                  </p>
                  <span className="text-sm uppercase tracking-widest mt-6 text-emerald-800 font-medium group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                    {t('services.discover_more')}
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Talent Agency */}
            <Link to="/vision/services" className="block h-full transform hover:-translate-y-2 transition-transform duration-500">
              <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:bg-emerald-800 h-full flex flex-col">
                <div className="aspect-[3/2] overflow-hidden">
                  <AnimatedCard src={financialGif} alt={t('vision_services.vertentes.talent.title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-8 flex flex-col flex-grow bg-white group-hover:bg-emerald-800 transition-colors duration-500">
                  <h3 className="text-2xl font-light mb-4 text-neutral-900 group-hover:text-white transition-colors duration-300">
                    {t('vision_services.vertentes.talent.title')}
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {t('vision_services.vertentes.talent.description')}
                  </p>
                  <span className="text-sm uppercase tracking-widest mt-6 text-emerald-800 font-medium group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                    {t('services.discover_more')}
                  </span>
                </CardContent>
              </Card>
            </Link>

            {/* Field Builder */}
            <Link to="/vision/services" className="block h-full transform hover:-translate-y-2 transition-transform duration-500">
              <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:bg-emerald-800 h-full flex flex-col">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={consultingImg} alt={t('vision_services.vertentes.builder.title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-8 flex flex-col flex-grow bg-white group-hover:bg-emerald-800 transition-colors duration-500">
                  <h3 className="text-2xl font-light mb-4 text-neutral-900 group-hover:text-white transition-colors duration-300">
                    {t('vision_services.vertentes.builder.title')}
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {t('vision_services.vertentes.builder.description')}
                  </p>
                  <span className="text-sm uppercase tracking-widest mt-6 text-emerald-800 font-medium group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                    {t('services.discover_more')}
                  </span>
                </CardContent>
              </Card>
            </Link>
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