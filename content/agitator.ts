export type PainCard = {
  number: string;
  title: string;
  body: string;
};

export const agitator = {
  eyebrow: "/ THE STATE OF PLAY",
  headline: "You did not build a business to babysit it.",
  sub: "Most owners we meet are stuck in the same loop. Recognise any of these?",
  cards: [
    {
      number: "001",
      title: "Leads slip through the cracks",
      body: "The forms still come in. The follow-up does not. By the time you get to it, they have hired someone else.",
    },
    {
      number: "002",
      title: "The tools do not talk to each other",
      body: "Your CRM, your inbox, your booking page and your spreadsheets all hold a piece of the picture. None of them hold the whole thing.",
    },
    {
      number: "003",
      title: "Months are unpredictable",
      body: "Some weeks you are flat out. Some weeks you are quiet. The pattern is invisible, so the planning is impossible.",
    },
    {
      number: "004",
      title: "Every system runs through you",
      body: "If you went on holiday for two weeks, what would actually keep moving?",
    },
  ] satisfies PainCard[],
};
