import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, User, Clock, Search, Loader2 } from "lucide-react";
import visionImg from "@/assets/vision-editorial.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  createdAt: string;
  author?: string;
  readTime?: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = API_URL ? API_URL.replace('/api', '') : 'http://localhost:3001';

const VisionArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["Todos", "Negócios", "Imobiliário", "Finanças", "Sociedade", "Tendências"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível carregar os artigos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredArticles = posts.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === "Todos" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return visionImg;
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  return (
    <div className="min-h-screen font-sans">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-vision-green font-medium mb-4">
              Jornal Vision Press
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight text-foreground">
              Artigos e <span className="text-vision-green font-normal">Análises</span>
            </h1>
            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Conteúdo editorial que transforma informação em visão estratégica
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-vision-green transition-colors" />
              <Input 
                type="text"
                placeholder="Pesquisar artigos..."
                className="h-14 pl-12 text-base border-vision-green/20 focus-visible:ring-vision-green"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "Todos" ? null : category)}
                className={`px-6 py-2 rounded-full font-light text-sm transition-all duration-300 border ${
                  (category === "Todos" && !selectedCategory) || selectedCategory === category
                    ? 'bg-vision-green text-white border-vision-green'
                    : 'bg-transparent text-muted-foreground border-transparent hover:border-vision-green/30 hover:bg-vision-light/10 hover:text-vision-green'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-vision-green" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground font-light">
                Nenhum artigo encontrado.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link to={`/vision/articles/${article.slug}`} key={article.id} className="block h-full">
                  <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-xl hover:shadow-vision-green/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="aspect-[3/2] overflow-hidden relative">
                      <div className="absolute inset-0 bg-vision-green/0 group-hover:bg-vision-green/10 transition-colors duration-500 z-10" />
                      <img 
                        src={getImageUrl(article.image)} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <Badge 
                          className="font-normal bg-vision-green/10 text-vision-green hover:bg-vision-green hover:text-white transition-colors" 
                        >
                          {article.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-light mb-3 leading-tight group-hover:text-vision-green transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
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
                        <div className="flex items-center gap-1 ml-auto">
                          <Clock className="w-3 h-3 text-vision-green" />
                          <span>5 min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
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

export default VisionArticles;