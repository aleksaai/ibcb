import { LinkCard } from "@/components/LinkCard";
import { EventCard } from "@/components/EventCard";
import { ChurchServiceCard } from "@/components/ChurchServiceCard";
import { ProfileHeader } from "@/components/ProfileHeader";

import profileImage from "@/assets/profile-image.jpg";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import calendarIcon from "@/assets/calendar-icon.png";

export default function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurry background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-3xl scale-110 opacity-30"
        style={{ backgroundImage: `url(${profileImage})` }}
      />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
      
      <div className="relative z-10 py-8">
        <div className="max-w-sm mx-auto px-4">
          <ProfileHeader 
            name="IBCB Circle" 
            avatar={profileImage}
          />
        
        {/* Services Section */}
        <div className="mb-6">
          <div className="space-y-4">
            <LinkCard
              title="Join our Whatsapp Group"
              image={whatsappIcon}
              href="https://chat.whatsapp.com/Lecl488Ugo3JC92JQbRpze?mode=gi_t"
            />
            <ChurchServiceCard
              title="Church Service Information"
              image={calendarIcon}
            />
            <EventCard
              title="Event and Service Information"
              image={calendarIcon}
            />
          </div>
        </div>
          
          {/* Footer Text */}
          <div className="mt-8 px-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              We are an international christian community of young adults living in Budapest. We are part of the International Baptist Church of Budapest (IBCB)
            </p>
            
            {/* Legal Links */}
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <a 
                href="https://aleksa.ai/agbs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline"
              >
                AGBs
              </a>
              <span className="text-muted-foreground/50">|</span>
              <a 
                href="https://aleksa.ai/impressum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline"
              >
                Impressum
              </a>
              <span className="text-muted-foreground/50">|</span>
              <a 
                href="https://aleksa.ai/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline"
              >
                Datenschutz
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}