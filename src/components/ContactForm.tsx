
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Star, User, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
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
    fullTestimonial: "A parceria com a i9 Agência foi verdadeiramente transformadora para a TechSoft. Em menos de 3 meses trabalhando juntos, nossa taxa de conversão aumentou impressionantes 180%, o que teve um impacto direto em nossa receita. A equipe é extremamente profissional, comprometida com resultados e sempre vai além do esperado. Eles entenderam perfeitamente nosso negócio e criaram estratégias personalizadas que realmente funcionam. Estamos extremamente satisfeitos com a abordagem consultiva e os resultados obtidos até agora, e mal podemos esperar para continuar crescendo com a i9 como nosso parceiro de marketing digital.",
    video: null
  },
  {
    name: "Ana Oliveira",
    position: "Diretora de Marketing da Retail Plus",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-2.jpg",
    content: "Contratamos a i9 para reestruturar nossa estratégia de SEO e os resultados superaram todas as nossas expectativas. Nosso tráfego orgânico cresceu 220% em 6 meses, com um aumento de 45% nas conversões.",
    rating: 5,
    fullTestimonial: "Contratamos a i9 Agência para reestruturar completamente nossa estratégia de SEO após alguns anos de estagnação nos resultados orgânicos. Os resultados superaram todas as nossas expectativas. Após uma análise inicial detalhada, eles desenvolveram um plano abrangente que incluiu otimização técnica, estratégia de conteúdo e construção de autoridade. Em apenas 6 meses, nosso tráfego orgânico cresceu impressionantes 220%, com um aumento de 45% nas conversões. A equipe da i9 não apenas entrega resultados notáveis, mas também é extremamente transparente com seus relatórios e sempre disponível para esclarecer dúvidas e fazer ajustes na estratégia quando necessário. Se você está procurando uma agência que realmente entende de SEO e está comprometida com resultados mensuráveis, não precisa procurar mais.",
    video: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-video.mp4"
  },
  {
    name: "Rafael Mendes",
    position: "Proprietário da RM Confecções",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/testimonial-3.jpg",
    content: "Como proprietário de uma empresa de médio porte, estava cético em investir em marketing digital. A i9 me mostrou o quanto estava perdendo. Em um ano, meu e-commerce cresceu 300% com as estratégias implementadas.",
    rating: 5,
    fullTestimonial: "Como proprietário de uma empresa de médio porte no setor de confecções, eu estava bastante cético quanto a investir em marketing digital. Depois de várias tentativas frustradas com outras agências, decidi dar uma última chance com a i9 Agência, e essa decisão mudou completamente o rumo do meu negócio. A equipe da i9 fez uma análise completa do meu mercado e desenvolveu uma estratégia multidisciplinar envolvendo SEO, Google Ads e gestão de mídias sociais que realmente funcionou para o meu público-alvo. Em apenas um ano, meu e-commerce cresceu impressionantes 300%, e o retorno sobre o investimento superou minhas expectativas mais otimistas. Além dos resultados extraordinários, o que mais me impressiona é a transparência e o compromisso da equipe em realmente entender meu negócio e propor soluções personalizadas. A i9 não é apenas um fornecedor, mas um verdadeiro parceiro estratégico do meu negócio.",
    video: null
  }
];

// Define services in alphabetical order
const services = [
  { title: "Análise de Dados" },
  { title: "Aplicativos Móveis e Desenvolvimento de Soluções Digitais" },
  { title: "Automação de Marketing" },
  { title: "Branding Digital" },
  { title: "Consultoria de Marketing Digital" },
  { title: "Copywriting" },
  { title: "Desenvolvimento Web" },
  { title: "Desenvolvimento de Site e Landing Pages" },
  { title: "Design Gráfico e Criação Visual" },
  { title: "Email Marketing" },
  { title: "Estratégias de Expansão Internacional (Global Marketing)" },
  { title: "Facebook Ads" },
  { title: "Gestão de Campanhas de Publicidade em Vídeo" },
  { title: "Gestão de Comunidades Online" },
  { title: "Gestão de Reputação Online (ORM)" },
  { title: "Gestão de Tráfego Pago" },
  { title: "Google Ads" },
  { title: "Google Analytics e Relatórios de Dados" },
  { title: "Influencer Marketing" },
  { title: "Instagram Ads" },
  { title: "LinkedIn Ads" },
  { title: "Marketing de Afiliados" },
  { title: "Marketing de Conteúdo" },
  { title: "Marketing Imobiliário" },
  { title: "Marketing para eCommerce" },
  { title: "PPC (Pay-Per-Click) em Google e Bing" },
  { title: "Pesquisa de Mercado e Análise de Competidores" },
  { title: "Redes Sociais" },
  { title: "Remarketing/Retargeting" },
  { title: "SEO" },
  { title: "Vídeo Marketing" },
  { title: "Web Analytics & Conversion Optimization" },
];

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. Obrigado pelo seu interesse!",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
  };

  const openTestimonialModal = (index: number) => {
    setSelectedTestimonial(index);
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50 -z-10"></div>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
            Contato
          </span>
          <h2 className="section-title dark:text-white">Entre em contato conosco</h2>
          <p className="section-subtitle dark:text-gray-300">
            Estamos prontos para ajudar seu negócio a crescer. Preencha o formulário abaixo ou utilize um de nossos canais de contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo*
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      E-mail*
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefone*
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Serviço de Interesse*
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 px-3 text-gray-700 dark:text-gray-300 bg-background focus:outline-none focus:ring-2 focus:ring-i9-blue focus:border-transparent"
                    >
                      <option value="" disabled>Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full"
                      placeholder="Como podemos ajudar seu negócio?"
                    />
                  </div>
                </div>

                <Button type="submit" className="btn-primary w-full md:w-auto">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-i9-blue text-white rounded-xl shadow-sm p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">E-mail</h4>
                    <a href="mailto:contato@i9empreendendo.com" className="text-white/80 hover:text-white">
                      contato@i9empreendendo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefone</h4>
                    <a href="tel:+5500000000000" className="text-white/80 hover:text-white">
                      +55 (00) 0000-0000
                    </a>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                    onClick={() => setTestimonialsOpen(true)}
                  >
                    Ver Depoimentos
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Modal */}
      <Dialog open={testimonialsOpen} onOpenChange={setTestimonialsOpen}>
        <DialogContent className="sm:max-w-5xl w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold mb-2">
              Depoimentos dos Nossos Clientes
            </DialogTitle>
          </DialogHeader>
          
          {selectedTestimonial !== null ? (
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="mb-4"
                onClick={() => setSelectedTestimonial(null)}
              >
                Voltar para todos os depoimentos
              </Button>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
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
                
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  "{testimonials[selectedTestimonial].fullTestimonial}"
                </p>
                
                {testimonials[selectedTestimonial].video && (
                  <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <video 
                      controls 
                      className="w-full aspect-video"
                      src={testimonials[selectedTestimonial].video}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => openTestimonialModal(index)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-i9-blue/20">
                      {testimonial.image ? (
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{testimonial.position}</span>
                    {testimonial.video && (
                      <div className="text-i9-blue">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactForm;
