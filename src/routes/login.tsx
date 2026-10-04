import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — LoanFlow" }] }),
  component: Login,
});

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    if (pwd.length < 6) return toast.error("Password too short");
    toast.success("Welcome back!");
    nav({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-navy-grad p-12 text-navy-foreground lg:flex lg:flex-col lg:justify-between">
        <Link to="/" className="flex items-center gap-2 text-navy-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10"><ShieldCheck className="h-5 w-5" /></span>
          <span className="text-lg font-semibold">LoanFlow</span>
        </Link>
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold leading-tight">"LoanFlow saved my finance team 30 hours a month."</h2>
          <div>
            <p className="font-medium">Kabir Mehta</p>
            <p className="text-sm text-navy-foreground/60">CFO, Northwind Logistics</p>
          </div>
        </div>
        <p className="text-xs text-navy-foreground/50">© LoanFlow Financial Services · ISO 27001 · SOC 2 Type II</p>
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center bg-background px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to home</Link>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your loans and EMIs.</p>

          <Card className="mt-8 p-6 shadow-card">
            <form className="space-y-4" onSubmit={submit}>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label>Password</Label>
                  <a className="text-xs text-primary hover:underline" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <Input type={show ? "text" : "password"} value={pwd} onChange={(e) => setPwd(e.target.value)} required />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:bg-secondary">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="rm" /><Label htmlFor="rm" className="text-sm font-normal text-muted-foreground">Remember me for 30 days</Label>
              </div>
              <Button type="submit" size="lg" className="w-full shadow-glow">Sign in</Button>
            </form>

            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> OR CONTINUE WITH <span className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Apple</Button>
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to LoanFlow? <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
