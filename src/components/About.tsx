
import { Check } from "lucide-react";

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
    <section id="about" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50 -z-20"></div>
      
      {/* Parallax effect elements */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-i9-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-i9-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover"
                >
                  <source src="https://i9empreendendo.com/wp-content/uploads/2024/10/marketing-team.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-i9-blue rounded-full opacity-20 z-0 animate-pulse"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-i9-orange rounded-full opacity-20 z-0 animate-pulse" style={{animationDelay: "1s"}}></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
              Sobre a i9 Agência
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              Uma agência focada em resultados tangíveis para seu negócio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              A i9 Agência nasceu com o propósito de transformar negócios através do marketing digital de alta performance. Com anos de experiência e centenas de cases de sucesso, nossa equipe é especializada em desenvolver estratégias personalizadas que geram resultados reais e mensuráveis.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                  <div className="flex-shrink-0 bg-i9-blue/20 dark:bg-i9-blue/30 rounded-full p-1">
                    <Check className="w-5 h-5 text-i9-blue" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
