import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      <DialogContent className="sm:max-w-[400px] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-center text-white drop-shadow-sm">
            Get in Touch
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-white drop-shadow-sm">Full Name *</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 h-10 text-sm rounded-xl"
              required
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-white drop-shadow-sm">Email *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 h-10 text-sm rounded-xl"
              required
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-medium text-white drop-shadow-sm">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 resize-none text-sm rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-medium text-white drop-shadow-sm">
              Is this your first time visiting our church? *
            </Label>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setFirstTime(true)}
                className={`flex-1 h-10 rounded-xl text-sm border transition-all duration-200 ${
                  firstTime === true
                    ? "bg-[#3c3c3b] text-white border-[#3c3c3b]"
                    : "bg-white/20 text-white border-white/40 hover:bg-white/30"
                }`}
              >
                Yes
              </Button>
              <Button
                type="button"
                onClick={() => setFirstTime(false)}
                className={`flex-1 h-10 rounded-xl text-sm border transition-all duration-200 ${
                  firstTime === false
                    ? "bg-[#3c3c3b] text-white border-[#3c3c3b]"
                    : "bg-white/20 text-white border-white/40 hover:bg-white/30"
                }`}
              >
                No
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-[#3c3c3b] text-white hover:bg-[#3c3c3b]/90 rounded-xl text-sm disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
