export interface Tool {
  slug: string;
  name: string;
  promise: string;
}

// content-map v2 §7.1, verbatim promises.
export const TOOLS: Tool[] = [
  { slug: "weekly-activities-planner", name: "Weekly Activities Planner", promise: "Master your routine" },
  {
    slug: "expenses-ledger-budget",
    name: "Expenses Ledger & Budget",
    promise: "Take the guesswork out of your business money",
  },
  {
    slug: "operations-procedures",
    name: "Operations Procedures (SOPs)",
    promise: "Standardise your processes to master customer satisfaction",
  },
  {
    slug: "performance-review",
    name: "Performance Review",
    promise:
      "Anything not measured and monitored will not improve. Pick areas of improvement in real time.",
  },
  { slug: "staff-appraisal", name: "Staff Appraisal", promise: "Master unlocking the potential of your staff" },
];
