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
import { ContactTestimonialsButton } from "@/components/ContactTestimonialsButton";

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

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email') => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("i9 Agência Digital - Especialistas em Marketing Digital");
    const message = encodeURIComponent("Conheça a i9 Agência Digital e descubra como podemos impulsionar seu negócio online!");
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${message}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message} ${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${message} ${url}`;
        break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <section id="contato" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Entre em Contato</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a atingir seus objetivos de marketing digital. 
            Preencha o formulário abaixo ou entre em contato diretamente através de um dos nossos canais.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
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
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Informações de Contato</h3>
              
              <div className="space-y-4">
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
                  <h4 className="font-medium mb-4">Compartilhe</h4>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-sm hover:shadow transition-all"
                      aria-label="Compartilhar no Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white shadow-sm hover:shadow transition-all"
                      aria-label="Compartilhar no Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center text-white shadow-sm hover:shadow transition-all"
                      aria-label="Compartilhar no LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-3.096 0 1.548 1.548 0 013.096 0zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-sm hover:shadow transition-all"
                      aria-label="Compartilhar no WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M20.11 3.89C17.95 1.72 14.98 0.5 11.85 0.5C5.5 0.5 0.32 5.68 0.32 12.04C0.32 14.25 0.95 16.41 2.11 18.28L0.25 24L6.11 22.18C7.9 23.23 9.89 23.79 11.92 23.79H11.93C18.29 23.79 23.5 18.61 23.5 12.25C23.5 9.13 22.27 6.15 20.11 3.89ZM11.85 21.83C10.09 21.83 8.36 21.3 6.85 20.29L6.5 20.08L2.97 21.14L4.05 17.72L3.82 17.36C2.71 15.79 2.13 13.95 2.13 12.04C2.13 6.72 6.53 2.32 11.86 2.32C14.46 2.32 16.91 3.34 18.69 5.13C20.47 6.91 21.5 9.36 21.49 11.96C21.49 17.28 17.08 21.83 11.85 21.83ZM17.05 14.53C16.76 14.39 15.41 13.72 15.14 13.63C14.87 13.54 14.67 13.5 14.47 13.79C14.27 14.08 13.75 14.7 13.58 14.9C13.41 15.1 13.24 15.12 12.95 14.98C12.66 14.84 11.78 14.56 10.74 13.63C9.92 12.9 9.37 12.02 9.2 11.73C9.03 11.44 9.18 11.28 9.32 11.14C9.45 11.01 9.61 10.8 9.75 10.63C9.89 10.46 9.94 10.33 10.03 10.13C10.12 9.94 10.07 9.77 10 9.63C9.94 9.5 9.38 8.15 9.14 7.57C8.9 7 8.66 7.08 8.48 7.07C8.31 7.06 8.11 7.06 7.91 7.06C7.71 7.06 7.39 7.13 7.12 7.42C6.85 7.71 6.15 8.38 6.15 9.73C6.15 11.08 7.13 12.38 7.27 12.58C7.41 12.78 9.36 15.78 12.33 17C13.09 17.33 13.68 17.52 14.14 17.67C14.9 17.91 15.6 17.88 16.15 17.8C16.77 17.72 17.85 17.13 18.09 16.45C18.33 15.77 18.33 15.19 18.26 15.08C18.19 14.97 17.99 14.91 17.7 14.77C17.41 14.64 17.05 14.53 17.05 14.53Z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center text-white shadow-sm hover:shadow transition-all"
                      aria-label="Compartilhar por E-mail"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col space-y-4">
              <div className="mt-4">
                <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">O que nossos clientes dizem</h4>
                <div className="flex justify-start">
                  <ContactTestimonialsButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TestimonialsModal open={testimonialsOpen} onOpenChange={setTestimonialsOpen} />
    </section>
  );
};

export default ContactForm;
