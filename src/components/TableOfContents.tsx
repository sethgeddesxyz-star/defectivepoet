"use client";

import { useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import type { TocEntry } from "@/data/poems";

interface TableOfContentsProps {
  entries: TocEntry[];
  onNavigate: (pageNum: number) => void;
}

function getFirstPage(pages: string): number {
  const match = pages.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export default function TableOfContents({ entries, onNavigate }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-memorial-bg border border-gold-800/30 rounded-lg text-gold-300 hover:border-gold-700/50 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium">
          <List size={18} />
          Table of Contents
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="mt-2 bg-memorial-bg border border-gold-800/30 rounded-lg p-4 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0.5">
            {entries.map((entry, i) => (
              <button
                key={i}
                onClick={() => {
                  onNavigate(getFirstPage(entry.pages));
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gold-300 hover:text-gold-100 hover:bg-gold-900/20 rounded transition-colors"
              >
                <span className="text-gold-600 mr-2 text-xs font-mono">{entry.pages}</span>
                {entry.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
