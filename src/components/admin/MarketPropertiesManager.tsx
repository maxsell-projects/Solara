import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Image as ImageIcon, X, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const API_URL = import.meta.env.VITE_API_URL;

interface Property {
  id: number;
  description: string;
  images: string[];
}

interface MarketPropertiesManagerProps {
  marketId: string;
}

export function MarketPropertiesManager({ marketId }: MarketPropertiesManagerProps) {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Estados do Formulário de Criação
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // --- CARREGAR IMÓVEIS ---
  const fetchProperties = useCallback(async () => {
    try {
      // O GET geralmente é público ou liberado, mas se der 401, adicione o header aqui também.
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

  // --- HANDLERS DE ARQUIVO ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...newFiles]);

      // Gera previews locais
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // --- SALVAR NOVO IMÓVEL (COM TOKEN) ---
  const handleSave = async () => {
    if (!description) return toast({ title: "Atenção", description: "Adicione uma descrição.", variant: "destructive" });
    if (selectedFiles.length === 0) return toast({ title: "Atenção", description: "Adicione pelo menos uma imagem.", variant: "destructive" });

    // 1. PEGAR O TOKEN
    const token = localStorage.getItem('token');
    if (!token) return toast({ title: "Erro", description: "Sessão expirada. Faça login novamente.", variant: "destructive" });

    setIsSaving(true);
    try {
      // 1. Upload das Imagens (Paralelo)
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        // Upload
        const res = await fetch(`${API_URL}/uploads`, {
          method: "POST",
          body: formData,
          // Se sua rota de upload exigir token:
          // headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error("Falha no upload de imagem");
        const data = await res.json();
        return data.url; 
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // 2. Criar a Propriedade no Banco (Usando Token)
      const payload = {
        description,
        images: uploadedUrls,
      };

      const res = await fetch(`${API_URL}/markets/${marketId}/properties`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // <--- TOKEN AQUI
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: "Sucesso!", description: "Imóvel adicionado com sucesso." });
        setIsDialogOpen(false);
        // Reset form
        setDescription("");
        setSelectedFiles([]);
        setPreviewUrls([]);
        // Refresh lista
        fetchProperties();
      } else {
        throw new Error("Falha ao salvar imóvel");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Erro ao salvar. Tente novamente.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  // --- DELETAR IMÓVEL (COM TOKEN) ---
  const handleDelete = async (propertyId: number) => {
    if (!confirm("Tem certeza que deseja remover este imóvel?")) return;

    // 1. PEGAR O TOKEN
    const token = localStorage.getItem('token');
    if (!token) return toast({ title: "Erro", description: "Sessão expirada.", variant: "destructive" });

    try {
      const res = await fetch(`${API_URL}/markets/properties/${propertyId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}` // <--- TOKEN AQUI
        }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Imóveis Disponíveis</h3>
          <p className="text-sm text-gray-500">Gerencie as oportunidades de investimento neste país.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-solara-vinho hover:bg-solara-vinho/90">
              <Plus className="w-4 h-4 mr-2" /> Adicionar Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Imóvel no Mercado</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Upload Área */}
              <div className="space-y-2">
                <Label>Fotos do Imóvel</Label>
                <div className="grid grid-cols-4 gap-4">
                  {/* Botão de Upload */}
                  <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-50 transition-colors">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-medium">Carregar</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileSelect} 
                    />
                  </label>

                  {/* Previews */}
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border group">
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Selecione várias fotos de uma vez. A primeira será a capa.</p>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label>Descrição / Ficha Técnica</Label>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: T2 no Centro de Lisboa, Yield 6%..."
                  rows={5}
                />
              </div>

              <Button onClick={handleSave} disabled={isSaving} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Salvar Imóvel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LISTA DE IMÓVEIS */}
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
            <Card key={prop.id} className="group overflow-hidden">
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {prop.images && prop.images.length > 0 ? (
                  <img 
                    src={getFullImageUrl(prop.images[0])} 
                    alt="Capa" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon /></div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="destructive" size="icon" className="h-8 w-8 shadow-lg" onClick={() => handleDelete(prop.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-3 font-light">{prop.description}</p>
                <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs text-gray-400">
                  <span>{prop.images?.length || 0} fotos</span>
                  <span>ID: {prop.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}