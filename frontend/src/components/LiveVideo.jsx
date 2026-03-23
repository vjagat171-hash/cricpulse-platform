export default function LiveVideo({ embedUrl, title = "Live Match Video" }) {
  const isValidEmbed =
    typeof embedUrl === "string" &&
    embedUrl.trim() !== "" &&
    (
      embedUrl.includes("youtube.com/embed/") ||
      embedUrl.includes("player.vimeo.com/video/")
    );

  if (!embedUrl || !isValidEmbed) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-300">
        <p className="text-lg font-semibold text-white">Official live video unavailable</p>
        <p className="mt-2 text-sm text-slate-400">
          Abhi sirf live score, batter-vs-bowler details, aur match insights show honge.
        </p>
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
