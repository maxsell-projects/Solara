import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { MapPin } from "lucide-react";
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
    additionalInfo:
      "Where smart investment meets inspired living. DAMAC Islands is a forward-thinking portfolio and your key to Dubai.",
    country: "Dubai",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento",
  },
  {
    id: 102,
    title: "VILLA TOSCANA",
    subtitle: "LUXURY",
    description: "O charme rústico italiano",
    details: "Villas exclusivas com piscina",
    additionalInfo:
      "O charme rústico italiano combinado com o luxo moderno em uma das regiões mais belas da Itália.",
    country: "ITÁLIA",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento",
  },
  {
    id: 103,
    title: "PENTHOUSE DUBAI",
    subtitle: "EXCLUSIVE",
    description: "O auge da exclusividade",
    details: "Penthouses de alto padrão",
    additionalInfo:
      "O auge da exclusividade no coração de Dubai com vista panorâmica incomparável.",
    country: "EMIRADOS ÁRABES",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento",
  },
];

const getImageUrl = (img?: string) => {
  if (!img) return MOCK_PROPERTIES[0].image;
  if (img.startsWith("http")) return img;
  const path = img.startsWith("/") ? img.substring(1) : img;
  if (path.startsWith("uploads/")) return `${API_URL}/${path}`;
  return `${API_URL}/uploads/${path}`;
};

const truncate = (text: string, length: number) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
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
            description: truncate(p.description, 300) || "Descrição indisponível.",
            details: truncate(p.details, 300) || "",
            additionalInfo: truncate(p.additionalInfo, 300),
            country: p.location || "GLOBAL",
            image: getImageUrl(p.images?.[0]),
            slug: p.market?.slug || "#",
            tag: p.tag || "Empreendimento",
          }));
          setProperties(realProperties);
        } else {
          setProperties(
            MOCK_PROPERTIES.map((p) => ({
              ...p,
              description: truncate(p.description, 300),
              details: truncate(p.details, 300),
              additionalInfo: truncate(p.additionalInfo, 300),
            }))
          );
        }
      } catch (error) {
        setProperties(
          MOCK_PROPERTIES.map((p) => ({
            ...p,
            description: truncate(p.description, 300),
            details: truncate(p.details, 300),
            additionalInfo: truncate(p.additionalInfo, 300),
          }))
        );
      }
    };

    fetchProperties();
  }, []);

  // "10" telas adicionais antes de começar o movimento horizontal
  const totalScreens = properties.length + 10;
  const lockStart = 10 / totalScreens;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, lockStart, 1],
    ["0%", "0%", `-${(properties.length - 1) * 100}%`]
  );

  if (properties.length === 0) return null;

  return (
    <section
      ref={targetRef}
      style={{ height: `${totalScreens * 100}vh` }}
      className="relative bg-[#832C35]"
    >
      {/* ── STICKY VIEWPORT (100dvh para mobile) ── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#832C35] flex flex-col">
        {/* ── HEADER ── */}
        <div className="relative z-20 flex-shrink-0 flex justify-between items-center px-6 md:px-16 pt-5 pb-2 md:pt-6 md:pb-3">
          <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] text-white">
            Imóveis
          </h2>

          {/* Logo maior, desce sobre a linha */}
          <div className="relative z-30 w-20 md:w-44 translate-y-3 md:translate-y-4">
            <img
              src={logoNovaSolara}
              alt="Solara Logo"
              className="w-full h-auto object-contain brightness-0 invert"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* ── LINHA SEPARADORA — branca forte, 3px ── */}
        <div className="flex-shrink-0 w-full h-[3px] bg-white" />

        {/* ── CARDS COM SCROLL HORIZONTAL ── */}
        <motion.div style={{ x }} className="flex flex-1 min-h-0">
          {properties.map((property) => (
            <div
              key={property.id}
              className="h-full w-screen flex-shrink-0 flex items-center px-6 md:px-16 py-4 md:py-6"
            >
              {/* ── GRID PRINCIPAL (mobile em coluna) ── */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-10 w-full max-w-[1600px] mx-auto h-full overflow-hidden">
                {/* ── LEFT: conteúdo ── */}
                <div className="order-2 md:order-1 flex-1 md:col-span-4 flex flex-col justify-between text-white h-full py-2 min-h-0">
                  {/* Location tag — branca, texto/pin na cor do fundo */}
                  <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-fit">
                    <MapPin className="w-4 h-4 text-[#832C35]" />
                    <span className="text-sm font-light tracking-wide text-[#832C35]">
                      {property.country}
                    </span>
                  </div>

                  {/* Texto central */}
                  <div className="space-y-3 flex-1 mt-4">
                    <div>
                      <p className="text-sm md:text-base tracking-[0.2em] uppercase text-white/75">
                        {property.subtitle}
                      </p>
                      <h3 className="text-5xl md:text-6xl lg:text-7xl font-light uppercase leading-[1.03] mt-1 text-white">
                        {property.title}
                      </h3>
                    </div>

                    <div className="border-t border-white/25 pt-3 space-y-3">
                      <p className="text-lg md:text-xl font-light text-white">
                        {property.description}
                      </p>
                      <p className="text-base md:text-lg font-light text-white">
                        {property.details}
                      </p>
                      <div className="pt-1">
                        <p className="text-sm md:text-base font-light text-white/80 leading-relaxed line-clamp-4">
                          {property.additionalInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão */}
                  <div className="mt-4">
                    <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-[#832C35] rounded-md px-9 py-3 text-sm md:text-base font-light tracking-[0.2em] uppercase transition-all duration-300">
                      SABER MAIS
                    </Button>
                  </div>
                </div>

                {/* ── RIGHT: imagem — desktop ── */}
                <div className="md:col-span-8 hidden md:flex items-center justify-center h-full">
                  <div className="relative w-full h-[85%]">
                    {/* Tag */}
                    <div className="absolute top-4 left-4 z-10 bg-[#832C35] text-white px-5 py-2 rounded-full text-sm border border-white/20">
                      {property.tag}
                    </div>

                    {/* Imagem */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* ── RIGHT: imagem — mobile ── */}
                <div className="md:hidden order-1 w-full flex-shrink-0 relative h-[42vh] min-h-[260px] mb-4">
                  <div className="relative w-full h-full">
                    <div className="absolute top-3 left-3 z-10 bg-[#832C35] text-white px-4 py-1.5 rounded-full text-xs border border-white/20">
                      {property.tag}
                    </div>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover rounded-xl shadow-xl"
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