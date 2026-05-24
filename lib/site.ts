/** Single source of truth for site-wide constants used in metadata + schema. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://lokidum.github.io/networkdigital";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public asset path with the deploy base path (GitHub Pages subpath). */
export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

export const site = {
  name: "NetWorth Digital",
  tagline: "Structure. Systems. Scaling.",
  description:
    "We engineer the systems, automations and infrastructure that turn day-to-day chaos into predictable revenue. Built for Australian service businesses ready to grow without the burnout.",
  phone: "+61 404 837 649",
  phoneHref: "tel:+61404837649",
  email: "",
  url: SITE_URL,
  locale: "en_AU",
  bookingUrl:
    process.env.NEXT_PUBLIC_GHL_BOOKING_URL ??
    "https://link.jmdigital360.com/widget/booking/FqXWOENX9f3c5jJteFOx",
} as const;
