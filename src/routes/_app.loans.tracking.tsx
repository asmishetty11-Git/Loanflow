import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, FileText, ShieldCheck, Wallet, Clock, Download, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/_app/loans/tracking")({
  head: () => ({ meta: [{ title: "Loan tracking — LoanFlow" }] }),
  component: Tracking,
});

const stages = [
  { i: FileText, t: "Application received", d: "08 May 2026 · 10:42 AM", s: "done", note: "Application #LF-44219 submitted via web" },
  { i: ShieldCheck, t: "KYC & document verification", d: "08 May 2026 · 11:18 AM", s: "done", note: "Verified by IDfy. All documents accepted." },
  { i: CheckCircle2, t: "Underwriting & approval", d: "08 May 2026 · 02:34 PM", s: "active", note: "Senior underwriter reviewing income proofs" },
  { i: Wallet, t: "Disbursal", d: "Estimated 09 May 2026", s: "todo", note: "Funds will reach your registered account" },
  { i: Clock, t: "Repayment kick-off", d: "Estimated 14 Jun 2026", s: "todo", note: "First EMI auto-debit on 14th of each month" },
];

function Tracking() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Loan tracking</h1>
          <p className="mt-1 text-sm text-muted-foreground">Live status of your active applications.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download report</Button>
          <Button>Contact RM</Button>
        </div>
      </div>

      {/* Summary */}
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Application</p>
            <p className="mt-1 text-lg font-semibold">#LF-44219</p>
            <p className="text-sm text-muted-foreground">Business expansion loan</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Sanctioned amount</p>
            <p className="mt-1 text-lg font-semibold">₹15,00,000</p>
            <p className="text-sm text-muted-foreground">Tenure 48 months</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Current stage</p>
            <p className="mt-1 text-lg font-semibold">Underwriting</p>
            <Badge className="mt-1 bg-primary/10 text-primary hover:bg-primary/10">In progress</Badge>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Overall progress</p>
            <p className="mt-1 text-lg font-semibold">60%</p>
            <Progress value={60} className="mt-2" />
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold">Approval timeline</h3>
        <div className="mt-6 space-y-0">
          {stages.map((st, i) => (
            <div key={st.t} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 ${
                  st.s === "done" ? "border-success bg-success/10 text-success" :
                  st.s === "active" ? "border-primary bg-primary/10 text-primary animate-pulse" :
                  "border-border bg-secondary text-muted-foreground"
                }`}>
                  <st.i className="h-4 w-4" />
                </div>
                {i < stages.length - 1 && <div className={`my-1 w-0.5 flex-1 ${st.s === "done" ? "bg-success" : "bg-border"}`} />}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{st.t}</p>
                  <Badge variant="outline" className={
                    st.s === "done" ? "border-success/30 text-success" :
                    st.s === "active" ? "border-primary/30 text-primary" :
                    "text-muted-foreground"
                  }>{st.s === "done" ? "Completed" : st.s === "active" ? "In progress" : "Upcoming"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{st.d}</p>
                <p className="mt-2 text-sm">{st.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Other applications */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent applications</h3>
          <Button variant="ghost" size="sm">View archive <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 font-medium">App ID</th><th className="py-3 font-medium">Product</th><th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Date</th><th className="py-3 font-medium">Status</th><th className="py-3" />
              </tr>
            </thead>
            <tbody>
              {[
                { id: "LF-44219", p: "Business loan", a: "₹15,00,000", d: "08 May 2026", s: "Underwriting", c: "primary" },
                { id: "LF-39812", p: "Vehicle loan", a: "₹8,50,000", d: "11 Jan 2024", s: "Active", c: "success" },
                { id: "LF-30217", p: "Personal loan", a: "₹3,00,000", d: "22 Sep 2022", s: "Closed", c: "muted" },
                { id: "LF-28012", p: "Education loan", a: "₹6,00,000", d: "04 Jul 2022", s: "Rejected", c: "destructive" },
              ].map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="py-3 font-medium">{r.p}</td>
                  <td className="py-3">{r.a}</td>
                  <td className="py-3 text-muted-foreground">{r.d}</td>
                  <td className="py-3">
                    <Badge className={
                      r.c === "success" ? "bg-success/15 text-success hover:bg-success/15" :
                      r.c === "primary" ? "bg-primary/10 text-primary hover:bg-primary/10" :
                      r.c === "destructive" ? "bg-destructive/10 text-destructive hover:bg-destructive/10" :
                      "bg-secondary text-muted-foreground"
                    }>{r.s}</Badge>
                  </td>
                  <td className="py-3 text-right"><Button variant="ghost" size="sm">Details</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
