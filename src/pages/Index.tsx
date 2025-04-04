
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Services />
        <About />
        <Testimonials />
        <BlogPreview />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
