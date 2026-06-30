type IndustryChipProps = {
  label: string;
};

/** Chip de industria/sector. */
export function IndustryChip({ label }: IndustryChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent">
      {label}
    </span>
  );
}
