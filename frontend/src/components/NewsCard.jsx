export default function NewsCard({ item }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
        <span>{item.tag}</span>
        <span>{item.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
    </article>
  );
}
