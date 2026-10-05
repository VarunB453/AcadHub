export default function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dark Ambient Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Left Glowing Indigo Orb */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-600/40 via-purple-600/20 to-transparent blur-[120px] animate-pulse duration-10000" />

      {/* Bottom Right Glowing Cyan Orb */}
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-cyan-500/35 via-blue-600/20 to-transparent blur-[140px] animate-pulse duration-7000" />

      {/* Center Ambient Magenta Spark */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-violet-600/25 to-pink-500/15 blur-[100px] animate-pulse duration-9000" />

      {/* Top Right Subtle Teal Accent */}
      <div className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full bg-teal-500/15 blur-[90px]" />
    </div>
  );
}