export default function LiveVideo({
  embedUrl,
  hotstarUrl,
  title = "Live Match Video",
}) {
  const isEmbeddable =
    typeof embedUrl === "string" &&
    embedUrl.trim() !== "" &&
    (embedUrl.includes("youtube.com/embed/") ||
      embedUrl.includes("player.vimeo.com/video/"));

  const hasHotstarLink =
    typeof hotstarUrl === "string" && hotstarUrl.includes("hotstar.com");

  if (isEmbeddable) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 text-center shadow-xl">
      <p className="text-lg font-semibold text-white">Official live video</p>
      <p className="mt-2 text-sm text-slate-400">
        Live score, batting stats, and match insights yahin rahenge.
      </p>

      {hasHotstarLink ? (
        <a
          href={hotstarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Watch on Hotstar
        </a>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-4 py-4 text-sm text-slate-500">
          Official streaming link unavailable right now.
        </div>
      )}
    </div>
  );
}
