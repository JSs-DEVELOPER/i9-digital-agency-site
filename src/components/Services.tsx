
import { SearchIcon, BarChart3, MonitorSmartphone, LineChart, MessageSquare, Target, Globe, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: SearchIcon,
    title: "SEO",
    description: "Melhore seu posicionamento orgânico nos motores de busca e aumente sua visibilidade online."
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description: "Campanhas de anúncios otimizadas no Google para atrair leads qualificados e aumentar conversões."
  },
  {
    icon: MonitorSmartphone,
    title: "Redes Sociais",
    description: "Gestão estratégica de redes sociais para engajar seu público e fortalecer sua marca."
  },
  {
    icon: LineChart,
    title: "Marketing de Conteúdo",
    description: "Conteúdos relevantes e otimizados para atrair, converter e fidelizar clientes."
  },
  {
    icon: MessageSquare,
    title: "Copywriting",
    description: "Textos persuasivos que vendem, criam conexões e transformam visitantes em clientes."
  },
  {
    icon: Target,
    title: "Facebook Ads",
    description: "Anúncios direcionados ao perfil ideal do seu cliente nas plataformas do Meta."
  },
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Sites e landing pages de alta performance focados em conversão e experiência do usuário."
  },
  {
    icon: TrendingUp,
    title: "Análise de Dados",
    description: "Monitoramento e análise de dados para otimizar estratégias e maximizar resultados."
  }
];

const Services = () => {
  return (
    <section id="services" className="container-section">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
          Nossos Serviços
        </span>
        <h2 className="section-title">Soluções completas para seu negócio digital</h2>
        <p className="section-subtitle">
          Oferecemos um conjunto abrangente de serviços de marketing digital para impulsionar sua marca e gerar resultados mensuráveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-i9-blue/20 group"
          >
            <div className="bg-i9-blue/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-i9-blue group-hover:text-white transition-all">
              <service.icon className="w-6 h-6 text-i9-blue group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button className="btn-primary">Ver Todos os Serviços</Button>
      </div>
    </section>
  );
};

export default Services;
