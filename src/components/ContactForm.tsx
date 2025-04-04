
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <section id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
            Contato
          </span>
          <h2 className="section-title">Entre em contato conosco</h2>
          <p className="section-subtitle">
            Estamos prontos para ajudar seu negócio a crescer. Preencha o formulário abaixo ou utilize um de nossos canais de contato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
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
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Serviço de Interesse*
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-i9-blue focus:border-transparent"
                    >
                      <option value="" disabled>Selecione um serviço</option>
                      <option value="SEO">SEO</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Redes Sociais">Redes Sociais</option>
                      <option value="Marketing de Conteúdo">Marketing de Conteúdo</option>
                      <option value="Facebook Ads">Facebook Ads</option>
                      <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Endereço</h4>
                    <p className="text-white/80">
                      Av. Principal, 1000<br />
                      Centro, Cidade - Estado<br />
                      CEP: 00000-000
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Horário de Atendimento</h4>
                    <p className="text-white/80">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábados: 9h às 12h
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="bg-white/10 rounded-full p-2 mt-1">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Agende uma Reunião</h4>
                    <a href="#" className="text-white underline hover:text-white/80">
                      Clique aqui para agendar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
