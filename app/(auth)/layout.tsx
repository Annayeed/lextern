export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex items-center justify-center p-4">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 w-full max-w-md">
        {/* Logo mark */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-gold">
              <span className="text-lg font-bold text-navy-900">L</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-white">
              LexTern
            </span>
          </div>
          <p className="mt-2 text-sm text-navy-600/60 text-white/50">
            Internship OS for law students
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
