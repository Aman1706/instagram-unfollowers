import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Open Accounts Center",
    detail:
      "On mobile, tap the hamburger menu (☰) on your profile → Accounts Center. On desktop, click the settings icon → Settings and privacy → Accounts Center.",
  },
  {
    n: "02",
    title: "Your Information and Permissions",
    detail:
      'Inside Accounts Center, tap "Your Information and Permissions".',
  },
  {
    n: "03",
    title: "Export your information",
    detail: 'Choose "Export your information" from the list of options.',
  },
  {
    n: "04",
    title: "Create Export",
    detail:
      'Tap "Create Export". Instagram will ask which account and what to include — pick only "Followers and following" under Connections to keep things small.',
  },
  {
    n: "05",
    title: "Export to Device",
    detail:
      'Choose "Export to Device" as the destination. This downloads the archive directly instead of sending it to a transfer service.',
  },
  {
    n: "06",
    title: "Configure and submit",
    detail:
      'Set the date range to "All time", format to JSON, and pick your preferred quality. Confirm your email so Instagram can notify you when the export is ready.',
    highlight: "Format must be JSON, not HTML.",
  },
  {
    n: "07",
    title: "Download, unzip, locate the files",
    detail:
      "Instagram will email you when the archive is ready — usually within a few minutes. Download the ZIP, extract it, and find these two files inside:",
    files: [
      "followers_and_following / followers_1.json",
      "followers_and_following / following.json",
    ],
  },
];

const HowToExport = () => (
  <main className="max-w-215 mx-auto px-7 pt-18 pb-35">
    <div className="mb-10 animate-rise [animation-delay:0ms]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-dim no-underline transition-colors duration-150 hover:text-rose"
      >
        <span>←</span>
        <span>Back</span>
      </Link>
    </div>

    <header>
      <p className="text-[12px] tracking-[0.3em] uppercase text-rose mb-6 animate-rise [animation-delay:40ms]">
        Instagram · Data Export Guide
      </p>
      <h1 className="font-serif text-[clamp(48px,9vw,96px)] font-black leading-[0.92] tracking-[-0.01em] animate-rise [animation-delay:100ms]">
        How to<br />
        <em className="italic text-rose">export</em>
        <br />
        your data
      </h1>
      <p className="mt-7 text-[16px] leading-[1.85] text-ink/55 max-w-105 animate-rise [animation-delay:180ms]">
        Instagram lets you download a full copy of your account data. Follow
        these steps to get the two JSON files this tool needs.
      </p>
    </header>

    <div className="my-10 h-px bg-linear-to-r from-edge to-transparent animate-rise [animation-delay:240ms]" />

    <span className="text-[12px] tracking-[0.25em] uppercase text-dim mb-8 block animate-rise [animation-delay:280ms]">
      // seven steps
    </span>

    <ol className="flex flex-col gap-0 animate-rise [animation-delay:340ms]">
      {steps.map((step, i) => (
        <li
          key={step.n}
          className="flex gap-6 py-7 border-b border-edge last:border-b-0 group"
          style={{ animationDelay: `${340 + i * 60}ms` }}
        >
          <span className="font-serif text-[28px] font-black leading-none text-edge group-hover:text-rose/40 transition-colors duration-300 shrink-0 w-10 pt-0.5 select-none">
            {step.n}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-serif text-[18px] font-bold text-ink mb-2 leading-snug">
              {step.title}
            </p>
            <p className="text-[16px] leading-[1.85] text-ink/55">{step.detail}</p>

            {step.highlight && (
              <p className="mt-3 text-[12px] tracking-widest uppercase text-rose">
                ↳ {step.highlight}
              </p>
            )}

            {step.files && (
              <ul className="mt-4 flex flex-col gap-2">
                {step.files.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-2 text-[12px] text-rose/80 tracking-[0.04em] border border-rose/15 bg-rose/4 rounded-sm px-3 py-1.75 w-fit"
                  >
                    <span className="text-rose/40">↳</span>
                    <span className="font-mono">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>

    <div className="mt-14 p-6 border border-edge rounded-sm bg-surface flex flex-col items-center text-center sm:items-start sm:text-left">
      <p className="text-[12px] tracking-[0.2em] uppercase text-dim mb-3">
        // ready to analyse?
      </p>
      <p className="text-[16px] leading-[1.85] text-ink/55 mb-5">
        Once you have both JSON files, head back and drop them into the upload
        zones.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 py-3.25 px-7.5 bg-rose text-canvas rounded-sm font-mono text-[12px] tracking-[0.18em] uppercase font-medium no-underline transition-[opacity,transform] duration-200 hover:opacity-85 hover:-translate-y-0.5"
      >
        <span>→</span>
        <span>Go to analyser</span>
      </Link>
    </div>
  </main>
);

export default HowToExport;
