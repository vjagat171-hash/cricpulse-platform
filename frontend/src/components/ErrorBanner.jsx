export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
      {message}
    </div>
  );
}
