
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    position: "CEO da TechSoft",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-1.jpg",
    content: "A parceria com a i9 Agência foi transformadora para nossa empresa. Em menos de 3 meses, nossa taxa de conversão aumentou em 180%. A equipe é extremamente profissional e comprometida com resultados.",
    rating: 5
  },
  {
    name: "Ana Oliveira",
    position: "Diretora de Marketing da Retail Plus",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-2.jpg",
    content: "Contratamos a i9 para reestruturar nossa estratégia de SEO e os resultados superaram todas as nossas expectativas. Nosso tráfego orgânico cresceu 220% em 6 meses, com um aumento de 45% nas conversões.",
    rating: 5
  },
  {
    name: "Rafael Mendes",
    position: "Proprietário da RM Confecções",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-3.jpg",
    content: "Como proprietário de uma empresa de médio porte, estava cético em investir em marketing digital. A i9 me mostrou o quanto estava perdendo. Em um ano, meu e-commerce cresceu 300% com as estratégias implementadas.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <section id="testimonials" className="container-section">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
          Depoimentos
        </span>
        <h2 className="section-title">O que nossos clientes dizem</h2>
        <p className="section-subtitle">
          Confira o que nossos clientes têm a dizer sobre os resultados alcançados com nossas estratégias de marketing digital.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-i9-blue/20 flex-shrink-0">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].name} 
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex mb-3">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-600 text-lg italic mb-6">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div>
                <h4 className="text-lg font-semibold">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-500">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-i9-blue hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-i9-blue hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
