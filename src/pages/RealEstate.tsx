import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-premium-property.jpg";

const API_URL = import.meta.env.VITE_API_URL;

interface Market {
  id: number;
  name: string;
  slug: string;
  tag: string;
  shortDescription: string;
  yieldRate: string;
  appreciationRate: string;
  imageUrl: string;
}

const RealEstate = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/markets`)
      .then(res => {
        if (!res.ok) throw new Error("Erro na API");
        return res.json();
      })
      .then(data => {
        // BLINDAGEM: Só atualiza se for um Array. Se não, array vazio.
        if (Array.isArray(data)) {
          setMarkets(data);
        } else {
          console.error("Formato inválido recebido:", data);
          setMarkets([]); 
        }
      })
      .catch(err => {
        console.error(err);
        setMarkets([]); // Garante que não quebra o .map
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen font-sans bg-neutral-50">
      <Header />

      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <Badge variant="outline" className="border-solara-vinho text-solara-vinho px-4 py-1 text-xs uppercase tracking-widest">
                Expertise Global
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground">
                Investimento <br />
                <span className="text-solara-vinho font-medium">Imobiliário</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-xl">
                Acesso exclusivo a oportunidades off-market e desenvolvimentos premium nos mercados mais dinâmicos do mundo.
              </p>
              <p className="text-base text-muted-foreground font-light leading-relaxed max-w-xl">
                Nossa curadoria especializada identifica ativos com alto potencial de valorização e rendimento seguro, transcendendo fronteiras para proteger e multiplicar seu património.
              </p>
            </div>
            <div className="relative h-[500px] w-full animate-in fade-in zoom-in duration-1000 delay-200">
               <div className="absolute top-0 right-0 w-4/5 h-full overflow-hidden rounded-tr-[4rem] shadow-2xl">
                 <img src={heroImage} alt="Luxury Real Estate" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Presença Global Estratégica</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Selecionamos rigorosamente jurisdições que oferecem o equilíbrio ideal entre <span className="text-solara-vinho font-medium">segurança jurídica</span>, <span className="text-solara-vinho font-medium">qualidade de vida</span> e <span className="text-solara-vinho font-medium">retorno financeiro</span>.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center"><Loader2 className="animate-spin text-solara-vinho" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* O erro acontecia aqui. Agora markets é sempre array. */}
              {markets.length > 0 ? (
                markets.map((market) => (
                  <Link to={`/services/real-estate/${market.slug}`} key={market.id} className="block h-full">
                    <Card className="border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer bg-white">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-white/90 text-solara-vinho hover:bg-white border-0 backdrop-blur-sm shadow-sm">
                            {market.tag}
                          </Badge>
                        </div>
                        <img 
                          src={market.imageUrl || heroImage} 
                          alt={market.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        <h3 className="absolute bottom-6 left-6 text-4xl font-extralight text-white tracking-wide">
                          {market.name}
                        </h3>
                      </div>
                      <CardContent className="p-8 flex flex-col flex-grow">
                        <p className="text-muted-foreground font-light leading-relaxed mb-6 flex-grow">
                          {market.shortDescription}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 mb-6">
                          <div>
                            <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-1">Yield Médio</p>
                            <p className="text-lg font-medium text-solara-vinho">{market.yieldRate}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-gray-400 font-semibold tracking-wider mb-1">Apreciação</p>
                            <p className="text-lg font-medium text-gray-700">{market.appreciationRate}</p>
                          </div>
                        </div>
                        
                        <Button variant="ghost" className="w-full border border-solara-vinho text-solara-vinho hover:bg-solara-vinho hover:text-white group-hover:bg-solara-vinho group-hover:text-white transition-all">
                          Explorar Oportunidades <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  <p>Nenhum mercado disponível no momento ou erro de conexão.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351912345678" message="Olá, tenho interesse em investimentos imobiliários." />
      <BackToTop />
    </div>
  );
};

export default RealEstate;