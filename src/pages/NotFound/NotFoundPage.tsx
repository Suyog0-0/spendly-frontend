// src/pages/NotFound/NotFoundPage.tsx
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// import { Mail} from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full border border-white/5" />

      <div className="relative z-10 max-w-lg space-y-8 text-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mx-auto cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm font-medium text-soft-gray shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-[0_6px_20px_rgba(212,175,55,0.12)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-obsidian"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            strokeWidth={1.75}
          />
          <span>Go Back</span>
        </button>

        <h1 className="font-[Newsreader] text-[120px] leading-none tracking-tight text-primary-container drop-shadow-[0_0_20px_rgba(212,175,55,0.25)] sm:text-[160px]">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="font-[Newsreader] text-2xl font-medium text-on-surface">
            Lost in the Ledger
          </h2>
          <p className="text-sm text-soft-gray">
            The page you're looking for doesn't exist. It may have been moved,
            or the link might be incorrect.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-[0_8px_24px_rgba(212,175,55,0.25)] transition hover:brightness-110 sm:w-auto"
          >
            Return to Dashboard
          </Link>
          {/* <a
            href="#"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10 sm:w-auto"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            Contact Support
          </a> */}
        </div>
      </div>
    </div>
  );
};
