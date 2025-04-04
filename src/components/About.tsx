
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const benefits = [
    "Equipe de especialistas certificados",
    "Estratégias personalizadas para cada negócio",
    "Foco em ROI e resultados mensuráveis",
    "Transparência e relatórios detalhados",
    "Atendimento ágil e consultivo",
    "Metodologia comprovada de sucesso"
  ];

  return (
    <section id="about" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://i9empreendendo.com/wp-content/uploads/2024/10/office-marketing-team.jpg" 
                  alt="Equipe i9 Agência"
                  className="w-full h-auto object-cover" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-i9-blue rounded-full opacity-20 z-0"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-i9-orange rounded-full opacity-20 z-0"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
              Sobre a i9 Agência
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Uma agência focada em resultados tangíveis para seu negócio
            </h2>
            <p className="text-gray-600 mb-8">
              A i9 Agência nasceu com o propósito de transformar negócios através do marketing digital de alta performance. Com anos de experiência e centenas de cases de sucesso, nossa equipe é especializada em desenvolver estratégias personalizadas que geram resultados reais e mensuráveis.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 bg-i9-blue/10 rounded-full p-1">
                    <Check className="w-5 h-5 text-i9-blue" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button className="btn-primary">Conheça Nossa Equipe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
