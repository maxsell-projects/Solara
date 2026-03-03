import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface Property {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    location: string;
    image: string;
    slug: string;
    tag: string;
}

const getImageUrl = (img?: string) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    const path = img.startsWith("/") ? img.substring(1) : img;
    if (path.startsWith("uploads/")) return `${API_URL}/${path}`;
    return `${API_URL}/uploads/${path}`;
};

const truncate = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
};

const LatestProperties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${API_URL}/markets/properties/featured`);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    const mapped = data.slice(0, 3).map((p: any) => ({
                        id: p.id,
                        title: p.title || p.market?.name || "IMÓVEL EXCLUSIVO",
                        subtitle: p.subtitle || "",
                        description: truncate(p.description || p.additionalInfo || "", 120),
                        location: p.location || "GLOBAL",
                        image: getImageUrl(p.images?.[0]),
                        slug: p.market?.slug ? `/services/real-estate/${p.market.slug}` : "#",
                        tag: p.tag || "Empreendimento",
                    }));
                    setProperties(mapped);
                }
            } catch (error) {
                console.error("Error fetching latest properties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (isLoading) {
        return (
            <section className="py-20 bg-neutral-50">
                <div className="container mx-auto px-6 lg:px-8 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-solara-vinho" />
                </div>
            </section>
        );
    }

    if (properties.length === 0) return null;

    return (
        <section className="py-20 bg-neutral-50 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header da Seção */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-solara-vinho font-semibold mb-3">
                            Destaque
                        </p>
                        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 leading-tight">
                            Últimos Imóveis <span className="text-solara-vinho font-medium">Cadastrados</span>
                        </h2>
                    </div>
                    <Link to="/services/real-estate#markets">
                        <Button
                            variant="ghost"
                            className="text-solara-vinho hover:text-solara-vinho/80 hover:bg-solara-vinho/5 gap-2 font-light"
                        >
                            Ver todos os mercados <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Grid de Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property, index) => (
                        <Link
                            to={property.slug}
                            key={property.id}
                            className="group block"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                                {/* Imagem */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-solara-vinho/90 text-white border-0 px-3 py-1 text-xs tracking-wider backdrop-blur-sm">
                                            {property.tag}
                                        </Badge>
                                    </div>

                                    {/* Location */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-white/80" />
                                        <span className="text-xs font-light tracking-widest text-white/90 uppercase">
                                            {property.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Conteúdo */}
                                <div className="p-6">
                                    {property.subtitle && (
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-solara-vinho/70 font-semibold mb-1">
                                            {property.subtitle}
                                        </p>
                                    )}
                                    <h3 className="text-xl font-light text-neutral-900 mb-3 group-hover:text-solara-vinho transition-colors duration-300">
                                        {property.title}
                                    </h3>
                                    <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-2">
                                        {property.description}
                                    </p>

                                    {/* CTA */}
                                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                                            Saiba mais
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-solara-vinho transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProperties;
