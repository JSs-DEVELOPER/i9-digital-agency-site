
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Estratégias Avançadas de SEO para Aumentar seu Tráfego Orgânico",
    excerpt: "Descubra técnicas avançadas de otimização para motores de busca que podem transformar seu desempenho orgânico.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-1.jpg",
    date: "12 Out 2024",
    category: "SEO",
    url: "#"
  },
  {
    id: 2,
    title: "Como Criar uma Estratégia Eficaz de Marketing de Conteúdo",
    excerpt: "Aprenda a desenvolver uma estratégia de conteúdo que atraia, engaje e converta sua audiência em clientes fiéis.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-2.jpg",
    date: "5 Out 2024",
    category: "Marketing de Conteúdo",
    url: "#"
  },
  {
    id: 3,
    title: "7 Táticas para Otimizar suas Campanhas de Google Ads",
    excerpt: "Maximize seu ROI em campanhas de Google Ads com estas táticas comprovadas para melhorar conversões.",
    image: "https://i9empreendendo.com/wp-content/uploads/2024/10/blog-3.jpg",
    date: "28 Set 2024",
    category: "Google Ads",
    url: "#"
  }
];

const BlogPreview = () => {
  return (
    <section id="blog" className="container-section">
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
          Blog
        </span>
        <h2 className="section-title">Conteúdo para impulsionar seu negócio</h2>
        <p className="section-subtitle">
          Artigos, tutoriais e insights para ajudar a manter sua estratégia de marketing digital à frente da concorrência.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="inline-block px-3 py-1 bg-i9-blue/10 text-i9-blue text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-i9-blue transition-colors">
                <a href={post.url}>{post.title}</a>
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              
              <a 
                href={post.url}
                className="flex items-center text-i9-blue font-medium hover:text-i9-blueLight transition-colors"
              >
                Ler mais
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button className="btn-primary">Ver Todos os Artigos</Button>
      </div>
    </section>
  );
};

export default BlogPreview;
