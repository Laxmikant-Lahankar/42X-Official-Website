import { Sparkles, BookOpen } from "lucide-react";

export function BlogImage({
  src,
  alt,
  priority = false,
  className = "",
  aspectClassName = "aspect-video",
}: {
  src?: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectClassName?: string;
}) {
  const hasValidImage = Boolean(src && src.trim().length > 0);

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClassName} ${className}`}
    >
      {hasValidImage ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src!}
          alt={alt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        /* Fallback Placeholder Visual */
        <div className="relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#121624] via-[#0d0f17] to-[#07080b]">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* Radial Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(59,130,246,0.22),rgba(147,51,234,0.1),transparent_75%)]" />

          {/* Center Graphic */}
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-blue-500/35 bg-gradient-to-br from-blue-500/20 to-purple-600/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-md">
              <BookOpen className="size-6 text-blue-400" />
              <span className="absolute -right-1 -top-1 flex size-3">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-blue-500" />
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
              <Sparkles className="size-3 text-blue-400" />
              <span>42X Academy Editorial</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtle overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
