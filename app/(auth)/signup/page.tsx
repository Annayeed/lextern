"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/actions";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
      <h1 className="text-xl font-semibold text-white mb-1">Create your account</h1>
      <p className="text-sm text-white/50 mb-6">Start tracking internships in 60 seconds</p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Full name</label>
          <input
            type="text"
            name="full_name"
            required
            placeholder="Udbhav Sharma"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm
                       text-white placeholder-white/30 focus:border-amber-gold/50 focus:outline-none
                       focus:ring-2 focus:ring-amber-gold/20 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Email address</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@college.edu"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm
                       text-white placeholder-white/30 focus:border-amber-gold/50 focus:outline-none
                       focus:ring-2 focus:ring-amber-gold/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">College</label>
            <input
              type="text"
              name="college"
              required
              placeholder="NLSIU Bangalore"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm
                         text-white placeholder-white/30 focus:border-amber-gold/50 focus:outline-none
                         focus:ring-2 focus:ring-amber-gold/20 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Year</label>
            <select
              name="year_of_study"
              required
              className="w-full rounded-lg border border-white/10 bg-navy-900 px-3.5 py-2.5 text-sm
                         text-white focus:border-amber-gold/50 focus:outline-none
                         focus:ring-2 focus:ring-amber-gold/20 transition-colors"
            >
              <option value="">Select</option>
              <option value="1">1st year</option>
              <option value="2">2nd year</option>
              <option value="3">3rd year</option>
              <option value="4">4th year</option>
              <option value="5">5th year</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              minLength={8}
              placeholder="Min 8 characters"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 pr-10 text-sm
                         text-white placeholder-white/30 focus:border-amber-gold/50 focus:outline-none
                         focus:ring-2 focus:ring-amber-gold/20 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-gold px-4 py-2.5
                     text-sm font-medium text-navy-900 transition-all hover:bg-amber-dark
                     active:scale-[0.98] disabled:opacity-60 mt-2"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/30 border-t-navy-900" />
          ) : (
            <UserPlus size={16} />
          )}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/40">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-gold hover:text-amber-light font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
