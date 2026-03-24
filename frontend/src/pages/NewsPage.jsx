import SectionHeader from "../components/SectionHeader";

export default function NewsPage({ news = [] }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="News"
        title="Latest cricket storylines"
        description="Analysis cards aur short read blocks homepage se aligned premium style me."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {news.length ? (
          news.map((item) => (
            <article key={item.id} className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                  {item.tag}
                </span>
                <span className="text-sm text-slate-500">{item.readTime}</span>
              </div>

              <h3 className="mt-5 text-2xl font-black leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Match trends, batting pressure, and quick sports updates ke liye is card layout ko future API-driven news feed me bhi use kiya ja sakta hai.
              </p>

              <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                Read insight
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-900/70 p-10 text-center text-slate-400 lg:col-span-2">
            No news available right now.
          </div>
        )}
      </div>
    </div>
  );
}
