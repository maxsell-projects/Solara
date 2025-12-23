import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // <--- Adicionado useMap
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const API_URL = import.meta.env.VITE_API_URL;

// Configuração do Ícone Padrão do Leaflet
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

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
}

// --- Componente Auxiliar para Ajustar o Zoom aos Pinos ---
const FitBounds = ({ pins, center, zoom }: { pins: any[], center: [number, number], zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    // Se houver pinos, ajusta o mapa para mostrar todos eles
    if (pins && pins.length > 0) {
      const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]));
      // O padding evita que os pinos fiquem colados na borda do mapa
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      // Se não houver pinos, usa o centro e zoom configurados manualmente
      map.setView(center, zoom);
    }
  }, [map, pins, center, zoom]);

  return null;
};

const RealEstateDetail = () => {
  const { slug } = useParams();
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Busca os dados do mercado pelo Slug
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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-solara-vinho" /></div>;
  if (!market) return <div className="min-h-screen flex items-center justify-center">Mercado não encontrado.</div>;

  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <Link to="/services/real-estate">
            <Button variant="link" className="text-white/60 hover:text-white p-0 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Mercados
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
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Coluna da Esquerda: Texto */}
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-solara-vinho">Visão Estratégica</h2>
            <div 
              className="prose prose-lg text-gray-600 font-light leading-relaxed"
              dangerouslySetInnerHTML={{ __html: market.fullDescription }}
            />
            
            <div className="pt-8">
              <h3 className="text-xl font-medium mb-4">Por que investir em {market.name}?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-600 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-solara-vinho mt-2.5" />
                  Alta demanda por propriedades premium nas zonas mapeadas.
                </li>
                <li className="flex items-start gap-3 text-gray-600 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-solara-vinho mt-2.5" />
                  Benefícios fiscais exclusivos para investidores estrangeiros.
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
              {/* Componente que faz a mágica do zoom automático */}
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
                      <span className="text-gray-500">Área de Atuação Solara</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-100 z-[400]">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-solara-vinho" />
                <p className="text-sm font-medium text-gray-700">
                  {market.pins ? market.pins.length : 0} Cidades com Operação Ativa
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
      <WhatsAppButton phoneNumber="+351912345678" message={`Olá, gostaria de saber mais sobre investimentos em ${market.name}.`} />
    </div>
  );
};

export default RealEstateDetail;