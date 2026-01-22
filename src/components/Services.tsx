import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom"; 
import realEstateImg from "@/assets/service-real-estate.jpg";
import financialImg from "@/assets/service-financial.jpg";
import consultingImg from "@/assets/service-consulting-premium.jpg";
import { useTranslation } from "react-i18next"; 

const Services = () => {
  const { t } = useTranslation(); 

  const services = [
    {
      title: t('services.cards.real_estate_title'),
      description: t('services.cards.real_estate_desc'),
      image: realEstateImg,
      link: "/services/real-estate"
    },
    {
      title: t('services.cards.financial_title'),
      description: t('services.cards.financial_desc'),
      image: financialImg,
      link: "/services/financial"
    },
    {
      title: t('services.cards.consulting_title'),
      description: t('services.cards.consulting_desc'),
      image: consultingImg,
      link: "/services/consultancy"
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* --- CABEÇALHO ALTERADO (Texto vindo da Hero) --- */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          {/* ESTD (Vindo da Hero) */}
          <p className="text-xs uppercase tracking-[0.2em] text-solara-vinho font-bold">
            {t('hero.estd')}
          </p>
          
          {/* Título da Seção */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900">
            Nossa Expertise
          </h2>

          {/* Descrição Principal (Vinda da Hero) */}
          <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          
          {/* Detalhe visual para separar texto dos cards */}
          <div className="w-24 h-1 bg-solara-vinho/20 mx-auto rounded-full mt-8" />
        </div>
        {/* ------------------------------------------------ */}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="block h-full transform hover:-translate-y-2 transition-transform duration-500">
              <Card 
                className="border-0 shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:bg-solara-vinho h-full flex flex-col"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <CardContent className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-light mb-4 text-neutral-900 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300 flex-grow">
                    {service.description}
                  </p>
                  
                  <span className="text-sm uppercase tracking-widest mt-6 text-solara-vinho font-medium group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                    {t('services.discover_more')}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;