import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, ArrowLeft, Plus, Trash2, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { MarketPropertiesManager } from "@/components/admin/MarketPropertiesManager";

const API_URL = import.meta.env.VITE_API_URL;

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapClickCapture = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

// --- MAP CONTROLLER BLINDADO ---
const MapController = ({
  center,
  zoom,
  pins,
  activeTab
}: {
  center: [number, number],
  zoom: number,
  pins: { lat: number; lng: number }[],
  activeTab: string
}) => {
  const map = useMap();

  useEffect(() => {
    // Só executa se a aba for 'map'
    if (activeTab === 'map') {
      // Pequeno delay para garantir que o DOM renderizou
      const timer = setTimeout(() => {
        if (!map) return;
        
        try {
          // Força o ajuste do tamanho, mas com proteção
          map.invalidateSize(); 
          
          const isValidCenter = !isNaN(center[0]) && !isNaN(center[1]);
          if (pins.length > 0) {
            const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]));
            if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
          } else if (isValidCenter) {
            map.setView(center, zoom);
          }
        } catch (error) {
          // Engole o erro do Leaflet se o container não estiver pronto
          console.warn("Map resize ignorado (container oculto).");
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [map, activeTab, pins, center, zoom]);

  return null;
};

const AdminMarketEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tag: "",
    shortDescription: "",
    fullDescription: "",
    yieldRate: "",
    appreciationRate: "",
    imageUrl: "",
    mapLat: 38.7223,
    mapLng: -9.1393,
    mapZoom: 6,
    pins: [] as { city: string; lat: number; lng: number }[]
  });

  const [newPin, setNewPin] = useState({ city: "", lat: 0, lng: 0 });

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(`${API_URL}/markets/id/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Erro ao buscar");
          return res.json();
        })
        .then(data => {
          setFormData({
            ...data,
            mapLat: Number(data.mapLat) || 38.7223,
            mapLng: Number(data.mapLng) || -9.1393,
            mapZoom: Number(data.mapZoom) || 6,
            pins: Array.isArray(data.pins) ? data.pins : []
          });
        })
        .catch(err => {
          console.error(err);
          toast({ title: "Erro", description: "Falha ao carregar dados.", variant: "destructive" });
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, toast]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    setFormData(prev => ({ ...prev, name, slug: id ? prev.slug : slug }));
  };

  const addPin = () => {
    if (!newPin.city) return toast({ title: "Erro", description: "Digite o nome da cidade", variant: "destructive" });
    if (newPin.lat === 0 && newPin.lng === 0) return toast({ title: "Erro", description: "Selecione um local no mapa", variant: "destructive" });

    setFormData(prev => ({
      ...prev,
      pins: [...prev.pins, { ...newPin }]
    }));
    setNewPin({ city: "", lat: 0, lng: 0 });
    toast({ title: "Sucesso", description: "Pin adicionado à lista!" });
  };

  const removePin = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pins: prev.pins.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const url = id ? `${API_URL}/markets/${id}` : `${API_URL}/markets`;
    const method = id ? 'PUT' : 'POST';

    const token = localStorage.getItem('solara_token');
    
    if (!token) {
        toast({ title: "Sessão Expirada", description: "Faça login novamente.", variant: "destructive" });
        navigate("/admin/login");
        return;
    }

    const payload = {
      ...formData,
      mapLat: isNaN(Number(formData.mapLat)) ? 38.7223 : Number(formData.mapLat),
      mapLng: isNaN(Number(formData.mapLng)) ? -9.1393 : Number(formData.mapLng),
      mapZoom: isNaN(Number(formData.mapZoom)) ? 6 : Number(formData.mapZoom),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast({ title: "Salvo!", description: "Mercado atualizado com sucesso." });
        navigate("/admin/dashboard");
      } else {
        if (res.status === 401) throw new Error("Não autorizado");
        throw new Error("Falha ao salvar");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Não foi possível salvar.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const safeMapCenter: [number, number] = [
    isNaN(formData.mapLat) ? 0 : formData.mapLat,
    isNaN(formData.mapLng) ? 0 : formData.mapLng
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-light tracking-tight text-gray-900">
                {id ? `Editar: ${formData.name}` : "Novo Mercado"}
              </h1>
              <p className="text-sm text-gray-500">Gerencie as informações e o mapa estratégico.</p>
            </div>
          </div>
          {activeTab !== 'properties' && (
            <Button onClick={handleSave} disabled={isLoading} className="bg-solara-vinho hover:bg-solara-vinho/90">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Salvar Alterações
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-white border p-1 h-12 w-full justify-start overflow-x-auto">
            <TabsTrigger value="general" className="px-6 h-9">Geral & Capa</TabsTrigger>
            <TabsTrigger value="content" className="px-6 h-9">Textos Descritivos</TabsTrigger>
            <TabsTrigger value="map" className="px-6 h-9">Mapa & Pins</TabsTrigger>
            {id ? (
              <TabsTrigger value="properties" className="px-6 h-9 text-emerald-700 bg-emerald-50/50">
                Imóveis à Venda
              </TabsTrigger>
            ) : (
              <div className="px-6 text-xs text-gray-400 flex items-center">(Salve o mercado para adicionar imóveis)</div>
            )}
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader><CardTitle>Informações Principais</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nome do Mercado</Label>
                    <Input value={formData.name} onChange={handleNameChange} placeholder="Ex: Portugal" />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="portugal" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Tag (Destaque)</Label>
                    <Input value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} placeholder="Ex: Golden Visa" />
                  </div>
                  <div className="space-y-2">
                    <Label>Yield Médio</Label>
                    <Input value={formData.yieldRate} onChange={e => setFormData({ ...formData, yieldRate: e.target.value })} placeholder="Ex: 5-7%" />
                  </div>
                  <div className="space-y-2">
                    <Label>Apreciação</Label>
                    <Input value={formData.appreciationRate} onChange={e => setFormData({ ...formData, appreciationRate: e.target.value })} placeholder="Ex: Alta / Estável" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>URL da Imagem de Capa</Label>
                  <Input value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://..." />
                  {formData.imageUrl && (
                    <div className="mt-2 h-40 w-full rounded-md overflow-hidden bg-gray-100 border">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader><CardTitle>Conteúdo Editorial</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Descrição Curta</Label>
                  <Textarea rows={3} value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} placeholder="Resumo atrativo." />
                </div>
                <div className="space-y-2">
                  <Label>Descrição Completa</Label>
                  <Textarea rows={15} className="font-mono text-sm" value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} placeholder="Conteúdo detalhado..." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <div className="grid lg:grid-cols-[1fr_350px] gap-6">
              <Card className="overflow-hidden flex flex-col h-[600px]">
                <div className="bg-neutral-100 p-2 text-xs text-center border-b">
                  Clique no mapa para pegar as coordenadas.
                </div>
                <div className="flex-grow relative z-0">
                  <MapContainer center={safeMapCenter} zoom={formData.mapZoom} className="h-full w-full">
                    <MapController center={safeMapCenter} zoom={formData.mapZoom} pins={formData.pins} activeTab={activeTab} />
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    <MapClickCapture onLocationSelect={(lat, lng) => {
                      setNewPin(prev => ({ ...prev, lat, lng }));
                      toast({ description: "Coordenadas capturadas!" });
                    }} />
                    {formData.pins.map((pin, idx) => (
                      <Marker key={idx} position={[pin.lat, pin.lng]}>
                        <Popup>{pin.city}</Popup>
                      </Marker>
                    ))}
                    {newPin.lat !== 0 && <Marker position={[newPin.lat, newPin.lng]} opacity={0.6} />}
                  </MapContainer>
                </div>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-sm font-medium">Configuração</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div><Label className="text-xs">Lat Centro</Label><Input type="number" step="0.0001" value={formData.mapLat} onChange={e => setFormData({ ...formData, mapLat: parseFloat(e.target.value) || 0 })} /></div>
                      <div><Label className="text-xs">Lng Centro</Label><Input type="number" step="0.0001" value={formData.mapLng} onChange={e => setFormData({ ...formData, mapLng: parseFloat(e.target.value) || 0 })} /></div>
                    </div>
                    <div><Label className="text-xs">Zoom</Label><Input type="number" value={formData.mapZoom} onChange={e => setFormData({ ...formData, mapZoom: parseInt(e.target.value) || 6 })} /></div>
                    <Button variant="secondary" size="sm" className="w-full text-xs" onClick={() => setFormData({ ...formData, mapLat: newPin.lat, mapLng: newPin.lng })}>Usar clique como Centro</Button>
                  </CardContent>
                </Card>
                <Card className="border-solara-vinho/20">
                  <CardHeader className="pb-3 bg-solara-vinho/5"><CardTitle className="text-sm font-medium text-solara-vinho">Novo Pin</CardTitle></CardHeader>
                  <CardContent className="space-y-3 pt-3">
                    <div><Label className="text-xs">Cidade</Label><Input value={newPin.city} onChange={e => setNewPin({ ...newPin, city: e.target.value })} placeholder="Ex: Porto" /></div>
                    <Button size="sm" className="w-full bg-solara-vinho" onClick={addPin}><Plus className="w-4 h-4 mr-2" /> Adicionar</Button>
                  </CardContent>
                </Card>
                <div className="space-y-2">
                  <Label className="text-sm">Pins ({formData.pins.length})</Label>
                  <div className="max-h-[200px] overflow-y-auto space-y-2 pr-2">
                    {formData.pins.map((pin, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border shadow-sm text-sm">
                        <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-solara-vinho" /><span>{pin.city}</span></div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => removePin(idx)}><Trash2 className="w-3 h-3" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {id && (
            <TabsContent value="properties">
              <MarketPropertiesManager marketId={id} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminMarketEditor;