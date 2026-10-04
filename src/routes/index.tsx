import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, ShieldCheck, Zap, BadgeCheck, TrendingUp, Lock, Sparkles,
  Building2, Briefcase, GraduationCap, Home, Car, Star, Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoanFlow — Modern Credit Management Platform" },
      { name: "description", content: "Apply, track and manage loans in minutes. Trusted by 40,000+ borrowers and 200+ enterprises across India." },
      { property: "og:title", content: "LoanFlow — Credit Management Platform" },
      { property: "og:description", content: "A premium fintech platform to manage personal, business and home loans end-to-end." },
    ],
  }),
  component: Landing,
});

const partners = ["NORTHWIND", "ACME CAPITAL", "MERIDIAN", "TATA TRUST", "FINEDGE", "ZENITH BANK"];
const stats = [
  { v: "₹12,400 Cr", l: "Loans disbursed" },
  { v: "40,000+", l: "Active borrowers" },
  { v: "98.4%", l: "Approval accuracy" },
  { v: "< 6 min", l: "Avg. application time" },
];
const features = [
  { i: Zap, t: "Instant pre-approval", d: "AI-driven eligibility check across 30+ lenders in under 60 seconds." },
  { i: ShieldCheck, t: "Bank-grade security", d: "ISO 27001 + SOC 2 compliant. End-to-end encryption on every request." },
  { i: TrendingUp, t: "Smart EMI planning", d: "Forecasts cash-flow impact before you commit to a repayment schedule." },
  { i: BadgeCheck, t: "Verified lenders only", d: "Curated marketplace of 28 RBI-licensed NBFCs and scheduled banks." },
  { i: Lock, t: "Privacy by default", d: "Data minimisation, granular consent, and one-click revocation." },
  { i: Sparkles, t: "White-glove support", d: "Dedicated relationship manager for every premium customer." },
];
const services = [
  { i: Briefcase, t: "Business Loan", r: "10.99%", a: "Up to ₹2 Cr" },
  { i: Home, t: "Home Loan", r: "8.45%", a: "Up to ₹5 Cr" },
  { i: Car, t: "Vehicle Loan", r: "9.25%", a: "Up to ₹50 L" },
  { i: GraduationCap, t: "Education Loan", r: "9.75%", a: "Up to ₹40 L" },
  { i: Building2, t: "LAP", r: "9.10%", a: "Up to ₹10 Cr" },
  { i: Sparkles, t: "Personal Loan", r: "10.49%", a: "Up to ₹40 L" },
];
const testimonials = [
  { n: "Aditi Sharma", r: "Founder, Linea Studio", q: "Got working capital approved in 11 minutes. The dashboard makes EMI planning effortless." },
  { n: "Kabir Mehta", r: "CFO, Northwind Logistics", q: "We replaced three vendors with LoanFlow. Underwriting transparency is best-in-class." },
  { n: "Priya Iyer", r: "Homeowner, Bengaluru", q: "Refinanced my home loan and saved ₹4.2L in interest. The advisor walked me through every step." },
];

