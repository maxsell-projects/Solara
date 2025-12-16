import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// Importamos os componentes de Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

// Lista de categorias pré-definidas
const CATEGORIES = [
  "Negócios",
  "Imobiliário",
  "Finanças",
  "Sociedade",
  "Tendências"
];

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`http://localhost:3001/posts/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              title: data.title,
              slug: data.slug,
              category: data.category,
              excerpt: data.excerpt,
              content: data.content,
            });
            if (data.image) {
              setPreviewUrl(`http://localhost:3001${data.image}`);
            }
          } else {
            toast.error("Erro ao carregar dados do artigo.");
            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro de conexão.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditing, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Função auxiliar para gerar Slug automaticamente a partir do Título
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Atualiza o slug quando o título muda (apenas se estiver criando novo)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (!isEditing) {
      setFormData(prev => ({ 
        ...prev, 
        title: newTitle, 
        slug: generateSlug(newTitle) 
      }));
    } else {
      setFormData(prev => ({ ...prev, title: newTitle }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast.error("Por favor, selecione uma categoria.");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("solara_token");
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("category", formData.category);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      const url = isEditing 
        ? `http://localhost:3001/posts/${id}`
        : 'http://localhost:3001/posts';
        
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (response.ok) {
        toast.success(isEditing ? "Artigo atualizado!" : "Artigo publicado!");
        navigate("/admin/dashboard");
      } else {
        const err = await response.json();
        toast.error(err.message || "Erro ao salvar artigo.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-solara-vinho" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-light text-solara-vinho">
            {isEditing ? "Editar Artigo" : "Novo Artigo"}
          </h1>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Upload de Imagem */}
              <div className="space-y-2">
                <Label>Imagem de Capa</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewUrl ? (
                    <div className="relative h-48 w-full">
                      <img src={previewUrl} alt="Preview" className="h-full w-full object-contain mx-auto" />
                      <p className="text-xs text-muted-foreground mt-2">Clique para alterar</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <UploadCloud className="h-10 w-10" />
                      <span>Clique ou arraste uma imagem aqui</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input 
                    value={formData.title} 
                    onChange={handleTitleChange}
                    placeholder="Ex: O Futuro dos Investimentos" 
                    required 
                  />
                </div>
                
                {/* ALTERAÇÃO: Select de Categoria */}
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Slug (URL amigável)</Label>
                <Input 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  placeholder="Ex: o-futuro-dos-investimentos" 
                  required 
                />
                <p className="text-xs text-muted-foreground">Gerado automaticamente a partir do título, mas podes editar.</p>
              </div>

              <div className="space-y-2">
                <Label>Resumo</Label>
                <Textarea 
                  value={formData.excerpt} 
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="h-24" 
                  placeholder="Breve descrição que aparece no cartão..." 
                />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo (HTML)</Label>
                <Textarea 
                  value={formData.content} 
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="h-96 font-mono text-sm leading-relaxed" 
                  placeholder="<p>Escreva o seu artigo aqui...</p>" 
                  required 
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Link to="/admin/dashboard">
                  <Button type="button" variant="outline">Cancelar</Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-vision-green hover:bg-vision-green/90 text-white min-w-[150px]"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {isEditing ? "Atualizar" : "Publicar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPostEditor;