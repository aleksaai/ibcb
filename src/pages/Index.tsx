import { LinkCard } from "@/components/LinkCard";

import { ProfileHeader } from "@/components/ProfileHeader";
import { Play } from "lucide-react";
import profileImage from "@/assets/profile-image.png";
import kiAgenturImage from "@/assets/ki-agentur.png";
import kiBusinessImage from "@/assets/ki-business.png";
import herzenssacheImage from "@/assets/herzenssache.png";

import emailImage from "@/assets/email.png";
import youtubeThumbnail from "@/assets/youtube-thumbnail.png";
import secondVideoThumbnail from "@/assets/second-video-thumbnail.png";

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
            title="Strategic Business Consulting"
            description="25 | #1 KI-Champ | Budapest"
            avatar={profileImage}
          />
        
        {/* Services Section */}
        <div className="mb-6">
          <div className="space-y-4">
            <LinkCard
              title="Meine KI-Agentur"
              image={kiAgenturImage}
              href="https://aleksa.ai"
            />
            
            <LinkCard
              title="Starte dein KI Business"
              image={kiBusinessImage}
              href="https://ki-hochschule.de/"
            />
            
            <LinkCard
              title="Meine Herzenssache"
              image={herzenssacheImage}
              href="https://kimakuya.com/"
            />
            
            {/* YouTube Video Thumbnail */}
            <a 
              href="https://youtu.be/la-sT8PCR3I?si=BIPSvyUTaj-Xxfvb"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white/80 backdrop-blur-md border border-white/30 rounded-sm shadow-lg overflow-hidden relative group"
            >
              <img 
                src={youtubeThumbnail} 
                alt="Neuestes YouTube Video" 
                className="w-full h-auto object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-black fill-black" />
                </div>
              </div>
            </a>
            
            {/* Second Video Thumbnail */}
            <a 
              href="https://youtu.be/c6vyT_qmmPw?si=LUds13r_f2gP2ivM"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white/80 backdrop-blur-md border border-white/30 rounded-sm shadow-lg overflow-hidden relative group"
            >
              <img 
                src={secondVideoThumbnail} 
                alt="Zweites Video" 
                className="w-full h-auto object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-black fill-black" />
                </div>
              </div>
            </a>
            
            <LinkCard
              title="E-Mail"
              image={emailImage}
              showCopy={true}
              copyText="info@aleksa.ai"
            />
          </div>
          </div>
          
          {/* Footer Text */}
          <div className="mt-8 px-4">
            <p className="text-xs text-gray-800 text-center leading-relaxed">
              Die DestinyMedia GmbH, Pengoro UG, Voico AI GmbH, MediKI OG & Spalevic Consulting Kft. sind auch Beteiligungen der<br />
              Spalevic & Partner Holding Kft.
            </p>
            
            {/* Legal Links */}
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <a 
                href="https://aleksa.ai/agbs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 underline"
              >
                AGBs
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="https://aleksa.ai/impressum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Impressum
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="https://aleksa.ai/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Datenschutz
              </a>
            </div>

            {/* Logo */}
            <div className="mt-4 flex justify-center">
              <img 
                src="https://i.postimg.cc/Dy4Z1xbM/ki-crew-7.png" 
                alt="KI Crew Logo" 
                className="h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}