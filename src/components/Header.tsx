
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ServiceDetailProps } from "@/components/ServiceModal";

// Define service types for the appointment modal
const services = [
  { title: "SEO" },
  { title: "Google Ads" },
  { title: "Redes Sociais" },
  { title: "Marketing de Conteúdo" },
  { title: "Copywriting" },
  { title: "Facebook Ads" },
  { title: "Desenvolvimento Web" },
  { title: "Análise de Dados" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "Depoimentos", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contato", href: "#contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img 
            src="https://i9empreendendo.com/wp-content/uploads/2024/10/i9logo-2_preview_rev_1.png" 
            alt="i9 Agência" 
            className="h-10 md:h-12" 
          />
        </a>

        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-i9-blue font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button className="btn-primary" onClick={() => setAppointmentOpen(true)}>
              Agendar Consultoria
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background dark:bg-gray-800 py-4 px-4 shadow-md">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-i9-blue font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="btn-primary mt-2" onClick={() => {
              setAppointmentOpen(true);
              setIsMenuOpen(false);
            }}>
              Agendar Consultoria
            </Button>
          </div>
        </nav>
      )}

      <AppointmentModal 
        open={appointmentOpen} 
        onOpenChange={setAppointmentOpen} 
        services={services}
      />
    </header>
  );
};

export default Header;
