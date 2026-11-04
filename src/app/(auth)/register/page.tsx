"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Wrench, Mail, Phone, MapPin, Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "provider">("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mingora");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const swatAreas = ["Mingora", "Saidu Sharif", "Kanju", "Barikot", "Madyan", "Fizagat"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          role,
          fullName,
          email,
          phone,
          city,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("kaamsaathi_user", JSON.stringify(data.user));
      if (data.providerProfile) {
        localStorage.setItem(
          "kaamsaathi_provider_profile",
          JSON.stringify(data.providerProfile)
        );
      }

      if (role === "provider") {
        router.push("/provider/dashboard");
      } else {
        router.push("/customer/dashboard");
      }
    } catch {
      setError("Server error during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Logo size="lg" showTagline={false} />
          <h1 className="font-heading font-extrabold text-2xl text-[#151515] dark:text-[#F2F7F4] pt-2">
            Create Your Account
          </h1>
          <p className="text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
            Join the verified local services network launching in Swat Valley.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#EDF4F0] dark:bg-[#192D23]">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === "customer"
                ? "bg-white dark:bg-[#111F18] text-[#0A5C2E] dark:text-[#1EB55E] shadow-sm"
                : "text-[#3E4F47] dark:text-[#B8C9C0]"
            }`}
          >
            <User className="w-4 h-4" />
            <span>I Need Services</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("provider")}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              role === "provider"
                ? "bg-white dark:bg-[#111F18] text-[#0A5C2E] dark:text-[#1EB55E] shadow-sm"
                : "text-[#3E4F47] dark:text-[#B8C9C0]"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>I am a Technician</span>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 rounded-3xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] shadow-card space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Bakht Zada Khan"
                className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.pk"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0345-XXXXXXX"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                  Area in Swat *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-white dark:bg-[#111F18] text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600 font-semibold"
                >
                  {swatAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#151515] dark:text-[#F2F7F4] mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#3E4F47] dark:text-[#B8C9C0]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8E4DC] dark:border-[#24382E] bg-transparent text-[#151515] dark:text-[#F2F7F4] focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {role === "provider" && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-[#3E4F47] dark:text-[#B8C9C0] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0A5C2E] dark:text-[#1EB55E] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Notice for Service Providers:</strong> After registration, you must upload
                  your NADRA CNIC front/back and skill certificate to receive the Verified Ustad badge.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-[#0A5C2E] hover:bg-[#064A25] text-white font-extrabold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Complete Registration"}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#3E4F47] dark:text-[#B8C9C0]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#0A5C2E] dark:text-[#1EB55E] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
