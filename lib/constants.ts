export const LINKS = {
  linkedin: "https://www.linkedin.com/in/amankumar1106/",
  email: "aman110693@gmail.com",
  phone: "+1 (289) 407-6092",
  github: "https://github.com/akumar1119",
  resume: "/resume.pdf",
  dashboard: "https://aman-fy-25-year-end-review-interact.vercel.app/",
  calendly: "#", // placeholder
} as const;

export const METRICS = [
  {
    label: "PIPELINE BUILT",
    value: 6000000,
    prefix: "$",
    displayValue: "$6,000,000",
    suffix: "",
    progress: 162,
    progressLabel: "in the last year",
    trend: "up" as const,
  },
  {
    label: "SQL ATTAINMENT",
    value: 170.4,
    prefix: "",
    displayValue: "170.4%",
    suffix: "%",
    progress: 170,
    progressLabel: "of annual target",
    trend: "up" as const,
  },
  {
    label: "FULL-CYCLE CLOSED",
    value: 160,
    prefix: "~",
    displayValue: "~160K CAD",
    suffix: "K CAD",
    progress: 100,
    progressLabel: "Selling Ed-tech solutions",
    trend: "up" as const,
  },
  {
    label: "PROSPECTING TIME",
    value: 40,
    prefix: "",
    displayValue: "40% Less",
    suffix: "% Less",
    progress: 60,
    progressLabel: "AI workflow",
    trend: "down" as const,
  },
  {
    label: "REVENUE EXPERIENCE",
    value: 8,
    prefix: "",
    displayValue: "8+ Years",
    suffix: "+ Years",
    progress: 100,
    progressLabel: "B2B revenue across 4 companies",
    trend: "up" as const,
  },
] as const;

export const CAREER = [
  {
    stage: "SOURCED",
    stageColor: "#4a5568",
    company: "L&T Infotech",
    role: "Software Developer",
    dates: "Aug 2015 – Jan 2018",
    location: "Pune, India",
    win: "Built technical fluency that now enables peer-level conversations with CIOs and IT Directors in enterprise deals",
    metric: "150+ bugs resolved, 40% velocity improvement",
    isCurrent: false,
    isTarget: false,
  },
  {
    stage: "QUALIFYING",
    stageColor: "#60a5fa",
    company: "BYJU'S",
    role: "Enterprise Sales Manager",
    dates: "Feb 2018 – Jul 2019",
    location: "Mumbai, India",
    win: "Closed ₹10M (~$160K CAD) — cold outreach to signed contract, 3–5 stakeholders per deal, full cycle",
    metric: "₹10M closed · 40% above target",
    isCurrent: false,
    isTarget: false,
  },
  {
    stage: "ADVANCING",
    stageColor: "#f59e0b",
    company: "Rogers Communications",
    role: "Team Lead + Account Specialist",
    dates: "Jun 2021 – Sep 2024",
    location: "Toronto, ON",
    win: "Exceeded quota by 25–30% consistently while voluntarily leading and coaching a field sales team of 5 reps",
    metric: "25-30% above KPI · 4/4 rated",
    isCurrent: false,
    isTarget: false,
  },
  {
    stage: "CLOSING",
    stageColor: "#10b981",
    company: "OpenText",
    role: "Account Development Executive",
    dates: "Sep 2024 – Present",
    location: "Richmond Hill, ON",
    win: "$6M pipeline (162% of goal), 170.4% SQL attainment, built AI workflow peers adopted as standard",
    metric: "$6M pipeline · 170.4% SQL",
    isCurrent: true,
    isTarget: false,
  },
  {
    stage: "TARGET",
    stageColor: "#2563eb",
    company: "AE Role",
    role: "Account Executive",
    dates: "Next",
    location: "",
    win: "Next deal. Actively in conversation.",
    metric: "",
    isCurrent: false,
    isTarget: true,
  },
] as const;

