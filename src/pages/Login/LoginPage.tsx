// src/pages/Login/LoginPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchema";

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("Login failed:", result.message);
        return;
      }

      localStorage.setItem("token", result.token);
      console.log("Login successful:", result);

      navigate("/");
    } catch (err) {
      console.log("Network error:", err);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian p-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary-container/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-primary-container/5 blur-[150px]" />
      </div>

      <main className="relative z-10 w-full max-w-100">
        <div className="mb-10 text-center">
          <h1 className="font-[Newsreader] text-3xl font-medium tracking-tight text-primary">
            Spendly
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-soft-gray">
            Personal Finance
          </p>
        </div>

        <div className="rounded-2xl border border-outline-soft bg-surface-low p-8">
          <div className="mb-8">
            <h2 className="font-[Newsreader] text-2xl font-medium text-on-surface">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-soft-gray">
              Log in to continue tracking your spending.
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-soft-gray"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full rounded-lg border border-outline-soft bg-surface-container px-3.5 py-2.5 text-sm text-on-surface placeholder:text-soft-gray/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wide text-soft-gray"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-primary transition-colors hover:text-primary-container"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-lg border border-outline-soft bg-surface-container px-3.5 py-2.5 pr-10 text-sm text-on-surface placeholder:text-soft-gray/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  aria-label="Show password"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-soft-gray transition-colors hover:text-on-surface"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 text-sm text-soft-gray">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-outline-soft bg-surface-container text-primary focus:ring-primary/50 focus:ring-offset-surface-low"
              />
              Remember me
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-on-primary shadow-[0_8px_24px_rgba(212,175,55,0.2)] transition hover:brightness-110"
            >
              Log in
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-soft-gray">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition-colors hover:text-primary-container"
          >
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
};
