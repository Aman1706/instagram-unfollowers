import { InstagramEntry, ParsedUser } from "@/types/instagram";

const findEntries = (data: unknown): InstagramEntry[] => {
  if (Array.isArray(data)) return data as InstagramEntry[];
  if (data && typeof data === "object") {
    for (const value of Object.values(data as Record<string, unknown>)) {
      if (Array.isArray(value)) return value as InstagramEntry[];
    }
  }
  return [];
};

export const parseFile = (data: unknown): ParsedUser[] =>
  findEntries(data)
    .map((e) => {
      const username = e.string_list_data?.[0]?.value || e.title || "";
      return { username, href: `https://www.instagram.com/${username}` };
    })
    .filter((u) => u.username);

export const computeUnfollowers = (
  followers: ParsedUser[],
  following: ParsedUser[]
): ParsedUser[] => {
  const followerSet = new Set(followers.map((u) => u.username));
  return following.filter((u) => !followerSet.has(u.username));
};
