export interface Charity {
  id: string;
  name: string;
  theme: string;
  blurb: string;
  logo: string;
  url: string;
}

export const CHARITIES: Charity[] = [
  {
    id: "compassion",
    name: "Compassion International",
    theme: "CHILD DEVELOPMENT",
    blurb: "Releasing children from extreme poverty and providing education in Jesus' name.",
    logo: "/images/charities/compassion.svg",
    url: "https://www.compassion.com",
  },
  {
    id: "samaritans-purse",
    name: "Samaritan's Purse",
    theme: "DISASTER RELIEF",
    blurb: "Deploying emergency aid, food, and mobile field hospitals to crisis zones around the world.",
    logo: "/images/charities/samaritans-purse.svg",
    url: "https://www.samaritanspurse.org",
  },
  {
    id: "mercy-ships",
    name: "Mercy Ships",
    theme: "MEDICAL CARE",
    blurb: "Bringing life-saving surgeries and care to developing nations aboard the world's largest civilian hospital ships.",
    logo: "/images/charities/mercy-ships.png",
    url: "https://www.mercyships.org",
  },
  {
    id: "world-vision",
    name: "World Vision",
    theme: "CLEAN WATER",
    blurb: "Helping vulnerable families break the cycle of poverty with clean water and sustainable support.",
    logo: "/images/charities/world-vision.svg",
    url: "https://www.worldvision.org",
  },
];

export function getCharity(id: string): Charity | undefined {
  return CHARITIES.find((charity) => charity.id === id);
}

export function isValidCharityId(id: unknown): id is string {
  return typeof id === "string" && CHARITIES.some((charity) => charity.id === id);
}
