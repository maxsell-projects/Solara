import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import logoNovaSolara from "@/assets/logo-nova-solara.png"; 

// Define a URL base diretamente aqui (pega do .env ou usa 3001)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// --- DADOS FAKE (FALLBACK) ---
const MOCK_PROPERTIES = [
  {
    id: 101,
    title: "MANSÃO CLIFFSIDE",
    description: "Uma obra-prima arquitetônica com vista infinita para o oceano.",
    country: "PORTUGAL",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
  },
  {
    id: 102,
    title: "VILLA TOSCANA",
    description: "O charme rústico italiano combinado com o luxo moderno.",
    country: "ITÁLIA",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
  },
  {
    id: 103,
    title: "PENTHOUSE DUBAI",
    description: "O auge da exclusividade no coração de Dubai.",
    country: "EMIRADOS ÁRABES",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
  },
];

// Helper simples local para resolver imagens
const getImageUrl = (img?: string) => {
  if (!img) return MOCK_PROPERTIES[0].image;
  if (img.startsWith("http")) return img;
  // Monta a URL usando a constante definida lá em cima
  return `${API_URL}/uploads/${img}`;
};

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Faz a chamada direta usando a constante API_URL
        const response = await fetch(`${API_URL}/markets/properties/featured`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const realProperties = data.map((p: any) => ({
            id: p.id,
            title: p.title || p.market?.name || "IMÓVEL EXCLUSIVO",
            description: p.description ? (p.description.substring(0, 100) + "...") : "Descrição indisponível.",
            country: p.location || "GLOBAL",
            image: getImageUrl(p.images?.[0]),
            slug: p.market?.slug || "#",
          }));
          setProperties(realProperties);
        } else {
          setProperties(MOCK_PROPERTIES);
        }
      } catch (error) {
        setProperties(MOCK_PROPERTIES);
      }
    };

    fetchProperties();
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(properties.length - 1) * 100}%`]);

  if (properties.length === 0) return null;

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-neutral-900">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#7A1818]">
        
        {/* Header Fixo */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 bg-[#7A1818]/90 backdrop-blur-sm border-b border-white/30">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-widest uppercase text-white">
            IMÓVEIS
          </h2>
          
          <div className="w-16 md:w-24 lg:w-32">
            <img 
              src={logoNovaSolara} 
              alt="Solara Logo" 
              className="w-full h-auto object-contain"
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </div>
        </div>

        <motion.div style={{ x }} className="flex">
          {properties.map((property) => (
            <div
              key={property.id}
              className="relative h-screen w-screen flex-shrink-0 flex flex-col items-center justify-center pt-20 pb-4 px-4 md:px-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-7xl items-center h-full max-h-[85vh]">
                
                {/* 1. Imagem */}
                <div className="relative order-1 md:order-2 h-[40vh] md:h-[75vh] w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-90" />
                  
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover rounded-[2rem] md:rounded-[4rem] shadow-2xl border-2 md:border-4 border-white/10 relative z-10"
                  />
                  
                  <div className="hidden md:block absolute top-6 left-6 w-full h-full border-2 border-white/10 rounded-[4rem] -z-0" />
                </div>

                {/* 2. Texto */}
                <div className="flex flex-col justify-center order-2 md:order-1 space-y-4 md:space-y-8 text-white z-10 md:pl-12 text-center md:text-left">
                  
                  <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-white/90 uppercase tracking-[0.2em] text-sm md:text-lg font-bold md:border-l-4 md:border-white md:pl-4">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    {property.country}
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair leading-none tracking-tight">
                    {property.title}
                  </h3>
                  
                  <p className="text-sm md:text-xl lg:text-2xl text-white/80 max-w-xl font-light leading-relaxed md:border-l border-white/20 md:pl-6 mx-auto md:mx-0">
                    {property.description}
                  </p>

                  <div className="pt-2 md:pt-8">
                    <Button 
                      className="group bg-white text-[#7A1818] hover:bg-neutral-100 rounded-full px-6 py-4 md:px-10 md:py-8 text-base md:text-xl font-medium transition-all duration-300 shadow-xl"
                      onClick={() => console.log(`Navegar para ${property.slug}`)}
                    >
                      SAIBA MAIS
                      <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;