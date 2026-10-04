import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line,
} from "recharts";
import { Search, MoreHorizontal, IndianRupee, Users, FileCheck2, AlertTriangle, Check, X } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({
  head: () => ({ meta: [{ title: "Admin — LoanFlow" }] }),
  component: Admin,
});

const revenue = [
  { m: "Nov", v: 142 }, { m: "Dec", v: 168 }, { m: "Jan", v: 191 },
  { m: "Feb", v: 184 }, { m: "Mar", v: 224 }, { m: "Apr", v: 248 }, { m: "May", v: 271 },
];
const approvals = [
  { d: "Mon", a: 142, r: 24 }, { d: "Tue", a: 168, r: 31 }, { d: "Wed", a: 154, r: 19 },
  { d: "Thu", a: 188, r: 27 }, { d: "Fri", a: 201, r: 33 }, { d: "Sat", a: 92, r: 12 }, { d: "Sun", a: 64, r: 9 },
];
const apps = [
  { id: "LF-44231", n: "Aarav Kumar", e: "aarav@gmail.com", a: "₹4,50,000", p: "Personal", s: "Pending", risk: "Low" },
  { id: "LF-44230", n: "Sara Pinto", e: "sara.p@startup.in", a: "₹22,00,000", p: "Business", s: "Pending", risk: "Medium" },
  { id: "LF-44229", n: "Mohit Bansal", e: "mohit.b@xyz.co", a: "₹8,80,000", p: "Vehicle", s: "Approved", risk: "Low" },
  { id: "LF-44228", n: "Tara Sen", e: "tara@designs.co", a: "₹1,80,000", p: "Personal", s: "Approved", risk: "Low" },
  { id: "LF-44227", n: "Imran Qureshi", e: "imran.q@firm.in", a: "₹35,00,000", p: "LAP", s: "Rejected", risk: "High" },
  { id: "LF-44226", n: "Rhea Nair", e: "rhea@ngo.org", a: "₹6,50,000", p: "Education", s: "Approved", risk: "Low" },
];

function Admin() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Internal · Restricted access</p>
          <h1 className="text-2xl font-semibold md:text-3xl">Admin console</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export report</Button>
          <Button>Generate insights</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "Total disbursed", v: "₹271 Cr", d: "+12.4% MoM", i: IndianRupee },
          { l: "Active borrowers", v: "12,481", d: "+842 this month", i: Users },
          { l: "Approval rate", v: "84.2%", d: "Above target", i: FileCheck2 },
          { l: "NPAs flagged", v: "0.42%", d: "Within tolerance", i: AlertTriangle },
        ].map((k) => (
          <Card key={k.l} className="p-5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><k.i className="h-4 w-4" /></span>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-semibold">{k.v}</p>
            <p className="text-xs text-muted-foreground">{k.d}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold">Revenue (₹ Cr)</h3>
          <p className="text-sm text-muted-foreground">Trailing 7 months</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={revenue}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="v" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">Approvals vs rejections</h3>
          <p className="text-sm text-muted-foreground">This week</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={approvals}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="a" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="r" stroke="var(--destructive)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Pending applications */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Loan applications queue</h3>
            <p className="text-sm text-muted-foreground">Approve or reject pending applications.</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by ID or name" />
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 font-medium">App ID</th><th className="py-3 font-medium">Customer</th>
                <th className="py-3 font-medium">Product</th><th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Risk</th><th className="py-3 font-medium">Status</th>
                <th className="py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{a.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-navy text-xs text-navy-foreground">{a.n.split(" ").map(s=>s[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium">{a.n}</p>
                        <p className="text-xs text-muted-foreground">{a.e}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{a.p}</td>
                  <td className="py-3 font-medium">{a.a}</td>
                  <td className="py-3">
                    <Badge className={
                      a.risk === "Low" ? "bg-success/15 text-success hover:bg-success/15" :
                      a.risk === "Medium" ? "bg-warning/20 text-warning-foreground hover:bg-warning/20" :
                      "bg-destructive/15 text-destructive hover:bg-destructive/15"
                    }>{a.risk}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className={
                      a.s === "Approved" ? "border-success/30 text-success" :
                      a.s === "Rejected" ? "border-destructive/30 text-destructive" :
                      "border-primary/30 text-primary"
                    }>{a.s}</Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex justify-end gap-2">
                      {a.s === "Pending" && (
                        <>
                          <Button size="sm" variant="outline" className="h-8"><Check className="mr-1 h-3.5 w-3.5" /> Approve</Button>
                          <Button size="sm" variant="outline" className="h-8 text-destructive hover:text-destructive"><X className="mr-1 h-3.5 w-3.5" /> Reject</Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity logs */}
      <Card className="p-6">
        <h3 className="font-semibold">Recent activity</h3>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            ["09:42", "Underwriter Asha approved LF-44229 (₹8,80,000)"],
            ["09:30", "System flagged LF-44227 as High risk"],
            ["08:54", "12 documents auto-verified by IDfy"],
            ["08:11", "Daily reconciliation completed · 0 mismatches"],
          ].map(([t, d]) => (
            <li key={d} className="flex gap-3 border-l-2 border-primary pl-3">
              <span className="font-mono text-xs text-muted-foreground">{t}</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
