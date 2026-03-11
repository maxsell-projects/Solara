import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { 
  X, MapPin, TrendingUp, Calendar, Home, Info, Download, 
  Maximize2, Play, Image as ImageIcon
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getFullImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

interface Property {
  id: number;
  description: string;
  images: string[];
  location?: string;
  typology?: string;
  status?: string;
  estimatedProfitability?: string;
  deliveryDate?: string;
  floorPlan?: string;
  videoUrl?: string;
}

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  marketName?: string;
}

export function PropertyModal({ property, isOpen, onClose, marketName }: PropertyModalProps) {
  const [activeTab, setActiveTab] = useState<'photos' | 'floorPlan' | 'video'>('photos');

  useEffect(() => {
    setActiveTab('photos');
  }, [property]);

  if (!property) return null;

  const hasPhotos = property.images && property.images.length > 0;
  const hasFloorPlan = !!property.floorPlan;
  const hasVideo = !!property.videoUrl;

  // ── LIGHTBOX 100% VANILLA JS ──
  const openLightbox = (imageSrc: string, startIndex: number = 0) => {
    let currentIndex = startIndex;
    let currentZoom = 1;
    const images = property.images?.map(img => getFullImageUrl(img)) || [imageSrc];

    // Cria overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;animation:fadeIn .2s ease';

    // Função para destruir
    const destroy = () => { 
      document.removeEventListener('keydown', onKey); 
      overlay.remove(); 
    };

    // ── TOP BAR ──
    const topBar = document.createElement('div');
    topBar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px 24px;flex-shrink:0';

    // Zoom controls
    const zoomGroup = document.createElement('div');
    zoomGroup.style.cssText = 'display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.1);border-radius:999px;padding:6px;border:1px solid rgba(255,255,255,0.2)';

    const makeBtn = (text: string, onClick: () => void, extra: string = '') => {
      const btn = document.createElement('button');
      btn.innerHTML = text;
      btn.style.cssText = `padding:10px;border-radius:999px;border:none;background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;display:flex;align-items:center;font-size:18px;${extra}`;
      btn.onmouseenter = () => { btn.style.color = '#fff'; btn.style.background = 'rgba(255,255,255,0.1)'; };
      btn.onmouseleave = () => { btn.style.color = 'rgba(255,255,255,0.7)'; btn.style.background = 'transparent'; };
      btn.onclick = (e) => { e.stopPropagation(); onClick(); };
      return btn;
    };

    const zoomLabel = document.createElement('span');
    zoomLabel.style.cssText = 'color:rgba(255,255,255,0.8);font-size:12px;font-family:monospace;min-width:3rem;text-align:center';
    const updateZoomLabel = () => { zoomLabel.textContent = Math.round(currentZoom * 100) + '%'; };
    updateZoomLabel();

    zoomGroup.append(
      makeBtn('−', () => { currentZoom = Math.max(0.25, currentZoom - 0.25); updateImg(); }),
      zoomLabel,
      makeBtn('+', () => { currentZoom = Math.min(4, currentZoom + 0.25); updateImg(); }),
      makeBtn('↺', () => { currentZoom = 1; updateImg(); })
    );

    // Counter + Close
    const rightGroup = document.createElement('div');
    rightGroup.style.cssText = 'display:flex;align-items:center;gap:12px';

    const counter = document.createElement('span');
    counter.style.cssText = 'color:rgba(255,255,255,0.6);font-size:14px;font-family:monospace';
    const updateCounter = () => { counter.textContent = `${currentIndex + 1} / ${images.length}`; };
    if (images.length > 1) { updateCounter(); rightGroup.append(counter); }

    const closeBtn = makeBtn('✕', destroy, 'width:48px;height:48px;justify-content:center;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);font-size:20px');
    rightGroup.append(closeBtn);

    topBar.append(zoomGroup, rightGroup);

    // ── IMAGE AREA ──
    const imgArea = document.createElement('div');
    imgArea.style.cssText = 'flex:1;display:flex;align-items:center;justify-content:center;position:relative;min-height:0;overflow:auto';
    imgArea.onclick = (e) => { if (e.target === imgArea) destroy(); };

    const img = document.createElement('img');
    img.style.cssText = 'max-width:90%;max-height:90%;transition:transform .3s ease;border-radius:8px;box-shadow:0 25px 50px rgba(0,0,0,0.5);user-select:none';
    img.draggable = false;
    img.onclick = (e) => e.stopPropagation();

    const updateImg = () => {
      img.src = images[currentIndex];
      img.style.transform = `scale(${currentZoom})`;
      updateZoomLabel();
      if (images.length > 1) updateCounter();
    };
    updateImg();
    imgArea.append(img);

    // ── ARROWS ──
    if (images.length > 1) {
      const makeArrow = (isLeft: boolean, onClick: () => void) => {
        const arrow = document.createElement('button');
        arrow.innerHTML = isLeft ? '‹' : '›';
        arrow.style.cssText = `position:absolute;${isLeft ? 'left:12px' : 'right:12px'};top:50%;transform:translateY(-50%);z-index:10;width:56px;height:56px;border-radius:999px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.15);color:white;font-size:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s`;
        arrow.onmouseenter = () => { arrow.style.background = 'rgba(255,255,255,0.3)'; arrow.style.transform = 'translateY(-50%) scale(1.1)'; };
        arrow.onmouseleave = () => { arrow.style.background = 'rgba(255,255,255,0.15)'; arrow.style.transform = 'translateY(-50%) scale(1)'; };
        arrow.onclick = (e) => { e.stopPropagation(); onClick(); };
        return arrow;
      };

      imgArea.append(
        makeArrow(true, () => { currentIndex = (currentIndex - 1 + images.length) % images.length; currentZoom = 1; updateImg(); }),
        makeArrow(false, () => { currentIndex = (currentIndex + 1) % images.length; currentZoom = 1; updateImg(); })
      );
    }

    // ── DOTS ──
    if (images.length > 1) {
      const dotsContainer = document.createElement('div');
      dotsContainer.style.cssText = 'display:flex;justify-content:center;gap:8px;padding-bottom:24px;flex-shrink:0';

      const dots: HTMLButtonElement[] = [];
      images.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.style.cssText = `height:8px;border-radius:999px;border:none;cursor:pointer;transition:all .3s;${idx === currentIndex ? 'width:32px;background:white' : 'width:8px;background:rgba(255,255,255,0.4)'}`;
        dot.onclick = (e) => { e.stopPropagation(); currentIndex = idx; currentZoom = 1; updateImg(); updateDots(); };
        dots.push(dot);
        dotsContainer.append(dot);
      });

      const updateDots = () => {
        dots.forEach((d, i) => {
          d.style.width = i === currentIndex ? '32px' : '8px';
          d.style.background = i === currentIndex ? 'white' : 'rgba(255,255,255,0.4)';
        });
      };

      // Patch updateImg to also update dots
      const origUpdateImg = updateImg;
      const patchedUpdate = () => { origUpdateImg(); updateDots(); };
      img.parentElement?.querySelectorAll('button').forEach(b => {
        const origClick = b.onclick;
        if (origClick) b.onclick = (e) => { (origClick as any)(e); updateDots(); };
      });

      overlay.append(topBar, imgArea, dotsContainer);
    } else {
      overlay.append(topBar, imgArea);
    }

    // ── KEYBOARD ──
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') destroy();
      if (e.key === 'ArrowRight' && images.length > 1) { currentIndex = (currentIndex + 1) % images.length; currentZoom = 1; updateImg(); }
      if (e.key === 'ArrowLeft' && images.length > 1) { currentIndex = (currentIndex - 1 + images.length) % images.length; currentZoom = 1; updateImg(); }
    };
    document.addEventListener('keydown', onKey);

    // Add fade animation
    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
    overlay.append(style);

    document.body.append(overlay);
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-full xl:max-w-[90vw] p-0 overflow-hidden bg-white border-0 shadow-2xl [&>button]:hidden rounded-3xl h-[95vh] md:h-[90vh] flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Detalhes do Imóvel</DialogTitle>
          <DialogDescription>
              Galeria de fotos, planta e ficha técnica detalhada.
          </DialogDescription>
        </DialogHeader>

        {/* Header Superior do Modal */}
        <div className="absolute top-0 w-full z-50 flex justify-between items-center p-4 md:p-6 pointer-events-none">
           <div className="pointer-events-auto flex items-center bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-black/5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#832C35]">Ref #{property.id}</span>
           </div>
           
           <button 
             onClick={onClose}
             className="pointer-events-auto w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm border border-black/5 text-neutral-800"
             aria-label="Fechar Modal"
           >
             <X className="w-5 h-5" />
           </button>
        </div>
        
        <div className="flex flex-col lg:flex-row w-full h-full pt-16 lg:pt-0">
          
          {/* Esquerda: Mídia (Galeria / Planta / Vídeo) */}
          <div className="w-full lg:w-[65%] h-[55%] lg:h-full bg-neutral-900 relative flex flex-col overflow-hidden">
            
            {/* Abas de Navegação de Mídia */}
            <div className="absolute top-4 lg:top-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-xl p-1.5 rounded-full border border-white/10">
               <button 
                 onClick={() => setActiveTab('photos')}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${activeTab === 'photos' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
               >
                 <ImageIcon className="w-4 h-4" /> Fotos
               </button>
               {hasFloorPlan && (
                 <button 
                   onClick={() => setActiveTab('floorPlan')}
                   className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${activeTab === 'floorPlan' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
                 >
                   <Maximize2 className="w-4 h-4" /> Planta
                 </button>
               )}
               {hasVideo && (
                 <button 
                   onClick={() => setActiveTab('video')}
                   className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${activeTab === 'video' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
                 >
                   <Play className="w-4 h-4" /> Vídeo
                 </button>
               )}
            </div>

            {/* Conteúdo da Mídia */}
            <div className="flex-1 w-full h-full relative overflow-hidden">
              
              {/* === FOTOS === */}
              {activeTab === 'photos' && (
                  hasPhotos ? (
                    <Carousel className="w-full h-full group">
                      <CarouselContent className="h-full">
                        {property.images.map((img, idx) => (
                          <CarouselItem key={idx} className="h-full">
                            <div 
                              className="w-full h-full relative cursor-pointer group/img overflow-hidden"
                              onClick={() => openLightbox(getFullImageUrl(img), idx)}
                            >
                               <img 
                                 src={getFullImageUrl(img)} 
                                 alt={`Foto ${idx + 1}`} 
                                 className="w-full h-full object-cover"
                               />
                               {/* Ícone de ampliar no hover */}
                               <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full p-3 opacity-0 group-hover/img:opacity-100 transition-opacity border border-white/20">
                                 <Maximize2 className="w-5 h-5 text-white" />
                               </div>
                               {/* Overlay inferior em mobile */}
                               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent lg:hidden pointer-events-none" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      
                      {property.images.length > 1 && (
                        <>
                          <CarouselPrevious className="left-6 bg-black/20 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CarouselNext className="right-6 bg-black/20 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
                      <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                      <span className="text-sm tracking-widest uppercase font-medium">Sem imagens disponíveis</span>
                    </div>
                  )
              )}

              {/* === PLANTA === */}
              {activeTab === 'floorPlan' && (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center p-8 lg:p-16 bg-[#F8F9FA] cursor-pointer group/plan"
                    onClick={() => openLightbox(getFullImageUrl(property.floorPlan!))}
                  >
                     <img 
                       src={getFullImageUrl(property.floorPlan!)} 
                       alt={`Planta ${property.typology || 'do imóvel'}`} 
                       className="w-full h-full object-contain mix-blend-multiply"
                     />
                     <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md rounded-full p-3 opacity-0 group-hover/plan:opacity-100 transition-opacity border border-white/20">
                       <Maximize2 className="w-5 h-5 text-white" />
                     </div>
                  </div>
              )}

              {/* === VÍDEO === */}
              {activeTab === 'video' && (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                     <video 
                       className="w-full h-full object-contain"
                       controls
                       autoPlay
                     >
                        <source src={getFullImageUrl(property.videoUrl!)} type="video/mp4" />
                        Seu navegador não suporta a tag de vídeo.
                     </video>
                  </div>
              )}
            </div>
          </div>

          {/* Direita: Info Completa */}
          <div className="w-full lg:w-[35%] h-[55%] lg:h-full bg-white flex flex-col relative custom-scrollbar overflow-y-auto">
            
            <div className="flex-1 p-8 lg:p-12">
              
              {/* Header Info */}
              <div className="mb-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                      {property.status && (
                          <Badge className="bg-[#832C35] hover:bg-[#832C35]/90 text-white font-medium uppercase tracking-widest px-3 py-1 text-[10px]">
                              {property.status}
                          </Badge>
                      )}
                      
                      {property.typology && (
                          <Badge variant="outline" className="border-neutral-200 text-neutral-600 font-medium uppercase tracking-widest px-3 py-1 text-[10px]">
                              {property.typology}
                          </Badge>
                      )}
                  </div>
                
                <h3 className="text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight leading-[1.15] mb-4">
                  {property.typology ? `${property.typology} em ` : 'Imóvel em '}
                  <span className="font-normal">{property.location || marketName || 'Localização Exclusiva'}</span>
                </h3>

                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[#832C35]">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {property.location || marketName || 'Global'}
                </div>
              </div>
              
              {/* GRID DE FICHA TÉCNICA */}
              <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 flex flex-col gap-6 mb-10">
                  <h4 className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Ficha Técnica</h4>
                  
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                      {property.estimatedProfitability && (
                          <div className="space-y-1.5">
                              <span className="text-[10px] uppercase text-neutral-500 font-medium flex items-center gap-1.5">
                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Rentabilidade
                              </span>
                              <p className="text-lg font-semibold text-neutral-900">{property.estimatedProfitability}</p>
                          </div>
                      )}
                      
                      {property.deliveryDate && (
                          <div className="space-y-1.5">
                              <span className="text-[10px] uppercase text-neutral-500 font-medium flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" /> Entrega
                              </span>
                              <p className="text-base font-medium text-neutral-900">
                                  {new Date(property.deliveryDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                              </p>
                          </div>
                      )}

                      {property.typology && (
                          <div className="space-y-1.5">
                              <span className="text-[10px] uppercase text-neutral-500 font-medium flex items-center gap-1.5">
                                  <Home className="w-3.5 h-3.5" /> Tipologia
                              </span>
                              <p className="text-base font-medium text-neutral-900">{property.typology}</p>
                          </div>
                      )}

                      <div className="space-y-1.5">
                          <span className="text-[10px] uppercase text-neutral-500 font-medium flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5" /> Referência
                          </span>
                          <p className="text-base font-medium text-neutral-900">#{property.id}</p>
                      </div>
                  </div>
              </div>

              {/* DESCRIÇÃO */}
              <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Sobre o Imóvel</h4>
                  <div className="prose prose-sm lg:prose-base text-neutral-600 font-light leading-relaxed whitespace-pre-wrap text-justify">
                    {property.description}
                  </div>
              </div>

            </div>

            {/* RODAPÉ DO CONTEÚDO */}
            <div className="p-8 lg:p-12 pt-6 lg:pt-8 border-t border-neutral-100 bg-white sticky bottom-0 z-10 w-full mt-auto">
              <Button 
                className="w-full bg-[#832C35] hover:bg-[#832C35]/90 h-16 rounded-xl text-sm font-medium tracking-[0.15em] uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mb-4"
                onClick={() => {
                  if (hasPhotos) {
                    window.open(getFullImageUrl(property.images[0]), '_blank');
                  }
                }}
              >
                <Download className="w-4 h-4 mr-3" />
                Baixar Apresentação
              </Button>
              <p className="text-xs text-center text-neutral-400">
                A nossa equipa de especialistas está pronta para agendar a sua visita virtual ou presencial.
              </p>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>

    </>
  );
}
