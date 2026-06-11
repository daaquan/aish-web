import { notFound } from "next/navigation";

import { InstallCommand } from "../InstallCommand";
import { getDictionary } from "../dictionaries";
import { hasLocale } from "../locale";
import { LangSwitcher } from "../../components/LangSwitcher";

const REPO = "https://github.com/daaquan/aish";
const RELEASES = "https://github.com/daaquan/aish/releases";
const SPECS = "https://github.com/daaquan/aish/tree/main/docs/superpowers/specs";
const CONTRIBUTING = "https://github.com/daaquan/aish/blob/main/CONTRIBUTING.md";
const CHANGELOG = "https://github.com/daaquan/aish/blob/main/CHANGELOG.md";

const FEATURE_TAGS = ["01", "02", "03"];

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { hero, install, features, footer } = dict;

  let step = 0;
  const delay = () => ({ animationDelay: `${(step++ * 80).toFixed(0)}ms` });

  return (
    <>
      <div className="bg-canvas" />

      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 sm:px-8">
        {/* Nav */}
        <header
          className="reveal flex items-center justify-between py-6"
          style={delay()}
        >
          <span className="font-mono text-[15px] font-semibold tracking-tight">
            <span className="text-accent">~</span>/aish
          </span>
          <nav className="flex items-center gap-5 text-sm">
            <LangSwitcher current={lang} />
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted transition-colors hover:text-text"
            >
              <GitHubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{footer.github}</span>
            </a>
          </nav>
        </header>

        {/* Hero */}
        <main className="flex flex-1 flex-col justify-center py-16">
          <div
            className="reveal mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3.5 py-1.5 font-mono text-xs text-muted"
            style={delay()}
          >
            <span className="pulse-dot relative inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.badge}
          </div>

          <h1
            className="reveal max-w-2xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
            style={delay()}
          >
            {hero.titlePre}
            <br />
            <span className="font-mono text-accent">{hero.titleAccent}</span>
            {hero.titleSuffix}
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={delay()}
          >
            {hero.subhead.map((run, i) =>
              run.code ? (
                <span key={i} className="font-mono text-text">
                  {run.text}
                </span>
              ) : (
                <span key={i}>{run.text}</span>
              ),
            )}
          </p>

          <div className="reveal mt-8 max-w-xl" style={delay()}>
            <InstallCommand
              copyLabel={install.copy}
              copiedLabel={install.copied}
              ariaLabel={install.ariaCopy}
            />
            <p className="mt-2 font-mono text-xs text-faint">
              {hero.installCaption}
            </p>
          </div>

          <div
            className="reveal mt-7 flex flex-col gap-3 sm:flex-row"
            style={delay()}
          >
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              <GitHubIcon className="h-4 w-4" />
              {hero.starButton}
            </a>
            <a
              href={SPECS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center rounded-md border border-[var(--border-strong)] px-5 text-sm font-medium text-text transition-colors hover:bg-[var(--panel-2)]"
            >
              {hero.specsButton}
            </a>
          </div>

          {/* Terminal mock — literal CLI output, intentionally not localized */}
          <div
            className="reveal mt-14 w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]"
            style={delay()}
          >
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-faint">aish — zsh</span>
              <span className="ml-auto rounded border border-[var(--border-strong)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                v0.6
              </span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p>
                <span className="text-faint">$ </span>
                <span className="text-text">git add -A &amp;&amp; aish commit --signoff</span>
              </p>
              <p className="text-muted">
                <span className="text-faint">→</span> reading staged diff · model:
                claude-opus-4-8
              </p>
              <p className="pt-1 text-text">feat(provider): add Gemini adapter</p>
              <p className="text-muted">
                Implements the third API shape behind the Provider trait, with
                401/429 error mapping and a wiremock test.
              </p>
              <p className="text-faint">Signed-off-by: daaquan &lt;…&gt;</p>
              <p className="pt-1 text-muted">
                Accept? <span className="text-text">[Y/n/e(dit)]</span>{" "}
                <span className="cursor align-middle" />
              </p>
            </div>
          </div>
        </main>

        {/* Features */}
        <section
          aria-labelledby="features-heading"
          className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3"
        >
          <h2 id="features-heading" className="sr-only">
            {features.heading}
          </h2>
          {features.items.map((f, i) => (
            <div
              key={FEATURE_TAGS[i]}
              className="reveal flex flex-col bg-[var(--panel)] p-6"
              style={delay()}
            >
              <span className="font-mono text-xs text-accent">
                {FEATURE_TAGS[i]}
              </span>
              <h3 className="mt-3 text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer
          className="reveal mt-10 flex flex-col gap-3 border-t border-[var(--border)] py-7 font-mono text-xs text-faint sm:flex-row sm:items-center sm:justify-between"
          style={delay()}
        >
          <span>{footer.license}</span>
          <div className="flex items-center gap-5">
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text">
              {footer.github}
            </a>
            <a href={RELEASES} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text">
              {footer.releases}
            </a>
            <a href={CHANGELOG} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text">
              {footer.changelog}
            </a>
            <a href={CONTRIBUTING} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text">
              {footer.contributing}
            </a>
            <a href={SPECS} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text">
              {footer.specs}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
