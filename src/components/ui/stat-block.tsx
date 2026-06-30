type StatBlockProps = {
  value: string;
  label: string;
};

/** Bloque de métrica destacada (value grande + etiqueta). */
export function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="flex flex-col gap-1 text-center">
      <span className="font-display text-3xl font-extrabold tracking-tight text-gradient sm:text-4xl">
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
