import { Play, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Dados simulados (Mock) - Substitua pelos reais depois
const TESTIMONIALS = [
  {
    id: 1,
    name: "Roberto Almeida",
    role: "Investidor em Dubai",
    location: "São Paulo, SP",
    quote: "A segurança jurídica que a Solara me passou foi fundamental. O rendimento em Dólar superou minhas expectativas no primeiro trimestre.",
    thumbnailColor: "bg-emerald-900", // Cor de fallback
    duration: "2:14"
  },
  {
    id: 2,
    name: "Fernanda & João",
    role: "Golden Visa Portugal",
    location: "Rio de Janeiro, RJ",
    quote: "Conseguimos nosso visto e o imóvel já está alugado. A assessoria completa, do jurídico ao fiscal, fez toda a diferença.",
    thumbnailColor: "bg-blue-900",
    duration: "3:45"
  },
  {
    id: 3,
    name: "Carlos M.",
    role: "Diversificação Patrimonial",
    location: "Brasília, DF",
    quote: "Eu não tinha tempo para gerenciar obras. Pegar um imóvel pronto em Miami com gestão inclusa foi a melhor decisão.",
    thumbnailColor: "bg-purple-900",
    duration: "1:58"
  }
];

export function ClientVideos() {
  return (
    <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-solara-vinho blur-[120px]" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-solara-gold blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <Badge className="bg-solara-gold/20 text-solara-gold hover:bg-solara-gold/30 border-none uppercase tracking-widest text-[10px]">
              Histórias Reais
            </Badge>
            <h2 className="text-3xl md:text-5xl font-light">
              Quem investe, <span className="text-solara-gold font-serif italic">recomenda</span>.
            </h2>
            <p className="text-neutral-400 max-w-xl font-light">
              Junte-se a mais de 500 investidores que diversificaram seu patrimônio internacionalmente com a nossa assessoria.
            </p>
          </div>
          
          <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black transition-all">
             Ver Todos os Depoimentos
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((video) => (
            <Card key={video.id} className="bg-neutral-800/50 border-neutral-700/50 overflow-hidden group hover:border-solara-gold/50 transition-colors duration-500">
              {/* Thumbnail do Vídeo */}
              <div className={`aspect-video ${video.thumbnailColor} relative flex items-center justify-center cursor-pointer overflow-hidden`}>
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Imagem Placeholder (se tiver foto real, coloque <img src... /> aqui) */}
                
                {/* Botão Play com Efeito Pulse */}
                <div className="relative z-10">
                    <div className="absolute inset-0 bg-solara-gold rounded-full animate-ping opacity-20 group-hover:opacity-40" />
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>

                {/* Duração */}
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded text-white">
                    {video.duration}
                </span>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                    <Quote className="w-8 h-8 text-solara-gold/20" />
                </div>
                <p className="text-neutral-300 font-light italic mb-6 line-clamp-3">
                  "{video.quote}"
                </p>
                
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-medium text-white">{video.name}</h4>
                    <p className="text-xs text-solara-gold">{video.role}</p>
                  </div>
                  <div className="flex gap-1">
                     {[1,2,3,4,5].map(i => (
                         <Star key={i} className="w-3 h-3 text-solara-gold fill-solara-gold" />
                     ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}