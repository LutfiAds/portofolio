export function Scanlines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03] [background-image:repeating-linear-gradient(to_bottom,rgba(63,248,255,0.9)_0px,rgba(63,248,255,0.9)_1px,transparent_1px,transparent_4px)] motion-safe:animate-scanlines motion-reduce:animate-none"
    />
  );
}
