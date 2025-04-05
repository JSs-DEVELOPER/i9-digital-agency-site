
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const blogPosts = [
  {
    id: 1,
    title: "10 Estratégias Avançadas de SEO para Aumentar seu Tráfego Orgânico",
    excerpt: "Descubra técnicas avançadas de otimização para motores de busca que podem transformar seu desempenho orgânico.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-seo.jpg",
    date: "12 Out 2024",
    category: "SEO",
    content: `
      <h2>10 Estratégias Avançadas de SEO para Aumentar seu Tráfego Orgânico</h2>
      
      <p>O Search Engine Optimization (SEO) continua sendo uma das estratégias mais eficientes para atrair tráfego qualificado para seu site. Com os algoritmos dos motores de busca em constante evolução, é essencial adotar técnicas avançadas que vão além do básico. Neste artigo, compartilhamos 10 estratégias que podem transformar seu desempenho nos resultados de busca.</p>
      
      <h3>1. Otimize para Busca por Voz</h3>
      <p>Com o crescimento dos assistentes virtuais como Alexa, Google Assistant e Siri, a busca por voz está mudando a forma como as pessoas pesquisam. Otimize seu conteúdo para frases mais longas e conversacionais, focando em perguntas naturais que seus potenciais clientes poderiam fazer.</p>
      
      <h3>2. Crie Conteúdo Baseado em Intenção de Busca</h3>
      <p>Vá além das palavras-chave e foque na intenção por trás das buscas. Identifique se o usuário busca informação, navegação ou está pronto para uma transação, e crie conteúdo específico para cada estágio do funil.</p>
      
      <h3>3. Aprimore a Experiência do Usuário</h3>
      <p>Fatores como velocidade de carregamento, design responsivo e facilidade de navegação são cada vez mais importantes para o SEO. Utilize ferramentas como Google PageSpeed Insights para identificar possíveis melhorias em seu site.</p>
      
      <h3>4. Implemente Schema Markup</h3>
      <p>O Schema Markup ajuda os motores de busca a entender melhor seu conteúdo. Adicionar estes dados estruturados pode resultar em rich snippets nos resultados de busca, aumentando as taxas de clique e visibilidade.</p>
      
      <h3>5. Crie Conteúdo E-A-T</h3>
      <p>Expertise, Autoridade e Confiabilidade (E-A-T) são fatores críticos para o Google. Demonstre conhecimento profundo sobre seu nicho, obtenha backlinks de sites respeitáveis e mantenha informações transparentes sobre sua empresa.</p>
      
      <h3>6. Foque em SEO Local</h3>
      <p>Para negócios com presença física, otimizar para buscas locais é essencial. Mantenha seu perfil do Google Meu Negócio atualizado, incentive avaliações e use palavras-chave geográficas relevantes em seu conteúdo.</p>
      
      <h3>7. Adote uma Estratégia de Link Building Avançada</h3>
      <p>Backlinks de qualidade continuam sendo um importante fator de ranking. Invista em técnicas como guest posting, marketing de conteúdo e relações públicas para conseguir links de sites relevantes e autoritativos.</p>
      
      <h3>8. Otimize para Featured Snippets</h3>
      <p>Aparecer em um featured snippet pode aumentar significativamente sua visibilidade. Estruture seu conteúdo para responder perguntas específicas de forma clara e concisa, utilizando formatos como listas e tabelas.</p>
      
      <h3>9. Analise e Otimize Conteúdos Existentes</h3>
      <p>Ao invés de sempre criar novo conteúdo, revise e atualize páginas existentes que já têm autoridade. Adicione informações atualizadas, melhore a formatação e expanda o conteúdo para aumentar sua relevância.</p>
      
      <h3>10. Monitore e Adapte-se às Atualizações de Algoritmo</h3>
      <p>Os algoritmos de busca estão em constante evolução. Mantenha-se informado sobre as atualizações e ajuste sua estratégia conforme necessário para manter e melhorar suas posições nos resultados.</p>
      
      <p>Implementar estas estratégias avançadas de SEO pode não trazer resultados overnight, mas com consistência e paciência, você verá um crescimento sustentável no seu tráfego orgânico e na qualidade dos leads gerados.</p>
    `
  },
  {
    id: 2,
    title: "Como Criar uma Estratégia Eficaz de Marketing de Conteúdo",
    excerpt: "Aprenda a desenvolver uma estratégia de conteúdo que atraia, engaje e converta sua audiência em clientes fiéis.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-content.jpg",
    date: "5 Out 2024",
    category: "Marketing de Conteúdo",
    content: `
      <h2>Como Criar uma Estratégia Eficaz de Marketing de Conteúdo</h2>
      
      <p>O marketing de conteúdo tornou-se um pilar fundamental na construção de relacionamentos duradouros com clientes. Mais do que simplesmente produzir conteúdo, é necessário desenvolver uma estratégia coerente que atraia, engaje e, finalmente, converta sua audiência. Neste artigo, compartilhamos o passo a passo para criar uma estratégia de conteúdo que gera resultados tangíveis.</p>
      
      <h3>Defina Seus Objetivos</h3>
      <p>Antes de criar qualquer conteúdo, tenha clareza sobre o que deseja alcançar. Seus objetivos podem incluir aumentar o reconhecimento da marca, gerar leads, educar o mercado sobre novos produtos ou serviços, ou estabelecer autoridade no segmento. Objetivos bem definidos guiarão todas as suas decisões subsequentes.</p>
      
      <h3>Conheça Profundamente Sua Audiência</h3>
      <p>O conteúdo eficaz resolve problemas reais da sua audiência. Desenvolva personas detalhadas que representem seus clientes ideais, incluindo suas necessidades, desafios, fontes de informação e como seu produto ou serviço pode ajudá-los. Pesquisas, entrevistas e análise de dados são essenciais nesta etapa.</p>
      
      <h3>Mapeie a Jornada do Cliente</h3>
      <p>Diferentes tipos de conteúdo são adequados para diferentes estágios da jornada do cliente. Para a fase de conscientização, blog posts e infográficos educativos podem ser ideais. Na fase de consideração, webinars e estudos de caso ajudam a demonstrar seu valor. Já na fase de decisão, depoimentos e demonstrações de produtos podem ser mais eficazes.</p>
      
      <h3>Realize uma Auditoria de Conteúdo</h3>
      <p>Se você já possui conteúdo, analise o que está funcionando e o que não está. Identifique lacunas e oportunidades de melhoria. Esta análise também pode revelar conteúdos que podem ser atualizados ou repaginados em vez de criar tudo do zero.</p>
      
      <h3>Pesquise Tópicos e Palavras-chave</h3>
      <p>Combine a pesquisa de palavras-chave com os interesses da sua audiência. Ferramentas como Google Keyword Planner, SEMrush ou Ahrefs podem ajudar a identificar termos relevantes com bom volume de busca e competição gerenciável. Não esqueça de considerar a intenção de busca por trás de cada palavra-chave.</p>
      
      <h3>Crie um Calendário Editorial</h3>
      <p>Um calendário editorial bem estruturado mantém sua estratégia nos trilhos. Defina a frequência de publicação, os canais a serem utilizados e os responsáveis por cada etapa. Inclua datas importantes do seu segmento e da sua empresa para criar conteúdos relacionados.</p>
      
      <h3>Diversifique Formatos de Conteúdo</h3>
      <p>Diferentes pessoas consomem conteúdo de diferentes formas. Inclua variedade em sua estratégia: blog posts, vídeos, podcasts, infográficos, webinars, e-books, entre outros. Experimente diferentes formatos para descobrir o que ressoa melhor com sua audiência.</p>
      
      <h3>Distribua Estrategicamente</h3>
      <p>Criar conteúdo excelente é apenas metade da batalha; você precisa garantir que as pessoas o encontrem. Desenvolva uma estratégia de distribuição que inclua SEO, email marketing, redes sociais e, quando apropriado, promoção paga. Personalize sua abordagem para cada canal.</p>
      
      <h3>Analise e Otimize Continuamente</h3>
      <p>Use ferramentas analíticas para monitorar o desempenho do seu conteúdo. Métricas como tempo na página, taxa de conversão e engajamento nas redes sociais podem fornecer insights valiosos. Use estes dados para refinar sua estratégia continuamente.</p>
      
      <h3>Seja Consistente e Paciente</h3>
      <p>Os resultados do marketing de conteúdo geralmente não são imediatos. É preciso consistência e paciência para construir uma presença digital sólida. Mantenha o foco nos seus objetivos de longo prazo e continue oferecendo valor para sua audiência.</p>
      
      <p>Uma estratégia de marketing de conteúdo bem executada não apenas atrai visitantes para seu site, mas transforma esses visitantes em leads, clientes e, eventualmente, defensores da sua marca. Ao seguir estes passos e adaptar sua abordagem com base nos resultados, você estará no caminho para criar uma máquina de geração de conteúdo que impulsiona seu negócio.</p>
    `
  },
  {
    id: 3,
    title: "7 Táticas para Otimizar suas Campanhas de Google Ads",
    excerpt: "Maximize seu ROI em campanhas de Google Ads com estas táticas comprovadas para melhorar conversões.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-ads.jpg",
    date: "28 Set 2024",
    category: "Google Ads",
    content: `
      <h2>7 Táticas para Otimizar suas Campanhas de Google Ads</h2>
      
      <p>O Google Ads continua sendo uma das ferramentas mais poderosas do marketing digital para gerar resultados rápidos e mensuráveis. No entanto, com o aumento da concorrência e dos custos por clique, otimizar suas campanhas tornou-se mais importante do que nunca. Apresentamos sete táticas comprovadas para maximizar seu ROI e melhorar significativamente suas taxas de conversão.</p>
      
      <h3>1. Estruture suas Campanhas com Precisão</h3>
      <p>Uma estrutura de campanha bem organizada é fundamental para o sucesso. Segmente suas campanhas por linha de produto, tema ou objetivo de marketing. Dentro de cada campanha, crie grupos de anúncios focados em conjuntos específicos de palavras-chave relacionadas. Esta organização facilita o gerenciamento, a análise de desempenho e a otimização contínua.</p>
      
      <h3>2. Utilize Correspondência de Palavras-chave Estrategicamente</h3>
      <p>Cada tipo de correspondência de palavra-chave tem seu propósito. Comece com correspondência ampla modificada ou de frase para coletar dados, identificar termos de pesquisa valiosos e descobrir novas oportunidades. Gradualmente, refine para correspondência exata nas palavras-chave com melhor desempenho para maximizar o ROI.</p>
      
      <h3>3. Implemente uma Estratégia de Palavras-chave Negativas</h3>
      <p>Palavras-chave negativas são tão importantes quanto as positivas. Revise regularmente seus relatórios de termos de pesquisa para identificar palavras-chave irrelevantes que estão gerando cliques sem conversões. Adicione-as como negativas para evitar desperdício de orçamento e melhorar a qualidade geral da campanha.</p>
      
      <h3>4. Crie Anúncios Altamente Relevantes e Persuasivos</h3>
      <p>A qualidade dos seus anúncios afeta diretamente seu custo por clique e posicionamento. Inclua a palavra-chave principal no título e na descrição, destaque benefícios únicos, adicione um call-to-action claro e utilize extensões de anúncio para aumentar a visibilidade. Sempre teste diferentes versões para identificar o que ressoa melhor com seu público.</p>
      
      <h3>5. Otimize suas Landing Pages</h3>
      <p>O trabalho não termina quando alguém clica no seu anúncio. Suas landing pages devem ser rápidas, responsivas e otimizadas para conversão. Mantenha uma mensagem consistente entre o anúncio e a página, simplifique o processo de conversão e teste diferentes elementos (títulos, imagens, formulários) para melhorar continuamente as taxas de conversão.</p>
      
      <h3>6. Implemente Licitação Baseada em Conversão</h3>
      <p>Estratégias de licitação automática como CPA-alvo (Custo por Aquisição) ou ROAS-alvo (Retorno sobre Investimento em Publicidade) podem otimizar seus lances em tempo real para maximizar conversões dentro do seu orçamento. Estas estratégias utilizam machine learning para ajustar lances com base em múltiplos sinais que afetam a probabilidade de conversão.</p>
      
      <h3>7. Segmente e Personalize suas Campanhas</h3>
      <p>Utilize recursos de segmentação para entregar anúncios mais relevantes. Ajuste seus lances e mensagens com base em dispositivo, localização, horário do dia ou públicos específicos. Implemente listas de remarketing para reconectar-se com visitantes anteriores do site com mensagens personalizadas baseadas em suas interações prévias.</p>
      
      <p>A otimização de campanhas de Google Ads não é um evento único, mas um processo contínuo. Monitore de perto seus principais indicadores de desempenho, teste novas abordagens regularmente e esteja atento às mudanças na plataforma e no comportamento dos usuários. Com estas táticas implementadas sistematicamente, você verá melhorias significativas no desempenho das suas campanhas e no retorno sobre seu investimento em publicidade digital.</p>
    `
  }
];

const BlogPreview = () => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <section id="blog" className="container-section">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
          Blog
        </span>
        <h2 className="section-title">Conteúdo para impulsionar seu negócio</h2>
        <p className="section-subtitle">
          Artigos, tutoriais e insights para ajudar a manter sua estratégia de marketing digital à frente da concorrência.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="inline-block px-3 py-1 bg-i9-blue/10 text-i9-blue text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-i9-blue transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              
              <Button
                variant="ghost"
                className="flex items-center text-i9-blue font-medium hover:text-i9-blueLight transition-colors p-0"
                onClick={() => handleReadMore(post)}
              >
                Ler mais
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Blog Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block px-3 py-1 bg-i9-blue/10 text-i9-blue text-xs font-medium rounded-full">
                    {selectedPost.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {selectedPost.date}
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-left">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div 
                  className="prose dark:prose-invert prose-headings:text-foreground prose-a:text-i9-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogPreview;
