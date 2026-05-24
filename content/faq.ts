export type FaqItem = { q: string; a: string };

export const faq = {
  eyebrow: "/ THE OBVIOUS QUESTIONS",
  headline: "Before you book.",
  items: [
    {
      q: "What does NetWorth Digital actually do?",
      a: "We build and run the systems behind service businesses. Operations, automations, CRM, websites, content. Outcome-led, not tool-led. We use GoHighLevel under the hood because it is the right stack for the job, but you are buying the system, not the software.",
    },
    {
      q: "Who do you work with?",
      a: "Australian service businesses doing $250k to $2M, three to fifteen staff. Detailers, trades, gyms, agencies, consultancies, coaches. If your business is service-based and you sell time, we can help.",
    },
    {
      q: "Can you promise results?",
      a: "No agency can promise a number. We can promise the system, the documentation, the training and a measurable structure. The result follows the structure.",
    },
    {
      q: "How long before things change?",
      a: "Website and automation builds start showing measurable impact in the first month. Lead generation systems compound over three to six months as the data sharpens.",
    },
    {
      q: "Why GoHighLevel?",
      a: "It is the only platform that holds CRM, marketing, booking and follow-up in one place without taping seven tools together. Less surface area means less things break.",
    },
    {
      q: "What makes you different?",
      a: "Most agencies sell the marketing. We engineer the system underneath it. The marketing only works if the system underneath it is built properly, and most agencies skip that step.",
    },
  ] satisfies FaqItem[],
};
