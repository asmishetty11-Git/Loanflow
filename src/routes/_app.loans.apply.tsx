import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, ArrowLeft, Check, Upload, FileText, BadgeCheck, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_app/loans/apply")({
  head: () => ({ meta: [{ title: "Apply for a loan — LoanFlow" }] }),
  component: Apply,
});

const steps = ["Loan details", "Personal & income", "Documents", "Review"];

function Apply() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(1500000);
  const [tenure, setTenure] = useState(48);
  const [rate] = useState(10.99);
  const [done, setDone] = useState(false);

  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(e);
  }, [amount, tenure, rate]);

  const total = emi * tenure;
  const interest = total - amount;
  const eligibility = Math.min(100, Math.round((1 - amount / 5000000) * 100));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Apply for a loan</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get a personalised offer in under 6 minutes.</p>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary"><Sparkles className="mr-1 h-3 w-3" /> Pre-approved up to ₹6.8L</Badge>
      </div>

      {/* Stepper */}
      <Card className="p-5">
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s} className={`flex items-center gap-3 rounded-lg border p-3 ${i === step ? "border-primary bg-primary/5" : "border-border"}`}>
              <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{i < step ? <Check className="h-4 w-4" /> : i + 1}</div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Step {i + 1}</p>
                <p className="text-sm font-medium">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="p-6">
          {step === 0 && (
            <div className="space-y-7">
              <div>
                <Label>Loan purpose</Label>
                <Select defaultValue="business">
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business expansion</SelectItem>
                    <SelectItem value="home">Home purchase</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Loan amount</Label>
                  <span className="font-mono text-sm">₹{amount.toLocaleString("en-IN")}</span>
                </div>
                <Slider value={[amount]} min={50000} max={5000000} step={50000} onValueChange={(v) => setAmount(v[0])} className="mt-3" />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground"><span>₹50K</span><span>₹50L</span></div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Tenure (months)</Label>
                  <span className="font-mono text-sm">{tenure} mo</span>
                </div>
                <Slider value={[tenure]} min={6} max={84} step={6} onValueChange={(v) => setTenure(v[0])} className="mt-3" />
                <div className="mt-1.5 flex justify-between text-xs text-muted-foreground"><span>6</span><span>84</span></div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-5">
                <p className="text-sm font-medium">Eligibility check</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-card"><div className="h-full bg-primary-grad" style={{ width: `${eligibility}%` }} /></div>
                <p className="mt-2 text-xs text-muted-foreground">{eligibility}% match · Based on credit score 782 and current obligations.</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5"><Label>Full name</Label><Input defaultValue="Rohan Arora" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="rohan.arora@example.com" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
              <div className="space-y-1.5"><Label>PAN</Label><Input defaultValue="ABCDE1234F" /></div>
              <div className="space-y-1.5"><Label>Employment type</Label>
                <Select defaultValue="self"><SelectTrigger className="mt-0"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self-employed</SelectItem>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Monthly income (₹)</Label><Input type="number" defaultValue={285000} /></div>
              <div className="md:col-span-2 space-y-1.5"><Label>Current address</Label><Input defaultValue="42 Brigade Road, Bengaluru 560001" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {[
                "PAN card",
                "Aadhaar card",
                "Last 6 months bank statement",
                "Income proof (ITR / Salary slips)",
              ].map((t) => (
                <div key={t} className="flex items-center gap-4 rounded-xl border border-dashed border-border bg-secondary/30 p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-4 w-4" /></span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">PDF or JPG, max 5MB</p>
                  </div>
                  <Button size="sm" variant="outline"><Upload className="mr-2 h-3.5 w-3.5" /> Upload</Button>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Review & confirm</h3>
              <dl className="grid gap-x-8 gap-y-3 text-sm md:grid-cols-2">
                {[
                  ["Loan purpose", "Business expansion"],
                  ["Amount", `₹${amount.toLocaleString("en-IN")}`],
                  ["Tenure", `${tenure} months`],
                  ["Interest rate", `${rate}% p.a.`],
                  ["Estimated EMI", `₹${emi.toLocaleString("en-IN")}`],
                  ["Total interest", `₹${interest.toLocaleString("en-IN")}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-border py-2">
                    <dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-muted-foreground">By submitting, you agree to LoanFlow's Terms of Use and consent to a soft credit check.</p>
            </div>
          )}

          <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} className="shadow-glow">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
            ) : (
              <Button onClick={() => setDone(true)} className="shadow-glow">Submit application <BadgeCheck className="ml-2 h-4 w-4" /></Button>
            )}
          </div>
        </Card>

        {/* EMI Calculator side */}
        <Card className="h-fit p-6">
          <h3 className="font-semibold">EMI calculator</h3>
          <p className="text-sm text-muted-foreground">Estimated based on your inputs.</p>
          <div className="mt-5 rounded-xl bg-navy-grad p-5 text-navy-foreground">
            <p className="text-xs uppercase tracking-wider opacity-70">Monthly EMI</p>
            <p className="mt-1 text-3xl font-semibold">₹{emi.toLocaleString("en-IN")}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white/10 p-3"><p className="opacity-70">Principal</p><p className="mt-1 font-semibold">₹{amount.toLocaleString("en-IN")}</p></div>
              <div className="rounded-lg bg-white/10 p-3"><p className="opacity-70">Interest</p><p className="mt-1 font-semibold">₹{interest.toLocaleString("en-IN")}</p></div>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {[["Rate", `${rate}% p.a.`], ["Tenure", `${tenure} mo`], ["Total payable", `₹${total.toLocaleString("en-IN")}`], ["Processing fee", "₹2,500"]].map(([k, v]) => (
              <li key={k} className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></li>
            ))}
          </ul>
        </Card>
      </div>

      <Dialog open={done} onOpenChange={setDone}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success"><BadgeCheck className="h-7 w-7" /></div>
            <DialogTitle className="text-center text-2xl">Application submitted</DialogTitle>
            <DialogDescription className="text-center">
              Reference <span className="font-mono">#LF-{Math.floor(Math.random() * 90000) + 10000}</span>. Our underwriter will review and respond within 4 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setDone(false)}>Close</Button>
            <Button>Track application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
