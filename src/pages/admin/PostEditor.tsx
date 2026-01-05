import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, UploadCloud, Trash2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

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

  // Estado inicial seguro
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- CORREÇÃO 1: Fetch Blindado (404 e Nulls) ---
  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          // Tenta buscar o post
          const response = await fetch(`${API_URL}/posts/${id}`);

          // Se não encontrar (404), avisa e sai
          if (response.status === 404) {
            toast.error("Artigo não encontrado ou excluído.");
            navigate("/admin/dashboard");
            return;
          }

          if (response.ok) {
            const data = await response.json();

            // BLINDAGEM: Usa || "" para evitar que null quebre os inputs
            setFormData({
              title: data.title || "",
              slug: data.slug || "",
              category: data.category || "",
              excerpt: data.excerpt || "",
              content: data.content || "",
            });

            // Tratamento da imagem existente
            const imgPath = data.image || data.imageUrl; // Suporta ambos os nomes vindo do back
            if (imgPath) {
              // Se já vier com http, usa direto, senão concatena API_URL
              const fullPath = imgPath.startsWith('http') ? imgPath : `${API_URL}${imgPath}`;
              setPreviewUrl(fullPath);
            }
          } else {
            toast.error("Erro ao carregar dados do artigo.");
            navigate("/admin/dashboard");
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro de conexão com o servidor.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchPost();
    }
  }, [id, isEditing, navigate]);

  // --- Handlers de Imagem ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // --- CORREÇÃO 2: Inputs com State 'Prev' (Evita travar ao digitar) ---
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    setFormData(prev => {
      // Se estiver criando (não editando), gera slug automático
      if (!isEditing) {
        return {
          ...prev,
          title: newTitle,
          slug: generateSlug(newTitle)
        };
      }
      // Se estiver editando, só muda o título
      return { ...prev, title: newTitle };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Por favor, selecione uma categoria.");
      return;
    }

    setIsLoading(true);

    const token = localStorage.getItem("solara_token");

    // Usa FormData para suportar envio de Arquivo + Texto
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
        ? `${API_URL}/posts/${id}`
        : `${API_URL}/posts`;

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
          // Não adicionar 'Content-Type': 'multipart/form-data' manualmente aqui, 
          // o navegador faz isso sozinho quando body é FormData
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
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">

                  {/* Input File Invisível */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={!!previewUrl && !!selectedImage} // Hack para permitir clicar no trash
                  />

                  {previewUrl ? (
                    <div className="relative h-64 w-full">
                      <img src={previewUrl} alt="Preview" className="h-full w-full object-cover rounded-md mx-auto" />

                      {/* Botão Remover Imagem */}
                      <div className="absolute top-2 right-2 z-20">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={removeImage}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-white bg-black/50 absolute bottom-2 left-0 right-0 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Clique na lixeira para remover ou arraste nova imagem
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
                      <UploadCloud className="h-10 w-10" />
                      <span>Clique ou arraste uma imagem aqui</span>
                      <span className="text-xs text-gray-400">(JPG, PNG, WebP)</span>
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

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
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
                  // Uso do prev state para evitar travamento
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, slug: val }));
                  }}
                  placeholder="Ex: o-futuro-dos-investimentos"
                  required
                />
                <p className="text-xs text-muted-foreground">Gerado automaticamente a partir do título, mas podes editar.</p>
              </div>

              <div className="space-y-2">
                <Label>Resumo</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, excerpt: val }));
                  }}
                  className="h-24"
                  placeholder="Breve descrição que aparece no cartão..."
                />
              </div>

              <div className="space-y-2">
                <Label>Conteúdo (HTML)</Label>
                <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded mb-1">
                  Dica: Cole o HTML gerado aqui. Use tags como &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;.
                </div>
                <Textarea
                  value={formData.content}
                  onChange={e => {
                    const val = e.target.value;
                    setFormData(prev => ({ ...prev, content: val }));
                  }}
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
                  className="bg-solara-vinho hover:bg-solara-vinho/90 text-white min-w-[150px]"
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