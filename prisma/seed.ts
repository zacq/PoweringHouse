import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

const posts: Array<{
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  published: boolean;
  daysAgo: number;
}> = [
  {
    slug: "what-is-the-business-actually",
    title: "What is the business, actually?",
    excerpt:
      "Before you scale anything, write down what the business is in one sentence a stranger would understand.",
    content: `Most owners can describe what they *sell*. Few can describe what the business *is*.\n\nHere's the test: explain it to someone outside your industry in one sentence, with no jargon. If you can't, you don't have a business design yet — you have a set of activities.\n\n**Try this today.** Write the sentence. Read it back. Cut every word that isn't doing work.`,
    category: "BUSINESS_DESIGN",
    published: true,
    daysAgo: 21,
  },
  {
    slug: "the-customer-you-keep-forgetting",
    title: "The customer you keep forgetting",
    excerpt: "Every offer has a second customer hiding behind the obvious one. Find them first.",
    content: `You designed the offer around the person who pays. But there's usually a second person in the room — the one who *approves* the payment, or the one who has to *live with* the result.\n\nDesign for both, or the sale takes twice as long as it should.`,
    category: "BUSINESS_DESIGN",
    published: true,
    daysAgo: 14,
  },
  {
    slug: "pricing-is-not-a-guess",
    title: "Pricing is not a guess",
    excerpt: "If you can't explain your price in one breath, it isn't a price — it's a hope.",
    content: `Pricing built on vibes collapses the first time a customer pushes back. Pricing built on cost, margin, and a clear story survives the push.\n\nWrite your price with three numbers behind it: what it costs you, what margin you need, and what the market has already proven it will pay.`,
    category: "MONEY_DISCIPLINE",
    published: true,
    daysAgo: 10,
  },
  {
    slug: "the-daily-cash-book-habit",
    title: "The daily cash book habit",
    excerpt: "Five minutes a day, same time, same format. This is the whole system.",
    content: `Money discipline isn't a spreadsheet, it's a habit. Five minutes at close of business, every single day, in the same format.\n\nWhat came in. What went out. What's left. That's it. Do this for thirty days and you will know your business better than any consultant could tell you.`,
    category: "MONEY_DISCIPLINE",
    published: true,
    daysAgo: 6,
  },
  {
    slug: "margin-before-marketing",
    title: "Margin before marketing",
    excerpt: "Spending on customer acquisition before you know your margin is spending blind.",
    content: `Marketing spend feels productive. But if you don't know your margin per sale, every shilling you spend on acquisition is a guess wearing a suit.\n\nFix the margin question first. Then marketing becomes arithmetic, not hope.`,
    category: "MONEY_DISCIPLINE",
    published: false,
    daysAgo: 2,
  },
  {
    slug: "referrals-are-a-system-not-luck",
    title: "Referrals are a system, not luck",
    excerpt: "If your growth depends on customers remembering to mention you, it isn't a system yet.",
    content: `"Word of mouth" is not a growth strategy — it's what happens when you don't have one. A referral system has a trigger, an ask, and a reward. Build those three things and referrals stop being luck.`,
    category: "GROWTH_SYSTEMS",
    published: true,
    daysAgo: 18,
  },
  {
    slug: "hiring-for-what-works-once",
    title: "Hiring for what works once",
    excerpt: "The first hire's job is to copy what you already do well — not to invent something new.",
    content: `Your first hire should not be asked to be creative. They should be asked to copy, precisely, the thing that already works when you do it. Systemize before you delegate, or you're just duplicating your own confusion.`,
    category: "GROWTH_SYSTEMS",
    published: true,
    daysAgo: 9,
  },
  {
    slug: "the-process-that-runs-without-you",
    title: "The process that runs without you",
    excerpt: "A real system survives you taking a week off. Test it that way, on purpose.",
    content: `Take a week off, on purpose, and watch what breaks. Whatever breaks is not yet a system — it's a task that depends on you personally. That's your next thing to fix.`,
    category: "GROWTH_SYSTEMS",
    published: false,
    daysAgo: 1,
  },
];

async function main() {
  console.log("Seeding database…");

  for (const p of posts) {
    const publishedAt = p.published
      ? new Date(Date.now() - p.daysAgo * 24 * 60 * 60 * 1000)
      : null;

    const post = await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        published: p.published,
        publishedAt,
      },
    });

    if (p.published) {
      await prisma.comment.createMany({
        data: [
          {
            postId: post.id,
            authorName: "Wanjiru K.",
            authorEmail: "wanjiru@example.com",
            body: "This is the first time someone put words to what I've been doing wrong for two years. Thank you.",
            approved: true,
          },
          {
            postId: post.id,
            authorName: "David M.",
            authorEmail: "david@example.com",
            body: "Trying this in my shop this week — will report back.",
            approved: false,
          },
        ],
      });
    }
  }

  await prisma.subscriber.createMany({
    data: [
      { email: "wanjiru@example.com" },
      { email: "david@example.com" },
      { email: "amina.trader@example.com" },
    ],
    skipDuplicates: true,
  });

  console.log(`Seeded ${posts.length} posts, comments, and subscribers.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
