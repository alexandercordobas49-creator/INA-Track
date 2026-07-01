export default function ModuleHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 max-w-3xl rounded-[2rem] border border-slate-200/80 bg-white/70 p-6 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">{eyebrow}</p>
      <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 font-medium text-slate-600">{description}</p>
    </div>
  );
}
