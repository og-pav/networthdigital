export type ApproachStep = {
  label: string;
  title: string;
  body: string;
};

export const approach = {
  eyebrow: "/ APPROACH",
  headline: "Three steps. In order. Always.",
  sub: "We do not throw automations at problems. We build the foundation, then the systems, then the scale.",
  steps: [
    {
      label: "/ 01 STRUCTURE",
      title: "Map what you actually have.",
      body: "We audit your tools, your offers, your pipeline and the moments where leads and time leak out. You leave the first week with a map of the business you did not have before.",
    },
    {
      label: "/ 02 SYSTEMS",
      title: "Build the engine.",
      body: "Automations, CRM, booking, follow-up, reporting. All connected, all documented, all running without you. We build it with you so you own it after we are gone.",
    },
    {
      label: "/ 03 SCALING",
      title: "Add the fuel.",
      body: "Once the engine runs clean, we plug in the lead generation and content engine. Now growth is a tap you can turn, not a thing you hope happens.",
    },
  ] satisfies ApproachStep[],
};
