export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-card bg-ink text-caption font-semibold text-white">
              V
            </span>
            <span className="text-body font-semibold text-ink">VYRON</span>
          </div>
          <p className="mt-3 text-small text-ink-muted">
            A Smart India Hackathon 26178 entry. Built for authorities, responders, analysts, and
            citizens of India.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { href: "/dashboard", label: "Authority dashboard" },
            { href: "/dashboard/responder", label: "Field responder" },
            { href: "/dashboard/analytics", label: "Analyst" },
            { href: "/citizen", label: "Citizen PWA" },
          ]}
        />
        <FooterCol
          title="Resources"
          links={[
            { href: "/docs", label: "Brief" },
            { href: "/docs#architecture", label: "Architecture" },
            { href: "/docs#data", label: "Data sources" },
            { href: "/signin", label: "Sign in" },
          ]}
        />
        <FooterCol
          title="Team"
          links={[
            { href: "/docs#team", label: "About us" },
            { href: "mailto:team@vyron.example.com", label: "Contact" },
          ]}
        />
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-2 px-6 py-4 text-caption text-ink-muted md:flex-row md:items-center">
          <p>© 2026 VYRON. Hackathon prototype.</p>
          <p>
            Data shown is simulated. Map tiles by Mapbox / OpenStreetMap contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="text-caption font-medium uppercase tracking-wide text-ink-muted">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-small text-ink transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
