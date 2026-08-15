const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center text-center gap-2 py-16 px-4">
    <h3 className="font-display font-semibold text-lg text-ink">{title}</h3>
    <p className="text-sm text-ink-soft max-w-sm">{description}</p>
    {action}
  </div>
);

export default EmptyState;
