export default function ModuleHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="text-sm font-bold uppercase tracking-widest text-primary-600 mb-2">{eyebrow}</p>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-neutral-600 font-medium">{description}</p>
    </div>
  );
}
