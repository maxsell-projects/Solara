import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { ArrowLeft, MapPin, Loader2, Home, Download, X, Calendar, TrendingUp, Info } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL;

// Configuração do Ícone Padrão do Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Interfaces Atualizadas ---
interface Property {
  id: number;
  description: string;
  images: string[];
  // Novos campos opcionais
  location?: string;
  typology?: string;
  status?: string;
  estimatedProfitability?: string;
  deliveryDate?: string;
}

interface MarketDetail {
  id: number;
  name: string;
  tag: string;
  fullDescription: string;
  mapLat: number;
  mapLng: number;
  mapZoom: number;
  pins: { city: string; lat: number; lng: number }[];
  imageUrl: string;
  properties: Property[]; 
}

// --- Componente Auxiliar para Ajustar o Zoom aos Pinos ---
const FitBounds = ({ pins, center, zoom }: { pins: any[], center: [number, number], zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    if (pins && pins.length > 0) {
      const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, zoom);
    }
  }, [map, pins, center, zoom]);

  return null;
};

const RealEstateDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para controlar qual imóvel está aberto no Modal
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/markets/${slug}`)
      .then(res => res.json())
      .then(data => {
        setMarket(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [slug]);

  // Helper para montar URL da imagem
  const getFullImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-10 h-10 text-solara-vinho" />
      <p className="ml-4 text-neutral-500">{t('market_detail.loading')}</p>
    </div>
  );
  
  if (!market) return (
    <div className="min-h-screen flex items-center justify-center">
      {t('market_detail.not_found')}
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <Link to="/services/real-estate">
            <Button variant="link" className="text-white/60 hover:text-white p-0 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t('market_detail.btn_back')}
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div>
              <Badge className="bg-solara-vinho hover:bg-solara-vinho/90 mb-4">{market.tag}</Badge>
              <h1 className="text-5xl md:text-6xl font-light">{market.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Layout Principal: Texto + Mapa */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* Coluna da Esquerda: Texto */}
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-solara-vinho">{t('market_detail.section_vision')}</h2>
            
            <div 
              className="prose prose-lg text-gray-600 font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: market.fullDescription }}
            />
            
            <div className="pt-8">
              <h3 className="text-xl font-medium mb-4">
                {t('market_detail.why_invest')} {market.name}?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-600 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-solara-vinho mt-2.5" />
                  {t('market_detail.reason_demand')}
                </li>
                <li className="flex items-start gap-3 text-gray-600 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-solara-vinho mt-2.5" />
                  {t('market_detail.reason_tax')}
                </li>
              </ul>
            </div>
          </div>

          {/* Coluna da Direita: Mapa */}
          <div className="h-[600px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 sticky top-32">
            <MapContainer 
              center={[market.mapLat, market.mapLng]} 
              zoom={market.mapZoom} 
              scrollWheelZoom={false} 
              className="h-full w-full"
            >
              <FitBounds 
                pins={market.pins || []} 
                center={[market.mapLat, market.mapLng]} 
                zoom={market.mapZoom}
              />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              
              {market.pins && market.pins.map((pin, idx) => (
                <Marker key={idx} position={[pin.lat, pin.lng]}>
                  <Popup className="font-sans text-sm">
                    <div className="text-center">
                      <strong className="block text-solara-vinho text-base mb-1">{pin.city}</strong>
                      <span className="text-gray-500">{t('market_detail.map_area')}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 z-[400]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-solara-vinho" />
                <p className="text-sm font-medium text-gray-700">
                  {market.pins ? market.pins.length : 0} {t('market_detail.map_active')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID DE IMÓVEIS (ATUALIZADA) --- */}
        {market.properties && market.properties.length > 0 && (
          <div className="border-t pt-16">
            <h2 className="text-3xl font-light text-gray-900 mb-8 flex items-center gap-3">
              <Home className="w-8 h-8 text-solara-vinho" />
              Oportunidades Exclusivas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {market.properties.map((prop) => (
                <Card 
                  key={prop.id} 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-neutral-50 overflow-hidden flex flex-col h-full"
                  onClick={() => setSelectedProperty(prop)}
                >
                  {/* Capa com Badges */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {prop.images && prop.images.length > 0 ? (
                      <img 
                        src={getFullImageUrl(prop.images[0])} 
                        alt="Property" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Home className="text-gray-400 w-12 h-12" />
                      </div>
                    )}
                    
                    {/* Badges Flutuantes */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                       {prop.status && (
                         <Badge className="bg-black/80 backdrop-blur-md hover:bg-black text-xs font-normal tracking-wide">
                            {prop.status}
                         </Badge>
                       )}
                       {prop.typology && (
                         <Badge variant="secondary" className="backdrop-blur-md bg-white/90 text-xs font-normal">
                            {prop.typology}
                         </Badge>
                       )}
                    </div>

                    {/* Botão Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Button variant="secondary" className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>

                  {/* Conteúdo Rico */}
                  <CardContent className="p-5 flex-1 flex flex-col">
                    {prop.location && (
                        <div className="flex items-center text-xs text-solara-gold font-bold uppercase tracking-widest mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          {prop.location}
                        </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-2 font-light leading-relaxed flex-1 mb-4">
                      {prop.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
                        {/* Se houver Rentabilidade */}
                        {prop.estimatedProfitability ? (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-gray-400 font-semibold">Rentabilidade</span>
                                <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> {prop.estimatedProfitability}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-gray-400 font-semibold">Ref</span>
                                <span className="text-sm text-gray-700">#{prop.id}</span>
                            </div>
                        )}

                        {/* Se houver Data de Entrega */}
                        {prop.deliveryDate && (
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] uppercase text-gray-400 font-semibold">Entrega</span>
                                <span className="text-sm text-gray-700">
                                    {new Date(prop.deliveryDate).getFullYear()}
                                </span>
                            </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL DE DETALHES --- */}
      <Dialog open={!!selectedProperty} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-white border-none shadow-2xl [&>button]:hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Detalhes do Imóvel</DialogTitle>
            <DialogDescription>
                Galeria de fotos e ficha técnica detalhada.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid lg:grid-cols-2 h-[90vh] lg:h-[700px]">
            
            {/* Esquerda: Galeria */}
            <div className="bg-neutral-900 flex items-center justify-center relative">
              {selectedProperty?.images && selectedProperty.images.length > 0 ? (
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {selectedProperty.images.map((img, idx) => (
                      <CarouselItem key={idx} className="h-full flex items-center justify-center pt-0">
                        <div className="w-full h-full relative">
                           <img 
                             src={getFullImageUrl(img)} 
                             alt={`Foto ${idx + 1}`} 
                             className="w-full h-full object-contain"
                           />
                           {/* Overlay Degradê na base da imagem para leitura */}
                           <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none lg:hidden" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  
                  {selectedProperty.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white h-10 w-10" />
                      <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white h-10 w-10" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="text-white/50 flex flex-col items-center">
                  <Home className="w-16 h-16 mb-2" />
                  <span className="text-sm">Sem imagens disponíveis</span>
                </div>
              )}
            </div>

            {/* Direita: Info Completa */}
            <div className="p-8 lg:p-10 overflow-y-auto bg-white flex flex-col relative custom-scrollbar">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="flex-grow space-y-6">
                <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="border-solara-vinho text-solara-vinho px-3 py-1">
                            Oportunidade
                        </Badge>
                        {selectedProperty?.status && (
                            <Badge className="bg-gray-900 text-white font-normal">
                                {selectedProperty.status}
                            </Badge>
                        )}
                    </div>
                  
                  <h3 className="text-3xl font-light text-gray-900 tracking-tight leading-tight">
                    {selectedProperty?.typology ? `${selectedProperty.typology} em ` : 'Imóvel em '}
                    <span className="text-gray-500">{selectedProperty?.location || market.name}</span>
                  </h3>
                </div>
                
                {/* GRID DE FICHA TÉCNICA */}
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 grid grid-cols-2 gap-y-4 gap-x-8">
                    {selectedProperty?.estimatedProfitability && (
                        <div className="space-y-1">
                            <span className="text-xs uppercase text-gray-400 font-bold flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Rentabilidade
                            </span>
                            <p className="text-lg font-medium text-emerald-600">{selectedProperty.estimatedProfitability}</p>
                        </div>
                    )}
                    
                    {selectedProperty?.deliveryDate && (
                        <div className="space-y-1">
                            <span className="text-xs uppercase text-gray-400 font-bold flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Previsão Entrega
                            </span>
                            <p className="text-lg font-medium text-gray-800">
                                {new Date(selectedProperty.deliveryDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    )}

                    {selectedProperty?.typology && (
                        <div className="space-y-1">
                            <span className="text-xs uppercase text-gray-400 font-bold flex items-center gap-1">
                                <Home className="w-3 h-3" /> Tipologia
                            </span>
                            <p className="text-base text-gray-700">{selectedProperty.typology}</p>
                        </div>
                    )}

                    <div className="space-y-1">
                        <span className="text-xs uppercase text-gray-400 font-bold flex items-center gap-1">
                            <Info className="w-3 h-3" /> Referência
                        </span>
                        <p className="text-base text-gray-700">#{selectedProperty?.id}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase text-gray-400 tracking-wider">Sobre o Imóvel</h4>
                    <div className="prose prose-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap text-justify">
                    {selectedProperty?.description}
                    </div>
                </div>
              </div>

              <div className="pt-6 border-t mt-8 space-y-4 bg-white sticky bottom-0">
                <Button 
                  className="w-full bg-solara-vinho hover:bg-solara-vinho/90 h-14 text-lg font-light shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    if (selectedProperty?.images?.[0]) {
                      window.open(getFullImageUrl(selectedProperty.images[0]), '_blank');
                    }
                  }}
                >
                  <Download className="w-5 h-5 mr-3" />
                  Baixar Apresentação PDF
                </Button>
                <p className="text-xs text-center text-gray-400 px-4">
                  Interessado? Nossa equipe de especialistas pode agendar uma visita virtual ou presencial.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton 
        phoneNumber="+351912345678" 
        message={selectedProperty 
          ? `Olá! Vi o imóvel Ref #${selectedProperty.id} (${selectedProperty.typology || 'Imóvel'} em ${selectedProperty.location || market.name}) e gostaria de detalhes.`
          : `${t('market_detail.whatsapp_msg')} ${market.name}.`
        } 
      />
    </div>
  );
};

export default RealEstateDetail;