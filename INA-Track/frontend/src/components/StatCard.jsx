export default function StatCard({ label, value, detail }) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">{label}</p>
      <p className="mt-3 text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">{value}</p>
      <p className="mt-3 text-sm font-medium text-neutral-600">{detail}</p>
    </article>
  );
}
