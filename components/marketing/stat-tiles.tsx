/**
 * StatTiles — three numbers, three labels. No "01 / 02 / 03" markers.
 * Number first, label below, hairline divider between tiles.
 */
export function StatTiles() {
  const tiles = [
    { value: "12,438", label: "sensors online across 14 states" },
    { value: "47 sec", label: "average time-to-first-alert" },
    { value: "1,847", label: "alerts issued this monsoon season" },
  ];
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="mx-auto grid max-w-content grid-cols-1 divide-y divide-hairline px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {tiles.map((t) => (
          <div key={t.label} className="px-2 py-10 md:px-8">
            <p className="vyron-num text-display text-ink">{t.value}</p>
            <p className="mt-2 text-small text-ink-muted">{t.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
