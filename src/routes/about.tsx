import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Award, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LoanFlow" },
      { name: "description", content: "Our mission is to make credit transparent, fast and human for every Indian household and business." },
    ],
  }),
  component: About,
});

const milestones = [
  ["2019", "Founded in Bengaluru", "Three ex-bankers set out to fix the broken loan experience."],
  ["2021", "₹500 Cr disbursed", "Crossed the half-thousand crore mark with 28 lender partners."],
  ["2023", "Series B funding", "Raised $42M led by Sequoia and Lightspeed to expand pan-India."],
  ["2025", "40,000+ borrowers", "Recognised as 'Fintech of the Year' at the India NBFC Summit."],
];
const team = [
  { n: "Ananya Kapoor", r: "CEO & Co-founder", i: "AK" },
  { n: "Vikram Shenoy", r: "Chief Risk Officer", i: "VS" },
  { n: "Meera Banerjee", r: "Head of Product", i: "MB" },
  { n: "Rahul Iyengar", r: "Head of Engineering", i: "RI" },
];

function About() {
  return (
    <SiteShell>
      <section className="bg-hero">
        <div className="container-pro py-20 text-center">
          <Badge variant="outline" className="border-primary/30 text-primary">About LoanFlow</Badge>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            We're rebuilding consumer credit, with patience and respect.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            LoanFlow is a team of bankers, designers and engineers obsessed with making borrowing feel as
            calm and predictable as a good savings account.
          </p>
        </div>
      </section>

      <section className="container-pro grid gap-6 py-16 md:grid-cols-2">
        {[
          { i: Target, t: "Our mission", d: "To make credit transparent, accessible and human for 100M Indians by 2030." },
          { i: Eye, t: "Our vision", d: "A future where applying for a loan feels as effortless as opening a chat — and twice as honest." },
        ].map((c) => (
          <Card key={c.t} className="p-8">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary"><c.i className="h-5 w-5" /></span>
            <h2 className="mt-5 text-2xl font-semibold">{c.t}</h2>
            <p className="mt-2 text-muted-foreground">{c.d}</p>
          </Card>
        ))}
      </section>

      <section className="bg-surface py-20">
        <div className="container-pro">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Badge variant="outline" className="border-primary/30 text-primary">Achievements</Badge>
              <h2 className="mt-3 text-3xl font-semibold">Six years. A million conversations.</h2>
            </div>
            <Award className="hidden h-10 w-10 text-primary md:block" />
          </div>
          <div className="space-y-5">
            {milestones.map(([y, t, d]) => (
              <Card key={y} className="grid grid-cols-[80px_1fr] gap-6 p-6 md:grid-cols-[120px_1fr]">
                <div className="text-2xl font-semibold text-primary">{y}</div>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-pro py-20">
        <div className="mb-10">
          <Badge variant="outline" className="border-primary/30 text-primary">Leadership</Badge>
          <h2 className="mt-3 text-3xl font-semibold">The team behind LoanFlow</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Card key={m.n} className="p-6 text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy-grad text-2xl font-semibold text-navy-foreground">{m.i}</div>
              <p className="mt-4 font-semibold">{m.n}</p>
              <p className="text-sm text-muted-foreground">{m.r}</p>
              <Users className="mx-auto mt-3 h-4 w-4 text-muted-foreground" />
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact"><Button size="lg">Get in touch</Button></Link>
        </div>
      </section>
    </SiteShell>
  );
}
