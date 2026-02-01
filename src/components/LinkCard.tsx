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
      <h3 className="font-medium text-black text-base text-center flex-1">
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
        className="w-full p-0 h-auto bg-white/80 backdrop-blur-md border border-white/30 rounded-sm shadow-lg"
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
      className="w-full p-0 h-auto bg-white/80 backdrop-blur-md border border-white/30 rounded-sm shadow-lg"
    >
      {content}
    </Button>
  );
}