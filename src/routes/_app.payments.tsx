import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, Wallet, Smartphone, Building2, BadgeCheck, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/payments")({
  head: () => ({ meta: [{ title: "Payments — LoanFlow" }] }),
  component: Payments,
});

const schedule = Array.from({ length: 12 }).map((_, i) => {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  const paid = i < 3;
  return {
    no: i + 1,
    date: `14 ${months[i]} 2026`,
    principal: 28200 + i * 120,
    interest: 13980 - i * 120,
    total: 42180,
    bal: 1500000 - (i + 1) * 28200,
    status: paid ? "Paid" : i === 3 ? "Due" : "Upcoming",
  };
});

function Payments() {
  const [paySuccess, setPaySuccess] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pay EMIs, view your schedule and download receipts.</p>
      </div>

      {/* Stat row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary-grad p-6 text-primary-foreground shadow-glow">
          <p className="text-xs uppercase tracking-wider opacity-80">Next EMI due</p>
          <p className="mt-2 text-3xl font-semibold">₹42,180</p>
          <p className="mt-1 text-sm opacity-80">14 May 2026 · in 5 days</p>
          <Button onClick={() => setPaySuccess(true)} variant="secondary" className="mt-5">Pay now</Button>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Paid this year</p>
          <p className="mt-2 text-3xl font-semibold">₹2,11,000</p>
          <p className="mt-1 text-sm text-success">5 EMIs · 0 missed</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Outstanding</p>
          <p className="mt-2 text-3xl font-semibold">₹13,72,800</p>
          <p className="mt-1 text-sm text-muted-foreground">38 EMIs remaining</p>
        </Card>
      </div>

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">EMI schedule</TabsTrigger>
          <TabsTrigger value="history">Transaction history</TabsTrigger>
          <TabsTrigger value="methods">Payment methods</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">EMI schedule · LF-44219</h3>
              <Button variant="outline" size="sm"><Download className="mr-2 h-3.5 w-3.5" /> Export PDF</Button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 font-medium">#</th><th className="py-3 font-medium">Date</th>
                    <th className="py-3 font-medium">Principal</th><th className="py-3 font-medium">Interest</th>
                    <th className="py-3 font-medium">EMI</th><th className="py-3 font-medium">Balance</th>
                    <th className="py-3 font-medium">Status</th><th className="py-3" />
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((r) => (
                    <tr key={r.no} className="border-b border-border last:border-0 hover:bg-secondary/40">
                      <td className="py-3 font-mono text-xs text-muted-foreground">{String(r.no).padStart(2, "0")}</td>
                      <td className="py-3">{r.date}</td>
                      <td className="py-3">₹{r.principal.toLocaleString("en-IN")}</td>
                      <td className="py-3">₹{r.interest.toLocaleString("en-IN")}</td>
                      <td className="py-3 font-semibold">₹{r.total.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-muted-foreground">₹{r.bal.toLocaleString("en-IN")}</td>
                      <td className="py-3">
                        <Badge className={
                          r.status === "Paid" ? "bg-success/15 text-success hover:bg-success/15" :
                          r.status === "Due" ? "bg-warning/20 text-warning-foreground hover:bg-warning/20" :
                          "bg-secondary text-muted-foreground"
                        }>{r.status}</Badge>
                      </td>
                      <td className="py-3 text-right">
                        {r.status === "Paid" ? (
                          <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
                        ) : r.status === "Due" ? (
                          <Button size="sm" onClick={() => setPaySuccess(true)}>Pay</Button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold">Transaction history</h3>
            <ul className="mt-4 divide-y divide-border">
              {[
                { d: "08 May", t: "EMI · Business loan", a: "₹42,180", m: "HDFC •• 4421" },
                { d: "02 May", t: "Disbursal · Top-up", a: "+₹2,50,000", m: "Credit" },
                { d: "28 Apr", t: "EMI · Vehicle loan", a: "₹18,650", m: "ICICI •• 8810" },
                { d: "14 Apr", t: "EMI · Business loan", a: "₹42,180", m: "HDFC •• 4421" },
                { d: "11 Apr", t: "Processing fee", a: "₹2,500", m: "HDFC •• 4421" },
              ].map((t) => (
                <li key={t.t + t.d} className="flex items-center gap-4 py-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-xs font-semibold">{t.d}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{t.t}</p>
                    <p className="text-xs text-muted-foreground">{t.m}</p>
                  </div>
                  <span className={`font-semibold ${t.a.startsWith("+") ? "text-success" : ""}`}>{t.a}</span>
                  <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold">Linked payment methods</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                { i: Building2, t: "HDFC Bank", d: "Auto-debit · A/c •• 4421", primary: true },
                { i: Building2, t: "ICICI Bank", d: "A/c •• 8810" },
                { i: CreditCard, t: "Visa Platinum", d: "•• 1234 · expires 09/28" },
                { i: Smartphone, t: "UPI", d: "rohan@axisbank" },
              ].map((m) => (
                <div key={m.t} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><m.i className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.t}</p>
                    <p className="text-xs text-muted-foreground">{m.d}</p>
                  </div>
                  {m.primary && <Badge variant="outline" className="border-primary/30 text-primary">Primary</Badge>}
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-5"><Wallet className="mr-2 h-4 w-4" /> Add new method</Button>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={paySuccess} onOpenChange={setPaySuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success"><BadgeCheck className="h-7 w-7" /></div>
            <DialogTitle className="text-center text-2xl">Payment successful</DialogTitle>
            <DialogDescription className="text-center">
              ₹42,180 paid towards loan #LF-44219. Receipt sent to your email.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span className="font-mono">RZP-PAY-22481097</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Mode</span><span>HDFC •• 4421</span></div>
            <div className="mt-1 flex justify-between"><span className="text-muted-foreground">Time</span><span>09 May 2026, 11:08 AM</span></div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setPaySuccess(false)}>Close</Button>
            <Button><Download className="mr-2 h-4 w-4" /> Download receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
