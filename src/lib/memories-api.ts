export type ApiMemory = {
  id: number;
  name: string;
  message: string;
  image_url: string | null;
  approved: boolean;
  created_at: string;
};

export type DisplayMemory = {
  id: number;
  friend: string;
  avatar: string;
  title: string;
  message: string;
  x: number;
  y: number;
};

export type FriendSummary = {
  name: string;
  avatar: string;
  count: number;
  role: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

export { API_BASE };
export const MEMORY_FALLBACK_AVATAR = "/images/anime-placeholder.png";

function constellationPosition(index: number, total: number): { x: number; y: number } {
  if (total <= 1) {
    return { x: 50, y: 50 };
  }

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radiusX = 24 + (index % 4) * 5;
  const radiusY = 18 + (index % 3) * 6;

  return {
    x: Math.min(90, Math.max(10, 50 + Math.cos(angle) * radiusX)),
    y: Math.min(82, Math.max(18, 50 + Math.sin(angle) * radiusY))
  };
}

function memoryTitle(message: string): string {
  const firstLine = message.split(/[\n.!?]/).find((part) => part.trim());
  if (!firstLine) {
    return "A shared memory";
  }

  const trimmed = firstLine.trim();
  return trimmed.length > 48 ? `${trimmed.slice(0, 45)}…` : trimmed;
}

export function mapApiMemory(memory: ApiMemory, index: number, total: number): DisplayMemory {
  const { x, y } = constellationPosition(index, total);

  return {
    id: memory.id,
    friend: memory.name,
    avatar: memory.image_url ?? MEMORY_FALLBACK_AVATAR,
    title: memoryTitle(memory.message),
    message: memory.message,
    x,
    y
  };
}

export async function fetchApprovedMemories(): Promise<ApiMemory[]> {
  const response = await fetch(`${API_BASE}/memories`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load memories");
  }

  return response.json() as Promise<ApiMemory[]>;
}

export async function fetchDisplayMemories(): Promise<DisplayMemory[]> {
  const memories = await fetchApprovedMemories();
  const ordered = [...memories].reverse();
  return ordered.map((memory, index) => mapApiMemory(memory, index, ordered.length));
}

export function groupFriends(memories: DisplayMemory[]): FriendSummary[] {
  const byName = new Map<string, FriendSummary>();

  for (const memory of memories) {
    const existing = byName.get(memory.friend);
    if (existing) {
      existing.count += 1;
      if (memory.avatar !== MEMORY_FALLBACK_AVATAR) {
        existing.avatar = memory.avatar;
      }
      continue;
    }

    byName.set(memory.friend, {
      name: memory.friend,
      avatar: memory.avatar,
      count: 1,
      role: "Memory Contributor"
    });
  }

  return Array.from(byName.values());
}
