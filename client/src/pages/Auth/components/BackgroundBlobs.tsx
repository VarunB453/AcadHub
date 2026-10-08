export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Top-left deep indigo orb */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-700/50 via-purple-700/25 to-transparent blur-[130px]" />

      {/* Bottom-right cyan orb */}
      <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-cyan-500/40 via-blue-700/20 to-transparent blur-[150px]" />

      {/* Mid-left violet spark */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-violet-600/30 to-pink-500/10 blur-[110px]" />

      {/* Top-right teal accent */}
      <div className="absolute top-0 right-1/3 w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[100px]" />

      {/* Subtle center bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-800/15 to-indigo-900/10 blur-[120px]" />
    </div>
  );
}