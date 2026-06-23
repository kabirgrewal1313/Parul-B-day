"use client";

import { MemoryImage } from "@/components/MemoryImage";
import { useMemories } from "@/hooks/useMemories";

export function FriendsDirectory() {
  const { friends, loading, error, count } = useMemories();

  if (loading) {
    return <p className="text-ink/56">Loading contributors...</p>;
  }

  if (error) {
    return <p className="text-ink/56">Could not load contributors. Make sure the backend is running.</p>;
  }

  if (count === 0) {
    return <p className="text-ink/56">No approved memories yet. Friends will appear here after they contribute.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {friends.map((friend) => (
        <article className="glass-panel group overflow-hidden" key={friend.name}>
          <MemoryImage
            alt={friend.name}
            className="transition duration-700 group-hover:opacity-95"
            maxHeightClass="max-h-96"
            src={friend.avatar}
          />
          <div className="p-4">
            <p className="text-xs uppercase text-ink/52">{friend.role}</p>
            <h2 className="mt-2 font-display text-4xl">{friend.name}</h2>
            <p className="mt-3 text-ink/60">
              {friend.count} {friend.count === 1 ? "memory" : "memories"} unlocked
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
