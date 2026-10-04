import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, Camera, FileText, ShieldCheck, KeyRound, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — LoanFlow" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">Profile & settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information, KYC and security preferences.</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="relative">
            <Avatar className="h-20 w-20"><AvatarFallback className="bg-navy text-2xl text-navy-foreground">RA</AvatarFallback></Avatar>
            <button className="absolute -right-1 -bottom-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-card shadow-sm hover:bg-secondary"><Camera className="h-4 w-4" /></button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">Rohan Arora</h2>
              <Badge className="bg-success/15 text-success hover:bg-success/15"><BadgeCheck className="mr-1 h-3 w-3" /> KYC verified</Badge>
              <Badge variant="outline">Premium · Tier 2</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Customer since March 2022 · Member ID LF-998421</p>
          </div>
          <Button variant="outline">Download profile data</Button>
        </div>
      </Card>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="kyc">KYC & documents</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold">Personal information</h3>
            <form className="mt-5 grid gap-5 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }}>
              <div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Rohan" /></div>
              <div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Arora" /></div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="rohan.arora@example.com" /></div>
              <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
              <div className="space-y-1.5 md:col-span-2"><Label>Address</Label><Input defaultValue="42 Brigade Road, Bengaluru 560001" /></div>
              <div className="space-y-1.5"><Label>Date of birth</Label><Input type="date" defaultValue="1991-08-14" /></div>
              <div className="space-y-1.5"><Label>Occupation</Label><Input defaultValue="Founder, Linea Studio" /></div>
              <div className="md:col-span-2 flex justify-end"><Button type="submit" className="shadow-glow">Save changes</Button></div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="kyc" className="mt-4 space-y-4">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">KYC status</h3>
                <p className="mt-1 text-sm text-muted-foreground">Last verified on 12 January 2026 by IDfy.</p>
              </div>
              <Badge className="bg-success/15 text-success hover:bg-success/15"><BadgeCheck className="mr-1 h-3 w-3" /> Verified</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Uploaded documents</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                { n: "PAN Card.pdf", s: "212 KB", v: true },
                { n: "Aadhaar.pdf", s: "388 KB", v: true },
                { n: "Bank Statement Q1.pdf", s: "1.4 MB", v: true },
                { n: "Salary Slip Apr 2026.pdf", s: "180 KB", v: false },
              ].map((d) => (
                <div key={d.n} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{d.n}</p>
                    <p className="text-xs text-muted-foreground">{d.s}</p>
                  </div>
                  {d.v ? <Badge className="bg-success/15 text-success hover:bg-success/15">Verified</Badge> : <Badge variant="outline">Pending</Badge>}
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-5">Upload new document</Button>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold">Change password</h3>
            <form className="mt-5 grid gap-4 md:grid-cols-3" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}>
              <div className="space-y-1.5"><Label>Current</Label><Input type="password" /></div>
              <div className="space-y-1.5"><Label>New</Label><Input type="password" /></div>
              <div className="space-y-1.5"><Label>Confirm</Label><Input type="password" /></div>
              <div className="md:col-span-3 flex justify-end"><Button type="submit"><KeyRound className="mr-2 h-4 w-4" /> Update password</Button></div>
            </form>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">Adds an extra layer of security via authenticator app.</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
          <Card className="border-destructive/30 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-destructive">Delete account</p>
                <p className="mt-1 text-sm text-muted-foreground">Permanently remove your data. This cannot be undone.</p>
              </div>
              <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="p-6">
            <h3 className="font-semibold">Notification preferences</h3>
            <div className="mt-4 divide-y divide-border">
              {[
                ["EMI due reminders", "3 days before due date"],
                ["Payment receipts", "Sent immediately after auto-debit"],
                ["Loan offers & promotions", "Curated to your profile"],
                ["Product updates", "Monthly newsletter"],
              ].map(([t, d]) => (
                <div key={t} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
