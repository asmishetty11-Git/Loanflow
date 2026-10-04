import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, MessageSquare, Headphones, Building2, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LoanFlow" },
      { name: "description", content: "Reach our customer success team. We respond within 2 business hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="bg-hero">
        <div className="container-pro py-16 text-center">
          <Badge variant="outline" className="border-primary/30 text-primary">Contact us</Badge>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">We're here, whenever you need us.</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Average reply time: 1h 42m. Indian working hours, always with a real human.</p>
        </div>
      </section>

      <section className="container-pro grid gap-10 py-16 lg:grid-cols-3">
        {[
          { i: MessageSquare, t: "Chat with us", d: "Available 9am – 9pm IST", a: "Start chat" },
          { i: Headphones, t: "Premium support", d: "Dedicated RM for premium plans", a: "Book a call" },
          { i: Building2, t: "Enterprise sales", d: "Volume disbursal & APIs", a: "Talk to sales" },
        ].map((c) => (
          <Card key={c.t} className="p-6">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><c.i className="h-5 w-5" /></span>
            <h3 className="mt-5 text-lg font-semibold">{c.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
            <Button variant="outline" size="sm" className="mt-4">{c.a}</Button>
          </Card>
        ))}
      </section>

      <section className="container-pro grid gap-10 pb-20 lg:grid-cols-2">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fill the form below and we'll route it to the right team.</p>
          <form
            className="mt-6 space-y-5"
            onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent — we'll be in touch shortly."); }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>First name</Label><Input required placeholder="Rohan" /></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input required placeholder="Arora" /></div>
            </div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" required placeholder="rohan@company.com" /></div>
            <div className="space-y-1.5"><Label>Subject</Label><Input required placeholder="Question about home loan rates" /></div>
            <div className="space-y-1.5"><Label>Message</Label><Textarea rows={5} required placeholder="How can we help?" /></div>
            <Button type="submit" size="lg" className="w-full shadow-glow">{sent ? "Sent ✓" : "Send message"}</Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold">Head office</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><span>Indiqube Lakeside, Bellandur, Bengaluru 560103</span></p>
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /><span>+91 80 4567 1200</span></p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /><span>hello@loanflow.in</span></p>
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <div className="grid h-64 place-items-center bg-navy-grad text-navy-foreground">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8" />
                <p className="mt-2 text-sm opacity-80">Interactive map</p>
                <p className="text-xs opacity-60">12.9351° N, 77.6244° E</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Follow us</h3>
            <div className="mt-3 flex gap-3">
              <a className="rounded-md border border-border p-2 hover:bg-secondary"><Twitter className="h-4 w-4" /></a>
              <a className="rounded-md border border-border p-2 hover:bg-secondary"><Linkedin className="h-4 w-4" /></a>
            </div>
          </Card>
        </div>
      </section>
    </SiteShell>
  );
}
