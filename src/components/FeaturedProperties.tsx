import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import logoNovaSolara from "@/assets/logo-nova-solara.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const MOCK_PROPERTIES = [
  {
    id: 101,
    title: "ISLANDS",
    subtitle: "DAMAC",
    description: "Living para 5 ambientes",
    details: "Apartamentos T2, T3, T4 e Penthouse",
    additionalInfo: "Where smart investment meets inspired living. DAMAC Islands is a forward-thinking portfolio and your key to Dubai.",
    country: "Dubai",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento"
  },
  {
    id: 102,
    title: "VILLA TOSCANA",
    subtitle: "LUXURY",
    description: "O charme rústico italiano",
    details: "Villas exclusivas com piscina",
    additionalInfo: "O charme rústico italiano combinado com o luxo moderno em uma das regiões mais belas da Itália.",
    country: "ITÁLIA",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento"
  },
  {
    id: 103,
    title: "PENTHOUSE DUBAI",
    subtitle: "EXCLUSIVE",
    description: "O auge da exclusividade",
    details: "Penthouses de alto padrão",
    additionalInfo: "O auge da exclusividade no coração de Dubai com vista panorâmica incomparável.",
    country: "EMIRADOS ÁRABES",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento"
  },
];

const getImageUrl = (img?: string) => {
  if (!img) return MOCK_PROPERTIES[0].image;
  if (img.startsWith("http")) return img;

  const path = img.startsWith('/') ? img.substring(1) : img;
  
  if (path.startsWith('uploads/')) {
    return `${API_URL}/${path}`;
  }
  
  return `${API_URL}/uploads/${path}`;
};

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_URL}/markets/properties/featured`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const realProperties = data.map((p: any) => ({
            id: p.id,
            title: p.title || p.market?.name || "IMÓVEL EXCLUSIVO",
            subtitle: p.subtitle || "",
            description: p.description ? (p.description.substring(0, 50) + "...") : "Descrição indisponível.",
            details: p.details || "",
            additionalInfo: p.additionalInfo || "",
            country: p.location || "GLOBAL",
            image: getImageUrl(p.images?.[0]),
            slug: p.market?.slug || "#",
            tag: p.tag || "Empreendimento"
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
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#8B3A3A]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 md:px-16 py-4 md:py-6 bg-[#8B3A3A] border-b border-white/20">
          <h2 className="text-2xl md:text-4xl font-light tracking-wide text-white">
            Imóveis
          </h2>
          <div className="w-12 md:w-20">
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
              className="relative h-screen w-screen flex-shrink-0 flex items-center justify-center pt-24 pb-8 px-4 md:px-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl h-full max-h-[80vh]">
                {/* Sidebar Esquerda */}
                <div className="md:col-span-4 flex flex-col justify-between text-white space-y-4 md:space-y-6 py-4 md:py-8">
                  {/* Localização */}
                  <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 w-fit backdrop-blur-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-light">{property.country}</span>
                  </div>

                  {/* Título e Informações */}
                  <div className="space-y-3 md:space-y-4 flex-1">
                    <div>
                      <p className="text-sm md:text-base font-light tracking-wider uppercase text-white/80">
                        {property.subtitle}
                      </p>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide uppercase leading-tight mt-1">
                        {property.title}
                      </h3>
                    </div>

                    <p className="text-base md:text-lg font-light text-white/90">
                      {property.description}
                    </p>

                    <p className="text-sm md:text-base font-light text-white/80">
                      {property.details}
                    </p>

                    <div className="pt-2 md:pt-4">
                      <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed">
                        {property.additionalInfo}
                      </p>
                    </div>
                  </div>

                  {/* Botão */}
                  <div className="pt-4">
                    <Button
                      className="w-full md:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#8B3A3A] rounded-md px-8 py-3 text-sm md:text-base font-light tracking-wider uppercase transition-all duration-300"
                    >
                      SABER MAIS
                    </Button>
                  </div>
                </div>

                {/* Imagem à Direita */}
                <div className="md:col-span-8 relative h-[50vh] md:h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Tag Empreendimento */}
                    <div className="absolute top-4 left-4 z-10 bg-[#8B3A3A] text-white px-4 py-2 rounded-full text-xs md:text-sm font-light tracking-wide">
                      {property.tag}
                    </div>

                    {/* Imagem */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-2xl md:rounded-3xl shadow-2xl"
                    />
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