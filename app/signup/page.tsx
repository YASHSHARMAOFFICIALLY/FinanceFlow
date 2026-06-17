'use client'
import { signupSchema } from "@/lib/validators";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Github, Chrome, Loader2, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [passwordError, setPasswordError] = useState("");

    const getPasswordValidationMessage = (value: string) => {
        if (value.length < 8) return "Password must contain at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Password should include at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Password should include at least one lowercase letter";
        if (!/[0-9]/.test(value)) return "Password should include at least one number";
        if (!/[^A-Za-z0-9]/.test(value)) return "Password should include at least one special character";
        return "";
    };

    const getPasswordRequirements = (value: string) => [
        {
            label: "At least 8 characters",
            passed: value.length >= 8,
        },
        {
            label: "One uppercase letter",
            passed: /[A-Z]/.test(value),
        },
        {
            label: "One lowercase letter",
            passed: /[a-z]/.test(value),
        },
        {
            label: "One number",
            passed: /[0-9]/.test(value),
        },
        {
            label: "One special character",
            passed: /[^A-Za-z0-9]/.test(value),
        },
    ];

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordError(getPasswordValidationMessage(value));
        setFormErrors((current) => ({ ...current, password: undefined }));
    };


    
    // Check if user is already logged in
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);

  
    const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});

    const result = signupSchema.safeParse({ name, email, password });
    if (!result.success) {
        const errors = result.error.issues.reduce(
            (acc, issue) => {
                if (issue.path.includes("password") && !acc.password) acc.password = issue.message;
                if (issue.path.includes("email") && !acc.email) acc.email = issue.message;
                if (issue.path.includes("name") && !acc.name) acc.name = issue.message;
                return acc;
            },
            { name: undefined, email: undefined, password: undefined } as {
                name?: string;
                email?: string;
                password?: string;
            }
        );

        setFormErrors(errors);
        setPasswordError(errors.password || getPasswordValidationMessage(password));
        setLoading(false);
        return toast.error(errors.password || errors.email || errors.name || result.error.issues[0].message);
    }

    try {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            callbackURL: "/dashboard" // Note: Some versions of Better Auth redirect automatically
        });

        if (error) {
            toast.error(error.message || "Failed to create account");
        } else {
            toast.success("Account created! Redirecting...");
            // Force a hard navigation if router.push feels "stuck"
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
                callbackURL: "/dashboard"
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
                    <CardTitle className="text-2xl font-semibold tracking-tight">Create an Account</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                        Join Finveda to manage your medical records and find healthcare
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
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
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    className="pl-10 pr-10 h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                    required 
                                    minLength={8}
                                    aria-describedby="password-error"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {(formErrors.password || passwordError) ? (
                                <p id="password-error" className="text-[10px] text-destructive">
                                    {formErrors.password || passwordError}
                                </p>
                            ) : null}
                            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                                {getPasswordRequirements(password).map((requirement, index) => (
                                    <span
                                        key={requirement.label}
                                        className={requirement.passed ? "text-green-600 dark:text-green-400" : "text-destructive"}
                                    >
                                        {index > 0 ? "• " : ""}
                                        {requirement.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-11 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:opacity-90 transition cursor-pointer" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Create Account
                        </Button>
                    </form>

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
                            />
                            Github
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center gap-2 pt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-muted-foreground">Already have an account?</span>
                    <Link href="/signin" className="font-medium text-primary hover:underline">
                        Sign In
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
