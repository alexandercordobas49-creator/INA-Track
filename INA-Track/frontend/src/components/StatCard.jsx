export default function StatCard({ label, value, detail }) {
  return (
    <article className="group rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50 p-6 shadow-[0_20px_55px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-22px_rgba(15,23,42,0.4)]">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">{label}</p>
      <p className="mt-3 text-4xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-cyan-700 bg-clip-text text-transparent">{value}</p>
      <p className="mt-3 text-sm font-medium text-slate-600">{detail}</p>
    </article>
  );
}
