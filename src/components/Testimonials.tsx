
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

// Create a new component for the Testimonials modal that will be used in contact form
export const TestimonialsModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  const nextTestimonial = () => {
    setSelectedTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setSelectedTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">Depoimentos de Clientes</DialogTitle>
          <DialogDescription>
            Confira o que nossos clientes dizem sobre os resultados que alcançaram
          </DialogDescription>
        </DialogHeader>
        
        {testimonials[selectedTestimonial] && (
          <div className="mt-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-i9-blue/20 flex-shrink-0">
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
                <h4 className="text-base font-semibold">{testimonials[selectedTestimonial].name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[selectedTestimonial].position}</p>
                <div className="flex mt-1">
                  {[...Array(testimonials[selectedTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mt-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                "{testimonials[selectedTestimonial].fullTestimonial}"
              </p>
            </div>

            <div className="flex justify-center mt-4 gap-2">
              <Button 
                onClick={prevTestimonial}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={nextTestimonial}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;
