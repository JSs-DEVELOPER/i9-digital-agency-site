
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenAppointment: () => void;
}

const Hero = ({ onOpenAppointment }: HeroProps) => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center pt-20"
      style={{
        background: "linear-gradient(135deg, rgba(0,84,166,0.1) 0%, rgba(245,130,32,0.05) 100%)"
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-32 -left-32 bg-i9-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-32 -right-32 bg-i9-orange/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
                Agência de Marketing Digital
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Transforme sua <span className="text-i9-blue">presença digital</span> com estratégias que convertem
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                A i9 Agência desenvolve estratégias personalizadas de marketing digital para empresas que buscam crescimento real e mensurável.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary"
                onClick={onOpenAppointment}
              >
                Agendar uma Consultoria
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-i9-blue text-i9-blue hover:bg-i9-blue/5">
                Ver Nossos Serviços
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12 mt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item}
                    className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs font-medium">i9</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5</span>
                </div>
                <p className="text-sm text-gray-500">De mais de 200 clientes satisfeitos</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative animate-fade-in">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-i9-blue to-i9-orange opacity-20 rounded-xl"></div>
              <div className="absolute inset-2 bg-white rounded-lg shadow-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://i9empreendendo.com/wp-content/uploads/2024/10/i9logo-2_preview_rev_1.png"
                  alt="i9 Agência" 
                  className="max-w-[70%] max-h-[70%] object-contain" 
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">+500%</p>
                  <p className="text-sm text-gray-500">ROI médio</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-i9-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Resultados</p>
                  <p className="text-sm text-gray-500">mensuráveis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
