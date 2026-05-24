export const roi = {
  eyebrow: "/ THE MATH",
  headline: "Do the math before the call.",
  sub: "Move the sliders. Watch what a five-point lift in close rate looks like on your revenue.",
  inputs: {
    leads: { label: "Leads per month", min: 10, max: 500, step: 5, default: 50 },
    closeRate: {
      label: "Current close rate",
      min: 5,
      max: 60,
      step: 1,
      default: 20,
    },
    clientValue: {
      label: "Average client value (AUD)",
      min: 500,
      max: 20000,
      step: 500,
      default: 2500,
    },
  },
  lift: 5, // percentage points added to close rate
  labels: {
    current: "Where you are",
    improved: "Where this gets you",
    monthly: "Monthly revenue",
    delta: (amount: string) =>
      `That is ${amount} more per month. Without spending another dollar on ads.`,
  },
  closer: "That is what better follow-up looks like.",
  cta: { label: "See how we get you there → Book a strategy call", href: "/book" },
};
