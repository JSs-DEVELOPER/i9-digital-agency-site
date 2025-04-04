
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-i9-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          <div>
            <h3 className="text-lg font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-i9-blue flex-shrink-0 mt-0.5" />
                <a href="mailto:contato@i9empreendendo.com" className="text-gray-400 hover:text-white transition-colors">
                  contato@i9empreendendo.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-i9-blue flex-shrink-0 mt-0.5" />
                <a href="tel:+5500000000000" className="text-gray-400 hover:text-white transition-colors">
                  +55 (00) 0000-0000
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-i9-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Av. Principal, 1000<br />
                  Centro, Cidade - Estado<br />
                  CEP: 00000-000
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} i9 Agência. Todos os direitos reservados.
          </p>
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
