import { LinkCard } from "@/components/LinkCard";
import { EventCard } from "@/components/EventCard";
import { ChurchServiceCard } from "@/components/ChurchServiceCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Link } from "react-router-dom";
import galleryIcon from "@/assets/gallery-icon.png";

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
            <Link
              to="/gallery"
              className="flex items-center justify-center gap-4 p-3 w-full bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              <img src={galleryIcon} alt="Gallery" className="w-12 h-12 object-contain rounded-sm" />
              <h3 className="font-semibold text-gray-800 text-lg text-center flex-1">Photo Gallery</h3>
            </Link>
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