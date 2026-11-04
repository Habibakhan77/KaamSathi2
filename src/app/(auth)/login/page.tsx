"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Wrench,
  ShieldAlert,
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const demoAccounts = [
    {
      role: "Customer",
      email: "customer@kaamsaathi.pk",
      name: "Ahmad Jan",
      area: "Mingora, Swat",
      icon: User,
      target: "/customer/dashboard",
      color: "border-blue-300 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20",
    },
    {
      role: "Service Provider",
      email: "provider@kaamsaathi.pk",
      name: "Rashid Khan (Electrician)",
      area: "Saidu Sharif, Swat",
      icon: Wrench,
      target: "/provider/dashboard",
      color: "border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20",
    },
    {
      role: "Platform Admin",
      email: "admin@kaamsaathi.pk",
      name: "University of Swat Admin",
      area: "Department of CS & SE",
      icon: ShieldAlert,
      target: "/admin/dashboard",
      color: "border-amber-300 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20",
    },
  ];

  const handleLogin = async (loginEmail?: string, targetRoute?: string) => {
    const emailToUse = loginEmail || email;
    if (!emailToUse.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email: emailToUse }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store current user in localStorage for client-side role resolution
      localStorage.setItem("kaamsaathi_user", JSON.stringify(data.user));
      if (data.providerProfile) {
        localStorage.setItem(
          "kaamsaathi_provider_profile",
          JSON.stringify(data.providerProfile)
        );
      }

      if (targetRoute) {
        router.push(targetRoute);
      } else if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "provider") {
        router.push("/provider/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch (err: any) {
      setError("Server error during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-2">
          <Logo size="lg" showTagline={false} />
          <h1 className="font-heading font-extrabold text-2xl text-[#151515] dark:text-[#F2F7F4] pt-2">
            Welcome to KaamSaathi
          </h1>
          <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
            Sign in to manage your bookings, quotations, or administrative queue.
          </p>
        </div>

        {/* 1-Click Demo Accounts Section */}
        <div className="p-5 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C2E] dark:text-[#1EB55E]">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Fast Viva Demo Accounts (1-Click Instant Login)</span>
          </div>
          <p className="text-[11px] text-[#3E4F47] dark:text-[#B8C9C0]">
            Select any predefined role below to instantly explore corresponding features without entering credentials:
          </p>

          <div className="space-y-2 pt-1">
            {demoAccounts.map((demo) => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => handleLogin(demo.email, demo.target)}
                  className={`w-full p-3 rounded-2xl border ${demo.color} text-left flex items-center justify-between transition-all hover:scale-[1.01] active:scale-95`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#111F18] border border-[#D8E4DC] dark:border-[#24382E] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E]" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-[#151515] dark:text-[#F2F7F4]">
                        {demo.role} Demo
                      </div>
                      <div className="text-[10px] text-[#3E4F47] dark:text-[#B8C9C0]">
                        {demo.name} • {demo.area}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3E4F47] dark:text-[#B8C9C0]" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Standard Email Login Form */}
        <div className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-4">
          <div className="text-xs font-bold text-[#151515] dark:text-[#F2F7F4] uppercase tracking-wider">
            Or Login with Registered Email
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-3 text-xs"
          >
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In to Account"}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#0A5C2E] dark:text-[#1EB55E] hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
