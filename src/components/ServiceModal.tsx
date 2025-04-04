
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export interface ServiceDetailProps {
  title: string
  icon: any
  description: string
  features: string[]
  priceRange: string
  detailedDescription: string
}

interface ServiceModalProps {
  service: ServiceDetailProps
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ServiceModal = ({ service, open, onOpenChange }: ServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[90vw] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <service.icon className="h-6 w-6 text-i9-blue" />
            <span>{service.title}</span>
          </DialogTitle>
          <DialogDescription>
            Detalhes completos sobre este serviço
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Descrição</h3>
            <p className="text-muted-foreground">{service.detailedDescription}</p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Faixa de Preço</h3>
              <div className="bg-i9-blue/10 dark:bg-i9-blue/20 rounded-lg p-4">
                <p className="text-lg font-medium text-i9-blue">{service.priceRange}</p>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full btn-primary">Solicitar Proposta</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Recursos Inclusos</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
