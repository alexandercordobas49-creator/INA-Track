export default function Panel({ title, children }) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {title && <h3 className="mb-6 text-xl font-bold text-neutral-900">{title}</h3>}
      {children}
    </section>
  );
}
