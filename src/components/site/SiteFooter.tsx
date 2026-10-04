import { Link } from "@tanstack/react-router";
import { ShieldCheck, Twitter, Linkedin, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy-grad text-navy-foreground">
      <div className="container-pro grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-grad">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">LoanFlow</span>
          </div>
          <p className="max-w-xs text-sm text-navy-foreground/70">
            Modern credit management for individuals and growing businesses. Trusted by 40,000+ borrowers.
          </p>
          <div className="flex gap-3 pt-2">
            <a className="rounded-md border border-white/10 p-2 hover:bg-white/5" href="#"><Twitter className="h-4 w-4" /></a>
            <a className="rounded-md border border-white/10 p-2 hover:bg-white/5" href="#"><Linkedin className="h-4 w-4" /></a>
            <a className="rounded-md border border-white/10 p-2 hover:bg-white/5" href="#"><Github className="h-4 w-4" /></a>
          </div>
        </div>

        {[
          { title: "Product", items: [["Dashboard", "/dashboard"], ["Apply for loan", "/loans/apply"], ["Track loan", "/loans/tracking"], ["Payments", "/payments"]] },
          { title: "Company", items: [["About", "/about"], ["Contact", "/contact"], ["Careers", "#"], ["Press", "#"]] },
          { title: "Legal", items: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"], ["Compliance", "#"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-foreground/80">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.items.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <Link to={href} className="text-navy-foreground/70 transition hover:text-white">{label}</Link>
                  ) : (
                    <a href={href} className="text-navy-foreground/70 transition hover:text-white">{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-pro flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-foreground/60 md:flex-row">
          <p>© {new Date().getFullYear()} LoanFlow Financial Services. All rights reserved.</p>
          <p>RBI Registered NBFC · ISO 27001 · SOC 2 Type II</p>
        </div>
      </div>
    </footer>
  );
}
