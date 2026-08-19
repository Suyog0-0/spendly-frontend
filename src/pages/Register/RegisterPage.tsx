// src/pages/Register/RegisterPage.tsx
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye } from "lucide-react";

export const RegisterPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-4 font-sans text-on-surface">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[50vw] w-[50vw] rounded-full bg-surface-high/20 blur-[100px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[40vw] w-[40vw] rounded-full bg-surface-container/30 blur-[120px]" />
      </div>

      <main className="z-10 grid h-screen w-full max-w-300px gap-12 md:h-[85vh] md:grid-cols-2">
        {/* Left column — branding + image */}
        <div className="relative hidden flex-col justify-between overflow-hidden rounded-2xl border border-white/10 md:flex">
          <img
            src="https://images.unsplash.com/photo-1550053808-52a75a05955d?w=1200&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/60 to-obsidian/30" />

          <div className="relative z-10 p-12">
            <h1 className="font-[Newsreader] text-4xl font-semibold tracking-tight text-primary">
              Spendly
            </h1>
            <p className="mt-2 text-sm text-soft-gray">Personal Finance</p>
          </div>

          <div className="relative z-10 p-12">
            <blockquote className="border-l-2 border-primary-container pl-6">
              <p className="font-[Newsreader] text-2xl text-on-surface">
                "Every rupee, accounted for."
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right column — form */}
        <div className="mx-auto flex h-full w-full max-w-md flex-col items-center justify-center overflow-y-auto px-4 py-8 md:items-start md:px-0">
          {/* Mobile branding */}
          <div className="mb-8 w-full text-center md:hidden">
            <h1 className="font-[Newsreader] text-3xl font-semibold tracking-tight text-primary">
              Spendly
            </h1>
            <p className="text-sm text-soft-gray">Personal Finance</p>
          </div>

          <div className="w-full">
            <div className="mb-8">
              <h2 className="mb-1 font-[Newsreader] text-2xl font-medium text-on-surface sm:text-3xl">
                Create Your Account
              </h2>
              <p className="text-sm text-soft-gray">
                Start tracking your spending in minutes.
              </p>
            </div>

            <form className="w-full space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs font-bold uppercase tracking-wider text-soft-gray"
                >
                  Full Name
                </label>
                <div className="relative border-b border-outline-soft transition-colors focus-within:border-primary">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <User
                      className="h-5 w-5 text-soft-gray"
                      strokeWidth={1.75}
                    />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ram Sigdel"
                    className="block w-full bg-transparent py-3 pl-8 text-sm text-on-surface placeholder:text-surface-high focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-soft-gray"
                >
                  Email Address
                </label>
                <div className="relative border-b border-outline-soft transition-colors focus-within:border-primary">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <Mail
                      className="h-5 w-5 text-soft-gray"
                      strokeWidth={1.75}
                    />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="block w-full bg-transparent py-3 pl-8 text-sm text-on-surface placeholder:text-surface-high focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-soft-gray"
                >
                  Password
                </label>
                <div className="relative border-b border-outline-soft transition-colors focus-within:border-primary">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <Lock
                      className="h-5 w-5 text-soft-gray"
                      strokeWidth={1.75}
                    />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full bg-transparent py-3 pl-8 pr-8 text-sm tracking-[0.2em] text-on-surface placeholder:text-surface-high focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Show password"
                    className="absolute inset-y-0 right-0 flex items-center pr-1 text-soft-gray transition hover:text-on-surface"
                  >
                    <Eye className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-bold uppercase tracking-wider text-soft-gray"
                >
                  Confirm Password
                </label>
                <div className="relative border-b border-outline-soft transition-colors focus-within:border-primary">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-1">
                    <Lock
                      className="h-5 w-5 text-soft-gray"
                      strokeWidth={1.75}
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full bg-transparent py-3 pl-8 pr-8 text-sm tracking-[0.2em] text-on-surface placeholder:text-surface-high focus:outline-none"
                  />
                  <button
                    type="button"
                    aria-label="Show confirm password"
                    className="absolute inset-y-0 right-0 flex items-center pr-1 text-soft-gray transition hover:text-on-surface"
                  >
                    <Eye className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center pt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-outline-soft bg-charcoal text-primary-container focus:ring-primary-container/50 focus:ring-offset-obsidian"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-soft-gray">
                  I agree to the Terms and Privacy Policy
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-primary-container px-6 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian shadow-[0_0_20px_rgba(212,175,55,0.15)] transition hover:bg-primary hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 text-center md:text-left">
              <p className="text-sm text-soft-gray">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="ml-1 border-b border-primary-container/30 pb-0.5 text-sm font-semibold text-primary-container transition hover:border-primary hover:text-primary"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
