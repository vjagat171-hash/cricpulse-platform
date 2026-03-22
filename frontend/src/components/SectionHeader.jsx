export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
        {eyebrow}
      </span>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-sm text-slate-400 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
