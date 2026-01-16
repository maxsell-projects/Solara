import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";
import { BrandType } from "@/lib/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // <--- Import

interface LeadModalProps {
  children: React.ReactNode;
  brand: BrandType;
  defaultService?: string;
  title?: string;
  description?: string;
}

export function LeadModal({ 
  children, 
  brand, 
  defaultService,
  title,       // Removemos o valor default daqui
  description  // Removemos o valor default daqui
}: LeadModalProps) {
  const { t } = useTranslation(); // <--- Hook
  const [open, setOpen] = useState(false);

  // Definimos os textos finais: ou o que veio via prop, ou a tradução padrão
  const finalTitle = title || t('form.modal_default_title');
  const finalDescription = description || t('form.modal_default_description');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-light ${brand === 'vision' ? 'text-vision-green' : 'text-solara-vinho'}`}>
            {finalTitle}
          </DialogTitle>
          <DialogDescription>
            {finalDescription}
          </DialogDescription>
        </DialogHeader>
        
        <LeadForm 
          brand={brand} 
          defaultService={defaultService} 
          onSuccess={() => setOpen(false)} 
        />
        
      </DialogContent>
    </Dialog>
  );
}