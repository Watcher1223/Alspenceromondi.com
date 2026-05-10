export type HistoryItem = {
  range: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
};

export type ProjectItem = {
  codename: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export const history: HistoryItem[] = [
  {
    range: "2026",
    title: "PreMan / OpenTest",
    role: "FOUNDER",
    description:
      "Turning REST APIs into hosted MCP servers with scoped customer tokens, revocation, audit logs, and agent observability.",
    tags: ["MCP", "API INFRA", "AUTH", "AGENTS"],
  },
  {
    range: "2024 - 2025",
    title: "Surt AI",
    role: "FOUNDING ENGINEER",
    description:
      "Integrated thousands of API endpoints and helped build a production system used by more than 40,000 people.",
    tags: ["BACKEND", "INTEGRATIONS", "AGENT WORKFLOWS"],
  },
  {
    range: "2026",
    title: "YC Hackathons",
    role: "4X WINNER",
    description:
      "Built quickly under pressure and won four YC hackathons, including two wins with my teammate Korin.",
    tags: ["SPEED", "PRODUCT", "EXECUTION"],
  },
  {
    range: "2024 - 2025",
    title: "Stablecoin Remittance",
    role: "FOUNDER / BUILDER",
    description:
      "Built a Kenya/Ghana to U.S. transfer flow using USDC, reducing days-long transfers into a seconds-long path and reaching 1,250 signups.",
    tags: ["USDC", "FINTECH", "KENYA", "GHANA"],
  },
  {
    range: "2022 - 2026",
    title: "Harvey Mudd College",
    role: "CS",
    description:
      "First in my family to graduate college. I came to the U.S. as one of two students selected from my scholarship cohort.",
    tags: ["CS", "RIGOR", "SYSTEMS"],
  },
];

export const projects: ProjectItem[] = [
  {
    codename: "PROJECT FASTPATH",
    title: "OpenTest MCP",
    description:
      "A developer tool that lets coding agents discover, test, deploy, and audit API endpoints as MCP tools.",
    tags: ["TYPESCRIPT", "PYTHON", "MCP", "POSTGRES"],
    href: "https://preman.live",
  },
  {
    codename: "PROJECT ORIGIN",
    title: "Kenya to U.S. rails",
    description:
      "Real-time money movement experiment built from firsthand pain with slow, expensive cross-border transfers.",
    tags: ["USDC", "PAYMENTS", "PRODUCT"],
  },
  {
    codename: "PROJECT RUNNER",
    title: "Hackathon systems",
    description:
      "High-pressure builds where the constraint is brutal: find the real user pain and ship before the room catches up.",
    tags: ["YC", "AGENTS", "SHIPPING"],
  },
];

export const links = {
  github: "https://github.com/Watcher1223",
  linkedin: "https://www.linkedin.com/in/alspencer-omondi-9672aa23b/",
  email: "mailto:aomondi@hmc.edu",
};
