export type NavItem = { label: string; href: string };

export const nav = {
  logo: "NetWorth Digital",
  items: [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavItem[],
  cta: { label: "Book a strategy call", href: "/book" } satisfies NavItem,
};
