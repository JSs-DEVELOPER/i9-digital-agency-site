
import { useState, useRef, useEffect } from "react";
import { SearchIcon, BarChart3, MonitorSmartphone, LineChart, MessageSquare, Target, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ServiceModal, type ServiceDetailProps } from "@/components/ServiceModal";
import { useMediaQuery } from "@/hooks/use-media-query";

const serviceData: ServiceDetailProps[] = [
  {
    icon: SearchIcon,
    title: "SEO",
    description: "Melhore seu posicionamento orgânico nos motores de busca e aumente sua visibilidade online.",
    detailedDescription: "Nossa estratégia de SEO é completa, abrangendo otimização on-page, off-page e técnica para melhorar o ranking do seu site nas páginas de resultados dos mecanismos de busca. Trabalhamos com pesquisa avançada de palavras-chave, análise de concorrentes, criação de conteúdo otimizado e construção de links de qualidade.",
    features: [
      "Análise técnica completa do site",
      "Pesquisa avançada de palavras-chave",
      "Otimização on-page",
      "Construção de links de qualidade",
      "Relatórios mensais de performance",
      "Análise de concorrentes",
      "Monitoramento de rankings"
    ],
    priceRange: "R$ 800 - R$ 3.500 / mês"
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description: "Campanhas de anúncios otimizadas no Google para atrair leads qualificados e aumentar conversões.",
    detailedDescription: "Nossas campanhas de Google Ads são cuidadosamente planejadas e otimizadas para maximizar o retorno sobre o investimento. Utilizamos segmentação avançada, palavras-chave de alta conversão e criamos anúncios persuasivos que convertem visitantes em clientes.",
    features: [
      "Configuração completa de campanhas",
      "Segmentação avançada de públicos",
      "Criação de anúncios persuasivos",
      "Otimização contínua de campanhas",
      "Relatórios semanais de performance",
      "Remarketing estratégico",
      "Testes A/B de anúncios"
    ],
    priceRange: "R$ 1.500 - R$ 5.000 / mês + investimento em mídia"
  },
  {
    icon: MonitorSmartphone,
    title: "Redes Sociais",
    description: "Gestão estratégica de redes sociais para engajar seu público e fortalecer sua marca.",
    detailedDescription: "Nossa gestão de redes sociais vai muito além de apenas publicações. Desenvolvemos estratégias personalizadas para cada plataforma, criamos conteúdos envolventes, interagimos com sua audiência e analisamos os resultados para otimizar continuamente sua presença digital.",
    features: [
      "Planejamento estratégico mensal",
      "Produção de conteúdo personalizado",
      "Design gráfico para posts",
      "Calendário editorial",
      "Monitoramento e interação com a audiência",
      "Análise de métricas e insights",
      "Relatórios de desempenho mensais"
    ],
    priceRange: "R$ 1.200 - R$ 4.000 / mês"
  },
  {
    icon: LineChart,
    title: "Marketing de Conteúdo",
    description: "Conteúdos relevantes e otimizados para atrair, converter e fidelizar clientes.",
    detailedDescription: "Nosso serviço de marketing de conteúdo é focado em criar materiais relevantes e valiosos que atraem, engajam e convertem sua audiência. Desde artigos de blog até e-books e infográficos, desenvolvemos conteúdos alinhados com sua estratégia de negócio e otimizados para SEO.",
    features: [
      "Planejamento estratégico de conteúdo",
      "Pesquisa de palavras-chave",
      "Produção de artigos otimizados para SEO",
      "Criação de e-books e materiais ricos",
      "Revisão e otimização de conteúdos existentes",
      "Distribuição estratégica de conteúdo",
      "Análise de performance"
    ],
    priceRange: "R$ 1.000 - R$ 4.500 / mês"
  },
  {
    icon: MessageSquare,
    title: "Copywriting",
    description: "Textos persuasivos que vendem, criam conexões e transformam visitantes em clientes.",
    detailedDescription: "Nosso serviço de copywriting é especializado em criar textos persuasivos que geram conversão. De páginas de vendas a emails marketing e descrições de produtos, criamos conteúdos que cativam, engajam e incentivam seu público a tomar ação.",
    features: [
      "Desenvolvimento de páginas de vendas",
      "Criação de sequências de emails",
      "Redação de anúncios persuasivos",
      "Descrições de produtos otimizadas",
      "Revisão e otimização de textos existentes",
      "Desenvolvimento de headlines impactantes",
      "CTAs eficientes"
    ],
    priceRange: "R$ 1.200 - R$ 5.000 / projeto"
  },
  {
    icon: Target,
    title: "Facebook Ads",
    description: "Anúncios direcionados ao perfil ideal do seu cliente nas plataformas do Meta.",
    detailedDescription: "Nossa estratégia de Facebook Ads é focada em resultados. Criamos campanhas segmentadas, anúncios visualmente atrativos e mensagens persuasivas para alcançar o público certo no momento certo, maximizando suas conversões nas plataformas do Meta.",
    features: [
      "Configuração completa de campanhas",
      "Segmentação avançada de públicos",
      "Criação de anúncios criativos",
      "Testes de elementos visuais e mensagens",
      "Otimização contínua de campanhas",
      "Remarketing estratégico",
      "Relatórios semanais de performance"
    ],
    priceRange: "R$ 1.500 - R$ 5.000 / mês + investimento em mídia"
  },
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Sites e landing pages de alta performance focados em conversão e experiência do usuário.",
    detailedDescription: "Desenvolvemos sites e landing pages que não são apenas visualmente atrativos, mas também altamente funcionais e otimizados para conversão. Nosso foco está em criar experiências digitais que engajam visitantes e os transformam em clientes fiéis.",
    features: [
      "Design personalizado e responsivo",
      "Desenvolvimento com tecnologias modernas",
      "Otimização para SEO técnico",
      "Integração com ferramentas de marketing",
      "Formulários de captura de leads",
      "Páginas de checkout otimizadas",
      "Treinamento para gestão do site"
    ],
    priceRange: "R$ 3.000 - R$ 15.000 / projeto"
  },
  {
    icon: TrendingUp,
    title: "Análise de Dados",
    description: "Monitoramento e análise de dados para otimizar estratégias e maximizar resultados.",
    detailedDescription: "Nossa análise de dados transforma informações complexas em insights acionáveis para seu negócio. Monitoramos métricas-chave, identificamos tendências e oportunidades, e fornecemos recomendações estratégicas para otimizar seus resultados de marketing digital.",
    features: [
      "Configuração de Google Analytics 4",
      "Criação de dashboards personalizados",
      "Análise de funil de conversão",
      "Identificação de oportunidades de otimização",
      "Rastreamento de KPIs de marketing",
      "Relatórios executivos mensais",
      "Recomendações estratégicas baseadas em dados"
    ],
    priceRange: "R$ 1.500 - R$ 4.000 / mês"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetailProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleServiceClick = (service: ServiceDetailProps) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="container-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 dark:from-background/20 dark:to-background/40 -z-10 opacity-80"></div>
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
          Nossos Serviços
        </span>
        <h2 className="section-title">Soluções completas para seu negócio digital</h2>
        <p className="section-subtitle dark:text-gray-300">
          Oferecemos um conjunto abrangente de serviços de marketing digital para impulsionar sua marca e gerar resultados mensuráveis.
        </p>
      </div>

      <div className="mt-12 px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {serviceData.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:border-i9-blue/20 dark:hover:border-i9-blue/40 group h-full cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="bg-i9-blue/10 dark:bg-i9-blue/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-i9-blue group-hover:text-white transition-all">
                    <service.icon className="w-6 h-6 text-i9-blue group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>

      <div className="mt-16 text-center">
        <Button className="btn-primary">Ver Todos os Serviços</Button>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      )}
    </section>
  );
};

export default Services;
