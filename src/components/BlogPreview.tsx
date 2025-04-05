
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Linkedin, Mail, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogPost } from "@/types/BlogPost";

const blogPosts = [
  {
    title: "Como o Marketing Digital Pode Transformar Seu Negócio em 2023",
    date: "15 Março, 2023",
    excerpt: "Descubra as estratégias de marketing digital mais efetivas para impulsionar seu negócio este ano.",
    content: `<p>No cenário empresarial atual, ter uma presença digital forte não é mais opcional — é essencial. As empresas que adotam estratégias eficazes de marketing digital estão vendo resultados transformadores em seus negócios.</p>
              <h3>Por Que o Marketing Digital é Crucial Hoje</h3>
              <p>O comportamento do consumidor mudou drasticamente na última década. Hoje, a maioria dos consumidores inicia sua jornada de compra online, pesquisando produtos e serviços antes de fazer uma decisão.</p>
              <p>As estatísticas mostram que 87% dos consumidores começam suas pesquisas de produtos na internet, e 70% dos processos de compra B2B envolvem pesquisa online.</p>
              <h3>Estratégias Que Estão Funcionando em 2023</h3>
              <ul>
                <li><strong>Marketing de Conteúdo Personalizado:</strong> Conteúdo relevante e personalizado continua sendo rei, mas agora com ênfase em segmentação avançada.</li>
                <li><strong>Vídeo Marketing:</strong> Conteúdo em vídeo domina as redes sociais e tem taxas de engajamento significativamente maiores que outros formatos.</li>
                <li><strong>Marketing de Influência:</strong> Parceria com micro-influenciadores para alcançar audiências nichos altamente engajadas.</li>
                <li><strong>Marketing Automatizado:</strong> Uso de IA e automação para personalizar a experiência do cliente em escala.</li>
              </ul>
              <p>Implementar essas estratégias requer um planejamento cuidadoso e execução consistente, mas os resultados podem transformar completamente o crescimento do seu negócio.</p>`,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "SEO em 2023: O Que Realmente Funciona Agora",
    date: "27 Abril, 2023",
    excerpt: "As táticas de SEO evoluíram drasticamente. Aprenda o que está funcionando agora e o que deve ser evitado.",
    content: `<p>O SEO continua sendo uma parte vital de qualquer estratégia de marketing digital, mas as táticas que funcionaram há alguns anos podem não ser mais eficazes hoje.</p>
              <h3>As Mudanças Mais Importantes no SEO</h3>
              <p>Os algoritmos dos mecanismos de busca estão cada vez mais sofisticados, com foco em intenção de pesquisa e experiência do usuário, em vez de palavras-chave isoladas.</p>
              <p>O Google agora utiliza inteligência artificial através do BERT e MUM para entender o contexto das pesquisas e fornecer resultados mais relevantes.</p>
              <h3>Táticas de SEO Que Funcionam em 2023</h3>
              <ul>
                <li><strong>Conteúdo Orientado para Clusters de Tópicos:</strong> Organizar o conteúdo em tópicos relacionados em vez de palavras-chave isoladas.</li>
                <li><strong>Otimização para Intenção de Pesquisa:</strong> Compreender e atender à verdadeira intenção por trás das pesquisas dos usuários.</li>
                <li><strong>Core Web Vitals:</strong> Garantir que seu site tenha boa performance, especialmente em dispositivos móveis.</li>
                <li><strong>EAT (Expertise, Autoridade, Confiabilidade):</strong> Demonstrar credibilidade e autoridade em seu nicho.</li>
              </ul>
              <p>Adaptar sua estratégia de SEO para estas tendências atuais pode resultar em um aumento significativo no tráfego orgânico e nas conversões.</p>`,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "Como Criar Campanhas de Email Marketing com Alto Retorno",
    date: "10 Maio, 2023",
    excerpt: "Email marketing continua oferecendo o maior ROI. Aprenda a criar campanhas que convertem.",
    content: `<p>Apesar do surgimento de novos canais de marketing, o email marketing continua sendo uma das estratégias com maior retorno sobre investimento, com uma média de R$42 para cada R$1 investido.</p>
              <h3>Por Que o Email Marketing Ainda Funciona</h3>
              <p>O email oferece uma linha direta para o consumidor, sem algoritmos limitando seu alcance. Além disso, é uma forma de comunicação que o usuário já está acostumado a usar diariamente.</p>
              <p>Com as ferramentas certas, é possível personalizar e segmentar suas campanhas de email para atingir exatamente as pessoas certas com a mensagem certa.</p>
              <h3>Estratégias Para Campanhas de Email de Alto Desempenho</h3>
              <ul>
                <li><strong>Segmentação Avançada:</strong> Dividir sua lista em segmentos específicos baseados em comportamento, demografia e estágio no funil de vendas.</li>
                <li><strong>Personalização Além do Nome:</strong> Personalizar o conteúdo com base no histórico de interações e preferências do usuário.</li>
                <li><strong>Automação Inteligente:</strong> Criar fluxos de emails que respondem ao comportamento do usuário em tempo real.</li>
                <li><strong>Testes A/B Contínuos:</strong> Testar diferentes elementos como assunto, hora de envio e design para otimizar resultados.</li>
              </ul>
              <p>Implementando estas estratégias, suas campanhas de email podem se tornar uma fonte consistente e lucrativa de conversões para seu negócio.</p>`,
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Redes Sociais em 2023: Estratégias Que Realmente Geram Resultados",
    date: "22 Junho, 2023",
    excerpt: "Com tantas mudanças nas redes sociais, aprenda quais estratégias estão realmente gerando ROI.",
    content: `<p>As redes sociais estão em constante evolução, e o que funcionou no ano passado pode não funcionar mais hoje. As marcas precisam adaptar suas estratégias para permanecer relevantes e eficazes.</p>
              <h3>As Principais Tendências de Redes Sociais</h3>
              <p>Vídeos curtos continuam dominando, com plataformas como TikTok e Instagram Reels liderando em engajamento. Conteúdo autêntico e menos produzido está superando o conteúdo excessivamente polido.</p>
              <p>As marcas estão encontrando sucesso em construir comunidades em vez de apenas buscar números de seguidores.</p>
              <h3>Estratégias Eficazes para Redes Sociais</h3>
              <ul>
                <li><strong>Marketing de Comunidade:</strong> Fomentar espaços onde seus seguidores possam se conectar entre si em torno de interesses compartilhados.</li>
                <li><strong>Narrativa Visual:</strong> Contar histórias convincentes usando formatos visuais como vídeos curtos e infográficos interativos.</li>
                <li><strong>Social Selling:</strong> Transformar seguidores em clientes através de estratégias de venda suaves e diretas dentro das plataformas.</li>
                <li><strong>Estratégia de Nicho:</strong> Focar em plataformas específicas onde seu público-alvo está mais ativo, em vez de tentar estar em todas as redes.</li>
              </ul>
              <p>As redes sociais continuam sendo um canal vital para construção de marca e geração de leads, mas requerem uma abordagem mais estratégica e focada do que nunca.</p>`,
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Como Utilizar IA para Otimizar Suas Estratégias de Marketing",
    date: "08 Julho, 2023",
    excerpt: "Inteligência Artificial está revolucionando o marketing. Descubra como utilizá-la a seu favor.",
    content: `<p>A Inteligência Artificial não é mais uma tecnologia do futuro – ela está aqui e está transformando a maneira como fazemos marketing digital. As empresas que estão aproveitando o poder da IA estão obtendo vantagens competitivas significativas.</p>
              <h3>Como a IA Está Mudando o Marketing</h3>
              <p>A IA permite personalização em escala, análise preditiva e automação de tarefas repetitivas, permitindo que os profissionais de marketing foquem em estratégia e criatividade.</p>
              <p>As ferramentas de IA agora podem analisar grandes volumes de dados e extrair insights acionáveis que seriam impossíveis de se obter manualmente.</p>
              <h3>Aplicações Práticas da IA no Marketing</h3>
              <ul>
                <li><strong>Chatbots Avançados:</strong> Assistentes virtuais que podem lidar com consultas de clientes 24/7 de forma personalizada.</li>
                <li><strong>Criação de Conteúdo:</strong> Ferramentas que podem gerar ou otimizar conteúdo para diferentes canais e públicos.</li>
                <li><strong>Análise Preditiva:</strong> Prever comportamentos futuros dos clientes com base em padrões históricos.</li>
                <li><strong>Personalização Dinâmica:</strong> Adaptar automaticamente conteúdo e ofertas com base em comportamentos em tempo real.</li>
              </ul>
              <p>A chave é encontrar o equilíbrio certo entre automação e toque humano para criar experiências que sejam eficientes, mas também genuínas e envolventes.</p>`,
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

const BlogPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [api, setApi] = useState<any>(null);
  
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  
  const handleShare = (platform: string) => {
    if (!selectedPost) return;
    
    const url = window.location.href;
    const title = selectedPost.title;
    
    let shareUrl = "";
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Confira este artigo: ${title} - ${url}`)}`;
        break;
    }
    
    if (shareUrl) window.open(shareUrl, "_blank");
  };

  useEffect(() => {
    if (api) {
      const interval = setInterval(() => {
        api.scrollNext(); // Changed from scrollPrev to scrollNext for right to left movement
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [api]);

  return (
    <section id="blog" className="container-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50 -z-20"></div>
      
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-i9-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-i9-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
            Blog
          </span>
          <p className="section-subtitle">
            Artigos, tutoriais e insights para ajudar a manter sua estratégia de marketing digital à frente da concorrência.
          </p>
        </div>
        
        <div className="relative px-6 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="flex">
              {blogPosts.map((post, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto">
                        <Button 
                          onClick={() => handleReadMore(post)} 
                          variant="ghost" 
                          className="text-i9-blue hover:text-i9-blue hover:bg-i9-blue/10 p-0 h-auto flex items-center font-medium"
                        >
                          Ler mais <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 right-0 flex justify-between pointer-events-none z-10 px-2 md:-mx-8">
              <CarouselPrevious className="relative pointer-events-auto w-12 h-12" />
              <CarouselNext className="relative pointer-events-auto w-12 h-12" />
            </div>
          </Carousel>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold">{selectedPost.title}</DialogTitle>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{selectedPost.date}</span>
                  </div>
                </DialogHeader>
                
                <div className="mt-6">
                  <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <article 
                    className="prose dark:prose-invert prose-img:rounded-lg prose-headings:font-semibold prose-a:text-i9-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Compartilhar:
                      </span>
                      <button 
                        onClick={() => handleShare("twitter")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare("facebook")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare("linkedin")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Linkedin size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>
                      <button 
                        onClick={() => handleShare("email")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Mail size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BlogPreview;
