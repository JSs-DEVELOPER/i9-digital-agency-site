
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setLoading(false);
        
        if (!session) {
          navigate('/login');
        } else {
          // Load data when authenticated
          fetchData();
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setLoading(false);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  const fetchData = async () => {
    try {
      // Fetch recent appointments
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (appointmentsError) {
        console.error('Error fetching appointments:', appointmentsError);
      } else {
        setAppointments(appointmentsData || []);
      }
      
      // Fetch recent contact submissions
      const { data: contactsData, error: contactsError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (contactsError) {
        console.error('Error fetching contacts:', contactsError);
      } else {
        setContacts(contactsData || []);
      }
    } catch (error) {
      console.error('Exception fetching data:', error);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-i9-blue border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>Sair</Button>
        </div>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="contacts">Contatos</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos Recentes</CardTitle>
                  <CardDescription>Últimos 10 agendamentos recebidos</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{appointment.name}</h4>
                              <p className="text-sm text-gray-500">{appointment.email}</p>
                              <p className="text-sm text-gray-500">{appointment.phone}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'canceled' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {appointment.status === 'pending' ? 'Pendente' :
                                 appointment.status === 'confirmed' ? 'Confirmado' :
                                 appointment.status === 'canceled' ? 'Cancelado' :
                                 'Concluído'}
                              </span>
                              <p className="text-xs mt-1">
                                {new Date(appointment.appointment_date).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{appointment.service}</p>
                          <p className="mt-1 text-sm text-gray-600">{appointment.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhum agendamento encontrado.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/appointments')}>
                    Ver Todos os Agendamentos
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens de Contato Recentes</CardTitle>
                  <CardDescription>Últimas 10 mensagens recebidas</CardDescription>
                </CardHeader>
                <CardContent>
                  {contacts.length > 0 ? (
                    <div className="space-y-4">
                      {contacts.map(contact => (
                        <div key={contact.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{contact.name}</h4>
                              <p className="text-sm text-gray-500">{contact.email}</p>
                              <p className="text-sm text-gray-500">{contact.phone}</p>
                            </div>
                            <div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                contact.status === 'unread' ? 'bg-red-100 text-red-800' :
                                contact.status === 'read' ? 'bg-blue-100 text-blue-800' :
                                contact.status === 'replied' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {contact.status === 'unread' ? 'Não lido' :
                                 contact.status === 'read' ? 'Lido' :
                                 contact.status === 'replied' ? 'Respondido' :
                                 'Arquivado'}
                              </span>
                              <p className="text-xs mt-1">
                                {new Date(contact.created_at).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{contact.service}</p>
                          <p className="mt-1 text-sm text-gray-600">{contact.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhuma mensagem de contato encontrada.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/admin/contacts')}>
                    Ver Todas as Mensagens
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Agendamentos</CardTitle>
                <CardDescription>
                  Esta seção permite gerenciar todos os agendamentos de consultorias.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">
                  Funcionalidade completa de gerenciamento de agendamentos será implementada em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Mensagens de Contato</CardTitle>
                <CardDescription>
                  Esta seção permite gerenciar todas as mensagens enviadas pelo formulário de contato.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">
                  Funcionalidade completa de gerenciamento de contatos será implementada em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento do Blog</CardTitle>
                <CardDescription>
                  Esta seção permite criar, editar e excluir posts do blog.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-4">
                  Funcionalidade completa de gerenciamento de blog será implementada em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
