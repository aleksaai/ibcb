import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import churchCommunity from "@/assets/church-community.jpg";

interface GetInTouchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetInTouchModal({ open, onOpenChange }: GetInTouchModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstTime, setFirstTime] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || firstTime === null) {
      toast({ description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("church-enquiry", {
        body: { fullName, email, message, firstTime },
      });

      if (error) {
        toast({ description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      toast({ description: "Message sent successfully!" });
      setFullName("");
      setEmail("");
      setMessage("");
      setFirstTime(null);
      onOpenChange(false);
    } catch {
      toast({ description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[92vw] sm:max-w-[400px] p-0 bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl overflow-hidden [&>button]:z-20 [&>button]:bg-black/40 [&>button]:rounded-full [&>button]:text-white [&>button]:hover:bg-black/60 [&>button]:top-2 [&>button]:right-2">
        {/* Header Image */}
        <div className="w-full h-36 sm:h-44 overflow-hidden relative">
          <img
            src={churchCommunity}
            alt="Our Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <h2 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white drop-shadow-lg">
            Get in Touch
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-4 pt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-white/90 drop-shadow-sm">Full Name *</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 focus:border-white/50 h-9 text-sm rounded-xl placeholder:text-white/40"
                required
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-white/90 drop-shadow-sm">Email *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 focus:border-white/50 h-9 text-sm rounded-xl placeholder:text-white/40"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-white/90 drop-shadow-sm">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={2}
              className="bg-white/20 border-white/30 backdrop-blur-sm focus:bg-white/30 focus:border-white/50 resize-none text-sm rounded-xl placeholder:text-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[11px] font-medium text-white/90 drop-shadow-sm">
              First time visiting? *
            </Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFirstTime(true)}
                className={`flex-1 h-9 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  firstTime === true
                    ? "bg-[#3c3c3b] text-white border-[#3c3c3b] shadow-md"
                    : "bg-white/15 text-white/80 border-white/30 hover:bg-white/25"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFirstTime(false)}
                className={`flex-1 h-9 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  firstTime === false
                    ? "bg-[#3c3c3b] text-white border-[#3c3c3b] shadow-md"
                    : "bg-white/15 text-white/80 border-white/30 hover:bg-white/25"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-[#3c3c3b] text-white hover:bg-[#3c3c3b]/90 rounded-xl text-sm font-semibold disabled:opacity-50 mt-1"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
