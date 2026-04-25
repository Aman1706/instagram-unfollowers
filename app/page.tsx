"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useInstagramAnalysis } from "@/hooks/useInstagramAnalysis";
import { UploadZone } from "@/components/UploadZone";

const Home = () => {
  const {
    followers,
    following,
    followersState,
    followingState,
    unfollowers,
    analyzed,
    setFollowers,
    setFollowing,
    setFollowersState,
    setFollowingState,
    handleFile,
    handleAnalyze,
    handleReset,
    resetKey,
  } = useInstagramAnalysis();

  const canAnalyze = followersState === "loaded" && followingState === "loaded";
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (analyzed && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analyzed, unfollowers]);

  return (
    <main className="max-w-[860px] mx-auto px-7 pt-[72px] pb-[140px]">
      <header>
        <p className="text-[12px] tracking-[0.3em] uppercase text-rose mb-6 animate-rise [animation-delay:0ms]">
          Instagram · Unfollower Audit
        </p>
        <h1 className="font-serif text-[clamp(56px,10vw,104px)] font-black leading-[0.92] tracking-[-0.02em] animate-rise [animation-delay:80ms]">
          Who<br /><em className="italic text-rose">ghosted</em><br />you back?
        </h1>
        <p className="mt-7 text-[16px] leading-[1.85] text-ink/55 max-w-[420px] animate-rise [animation-delay:160ms]">
          Upload your Instagram data export to reveal everyone you follow
          that doesn&apos;t follow you back. Runs entirely in your browser — no
          logins, no API calls.
        </p>
      </header>

      <div className="my-5 h-px bg-gradient-to-r from-edge to-transparent animate-rise [animation-delay:220ms]" />

      <div className="flex flex-col gap-5 md:flex-row items-start md:items-center justify-between mb-5 animate-rise [animation-delay:280ms]">
        <span className="text-[12px] tracking-[0.25em] uppercase text-dim">
          // upload your export files
        </span>
        <Link
          href="/how-to-export"
          className="text-[12px] tracking-[0.15em] uppercase text-rose no-underline transition-colors duration-150 hover:text-rose"
        >
          How to export ↗
        </Link>
      </div>

      <div key={resetKey} className="grid grid-cols-2 gap-3 max-sm:grid-cols-1 animate-rise [animation-delay:340ms]">
        <UploadZone
          title="Followers"
          path="followers_and_following / followers_1.json"
          state={followersState}
          icon={followersState === "loaded" ? "✓" : followersState === "idle" ? "↓" : "✕"}
          count={followers?.length}
          onFile={(f) => handleFile(f, setFollowers, setFollowersState, "followers_1.json")}
          onClear={() => { setFollowers(null); setFollowersState("idle"); }}
        />
        <UploadZone
          title="Following"
          path="followers_and_following / following.json"
          state={followingState}
          icon={followingState === "loaded" ? "✓" : followingState === "idle" ? "↑" : "✕"}
          count={following?.length}
          onFile={(f) => handleFile(f, setFollowing, setFollowingState, "following.json")}
          onClear={() => { setFollowing(null); setFollowingState("idle"); }}
        />
      </div>

      <div className="mt-7 animate-rise [animation-delay:420ms] text-center sm:text-left">
        <button
          className="inline-flex items-center gap-3.5 py-[15px] px-[38px] bg-rose text-canvas rounded-sm font-mono text-[12px] tracking-[0.18em] uppercase font-medium cursor-pointer transition-[opacity,transform] duration-200 hover:opacity-85 hover:-translate-y-0.5 disabled:!opacity-[0.18] disabled:cursor-not-allowed"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
        >
          <span>→</span>
          <span>Run Analysis</span>
        </button>
      </div>

      {analyzed && unfollowers !== null && (
        <section ref={resultsRef} className="mt-[72px] animate-rise scroll-mt-6">
          <div className="flex items-end gap-[18px] mb-9 pb-6 border-b border-edge">
            <span className="font-serif text-[80px] font-black leading-none text-rose">
              {unfollowers.length}
            </span>
            <div className="pb-1.5">
              <p className="text-[16px] text-ink mb-1">
                {unfollowers.length === 1
                  ? "account not following you back"
                  : "accounts not following you back"}
              </p>
              <p className="text-[12px] text-dim tracking-[0.1em] uppercase">
                out of {following?.length?.toLocaleString()} following
              </p>
            </div>
          </div>

          {unfollowers.length === 0 ? (
            <p className="font-serif text-2xl italic text-jade">
              Everyone follows you back.
            </p>
          ) : (
            <div className="flex flex-col">
              {unfollowers.map((user, i) => (
                <div
                  key={user.username}
                  className="flex items-center gap-4 py-[13px] border-b border-edge transition-[padding-left] duration-200 hover:pl-1.5"
                >
                  <span className="text-[12px] text-dim w-7 shrink-0 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] text-ink flex-1 tracking-[0.01em]">
                    @{user.username}
                  </span>
                  <a
                    href={user.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] tracking-[0.12em] uppercase text-rose no-underline py-1 px-3 border border-rose/25 rounded-sm whitespace-nowrap transition-colors duration-150 hover:bg-rose/12 shrink-0"
                  >
                    View ↗
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-edge flex items-center gap-4">
            <button
              onClick={() => {
                handleReset();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 py-[13px] px-[28px] border border-edge text-dim rounded-sm font-mono text-[12px] tracking-[0.18em] uppercase font-medium cursor-pointer transition-colors duration-200 hover:border-rose/40 hover:text-rose"
            >
              <span>↺</span>
              <span>Clear &amp; start over</span>
            </button>
            <span className="text-[12px] text-dim tracking-[0.1em] uppercase">
              data stays in your browser
            </span>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
