import { LinkCard } from "@/components/LinkCard";
import { EventCard } from "@/components/EventCard";
import { MensBreakfastCard } from "@/components/MensBreakfastCard";
import { ChurchServiceCard } from "@/components/ChurchServiceCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import galleryIcon from "@/assets/gallery-icon.png";

import profileImage from "@/assets/profile-image.jpg";
import whatsappIcon from "@/assets/whatsapp-icon.png";
import calendarIcon from "@/assets/calendar-icon.png";
import churchIcon from "@/assets/church-icon.png";
import crossIcon from "@/assets/cross-icon.png";

export default function Index() {
  const [videoOpen, setVideoOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = useCallback(() => {
    setVideoOpen(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setVideoOpen(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, []);

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
            
            <ChurchServiceCard
              title="Visit our Church"
              image={churchIcon}
            />
            <EventCard
              title="Young Adults (18-30)"
              image={calendarIcon}
            />
            <MensBreakfastCard
              title="Men's Breakfast"
              image={crossIcon}
            />
            <Link
              to="/gallery"
              className="flex items-center justify-center gap-4 p-3 w-full bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              <img src={galleryIcon} alt="Gallery" className="w-12 h-12 object-contain rounded-sm" />
              <h3 className="font-semibold text-gray-800 text-lg text-center flex-1">Photo Gallery</h3>
            </Link>

            {/* Video Button */}
            <button
              onClick={handleOpenVideo}
              className="flex items-center gap-4 p-3 w-full bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source src="/videos/community-video.mp4" type="video/mp4" />
                </video>
              </div>
              <h3 className="font-semibold text-gray-800 text-lg text-center flex-1">Watch our Introduction Video</h3>
            </button>
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

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={(open) => { if (!open) handleCloseVideo(); }}>
        <DialogContent className="max-w-[92vw] sm:max-w-lg md:max-w-xl p-0 bg-black border-none rounded-2xl overflow-hidden [&>button]:z-20 [&>button]:bg-black/60 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:text-white [&>button]:hover:bg-black/80 [&>button]:top-3 [&>button]:right-3">
          <div className="relative w-full flex items-center justify-center max-h-[85vh]">
            <video
              ref={modalVideoRef}
              className="w-full max-h-[85vh] object-contain"
              controls
              autoPlay
              playsInline
              onLoadedData={(e) => {
                const video = e.currentTarget;
                video.currentTime = 0;
                video.play().catch(() => {});
              }}
            >
              <source src="/videos/community-video.mp4" type="video/mp4" />
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}