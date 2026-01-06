import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Legal = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("privacy");

  // Permite abrir a página direto na aba correta via URL (ex: /legal?section=cookies)
  useEffect(() => {
    const section = searchParams.get("section");
    if (section && ["privacy", "terms", "cookies", "notice"].includes(section)) {
      setActiveTab(section);
    }
  }, [searchParams]);

  // Função auxiliar para renderizar seções
  const renderSection = (key: string, introKey?: string) => {
    // Nota: Isto assume que as chaves no JSON são arrays. 
    // O i18next devolve objetos/arrays se usarmos returnObjects: true
    const sections = t(`legal.${key}.sections`, { returnObjects: true }) as Array<{ title: string; content: string }>;
    
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-light text-solara-vinho mb-6">{t(`legal.${key}.title`)}</h2>
        {introKey && (
          <p className="text-lg text-neutral-600 font-light mb-8 border-l-4 border-vision-green pl-4">
            {t(`legal.${key}.${introKey}`)}
          </p>
        )}
        <div className="space-y-8">
          {Array.isArray(sections) && sections.map((sec, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-medium mb-2 text-neutral-800">{sec.title}</h3>
              <p className="text-neutral-600 font-light leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-center mb-12">
            {t('legal.title')}
          </h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1 bg-white border shadow-sm">
              <TabsTrigger value="privacy" className="py-3 data-[state=active]:bg-solara-vinho data-[state=active]:text-white">
                {t('legal.tabs.privacy')}
              </TabsTrigger>
              <TabsTrigger value="terms" className="py-3 data-[state=active]:bg-solara-vinho data-[state=active]:text-white">
                {t('legal.tabs.terms')}
              </TabsTrigger>
              <TabsTrigger value="cookies" className="py-3 data-[state=active]:bg-solara-vinho data-[state=active]:text-white">
                {t('legal.tabs.cookies')}
              </TabsTrigger>
              <TabsTrigger value="notice" className="py-3 data-[state=active]:bg-solara-vinho data-[state=active]:text-white">
                {t('legal.tabs.notice')}
              </TabsTrigger>
            </TabsList>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 md:p-12">
                <TabsContent value="privacy">
                  {renderSection("privacy_content", "intro")}
                </TabsContent>
                <TabsContent value="terms">
                  {renderSection("terms_content", "intro")}
                </TabsContent>
                <TabsContent value="cookies">
                  {renderSection("cookies_content", "intro")}
                </TabsContent>
                <TabsContent value="notice">
                  {renderSection("notice_content")}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;