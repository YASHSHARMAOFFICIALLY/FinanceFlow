'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import Link from "next/link";

// 1. Move all the logic using useSearchParams into this sub-component
function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const nextPath = searchParams.get("next");
    const redirectTarget = nextPath?.startsWith("/") ? nextPath : "/dashboard";

    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (session) {
            router.push(redirectTarget);
        }
    }, [session, router, redirectTarget]);

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: redirectTarget
            });
            if (error) {
                toast.error(error.message || "Failed to sign in");
            } else {
                toast.success("Signed in successfully!");
                router.push(redirectTarget);
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        setLoading(true);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: redirectTarget
            });
        } catch (err) {
            toast.error(`Failed to sign in with ${provider}`);
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
                    <CardTitle className="text-3xl font-semibold tracking-tight">FinVeda</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <form onSubmit={handleEmailSignIn} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                className="h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                id="email" type="email" placeholder="name@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="text-right">
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    className="h-11 rounded-lg bg-gray-100 dark:bg-[#1A1A1A] border-none focus-visible:ring-2 focus-visible:ring-blue-400 pr-10"
                                    id="password" type={showPassword ? "text" : "password"}
                                    value={password} onChange={(e) => setPassword(e.target.value)} required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showPassword ? "Show password" : "Hide password"}
                                >
                                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-11 rounded-lg bg-gray-900 text-white hover:opacity-90 cursor-pointer" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/80 dark:bg-[#111111]/90 px-2 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="cursor-pointer" onClick={() => handleSocialSignIn("google")} disabled={loading}>
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button variant="outline" className="cursor-pointer" onClick={() => handleSocialSignIn("github")} disabled={loading}>
                            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Git" className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex items-center justify-center gap-2 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Don&apos;t have an account?</span>
                    <Link href="/signup" className="font-medium text-primary hover:underline">Create Account</Link>
                </CardFooter>
            </Card>
        </div>
    );
}

// 2. This is the main page component that Next.js sees
export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <SignInForm />
        </Suspense>
    );
}
