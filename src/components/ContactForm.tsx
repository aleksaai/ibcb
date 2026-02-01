import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LinkCard } from "./LinkCard";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  title: string;
  image: string;
}

export function ContactForm({ title, image }: ContactFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('contact-submission', {
        body: data
      });

      if (error) {
        console.error('Error submitting form:', error);
        toast({
          description: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.",
          variant: "destructive"
        });
        return;
      }

      toast({
        description: "Nachricht erfolgreich gesendet!",
      });
      
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        description: "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <LinkCard title={title} image={image} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-center text-white drop-shadow-sm">
            Kontakt aufnehmen
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-xs font-medium text-white drop-shadow-sm">
                Vollständiger Name *
              </Label>
              <Input
                id="fullName"
                {...register("fullName", { required: "Vollständiger Name ist erforderlich" })}
                placeholder=""
                className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 transition-all duration-300 h-10 text-sm rounded-xl"
              />
              {errors.fullName && (
                <span className="text-xs text-red-600 font-medium">{errors.fullName.message}</span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-medium text-white drop-shadow-sm">
                E-Mail *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { 
                  required: "E-Mail Adresse ist erforderlich",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ungültige E-Mail Adresse"
                  }
                })}
                placeholder=""
                className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 transition-all duration-300 h-10 text-sm rounded-xl"
              />
              {errors.email && (
                <span className="text-xs text-red-600 font-medium">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs font-medium text-white drop-shadow-sm">
              Telefonnummer *
            </Label>
            <Input
              id="phone"
              {...register("phone", { required: "Telefonnummer ist erforderlich" })}
              placeholder=""
              className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 transition-all duration-300 h-10 text-sm rounded-xl"
            />
            {errors.phone && (
              <span className="text-xs text-red-600 font-medium">{errors.phone.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="subject" className="text-xs font-medium text-white drop-shadow-sm">
              Worum geht es? *
            </Label>
            <Select onValueChange={(value) => setValue("subject", value)} required>
              <SelectTrigger className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 transition-all duration-300 h-10 text-sm rounded-xl text-white">
                <SelectValue placeholder="Thema wählen" className="text-white" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 backdrop-blur-2xl border-white/30 rounded-xl">
                <SelectItem value="ki-dienstleistung" className="hover:bg-white/20 rounded-lg text-sm text-white">
                  KI-Dienstleistung
                </SelectItem>
                <SelectItem value="coaching" className="hover:bg-white/20 rounded-lg text-sm text-white">
                  Coaching
                </SelectItem>
                <SelectItem value="kooperation" className="hover:bg-white/20 rounded-lg text-sm text-white">
                  Kooperationsanfrage
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && (
              <span className="text-xs text-red-600 font-medium">Bitte wählen Sie ein Thema aus</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="message" className="text-xs font-medium text-white drop-shadow-sm">
              Nachricht
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder=""
              rows={3}
              className="bg-white/20 border-white/40 backdrop-blur-sm focus:bg-white/30 focus:border-white/60 transition-all duration-300 resize-none text-sm rounded-xl"
            />
          </div>

          <div className="bg-white/15 backdrop-blur-sm p-3 rounded-xl border border-white/30">
            <p className="text-xs text-white drop-shadow-sm text-center">
              Oder direkt ein{" "}
              <a 
                href="https://cal.com/aleksa-ai/erstgesprach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:underline transition-colors duration-200 drop-shadow-sm"
              >
                Erstgespräch buchen
              </a>
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="flex-1 h-10 bg-white/20 border-white/50 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 text-sm rounded-xl text-white"
            >
              Abbrechen
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-10 bg-white/20 border-white/50 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 text-sm rounded-xl text-white border disabled:opacity-50"
            >
              {isSubmitting ? "Wird gesendet..." : "Senden"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}