type Section = { id: string; title: string };

export default function CaseStudyLayout({
  title,
  sections,
  children,
}: {
  title: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-6xl px-4 pb-12 pt-[calc(var(--nav-height,64px)+32px)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 lg:sticky top-28 h-fit">
          <div className="rounded-lg border bg-background/50 p-4">
            <p className="text-sm font-semibold tracking-tight mb-3">On this page</p>
            <nav aria-label="Table of contents" className="space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-muted-foreground hover:text-primary"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article
          className="lg:col-span-9 prose prose-lg prose-invert [--anchor-offset:calc(var(--nav-height,64px)+16px)] prose-h2:scroll-mt-[var(--anchor-offset)] prose-h3:scroll-mt-[var(--anchor-offset)] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:marker:text-muted-foreground prose-hr:border-border"
        >
          <header className="not-prose mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          </header>
          {children}
        </article>
      </div>
    </div>
  );
}


