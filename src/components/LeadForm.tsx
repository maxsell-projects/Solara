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

// Schema de Validação
const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(9, "Telefone inválido"),
  service: z.string({ required_error: "Selecione um serviço" }),
  message: z.string().optional(),
});

interface LeadFormProps {
  brand: BrandType;
  defaultService?: string;
  onSuccess?: () => void;
}

export function LeadForm({ brand, defaultService, onSuccess }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Definição de Cores Dinâmicas baseadas na Brand
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
    
    // Simulação de envio para API
    try {
      console.log("Enviando Lead:", { ...values, brand });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Solicitação recebida com sucesso!");
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
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
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} className={currentStyle.ring} />
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
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} className={currentStyle.ring} />
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
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="+351..." {...field} className={currentStyle.ring} />
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
              <FormLabel>Interesse</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={currentStyle.ring}>
                    <SelectValue placeholder="Selecione o serviço" />
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
              <FormLabel>Mensagem (Opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Conte-nos um pouco sobre o seu objetivo..." 
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
            </>
          ) : (
            "Solicitar Contacto"
          )}
        </Button>
      </form>
    </Form>
  );
}