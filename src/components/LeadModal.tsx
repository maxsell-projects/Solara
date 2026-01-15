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

interface LeadModalProps {
  children: React.ReactNode; // O botão que vai abrir o modal
  brand: BrandType;
  defaultService?: string;
  title?: string;
  description?: string;
}

export function LeadModal({ 
  children, 
  brand, 
  defaultService,
  title = "Iniciar Conversa",
  description = "Preencha o formulário abaixo e entraremos em contacto brevemente."
}: LeadModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-light ${brand === 'vision' ? 'text-vision-green' : 'text-solara-vinho'}`}>
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
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