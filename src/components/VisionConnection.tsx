import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// --- ASSETS ---
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";
// Novos assets da Camila (mesmos do About)
import signatureCamila from "@/assets/signature-camila.png"; 
import camilaImg from "@/assets/camila.png"; 

interface Post {
  id: number;
  title: string;
  category: string;
  slug: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const VisionConnection = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts?limit=3`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="vision" className="py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-background">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* --- BLOCO 1: VISION PRESS (Imagem Esq / Texto Dir) --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-vision-green/10 group">
              <img 
                src={visionImg} 
                alt="Vision Press workspace" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="mb-8">
              {/* LOGO COM DESTAQUE */}
              <div className="relative inline-block group">
                <div className="absolute -inset-4 bg-vision-green/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={logoVision} 
                  alt="Vision Press" 
                  className="relative h-28 md:h-36 w-auto mb-6 opacity-100 drop-shadow-sm transform transition-all duration-500 group-hover:scale-105"
                />
              </div>
              
              <p className="text-sm uppercase tracking-[0.2em] text-vision-green font-medium pl-1">
                {t('vision.label')}
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              {t('vision.title_main')}
              <br />
              {t('vision.title_sub')} <span className="italic text-vision-green">Vision Press</span>
            </h2>
            
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              {t('vision.description')}
            </p>
            
            {/* Highlights de Posts */}
            <div className="pt-4">
                <h4 className="text-xl font-medium text-solara-vinho mb-4">{t('vision.recent_highlights')}</h4>
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-16">
                            <Loader2 className="h-5 w-5 animate-spin text-vision-green" />
                        </div>
                    ) : posts.length === 0 ? (
                        <p className="text-sm text-muted-foreground mb-6">{t('vision.no_articles')}</p>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id} className="p-3 shadow-none hover:bg-neutral-100 transition-colors border-l-2 border-l-transparent hover:border-l-vision-green">
                                <Link to={`/vision/articles/${post.slug}`} className="block">
                                    <p className="text-xs uppercase font-semibold text-vision-green mb-1">{post.category}</p>
                                    <h5 className="text-base font-medium text-foreground hover:underline">{post.title}</h5>
                                </Link>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            
            <Link to="/vision">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-vision-green text-vision-green hover:bg-vision-light hover:text-vision-green hover:border-vision-light transition-all duration-300 shadow-sm mt-4"
              >
                {t('vision.btn_explore')}
              </Button>
            </Link>
          </div>
        </div>

        {/* --- BLOCO 2: CAMILA / MANIFESTO (Estilo About: Texto Esq / Imagem Dir) --- */}
        <div className="border-t border-solara-vinho/10 pt-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Coluna Esquerda: Manifesto & Assinatura */}
                <div className="space-y-8 order-2 lg:order-1">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight text-neutral-900">
                            {t('about.manifesto.title_start')} <span className="text-solara-vinho italic font-serif">{t('about.manifesto.title_end')}</span>
                        </h2>
                    </div>

                    <div className="space-y-6 text-lg font-light text-muted-foreground leading-relaxed">
                        <p>{t('about.manifesto.p1')}</p>
                        <p>{t('about.manifesto.p2')}</p>
                        <p className="text-solara-vinho font-medium italic border-l-2 border-solara-vinho pl-4 py-2 my-6">
                            "{t('about.manifesto.highlight')}"
                        </p>
                    </div>

                    <div className="pt-6 border-t border-neutral-100">
                        <img
                            src={signatureCamila}
                            alt="Camila Montenegro signature"
                            className="h-16 w-auto opacity-80 -ml-2"
                        />
                        <p className="text-sm text-muted-foreground font-light mt-2 uppercase tracking-widest">
                            {t('about.manifesto.role')}
                        </p>
                    </div>
                </div>

                {/* Coluna Direita: Foto Humanizada */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="relative aspect-[4/5] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl group">
                        <img 
                            src={camilaImg} 
                            alt="Camila Montenegro" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-solara-vinho/10 mix-blend-multiply group-hover:bg-transparent transition-all duration-1000"></div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default VisionConnection;