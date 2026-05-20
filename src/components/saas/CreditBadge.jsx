export function CreditBadge({ credits }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-50 border border-neutral-200 text-neutral-700 rounded-sm text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow"></span>
      <span>{credits} credits</span>
    </div>
  );
}
