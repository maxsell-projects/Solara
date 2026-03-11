import React, { useState, useEffect, useRef } from "react";
import { MapPin, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import logoNovaSolara from "@/assets/logo-nova-solara.png";
import retanguloImg from "@/assets/Retangulo.jpeg";
import fundoImovel from "@/assets/fundoimo.jpeg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const MOCK_PROPERTIES = [
  {
    id: 101,
    title: "ISLANDS",
    subtitle: "DAMAC",
    description: "Where smart investment meets inspired living. DAMAC Islands is a forward-thinking portfolio and your key to Dubai.",
    details: "Apartamentos T2, T3, T4 e Penthouse com infraestrutura de classe mundial.",
    country: "Dubai",
    images: [
      retanguloImg,
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", // placeholder
    slug: "#",
    tag: "Empreendimento",
  },
  {
    id: 102,
    title: "VILLA TOSCANA",
    subtitle: "LUXURY",
    description: "O charme rústico italiano combinado com o luxo moderno em uma das regiões mais belas da Itália.",
    details: "Villas exclusivas com piscina borda infinita e vinhedos privativos.",
    country: "ITÁLIA",
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
    ],
    floorPlan: "",
    slug: "#",
    tag: "Empreendimento",
  },
  {
    id: 103,
    title: "PENTHOUSE DUBAI",
    subtitle: "EXCLUSIVE",
    description: "O auge da exclusividade no coração de Dubai com vista panorâmica incomparável e acesso privativo.",
    details: "Penthouses de alto padrão com serviços de hotelaria e heliponto.",
    country: "EMIRADOS ÁRABES",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    slug: "#",
    tag: "Empreendimento",
  },
];

