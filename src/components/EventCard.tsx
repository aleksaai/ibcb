import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface EventCardProps {
  title: string;
  image: string;
}

const events = [
  {
    name: "Bible Studies",
    time: "Biweekly",
    location: "Location varies"
  },
  {
    name: "Monthly Evening Hangout",
    time: "Every first Friday of the month",
    location: "Location varies"
  }
];

export function EventCard({ title, image }: EventCardProps) {
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
            <h3 className="font-medium text-gray-700 text-base text-center flex-1 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
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
          {events.map((event, index) => (
            <div key={index} className="text-left border-b border-border pb-3 last:border-b-0 last:pb-0">
              <h4 className="font-semibold text-foreground text-sm">{event.name}</h4>
              <p className="text-muted-foreground text-sm">{event.time}</p>
              <p className="text-muted-foreground/70 text-xs">{event.location}</p>
            </div>
          ))}
          <Button 
            className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://chat.whatsapp.com/Lecl488Ugo3JC92JQbRpze?mode=gi_t", "_blank");
            }}
          >
            Get in touch
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
