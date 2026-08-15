export type ThoughtItem = {
  text: string;
  href?: string;
};

export type ThoughtSection = {
  heading: string;
  items: readonly ThoughtItem[];
};

export type Thought = {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  sections: readonly ThoughtSection[];
};

const thoughts: readonly Thought[] = [
  {
    slug: "misc",
    title: "misc.",
    subtitle: "my entire life-stack",
    year: 2026,
    sections: [
      {
        heading: "productivity stack",
        items: [
          { text: "dia (considering aside)" },
          { text: "wisprflow (my coworkers put me on)" },
          { text: "notion (ever since grade 8)" },
          { text: "poke (negotiated it down to 0.50 c/m)" },
          { text: "paper" },
          { text: "cap (open-source screen studio)" },
          { text: "raycast" },
          { text: "rectangle" },
        ],
      },
      {
        heading: "devtools",
        items: [
          { text: "cloud-based agents: devin" },
          { text: "zed, cursor (for design)" },
          {
            text: "codex macOS app (lovely harness + considering the move to GUI)",
          },
          {
            text: "ghostty (best native macOS terminal emulator) + tmux",
          },
          {
            text: "graphify (turns codebase into a knowledge-graph for faster queries)",
          },
        ],
      },
      {
        heading: "exercise",
        items: [
          { text: "arnold split at fitness sf" },
          { text: "cardio done through playing soccer/hooping/hiking" },
        ],
      },
      {
        heading: "fashion",
        items: [
          { text: "gap denim on my own collection" },
          { text: "k-two studios" },
          { text: "japanese jewelry" },
          {
            text: "prime intellect hoodie [ thanks to the prime intellect team for sending me one :) ]",
          },
        ],
      },
      {
        heading: "finances",
        items: [
          { text: "wealthsimple for everything (0 fx fees!)" },
          { text: "wise (recommend for canadians interning in the US)" },
        ],
      },
      {
        heading: "music",
        items: [
          { text: "dpr live/dabin.kr (jasmine, martini blue, etc.)" },
          { text: "brockhampton (summer, bleach, team, etc.)" },
          {
            text: "steve lacy, justin bieber, jenevieve, olivia dean, yiruma (classical)",
          },
          {
            text: "drop a follow @",
            href: "https://open.spotify.com/user/31de43lgixkkikvs72ou7bbci5eu?si=fa3a5e15cb9d46f0",
          },
        ],
      },
    ],
  },
];

export function listThoughts(): readonly Thought[] {
  return thoughts;
}

export function getThought(slug: string): Thought | undefined {
  return thoughts.find((thought) => thought.slug === slug);
}
