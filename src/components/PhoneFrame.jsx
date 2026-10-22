// A clean, minimal phone frame that wraps a real app screenshot.
export default function PhoneFrame({ src, alt, className = "", style, priority = false }) {
  return (
    <div className={`relative ${className}`} style={style}>
      <div className="rounded-[2rem] bg-[#0f1830] p-2 ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]">
        <div className="overflow-hidden rounded-[1.6rem] bg-black">
          <img
            src={src}
            alt={alt}
            width={560}
            height={1213}
            loading={priority ? "eager" : "lazy"}
            className="block w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
