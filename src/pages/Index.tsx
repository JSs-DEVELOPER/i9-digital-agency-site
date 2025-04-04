
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>i9 Agência - Marketing Digital com Resultados Comprovados</title>
        <meta name="description" content="A i9 Agência desenvolve estratégias personalizadas de marketing digital para SEO, Google Ads, Redes Sociais e mais. Aumente suas conversões online com nossa expertise." />
        <meta name="keywords" content="marketing digital, SEO, Google Ads, Facebook Ads, redes sociais, conversão, tráfego, leads, resultados, agência de marketing" />
        <meta name="author" content="i9 Agência" />
        <meta property="og:title" content="i9 Agência - Marketing Digital com Resultados Comprovados" />
        <meta property="og:description" content="A i9 Agência desenvolve estratégias personalizadas de marketing digital para SEO, Google Ads, Redes Sociais e mais. Aumente suas conversões online com nossa expertise." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i9empreendendo.com/wp-content/uploads/2024/10/i9logo-2_preview_rev_1.png" />
        <meta property="og:url" content="https://i9empreendendo.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@i9agencia" />
        <meta name="twitter:title" content="i9 Agência - Marketing Digital com Resultados" />
        <meta name="twitter:description" content="A i9 Agência desenvolve estratégias personalizadas de marketing digital para SEO, Google Ads, Redes Sociais e mais. Aumente suas conversões online com nossa expertise." />
        <meta name="twitter:image" content="https://i9empreendendo.com/wp-content/uploads/2024/10/i9logo-2_preview_rev_1.png" />
        <link rel="canonical" href="https://i9empreendendo.com" />
      </Helmet>
      
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
