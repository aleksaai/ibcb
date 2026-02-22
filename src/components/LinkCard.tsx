import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkCardProps {
  title: string;
  href?: string;
  image: string;
  showCopy?: boolean;
  copyText?: string;
}

export function LinkCard({ title, href, image, showCopy, copyText }: LinkCardProps) {
  const { toast } = useToast();
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
      toast({
        description: "E-Mail-Adresse in die Zwischenablage kopiert!",
      });
    }
  };

  const content = (
    <div className="flex items-center justify-center gap-4 p-3 w-full relative">
      <img src={image} alt={title} className="w-12 h-12 object-contain rounded-sm" />
      <h3 className="font-semibold text-gray-800 text-lg text-center flex-1">
        {title}
      </h3>
      {showCopy && (
        <button 
          onClick={handleCopy}
          className="absolute right-3 p-2 hover:bg-black/10 rounded-md transition-colors"
        >
          <Copy className="w-4 h-4 text-black" />
        </button>
      )}
    </div>
  );

  if (href) {
    return (
      <Button
        variant="ghost"
        asChild
        className="w-full p-0 h-auto bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300"
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="w-full p-0 h-auto bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-all duration-300"
    >
      {content}
    </Button>
  );
}