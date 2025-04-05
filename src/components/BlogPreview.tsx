
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Linkedin, Mail, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogPost } from "@/types/BlogPost";

const blogPosts = [
  {
    title: "Como o Marketing Digital Pode Transformar Seu Negócio em 2023",
    date: "15 Março, 2023",
    excerpt: "Descubra as estratégias de marketing digital mais efetivas para impulsionar seu negócio este ano.",
    content: `<p>No cenário empresarial atual, ter uma presença digital forte não é mais opcional — é essencial. As empresas que adotam estratégias eficazes de marketing digital estão vendo resultados transformadores em seus negócios.</p>
              <h3>Por Que o Marketing Digital é Crucial Hoje</h3>
              <p>O comportamento do consumidor mudou drasticamente na última década. Hoje, a maioria dos consumidores inicia sua jornada de compra online, pesquisando produtos e serviços antes de fazer uma decisão.</p>
              <p>As estatísticas mostram que 87% dos consumidores começam suas pesquisas de produtos na internet, e 70% dos processos de compra B2B envolvem pesquisa online.</p>
              <h3>Estratégias Que Estão Funcionando em 2023</h3>
              <ul>
                <li><strong>Marketing de Conteúdo Personalizado:</strong> Conteúdo relevante e personalizado continua sendo rei, mas agora com ênfase em segmentação avançada.</li>
                <li><strong>Vídeo Marketing:</strong> Conteúdo em vídeo domina as redes sociais e tem taxas de engajamento significativamente maiores que outros formatos.</li>
                <li><strong>Marketing de Influência:</strong> Parceria com micro-influenciadores para alcançar audiências nichos altamente engajadas.</li>
                <li><strong>Marketing Automatizado:</strong> Uso de IA e automação para personalizar a experiência do cliente em escala.</li>
              </ul>
              <p>Implementar essas estratégias requer um planejamento cuidadoso e execução consistente, mas os resultados podem transformar completamente o crescimento do seu negócio.</p>`,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "SEO em 2023: O Que Realmente Funciona Agora",
    date: "27 Abril, 2023",
    excerpt: "As táticas de SEO evoluíram drasticamente. Aprenda o que está funcionando agora e o que deve ser evitado.",
    content: `<p>O SEO continua sendo uma parte vital de qualquer estratégia de marketing digital, mas as táticas que funcionaram há alguns anos podem não ser mais eficazes hoje.</p>
              <h3>As Mudanças Mais Importantes no SEO</h3>
              <p>Os algoritmos dos mecanismos de busca estão cada vez mais sofisticados, com foco em intenção de pesquisa e experiência do usuário, em vez de palavras-chave isoladas.</p>
              <p>O Google agora utiliza inteligência artificial através do BERT e MUM para entender o contexto das pesquisas e fornecer resultados mais relevantes.</p>
              <h3>Táticas de SEO Que Funcionam em 2023</h3>
              <ul>
                <li><strong>Conteúdo Orientado para Clusters de Tópicos:</strong> Organizar o conteúdo em tópicos relacionados em vez de palavras-chave isoladas.</li>
                <li><strong>Otimização para Intenção de Pesquisa:</strong> Compreender e atender à verdadeira intenção por trás das pesquisas dos usuários.</li>
                <li><strong>Core Web Vitals:</strong> Garantir que seu site tenha boa performance, especialmente em dispositivos móveis.</li>
                <li><strong>EAT (Expertise, Autoridade, Confiabilidade):</strong> Demonstrar credibilidade e autoridade em seu nicho.</li>
              </ul>
              <p>Adaptar sua estratégia de SEO para estas tendências atuais pode resultar em um aumento significativo no tráfego orgânico e nas conversões.</p>`,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "Como Criar Campanhas de Email Marketing com Alto Retorno",
    date: "10 Maio, 2023",
    excerpt: "Email marketing continua oferecendo o maior ROI. Aprenda a criar campanhas que convertem.",
    content: `<p>Apesar do surgimento de novos canais de marketing, o email marketing continua sendo uma das estratégias com maior retorno sobre investimento, com uma média de R$42 para cada R$1 investido.</p>
              <h3>Por Que o Email Marketing Ainda Funciona</h3>
              <p>O email oferece uma linha direta para o consumidor, sem algoritmos limitando seu alcance. Além disso, é uma forma de comunicação que o usuário já está acostumado a usar diariamente.</p>
              <p>Com as ferramentas certas, é possível personalizar e segmentar suas campanhas de email para atingir exatamente as pessoas certas com a mensagem certa.</p>
              <h3>Estratégias Para Campanhas de Email de Alto Desempenho</h3>
              <ul>
                <li><strong>Segmentação Avançada:</strong> Dividir sua lista em segmentos específicos baseados em comportamento, demografia e estágio no funil de vendas.</li>
                <li><strong>Personalização Além do Nome:</strong> Personalizar o conteúdo com base no histórico de interações e preferências do usuário.</li>
                <li><strong>Automação Inteligente:</strong> Criar fluxos de emails que respondem ao comportamento do usuário em tempo real.</li>
                <li><strong>Testes A/B Contínuos:</strong> Testar diferentes elementos como assunto, hora de envio e design para otimizar resultados.</li>
              </ul>
              <p>Implementando estas estratégias, suas campanhas de email podem se tornar uma fonte consistente e lucrativa de conversões para seu negócio.</p>`,
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Redes Sociais em 2023: Estratégias Que Realmente Geram Resultados",
    date: "22 Junho, 2023",
    excerpt: "Com tantas mudanças nas redes sociais, aprenda quais estratégias estão realmente gerando ROI.",
    content: `<p>As redes sociais estão em constante evolução, e o que funcionou no ano passado pode não funcionar mais hoje. As marcas precisam adaptar suas estratégias para permanecer relevantes e eficazes.</p>
              <h3>As Principais Tendências de Redes Sociais</h3>
              <p>Vídeos curtos continuam dominando, com plataformas como TikTok e Instagram Reels liderando em engajamento. Conteúdo autêntico e menos produzido está superando o conteúdo excessivamente polido.</p>
              <p>As marcas estão encontrando sucesso em construir comunidades em vez de apenas buscar números de seguidores.</p>
              <h3>Estratégias Eficazes para Redes Sociais</h3>
              <ul>
                <li><strong>Marketing de Comunidade:</strong> Fomentar espaços onde seus seguidores possam se conectar entre si em torno de interesses compartilhados.</li>
                <li><strong>Narrativa Visual:</strong> Contar histórias convincentes usando formatos visuais como vídeos curtos e infográficos interativos.</li>
                <li><strong>Social Selling:</strong> Transformar seguidores em clientes através de estratégias de venda suaves e diretas dentro das plataformas.</li>
                <li><strong>Estratégia de Nicho:</strong> Focar em plataformas específicas onde seu público-alvo está mais ativo, em vez de tentar estar em todas as redes.</li>
              </ul>
              <p>As redes sociais continuam sendo um canal vital para construção de marca e geração de leads, mas requerem uma abordagem mais estratégica e focada do que nunca.</p>`,
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Como Utilizar IA para Otimizar Suas Estratégias de Marketing",
    date: "08 Julho, 2023",
    excerpt: "Inteligência Artificial está revolucionando o marketing. Descubra como utilizá-la a seu favor.",
    content: `<p>A Inteligência Artificial não é mais uma tecnologia do futuro – ela está aqui e está transformando a maneira como fazemos marketing digital. As empresas que estão aproveitando o poder da IA estão obtendo vantagens competitivas significativas.</p>
              <h3>Como a IA Está Mudando o Marketing</h3>
              <p>A IA permite personalização em escala, análise preditiva e automação de tarefas repetitivas, permitindo que os profissionais de marketing foquem em estratégia e criatividade.</p>
              <p>As ferramentas de IA agora podem analisar grandes volumes de dados e extrair insights acionáveis que seriam impossíveis de se obter manualmente.</p>
              <h3>Aplicações Práticas da IA no Marketing</h3>
              <ul>
                <li><strong>Chatbots Avançados:</strong> Assistentes virtuais que podem lidar com consultas de clientes 24/7 de forma personalizada.</li>
                <li><strong>Criação de Conteúdo:</strong> Ferramentas que podem gerar ou otimizar conteúdo para diferentes canais e públicos.</li>
                <li><strong>Análise Preditiva:</strong> Prever comportamentos futuros dos clientes com base em padrões históricos.</li>
                <li><strong>Personalização Dinâmica:</strong> Adaptar automaticamente conteúdo e ofertas com base em comportamentos em tempo real.</li>
              </ul>
              <p>A chave é encontrar o equilíbrio certo entre automação e toque humano para criar experiências que sejam eficientes, mas também genuínas e envolventes.</p>`,
    image: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    title: "Estratégias de Marketing de Conteúdo para Dominar SEO em 2023",
    date: "15 Agosto, 2023",
    excerpt: "Descubra como criar conteúdo que não apenas engaja seus leitores, mas também conquista as primeiras posições nos mecanismos de busca.",
    content: `<p>O marketing de conteúdo e o SEO estão mais interdependentes do que nunca. Hoje, não basta criar conteúdo de qualidade; ele precisa ser estrategicamente otimizado para os mecanismos de busca.</p>
              <h3>A Relação Entre Conteúdo e SEO</h3>
              <p>Os algoritmos de busca estão cada vez mais sofisticados em identificar conteúdo de alta qualidade. O Google, em particular, tem enfatizado a importância da relevância e profundidade do conteúdo.</p>
              <p>Estudos recentes mostram que conteúdos de alta qualidade com mais de 2.000 palavras tendem a ter melhor desempenho em SEO, mas apenas se realmente oferecerem valor para o leitor.</p>
              <h3>Estratégias Eficazes de Marketing de Conteúdo para SEO</h3>
              <ul>
                <li><strong>Pesquisa de Palavras-chave Baseada em Intenção:</strong> Focar em keywords que refletem a real intenção de busca do usuário, não apenas volume.</li>
                <li><strong>Conteúdo Pilar e Cluster:</strong> Criar conteúdos pilares abrangentes suportados por artigos complementares mais específicos.</li>
                <li><strong>Atualização Regular de Conteúdo:</strong> Revisar e atualizar conteúdos antigos para mantê-los relevantes e bem posicionados.</li>
                <li><strong>Interconexão Estratégica:</strong> Criar uma rede de links internos que distribuam autoridade e guiem os usuários através do seu conteúdo.</li>
              </ul>
              <p>Implementando estas estratégias de forma consistente, é possível construir uma presença online robusta que atrai tráfego orgânico qualificado e converte visitantes em clientes.</p>`,
    image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2001&q=80"
  },
  {
    title: "Google Analytics 4: O Que Mudou e Como Aproveitar ao Máximo",
    date: "12 Setembro, 2023",
    excerpt: "Com a migração obrigatória para o GA4, aprenda a tirar o máximo proveito desta nova versão para suas análises de marketing.",
    content: `<p>A transição do Universal Analytics para o Google Analytics 4 (GA4) representa uma das maiores mudanças na história da plataforma de análise da Google. Esta nova versão traz mudanças fundamentais na forma como os dados são coletados e analisados.</p>
              <h3>As Principais Diferenças do GA4</h3>
              <p>O GA4 utiliza um modelo baseado em eventos em vez de sessões, oferecendo uma visão mais granular das interações dos usuários. Além disso, ele incorpora inteligência artificial para oferecer insights mais profundos.</p>
              <p>A nova plataforma também foi projetada para funcionar em um mundo com crescentes restrições de privacidade e cookies, utilizando modelagem avançada para preencher lacunas de dados.</p>
              <h3>Como Aproveitar ao Máximo o GA4</h3>
              <ul>
                <li><strong>Estruturação de Eventos Personalizada:</strong> Definir uma estratégia clara para rastreamento de eventos que alinhe-se com seus objetivos de negócio.</li>
                <li><strong>Utilização de Públicos Avançados:</strong> Aproveitar os recursos de segmentação aprimorados para criar públicos mais específicos para suas campanhas.</li>
                <li><strong>Exploração do Funil de Análise:</strong> Utilizar a ferramenta de análise de funil para identificar onde os usuários estão abandonando o processo de conversão.</li>
                <li><strong>Integração com o BigQuery:</strong> Para análises mais avançadas, explorar a integração gratuita com o BigQuery disponível no GA4.</li>
              </ul>
              <p>Embora a curva de aprendizado possa ser íngreme, o GA4 oferece capacidades de análise muito mais poderosas que podem transformar sua compreensão do comportamento do cliente e a eficácia de suas estratégias de marketing.</p>`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "O Impacto do Marketing Local para Negócios Físicos",
    date: "05 Outubro, 2023",
    excerpt: "Mesmo na era digital, o marketing local continua sendo crucial para negócios com presença física. Saiba como destacar-se em sua comunidade.",
    content: `<p>Apesar do crescimento do comércio eletrônico, a maioria das compras ainda acontece em lojas físicas, especialmente para certos tipos de produtos e serviços. O marketing local é essencial para negócios com presença física que desejam atrair clientes em sua área geográfica.</p>
              <h3>Por Que o Marketing Local Importa</h3>
              <p>"Perto de mim" e buscas locais cresceram mais de 200% nos últimos anos, com consumidores cada vez mais interessados em encontrar soluções próximas a eles.</p>
              <p>Estudos mostram que 76% das pessoas que realizam uma busca local em seu smartphone visitam uma loja física dentro de 24 horas, e 28% dessas buscas resultam em uma compra.</p>
              <h3>Estratégias Eficazes de Marketing Local</h3>
              <ul>
                <li><strong>Google Business Profile Otimizado:</strong> Manter seu perfil no Google atualizado com informações precisas, fotos de alta qualidade e respostas a avaliações.</li>
                <li><strong>SEO Local:</strong> Otimizar seu site para termos de busca locais e criar conteúdo relevante para sua comunidade.</li>
                <li><strong>Marketing de Conteúdo Localizado:</strong> Criar conteúdo que aborde temas e eventos locais relevantes para sua audiência.</li>
                <li><strong>Estratégia de Avaliações:</strong> Incentivar avaliações positivas e gerenciar ativamente sua reputação online.</li>
              </ul>
              <p>Implementar uma estratégia de marketing local bem estruturada pode aumentar significativamente o tráfego para seu negócio físico e impulsionar suas vendas, mesmo em um mundo cada vez mais digital.</p>`,
    image: "https://images.unsplash.com/photo-1534216802578-b752d83df5be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Marketing de Influência: Além das Celebridades",
    date: "20 Novembro, 2023",
    excerpt: "Descubra como micro e nano influenciadores estão redefinindo o marketing de influência com maior autenticidade e engajamento.",
    content: `<p>O marketing de influência está evoluindo para além das celebridades e mega-influenciadores. Hoje, marcas inteligentes estão descobrindo o valor dos micro e nano influenciadores que, apesar de terem menos seguidores, frequentemente geram resultados mais impactantes.</p>
              <h3>A Ascensão dos Micro-Influenciadores</h3>
              <p>Micro-influenciadores (com 10.000 a 50.000 seguidores) e nano-influenciadores (com menos de 10.000 seguidores) estão provando que o engajamento é mais valioso que alcance puro.</p>
              <p>Estudos mostram que influenciadores com menos seguidores têm taxas de engajamento até 60% maiores que celebridades e mega-influenciadores, além de serem percebidos como mais autênticos e confiáveis pelo público.</p>
              <h3>Estratégias para um Marketing de Influência Eficaz</h3>
              <ul>
                <li><strong>Priorize Alinhamento sobre Alcance:</strong> Busque influenciadores cujos valores e estética se alinham naturalmente com sua marca.</li>
                <li><strong>Estabeleça Parcerias de Longo Prazo:</strong> Colaborações continuadas são mais eficazes que campanhas pontuais.</li>
                <li><strong>Permita Autenticidade Criativa:</strong> Dê liberdade aos influenciadores para criarem conteúdo que ressoe com seu público.</li>
                <li><strong>Meça Além das Métricas Básicas:</strong> Avalie não apenas visualizações e likes, mas engajamento, tráfego e, principalmente, conversões.</li>
              </ul>
              <p>Quando bem executado, o marketing de influência pode oferecer um retorno sobre investimento significativamente maior que formas tradicionais de publicidade, estabelecendo conexões genuínas com potenciais clientes através de vozes que já conquistaram sua confiança.</p>`,
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Personalização em Escala: O Futuro do Email Marketing",
    date: "07 Dezembro, 2023",
    excerpt: "Com avanços em IA e automação, descubra como criar campanhas de email hiperpersonalizadas que aumentam conversões.",
    content: `<p>A personalização no email marketing evoluiu muito além do simples "Olá [nome]". Hoje, com avanços em inteligência artificial e automação, é possível criar experiências de email verdadeiramente individualizadas em grande escala.</p>
              <h3>Por Que a Hiperpersonalização é o Futuro</h3>
              <p>Estudos mostram que emails personalizados geram 29% mais aberturas e 41% mais cliques que emails genéricos. Além disso, a personalização pode aumentar o ROI do email marketing em até 122%.</p>
              <p>Consumidores modernos esperam que as marcas os conheçam e ofereçam conteúdo relevante às suas necessidades específicas, tornando a hiperpersonalização não apenas uma vantagem competitiva, mas uma expectativa básica.</p>
              <h3>Estratégias para Hiperpersonalização de Emails</h3>
              <ul>
                <li><strong>Coleta Inteligente de Dados:</strong> Utilizar fontes diversas de dados para construir perfis comportamentais completos.</li>
                <li><strong>Segmentação Preditiva:</strong> Usar IA para identificar padrões e prever quais conteúdos terão maior ressonância com diferentes segmentos.</li>
                <li><strong>Conteúdo Dinâmico:</strong> Implementar elementos de email que mudam automaticamente com base no perfil do destinatário.</li>
                <li><strong>Jornadas Adaptativas:</strong> Criar fluxos de email que se adaptam com base nas interações anteriores do usuário.</li>
              </ul>
              <p>Com a implementação dessas estratégias avançadas de personalização, as marcas podem transformar seu programa de email marketing de simples boletins informativos para poderosas ferramentas de conversão que oferecem experiências genuinamente relevantes para cada destinatário.</p>`,
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    title: "Voice Search Optimization: Preparando seu Marketing para a Era da Voz",
    date: "15 Janeiro, 2024",
    excerpt: "Com assistentes de voz cada vez mais populares, saiba como adaptar sua estratégia de SEO para buscas por voz.",
    content: `<p>As buscas por voz estão transformando rapidamente a maneira como as pessoas encontram informações online. Com a crescente adoção de assistentes como Alexa, Siri e Google Assistant, as marcas precisam adaptar suas estratégias de SEO para este novo paradigma.</p>
              <h3>O Crescimento das Buscas por Voz</h3>
              <p>Aproximadamente 41% dos adultos usam pesquisa por voz pelo menos uma vez ao dia, e estima-se que 50% de todas as buscas serão feitas por voz em breve.</p>
              <p>As buscas por voz são fundamentalmente diferentes das buscas por texto: são mais longas, mais conversacionais e frequentemente formuladas como perguntas completas.</p>
              <h3>Estratégias para Otimização para Busca por Voz</h3>
              <ul>
                <li><strong>Conteúdo de Perguntas e Respostas:</strong> Criar conteúdo estruturado para responder diretamente às perguntas mais comuns do seu público.</li>
                <li><strong>Linguagem Conversacional:</strong> Otimizar para frases e expressões naturais que as pessoas usariam ao falar, não apenas palavras-chave isoladas.</li>
                <li><strong>Otimização para Featured Snippets:</strong> Estruturar conteúdo para aumentar as chances de aparecer nos snippets em destaque, que são frequentemente usados para respostas por voz.</li>
                <li><strong>Velocidade e Mobile-First:</strong> Garantir que seu site carregue rapidamente e ofereça uma excelente experiência em dispositivos móveis, que são frequentemente usados para buscas por voz.</li>
              </ul>
              <p>As marcas que se adaptarem proativamente à crescente importância das buscas por voz estarão bem posicionadas para capturar este tráfego valioso e manter sua visibilidade no ecossistema de busca em evolução.</p>`,
    image: "https://images.unsplash.com/photo-1590658268037-7050af164c5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2033&q=80"
  },
  {
    title: "Tendências de Marketing Digital para 2024",
    date: "05 Fevereiro, 2024",
    excerpt: "Descubra as tendências emergentes que moldarão o cenário do marketing digital no próximo ano.",
    content: `<p>O ritmo de evolução no marketing digital continua acelerando, trazendo novas oportunidades e desafios para marcas e profissionais de marketing. Antecipar estas tendências é crucial para manter-se competitivo no mercado.</p>
              <h3>As Principais Tendências para 2024</h3>
              <p>2024 promete ser um ano de transformações significativas, impulsionadas pelo amadurecimento de tecnologias emergentes e mudanças no comportamento do consumidor.</p>
              <p>As marcas que conseguirem adaptar-se rapidamente a estas tendências terão uma vantagem competitiva substancial no mercado.</p>
              <h3>Tendências a Observar em 2024</h3>
              <ul>
                <li><strong>Marketing Generativo com IA:</strong> Utilização de IA generativa para criar conteúdo personalizado em escala que ressoe com audiências específicas.</li>
                <li><strong>Comércio Conversacional:</strong> Integração de experiências de compra diretamente em plataformas de mensagem e assistentes virtuais.</li>
                <li><strong>Sustentabilidade como Diferencial:</strong> Comunicação autêntica de iniciativas sustentáveis como parte central da estratégia de marca.</li>
                <li><strong>Privacidade Centrada no Usuário:</strong> Desenvolvimento de estratégias de marketing que respeitem e até mesmo celebrem a privacidade do usuário.</li>
                <li><strong>Realidade Aumentada Aplicada:</strong> Utilização de AR para experiências de produto imersivas que impulsionam conversões.</li>
              </ul>
              <p>As marcas que conseguirem não apenas acompanhar estas tendências, mas integrá-las estrategicamente às suas operações de marketing, estarão bem posicionadas para prosperar no ambiente digital cada vez mais complexo e competitivo de 2024.</p>`,
    image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Marketing de Performance: Maximizando ROI com Dados",
    date: "12 Março, 2024",
    excerpt: "Aprenda a usar dados e análises para otimizar suas campanhas de marketing e maximizar o retorno sobre investimento.",
    content: `<p>No cenário atual, onde cada real investido em marketing precisa ser justificado, o marketing de performance baseado em dados tornou-se indispensável. Esta abordagem permite que as marcas otimizem continuamente suas campanhas para maximizar resultados mensuráveis.</p>
              <h3>A Importância dos Dados no Marketing</h3>
              <p>Empresas que adotam decisões baseadas em dados têm 23 vezes mais probabilidade de adquirir clientes, 6 vezes mais probabilidade de retê-los e 19 vezes mais probabilidade de ser lucrativas.</p>
              <p>No entanto, muitas organizações ainda lutam para transformar os vastos volumes de dados que coletam em insights acionáveis que possam impulsionar resultados de negócios.</p>
              <h3>Estratégias para Marketing de Performance Eficaz</h3>
              <ul>
                <li><strong>Definição Clara de KPIs:</strong> Estabelecer métricas precisas alinhadas aos objetivos de negócio, indo além de métricas de vaidade.</li>
                <li><strong>Atribuição Multi-Touch:</strong> Implementar modelos de atribuição avançados que reconheçam toda a jornada do cliente.</li>
                <li><strong>Testes Contínuos:</strong> Adotar uma cultura de experimentação com testes A/B rigorosos para todas as campanhas importantes.</li>
                <li><strong>Orçamento Dinâmico:</strong> Redistribuir continuamente o orçamento para os canais, campanhas e táticas com melhor desempenho.</li>
              </ul>
              <p>O marketing de performance não é apenas sobre medir resultados, mas sobre criar um ciclo de feedback contínuo que permite otimização constante. As marcas que dominam esta abordagem científica ao marketing não apenas sobrevivem em mercados competitivos – elas prosperam, superando consistentemente a concorrência em métricas de crescimento chave.</p>`,
    image: "https://images.unsplash.com/photo-1571097610979-97a690bb89d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2033&q=80"
  },
  {
    title: "Inbound Marketing: Atraindo e Convertendo Clientes no Mundo Digital",
    date: "25 Março, 2024",
    excerpt: "Descubra como implementar uma estratégia de inbound marketing eficaz que atrai, converte e encanta seu público-alvo.",
    content: `<p>O inbound marketing transformou a maneira como as empresas se conectam com clientes potenciais, substituindo táticas interruptivas por uma abordagem centrada em atrair clientes com conteúdo valioso e experiências personalizadas.</p>
              <h3>Por Que o Inbound Marketing Funciona</h3>
              <p>O inbound marketing custa 62% menos por lead que o marketing tradicional outbound, enquanto gera 3 vezes mais leads por real investido, segundo pesquisas do setor.</p>
              <p>Esta metodologia alinha-se com o comportamento moderno do consumidor, que pesquisa ativamente soluções e rejeita publicidade intrusiva, preferindo engajar-se com marcas em seus próprios termos.</p>
              <h3>Implementando uma Estratégia de Inbound Marketing Eficaz</h3>
              <ul>
                <li><strong>Conteúdo Direcionado por Persona:</strong> Criar conteúdo específico para cada persona em diferentes estágios do funil de vendas.</li>
                <li><strong>Jornada de Compra Mapeada:</strong> Desenvolver jornadas de conteúdo que guiem naturalmente o prospect do reconhecimento do problema até a decisão.</li>
                <li><strong>Automação de Marketing:</strong> Implementar fluxos de automação que nutram leads com conteúdo relevante no momento certo.</li>
                <li><strong>Alinhamento de Vendas e Marketing:</strong> Garantir que as equipes de vendas e marketing estejam alinhadas em critérios de qualificação de leads e processos de handover.</li>
              </ul>
              <p>Quando implementado corretamente, o inbound marketing não apenas gera leads de maior qualidade a um custo menor, mas também cria relacionamentos mais profundos com clientes, transformando-os em defensores da marca que impulsionam o crescimento através de recomendações e referências.</p>`,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const BlogPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [api, setApi] = useState<any>(null);
  
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  
  const handleShare = (platform: string) => {
    if (!selectedPost) return;
    
    const url = window.location.href;
    const title = selectedPost.title;
    
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
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Confira este artigo: ${title} - ${url}`)}`;
        break;
    }
    
    if (shareUrl) window.open(shareUrl, "_blank");
  };

  useEffect(() => {
    if (api) {
      const interval = setInterval(() => {
        api.scrollNext(); // Move carousel to the right (right to left movement)
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [api]);

  return (
    <section id="blog" className="container-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900/50 -z-20"></div>
      
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-i9-blue rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-i9-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-i9-blue/10 text-i9-blue font-medium text-sm mb-4">
            Blog
          </span>
          <p className="section-subtitle">
            Artigos, tutoriais e insights para ajudar a manter sua estratégia de marketing digital à frente da concorrência.
          </p>
        </div>
        
        <div className="relative px-6 md:px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="flex">
              {blogPosts.map((post, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto">
                        <Button 
                          onClick={() => handleReadMore(post)} 
                          variant="ghost" 
                          className="text-i9-blue hover:text-i9-blue hover:bg-i9-blue/10 p-0 h-auto flex items-center font-medium"
                        >
                          Ler mais <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 right-0 flex justify-between pointer-events-none z-10 px-2 md:px-12">
              <CarouselPrevious className="relative pointer-events-auto w-12 h-12 lg:w-16 lg:h-16 opacity-90" />
              <CarouselNext className="relative pointer-events-auto w-12 h-12 lg:w-16 lg:h-16 opacity-90" />
            </div>
          </Carousel>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-bold">{selectedPost.title}</DialogTitle>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{selectedPost.date}</span>
                  </div>
                </DialogHeader>
                
                <div className="mt-6">
                  <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={selectedPost.image} 
                      alt={selectedPost.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <article 
                    className="prose dark:prose-invert prose-img:rounded-lg prose-headings:font-semibold prose-a:text-i9-blue max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Compartilhar:
                      </span>
                      <button 
                        onClick={() => handleShare("twitter")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare("facebook")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleShare("linkedin")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Linkedin size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>
                      <button 
                        onClick={() => handleShare("email")}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Mail size={16} className="text-gray-700 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default BlogPreview;