const getImageUrl = (img?: string) => {
  if (!img) return MOCK_PROPERTIES[0].images[0];
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
  const { t } = useTranslation();
  const [properties, setProperties] = useState<any[]>([]);
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_URL}/markets/properties/featured`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Limitar a no máximo 3 propriedades
          const limitedData = data.slice(0, 3);
          const realProperties = limitedData.map((p: any) => ({
            id: p.id,
            title: p.title || p.market?.name || "IMÓVEL EXCLUSIVO",
            subtitle: p.subtitle || "",
            description: truncate(p.description, 300) || "Descrição indisponível.",
            details: truncate(p.details, 300) || truncate(p.additionalInfo, 300) || "",
            country: p.location || "GLOBAL",
            images: p.images && p.images.length > 0 ? p.images.map(getImageUrl) : [MOCK_PROPERTIES[0].images[0]],
            floorPlan: p.floorPlan ? getImageUrl(p.floorPlan) : "",
            slug: p.market?.slug ? `/services/real-estate/${p.market.slug}` : "#",
            tag: p.tag || "Empreendimento",
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

  const nextImage = (propertyId: number, maxImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % maxImages
    }));
  };

  const prevImage = (propertyId: number, maxImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + maxImages) % maxImages
    }));
  };

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

      // properties.length properties * 2 views each
      const totalScreens = properties.length * 2;
      const tx = -(progress * (totalScreens - 1) * 100);
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

  if (properties.length === 0) return null;
  const totalScreens = properties.length * 2;

  return (
    <section
      ref={targetRef}
      style={{ height: `${totalScreens * 300}vh` }}
      className="relative bg-[#832C35]"
    >
      {/* ── STICKY VIEWPORT (100dvh para mobile) ── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#832C35] flex flex-col">
        {/* Textura de fundo */}
        <div className="absolute inset-0 z-0">
          <img src={fundoImovel} alt="" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        </div>
        
        {/* HEADER REMOVIDO PARA DAR MAIS ESPAÇO E LIMPEZA VISUAL */}

        {/* ── CARDS COM SCROLL HORIZONTAL (2 VIEWS POR IMÓVEL) ── */}
        <div ref={scrollContainerRef} className="flex h-full w-max will-change-transform">
          {properties.map((property) => {
            const currentImgIndex = currentImageIndices[property.id] || 0;
            const images = property.images;

            return (
              <React.Fragment key={property.id}>
                
                {/* --- FIRST VIEW: DESCRIÇÃO (ESQ) + PLANTA (DIR) --- */}
                <div className="h-[100dvh] w-screen flex-shrink-0 flex items-center pt-28 md:pt-48 pb-8">
                   <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-10 w-full container mx-auto px-6 lg:px-8 h-full">
                      
                      {/* Descrição (Esquerda) */}
                      <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center text-white h-full pr-0 md:pr-12 border-r-0 md:border-r border-white/10 overflow-y-auto custom-scrollbar md:overflow-visible">
                         <div className="mb-4">
                           <div className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit mb-3">
                              <MapPin className="w-3 h-3 text-white" />
                              <span className="text-[10px] md:text-xs font-light tracking-widest text-white uppercase">
                                {property.country || t('featured_properties.global_location')}
                              </span>
                           </div>
                           <p className="text-[10px] md:text-xs font-light tracking-[0.2em] text-white/50 uppercase mb-2">{t('featured_properties.about_property')}</p>
                           <h3 className="text-3xl md:text-4xl font-light uppercase leading-tight mb-2">
                             {property.title} <br />
                             <span className="text-lg text-white/50">{property.subtitle}</span>
                           </h3>
                         </div>
                         
                         <p className="text-sm font-light text-white/90 leading-relaxed mb-4 line-clamp-4">
                           {property.description}
                         </p>
                         <p className="text-xs text-white/70 font-light leading-relaxed mb-6 line-clamp-4">
                           {property.details}
                         </p>
                         
                         <div className="mt-auto pointer-events-auto shrink-0 mb-4 md:mb-0">
                           <Link to={property.slug} className="inline-block hover:scale-105 transition-transform duration-300">
                             <Button className="bg-white text-[#832C35] hover:bg-white/90 rounded-none px-6 py-4 md:px-8 md:py-6 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase shadow-xl">
                                {t('featured_properties.view_details')}
                             </Button>
                           </Link>
                         </div>
                      </div>

                      {/* Planta (Direita) */}
                      <div className="md:col-span-7 lg:col-span-7 flex flex-col items-center justify-center h-full relative">
                         <h4 className="absolute top-0 md:top-4 left-0 md:left-10 text-xs md:text-sm uppercase font-light tracking-widest text-white/70 flex items-center gap-2">
                            <Maximize2 className="w-4 h-4" /> {t('featured_properties.floor_plan')}
                         </h4>
                         
                         <div 
                           className="w-full max-w-3xl bg-white/5 rounded-3xl p-6 md:p-12 border border-white/10 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md relative group overflow-hidden mt-8 md:mt-0 aspect-square md:aspect-auto md:h-[75%] cursor-pointer"
                           onClick={() => property.floorPlan && setLightboxImage(property.floorPlan)}
                         >
                            {property.floorPlan ? (
                              <>
                                <img 
                                  src={property.floorPlan} 
                                  alt={`Planta ${property.title}`} 
                                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 mix-blend-screen" 
                                />
                                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity border border-white/30">
                                  <Maximize2 className="w-5 h-5 text-white" />
                                </div>
                              </>
                            ) : (
                              <div className="text-center text-white/40 space-y-4">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto opacity-50 w-12 h-12 md:w-16 md:h-16"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="9" y1="3" y2="21"/><path d="M14 3v5h5"/><path d="M14 12v9"/></svg>
                                 <p className="uppercase tracking-widest text-xs md:text-sm font-medium">{t('featured_properties.floor_plan_unavailable')}</p>
                                 <p className="text-[10px] md:text-xs max-w-xs mx-auto px-4">{t('featured_properties.floor_plan_contact')}</p>
                              </div>
                            )}
                         </div>

                         <div className="absolute bottom-0 right-0 md:bottom-10 md:right-10 text-white/50 animate-pulse text-[10px] md:text-sm font-light tracking-widest uppercase flex items-center gap-2">
                             {t('featured_properties.photos')} <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* --- SECOND VIEW: FOTOS FULL SCREEN --- */}
                <div className="h-[100dvh] w-screen flex-shrink-0 relative bg-black group overflow-hidden">
                   
                   <img 
                     src={images[currentImgIndex]} 
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 cursor-pointer" 
                     alt={property.title}
                     onClick={() => setLightboxImage(images[currentImgIndex])}
                   />
                   
                   {/* Overlay Gradient for readability of overlays */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 w-full px-4">
                      <h3 className="text-5xl md:text-7xl lg:text-9xl font-light uppercase tracking-[0.2em] text-white opacity-90 drop-shadow-2xl">{property.title}</h3>
                      <p className="text-white/80 uppercase tracking-[0.5em] text-sm md:text-xl mt-4 drop-shadow-lg font-medium">{property.subtitle}</p>
                   </div>

                   {images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12 pointer-events-none z-20">
                         <button 
                           onClick={() => prevImage(property.id, images.length)} 
                           className="pointer-events-auto p-4 md:p-6 bg-black/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-black transition-all duration-500 opacity-60 hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 border border-white/20"
                         >
                           <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                         </button>
                         <button 
                           onClick={() => nextImage(property.id, images.length)} 
                           className="pointer-events-auto p-4 md:p-6 bg-black/20 hover:bg-white backdrop-blur-md rounded-full text-white hover:text-black transition-all duration-500 opacity-60 hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 border border-white/20"
                         >
                           <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                         </button>
                      </div>
                   )}
                   
                   {/* Dots and Tags */}
                   <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center gap-6 z-20">
                      {images.length > 1 && (
                        <div className="flex gap-3 pointer-events-auto">
                          {images.map((_, idx) => (
                            <button
                              key={idx} 
                              onClick={() => setCurrentImageIndices(prev => ({ ...prev, [property.id]: idx }))}
                              className={`h-2 transition-all duration-500 rounded-full ${currentImgIndex === idx ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-white/70">
                         <div className="bg-[#832C35] text-white px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-2xl">
                           {property.tag}
                         </div>
                         <div className="hidden md:flex animate-pulse text-xs font-light tracking-widest uppercase items-center gap-2">
                             {t('featured_properties.next_property')} <ChevronRight className="w-4 h-4" />
                         </div>
                      </div>
                   </div>

                </div>

              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── LIGHTBOX FULLSCREEN ── */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-6 right-6 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:scale-110"
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage} 
             alt={t('featured_properties.fullscreen_view')} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;