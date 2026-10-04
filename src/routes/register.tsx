import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — LoanFlow" }] }),
  component: Register,
});

const steps = ["Account", "Personal", "Verification"];

function Register() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  const next = () => (step < 2 ? setStep(step + 1) : (toast.success("Account created!"), nav({ to: "/dashboard" })));

  return (
    <div className="min-h-screen bg-surface">
      <div className="container-pro py-10">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back</Link>
        <div className="mx-auto mt-6 max-w-2xl">
          <div className="mb-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary-grad shadow-glow"><ShieldCheck className="h-6 w-6 text-primary-foreground" /></span>
            <h1 className="mt-4 text-3xl font-semibold">Create your LoanFlow account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Takes about 2 minutes. Your data is encrypted end-to-end.</p>
          </div>

          {/* Stepper */}
          <div className="mb-8 flex items-center gap-3">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-3">
                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
                  {i < steps.length - 1 && <div className={`mt-2 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              </div>
            ))}
          </div>

          <Card className="p-8 shadow-card">
            <form onSubmit={(e) => { e.preventDefault(); next(); }} className="space-y-5">
              {step === 0 && (
                <>
                  <div className="space-y-1.5"><Label>Email</Label><Input type="email" required placeholder="you@company.com" /></div>
                  <div className="space-y-1.5"><Label>Password</Label><Input type="password" required placeholder="At least 8 characters" /></div>
                  <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password" required /></div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><Label>First name</Label><Input required placeholder="Rohan" /></div>
                    <div className="space-y-1.5"><Label>Last name</Label><Input required placeholder="Arora" /></div>
                  </div>
                  <div className="space-y-1.5"><Label>Phone (with country code)</Label><Input required placeholder="+91 98765 43210" /></div>
                  <div className="space-y-1.5"><Label>Date of birth</Label><Input type="date" required /></div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="space-y-1.5"><Label>PAN number</Label><Input required placeholder="ABCDE1234F" /></div>
                  <div className="space-y-1.5"><Label>Aadhaar (last 4 digits)</Label><Input required placeholder="1234" maxLength={4} /></div>
                  <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
                    Drop a soft copy of your PAN here, or click to upload (PDF / JPG, max 5MB)
                  </div>
                </>
              )}
              <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                <Button type="submit" className="shadow-glow">{step === 2 ? "Create account" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </form>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
