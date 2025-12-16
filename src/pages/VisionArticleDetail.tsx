import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import visionImg from "@/assets/vision-editorial.jpg";
import logoVision from "@/assets/logo-vision.png";
import signatureCamila from "@/assets/signature-camila.png";
import { useEffect } from "react";

// Função para garantir que usamos a mesma lógica de slug da listagem
const normalizeSlug = (slug: string) => slug?.toLowerCase();

const articlesData: Record<string, {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  image: string;
  content: string;
}> = {
  "o-futuro-dos-investimentos-imobiliarios-sustentaveis": {
    title: "O Futuro dos Investimentos Imobiliários Sustentáveis",
    subtitle: "Como a consciência ambiental está a transformar o mercado imobiliário e a criar novas oportunidades de valorização a longo prazo.",
    category: "Imobiliário",
    date: "15 Jan 2025",
    readTime: "8 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>O mercado imobiliário global atravessa um momento de transformação profunda. Já não se trata apenas de localização e preço por metro quadrado; a variável da sustentabilidade tornou-se um pilar central na avaliação de ativos e na projeção de rentabilidade futura.</p>
      
      <h3>A Nova Métrica de Valor</h3>
      <p>Investidores institucionais e family offices estão a reconfigurar os seus portfólios. Edifícios com certificações ambientais (como LEED ou BREEAM) não só apresentam custos operacionais mais baixos, como demonstram uma resiliência superior em tempos de crise e uma maior capacidade de retenção de inquilinos de alta qualidade.</p>
      
      <p>Na Solara, observamos que a "consciência do tijolo" vai além da eficiência energética. Envolve o impacto na comunidade, a qualidade do ar interior e a integração com a mobilidade urbana sustentável. Estes fatores, anteriormente considerados intangíveis, são hoje mensuráveis e monetizáveis.</p>

      <blockquote>"Investir com consciência não é uma restrição ao lucro; é a única forma de garantir a sua perenidade num mundo em mudança."</blockquote>

      <h3>Estratégia Visionária</h3>
      <p>Para o investidor moderno, a pergunta mudou de "quanto rende este imóvel hoje?" para "qual será a relevância deste ativo daqui a 10 anos?". Ativos que ignoram os critérios ESG (Environmental, Social, and Governance) correm o risco real de se tornarem obsoletos precocemente.</p>
      
      <p>A nossa abordagem na Vision Press procura descodificar estas tendências, oferecendo aos nossos parceiros não apenas dados, mas uma narrativa estratégica que conecta o capital ao propósito.</p>
    `
  },
  "comunicacao-estrategica-em-tempos-de-transformacao": {
    title: "Comunicação Estratégica em Tempos de Transformação",
    subtitle: "A importância de uma narrativa autêntica na construção de marcas que resistem ao tempo e conquistam confiança.",
    category: "Negócios",
    date: "12 Jan 2025",
    readTime: "6 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>Numa era de ruído digital incessante, o verdadeiro luxo é a clareza. Marcas que tentam falar sobre tudo acabam por não dizer nada. A comunicação estratégica não é sobre volume, é sobre ressonância.</p>

      <h3>A Narrativa como Ativo</h3>
      <p>Observamos uma mudança de paradigma: consumidores e investidores não compram apenas produtos ou serviços; compram histórias, valores e visões de mundo. Uma narrativa corporativa coerente funciona como um ativo intangível que valoriza a empresa muito além do seu balanço financeiro.</p>

      <blockquote>"A autenticidade é a moeda mais forte da economia da atenção."</blockquote>

      <p>Na Vision Press, ajudamos líderes a encontrar a sua voz autêntica. Não se trata de criar uma 'persona', mas de revelar a essência estratégica que já existe e comunicá-la com precisão cirúrgica aos stakeholders certos.</p>
    `
  },
  "tendencias-financeiras-para-2025-analise-e-perspetivas": {
    title: "Tendências Financeiras para 2025: Análise e Perspetivas",
    subtitle: "Um olhar profundo sobre os movimentos de mercado, oportunidades emergentes e estratégias para investidores conscientes.",
    category: "Finanças",
    date: "8 Jan 2025",
    readTime: "10 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>À medida que nos aproximamos de 2025, o cenário financeiro global apresenta uma dicotomia interessante: por um lado, a volatilidade geopolítica; por outro, a maturação de novas classes de ativos digitais e sustentáveis.</p>

      <h3>O Regresso dos Tangíveis</h3>
      <p>Após anos de exuberância digital, notamos um movimento de "flight to quality" em direção a ativos reais. Imobiliário de nicho, infraestruturas sustentáveis e commodities estratégicas estão a voltar ao radar dos grandes gestores de património.</p>

      <p>A diversificação inteligente para 2025 não passa apenas por espalhar o capital por diferentes geografias, mas por diferentes teses de impacto. O capital paciente, que procura valorização estrutural a longo prazo, está a superar as estratégias de trading de curto prazo.</p>
    `
  },
  "a-revolucao-silenciosa-da-consciencia-nos-negocios": {
    title: "A Revolução Silenciosa da Consciência nos Negócios",
    subtitle: "Como empresas líderes estão a integrar propósito e lucro, criando um novo paradigma de sucesso sustentável.",
    category: "Sociedade",
    date: "5 Jan 2025",
    readTime: "7 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>O conceito de "Stakeholder Capitalism" deixou de ser uma buzzword de Davos para se tornar uma exigência operacional. Empresas que não cuidam da sua cadeia de valor, dos seus colaboradores e do seu impacto ambiental estão a perder acesso a capital barato.</p>

      <h3>Lucro com Propósito</h3>
      <p>A revolução silenciosa acontece nas salas de conselho onde o "Custo da Inação" começa a ser calculado. Ignorar as mudanças sociais e climáticas é agora visto como um erro de gestão de risco grave.</p>

      <blockquote>"O negócio do futuro é aquele que regenera, não apenas o que extrai."</blockquote>
    `
  },
  "tecnologia-e-humanidade-o-equilibrio-necessario": {
    title: "Tecnologia e Humanidade: O Equilíbrio Necessário",
    subtitle: "Explorando como a inovação tecnológica pode servir valores humanos autênticos sem perder a essência.",
    category: "Tendências",
    date: "2 Jan 2025",
    readTime: "9 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>A inteligência artificial e a automação estão a redefinir a produtividade, mas nunca substituirão a intuição, a empatia e a ética – qualidades intrinsecamente humanas que são cruciais para a tomada de decisões de alto nível.</p>

      <h3>High Tech, High Touch</h3>
      <p>Na Solara, acreditamos na tecnologia como um amplificador da capacidade humana, não como um substituto. Utilizamos dados avançados para informar as nossas estratégias de investimento, mas a decisão final passa sempre pelo filtro da sabedoria e da experiência humana.</p>
    `
  },
  "investimento-com-impacto-alem-do-retorno-financeiro": {
    title: "Investimento com Impacto: Além do Retorno Financeiro",
    subtitle: "A ascensão dos investimentos de impacto e como alinhar rentabilidade com transformação social positiva.",
    category: "Finanças",
    date: "28 Dez 2024",
    readTime: "11 min de leitura",
    author: "Camila Montenegro",
    role: "Founding Partner",
    image: visionImg,
    content: `
      <p>O Impact Investing atingiu a maioridade. Já não é filantropia disfarçada, mas uma classe de ativos robusta que procura gerar retorno financeiro competitivo juntamente com um impacto social ou ambiental mensurável.</p>

      <h3>O Poder do Capital</h3>
      <p>Cada euro investido é um voto no tipo de mundo que queremos construir. Desde energias renováveis a habitação acessível, as oportunidades para alocar capital de forma regenerativa são vastas e financeiramente atrativas.</p>
    `
  }
};

const VisionArticleDetail = () => {
  const { slug } = useParams();
  
  // Tenta encontrar o artigo. Se não achar, usa o primeiro como fallback (opcional)
  // ou mostra uma mensagem de erro
  const articleKey = slug ? normalizeSlug(slug) : "";
  const article = articlesData[articleKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Header />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-light text-foreground">Artigo não encontrado</h2>
          <Link to="/vision/articles">
            <Button variant="outline" className="border-vision-green text-vision-green">
              Voltar aos Artigos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-vision-light/30">
      <Header />

      <main className="pt-32 pb-24">
        {/* Article Header */}
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge className="bg-vision-green/10 text-vision-green hover:bg-vision-green hover:text-white transition-colors font-normal px-4 py-1 pointer-events-none">
              {article.category}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground border-y border-vision-green/20 py-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border border-vision-green/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-vision-green text-white text-xs">CM</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-foreground">{article.author}</p>
                <p className="text-xs">{article.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8 hidden sm:block bg-vision-green/20" />
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-vision-green" />
              <span>{article.date}</span>
            </div>
            <Separator orientation="vertical" className="h-8 hidden sm:block bg-vision-green/20" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-vision-green" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] overflow-hidden rounded-sm shadow-xl max-w-6xl mx-auto group">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl">
          
          {/* Sidebar - Actions */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-end gap-4 sticky top-32 h-fit">
            <Link to="/vision/articles">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-vision-green/10 hover:text-vision-green mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-vision-green/20 hover:border-vision-green hover:text-vision-green hover:bg-vision-light/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-vision-green/20 hover:border-vision-green hover:text-vision-green hover:bg-vision-light/10 transition-colors">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="lg:col-span-8 relative">
            {/* A "Estampa" / Marca d'água de fundo */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 opacity-[0.03] pointer-events-none rotate-12 z-0">
              <img src={logoVision} alt="" className="w-full h-full object-contain" />
            </div>

            <article className="prose prose-lg prose-stone max-w-none relative z-10
              prose-headings:font-serif prose-headings:font-medium prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-8 prose-p:font-light
              prose-blockquote:border-l-4 prose-blockquote:border-vision-green prose-blockquote:text-vision-green prose-blockquote:bg-vision-green/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
              prose-strong:text-foreground prose-strong:font-medium">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            {/* Signature Section */}
            <div className="mt-16 pt-12 border-t border-vision-green/20">
              <div className="flex flex-col gap-6">
                <img 
                  src={signatureCamila} 
                  alt={`Assinatura de ${article.author}`} 
                  className="h-24 w-auto object-contain self-start opacity-80"
                />
                <div>
                  <h4 className="font-serif text-xl mb-2 text-foreground">{article.author}</h4>
                  <p className="text-muted-foreground font-light text-sm max-w-md">
                    Especialista em investimentos estratégicos e comunicação corporativa. 
                    Founding Partner da Solara Project e Editora-Chefe da Vision Press.
                  </p>
                </div>
              </div>
            </div>
          </div>
           
          {/* Empty right column for balance */}
          <div className="lg:col-span-2"></div>
        </div>
      </main>

      {/* Next Read / Footer CTA */}
      <section className="bg-neutral-50 py-16 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl mb-6 text-muted-foreground italic">Continue a ler</h3>
          <Link to="/vision/articles">
            <Button size="lg" variant="outline" className="border-vision-green text-vision-green hover:bg-vision-green hover:text-white px-8 transition-all duration-300">
              Voltar à Lista de Artigos
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionArticleDetail;