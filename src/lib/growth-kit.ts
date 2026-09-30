/**
 * "Every Business is Scalable" — Micro Business Growth Kit landing page (/awareness).
 * Copy is verbatim from the supplied page (Awareness lnding pge/Every Business is Scalable.html).
 */

export interface NumberedItem {
  num: string;
  t: string;
  d: string;
}

const pad = (i: number) => String(i + 1).padStart(2, "0");
const split = (arr: [string, string][]): NumberedItem[] => arr.map(([t, d], i) => ({ num: pad(i), t, d }));

/**
 * The kit PDF (public/downloads/). The form offers it as a download once the sign-up is saved;
 * when email delivery is added, send it to the subscriber instead.
 */
export const GK_KIT_PDF = "/downloads/every-business-is-scalable-growth-kit.pdf";
export const GK_KIT_PDF_NAME = "Every Business is Scalable — PH Growth Kit.pdf";

export const GK_WHATSAPP = "https://wa.me/254725412802";
export const GK_WHATSAPP_LABEL = "0725 412 802";
export const GK_X = "https://x.com/CharlesGachoka";
export const GK_X_HANDLE = "@CharlesGachoka";
// DRAFT: the supplied page linked to LinkedIn's own profile-settings page, which visitors can't open — swap for GK's public profile URL.
export const GK_LINKEDIN = "#";

export const GK_STATS = [
  { num: "4", label: "Start ups run" },
  { num: "2 yrs", label: "Structured coaching" },
  { num: "Kes 10M", label: "($100k) annual revenue goal" },
  { num: "5", label: "Levels in the kit" },
];

export const GK_BARS = [
  { label: "Awareness", height: 16 },
  { label: "Design", height: 34 },
  { label: "Pillars", height: 54 },
  { label: "Tools", height: 74 },
  { label: "Next 24h", height: 100 },
];

export const GK_LEVELS = [
  ["Level 1: Awareness", "#level-1"],
  ["Level 2: Business Design", "#level-2"],
  ["Level 3: Pillars of Business Growth", "#level-3"],
  ["Level 4: Tools of productivity", "#level-4"],
  ["Level 5: What this means to you and next 24 hours plan to adopt", "#level-5"],
].map(([name, href], i) => ({ num: pad(i), name, href }));

export const GK_LOSSES = [
  "I had lost all my vehicles (4 in number) for my tour company",
  "I had lost cash from loans and friends borrowing",
  "I had gone from promising future to zero to negative",
];

export const GK_REASONS = split([
  ["Lack of awareness", "About what’s real entrepreneurship. Seeing only short term."],
  ["Lack of business frame", "No design at all. Just passion and hype."],
  ["Lack of right hand holding", "Had only cheap cheering from friends and no grounded support."],
]);

export const GK_GUIDES = [
  { num: "8", label: "Elements of Business Design", href: "#level-2" },
  { num: "11", label: "Pillars of Business Growth", href: "#level-3" },
  { num: "8", label: "Tools for productivity", href: "#level-4" },
];

export const GK_ELEMENTS = split([
  ["Business Universe and value proposition", "This is defining clearly the size of your business. Also clearly define the value you intend to offer the customer. This opens you to understand the business you are in."],
  ["Route to market and Customer Acquisition", "Selling is one of daily routine for business makers. You need to define the route you follow to reach your customer. It cannot be random jargon. When you identify the route, how will you acquire the customers until they buy."],
  ["Customer journey", "This defines how you serve the customer. From the point of expressing interest to buy until they bid goodbye with satisfaction. Many business have no certainty and every day they chase customer they work hard to acquire."],
  ["Sales infrastructure", "Only one question, how do you manage relationship with customers you acquire? Do you have customer relationship management practice?"],
  ["Business Money", "Can you explain full circle of how one shilling of the business from point of entry to point of exit. Do you distract business money flow with your personal costs which keeps on bottling your business to grow?"],
  ["Business Performance Indicators Reviews", "This is establishing metrics that you need to monitor and reflect business progress. On same this requires to be measured periodically to ensure corrective action are taken on time."],
  ["Goal alignment", "This is becoming better business maker through right attitude, skilling up continuously, mental health strengthening. This is identifying intrinsic strength that can be exploited."],
  ["Digital Marketing Pillar", "Planet earth has 8 Billion people. Over 60% are in digital platform in one way or the other. This is revolution that you need master and grow with it. Let your business not be left out."],
]);

export const GK_PILLARS = split([
  ["Business Planning", "It’s all about building reliance on right information about business."],
  ["Communication and Negotiation skills", "Building trust through strategic communication with relevant recipients."],
  ["Business Networks", "Sourcing knowledge through the right people and making it intentional to build database of such people."],
  ["Continuous learning", "Developing skills in sales, negotiations, business interpretation through seeking relevant learning opportunities."],
  ["The art of sales", "Learning and implementing sales funnel and customer relationship management systems."],
  ["Community support", "Identifying the community that works with your business and can offer momentum. This also calls on building community that is relevant."],
  ["Business MOAT", "Creating competitive advantage that is not easily copied by competitors."],
  ["Finance discipline", "Business money accountability structures."],
  ["Staff management", "Enhancing productivity through right people, right seat."],
  ["Business operation processes", "Operation excellence that ensures customers’ satisfaction at highest level."],
  ["Business Performance monitoring", "This is creating the right performance indicators and creating review mechanism that ensures timely improvement."],
]);

export const GK_TOOLS = split([
  ["Goals planner tool", "This is a mapping tool that align activities with pre-set goals for the business."],
  ["Activity planner tool", "Moving from ambitious goals to actionable steps is only possible through having activities planner that move imaginations to actual small activities."],
  ["Business performance monitoring tool", "Operations that are not monitored remain to be hobbies. Monitoring tool create real measure for the progress."],
  ["Financial recording template", "This is tool that ensures all costs and income are recorded in full. This brings full financial accountability."],
  ["Process flow tool", "This is guide that helps define critical processes that create real value. By defining critical processes, you manage to detect wastages and bottlenecks."],
  ["Standard Operating Procedure tool", "All processes that are well defined need to be standardized to ensure consistency of quality."],
  ["Job Descriptions tool", "This helps bring out the real expectations from any staff employed in the business. It helps achieve maximized productivity."],
  ["Sales Funnel Tool", "Sales is the most critical role in the business. Sales ensures consistent income and foundation to grow more income. Sales funnel ensures predictable monitoring of sales effort."],
]);

export const GK_LIES = ["You are late", "You missed opportunities with rest of buddies", "You can’t catch up"];

export const GK_PLAN = [
  "Clear your mental imaginations",
  "Reclaim your time",
  "Let go of what’s not helping",
  "Use the road map and tools now at your fingertips",
  "Master the play and remain in the game",
].map((t, i) => ({ num: pad(i), t }));

export const GK_WITNESSES = [
  "Dacha Travels",
  "Pweza Foods",
  "Dream Crest",
  "BWK Confectioneries",
  "Powering House Transformative",
  "Skyrockers Trainers",
];
