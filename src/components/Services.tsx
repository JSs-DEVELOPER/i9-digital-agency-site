import { useState, useRef, useEffect } from "react";
import { 
  SearchIcon, BarChart3, MonitorSmartphone, LineChart, MessageSquare, 
  Target, Globe, TrendingUp, Instagram, Linkedin, Mail, Layout, 
  MessageCircle, Star, Brush, Users, DollarSign, BarChartHorizontal, 
  RefreshCw, Video, MailWarning, Search, Database, Smartphone, 
  ShoppingBag, MousePointer, Locate, Building, Youtube
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const serviceData: ServiceDetailProps[] = [
  {
    icon: ShoppingBag,
    title: "Aplicativos Móveis e Desenvolvimento de Soluções Digitais",
    description: "Criação de aplicativos mobile e soluções digitais personalizadas para seu negócio.",
    detailedDescription: "Nossa equipe de desenvolvimento cria aplicativos móveis e soluções digitais personalizadas de alta performance que atendem às necessidades específicas do seu negócio. Desenvolvemos aplicativos nativos e híbridos para iOS e Android, além de sistemas web responsivos e progressivos.",
    features: [
      "Desenvolvimento de aplicativos iOS e Android",
      "Aplicativos PWA (Progressive Web Apps)",
      "UX/UI para aplicativos móveis",
      "Integrações com APIs e serviços",
      "Manutenção e suporte técnico",
      "Testes de usabilidade",
      "Analytics e monitoramento"
    ],
    priceRange: "R$ 10.000 - R$ 50.000 / projeto"
  },
  {
    icon: Database,
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
  },
  {
    icon: MailWarning,
    title: "Automação de Marketing",
    description: "Automatize processos de marketing para aumentar eficiência e melhorar resultados.",
    detailedDescription: "Nossas soluções de automação de marketing ajudam a otimizar seus fluxos de trabalho, personalizar a comunicação com clientes e aumentar a eficiência operacional. Implementamos ferramentas e estratégias que permitem campanhas mais inteligentes e orientadas por dados.",
    features: [
      "Configuração de fluxos de automação",
      "Segmentação avançada de clientes",
      "Nurturing de leads automatizado",
      "Integração entre plataformas de marketing",
      "Personalização em escala",
      "Testes A/B automatizados",
      "Relatórios de performance"
    ],
    priceRange: "R$ 2.500 - R$ 7.000 / mês"
  },
  {
    icon: Star,
    title: "Branding Digital",
    description: "Desenvolva uma identidade de marca forte e consistente no ambiente digital.",
    detailedDescription: "Nosso serviço de branding digital ajuda a construir e fortalecer a identidade da sua marca no ambiente online. Desenvolvemos estratégias que comunicam os valores da sua empresa de forma consistente, memorável e impactante em todos os pontos de contato digitais.",
    features: [
      "Análise de posicionamento de marca",
      "Desenvolvimento de identidade visual",
      "Estratégia de comunicação digital",
      "Guia de voz e tom da marca",
      "Design de elementos visuais",
      "Diretrizes de aplicação da marca",
      "Estratégia de conteúdo alinhado à marca"
    ],
    priceRange: "R$ 5.000 - R$ 20.000 / projeto"
  },
  {
    icon: MessageCircle,
    title: "Consultoria de Marketing Digital",
    description: "Orientação estratégica personalizada para maximizar seus resultados de marketing digital.",
    detailedDescription: "Nossa consultoria oferece orientação especializada para otimizar suas estratégias de marketing digital. Analisamos seu negócio, mercado e concorrência para criar um plano personalizado que maximize seus resultados e retorno sobre investimento.",
    features: [
      "Análise completa da presença digital",
      "Auditoria de marketing digital",
      "Planejamento estratégico personalizado",
      "Recomendações baseadas em dados",
      "Mentoria para equipes internas",
      "Workshops e treinamentos",
      "Acompanhamento contínuo de resultados"
    ],
    priceRange: "R$ 3.000 - R$ 10.000 / mês"
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
    icon: Brush,
    title: "Design Gráfico e Criação Visual",
    description: "Criação visual de alta qualidade para suas campanhas de marketing digital.",
    detailedDescription: "Nossa equipe de designers desenvolve materiais visuais de alto impacto que destacam sua marca e comunicam sua mensagem com eficiência. Criamos desde peças para redes sociais até materiais complexos para campanhas integradas.",
    features: [
      "Design para redes sociais",
      "Criação de banners e anúncios",
      "Design de emails marketing",
      "Infográficos e apresentações",
      "Materiais para campanhas digitais",
      "Identidade visual para projetos",
      "Edição e tratamento de imagens"
    ],
    priceRange: "R$ 2.000 - R$ 8.000 / mês"
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
    icon: Layout,
    title: "Desenvolvimento de Site e Landing Pages",
    description: "Criaç��o de sites e páginas de conversão otimizadas para resultados.",
    detailedDescription: "Criamos sites e landing pages estrategicamente desenvolvidos para converter visitantes em leads e clientes. Nossos projetos combinam design atrativo, usabilidade e elementos de conversão para maximizar os resultados do seu negócio digital.",
    features: [
      "Sites institucionais e corporativos",
      "Landing pages de alta conversão",
      "Design responsivo para todos dispositivos",
      "Otimização de taxa de conversão",
      "Integração com CMS e ferramentas de marketing",
      "Testes A/B para melhorias contínuas",
      "Suporte técnico especializado"
    ],
    priceRange: "R$ 2.500 - R$ 15.000 / projeto"
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Estratégias de email marketing eficazes para nutrir leads e aumentar vendas.",
    detailedDescription: "Desenvolvemos campanhas de email marketing que engajam sua audiência e impulsionam conversões. Desde newsletters até fluxos automatizados de nutrição de leads, criamos estratégias que fortalecem o relacionamento com clientes e geram resultados mensuráveis.",
    features: [
      "Criação de templates personalizados",
      "Segmentação avançada de listas",
      "Automação de fluxos de emails",
      "Testes A/B para otimização",
      "Relatórios e análise de performance",
      "Integração com CRM e plataformas de vendas",
      "Estratégias de engajamento e reativação"
    ],
    priceRange: "R$ 1.500 - R$ 6.000 / mês"
  },
  {
    icon: Locate,
    title: "Estratégias de Expansão Internacional (Global Marketing)",
    description: "Planejamento e execução de estratégias para expansão de negócios em mercados internacionais.",
    detailedDescription: "Nossa expertise em expansão internacional ajuda empresas a conquistarem novos mercados globais. Desenvolvemos estratégias personalizadas que consideram aspectos culturais, legais e de mercado para garantir uma presença digital efetiva em diferentes países.",
    features: [
      "Pesquisa de mercado internacional",
      "Adaptação cultural de conteúdo e campanhas",
      "Estratégias de SEO internacional",
      "Publicidade digital em múltiplos países",
      "Localização de sites e plataformas",
      "Compliance com regulamentações locais",
      "Estratégias de posicionamento global"
    ],
    priceRange: "R$ 5.000 - R$ 20.000 / mês"
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
    icon: ShoppingBag,
    title: "Gestão de Campanhas de Publicidade em Vídeo",
    description: "Criação e gestão de campanhas de vídeo para plataformas como YouTube, TikTok e Instagram.",
    detailedDescription: "Nossas campanhas de publicidade em vídeo são estrategicamente planejadas para captar a atenção do público-alvo e gerar engajamento significativo. Trabalhamos com plataformas como YouTube, TikTok, Instagram e Facebook para maximizar o alcance e impacto dos seus vídeos.",
    features: [
      "Estratégia de conteúdo em vídeo",
      "Produção e edição de vídeos publicitários",
      "Configuração de campanhas segmentadas",
      "Otimização para diferentes plataformas",
      "Análise de métricas de engajamento",
      "Testes de formatos e mensagens",
      "Relatórios detalhados de performance"
    ],
    priceRange: "R$ 3.000 - R$ 15.000 / mês + investimento em mídia"
  },
  {
    icon: Users,
    title: "Gestão de Comunidades Online",
    description: "Criação e gerenciamento de comunidades online para fortalecer o relacionamento com clientes.",
    detailedDescription: "Desenvolvemos e gerenciamos comunidades online que criam um senso de pertencimento entre seus clientes e sua marca. Através de conteúdo relevante e interações estratégicas, transformamos seguidores em defensores ativos do seu negócio.",
    features: [
      "Criação de grupos e comunidades em plataformas sociais",
      "Moderação e engajamento contínuo",
      "Produção de conteúdo exclusivo para comunidades",
      "Eventos online e atividades de engajamento",
      "Coleta de feedback e pesquisas",
      "Gestão de crises e situações sensíveis",
      "Análise de crescimento e engajamento"
    ],
    priceRange: "R$ 2.000 - R$ 6.000 / mês"
  },
  {
    icon: MessageCircle,
    title: "Gestão de Reputação Online (ORM)",
    description: "Monitoramento e gestão da reputação da sua marca no ambiente digital.",
    detailedDescription: "Nosso serviço de gestão de reputação online protege e fortalece a imagem da sua marca na internet. Monitoramos menções, avaliações e comentários, respondendo estrategicamente e trabalhando para construir uma percepção positiva do seu negócio.",
    features: [
      "Monitoramento de menções à marca",
      "Gestão de avaliações em plataformas",
      "Resposta estratégica a feedbacks negativos",
      "Amplificação de conteúdo positivo",
      "Desenvolvimento de protocolos de crise",
      "Relatórios de sentimento e percepção",
      "Estratégias proativas de construção de reputação"
    ],
    priceRange: "R$ 2.500 - R$ 8.000 / mês"
  },
  {
    icon: DollarSign,
    title: "Gestão de Tráfego Pago",
    description: "Gerenciamento completo de campanhas pagas para maximizar seu retorno sobre investimento.",
    detailedDescription: "Nossa gestão de tráfego pago integra múltiplas plataformas de anúncios para criar uma estratégia coesa que maximiza seu ROI. Trabalhamos continuamente na otimização de campanhas, testes de criativos e ajustes de segmentação para entregar os melhores resultados.",
    features: [
      "Estratégia multi-plataforma integrada",
      "Criação de campanhas em Google, Facebook, Instagram e LinkedIn",
      "Segmentação avançada de públicos",
      "Desenvolvimento de criativos de alto desempenho",
      "Otimização contínua baseada em dados",
      "Atribuição e análise de conversão",
      "Relatórios consolidados de performance"
    ],
    priceRange: "R$ 2.500 - R$ 10.000 / mês + investimento em mídia"
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
    icon: Database,
    title: "Google Analytics e Relatórios de Dados",
    description: "Implementação, configuração e análise de dados para tomada de decisões estratégicas.",
    detailedDescription: "Nosso serviço especializado de Google Analytics e relatórios de dados oferece insights valiosos para sua estratégia digital. Configuramos, analisamos e traduzimos dados complexos em informações acionáveis que impulsionam o crescimento do seu negócio.",
    features: [
      "Implementação e configuração do GA4",
      "Criação de objetivos e eventos personalizados",
      "Configuração de e-commerce avançado",
      "Integração com Google Ads e outras plataformas",
      "Dashboards personalizados para KPIs",
      "Análise mensal de dados e insights",
      "Recomendações baseadas em dados"
    ],
    priceRange: "R$ 1.800 - R$ 5.000 / mês"
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    description: "Estratégias de colaboração com influenciadores para amplificar sua marca.",
    detailedDescription: "Nosso serviço de Influencer Marketing conecta sua marca aos influenciadores mais relevantes para seu público-alvo. Desenvolvemos parcerias estratégicas que amplificam sua mensagem, geram credibilidade e impulsionam resultados através de conteúdo autêntico.",
    features: [
      "Identificação de influenciadores alinhados à marca",
      "Desenvolvimento de estratégias de colaboração",
      "Negociação e gestão de parcerias",
      "Criação de briefings e diretrizes de conteúdo",
      "Monitoramento de publicações e engajamento",
      "Análise de ROI e performance",
      "Relatórios de resultados e insights"
    ],
    priceRange: "R$ 3.000 - R$ 15.000 / campanha"
  },
  {
    icon: Instagram,
    title: "Instagram Ads",
    description: "Anúncios estratégicos no Instagram para aumentar visibilidade, engajamento e conversões.",
    detailedDescription: "Nossas campanhas de Instagram Ads são criadas para capturar a atenção do seu público-alvo em um ambiente altamente visual. Desenvolvemos estratégias que utilizam todos os formatos da plataforma para maximizar engajamento e conversões para seu negócio.",
    features: [
      "Criação de anúncios visuais de alto impacto",
      "Estratégias para Feed, Stories, Reels e Explore",
      "Segmentação precisa de audiência",
      "Campanhas de remarketing avançadas",
      "Otimização contínua de performance",
      "Integração com catálogo de produtos",
      "Relatórios detalhados de resultados"
    ],
    priceRange: "R$ 1.500 - R$ 5.000 / mês + investimento em mídia"
  },
  {
    icon: Linkedin,
    title: "LinkedIn Ads",
    description: "Campanhas publicitárias no LinkedIn focadas em leads B2B e recrutamento.",
    detailedDescription: "Nossas campanhas no LinkedIn são especialmente desenvolvidas para mercados B2B e profissionais. Utilizamos a segmentação avançada da plataforma para alcançar tomadores de decisão e profissionais específicos, gerando leads qualificados para seu negócio.",
    features: [
      "Segmentação por cargo, empresa e habilidades",
      "Campanhas de geração de leads B2B",
      "Anúncios de recrutamento e employer branding",
      "Formatos de InMail, conteúdo e display",
      "Otimização para objetivos de conversão",
      "Estratégias de conteúdo para audiência profissional",
      "Análise de ROI e custo por lead"
    ],
    priceRange: "R$ 2.000 - R$ 6.000 / mês + investimento em mídia"
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
    icon: DollarSign,
    title: "Marketing de Afiliados",
    description: "Estratégias de afiliados para expandir alcance e aumentar vendas com pagamento por resultado.",
    detailedDescription: "Nosso programa de marketing de afiliados cria parcerias estratégicas que amplificam o alcance da sua marca e aumentam suas vendas. Desenvolvemos e gerenciamos programas completos que atraem afiliados qualificados e otimizam suas performances.",
    features: [
      "Estruturação de programa de afiliados",
      "Recrutamento de afiliados relevantes",
      "Criação de materiais promocionais",
      "Acompanhamento de performance",
      "Gestão de comissões e pagamentos",
      "Treinamento e suporte para afiliados",
      "Otimização contínua do programa"
    ],
    priceRange: "R$ 2.500 - R$ 8.000 / mês + comissões"
  },
  {
    icon: Building,
    title: "Marketing Imobiliário",
    description: "Estratégias digitais específicas para o mercado imobiliário e de construção.",
    detailedDescription: "Nosso marketing imobiliário é especializado nas necessidades únicas do setor. Criamos estratégias digitais que destacam propriedades, atraem compradores qualificados e apoiam corretores e incorporadoras no processo de vendas, desde o lançamento até o fechamento.",
    features: [
      "Tours virtuais e experiências imersivas",
      "Campanhas segmentadas para compradores potenciais",
      "Marketing de conteúdo especializado",
      "Landing pages de alta conversão para imóveis",
      "Gestão de leads e nurturing para o setor",
      "Estratégias para marketplaces imobiliários",
      "Análise de ROI por empreendimento"
    ],
    priceRange: "R$ 3.000 - R$ 12.000 / mês"
  },
  {
    icon: ShoppingBag,
    title: "Marketing para eCommerce",
    description: "Estratégias específicas para lojas virtuais aumentarem tráfego, conversão e recorrência.",
    detailedDescription: "Nossas estratégias para e-commerce são desenvolvidas para cada etapa do funil de vendas online. Trabalhamos para aumentar o tráfego qualificado, otimizar taxas de conversão e maximizar o valor médio de pedido e a recorrência de compras na sua loja virtual.",
    features: [
      "Otimização de lojas virtuais",
      "Estratégias de aquisição de tráfego",
      "Campanhas de remarketing para carrinhos abandonados",
      "Email marketing para e-commerce",
      "Otimização de páginas de produto",
      "Estratégias de cross-selling e up-selling",
      "Análise de funil de vendas e comportamento de usuário"
    ],
    priceRange: "R$ 3.000 - R$ 10.000 / mês"
  },
  {
    icon: MousePointer,
    title: "PPC (Pay-Per-Click) em Google e Bing",
    description: "Gestão de campanhas de anúncios por clique em múltiplos buscadores.",
    detailedDescription: "Nossa gestão de campanhas PPC abrange múltiplos motores de busca para maximizar seu alcance e conversões. Desenvolvemos e otimizamos campanhas no Google Ads, Microsoft Advertising (Bing) e outras plataformas, garantindo o melhor retorno sobre seu investimento em links patrocinados.",
    features: [
      "Estratégia multicanal de PPC",
      "Pesquisa avançada de palavras-chave",
      "Criação de anúncios de alto desempenho",
      "Gestão de lances e orçamentos",
      "Otimização de landing pages",
      "Teste de mensagens e extensões",
      "Relatórios comparativos entre plataformas"
    ],
    priceRange: "R$ 1.800 - R$ 6.000 / mês + investimento em mídia"
  },
  {
    icon: Search,
    title: "Pesquisa de Mercado e Análise de Competidores",
    description: "Estudos aprofundados de mercado para embasar estratégias competitivas eficazes.",
    detailedDescription: "Nossa pesquisa de mercado e análise competitiva fornece insights valiosos sobre seu setor, público-alvo e concorrentes. Coletamos e analisamos dados relevantes para fundamentar suas decisões estratégicas e identificar oportunidades de diferenciação e crescimento.",
    features: [
      "Análise detalhada de concorrentes",
      "Pesquisa de comportamento do consumidor",
      "Identificação de tendências de mercado",
      "Benchmarking de estratégias digitais",
      "Análise SWOT competitiva",
      "Mapeamento de oportunidades",
      "Recomendações estratégicas baseadas em dados"
    ],
    priceRange: "R$ 3.500 - R$ 15.000 / projeto"
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
    icon: RefreshCw,
    title: "Remarketing/Retargeting",
    description: "Estratégias para reconquistar visitantes e aumentar taxas de conversão.",
    detailedDescription: "Nossas campanhas de remarketing alcançam visitantes que já demonstraram interesse em seu negócio, mas não converteram. Através de anúncios estratégicos em diversos canais, reengajamos esse público qualificado e aumentamos significativamente suas taxas de conversão.",
    features: [
      "Configuração de públicos segmentados",
      "Estratégias multi-canal (display, redes sociais, email)",
      "Criação de criativos específicos por segmento",
      "Campanhas para carrinhos abandonados",
      "Sequências de anúncios progressivos",
      "Otimização de frequência e impressões",
      "Análise de retorno sobre investimento"
    ],
    priceRange: "R$ 1.500 - R$ 4.500 / mês + investimento em mídia"
  },
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
    icon: Video,
    title: "Vídeo Marketing",
    description: "Estratégias de conteúdo em vídeo para engajar e converter sua audiência.",
    detailedDescription: "Nosso serviço de vídeo marketing desenvolve estratégias completas de conteúdo em vídeo que cativam sua audiência e fortalecem sua marca. Da concepção à distribuição, criamos vídeos que comunicam sua mensagem de forma impactante e geram resultados mensuráveis.",
    features: [
      "Planejamento estratégico de conteúdo em vídeo",
      "Produção audiovisual profissional",
      "Edição e pós-produção",
      "Otimização para diferentes plataformas",
      "Estratégias de distribuição e promoção",
      "Análise de métricas de engajamento",
      "Conteúdo para diferentes estágios do funil"
    ],
    priceRange: "R$ 3.000 - R$ 15.000 / mês ou projeto"
  },
  {
    icon: BarChartHorizontal,
    title: "Web Analytics & Conversion Optimization",
    description: "Análise de dados e otimização continua para maximizar suas taxas de conversão.",
    detailedDescription: "Nosso serviço combina análise avançada de dados com estratégias de otimização de conversão para melhorar continuamente os resultados do seu site. Identificamos oportunidades, implementamos testes e fazemos melhorias baseadas em comportamento real dos usuários.",
    features: [
      "Análise de comportamento do usuário",
      "Implementação de testes A/B",
      "Otimização de funis de conversão",
      "Análise de mapas de calor e gravações",
      "Identificação e remoção de pontos de atrito",
      "Otimização de páginas-chave",
      "Implementação de melhorias baseadas em dados"
    ],
    priceRange: "R$ 2.500 - R$ 8.000 / mês"
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetailProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAllServicesModalOpen, setIsAllServicesModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [api, setApi] = useState<any>(null);

  const handleServiceClick = (service: ServiceDetailProps) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (api) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [api]);

  return (
    <section id="services" className="container-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 dark:from-background/20 dark:to-background/40 -z-10 opacity-80"></div>
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
          Nossos Serviços
        </span>
        <p className="section-subtitle dark:text-gray-300">
          Oferecemos um conjunto abrangente de serviços de marketing digital para impulsionar sua marca e gerar resultados mensuráveis.
        </p>
      </div>

      <div className="mt-12 px-8 md:px-12" ref={carouselRef}>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
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
            <div className="absolute top-1/2 -translate-y-1/2 -left-6 -right-6 flex justify-between pointer-events-none z-10">
              <CarouselPrevious className="relative pointer-events-auto w-10 h-10" />
              <CarouselNext className="relative pointer-events-auto w-10 h-10" />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button 
          className="btn-primary"
          onClick={() => setIsAllServicesModalOpen(true)}
        >
          Ver Todos os Serviços
        </Button>
      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onRequestQuote={() => {
            toast({
              title: "Solicitação de proposta enviada!",
              description: `Você será redirecionado para agendar uma consultoria para ${selectedService.title}.`,
            });
            
            setIsModalOpen(false);
            
            const event = new CustomEvent('openAppointmentModal', { 
              detail: { serviceName: selectedService.title }
            });
            window.dispatchEvent(event);
          }}
        />
      )}

      <AllServicesModal
        open={isAllServicesModalOpen}
        onOpenChange={setIsAllServicesModalOpen}
        services={serviceData}
        onServiceSelect={handleServiceClick}
      />
    </section>
  );
};

interface AllServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  services: ServiceDetailProps[];
  onServiceSelect: (service: ServiceDetailProps) => void;
}

const AllServicesModal = ({ open, onOpenChange, services, onServiceSelect }: AllServicesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Todos os Nossos Serviços</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors flex items-center gap-3"
              onClick={() => {
                onOpenChange(false);
                setTimeout(() => onServiceSelect(service), 300);
              }}
            >
              <div className="bg-i9-blue/10 dark:bg-i9-blue/20 rounded-full p-2 flex-shrink-0">
                <service.icon className="w-5 h-5 text-i9-blue" />
              </div>
              <span className="font-medium">{service.title}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Services;
