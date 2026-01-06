import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next"; // <--- Import i18n

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const { t } = useTranslation(); // <--- Hook
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    area: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t('contact.messages.success_title'),
          description: t('contact.messages.success_desc'),
          variant: "default",
        });
        setFormData({ name: "", email: "", area: "", message: "" });
      } else {
        throw new Error(data.error || "Erro ao enviar");
      }
    } catch (error) {
      toast({
        title: t('contact.messages.error_title'),
        description: t('contact.messages.error_desc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `${t('contact.messages.whatsapp_body')} ${formData.area || 'Solara Project'}.`
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-neutral-50 to-background">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-light mb-4">
            {t('contact.hero.label')}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight">
            {t('contact.hero.title_line1')}
            <br />
            <span className="text-primary">{t('contact.hero.title_line2')}</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('contact.hero.description')}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                {t('contact.form.title')} <span className="text-primary">{t('contact.form.title_highlight')}</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-light">{t('contact.form.name_label')}</Label>
                  <Input 
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-light">{t('contact.form.email_label')}</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={isLoading}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="font-light">{t('contact.form.area_label')}</Label>
                  <Select 
                    value={formData.area} 
                    onValueChange={(value) => setFormData({...formData, area: value})}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t('contact.form.area_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solara">{t('contact.form.area_options.solara')}</SelectItem>
                      <SelectItem value="vision">{t('contact.form.area_options.vision')}</SelectItem>
                      <SelectItem value="both">{t('contact.form.area_options.both')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-light">{t('contact.form.message_label')}</Label>
                  <Textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    disabled={isLoading}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? t('contact.form.btn_sending') : t('contact.form.btn_submit')}
                  </Button>
                  <Button 
                    type="button"
                    size="lg" 
                    variant="outline"
                    className="flex-1 border-2"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/351912345678?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {t('contact.form.btn_whatsapp')}
                    </a>
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-light mb-6">
                  {t('contact.info.title')} <span className="text-primary">{t('contact.info.title_highlight')}</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-50 rounded-2xl">
                    <h4 className="font-light text-lg mb-2">Solara Project</h4>
                    <p className="text-sm text-muted-foreground font-light mb-1">
                      {t('contact.info.solara_desc')}
                    </p>
                    <a 
                      href="mailto:info@solaraproject.pt" 
                      className="text-primary hover:underline font-light"
                    >
                      info@solaraproject.pt
                    </a>
                  </div>

                  <div className="p-6 bg-neutral-50 rounded-2xl">
                    <h4 className="font-light text-lg mb-2">Vision Press</h4>
                    <p className="text-sm text-muted-foreground font-light mb-1">
                      {t('contact.info.vision_desc')}
                    </p>
                    <a 
                      href="mailto:contact@visionpress.pt" 
                      className="hover:underline font-light"
                      style={{ color: 'hsl(100, 22%, 13%)' }}
                    >
                      contact@visionpress.pt
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-6">
                  {t('contact.info.social_title')} <span className="text-primary">{t('contact.info.social_highlight')}</span>
                </h3>
                
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-border rounded-full hover:border-primary transition-colors font-light"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-border rounded-full hover:border-primary transition-colors font-light"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-border rounded-full hover:border-primary transition-colors font-light"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-neutral-50 to-background rounded-3xl border border-border">
                <h3 className="text-xl font-light mb-4">{t('contact.info.schedule_title')}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {t('contact.info.schedule_days')}
                  <br />
                  {t('contact.info.schedule_saturday')}
                  <br />
                  {t('contact.info.schedule_sunday')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton 
        phoneNumber="+351123456789" 
        message={t('contact.messages.whatsapp_body')}
        brand="solara"
      />
      <BackToTop />
      <ExitIntentPopup brand="solara" />
    </div>
  );
};

export default Contact;