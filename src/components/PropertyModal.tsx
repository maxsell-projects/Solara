import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Maximize2, Play, Image as ImageIcon, ZoomIn, ZoomOut, RotateCcw,
  ChevronLeft, ChevronRight
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setActiveTab('photos');
    setLightboxOpen(false);
    setZoomLevel(1);
  }, [property]);

  if (!property) return null;

  const hasPhotos = property.images && property.images.length > 0;
  const hasFloorPlan = !!property.floorPlan;
  const hasVideo = !!property.videoUrl;

  const openLightbox = (imageSrc: string, index: number = 0) => {
    setLightboxImage(imageSrc);
    setLightboxIndex(index);
    setZoomLevel(1);
    setLightboxOpen(true);
  };

  const lightboxNext = () => {
    if (!hasPhotos) return;
    const nextIndex = (lightboxIndex + 1) % property.images.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(getFullImageUrl(property.images[nextIndex]));
    setZoomLevel(1);
  };

  const lightboxPrev = () => {
    if (!hasPhotos) return;
    const prevIndex = (lightboxIndex - 1 + property.images.length) % property.images.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(getFullImageUrl(property.images[prevIndex]));
    setZoomLevel(1);
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

    {/* ── LIGHTBOX FULLSCREEN COM ZOOM ── */}
    {lightboxOpen && createPortal(
      <div 
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col animate-in fade-in duration-200"
        onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setLightboxOpen(false);
          if (e.key === 'ArrowRight' && hasPhotos && property.images.length > 1) lightboxNext();
          if (e.key === 'ArrowLeft' && hasPhotos && property.images.length > 1) lightboxPrev();
        }}
        tabIndex={0}
        ref={(el) => el?.focus()}
      >
        {/* Barra Superior */}
        <div className="flex items-center justify-between p-4 md:p-6 z-50 shrink-0">
          {/* Controles de Zoom */}
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1.5 border border-white/20">
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.max(0.25, prev - 0.25)); }}
              className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              title="Diminuir"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white/80 text-xs font-mono min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.min(4, prev + 0.25)); }}
              className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              title="Aumentar"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomLevel(1); }}
              className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              title="Redefinir"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Contador + Fechar */}
          <div className="flex items-center gap-3">
            {hasPhotos && property.images.length > 1 && activeTab === 'photos' && (
              <span className="text-white/60 text-sm font-mono">{lightboxIndex + 1} / {property.images.length}</span>
            )}
            <button
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:scale-110"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Área da Imagem + Setas */}
        <div className="flex-1 relative flex items-center justify-center min-h-0">
          
          {/* Seta Esquerda */}
          {hasPhotos && property.images.length > 1 && activeTab === 'photos' && (
            <button 
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:scale-110"
              onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          {/* Imagem */}
          <div 
            className="flex-1 flex items-center justify-center overflow-auto h-full px-16 md:px-24 py-4"
            onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false); }}
          >
            <img 
              src={lightboxImage} 
              alt="Visualização em tela cheia" 
              className="max-w-full max-h-full transition-transform duration-300 ease-out rounded-lg shadow-2xl cursor-grab active:cursor-grabbing select-none"
              style={{ transform: `scale(${zoomLevel})` }}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Seta Direita */}
          {hasPhotos && property.images.length > 1 && activeTab === 'photos' && (
            <button 
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/20 hover:scale-110"
              onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}
        </div>

        {/* Indicador de fotos (dots) */}
        {hasPhotos && property.images.length > 1 && activeTab === 'photos' && (
          <div className="flex justify-center gap-2 pb-6 shrink-0">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(idx);
                  setLightboxImage(getFullImageUrl(img));
                  setZoomLevel(1);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${lightboxIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>
    , document.body)}
    </>
  );
}
