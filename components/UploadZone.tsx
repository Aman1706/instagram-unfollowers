"use client";

import { useRef, useEffect } from "react";
import { FileState } from "@/types/instagram";
import { useUploadZone } from "@/hooks/useUploadZone";

interface UploadZoneProps {
  title: string;
  path: string;
  state: FileState;
  onFile: (file: File) => void;
  onClear?: () => void;
  count?: number;
  icon: string;
}

const stateClasses: Record<FileState, string> = {
  idle: "border-edge bg-surface hover:border-rose/25 hover:bg-surface-up",
  loaded: "border-jade/40 bg-jade/4",
  error: "border-ember/40 bg-ember/4",
  "wrong-file": "border-ember/40 bg-ember/4",
};

const statusColor: Record<FileState, string> = {
  idle: "text-dim",
  loaded: "text-jade",
  error: "text-ember",
  "wrong-file": "text-ember",
};

const iconColor: Record<FileState, string> = {
  idle: "text-dim",
  loaded: "text-jade",
  error: "text-ember",
  "wrong-file": "text-ember",
};

export const UploadZone = ({ title, path, state, onFile, onClear, count, icon }: UploadZoneProps) => {
  const { dragging, handleDrop, handleDragOver, handleDragLeave } = useUploadZone(onFile);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === "idle" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [state]);

  const statusText =
    state === "loaded"
      ? count !== undefined
        ? `${count.toLocaleString()} accounts loaded`
        : "Loaded"
      : state === "wrong-file"
      ? `Wrong file — expected ${path.split(" / ").pop()}`
      : state === "error"
      ? "Invalid JSON — try again"
      : "Drop file or click to browse";

  return (
    <div
      className={`upload-zone relative border rounded-sm py-8 px-6 cursor-pointer overflow-hidden transition-colors duration-200 ${stateClasses[state]} ${dragging ? "!border-rose !bg-rose/12" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      {state !== "idle" && onClear && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className={`absolute top-3 right-3 z-10 w-5 h-5 flex items-center justify-center transition-colors duration-150 cursor-pointer hover:text-ember ${state === "loaded" ? "text-jade/50" : "text-ember/50"}`}
          aria-label="Remove file"
        >
          ×
        </button>
      )}
      <span className={`block text-[22px] mb-3.5 ${iconColor[state]}`}>{icon}</span>
      <p className="font-serif text-[22px] font-bold text-ink mb-1">{title}</p>
      <p className="text-[9px] text-dim tracking-[0.04em] mb-4.5 break-all">{path}</p>
      <span className={`text-[12px] tracking-[0.12em] uppercase ${statusColor[state]}`}>
        {statusText}
      </span>
    </div>
  );
};
