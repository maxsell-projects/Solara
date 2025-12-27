import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import logoVision from "@/assets/logo-vision.png";
import visionImg from "@/assets/vision-editorial.jpg";

interface Post {
  id: number;
  title: string;
  category: string;
  slug: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const VisionConnection = () => {
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-vision-green/10">
              <img 
                src={visionImg} 
                alt="Vision Press workspace" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="mb-8">
              <img 
                src={logoVision} 
                alt="Vision Press" 
                className="h-20 w-auto mb-6 opacity-100"
              />
              <p className="text-sm uppercase tracking-[0.2em] text-vision-green font-medium">
                Creative Communication
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Amplifying Impact
              <br />
              Through <span className="italic text-vision-green">Vision Press</span>
            </h2>
            
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Vision Press, our editorial and creative communication arm, transforms strategic 
              insights into compelling narratives. Through thoughtful journalism, brand storytelling, 
              and content excellence, we bridge investment vision with authentic communication.
            </p>
            
            <div className="pt-4">
                <h4 className="text-xl font-medium text-solara-vinho mb-4">Destaques Recentes</h4>
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-16">
                            <Loader2 className="h-5 w-5 animate-spin text-vision-green" />
                        </div>
                    ) : posts.length === 0 ? (
                        /* ALTERADO: Adicionado mb-6 para dar espaço quando não houver posts */
                        <p className="text-sm text-muted-foreground mb-6">Nenhum artigo recente encontrado.</p>
                    ) : (
                        posts.map((post) => (
                            <Card key={post.id} className="p-3 shadow-none hover:bg-neutral-100 transition-colors">
                                <Link to={`/vision/articles/${post.slug}`} className="block">
                                    <p className="text-xs uppercase font-semibold text-vision-green">{post.category}</p>
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
                className="border-2 border-vision-green text-vision-green hover:bg-vision-light hover:text-vision-green hover:border-vision-light transition-all duration-300 shadow-sm"
              >
                Explore Vision Press
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionConnection;