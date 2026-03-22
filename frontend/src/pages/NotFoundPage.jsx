import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-300">
        Requested page available nahi thi, isliye fallback route add kiya gaya hai.
      </p>
      <Link to="/" className="mt-6 rounded-full bg-emerald-400 px-5 py-3 font-medium text-slate-950">
        Back to home
      </Link>
    </div>
  );
}
