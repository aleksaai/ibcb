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
    name: "Church Service",
    time: "Sundays 10:30am",
    location: "Budapest, Törökvész út 48/54, 1025"
  },
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
          className="w-full p-0 h-auto bg-white/80 backdrop-blur-md border border-white/30 rounded-sm shadow-lg"
        >
          <div className="flex items-center justify-center gap-4 p-3 w-full relative">
            <img src={image} alt={title} className="w-12 h-12 object-contain rounded-sm" />
            <h3 className="font-medium text-foreground text-base text-center flex-1">
              {title}
            </h3>
            <ChevronDown 
              className={`w-5 h-5 text-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="bg-white/80 backdrop-blur-md border border-white/30 border-t-0 rounded-b-sm shadow-lg p-4 space-y-4">
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
