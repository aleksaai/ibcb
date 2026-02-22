import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Mail } from "lucide-react";

interface PastorCardProps {
  title: string;
  image: string;
}

export function PastorCard({ title, image }: PastorCardProps) {
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
          {/* Pastor Profile */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white/50 shadow-lg flex-shrink-0">
              <img 
                src="/lovable-uploads/5e65a7fd-7b8b-4656-89e8-96d4ad0b633a.png" 
                alt="Pastor Ed Tarleton" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-foreground text-base">Ed Tarleton</h4>
              <p className="text-muted-foreground text-xs">Senior Pastor at IBCB</p>
              <p className="text-muted-foreground text-xs">Serving since March 2018</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            Pastor Ed has served in ministry for over 40 years across America, Russia, and Europe. He brings extensive experience in leadership development, compassionate listening, and sharing practical advice. Well known for his storytelling, laughter, hospitality, and open heart — he'd love to connect with you.
          </p>

          {/* Social Links */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#25D366] text-white hover:bg-[#25D366]/90 text-xs h-9 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://wa.me/36707754202", "_blank");
              }}
            >
              WhatsApp
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] text-white hover:opacity-90 text-xs h-9 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.instagram.com/iampastor.ed?igsh=eTA0eGFoZXoyZGRt", "_blank");
              }}
            >
              Instagram
            </Button>
            <Button
              className="flex-1 bg-[#3c3c3b] text-white hover:bg-[#3c3c3b]/90 text-xs h-9 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                window.open("mailto:edtarleton2020@gmail.com", "_blank");
              }}
            >
              <Mail className="w-3.5 h-3.5 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
