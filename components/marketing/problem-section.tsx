/**
 * Problem section — three concrete India hazard situations.
 * Numbers are specific, not generic "millions affected."
 */
export function ProblemSection() {
  const items = [
    {
      stat: "22 of 36",
      label: "states are flood-prone",
      body: "Assam and Bihar face seasonal floods that displace lakhs annually. Traditional warnings arrive after water has risen.",
    },
    {
      stat: "63%",
      label: "of forest fire alerts in India originate in Uttarakhand, Himachal, and central forests",
      body: "Detection today relies on satellite passes every 6 hours — too slow for a fast-moving ground fire.",
    },
    {
      stat: "300 µg/m³",
      label: "PM2.5 sustained in Delhi NCR each winter",
      body: "Citizens learn about bad air days after they have already happened. No localised, hour-level guidance exists at ward scale.",
    },
  ];
  return (
    <section id="problem" className="border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-content px-6 py-20">
        <h2 className="text-h1 text-ink">Why this matters</h2>
        <p className="mt-2 max-w-2xl text-body text-ink-muted">
          Three hazard patterns that current monitoring can&apos;t catch in time.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.label} className="flex flex-col gap-3 rounded-card border border-hairline bg-surface p-6">
              <p className="vyron-num text-display text-ink">{it.stat}</p>
              <p className="text-body font-medium text-ink">{it.label}</p>
              <p className="text-small text-ink-muted">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
