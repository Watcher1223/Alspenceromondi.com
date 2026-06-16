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
    title: "PreMan",
    role: "FOUNDER",
    description:
      "Building post-action verification, MCP governance, and API-to-agent infrastructure so teams can prove what their agents actually did.",
    tags: ["MCP", "API INFRA", "VERIFICATION", "AGENTS"],
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
      "Computer science student selected through a competitive scholarship program from a pool of 44,000 students.",
    tags: ["CS", "RIGOR", "SYSTEMS"],
  },
];

export const projects: ProjectItem[] = [
  {
    codename: "PROJECT FASTPATH",
    title: "PreMan verification",
    description:
      "A verification and control layer for AI agents that need to act through APIs, MCP tools, and customer systems.",
    tags: ["TYPESCRIPT", "PYTHON", "MCP", "VERIFICATION"],
    href: "https://preman.live",
  },
  {
    codename: "PROJECT ORIGIN",
    title: "Kenya to U.S. rails",
    description:
      "Real-time money movement experiment reducing days-long cross-border transfers into a seconds-long path.",
    tags: ["USDC", "PAYMENTS", "PRODUCT"],
  },
  {
    codename: "PROJECT RUNNER",
    title: "Hackathon systems",
    description:
      "High-pressure builds focused on finding real user pain and shipping working product quickly.",
    tags: ["YC", "AGENTS", "SHIPPING"],
  },
];

export const links = {
  github: "https://github.com/Watcher1223",
  linkedin: "https://www.linkedin.com/in/alspencer-omondi-9672aa23b/",
  email: "mailto:aomondi@hmc.edu",
};
