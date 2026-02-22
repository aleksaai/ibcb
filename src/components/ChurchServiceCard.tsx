import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ChurchServiceCardProps {
  title: string;
  image: string;
}

export function ChurchServiceCard({ title, image }: ChurchServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full p-0 h-auto bg-white/15 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300 ${
            isOpen ? 'rounded-t-2xl rounded-b-none' : 'rounded-2xl'
          }`}
        >
          <div className="flex items-center justify-center gap-4 p-3 w-full relative">
            <img src={image} alt={title} className="w-12 h-12 object-contain rounded-sm" />
            <h3 className="font-semibold text-gray-800 text-lg text-center flex-1">
              {title}
            </h3>
            <ChevronDown 
              className={`w-5 h-5 text-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="bg-white/15 backdrop-blur-xl border border-white/40 border-t-0 rounded-b-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] p-4 space-y-4">
          <div className="text-left">
            <h4 className="font-semibold text-foreground text-sm">Sundays 10:30am</h4>
            <p className="text-muted-foreground text-sm">Budapest, Törökvész út 48/54, 1025</p>
          </div>
          
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.5!2d19.0167!3d47.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d94d8a8b2b2b%3A0x0!2zVMO2csO2a3bDqXN6IMO6dCA0OC81NCwgQnVkYXBlc3QsIDEwMjU!5e0!3m2!1sen!2shu!4v1699000000000!5m2!1sen!2shu"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Church Location"
            />
          </div>
          
          <Button 
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://ibcbudapest.org/", "_blank");
            }}
          >
            Visit our Website
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
