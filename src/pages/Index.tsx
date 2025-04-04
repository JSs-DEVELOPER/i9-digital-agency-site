
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";
import { useState } from "react";
import { AppointmentModal } from "@/components/AppointmentModal";

// Define services
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

const Index = () => {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div id="home">
          <Hero onOpenAppointment={() => setAppointmentOpen(true)} />
        </div>
        <Services />
        <About />
        <Testimonials />
        <BlogPreview />
        <ContactForm />
      </main>
      <Footer />
      
      {/* Modal de Agendamento */}
      <AppointmentModal 
        open={appointmentOpen} 
        onOpenChange={setAppointmentOpen} 
        services={services}
      />
    </div>
  );
};

export default Index;
