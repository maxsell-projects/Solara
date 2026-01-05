import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShieldCheck, PieChart, Landmark, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import financialHero from "@/assets/service-financial.jpg";

const Financial = () => {
  return (
    <div className="min-h-screen font-sans text-neutral-900 bg-white">
      <Header />

      {/* --- HERO SECTION --- */}
      {/* ALTERAÇÃO: mt-20 para empurrar a imagem para baixo da navbar */}
      <section className="relative mt-20 pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 opacity-40">
          <img src={financialHero} alt="Financial Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <Badge variant="outline" className="border-white/30 text-white px-4 py-1 text-xs uppercase tracking-widest font-semibold">
              Wealth Management
            </Badge>
            <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
              Architecting <br />
              <span className="text-solara-vinho font-medium">Your Legacy</span>
            </h1>
            <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              Sophisticated financial engineering tailored to preserve, grow, and transfer your wealth across generations.
            </p>
            <div className="pt-4">
              <Link to="/contact">
                <Button className="rounded-full bg-white text-neutral-900 hover:bg-solara-vinho hover:text-white transition-all px-8 h-12 text-base">
                  Schedule a Financial Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900">
                More than Banking. <br />
                <span className="text-solara-vinho font-medium">Strategic Stewardship.</span>
              </h2>
              <div className="space-y-6 text-neutral-600 font-light leading-relaxed text-lg border-l-4 border-solara-vinho pl-6">
                <p>
                  In a complex global economy, standard investment products are often insufficient. True wealth preservation requires a bespoke approach that balances liquidity needs with long-term growth objectives.
                </p>
                <p>
                  We act as your financial architects. By leveraging our network of top-tier private banks and credit intermediaries, we design portfolios that are robust against volatility yet agile enough to capture emerging opportunities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Risk Mitigation</h3>
                    <p className="text-neutral-500 font-light text-sm">Advanced stress-testing of portfolios against market downturns and inflation.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <PieChart className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Asset Allocation</h3>
                    <p className="text-neutral-500 font-light text-sm">Diversification across equities, bonds, private equity, and alternative investments.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-50 border-0 shadow-sm">
                <CardContent className="p-6 flex items-start gap-4">
                  <Landmark className="w-8 h-8 text-solara-vinho mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">Private Banking Access</h3>
                    <p className="text-neutral-500 font-light text-sm">Exclusive terms and credit facilities negotiated through our institutional partners.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Core Competencies</h2>
            <p className="text-neutral-500 font-light max-w-2xl mx-auto">
              A comprehensive suite of financial services designed for high-net-worth individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Portfolio Management", desc: "Discretionary and advisory mandates tailored to your risk profile.", icon: TrendingUp },
              { title: "Credit Intermediation", desc: "Optimizing leverage for real estate acquisition or business expansion.", icon: Landmark },
              { title: "Estate Planning", desc: "Structuring assets to ensure efficient wealth transfer to future generations.", icon: ShieldCheck },
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-solara-vinho/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-solara-vinho transition-colors">
                    <item.icon className="w-8 h-8 text-solara-vinho group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                  <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Secure Your Financial Future</h2>
          <p className="text-neutral-500 mb-8 max-w-2xl mx-auto font-light text-lg">
            Let's build a strategy that works as hard as you do.
          </p>
          <Link to="/contact">
            <Button className="rounded-full bg-neutral-900 text-white hover:bg-solara-vinho px-10 py-6 text-lg">
              Start the Conversation <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="+351123456789" message="Hello, I'm interested in Financial Wealth Management." />
      <BackToTop />
    </div>
  );
};

export default Financial;