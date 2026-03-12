import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import retanguloImg from "@/assets/Retangulo.webp";
import camilaImg from "@/assets/camila.png";

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
          // Limitar a 2 propriedades
          const limitedData = data.slice(0, 2);
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
          setProperties(MOCK_PROPERTIES.slice(0, 2));
        }
      } catch (error) {
        setProperties(MOCK_PROPERTIES.slice(0, 2));
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

      // 1 property * 3 views
      const totalScreens = properties.length * 3;
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
  const totalScreens = properties.length * 3;

  return (
    <section
      ref={targetRef}
      style={{ height: `${totalScreens * 300}vh` }}
      className="relative bg-[#1D1D1B]"
    >
      {/* ── STICKY VIEWPORT (100dvh para mobile) ── */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col">

        {/* ── CARDS COM SCROLL HORIZONTAL (3 VIEWS POR IMÓVEL) ── */}
        <div ref={scrollContainerRef} className="flex h-full w-max will-change-transform">
          {properties.map((property) => {
            const currentImgIndex = currentImageIndices[property.id] || 0;
            const images = property.images;

            return (
              <React.Fragment key={property.id}>

                {/* --- FIRST VIEW: PLANTA (DARK BG) --- Identical to reference --- */}
                <div className="h-[100dvh] w-screen flex-shrink-0 flex items-stretch bg-[#1D1D1B] relative overflow-hidden pt-20 md:pt-24">
                  {/* Left panel: Feature details */}
                  <div className="w-full md:w-[38%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-10 md:py-8 relative z-10">
                    {/* Plan label */}
                    <p className="text-[10px] md:text-xs font-light tracking-[0.3em] text-[#F39C6C]/60 uppercase mb-8 md:mb-12">
                      {property.tag || t('featured_properties.plan_label', 'PLANTA FINAL 1')}
                    </p>

                    {/* Property title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#F39C6C] leading-tight uppercase mb-2">
                      {property.title}
                    </h3>
                    {property.subtitle && (
                      <p className="text-lg md:text-xl text-[#F39C6C]/50 font-light mb-6">
                        {property.subtitle}
                      </p>
                    )}
                    <div className="w-full max-w-[280px] h-px bg-[#F39C6C]/30 my-4 md:my-5" />

                    {/* Description */}
                    <p className="text-base md:text-lg font-light text-[#F39C6C]/90 leading-relaxed mb-4">
                      {property.description}
                    </p>
                    <div className="w-full max-w-[280px] h-px bg-[#F39C6C]/30 my-4 md:my-5" />

                    {/* Details */}
                    {property.details && (
                      <>
                        <p className="text-sm md:text-base text-white/50 font-light leading-relaxed mb-4">
                          {property.details}
                        </p>
                        <div className="w-full max-w-[280px] h-px bg-[#F39C6C]/30 my-4 md:my-5" />
                      </>
                    )}

                    {/* Country */}
                    <div className="mt-auto">
                      <h4 className="text-xl md:text-2xl lg:text-3xl font-light text-white/90">
                        {property.country}
                      </h4>
                    </div>
                  </div>

                  {/* Right panel: Floor plan image */}
                  <div className="hidden md:flex md:w-[62%] flex-col relative">
                    {/* Top bar with highlight text */}
                    <div className="flex items-center justify-center py-3 bg-[#2a2a28] border-b border-white/5">
                      <p className="text-xs md:text-sm text-white/70 font-light tracking-wide">
                        {property.title}{' '}
                        <span className="font-semibold text-white">{property.subtitle}</span>
                      </p>
                    </div>

                    {/* Floor plan container */}
                    <div
                      className="flex-1 bg-white relative group cursor-pointer overflow-hidden"
                      onClick={() => property.floorPlan && setLightboxImage(property.floorPlan)}
                    >
                      {property.floorPlan ? (
                        <>
                          <img
                            src={property.floorPlan}
                            alt={`Planta ${property.title}`}
                            className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Magnify button top-right */}
                          <button
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center text-[#1D1D1B] transition-all shadow-lg border border-black/10 hover:scale-110"
                            onClick={(e) => { e.stopPropagation(); property.floorPlan && setLightboxImage(property.floorPlan); }}
                          >
                            <Maximize2 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#1D1D1B]/30 space-y-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 opacity-40"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="9" x2="9" y1="3" y2="21" /><path d="M14 3v5h5" /><path d="M14 12v9" /></svg>
                          <p className="uppercase tracking-widest text-sm font-medium">{t('featured_properties.floor_plan_unavailable')}</p>
                          <p className="text-xs max-w-xs text-center">{t('featured_properties.floor_plan_contact')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- SECOND VIEW: FOTOS FULL SCREEN --- BACKGROUND: IMAGE --- */}
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

                  {/* Tag - top left */}
                  <div className="absolute top-24 md:top-28 left-6 md:left-10 flex items-center gap-3 z-30">
                    <div className="bg-[#F39C6B] text-white px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-2xl">
                      {property.tag}
                    </div>
                  </div>

                  {/* Dots - bottom center */}
                  <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center gap-4 z-20">
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
                    <div className="hidden md:flex animate-pulse text-white/70 text-xs font-light tracking-widest uppercase items-center gap-2">
                      {t('featured_properties.next_property')} <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* --- THIRD VIEW: QUOTE --- BACKGROUND: PEACH SUNSET --- */}
                <div className="h-[100dvh] w-screen flex-shrink-0 flex items-stretch bg-[#F39C6C] relative overflow-hidden pt-20 md:pt-24">
                  <div className="w-full flex flex-col md:flex-row items-center md:items-stretch">
                    
                    {/* Left column: intro text + decorative element */}
                    <div className="w-full md:w-[38%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-10 md:py-8">
                      <p className="text-sm md:text-base text-[#1D1D1B]/80 font-light leading-relaxed max-w-xs mb-8">
                        {property.details || t('featured_properties.quote_architect_intro', 'Camila Montenegro entrega a planta com a melhor performance do segmento.')}
                      </p>
                      
                      {/* Barcode decorative element */}
                      <div className="flex items-end gap-[1px] h-8 opacity-60">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-[#1D1D1B]/70"
                            style={{
                              width: Math.random() > 0.5 ? '3px' : '1.5px',
                              height: `${12 + Math.random() * 18}px`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right column: large quote */}
                    <div className="w-full md:w-[62%] flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 md:py-0 relative">
                      
                      {/* Quote block with inline marks */}
                      <div className="relative">
                        {/* Opening quotation marks - inline above text */}
                        <span className="text-white/40 text-[60px] md:text-[80px] font-serif leading-none block mb-[-20px] md:mb-[-30px] select-none" style={{ fontFamily: 'Georgia, serif' }}>
                          &ldquo;&ldquo;
                        </span>

                        <h2 className="text-2xl md:text-[2.5rem] lg:text-[2.8rem] xl:text-[3.2rem] font-extralight text-white leading-[1.25] md:leading-[1.3] tracking-tight max-w-2xl whitespace-pre-line">
                          {t('featured_properties.quote_text', 'Os ambientes foram\ndesenhados  para oferecer\nespaços iguais ou até\nmaiores do que em\napartamentos de 300, 400m²')}
                        </h2>

                        {/* Closing quotation marks - inline after text */}
                        <span className="text-white/40 text-[60px] md:text-[80px] font-serif leading-none block text-right mt-[-10px] md:mt-[-15px] select-none" style={{ fontFamily: 'Georgia, serif' }}>
                          &rdquo;&rdquo;
                        </span>
                      </div>

                      {/* Author section - right below quote */}
                      <div className="flex items-center gap-4 mt-4 md:mt-6">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg flex-shrink-0">
                          <img src={camilaImg} alt="Camila" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm md:text-base">
                            {t('featured_properties.quote_author_name', 'Camila Montenegro')}
                          </p>
                          <p className="text-[#1D1D1B]/60 text-xs md:text-sm font-light">
                            {t('featured_properties.quote_author_role', 'CEO & Founder')}
                          </p>
                        </div>
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