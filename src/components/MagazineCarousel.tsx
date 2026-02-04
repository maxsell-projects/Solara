import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Calendar, Loader2, ImageOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

// Interface atualizada para bater com o padrão do Backend (image ao invés de coverImage)
interface Post {
  id: number;
  title: string;
  excerpt: string;
  image?: string; // Tornamos opcional para evitar crash
  category: string;
  createdAt: string;
  slug: string;
}

interface MagazineCarouselProps {
  currentArticleId: number; 
}

export function MagazineCarousel({ currentArticleId }: MagazineCarouselProps) {
  const [articles, setArticles] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${API_URL}/posts`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Post[] = await res.json();

        // Lógica Senior: Filtrar o atual + Embaralhar + Pegar 3
        const recommended = data
          .filter((post) => post.id !== Number(currentArticleId)) // Garante comparação correta
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 3); 

        setArticles(recommended);
      } catch (error) {
        console.error("Erro ao carregar recomendados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentArticleId]);

  // Função Defensiva para Imagem
  const getImageUrl = (path?: string) => {
    if (!path) return null; // Retorna null se não tiver imagem
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
  };

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-solara-vinho" /></div>;
  if (articles.length === 0) return null; 

  return (
    <div className="py-16 bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-sm font-bold text-solara-gold uppercase tracking-widest mb-2">Magazine Solara</h3>
            <h2 className="text-3xl font-light text-solara-vinho">Continue Lendo</h2>
          </div>
          <Link to="/vision/articles">
            <Button variant="link" className="text-solara-vinho hidden md:flex">
              Ver Todos os Artigos <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {articles.map((post) => (
              <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={`/vision/articles/${post.slug}`} className="group h-full block">
                  <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col overflow-hidden">
                    <div className="aspect-video relative overflow-hidden bg-gray-100 flex items-center justify-center">
                      
                      {/* Renderização Condicional da Imagem */}
                      {post.image ? (
                        <img 
                          src={getImageUrl(post.image) || ""} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <ImageOff className="w-10 h-10 text-gray-300" />
                      )}

                      <Badge className="absolute top-4 left-4 bg-white/90 text-solara-vinho hover:bg-white border-none shadow-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-gray-400 mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      
                      <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-solara-vinho transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm font-light line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      <span className="text-solara-vinho text-sm font-medium flex items-center group-hover:underline decoration-solara-vinho underline-offset-4">
                        Ler Artigo <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}