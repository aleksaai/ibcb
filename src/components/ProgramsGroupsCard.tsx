import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GetInTouchModal } from "./GetInTouchModal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import mensBreakfastImage from "@/assets/mens-breakfast.png";

interface ProgramsGroupsCardProps {
  title: string;
  image: string;
}

export function ProgramsGroupsCard({ title, image }: ProgramsGroupsCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

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
        <div className="bg-white/15 backdrop-blur-xl border border-white/40 border-t-0 rounded-b-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] p-3 space-y-2">
          
          {/* Young Adults Sub-section */}
          <Collapsible open={activeSection === "young-adults"} onOpenChange={() => toggleSection("young-adults")}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                <span className="font-semibold text-foreground text-sm">Young Adults (18–30)</span>
                <ChevronDown className={`w-4 h-4 text-foreground transition-transform duration-300 ${activeSection === "young-adults" ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="p-3 space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground text-xs mb-2">Join our Community</h4>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs h-8"
                      onClick={(e) => { e.stopPropagation(); window.open("https://chat.whatsapp.com/Lecl488Ugo3JC92JQbRpze?mode=gi_t", "_blank"); }}
                    >
                      WhatsApp Group
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-xs h-8"
                      onClick={(e) => { e.stopPropagation(); window.open("https://www.instagram.com/ibcb_circle", "_blank"); }}
                    >
                      Instagram
                    </Button>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-2 space-y-2">
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-xs">Bible Studies</h4>
                    <p className="text-muted-foreground text-xs">Every 2nd Saturday, 15:00–17:00</p>
                    <p className="text-muted-foreground/70 text-[11px]">Location varies — for more information, get in touch below!</p>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-xs">Monthly Evening Hangout</h4>
                    <p className="text-muted-foreground text-xs">Every first Friday of the month</p>
                    <p className="text-muted-foreground/70 text-[11px]">Location varies — for more information, get in touch below!</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Men's Breakfast Sub-section */}
          <Collapsible open={activeSection === "mens-breakfast"} onOpenChange={() => toggleSection("mens-breakfast")}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                <span className="font-semibold text-foreground text-sm">Men's Breakfast</span>
                <ChevronDown className={`w-4 h-4 text-foreground transition-transform duration-300 ${activeSection === "mens-breakfast" ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="p-3 space-y-3">
                <div className="w-full rounded-lg overflow-hidden">
                  <img src={mensBreakfastImage} alt="Men's Breakfast" className="w-full h-36 object-cover rounded-lg" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground text-xs">Once monthly at 9:00am</h4>
                  <p className="text-muted-foreground text-xs">Lipóti Bakery, Budapest, 13 Frankel Leó út</p>
                </div>
                <div className="w-full h-36 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2694.5!2d19.0367!3d47.5233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741d94f0e8b0001%3A0x1!2sFrankel+Le%C3%B3+%C3%BAt+13%2C+Budapest%2C+1023!5e0!3m2!1sen!2shu!4v1699000000000!5m2!1sen!2shu"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Lipóti Bakery Location"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Women's Breakfast Sub-section */}
          <Collapsible open={activeSection === "womens-breakfast"} onOpenChange={() => toggleSection("womens-breakfast")}>
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200">
                <span className="font-semibold text-foreground text-sm">Women's Breakfast</span>
                <ChevronDown className={`w-4 h-4 text-foreground transition-transform duration-300 ${activeSection === "womens-breakfast" ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="p-3 space-y-3">
                <div className="text-left space-y-1">
                  <h4 className="font-semibold text-foreground text-xs">Once monthly at 9:30am</h4>
                  <p className="text-muted-foreground text-xs">KMK Building (Montázs Art Café)</p>
                  <p className="text-muted-foreground text-xs">Budapest, Etele út 55, 1119</p>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Join us for a morning of fellowship, friendship, a devotional from the Word of God, worship songs, testimony and prayer. Breakfast is provided — contributions are welcome! 🙏
                </p>
                <div className="w-full h-36 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.0!2d19.0456!3d47.4733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741ddbc5e4f8f01%3A0x1!2sEtele+%C3%BAt+55%2C+Budapest%2C+1119!5e0!3m2!1sen!2shu!4v1699000000000!5m2!1sen!2shu"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="KMK Building Location"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Shared Get in Touch button */}
          <Button 
            className="w-full bg-[#3c3c3b] text-white hover:bg-[#3c3c3b]/90 rounded-xl"
            onClick={(e) => { e.stopPropagation(); setContactOpen(true); }}
          >
            Get in touch
          </Button>
          <GetInTouchModal open={contactOpen} onOpenChange={setContactOpen} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
