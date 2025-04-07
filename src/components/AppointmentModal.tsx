
import { useState, useEffect } from "react"
import { format, isWeekend, isBefore, isAfter, addDays, getDay, getYear } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface AppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  services: { title: string }[]
  selectedService?: string
}

// Função para calcular a data da Páscoa para um determinado ano
// Algoritmo de Butcher
const calcularDataPascoa = (ano: number): Date => {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
};

// Função para calcular o Carnaval (47 dias antes da Páscoa)
const calcularDataCarnaval = (ano: number): Date => {
  const pascoa = calcularDataPascoa(ano);
  return addDays(pascoa, -47);
};

// Função para calcular a Quarta-feira de Cinzas (46 dias antes da Páscoa)
const calcularQuartaCinzas = (ano: number): Date => {
  const pascoa = calcularDataPascoa(ano);
  return addDays(pascoa, -46);
};

// Função para calcular o Corpus Christi (60 dias após a Páscoa)
const calcularCorpusChristi = (ano: number): Date => {
  const pascoa = calcularDataPascoa(ano);
  return addDays(pascoa, 60);
};

// Função para calcular a Sexta-feira Santa (2 dias antes da Páscoa)
const calcularSextaSanta = (ano: number): Date => {
  const pascoa = calcularDataPascoa(ano);
  return addDays(pascoa, -2);
};

// Lista de feriados nacionais brasileiros (fixos)
const getFeriadosFixos = (ano: number): Date[] => {
  return [
    new Date(ano, 0, 1),    // Confraternização Universal - 1º de Janeiro
    new Date(ano, 0, 25),   // Aniversário da Cidade de São Paulo - 25 de Janeiro
    new Date(ano, 3, 21),   // Tiradentes - 21 de Abril
    new Date(ano, 4, 1),    // Dia do Trabalho - 1º de Maio
    new Date(ano, 6, 9),    // Data Magna do Estado de SP - 9 de Julho
    new Date(ano, 8, 7),    // Independência do Brasil - 7 de Setembro
    new Date(ano, 9, 12),   // Nossa Senhora Aparecida - 12 de Outubro
    new Date(ano, 10, 2),   // Finados - 2 de Novembro
    new Date(ano, 10, 15),  // Proclamação da República - 15 de Novembro
    new Date(ano, 10, 20),  // Dia da Consciência Negra - 20 de Novembro
    new Date(ano, 11, 24),  // Véspera de Natal - 24 de Dezembro
    new Date(ano, 11, 25),  // Natal - 25 de Dezembro
    new Date(ano, 11, 26),  // Recesso Fim de Ano - 26 de Dezembro
    new Date(ano, 11, 27),  // Recesso Fim de Ano - 27 de Dezembro
    new Date(ano, 11, 28),  // Recesso Fim de Ano - 28 de Dezembro
    new Date(ano, 11, 29),  // Recesso Fim de Ano - 29 de Dezembro
    new Date(ano, 11, 30),  // Recesso Fim de Ano - 30 de Dezembro
    new Date(ano, 11, 31),  // Virada de Ano Novo - 31 de Dezembro
  ];
};

// Gerar feriados móveis baseados na data da Páscoa
const getFeriadosMoveis = (ano: number): Date[] => {
  const carnaval = calcularDataCarnaval(ano);
  const carnavalSegundo = addDays(carnaval, 1);      // Segunda de Carnaval
  const quartaCinzas = calcularQuartaCinzas(ano);    // Quarta-feira de Cinzas
  const sextaSanta = calcularSextaSanta(ano);        // Sexta-feira Santa
  const pascoa = calcularDataPascoa(ano);            // Domingo de Páscoa
  const corpusChristi = calcularCorpusChristi(ano);  // Corpus Christi
  const corpusChristiContinuacao = addDays(corpusChristi, 1); // Continuação Corpus Christi
  
  return [
    carnaval, 
    carnavalSegundo,
    quartaCinzas,
    sextaSanta,
    pascoa,
    corpusChristi,
    corpusChristiContinuacao
  ];
};

