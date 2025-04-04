
import { useState } from "react"
import { format } from "date-fns"
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
}

export const AppointmentModal = ({ open, onOpenChange, services }: AppointmentModalProps) => {
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
  
  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const isDateDisabled = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Disallow weekends (0 = Sunday, 6 = Saturday)
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
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isDateDisabled}
                  className="border rounded-md p-3"
                />
              </div>
              
              {date && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Selecione um horário*</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={timeSlot === time ? "default" : "outline"}
                        onClick={() => setTimeSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
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
