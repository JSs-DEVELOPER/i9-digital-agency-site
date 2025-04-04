
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const testimonials = [
  {
    name: "Carlos Silva",
    position: "CEO da TechSoft",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-1.jpg",
    content: "A parceria com a i9 Agência foi transformadora para nossa empresa. Em menos de 3 meses, nossa taxa de conversão aumentou em 180%. A equipe é extremamente profissional e comprometida com resultados.",
    rating: 5,
    fullTestimonial: "A parceria com a i9 Agência foi verdadeiramente transformadora para a TechSoft. Em menos de 3 meses trabalhando juntos, nossa taxa de conversão aumentou impressionantes 180%, o que teve um impacto direto em nossa receita. A equipe é extremamente profissional, comprometida com resultados e sempre vai além do esperado. Eles entenderam perfeitamente nosso negócio e criaram estratégias personalizadas que realmente funcionam. Estamos extremamente satisfeitos com a abordagem consultiva e os resultados obtidos até agora, e mal podemos esperar para continuar crescendo com a i9 como nosso parceiro de marketing digital."
  },
  {
    name: "Ana Oliveira",
    position: "Diretora de Marketing da Retail Plus",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-2.jpg",
    content: "Contratamos a i9 para reestruturar nossa estratégia de SEO e os resultados superaram todas as nossas expectativas. Nosso tráfego orgânico cresceu 220% em 6 meses, com um aumento de 45% nas conversões.",
    rating: 5,
    fullTestimonial: "Contratamos a i9 Agência para reestruturar completamente nossa estratégia de SEO após alguns anos de estagnação nos resultados orgânicos. Os resultados superaram todas as nossas expectativas. Após uma análise inicial detalhada, eles desenvolveram um plano abrangente que incluiu otimização técnica, estratégia de conteúdo e construção de autoridade. Em apenas 6 meses, nosso tráfego orgânico cresceu impressionantes 220%, com um aumento de 45% nas conversões. A equipe da i9 não apenas entrega resultados notáveis, mas também é extremamente transparente com seus relatórios e sempre disponível para esclarecer dúvidas e fazer ajustes na estratégia quando necessário. Se você está procurando uma agência que realmente entende de SEO e está comprometida com resultados mensuráveis, não precisa procurar mais."
  },
  {
    name: "Rafael Mendes",
    position: "Proprietário da RM Confecções",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-3.jpg",
    content: "Como proprietário de uma empresa de médio porte, estava cético em investir em marketing digital. A i9 me mostrou o quanto estava perdendo. Em um ano, meu e-commerce cresceu 300% com as estratégias implementadas.",
    rating: 5,
    fullTestimonial: "Como proprietário de uma empresa de médio porte no setor de confecções, eu estava bastante cético quanto a investir em marketing digital. Depois de várias tentativas frustradas com outras agências, decidi dar uma última chance com a i9 Agência, e essa decisão mudou completamente o rumo do meu negócio. A equipe da i9 fez uma análise completa do meu mercado e desenvolveu uma estratégia multidisciplinar envolvendo SEO, Google Ads e gestão de mídias sociais que realmente funcionou para o meu público-alvo. Em apenas um ano, meu e-commerce cresceu impressionantes 300%, e o retorno sobre o investimento superou minhas expectativas mais otimistas. Além dos resultados extraordinários, o que mais me impressiona é a transparência e o compromisso da equipe em realmente entender meu negócio e propor soluções personalizadas. A i9 não é apenas um fornecedor, mas um verdadeiro parceiro estratégico do meu negócio."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openTestimonialModal = (index: number) => {
    setSelectedTestimonial(index);
    setModalOpen(true);
  };

  return (
    <section id="testimonials" className="container-section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/20 -z-10"></div>
      
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
          Depoimentos
        </span>
        <h2 className="section-title dark:text-white">O que nossos clientes dizem</h2>
        <p className="section-subtitle dark:text-gray-300">
          Confira o que nossos clientes têm a dizer sobre os resultados alcançados com nossas estratégias de marketing digital.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${i === currentIndex ? 'ring-2 ring-i9-blue/50' : ''}`}
              onClick={() => openTestimonialModal(i)}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-i9-blue/20 flex-shrink-0 mb-4">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm italic text-center line-clamp-4 mb-4">
                  "{testimonial.content}"
                </p>
                
                <div className="text-center">
                  <h4 className="text-base font-semibold dark:text-white">{testimonial.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center hover:bg-i9-blue hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center hover:bg-i9-blue hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonial Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold">Depoimento de Cliente</DialogTitle>
            <DialogDescription>
              Leia o depoimento completo de nosso cliente satisfeito
            </DialogDescription>
          </DialogHeader>
          
          {testimonials[selectedTestimonial] && (
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-i9-blue/20">
                  {testimonials[selectedTestimonial].image ? (
                    <img 
                      src={testimonials[selectedTestimonial].image} 
                      alt={testimonials[selectedTestimonial].name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold">{testimonials[selectedTestimonial].name}</h4>
                  <p className="text-gray-500 dark:text-gray-400">{testimonials[selectedTestimonial].position}</p>
                  <div className="flex mt-1">
                    {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonials[selectedTestimonial].fullTestimonial}"
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Testimonials;
