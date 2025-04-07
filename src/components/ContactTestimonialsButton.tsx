
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";
import { TestimonialsModal } from "@/components/Testimonials";

export const ContactTestimonialsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-5 text-base font-medium bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="flex items-center gap-1 flex-wrap justify-center">
          <span className="whitespace-nowrap">Depoimentos</span> 
          <span className="flex ml-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </span>
        </span>
      </Button>
      
      <TestimonialsModal 
        open={isOpen} 
        onOpenChange={setIsOpen} 
      />
    </>
  );
};
