import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100 transition-colors">
          <Globe className="h-5 w-5 text-neutral-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-white/95 backdrop-blur-sm shadow-lg border-neutral-100">
        <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer gap-2 py-2">
          <span className="text-lg">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('pt')} className="cursor-pointer gap-2 py-2">
          <span className="text-lg">🇵🇹</span> Português
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('es')} className="cursor-pointer gap-2 py-2">
          <span className="text-lg">🇪🇸</span> Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('fr')} className="cursor-pointer gap-2 py-2">
          <span className="text-lg">🇫🇷</span> Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;