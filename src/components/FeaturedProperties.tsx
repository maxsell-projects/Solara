import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!targetRef.current || !scrollContainerRef.current || properties.length === 0) return;

      const { top, height } = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = height - windowHeight;
      if (scrollableDistance <= 0) return;

      let progress = 0;
      if (top <= 0) {
        progress = Math.min(1, Math.max(0, -top / scrollableDistance));
      }

      const tx = -(progress * (properties.length - 1) * 100);
      scrollContainerRef.current.style.transform = `translateX(${tx}vw)`;
    };

    const loop = () => {
      if (lastScrollY !== window.scrollY) {
        lastScrollY = window.scrollY;
        handleScroll();
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    handleScroll(); // Garantir posicionamento inicial

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleScroll);
    };
  }, [properties.length]);

  const totalScreens = properties.length;

  if (properties.length === 0) return null;

  return (
    <section
      ref={targetRef}
      style={{ height: `${totalScreens * 100}vh` }}
      className="relative bg-[#832C35]"
    >
      {/* ── STICKY VIEWPORT (100dvh para mobile) ── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#832C35] flex flex-col">
        {/* ── HEADER (Alinhado com a grelha de conteúdo) ── */}
        <div className="relative z-20 flex-shrink-0 container mx-auto px-6 lg:px-8 mt-24 pt-2 pb-2 border-b-2 md:border-b-[3px] border-white">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-12 gap-10 items-end w-full pb-3">
            <div className="col-span-5 lg:col-span-4 flex items-end">
              <h2 className="text-2xl lg:text-3xl font-light tracking-[0.2em] text-white">
                Imóveis
              </h2>
            </div>
            <div className="col-span-7 lg:col-span-8 flex justify-end">
              <div className="w-24 lg:w-32 translate-y-3">
                <img
                  src={logoNovaSolara}
                  alt="Solara Logo"
                  className="w-full h-auto object-contain brightness-0 invert"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            </div>
          </div>

          {/* Mobile Flex */}
          <div className="flex md:hidden justify-between items-end w-full pb-2">
            <h2 className="text-xl font-light tracking-[0.2em] text-white">
              Imóveis
            </h2>
            <div className="w-16 translate-y-2">
              <img
                src={logoNovaSolara}
                alt="Solara Logo"
                className="w-full h-auto object-contain brightness-0 invert"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          </div>
        </div>



        {/* ── CARDS COM SCROLL HORIZONTAL ── */}
        <div ref={scrollContainerRef} className="flex flex-1 min-h-0 will-change-transform">
          {properties.map((property) => (
            <div
              key={property.id}
              className="h-full w-screen flex-shrink-0 flex items-center py-4 md:py-6"
            >
              {/* ── GRID PRINCIPAL (mobile em coluna) ── */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-10 w-full container mx-auto px-6 lg:px-8 h-full overflow-hidden">
                {/* ── LEFT: conteúdo (Melhor diagramado e centralizado verticalmente) ── */}
                <div className="order-2 md:order-1 flex-1 md:col-span-5 lg:col-span-4 flex flex-col justify-center gap-6 md:gap-8 lg:gap-12 text-white h-full py-6 md:py-8 min-h-0">
                  <div>
                    {/* Location tag */}
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 w-fit mb-6 md:mb-8">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-xs md:text-sm font-light tracking-widest text-white uppercase">
                        {property.country || "Localização Global"}
                      </span>
                    </div>

                    {/* Texto central */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/70 mb-2">
                          {property.subtitle}
                        </p>
                        <h3 className="text-5xl md:text-6xl lg:text-7xl font-light uppercase leading-[1.05] text-white">
                          {property.title}
                        </h3>
                      </div>

                      <div className="h-[1px] w-full bg-white/20 my-6 md:my-8" />

                      <div className="space-y-4 pr-0 md:pr-6">
                        <p className="text-lg md:text-xl font-light text-white leading-relaxed">
                          {property.description}
                        </p>
                        <p className="text-base md:text-lg font-light text-white/90">
                          {property.details}
                        </p>
                        <p className="text-sm md:text-base font-light text-white/70 leading-relaxed line-clamp-3">
                          {property.additionalInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão */}
                  <div className="mt-2 md:mt-4 pointer-events-auto relative z-50">
                    <Link to={property.slug} className="inline-block relative z-50 group">
                      <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-[#832C35] rounded-none px-8 py-6 md:px-10 md:py-7 text-xs md:text-sm font-light tracking-[0.2em] uppercase transition-all duration-300">
                        SABER MAIS
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* ── RIGHT: imagem — desktop ── */}
                <div className="md:col-span-7 lg:col-span-8 hidden md:flex items-center justify-center h-full">
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;