import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  brand: 'solara' | 'vision';
  className?: string;
}

export const HeroBackground = ({ brand, className }: HeroBackgroundProps) => {
  const colors = brand === 'solara' 
    ? {
        blob1: "bg-solara-vinho/40",  // Aumentei um pouco a opacidade
        blob2: "bg-solara-salmon/40",
        blob3: "bg-orange-200/50"
      }
    : {
        blob1: "bg-emerald-400/30",
        blob2: "bg-emerald-200/40",
        blob3: "bg-teal-300/30"
      };

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Container com Blur forte */}
      <div className="absolute inset-0 opacity-80 mix-blend-multiply filter blur-[80px]">
        
        {/* Blob 1 - Topo Esquerda */}
        <div 
          className={cn(
            "absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 rounded-full animate-blob",
            colors.blob1
          )}
        ></div>
        
        {/* Blob 2 - Topo Direita */}
        <div 
          className={cn(
            "absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 rounded-full animate-blob",
            colors.blob2
          )}
          style={{ animationDelay: "2s" }} // <--- Inline style para garantir
        ></div>
        
        {/* Blob 3 - Centro/Baixo */}
        <div 
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full animate-blob",
            colors.blob3
          )}
          style={{ animationDelay: "4s" }} // <--- Inline style para garantir
        ></div>
      </div>
      
      {/* Textura de ruído para acabamento */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};