export const SKILLS = [
  { name: "AI-Powered Prospecting", level: 90, example: "AI workflows cut research time 40%" },
  { name: "Full-Cycle Selling", level: 85, example: "Cold outreach to signed contract at BYJU'S" },
  { name: "EDI & Supply Chain SaaS", level: 80, example: "Selling into mid-market at OpenText BNC" },
  { name: "Multi-Stakeholder Deals", level: 85, example: "3-5 decision makers per account" },
  { name: "MEDDIC Framework", level: 75, example: "MEDDIC Sales Methodology Certified" },
] as const;

export const PROFILE = {
  name: "Aman Kumar",
  role: "Account Development Executive",
  company: "OpenText — Business Network Cloud",
  location: "Toronto, Ontario",
  flag: "🇨🇦",
  target: "Account Executive — B2B SaaS / Tech",
  background: "Engineering → Sales → MBA → SaaS",
  education: "MBA Marketing & Sales · Brock University | BEng Electronics & Telecom · PVPPCOE",
  journey: "India → Canada",
  currently: "Building AI workflows for sales teams",
  certifications: [
    "HubSpot Sales Software Certified",
    "MEDDIC Sales Methodology — Practitioner",
    "LinkedIn Sales Navigator Certified",
  ],
  tools: {
    sales: ["Salesforce", "HubSpot", "Salesloft", "LinkedIn Sales Navigator", "ZoomInfo", "Outreach.io", "6sense"],
    ai: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Cursor", "Claude Code"],
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Numbers", href: "#numbers" },
  { label: "Career", href: "#career" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const VALUE_PROPS = [
  {
    title: "AI-Powered Prospecting",
    description:
      "Built workflows using Claude, Perplexity, and ChatGPT that cut account research time by 40% — contributing to 170.4% SQL attainment at OpenText.",
    tools: ["Claude", "Perplexity", "ChatGPT"],
    size: "medium" as const,
  },
  {
    title: "Full-Cycle Selling",
    description:
      "Closed ₹10M (~$160K CAD) in B2B SaaS deals at BYJU'S — cold outreach through signed contract, managing 3–5 stakeholders per deal.",
    tools: ["Salesforce", "HubSpot", "MEDDIC"],
    size: "medium" as const,
  },
  {
    title: "EDI & Supply Chain SaaS",
    description:
      "Selling digital transformation into mid-market enterprises at OpenText — $50K–$500K ACV, complex buying committees, 6–12 month sales cycles. The niche almost no AE candidate owns.",
    tools: [],
    size: "large" as const,
  },
] as const;

export const INTEL_POSTS = [
  {
    date: "Apr 22, 2026",
    title: "Claude Design, 73% of buyers use AI, Salesforce: top reps use agents 1.7x more",
    reactions: "847",
    comments: "43",
    isLatest: true,
  },
  {
    date: "Apr 15, 2026",
    title: "Why AI won't replace AEs — but AEs who use AI will replace those who don't",
    reactions: "1.2K",
    comments: "89",
    isLatest: false,
  },
  {
    date: "Apr 8, 2026",
    title: "I built a Claude workflow that researches accounts in 3 minutes instead of 30",
    reactions: "2.1K",
    comments: "156",
    isLatest: false,
  },
] as const;

export const OFF_CLOCK = [
  {
    icon: "✈️",
    title: "India → Canada",
    description: "Engineer who chose sales over code. Built a new life in Toronto and never looked back.",
  },
  {
    icon: "🔧",
    title: "Shipping Side Projects",
    description: "AI sales tools, content engines, and this website — built with Claude Code and late-night ambition.",
  },
  {
    icon: "🎵",
    title: "Jamming & Dancing",
    description: "Nothing clears the mind like singing with friends or losing yourself on the dance floor.",
  },
  {
    icon: "🌍",
    title: "Always Travelling",
    description: "New city, culture, or cuisine to discover — I'm booking the flight.",
  },
] as const;

export const LOADING_LINES = [
  { text: "Initializing account research...", delay: 0 },
  { text: "Loading stakeholder map...", delay: 0, progress: "4 contacts" },
  { text: "Pipeline analysis complete...", delay: 0, progress: "$6,000,000" },
  { text: "SQL attainment:", delay: 0, progress: "170.4%" },
  { text: "Status: Ready to close.", delay: 0 },
  { text: "Launching profile...", delay: 0, progress: "100%" },
] as const;
