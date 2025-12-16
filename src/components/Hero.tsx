import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-premium-property.jpg";
import logoVision from "@/assets/logo-vision.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0.92)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center pt-32">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-vision-green/30"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-vision-green font-medium">em parceria com</span>
              <div className="h-px w-12 bg-vision-green/30"></div>
            </div>

            <Link to="/vision" className="block transition-transform hover:scale-105 duration-300">
              <div className="h-40 w-40 rounded-full border-2 border-vision-green p-4 bg-white overflow-hidden flex items-center justify-center shadow-md cursor-pointer">
                <img 
                  src={logoVision} 
                  alt="Vision Press" 
                  className="w-full h-full object-contain opacity-100"
                />
              </div>
            </Link>
          </div>
          
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light">
            ESTD 2025
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-[1.1] text-foreground">
            Strategic Investment
            <br />
            <span className="text-solara-vinho font-light">Conscious Growth</span>
          </h1>
          
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Solara Project delivers tailored investment solutions and strategic consultancy, 
            combining financial expertise with authentic vision for sustainable prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="text-base bg-solara-vinho hover:bg-solara-vinho/90 text-white border-none">
              Explore Services
            </Button>
            <Link to="/vision">
              <Button size="lg" variant="outline" className="text-base border-2 border-vision-green text-vision-green hover:bg-vision-green/10">
                Discover Vision Press
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;