// Dicionário de nomes de feriados
const nomeFeriados: Record<string, string> = {
  "01-01": "Confraternização Universal",
  "25-01": "Aniversário da Cidade de São Paulo",
  "21-04": "Tiradentes",
  "01-05": "Dia Mundial do Trabalho",
  "09-07": "Feriado estadual (Revolução de 1932)",
  "07-09": "Independência do Brasil",
  "12-10": "Nossa Senhora Aparecida",
  "02-11": "Finados",
  "15-11": "Proclamação da República",
  "20-11": "Dia da Consciência Negra",
  "24-12": "Véspera de Natal",
  "25-12": "Natal",
  "26-12": "Recesso Fim de ano",
  "27-12": "Recesso Fim de ano",
  "28-12": "Recesso Fim de ano",
  "29-12": "Recesso Fim de ano",
  "30-12": "Recesso Fim de ano",
  "31-12": "Virada de Ano Novo",
};

export const AppointmentModal = ({ open, onOpenChange, services, selectedService = "" }: AppointmentModalProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbHolidays, setDbHolidays] = useState<{holiday_date: string, name: string}[]>([]);
  const [feriadosMoveis, setFeriadosMoveis] = useState<Date[]>([]);
  
  // Update selected service when prop changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService, open]);
  
  // Calcular feriados móveis para o ano atual e próximo ano
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    const feriadosAnoAtual = getFeriadosMoveis(currentYear);
    const feriadosProximoAno = getFeriadosMoveis(nextYear);
    
    setFeriadosMoveis([...feriadosAnoAtual, ...feriadosProximoAno]);
  }, []);
  
  // Fetch holidays from Supabase
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const { data, error } = await supabase
          .from('brazilian_holidays')
          .select('holiday_date, name');
        
        if (error) {
          console.error('Error fetching holidays:', error);
          return;
        }
        
        if (data) {
          setDbHolidays(data);
        }
      } catch (error) {
        console.error('Exception fetching holidays:', error);
      }
    };
    
    fetchHolidays();
  }, []);
  
  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Verifica se a data é um feriado móvel
  const isFeriadoMovel = (date: Date): {isHoliday: boolean, holidayName?: string} => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Verificar feriados móveis
    for (const feriado of feriadosMoveis) {
      if (format(feriado, 'yyyy-MM-dd') === dateString) {
        // Determinar o nome do feriado
        const pascoa = calcularDataPascoa(date.getFullYear());
        if (isBefore(date, pascoa)) {
          const diasAntesParscoa = Math.round(
            (pascoa.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (diasAntesParscoa === 47) return { isHoliday: true, holidayName: "Carnaval" };
          if (diasAntesParscoa === 46) return { isHoliday: true, holidayName: "Quarta-feira de Cinzas" };
          if (diasAntesParscoa === 2) return { isHoliday: true, holidayName: "Sexta-feira Santa" };
        } else {
          const diasDepoisPascoa = Math.round(
            (date.getTime() - pascoa.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (diasDepoisPascoa === 0) return { isHoliday: true, holidayName: "Páscoa" };
          if (diasDepoisPascoa === 60) return { isHoliday: true, holidayName: "Corpus Christi" };
          if (diasDepoisPascoa === 61) return { isHoliday: true, holidayName: "Corpus Christi (continuação)" };
        }
        
        return { isHoliday: true, holidayName: "Feriado" };
      }
    }
    
    return { isHoliday: false };
  };
  
  // Identifica o nome do feriado
  const getFeriadoName = (date: Date): string | undefined => {
    // Verifica feriados fixos
    const key = format(date, 'dd-MM');
    if (nomeFeriados[key]) {
      return nomeFeriados[key];
    }
    
    // Verifica feriados móveis
    const feriadoMovel = isFeriadoMovel(date);
    if (feriadoMovel.isHoliday) {
      return feriadoMovel.holidayName;
    }
    
    // Verifica feriados do banco de dados
    const dataFormatada = format(date, 'yyyy-MM-dd');
    const dbHoliday = dbHolidays.find(h => {
      const holidayDate = new Date(h.holiday_date);
      return format(holidayDate, 'yyyy-MM-dd') === dataFormatada;
    });
    
    if (dbHoliday) {
      return dbHoliday.name;
    }
    
    return undefined;
  };
  
  // Verifica se a data deve ser desabilitada (fim de semana, data passada ou feriado)
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetar horas para comparação apenas de datas
    const year = getYear(date);
    
    // Verificar feriados fixos
    const feriadosFixos = getFeriadosFixos(year);
    const isFeriadoFixo = feriadosFixos.some(feriado => 
      date.getDate() === feriado.getDate() && 
      date.getMonth() === feriado.getMonth()
    );
    
    // Verificar feriados móveis
    const feriadoMovel = isFeriadoMovel(date);
    
    // Check DB holidays
    const isDbHoliday = dbHolidays.some(holiday => {
      const holidayDate = new Date(holiday.holiday_date);
      return date.getDate() === holidayDate.getDate() && 
             date.getMonth() === holidayDate.getMonth() && 
             date.getFullYear() === holidayDate.getFullYear();
    });
    
    return (
      isWeekend(date) || // Desabilitar fins de semana (sábado e domingo)
      isBefore(date, today) || // Desabilitar datas passadas
      isFeriadoFixo || // Desabilitar feriados fixos
      feriadoMovel.isHoliday || // Desabilitar feriados móveis
      isDbHoliday // Desabilitar feriados do banco de dados
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast({
        title: "Erro",
        description: "Selecione uma data e horário para o agendamento",
        variant: "destructive"
      });
      return;
    }
    
    // Verificar se é uma data passada usando o fuso horário de São Paulo
    const now = new Date();
    const selectedDate = new Date(date);
    const [hours, minutes] = timeSlot.split(':').map(Number);
    selectedDate.setHours(hours, minutes, 0, 0);
    
    // Convertemos para fuso horário de São Paulo (UTC-3)
    const nowSP = new Date(now.getTime() - (3 * 60 * 60 * 1000));
    const selectedDateSP = new Date(selectedDate.getTime() - (3 * 60 * 60 * 1000));
    
    if (isBefore(selectedDateSP, nowSP)) {
      toast({
        title: "Erro",
        description: "Não é possível agendar para uma data/hora no passado",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          appointment_date: selectedDate.toISOString(),
          status: 'pending'
        })
        .select();
      
      if (error) {
        console.error('Error submitting appointment:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro ao agendar. Por favor, tente novamente.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Agendamento realizado!",
          description: `Sua consultoria foi agendada para ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às ${timeSlot}.`,
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
        setDate(undefined);
        setTimeSlot(null);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Exception submitting appointment:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao agendar. Por favor, tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Componente de renderização de dias personalizados
  const DayContent = (day: Date, modifiers: Record<string, boolean>) => {
    const feriadoName = getFeriadoName(day);
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`w-full h-full flex items-center justify-center ${modifiers.disabled ? 'text-muted-foreground opacity-50' : ''}`}>
              {day.getDate()}
            </div>
          </TooltipTrigger>
          {feriadoName && (
            <TooltipContent>
              <p>{feriadoName}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agendar Consultoria</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para agendar uma consultoria com nossa equipe.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome Completo*
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail*
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefone*
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-1">
                  Serviço de Interesse*
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="" disabled>Selecione um serviço</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensagem (máx. 1000 caracteres)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={1000}
                  rows={4}
                  placeholder="Descreva brevemente o que você precisa"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 caracteres
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Selecione uma data*</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Fins de semana, feriados nacionais e datas no passado não estão disponíveis
                </p>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isDateDisabled}
                  locale={ptBR}
                  components={{
                    DayContent: ({ date, activeModifiers }) => DayContent(date, activeModifiers),
                  }}
                  className="border rounded-md p-3 pointer-events-auto"
                />
              </div>
              
              {date && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Selecione um horário*</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => {
                      const today = new Date();
                      const selectedDate = new Date(date);
                      const [hours, minutes] = time.split(':').map(Number);
                      selectedDate.setHours(hours, minutes, 0, 0);
                      
                      // Desabilitar horários passados para o dia atual convertendo para fuso horário de São Paulo
                      const nowSP = new Date(today.getTime() - (3 * 60 * 60 * 1000));
                      const selectedDateSP = new Date(selectedDate.getTime() - (3 * 60 * 60 * 1000));
                      const isPastTime = isBefore(selectedDateSP, nowSP);
                      
                      return (
                        <Button
                          key={time}
                          type="button"
                          variant={timeSlot === time ? "default" : "outline"}
                          onClick={() => !isPastTime && setTimeSlot(time)}
                          disabled={isPastTime}
                          className={isPastTime ? "opacity-50" : ""}
                        >
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