function Landing() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="container-pro grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="fade-up space-y-7">
            <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" /> New · AI-powered eligibility engine
            </Badge>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Credit, simplified for the
              <span className="block bg-gradient-to-r from-primary to-navy bg-clip-text text-transparent">modern borrower.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              LoanFlow brings every loan, every lender and every payment into one calm, secure workspace —
              so you can focus on growth, not paperwork.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/loans/apply"><Button size="lg" className="shadow-glow">Apply for a loan <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/dashboard"><Button size="lg" variant="outline">View dashboard demo</Button></Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-success" /> No hidden fees</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-success" /> Soft credit check</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-success" /> Approval in minutes</span>
            </div>
          </div>

          {/* Hero card mock */}
          <div className="fade-up relative">
            <div className="float-slow absolute -left-6 top-10 hidden rounded-2xl border border-border bg-card p-4 shadow-card md:block">
              <p className="text-xs text-muted-foreground">Credit score</p>
              <p className="text-3xl font-semibold text-success">782</p>
              <p className="text-xs text-success">+24 this month</p>
            </div>
            <Card className="rounded-2xl border-border/60 bg-card/90 p-6 shadow-card backdrop-blur">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Active loan</p>
                  <p className="text-lg font-semibold">Business expansion · #LF-44219</p>
                </div>
                <Badge className="bg-success/15 text-success hover:bg-success/15">On track</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 py-5">
                <div><p className="text-xs text-muted-foreground">Outstanding</p><p className="text-xl font-semibold">₹18.4L</p></div>
                <div><p className="text-xs text-muted-foreground">Next EMI</p><p className="text-xl font-semibold">₹42,180</p></div>
                <div><p className="text-xs text-muted-foreground">Tenure left</p><p className="text-xl font-semibold">38 mo</p></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Repayment progress</span><span>46%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[46%] rounded-full bg-primary-grad" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">Pay EMI</Button>
                <Button size="sm">View statement</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="border-y border-border bg-card">
        <div className="container-pro py-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by 200+ teams and lenders
          </p>
          <div className="mt-6 grid grid-cols-2 items-center gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {partners.map((p) => (
              <div key={p} className="text-center text-sm font-semibold tracking-widest text-muted-foreground">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-pro grid grid-cols-2 gap-6 py-16 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <p className="text-3xl font-semibold tracking-tight">{s.v}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="bg-surface py-20">
        <div className="container-pro">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="border-primary/30 text-primary">Why LoanFlow</Badge>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Built for clarity. Engineered for trust.</h2>
            <p className="mt-3 text-muted-foreground">Everything a modern borrower needs — none of the noise that used to come with banking software.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.t} className="group border-border/60 p-6 transition hover:-translate-y-0.5 hover:shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.i className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-pro py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="border-primary/30 text-primary">Loan products</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">A loan for every chapter of life</h2>
          </div>
          <Link to="/loans/apply" className="text-sm font-medium text-primary hover:underline">Compare all products →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.t} className="border-border/60 p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy/5 text-navy">
                  <s.i className="h-5 w-5" />
                </span>
                <Badge variant="secondary" className="font-mono">{s.r} p.a.</Badge>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.a} · Tenure 12–84 months</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <Link to="/loans/apply" className="text-sm font-medium text-primary hover:underline">Apply now</Link>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-grad py-20 text-navy-foreground">
        <div className="container-pro">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="border-white/20 bg-white/5 text-navy-foreground">Customer stories</Badge>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Loved by founders, families and finance teams</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.n} className="border-white/10 bg-white/[0.04] p-6 text-navy-foreground backdrop-blur">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-4 text-sm leading-relaxed text-navy-foreground/90">"{t.q}"</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-sm font-semibold">{t.n}</p>
                    <p className="text-xs text-navy-foreground/60">{t.r}</p>
                  </div>
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-pro py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="border-primary/30 text-primary">FAQ</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Questions, answered.</h2>
            <p className="mt-3 text-muted-foreground">Can't find what you're looking for? Our team replies within 2 business hours.</p>
            <Link to="/contact"><Button variant="outline" className="mt-6">Talk to support</Button></Link>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              ["Is LoanFlow regulated?", "Yes. LoanFlow is a Reserve Bank of India registered NBFC partner platform and is fully GDPR & DPDP compliant."],
              ["Will applying affect my credit score?", "No. We perform a soft pull during eligibility checks. A hard pull happens only after you accept an offer."],
              ["How long does disbursal take?", "For pre-approved customers, funds reach your account in under 4 hours. New customers, typically within 24 hours."],
              ["What documents are required?", "PAN, Aadhaar and 6 months of bank statements. Self-employed customers add ITR for the last 2 years."],
              ["Can I prepay or foreclose my loan?", "Yes, with zero foreclosure charges on most products after 6 EMIs."],
            ].map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-base font-medium">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-surface py-16">
        <div className="container-pro">
          <Card className="overflow-hidden border-border/60 p-0">
            <div className="grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
              <div>
                <h3 className="text-2xl font-semibold md:text-3xl">Stay informed.</h3>
                <p className="mt-2 text-muted-foreground">Monthly market notes, RBI updates and product releases. No spam.</p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="you@company.com" className="h-12" required />
                <Button type="submit" size="lg" className="shadow-glow">Subscribe</Button>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
