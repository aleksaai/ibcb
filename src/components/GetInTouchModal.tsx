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
      const { data, error } = await supabase.functions.invoke("church-enquiry", {
        body: { fullName, email, message, firstTime },
      });

      console.log("Edge function response:", { data, error });

      if (error) {
        console.error("Edge function error:", error);
        toast({ description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      if (data?.error) {
        console.error("Edge function returned error:", data.error);
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
      <DialogContent className="max-w-[92vw] sm:max-w-[400px] max-h-[90vh] p-0 bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/15 shadow-2xl rounded-2xl overflow-y-auto [&>button]:z-20 [&>button]:bg-white/20 [&>button]:rounded-full [&>button]:text-white [&>button]:hover:bg-white/30 [&>button]:top-2 [&>button]:right-2">
        {/* Header Image */}
        <div className="w-full h-36 sm:h-44 overflow-hidden relative">
          <img
            src={churchCommunity}
            alt="Our Community"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <h2 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white drop-shadow-lg">
            Get in Touch
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-5 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white/80">Full Name *</Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="bg-white/10 border-white/20 text-white h-10 text-sm rounded-xl placeholder:text-white/35 focus:bg-white/15 focus:border-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white/80">Email *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white h-10 text-sm rounded-xl placeholder:text-white/35 focus:bg-white/15 focus:border-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/80">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={3}
              className="bg-white/10 border-white/20 text-white text-sm rounded-xl placeholder:text-white/35 focus:bg-white/15 focus:border-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-white/80">
              First time visiting? *
            </Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFirstTime(true)}
                className={`flex-1 h-10 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  firstTime === true
                    ? "bg-white text-[#1a1a1a] border-white shadow-md"
                    : "bg-white/10 text-white/70 border-white/20 hover:bg-white/15 hover:text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFirstTime(false)}
                className={`flex-1 h-10 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  firstTime === false
                    ? "bg-white text-[#1a1a1a] border-white shadow-md"
                    : "bg-white/10 text-white/70 border-white/20 hover:bg-white/15 hover:text-white"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-white text-[#1a1a1a] hover:bg-white/90 rounded-xl text-sm font-bold disabled:opacity-50 mt-1 shadow-lg"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
