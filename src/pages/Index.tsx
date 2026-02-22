import { LinkCard } from "@/components/LinkCard";
import { EventCard } from "@/components/EventCard";
import { ChurchServiceCard } from "@/components/ChurchServiceCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";

import profileImage from "@/assets/profile-image.jpg";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import calendarIcon from "@/assets/calendar-icon.png";
import churchIcon from "@/assets/church-icon.png";

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
            name="Welcome to IBCB!" 
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
              title="Visit our Church"
              image={churchIcon}
            />
            <EventCard
              title="Events & Bible Study"
              image={calendarIcon}
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-4">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <video 
              className="w-full" 
              controls 
              playsInline
              preload="metadata"
            >
              <source src="/videos/community-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Photo Gallery Button */}
        <div className="mb-6">
          <Link
            to="/gallery"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-card/80 backdrop-blur-md border border-border shadow-md hover:shadow-lg transition-shadow text-foreground font-medium"
          >
            <Camera className="w-5 h-5" />
            Photo Gallery
          </Link>
        </div>
          
          {/* Footer Text */}
          <div className="mt-8 px-4">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              We are an international christian community of young adults living in Budapest. We are part of the International Baptist Church of Budapest (IBCB)
            </p>
            

          </div>
        </div>
      </div>
    </div>
  );
}