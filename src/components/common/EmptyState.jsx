export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-lasa-200 bg-white px-6 py-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-lasa-600">{title}</h3>
      {description && <p className="mt-2 text-sm text-lasa-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
