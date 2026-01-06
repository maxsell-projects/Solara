import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas Públicas
import Index from "./pages/Index";
import Services from "./pages/Services";
import RealEstate from "./pages/RealEstate";
import RealEstateDetail from "./pages/RealEstateDetail";
import Financial from "./pages/Financial";
import Consultancy from "./pages/Consultancy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Vision from "./pages/Vision";
import VisionArticles from "./pages/VisionArticles";
import VisionServices from "./pages/VisionServices";
import VisionArticleDetail from "./pages/VisionArticleDetail";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal"; // <--- Import da Página Legal

// Páginas Admin
import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPostEditor from "./pages/admin/PostEditor";
import AdminMarketEditor from "./pages/admin/MarketEditor";

// Componentes Globais
import CookieConsent from "./components/CookieConsent"; // <--- Import do Banner de Cookies

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          
          {/* HUB de Serviços */}
          <Route path="/services" element={<Services />} />
          
          {/* Sub-páginas de Serviços */}
          <Route path="/services/real-estate" element={<RealEstate />} />
          <Route path="/services/real-estate/:slug" element={<RealEstateDetail />} />
          <Route path="/services/financial" element={<Financial />} />
          <Route path="/services/consultancy" element={<Consultancy />} />

          {/* Páginas Institucionais */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} /> {/* <--- Nova Rota Legal */}

          {/* Vision Press */}
          <Route path="/vision" element={<Vision />} />
          <Route path="/vision/articles" element={<VisionArticles />} />
          <Route path="/vision/articles/:slug" element={<VisionArticleDetail />} />
          <Route path="/vision/services" element={<VisionServices />} />

          {/* Rota de Login Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Rotas Protegidas (Dashboard) */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            <Route path="/admin/posts/new" element={<AdminPostEditor />} />
            <Route path="/admin/posts/edit/:id" element={<AdminPostEditor />} />

            <Route path="/admin/markets/new" element={<AdminMarketEditor />} />
            <Route path="/admin/markets/edit/:id" element={<AdminMarketEditor />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Banner de Cookies (Aparece globalmente) */}
        <CookieConsent />
        
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;