import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, FileText, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import consultingHero from "@/assets/service-consulting-premium.jpg";
import { useTranslation } from "react-i18next"; // <--- Import i18n

const Consultancy = () => {
    const { t } = useTranslation(); // <--- Hook init

    return (
        <div className="min-h-screen font-sans text-neutral-900 bg-white">
            <Header />

            {/* --- HERO SECTION --- */}
            <section className="relative mt-20 pt-20 pb-20 overflow-hidden bg-neutral-900 text-white">
                <div className="absolute inset-0 opacity-50">
                    <img src={consultingHero} alt="Strategic Consulting" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <Badge variant="outline" className="border-white/30 text-white px-4 py-1 text-xs uppercase tracking-widest font-semibold">
                            {t('consultancy.hero.badge')}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
                            {t('consultancy.hero.title_line1')} <br />
                            <span className="text-solara-vinho font-medium">{t('consultancy.hero.title_line2')}</span>
                        </h1>
                        <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl">
                            {t('consultancy.hero.description')}
                        </p>
                        <div className="pt-4">
                            <Link to="/contact">
                                <Button className="rounded-full bg-white text-neutral-900 hover:bg-solara-vinho hover:text-white transition-all px-8 h-12 text-base">
                                    {t('consultancy.hero.btn')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONCEPT SECTION --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light mb-6">{t('consultancy.concept.title')}</h2>
                        <p className="text-lg text-neutral-600 font-light leading-relaxed">
                            {t('consultancy.concept.description')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1: Residency */}
                        <Card className="border border-neutral-100 shadow-lg hover:shadow-xl transition-all">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-solara-vinho/10 rounded-full flex items-center justify-center text-solara-vinho">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-light">{t('consultancy.concept.residency_title')}</h3>
                                </div>
                                <p className="text-neutral-500 font-light mb-6">
                                    {t('consultancy.concept.residency_desc')}
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        t('consultancy.concept.residency_list.golden'), 
                                        t('consultancy.concept.residency_list.d2'), 
                                        t('consultancy.concept.residency_list.d7')
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-neutral-700">
                                            <CheckCircle2 className="w-4 h-4 text-solara-vinho" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Card 2: Tax Optimization */}
                        <Card className="border border-neutral-100 shadow-lg hover:shadow-xl transition-all">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-solara-vinho/10 rounded-full flex items-center justify-center text-solara-vinho">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-light">{t('consultancy.concept.tax_title')}</h3>
                                </div>
                                <p className="text-neutral-500 font-light mb-6">
                                    {t('consultancy.concept.tax_desc')}
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        t('consultancy.concept.tax_list.nhr'), 
                                        t('consultancy.concept.tax_list.treaties'), 
                                        t('consultancy.concept.tax_list.corporate')
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-neutral-700">
                                            <CheckCircle2 className="w-4 h-4 text-solara-vinho" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* --- RELOCATION SERVICES --- */}
            <section className="py-24 bg-neutral-50">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-light">
                                {t('consultancy.relocation.title')}
                            </h2>
                            <p className="text-neutral-600 font-light leading-relaxed text-lg">
                                {t('consultancy.relocation.description')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-solara-vinho mt-1" />
                                    <div>
                                        <h4 className="font-medium">{t('consultancy.relocation.school_title')}</h4>
                                        <p className="text-sm text-neutral-500">{t('consultancy.relocation.school_desc')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Briefcase className="w-5 h-5 text-solara-vinho mt-1" />
                                    <div>
                                        <h4 className="font-medium">{t('consultancy.relocation.business_title')}</h4>
                                        <p className="text-sm text-neutral-500">{t('consultancy.relocation.business_desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Feature */}
                        <div className="flex-1 relative h-[400px] w-full bg-white p-8 rounded-3xl shadow-xl flex items-center justify-center border border-neutral-100">
                            <div className="text-center space-y-4">
                                <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto text-white">
                                    <Globe className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-light">{t('consultancy.relocation.global_title')}</h3>
                                <p className="text-neutral-500 max-w-xs mx-auto">
                                    {t('consultancy.relocation.global_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppButton phoneNumber="+351123456789" message="Hello, I need assistance with relocation/visas." />
            <BackToTop />
        </div>
    );
};

export default Consultancy;