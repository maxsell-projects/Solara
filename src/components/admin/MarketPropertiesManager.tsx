import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Image as ImageIcon, X, UploadCloud, MapPin, Calendar, TrendingUp, Pencil, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const API_URL = import.meta.env.VITE_API_URL;

// Enum deve bater com o Backend
enum PropertyStatus {
  PLANTA = 'Na Planta',
  CONSTRUCAO = 'Em Construção',
  PRONTO = 'Pronto para Morar'
}

interface Property {
  id: number;
  title?: string;
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

interface MarketPropertiesManagerProps {
  marketId: string;
}

export function MarketPropertiesManager({ marketId }: MarketPropertiesManagerProps) {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- ESTADO DE EDIÇÃO ---
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // --- ESTADOS DO FORMULÁRIO ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [typology, setTypology] = useState("");
  const [status, setStatus] = useState<string>(PropertyStatus.PLANTA);
  const [profitability, setProfitability] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // URLs das imagens já existentes (para edição)
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // --- PLANTA BAIXA ---
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [previewFloorPlanUrl, setPreviewFloorPlanUrl] = useState<string | null>(null);
  const [existingFloorPlan, setExistingFloorPlan] = useState<string>("");

  // --- VÍDEO ---
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [existingVideo, setExistingVideo] = useState<string>("");

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/markets/id/${marketId}`);
      if (res.ok) {
        const data = await res.json();
        setProperties(data.properties || []);
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Falha ao carregar imóveis.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [marketId, toast]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleFloorPlanSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFloorPlanFile(file);
      setPreviewFloorPlanUrl(URL.createObjectURL(file));
      setExistingFloorPlan(""); // clean existing when new selected
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      setPreviewVideoUrl(URL.createObjectURL(file));
      setExistingVideo(""); // clean existing when new selected
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para limpar o form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLocation("");
    setTypology("");
    setStatus(PropertyStatus.PLANTA);
    setProfitability("");
    setDeliveryDate("");
    setSelectedFiles([]);
    setPreviewUrls([]);
    setExistingImages([]);
    setFloorPlanFile(null);
    setPreviewFloorPlanUrl(null);
    setExistingFloorPlan("");
    setVideoFile(null);
    setPreviewVideoUrl(null);
    setExistingVideo("");
    setEditingProperty(null);
    setIsDialogOpen(false);
  };

  // Função para abrir o dialog em modo edição
  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    setTitle(property.title || "");
    setDescription(property.description || "");
    setLocation(property.location || "");
    setTypology(property.typology || "");
    setStatus(property.status || PropertyStatus.PLANTA);
    setProfitability(property.estimatedProfitability || "");
    setDeliveryDate(property.deliveryDate ? property.deliveryDate.split("T")[0] : "");
    setExistingImages(property.images || []);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setExistingFloorPlan(property.floorPlan || "");
    setFloorPlanFile(null);
    setPreviewFloorPlanUrl(null);
    setExistingVideo(property.videoUrl || "");
    setVideoFile(null);
    setPreviewVideoUrl(null);
    setIsDialogOpen(true);
  };

  // Função para abrir o dialog em modo criação
  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!description) return toast({ title: "Atenção", description: "Adicione uma descrição.", variant: "destructive" });
    if (selectedFiles.length === 0 && existingImages.length === 0) return toast({ title: "Atenção", description: "Adicione pelo menos uma imagem.", variant: "destructive" });

    const token = localStorage.getItem('solara_token');
    if (!token) return toast({ title: "Erro", description: "Sessão expirada. Faça login novamente.", variant: "destructive" });

    setIsSaving(true);
    try {
      // 1. Upload das novas imagens
      let uploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const res = await fetch(`${API_URL}/uploads`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Falha no upload");
          const data = await res.json();
          return data.url;
        });

        uploadedUrls = await Promise.all(uploadPromises);
      }

      // 2. Combinar imagens existentes + novas
      const allImages = [...existingImages, ...uploadedUrls];

      // Upload Planta Baixa
      let floorPlanUrl: string = existingFloorPlan;
      if (floorPlanFile) {
        const formData = new FormData();
        formData.append("file", floorPlanFile);

        const res = await fetch(`${API_URL}/uploads`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Falha no upload da planta");
        const data = await res.json();
        floorPlanUrl = data.url;
      }

      // Upload Vídeo
      let finalVideoUrl: string = existingVideo;
      if (videoFile) {
        const formData = new FormData();
        formData.append("file", videoFile);

        const res = await fetch(`${API_URL}/uploads`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Falha no upload do vídeo");
        const data = await res.json();
        finalVideoUrl = data.url;
      }

      // 3. Payload Completo
      const payload = {
        title,
        description,
        images: allImages,
        location,
        typology,
        status,
        estimatedProfitability: profitability,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        floorPlan: floorPlanUrl || null,
        videoUrl: finalVideoUrl || null,
      };

      // 4. Decide entre POST (criar) e PUT (editar)
      const isEditing = !!editingProperty;
      const url = isEditing
        ? `${API_URL}/markets/properties/${editingProperty!.id}`
        : `${API_URL}/markets/${marketId}/properties`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: "Sucesso!",
          description: isEditing ? "Imóvel atualizado com sucesso." : "Imóvel adicionado com sucesso."
        });
        resetForm();
        fetchProperties();
      } else {
        throw new Error(isEditing ? "Falha ao atualizar imóvel" : "Falha ao salvar imóvel");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Erro ao salvar. Verifique o console.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (propertyId: number) => {
    if (!confirm("Tem certeza que deseja remover este imóvel?")) return;
    const token = localStorage.getItem('solara_token');
    if (!token) return toast({ title: "Erro", description: "Sessão expirada.", variant: "destructive" });

    try {
      const res = await fetch(`${API_URL}/markets/properties/${propertyId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        toast({ title: "Removido", description: "Imóvel removido da lista." });
        fetchProperties();
      } else {
        throw new Error("Erro ao deletar");
      }
    } catch (error) {
      toast({ title: "Erro", description: "Não foi possível remover.", variant: "destructive" });
    }
  };

  const getFullImageUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const isEditing = !!editingProperty;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Imóveis Disponíveis</h3>
          <p className="text-sm text-gray-500">Gerencie as oportunidades de investimento.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else openCreateDialog(); }}>
          <DialogTrigger asChild>
            <Button className="bg-solara-vinho hover:bg-solara-vinho/90">
              <Plus className="w-4 h-4 mr-2" /> Adicionar Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Editar Imóvel" : "Novo Imóvel no Mercado"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Atualize os dados do imóvel. Pode remover ou adicionar novas imagens."
                  : "Preencha todos os dados técnicos para atrair investidores qualificados."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">

              {/* --- TÍTULO --- */}
              <div className="space-y-2">
                <Label>Título do Imóvel</Label>
                <Input
                  placeholder="Ex: ISLANDS, VILLA TOSCANA..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* --- BLOCO DE INFORMAÇÕES TÉCNICAS --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Localização (Bairro/Região)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Ex: Business Bay, Dubai"
                      className="pl-9"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipologia</Label>
                  <Input
                    placeholder="Ex: Studio, 1 Bedroom, Penthouse..."
                    value={typology}
                    onChange={(e) => setTypology(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status da Obra</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PropertyStatus.PLANTA}>Na Planta</SelectItem>
                      <SelectItem value={PropertyStatus.CONSTRUCAO}>Em Construção</SelectItem>
                      <SelectItem value={PropertyStatus.PRONTO}>Pronto para Morar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Previsão de Entrega</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="date"
                      className="pl-9"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Rentabilidade Estimada (ROI/Yield)</Label>
                  <div className="relative">
                    <TrendingUp className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Ex: 8% a.a. garantido por 3 anos"
                      className="pl-9"
                      value={profitability}
                      onChange={(e) => setProfitability(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* --- BLOCO DE DESCRIÇÃO --- */}
              <div className="space-y-2">
                <Label>Descrição Detalhada</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva os diferenciais do projeto..."
                  rows={4}
                />
              </div>

              {/* --- BLOCO DE UPLOAD --- */}
              <div className="space-y-2">
                <Label>Galeria de Imagens</Label>
                <div className="grid grid-cols-4 gap-4">
                  <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 transition-colors">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium">Carregar</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileSelect} />
                  </label>

                  {/* Imagens já existentes (edição) */}
                  {existingImages.map((imgPath, idx) => (
                    <div key={`existing-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border group">
                      <img src={getFullImageUrl(imgPath)} alt="Existente" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-600/80 text-white text-[10px] text-center py-0.5">
                        Salva
                      </div>
                      <button onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {/* Novas imagens (preview) */}
                  {previewUrls.map((url, idx) => (
                    <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border group">
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-emerald-600/80 text-white text-[10px] text-center py-0.5">
                        Nova
                      </div>
                      <button onClick={() => removeFile(idx)} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- BLOCO PLANTA & VÍDEO --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* --- PLANTA BAIXA --- */}
                <div className="space-y-2">
                  <Label>Planta Baixa</Label>
                  <div className="flex items-center gap-4">
                    <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center w-32 h-32 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 font-medium text-center px-2">Subir Planta</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFloorPlanSelect} />
                    </label>

                    {/* Preview da Planta Baixa */}
                    {(previewFloorPlanUrl || existingFloorPlan) && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border group bg-gray-50 flex items-center justify-center">
                        <img src={previewFloorPlanUrl || getFullImageUrl(existingFloorPlan)} alt="Planta Baixa" className="w-full h-full object-contain" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                          {previewFloorPlanUrl ? "Nova Planta" : "Planta Atual"}
                        </div>
                        <button 
                          onClick={() => {
                            setFloorPlanFile(null);
                            setPreviewFloorPlanUrl(null);
                            setExistingFloorPlan("");
                          }} 
                          className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- VÍDEO --- */}
                <div className="space-y-2">
                  <Label>Vídeo do Imóvel</Label>
                  <div className="flex items-center gap-4">
                    <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center w-32 h-32 cursor-pointer hover:bg-gray-50 transition-colors shrink-0">
                      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500 font-medium text-center px-2">Subir Vídeo</span>
                      <input type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />
                    </label>

                    {/* Preview do Vídeo */}
                    {(previewVideoUrl || existingVideo) && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border group bg-black flex items-center justify-center">
                        <video 
                          src={previewVideoUrl || getFullImageUrl(existingVideo)} 
                          className="w-full h-full object-cover" 
                          muted 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                          {previewVideoUrl ? "Novo Vídeo" : "Vídeo Atual"}
                        </div>
                        <button 
                          onClick={() => {
                            setVideoFile(null);
                            setPreviewVideoUrl(null);
                            setExistingVideo("");
                          }} 
                          className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : isEditing ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                {isEditing ? "Atualizar Imóvel" : "Salvar Imóvel"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-gray-400" /></div>
      ) : properties.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg bg-gray-50">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Nenhum imóvel cadastrado neste mercado ainda.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <Card key={prop.id} className="group overflow-hidden flex flex-col h-full">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {prop.images && prop.images.length > 0 ? (
                  <img src={getFullImageUrl(prop.images[0])} alt="Capa" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon /></div>
                )}

                {/* Badges Flutuantes */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {prop.status && <Badge className="bg-black/70 backdrop-blur-sm text-xs hover:bg-black/90">{prop.status}</Badge>}
                  {prop.typology && <Badge variant="secondary" className="backdrop-blur-sm opacity-90 text-xs">{prop.typology}</Badge>}
                </div>

                {/* Botões de Ação (Editar + Deletar) */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 shadow-lg bg-white/90 hover:bg-white text-gray-700"
                    onClick={() => openEditDialog(prop)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8 shadow-lg" onClick={() => handleDelete(prop.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                {/* Título do Imóvel */}
                {prop.title && (
                  <h4 className="font-medium text-base mb-1 text-gray-900">{prop.title}</h4>
                )}
                <div className="flex items-center text-xs text-solara-gold font-semibold mb-2 uppercase tracking-wide">
                  <MapPin className="w-3 h-3 mr-1" />
                  {prop.location || "Localização não inf."}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 font-light flex-1 mb-4">{prop.description}</p>

                <div className="mt-auto pt-3 border-t grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex flex-col">
                    <span className="text-gray-400">Entrega</span>
                    <span className="font-medium text-gray-700">
                      {prop.deliveryDate ? new Date(prop.deliveryDate).toLocaleDateString() : '-'}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-gray-400">Yield Est.</span>
                    <span className="font-medium text-emerald-600">{prop.estimatedProfitability || '-'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}