"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DisplayMemory,
  FriendSummary,
  fetchDisplayMemories,
  groupFriends
} from "@/lib/memories-api";

export function useMemories() {
  const [memories, setMemories] = useState<DisplayMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchDisplayMemories()
      .then((data) => {
        if (!cancelled) {
          setMemories(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const friends = useMemo(() => groupFriends(memories), [memories]);

  return {
    memories,
    friends,
    loading,
    error,
    count: memories.length
  };
}

export type { DisplayMemory, FriendSummary };
