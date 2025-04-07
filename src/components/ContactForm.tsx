
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  Share2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestimonialsModal } from "@/components/Testimonials";
import { supabase } from "@/integrations/supabase/client";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Por favor, insira seu nome completo.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, {
    message: "Por favor, escreva uma mensagem com pelo menos 10 caracteres.",
  }),
});

// Services list from the main services data
const services = [
  { id: "analise-dados", label: "Análise de Dados" },
  { id: "apps-mobile", label: "Aplicativos Móveis e Desenvolvimento de Soluções Digitais" },
  { id: "automacao", label: "Automação de Marketing" },
  { id: "branding", label: "Branding Digital" },
  { id: "consultoria", label: "Consultoria de Marketing Digital" },
  { id: "copywriting", label: "Copywriting" },
  { id: "design", label: "Design Gráfico e Criação Visual" },
  { id: "desenvolvimento", label: "Desenvolvimento Web" },
  { id: "sites", label: "Desenvolvimento de Site e Landing Pages" },
  { id: "email", label: "Email Marketing" },
  { id: "global", label: "Estratégias de Expansão Internacional (Global Marketing)" },
  { id: "facebook", label: "Facebook Ads" },
  { id: "video", label: "Gestão de Campanhas de Publicidade em Vídeo" },
  { id: "comunidades", label: "Gestão de Comunidades Online" },
  { id: "reputacao", label: "Gestão de Reputação Online (ORM)" },
  { id: "trafego", label: "Gestão de Tráfego Pago" },
  { id: "google-ads", label: "Google Ads" },
  { id: "analytics", label: "Google Analytics e Relatórios de Dados" },
  { id: "influencer", label: "Influencer Marketing" },
  { id: "instagram", label: "Instagram Ads" },
  { id: "linkedin", label: "LinkedIn Ads" },
  { id: "conteudo", label: "Marketing de Conteúdo" },
  { id: "afiliados", label: "Marketing de Afiliados" },
  { id: "imobiliario", label: "Marketing Imobiliário" },
  { id: "ecommerce", label: "Marketing para eCommerce" },
  { id: "ppc", label: "PPC (Pay-Per-Click) em Google e Bing" },
  { id: "pesquisa", label: "Pesquisa de Mercado e Análise de Competidores" },
  { id: "redes", label: "Redes Sociais" },
  { id: "remarketing", label: "Remarketing/Retargeting" },
  { id: "seo", label: "SEO" },
  { id: "video-marketing", label: "Vídeo Marketing" },
  { id: "analytics-conversion", label: "Web Analytics & Conversion Optimization" },
];

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          service: values.service || null,
          message: values.message,
          status: 'unread'
        })
        .select()
      
      if (error) {
        console.error('Error submitting contact form:', error)
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Entraremos em contato em breve.",
        })
        form.reset();
      }
    } catch (error) {
      console.error('Exception submitting contact form:', error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleShareSocial = (platform: string) => {
    const url = window.location.href;
    const title = "i9 Agência de Marketing Digital";
    let shareUrl = "";
    
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        break;
      case "blog":
        // Scroll to the blog section
        const blogSection = document.getElementById("blog");
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      case "testimonials":
        setTestimonialsOpen(true);
        return;
    }
    
    if (shareUrl) window.open(shareUrl, "_blank");
  };

  return (
    <section id="contact" className="container-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/40 dark:from-background/50 dark:to-background/20 -z-10"></div>
      
      {/* Parallax effect elements */}
      <div className="absolute inset-0 -z-20 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80')] bg-cover bg-center bg-fixed"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 dark:bg-i9-blue/20 text-i9-blue font-medium text-sm mb-4">
            Contato
          </span>
          <p className="section-subtitle dark:text-gray-300">
            Entre em contato com nossa equipe e descubra como podemos impulsionar os resultados do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800/70 shadow-sm rounded-xl p-8 relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serviço de Interesse</FormLabel>
                        <FormDescription>
                          Selecione o serviço que você tem interesse
                        </FormDescription>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-80">
                            <SelectGroup>
                              <SelectLabel>Serviços</SelectLabel>
                              {services.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Como podemos ajudar seu negócio?" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800/70 shadow-sm rounded-xl p-8 relative z-10 h-full">
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-i9-blue/10 dark:bg-i9-blue/20 rounded-full p-3">
                    <Mail className="w-5 h-5 text-i9-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:contato@i9agencia.com.br" className="text-gray-600 dark:text-gray-300 hover:text-i9-blue dark:hover:text-i9-blue transition-colors">
                      contato@i9agencia.com.br
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-i9-blue/10 dark:bg-i9-blue/20 rounded-full p-3">
                    <Phone className="w-5 h-5 text-i9-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Telefone</h4>
                    <a href="tel:+5511998765432" className="text-gray-600 dark:text-gray-300 hover:text-i9-blue dark:hover:text-i9-blue transition-colors">
                      +55 11 99876-5432
                    </a>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-4">Compartilhar</h4>
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      onClick={() => handleShareSocial("facebook")} 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
                      aria-label="Compartilhar no Facebook"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleShareSocial("twitter")} 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors" 
                      aria-label="Compartilhar no Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleShareSocial("linkedin")} 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors" 
                      aria-label="Compartilhar no LinkedIn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleShareSocial("whatsapp")} 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors" 
                      aria-label="Compartilhar no WhatsApp"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.301-.767.966-.94 1.164-.173.199-.347.223-.646.075-.3-.15-1.267-.465-2.414-1.485-.893-.795-1.494-1.776-1.67-2.076-.174-.301-.018-.465.13-.615.134-.135.301-.353.452-.529.149-.176.198-.301.297-.502.099-.2.05-.374-.025-.524-.075-.15-.672-1.62-.922-2.219-.239-.582-.487-.501-.673-.51-.172-.009-.371-.01-.571-.01-.2 0-.523.074-.797.359-.273.284-1.045.942-1.045 2.299s1.07 2.669 1.22 2.87c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.571-.347z" />
                        <path d="M13.458 24h-.08a11.947 11.947 0 01-6.108-1.688l-.439-.262-4.56 1.229 1.245-4.545-.287-.455A11.934 11.934 0 011 11.882C1 5.335 6.335 0 12.882 0c3.18 0 6.15 1.232 8.4 3.472a11.717 11.717 0 013.443 8.347c0 6.548-5.335 11.882-11.267 11.882z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleShareSocial("blog")}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
                      aria-label="Ver Blog"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        <path d="M17 9H9.5a.5.5 0 0 0 0 1H17a.5.5 0 0 0 0-1zM15 12H9.5a.5.5 0 0 0 0 1H15a.5.5 0 0 0 0-1zM13 15H9.5a.5.5 0 0 0 0 1H13a.5.5 0 0 0 0-1z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleShareSocial("testimonials")}
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors"
                      aria-label="Ver Depoimentos"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                    <button 
                      className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-3 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'i9 Agência de Marketing Digital',
                            text: 'Confira a i9 Agência de Marketing Digital',
                            url: window.location.href,
                          })
                          .catch((error) => console.log('Erro ao compartilhar', error));
                        }
                      }}
                      aria-label="Compartilhar"
                    >
                      <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Modal */}
      <TestimonialsModal open={testimonialsOpen} onOpenChange={setTestimonialsOpen} />
    </section>
  );
};

export default ContactForm;
