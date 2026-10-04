import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, CreditCard,
  Calendar, Bell, FileText, Plus, Download, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — LoanFlow" }] }),
  component: Dashboard,
});

const series = [
  { m: "Jan", paid: 38, due: 42 },
  { m: "Feb", paid: 41, due: 42 },
  { m: "Mar", paid: 42, due: 42 },
  { m: "Apr", paid: 40, due: 42 },
  { m: "May", paid: 42, due: 42 },
  { m: "Jun", paid: 42, due: 42 },
  { m: "Jul", paid: 44, due: 42 },
  { m: "Aug", paid: 46, due: 42 },
];
const pie = [
  { name: "Principal", value: 62, color: "var(--primary)" },
  { name: "Interest", value: 28, color: "var(--navy)" },
  { name: "Fees", value: 10, color: "var(--muted-foreground)" },
];
const txns = [
  { id: "TXN-90211", desc: "EMI · Business Loan", date: "08 May 2026", amt: "-₹42,180", status: "Paid" },
  { id: "TXN-90187", desc: "Disbursal · Top-up", date: "02 May 2026", amt: "+₹2,50,000", status: "Credited" },
  { id: "TXN-90142", desc: "EMI · Vehicle Loan", date: "28 Apr 2026", amt: "-₹18,650", status: "Paid" },
  { id: "TXN-90108", desc: "Late fee waiver", date: "19 Apr 2026", amt: "+₹650", status: "Refunded" },
  { id: "TXN-90075", desc: "Processing fee", date: "11 Apr 2026", amt: "-₹2,500", status: "Paid" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Saturday, 9 May</p>
          <h1 className="text-2xl font-semibold md:text-3xl">Good morning, Rohan 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's a quick snapshot of your credit health today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Statement</Button>
          <Link to="/loans/apply"><Button className="shadow-glow"><Plus className="mr-2 h-4 w-4" /> New loan</Button></Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "Total outstanding", v: "₹18,42,000", d: "Across 2 loans", i: Wallet, t: "+2.4%", up: false },
          { l: "Next EMI", v: "₹42,180", d: "Due 14 May 2026", i: Calendar, t: "5 days", up: true },
          { l: "Credit score", v: "782", d: "Excellent · Experian", i: TrendingUp, t: "+24", up: true },
          { l: "Available limit", v: "₹6,80,000", d: "Pre-approved", i: CreditCard, t: "Updated today", up: true },
        ].map((s) => (
          <Card key={s.l} className="p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><s.i className="h-4 w-4" /></span>
              <Badge variant="secondary" className={`gap-1 ${s.up ? "text-success" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {s.t}
              </Badge>
            </div>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{s.v}</p>
            <p className="text-xs text-muted-foreground">{s.d}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Repayment trend</h3>
              <p className="text-sm text-muted-foreground">EMI paid vs scheduled · Last 8 months</p>
            </div>
            <Badge variant="outline" className="border-success/30 bg-success/10 text-success">All EMIs on time</Badge>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer>
              <AreaChart data={series}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} unit="K" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="paid" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g1)" />
                <Area type="monotone" dataKey="due" stroke="var(--navy)" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold">Loan composition</h3>
          <p className="text-sm text-muted-foreground">Principal vs interest split</p>
          <div className="mt-2 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {pie.map((p, i) => <Cell key={i} fill={p.color} />)}
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Loan + EMI */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Active loans</h3>
            <Link to="/loans/tracking" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="mt-5 space-y-4">
            {[
              { n: "Business Expansion Loan", id: "LF-44219", a: "₹15,00,000", o: 46, e: "₹42,180" },
              { n: "Vehicle Loan · Hyundai Verna", id: "LF-39812", a: "₹8,50,000", o: 72, e: "₹18,650" },
            ].map((l) => (
              <div key={l.id} className="rounded-xl border border-border p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{l.n}</p>
                    <p className="text-xs text-muted-foreground">#{l.id} · Sanctioned {l.a}</p>
                  </div>
                  <Badge className="bg-success/15 text-success hover:bg-success/15">Active</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Repayment progress</span><span>{l.o}%</span></div>
                  <Progress value={l.o} />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-muted-foreground">Next EMI <span className="font-semibold text-foreground">{l.e}</span></span>
                  <Button size="sm" variant="outline">Manage <ChevronRight className="ml-1 h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">EMI reminders</h3>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="mt-5 space-y-4">
            {[
              { d: "14 May", t: "Business loan EMI", a: "₹42,180", c: "warning" },
              { d: "28 May", t: "Vehicle loan EMI", a: "₹18,650", c: "primary" },
              { d: "05 Jun", t: "Insurance premium", a: "₹3,200", c: "muted" },
            ].map((r) => (
              <li key={r.t} className="flex items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-lg text-xs font-semibold ${r.c === "warning" ? "bg-warning/15 text-warning-foreground" : r.c === "primary" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{r.d}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{r.t}</p>
                  <p className="text-xs text-muted-foreground">Auto-debit enabled</p>
                </div>
                <span className="text-sm font-semibold">{r.a}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 w-full">View calendar</Button>
        </Card>
      </div>

      {/* Quick actions + Transactions */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold">Quick actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { i: Plus, t: "Apply loan", to: "/loans/apply" },
              { i: Wallet, t: "Pay EMI", to: "/payments" },
              { i: FileText, t: "Documents", to: "/profile" },
              { i: TrendingUp, t: "Track loan", to: "/loans/tracking" },
            ].map((a) => (
              <Link key={a.t} to={a.to} className="group flex flex-col items-start gap-2 rounded-xl border border-border p-4 transition hover:border-primary/40 hover:shadow-soft">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><a.i className="h-4 w-4" /></span>
                <p className="text-sm font-medium">{a.t}</p>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent transactions</h3>
            <Button variant="ghost" size="sm">Export CSV</Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-3 font-medium">Reference</th>
                  <th className="py-3 pr-3 font-medium">Description</th>
                  <th className="py-3 pr-3 font-medium">Date</th>
                  <th className="py-3 pr-3 font-medium">Amount</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t) => (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                    <td className="py-3 pr-3 font-medium">{t.desc}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{t.date}</td>
                    <td className={`py-3 pr-3 font-semibold ${t.amt.startsWith("-") ? "text-foreground" : "text-success"}`}>{t.amt}</td>
                    <td className="py-3"><Badge variant="secondary">{t.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
