import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SERVICE_OPTIONS, BrandType } from "@/lib/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // <--- Import do i18n

interface LeadFormProps {
  brand: BrandType;
  defaultService?: string;
  onSuccess?: () => void;
}

export function LeadForm({ brand, defaultService, onSuccess }: LeadFormProps) {
  const { t } = useTranslation(); // <--- Hook
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Schema de Validação (usando t dentro do componente para pegar a tradução atual)
  const formSchema = z.object({
    name: z.string().min(2, t('form.validation_name')),
    email: z.string().email(t('form.validation_email')),
    phone: z.string().min(9, t('form.validation_phone')),
    service: z.string({ required_error: t('form.validation_service') }),
    message: z.string().optional(),
  });

  const styles = {
    solara: {
      btn: "bg-solara-vinho hover:bg-solara-vinho/90 text-white",
      ring: "focus-visible:ring-solara-vinho",
      label: "text-solara-vinho",
    },
    vision: {
      btn: "bg-vision-green hover:bg-vision-green/90 text-white",
      ring: "focus-visible:ring-vision-green",
      label: "text-vision-green",
    }
  };

  const currentStyle = styles[brand];
  const services = SERVICE_OPTIONS[brand];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: defaultService || "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Simulação
      console.log("Enviando Lead:", { ...values, brand });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success(t('form.success_msg'));
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(t('form.error_msg'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.name_label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.name_placeholder')} {...field} className={currentStyle.ring} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.email_label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.email_placeholder')} {...field} className={currentStyle.ring} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('form.phone_label')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('form.phone_placeholder')} {...field} className={currentStyle.ring} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.service_label')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={currentStyle.ring}>
                    <SelectValue placeholder={t('form.service_placeholder')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((group, idx) => (
                    <SelectGroup key={idx}>
                      <SelectLabel className={`px-2 py-1.5 text-sm font-semibold ${currentStyle.label}`}>
                        {group.category}
                      </SelectLabel>
                      {group.items.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.message_label')}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={t('form.message_placeholder')} 
                  className={`resize-none min-h-[100px] ${currentStyle.ring}`} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={`w-full ${currentStyle.btn}`} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.submitting_btn')}
            </>
          ) : (
            t('form.submit_btn')
          )}
        </Button>
      </form>
    </Form>
  );
}