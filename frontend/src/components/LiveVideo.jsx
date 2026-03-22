export default function LiveVideo({ embedUrl, title = "Live Match Video" }) {
  if (!embedUrl) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-300">
        Live video abhi available nahi hai.
      </div>
    );
  }

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
