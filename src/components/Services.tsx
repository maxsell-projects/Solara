import { Card, CardContent } from "@/components/ui/card";
import realEstateImg from "@/assets/service-real-estate.jpg";
import financialImg from "@/assets/service-financial.jpg";
import consultingImg from "@/assets/service-consulting-premium.jpg";

const services = [
  {
    title: "Real Estate Investments",
    description: "Strategic property portfolio development with focus on sustainable value creation and long-term capital appreciation.",
    image: realEstateImg,
  },
  {
    title: "Financial Investments",
    description: "Diversified investment strategies tailored to individual goals, combining market expertise with conscious allocation.",
    image: financialImg,
  },
  {
    title: "Strategic Consultancy",
    description: "Comprehensive business guidance integrating investment vision, growth strategy, and operational excellence.",
    image: consultingImg,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Investment Solutions
          </h2>
          <p className="text-lg font-light text-muted-foreground leading-relaxed">
            Delivering excellence through specialized services designed to elevate your financial future
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 hover:bg-solara-vinho"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-light mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;