import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

type Ministry = "mens_breakfast" | "womens_breakfast" | "other";

const MINISTRY_OPTIONS: { value: Ministry; label: string }[] = [
  { value: "mens_breakfast", label: "Men's Breakfast" },
  { value: "womens_breakfast", label: "Women's Breakfast (Connected in Christ)" },
  { value: "other", label: "Other / Future Ministry" },
];

export default function Consent() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ministry, setMinistry] = useState<Ministry>("mens_breakfast");
  const [consentName, setConsentName] = useState(false);
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentPhonePublic, setConsentPhonePublic] = useState(false);
  const [consentPhoneOnRequest, setConsentPhoneOnRequest] = useState(false);
  const [signatureText, setSignatureText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [consentId, setConsentId] = useState<string | null>(null);

  // Pre-fill ministry from ?ministry=... query param
  useEffect(() => {
    const param = searchParams.get("ministry");
    if (param === "mens_breakfast" || param === "womens_breakfast" || param === "other") {
      setMinistry(param);
    }
  }, [searchParams]);

  // Phone-public and Phone-on-request are mutually exclusive
  const handlePhonePublicChange = (checked: boolean) => {
    setConsentPhonePublic(checked);
    if (checked) setConsentPhoneOnRequest(false);
  };
  const handlePhoneOnRequestChange = (checked: boolean) => {
    setConsentPhoneOnRequest(checked);
    if (checked) setConsentPhonePublic(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !signatureText.trim()) {
      toast({ description: "Please fill in name, email, and signature.", variant: "destructive" });
      return;
    }
    if (!consentName && !consentEmail && !consentPhonePublic && !consentPhoneOnRequest) {
      toast({
        description: "Please select at least one consent option.",
        variant: "destructive",
      });
      return;
    }
    if ((consentPhonePublic || consentPhoneOnRequest) && !phone.trim()) {
      toast({
        description: "You selected a phone option — please enter a phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("ibcb-consent-submission", {
        body: {
          fullName,
          email,
          phone: phone.trim() || undefined,
          ministry,
          consentName,
          consentEmail,
          consentPhonePublic,
          consentPhoneOnRequest,
          signatureText,
        },
      });

      if (error || data?.error) {
        console.error("Submission error:", error || data);
        toast({
          description: `Error: ${data?.error || error?.message || "Unknown"}`,
          variant: "destructive",
        });
        return;
      }

      setConsentId(data?.consentId ?? null);
      setSubmitted(true);
      toast({ description: "Consent recorded — check your inbox for a copy." });
    } catch (err) {
      console.error("Submit failed:", err);
      toast({ description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl scale-110 opacity-30"
          style={{ backgroundImage: `url(${profileImage})` }}
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
        <div className="relative z-10 py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] p-6 text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-14 h-14 text-green-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Thank you!</h1>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your consent has been recorded. We've sent a copy to your email for your records —
                it includes your withdrawal rights.
              </p>
              {consentId && (
                <p className="text-[11px] text-gray-500 font-mono break-all">Ref: {consentId}</p>
              )}
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-block text-sm font-medium text-gray-800 underline underline-offset-4"
                >
                  Back to IBCB Linktree →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-3xl scale-110 opacity-30"
        style={{ backgroundImage: `url(${profileImage})` }}
      />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />

      <div className="relative z-10 py-8">
        <div className="max-w-md mx-auto px-4">
          {/* Header card */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] p-5 mb-4">
            <p className="text-[11px] uppercase tracking-wider text-gray-600 font-semibold mb-2">
              IBCB · Contact Consent
            </p>
            <h1 className="text-xl font-bold text-gray-800 leading-snug">
              Consent to be listed as a ministry contact
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed mt-3">
              This form records your consent (under GDPR Art. 6(1)(a)) to have selected contact
              details shown on the public IBCB Linktree page, so newcomers interested in your
              ministry can reach you.
            </p>
          </div>

          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/15 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] p-5 space-y-4"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-800">Full Name *</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="First and last name"
                  className="bg-white/60 border-white/40 text-gray-900 h-10 text-sm rounded-xl placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-800">Email *</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/60 border-white/40 text-gray-900 h-10 text-sm rounded-xl placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-gray-800">Phone (optional)</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+36 …"
                  className="bg-white/60 border-white/40 text-gray-900 h-10 text-sm rounded-xl placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Ministry */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-gray-800">Your ministry / group *</Label>
              <div className="grid grid-cols-1 gap-2">
                {MINISTRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMinistry(opt.value)}
                    className={`h-11 rounded-xl text-sm font-medium border text-left px-4 transition-all duration-200 ${
                      ministry === opt.value
                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                        : "bg-white/50 text-gray-800 border-white/40 hover:bg-white/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Consent checkboxes */}
            <div className="space-y-3 pt-2 border-t border-white/40">
              <Label className="text-xs font-medium text-gray-800">
                What do you consent to publish? *
              </Label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={consentName}
                  onCheckedChange={(c) => setConsentName(!!c)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-800 leading-snug">
                  <strong>My name</strong> — publicly visible next to the ministry listing.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={consentEmail}
                  onCheckedChange={(c) => setConsentEmail(!!c)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-800 leading-snug">
                  <strong>My email address</strong> — publicly listed as contact.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={consentPhonePublic}
                  onCheckedChange={(c) => handlePhonePublicChange(!!c)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-800 leading-snug">
                  <strong>My phone number</strong> — publicly listed as contact.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={consentPhoneOnRequest}
                  onCheckedChange={(c) => handlePhoneOnRequestChange(!!c)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-800 leading-snug">
                  <strong>Phone number on request only</strong> — shared privately with interested
                  people after they first contact me by email (not publicly listed).
                </span>
              </label>
            </div>

            {/* Signature */}
            <div className="space-y-1.5 pt-2 border-t border-white/40">
              <Label className="text-xs font-medium text-gray-800">
                Digital signature — type your full name *
              </Label>
              <Input
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                placeholder="Type your name to sign"
                className="bg-white/60 border-white/40 text-gray-900 h-10 text-sm rounded-xl placeholder:text-gray-500 font-serif italic"
                required
              />
              <p className="text-[11px] text-gray-600 leading-relaxed">
                By typing your name and clicking submit, you give a clear affirmative consent under
                GDPR Art. 4(11). You can withdraw this consent at any time by emailing{" "}
                <a
                  href="mailto:info@aleksa.ai"
                  className="underline underline-offset-2 text-gray-800"
                >
                  info@aleksa.ai
                </a>
                .
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-gray-900 text-white hover:bg-gray-800 rounded-xl text-sm font-bold disabled:opacity-50 shadow-lg"
            >
              {isSubmitting ? "Submitting..." : "Give consent"}
            </Button>
          </form>

          <p className="text-center text-[11px] text-gray-600 mt-6">
            IBCB · International Baptist Church of Budapest ·{" "}
            <Link to="/" className="underline underline-offset-2">
              Back to Linktree
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
