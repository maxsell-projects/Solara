import logoSolara from "@/assets/logo-solara-alt.jpg";
import logoVision from "@/assets/logo-vision.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            {/* LOGO ALTERADO: Removida moldura e aumentado o tamanho */}
            <div className="flex items-start">
              <img 
                src={logoSolara} 
                alt="Solara Project" 
                className="h-20 w-auto object-contain" // Aumentado para h-20
              />
            </div>
            <p className="text-sm font-light opacity-80 leading-relaxed">
              Strategic investment consultancy with conscious vision for sustainable prosperity.
            </p>
          </div>
          
          <div>
            <h4 className="font-light text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm font-light opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Real Estate Investments</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Financial Investments</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Strategic Consultancy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Partnership Opportunities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-light text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm font-light opacity-80">
              <li><a href="#about" className="hover:opacity-100 transition-opacity">About Solara</a></li>
              <li><a href="#vision" className="hover:opacity-100 transition-opacity">Vision Press</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-light text-lg mb-4">Connect</h4>
              <p className="text-sm font-light opacity-80">
                info@solaraproject.pt
              </p>
            </div>
            <div>
              <img 
                src={logoVision} 
                alt="Vision Press" 
                className="h-10 w-auto brightness-0 invert opacity-80"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light opacity-60">
            <p>© {currentYear} Solara Project®. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Terms & Conditions</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Accessibility</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;