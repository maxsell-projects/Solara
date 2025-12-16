import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// CORRIGIDO: Importação ajustada para resolver o erro 2307
import * as path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // CORRIGIDO: Removido o caminho base não-root ("/Solara/").
  // O BrowserRouter exige que o aplicativo seja implantado na raiz (base: '/') para URLs limpas.
  // Deixando esta linha de fora, o Vite usará automaticamente a base: '/'.
  // Se precisar de '/Solara/' para produção, terá que configurar reescrita de URL no servidor.
  // base: "/Solara/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      // CORRIGIDO: Usando process.cwd() (Current Working Directory) em vez de __dirname 
      // para resolver o erro 2304 e garantir compatibilidade.
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
}));