// src/pages/Login/LoginPage.tsx
import { Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4 font-sans text-on-surface">
      <main className="grid h-screen w-full gap-12 md:h-[85vh] md:grid-cols-2">
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
            {/* Heading */}
            <div className="mb-8">
              <h2 className="mb-1 font-[Newsreader] text-2xl font-medium text-on-surface sm:text-3xl">
                Welcome Back
              </h2>

              <p className="text-sm text-soft-gray">
                Log in to continue tracking your spending.
              </p>
            </div>

            <form className="w-full space-y-6">
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
                    autoComplete="email"
                    required
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
                    autoComplete="current-password"
                    required
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

                {/* Forgot password */}
                <div className="pt-1 text-right">
                  <a
                    href="#"
                    className="text-xs font-medium text-primary-container transition hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center pt-1">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-outline-soft bg-charcoal text-primary-container focus:ring-primary-container/50 focus:ring-offset-obsidian"
                />

                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-soft-gray"
                >
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-primary-container px-6 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition hover:bg-primary"
                >
                  Log In
                </button>
              </div>
            </form>

            {/* Register link */}
            <div className="mt-8 text-center md:text-left">
              <p className="text-sm text-soft-gray">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="ml-1 border-b border-primary-container/30 pb-0.5 text-sm font-semibold text-primary-container transition hover:border-primary hover:text-primary"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
