"use client";

import { useState, useCallback } from "react";
import { ParsedUser, FileState } from "@/types/instagram";
import { parseFile, computeUnfollowers } from "@/utils/instagram";

export const useInstagramAnalysis = () => {
  const [followers, setFollowers] = useState<ParsedUser[] | null>(null);
  const [following, setFollowing] = useState<ParsedUser[] | null>(null);
  const [followersState, setFollowersState] = useState<FileState>("idle");
  const [followingState, setFollowingState] = useState<FileState>("idle");
  const [unfollowers, setUnfollowers] = useState<ParsedUser[] | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleFile = useCallback(
    (
      file: File,
      setter: (users: ParsedUser[]) => void,
      stateSetter: (s: FileState) => void,
      expectedName: string
    ) => {
      if (file.name !== expectedName) {
        stateSetter("wrong-file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setter(parseFile(data));
          stateSetter("loaded");
        } catch {
          stateSetter("error");
        }
      };
      reader.readAsText(file);
    },
    []
  );

  const handleAnalyze = () => {
    if (!followers || !following) return;
    setUnfollowers(computeUnfollowers(followers, following));
    setAnalyzed(true);
  };

  const handleReset = () => {
    setFollowers(null);
    setFollowing(null);
    setFollowersState("idle");
    setFollowingState("idle");
    setUnfollowers(null);
    setAnalyzed(false);
    setResetKey((k) => k + 1);
  };

  return {
    followers,
    following,
    followersState,
    followingState,
    unfollowers,
    analyzed,
    resetKey,
    setFollowers,
    setFollowing,
    setFollowersState,
    setFollowingState,
    handleFile,
    handleAnalyze,
    handleReset,
  };
};
