import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next"; // <--- Import i18n

// --- ASSETS ---
import visionImg from "@/assets/vision-editorial.jpg";
import logoVision from "@/assets/logo-vision.png";
import signatureCamila from "@/assets/signature-camila.png";
import visionStamp from "@/assets/VisionPress-56.png"; // <--- O CARIMBO AQUI

const API_URL = import.meta.env.VITE_API_URL;

interface PostDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  image: string;
  excerpt: string;
  createdAt: string;
}

const VisionArticleDetail = () => {
  const { t } = useTranslation(); // <--- Hook
  const { slug } = useParams();
  const [article, setArticle] = useState<PostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        const response = await fetch(`${API_URL}/posts/${slug}`);
        
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error(error);
        toast.error(t('article_detail.error_loading'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug, t]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return visionImg;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-vision-green" />
        <span className="ml-2 text-sm text-neutral-500">{t('article_detail.loading')}</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Header />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-light text-foreground">{t('article_detail.not_found_title')}</h2>
          <Link to="/vision/articles">
            <Button variant="outline" className="border-vision-green text-vision-green">
              {t('article_detail.btn_back_articles')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-vision-light/30">
      <Header />

      <main className="pt-32 pb-24">
        {/* Article Header */}
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge className="bg-vision-green/10 text-vision-green hover:bg-vision-green hover:text-white transition-colors font-normal px-4 py-1 pointer-events-none">
              {article.category}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground border-y border-vision-green/20 py-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border border-vision-green/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-vision-green text-white text-xs">CM</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-foreground">{t('article_detail.author_name')}</p>
                <p className="text-xs">{t('article_detail.author_role')}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8 hidden sm:block bg-vision-green/20" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-vision-green" />
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <Separator orientation="vertical" className="h-8 hidden sm:block bg-vision-green/20" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-vision-green" />
              <span>5 {t('article_detail.read_time')}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-sm shadow-xl max-w-6xl mx-auto group">
            <img 
              src={getImageUrl(article.image)} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl">
          
          <div className="lg:col-span-2 hidden lg:flex flex-col items-end gap-4 sticky top-32 h-fit">
            <Link to="/vision/articles">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-vision-green/10 hover:text-vision-green mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-vision-green/20 hover:border-vision-green hover:text-vision-green hover:bg-vision-light/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-vision-green/20 hover:border-vision-green hover:text-vision-green hover:bg-vision-light/10 transition-colors">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8 relative">
            <div className="absolute top-1/4 -right-20 w-96 h-96 opacity-[0.03] pointer-events-none rotate-12 z-0">
              <img src={logoVision} alt="" className="w-full h-full object-contain" />
            </div>

            <article className="prose prose-lg prose-stone max-w-none relative z-10
              prose-headings:font-serif prose-headings:font-medium prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-8 prose-p:font-light
              prose-blockquote:border-l-4 prose-blockquote:border-vision-green prose-blockquote:text-vision-green prose-blockquote:bg-vision-green/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
              prose-strong:text-foreground prose-strong:font-medium">
              
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
              
            </article>

            {/* --- ASSINATURA EDITORIAL (CARIMBO AUTOMÁTICO) --- */}
            <div className="mt-16 pt-12 border-t border-vision-green/20 flex flex-col items-end opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-semibold">
                  {t('article_detail.stamp_label')}
                </p>
                <div className="relative inline-block group cursor-pointer">
                  {/* Carimbo Vision Press */}
                  <img 
                    src={visionStamp} 
                    alt="Vision Press Stamp" 
                    className="w-32 md:w-40 h-auto opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out"
                  />
                </div>
                <p className="text-xs text-neutral-300 mt-2 font-light italic">
                  {t('article_detail.stamp_verified')}
                </p>
              </div>
            </div>

            {/* --- BIO DO AUTOR --- */}
            <div className="mt-12 pt-12 border-t border-vision-green/20">
              <div className="flex flex-col gap-6">
                <img 
                  src={signatureCamila} 
                  alt="Assinatura Camila Montenegro" 
                  className="h-24 w-auto object-contain self-start opacity-80"
                />
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">{t('article_detail.author_bio_title')}</h4>
                  <p className="text-muted-foreground font-light text-sm max-w-md">
                    {t('article_detail.author_bio_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
           
          <div className="lg:col-span-2"></div>
        </div>
      </main>

      <section className="bg-neutral-50 py-16 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl mb-6 text-muted-foreground italic">{t('article_detail.continue_reading')}</h3>
          <Link to="/vision/articles">
            <Button size="lg" variant="outline" className="border-vision-green text-vision-green hover:bg-vision-green hover:text-white px-8 transition-all duration-300">
              {t('article_detail.btn_back_list')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionArticleDetail;