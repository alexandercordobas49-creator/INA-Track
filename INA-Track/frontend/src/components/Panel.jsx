export default function Panel({ title, children }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_55px_-24px_rgba(15,23,42,0.35)] backdrop-blur transition-shadow duration-300 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.4)]">
      {title && <h3 className="mb-6 text-xl font-bold text-slate-900">{title}</h3>}
      {children}
    </section>
  );
}
