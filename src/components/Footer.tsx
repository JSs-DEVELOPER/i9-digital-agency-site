
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    return date.toLocaleDateString('pt-BR', options);
  };
  
  return (
    <footer className="bg-i9-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <img 
              src="https://i9empreendendo.com/wp-content/uploads/2024/10/i9logo-2_preview_rev_1.png" 
              alt="i9 Agência" 
              className="h-12 mb-6" 
            />
            <p className="text-gray-400 mb-6">
              Transformamos negócios através de estratégias de marketing digital com foco em resultados mensuráveis e ROI positivo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-i9-blue p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-i9-blue p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-i9-blue p-2 rounded-full transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-i9-blue p-2 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Serviços</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SEO</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Google Ads</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook Ads</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketing de Conteúdo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desenvolvimento Web</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultoria</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400">
              &copy; {currentDate.getFullYear()} i9 Agência. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-sm mt-1">{formatDate(currentDate)}</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
