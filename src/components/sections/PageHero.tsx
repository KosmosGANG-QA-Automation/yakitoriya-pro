export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
      <div className="container-x relative py-20 sm:py-28">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-5xl font-bold leading-tight sm:text-6xl">
          {title}
        </h1>
        {text && <p className="mt-6 max-w-2xl text-lg text-white/70">{text}</p>}
      </div>
    </section>
  );
}
