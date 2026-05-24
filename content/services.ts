export type Service = {
  slug: string;
  label: string;
  title: string;
  sub: string;
  body: string;
  inclusions: string[];
  cta: string;
};

export const servicesIntro = {
  eyebrow: "/ THE OFFER",
  headline: "Three ways in.",
  sub: "Pick the one that matches where you are. All three lead to the same place: a business that runs itself.",
};

export const services: Service[] = [
  {
    slug: "strategy-and-optimisation",
    label: "/ 01",
    title: "Strategy and Optimisation",
    sub: "Weekly coaching, frameworks, community.",
    body: "Hands-on coaching for owners who want to install the systems themselves. You get our frameworks, our playbooks, weekly calls and a private community of operators doing the same work.",
    inclusions: [
      "Weekly live coaching calls.",
      "Access to our full template library.",
      "Private community of growth-focused operators.",
      "Ongoing support inside the community.",
    ],
    cta: "Apply for coaching →",
  },
  {
    slug: "operations-and-automation",
    label: "/ 02",
    title: "Operations and Automation",
    sub: "Done with you. The flagship.",
    body: "We architect, build and connect the systems your business runs on. CRM, automations, follow-up, booking, reporting. You own the build, we drive it. You walk out with a documented operating system, not a black box.",
    inclusions: [
      "Custom CRM and pipeline build-out.",
      "Lead routing, nurture and follow-up automations.",
      "Booking and intake systems wired end to end.",
      "Reporting dashboards that show what is working.",
      "Full documentation and team training.",
    ],
    cta: "Talk to us about a build →",
  },
  {
    slug: "website-and-content",
    label: "/ 03",
    title: "Website and Content",
    sub: "Sites that convert, content that compounds.",
    body: "Once the systems are in, the site has a job to do. We design and build conversion-led websites and the content engine behind them. Designed for lead capture, structured for SEO, automated end to end.",
    inclusions: [
      "Conversion-led design and copy.",
      "Funnels, landing pages and lead magnets.",
      "SEO-ready architecture and on-page work.",
      "Content workflow connected to your CRM.",
      "Ongoing optimisation, not a once-and-done.",
    ],
    cta: "Brief us on a build →",
  },
];
