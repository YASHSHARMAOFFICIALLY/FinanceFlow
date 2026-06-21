"use client";

import { signupSchema } from "@/lib/validators";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  // Session
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Restrict numbers & special characters in name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allows only alphabets and spaces
    const filtered = value.replace(/[^A-Za-z\s]/g, "");

    setName(filtered);
  };

  // Password validation rules
  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const Rule = ({ valid, text }: { valid: boolean; text: string }) => (
    <div
      className={`flex items-center gap-2 text-xs transition-colors ${
        valid ? "text-green-500" : "text-red-500"
      }`}
    >
      {valid ? (
        <CheckCircle className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}

      <span>{text}</span>
    </div>
  );

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Validate schema
    const result = signupSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      setLoading(false);

      return toast.error(result.error.issues[0].message);
    }

    // Confirm password check
    if (password !== confirmPassword) {
      setLoading(false);

      return toast.error("Passwords do not match");
    }

    // Password rule check
    const allRulesPassed =
      passwordRules.minLength &&
      passwordRules.uppercase &&
      passwordRules.lowercase &&
      passwordRules.number &&
      passwordRules.specialChar;

    if (!allRulesPassed) {
      setLoading(false);

      return toast.error("Password does not meet required conditions");
    }

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
      } else {
        toast.success("Account created! Redirecting...");
        window.location.href = "/dashboard";
      }
    } catch (err) {
      toast.error("A network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error(`Failed to sign up with ${provider}`);
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-sky-200 via-sky-100 to-white dark:from-[#111827] dark:via-[#0F172A] dark:to-[#020617]">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-sm p-8 rounded-2xl bg-white/80 dark:bg-[#111111]/90 backdrop-blur-xl shadow-2xl border border-white/50 dark:border-[#262626] text-[#0F0F0F] dark:text-white">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Create an Account
          </CardTitle>

          <CardDescription className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
            Join Finveda to manage your medical records and find healthcare
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* NAME */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <p className="text-[10px] text-muted-foreground">
                Only alphabets and spaces allowed
              </p>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setShowPasswordRules(true)}
                  onBlur={() => setShowPasswordRules(false)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* PASSWORD RULES TOOLTIP */}
              {showPasswordRules && (
                <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] shadow-xl p-4 space-y-2 animate-in fade-in-0 zoom-in-95">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Password must contain:
                  </p>

                  <Rule
                    valid={passwordRules.minLength}
                    text="At least 8 characters"
                  />

                  <Rule
                    valid={passwordRules.uppercase}
                    text="One uppercase letter"
                  />

                  <Rule
                    valid={passwordRules.lowercase}
                    text="One lowercase letter"
                  />

                  <Rule valid={passwordRules.number} text="One number" />

                  <Rule
                    valid={passwordRules.specialChar}
                    text="One special character"
                  />
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? "focus-visible:ring-green-500"
                        : "focus-visible:ring-red-500"
                      : "focus-visible:ring-blue-400"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {confirmPassword.length > 0 && (
                <p
                  className={`text-xs ${
                    passwordsMatch ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="w-full h-11 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:opacity-90 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Create Account
            </Button>
          </form>

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#111111]/90 px-4 text-xs uppercase tracking-wider text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-10 rounded-lg border border-gray-200 dark:border-[#303030] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => handleSocialSignUp("google")}
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google"
              />
              Google
            </Button>

            <Button
              variant="outline"
              className="h-10 rounded-lg border border-gray-200 dark:border-[#303030] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => handleSocialSignUp("github")}
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="h-5 w-5"
                alt="Github"
              />
              Github
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2 pt-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="text-muted-foreground">
            Already have an account?
          </span>

          <Link
            href="/signin"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
