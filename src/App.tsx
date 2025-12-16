import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Usamos HashRouter para compatibilidade com deploy estático (ex: GitHub Pages)
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas Públicas
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Vision from "./pages/Vision";
import VisionArticles from "./pages/VisionArticles";
import VisionServices from "./pages/VisionServices";
import VisionArticleDetail from "./pages/VisionArticleDetail";
import NotFound from "./pages/NotFound";

// Páginas Admin (Certifica-te que criaste estes ficheiros anteriormente)
import AdminRoute from "./components/AdminRoute";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPostEditor from "./pages/admin/PostEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
          </Route>

          {/* Rota 404 - Deve ser sempre a última */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;