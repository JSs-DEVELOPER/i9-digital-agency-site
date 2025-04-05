
import { useState, useEffect } from "react"
import { format, isWeekend, isBefore, isAfter } from "date-fns"
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
import { useToast } from "@/hooks/use-toast"

interface AppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  services: { title: string }[]
  selectedService?: string
}

// Lista de feriados nacionais brasileiros (fixos e móveis para 2024/2025)
const brazilianHolidays = [
  new Date(2024, 0, 1),   // Ano Novo - 1º de Janeiro
  new Date(2024, 1, 12),  // Carnaval 2024 - 12 de Fevereiro
  new Date(2024, 1, 13),  // Carnaval 2024 - 13 de Fevereiro
  new Date(2024, 2, 29),  // Sexta-feira Santa 2024 - 29 de Março
  new Date(2024, 2, 31),  // Páscoa 2024 - 31 de Março
  new Date(2024, 3, 21),  // Tiradentes - 21 de Abril
  new Date(2024, 4, 1),   // Dia do Trabalho - 1º de Maio
  new Date(2024, 4, 30),  // Corpus Christi 2024 - 30 de Maio
  new Date(2024, 8, 7),   // Independência do Brasil - 7 de Setembro
  new Date(2024, 9, 12),  // Nossa Senhora Aparecida - 12 de Outubro
  new Date(2024, 10, 2),  // Finados - 2 de Novembro
  new Date(2024, 10, 15), // Proclamação da República - 15 de Novembro
  new Date(2024, 11, 25), // Natal - 25 de Dezembro
  
  // 2025
  new Date(2025, 0, 1),   // Ano Novo - 1º de Janeiro
  new Date(2025, 2, 3),   // Carnaval 2025 - 3 de Março
  new Date(2025, 2, 4),   // Carnaval 2025 - 4 de Março
  new Date(2025, 3, 18),  // Sexta-feira Santa 2025 - 18 de Abril
  new Date(2025, 3, 20),  // Páscoa 2025 - 20 de Abril
  new Date(2025, 3, 21),  // Tiradentes - 21 de Abril
  new Date(2025, 4, 1),   // Dia do Trabalho - 1º de Maio
  new Date(2025, 5, 19),  // Corpus Christi 2025 - 19 de Junho
  new Date(2025, 8, 7),   // Independência do Brasil - 7 de Setembro
  new Date(2025, 9, 12),  // Nossa Senhora Aparecida - 12 de Outubro
  new Date(2025, 10, 2),  // Finados - 2 de Novembro
  new Date(2025, 10, 15), // Proclamação da República - 15 de Novembro
  new Date(2025, 11, 25), // Natal - 25 de Dezembro
];

// Função para verificar se uma data é feriado
const isHoliday = (date: Date): boolean => {
  return brazilianHolidays.some(holiday => 
    date.getDate() === holiday.getDate() && 
    date.getMonth() === holiday.getMonth() && 
    date.getFullYear() === holiday.getFullYear()
  );
}

export const AppointmentModal = ({ open, onOpenChange, services, selectedService = "" }: AppointmentModalProps) => {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  })
  
  // Update selected service when prop changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }))
    }
  }, [selectedService, open])
  
  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Verifica se a data deve ser desabilitada (fim de semana, data passada ou feriado)
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetar horas para comparação apenas de datas
    
    return (
      isWeekend(date) || // Desabilitar fins de semana (sábado e domingo)
      isBefore(date, today) || // Desabilitar datas passadas
      isHoliday(date) // Desabilitar feriados
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!date || !timeSlot) {
      toast({
        title: "Erro",
        description: "Selecione uma data e horário para o agendamento",
        variant: "destructive"
      })
      return
    }
    
    // Verificar se é uma data passada
    const now = new Date();
    const selectedDate = new Date(date);
    const [hours, minutes] = timeSlot.split(':').map(Number);
    selectedDate.setHours(hours, minutes, 0, 0);
    
    if (isBefore(selectedDate, now)) {
      toast({
        title: "Erro",
        description: "Não é possível agendar para uma data/hora no passado",
        variant: "destructive"
      })
      return
    }
    
    // Here you would actually check for duplicate appointments in a real backend
    // For now we'll just simulate a successful submission
    toast({
      title: "Agendamento realizado!",
      description: `Sua consultoria foi agendada para ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às ${timeSlot}.`,
    })
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    })
    setDate(undefined)
    setTimeSlot(null)
    onOpenChange(false)
  }
  
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
                      
                      // Desabilitar horários passados para o dia atual
                      const isPastTime = isBefore(selectedDate, today);
                      
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
          
          <Button type="submit" className="btn-primary w-full">
            Confirmar Agendamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
