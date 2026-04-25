import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Open Instagram Settings",
    detail:
      "On mobile, tap your profile picture → the hamburger menu (☰) → Settings and privacy. On desktop, click your profile photo → Settings.",
  },
  {
    n: "02",
    title: "Navigate to Your Activity",
    detail:
      'Scroll down and tap "Your activity", then choose "Download your information" → "Download or transfer information".',
  },
  {
    n: "03",
    title: "Select Some of your information",
    detail:
      'Instagram will ask what to include. Choose "Some of your information" to keep the download small and fast.',
  },
  {
    n: "04",
    title: 'Check "Followers and following"',
    detail:
      'Scroll to the Connections section and tick "Followers and following". Uncheck everything else — you only need this.',
  },
  {
    n: "05",
    title: "Configure the download",
    detail:
      'Tap Next → select "Download to device". Set the date range to "All time" and, critically, set the format to JSON.',
    highlight: "Format must be JSON, not HTML.",
  },
  {
    n: "06",
    title: "Request and receive the file",
    detail:
      "Tap Create files. Instagram will email you when the archive is ready — usually within a few minutes. Download the ZIP from that email or from the same Download your information screen.",
  },
  {
    n: "07",
    title: "Unzip and locate the files",
    detail: "Extract the ZIP. Inside you will find two files:",
    files: [
      "followers_and_following / followers_1.json",
      "followers_and_following / following.json",
    ],
  },
];

const HowToExport = () => (
  <main className="max-w-[860px] mx-auto px-7 pt-[72px] pb-[140px]">
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
      <h1 className="font-serif text-[clamp(48px,9vw,96px)] font-black leading-[0.92] tracking-[-0.02em] animate-rise [animation-delay:100ms]">
        How to<br />
        <em className="italic text-rose">export</em>
        <br />
        your data
      </h1>
      <p className="mt-7 text-[16px] leading-[1.85] text-ink/55 max-w-[420px] animate-rise [animation-delay:180ms]">
        Instagram lets you download a full copy of your account data. Follow
        these steps to get the two JSON files this tool needs.
      </p>
    </header>

    <div className="my-10 h-px bg-gradient-to-r from-edge to-transparent animate-rise [animation-delay:240ms]" />

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
              <p className="mt-3 text-[12px] tracking-[0.1em] uppercase text-rose">
                ↳ {step.highlight}
              </p>
            )}

            {step.files && (
              <ul className="mt-4 flex flex-col gap-2">
                {step.files.map((f) => (
                  <li
                    key={f}
                    className="inline-flex items-center gap-2 text-[12px] text-rose/80 tracking-[0.04em] border border-rose/15 bg-rose/4 rounded-sm px-3 py-[7px] w-fit"
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

    <div className="mt-14 p-6 border border-edge rounded-sm bg-surface">
      <p className="text-[12px] tracking-[0.2em] uppercase text-dim mb-3">
        // ready to analyse?
      </p>
      <p className="text-[16px] leading-[1.85] text-ink/55 mb-5">
        Once you have both JSON files, head back and drop them into the upload
        zones.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 py-[13px] px-[30px] bg-rose text-canvas rounded-sm font-mono text-[12px] tracking-[0.18em] uppercase font-medium no-underline transition-[opacity,transform] duration-200 hover:opacity-85 hover:-translate-y-0.5"
      >
        <span>→</span>
        <span>Go to analyser</span>
      </Link>
    </div>
  </main>
);

export default HowToExport;
