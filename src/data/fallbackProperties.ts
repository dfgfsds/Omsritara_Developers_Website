export interface PropertyItem {
  _id: string;
  name: string;
  description?: string;
  image_url?: string[];
  listing_type?: string;
  price?: number;
  area_size?: number;
  createdAt?: string;
  isDeleted?: boolean;
  bhk?: string;
  type?: {
    _id?: string;
    name?: string;
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
  };
}

export const FALLBACK_PROPERTIES: PropertyItem[] = [
  {
    _id: "prop-madison",
    name: "Madison By Omsritara",
    description:
      "Experience the luxury of gated community apartments in Nelson Manickam Road with world-class amenities and premium finishes.",
    image_url: [
      "/assets/about-gallery1.png",
      "/assets/about-gallery2.png",
      "/assets/Myans_Luxury_Villas_1.jpg",
    ],
    listing_type: "sale",
    price: 17100000,
    area_size: 1650,
    bhk: "2 & 3 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Nelson Manickam Road",
      city: "Aminjikarai, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-harrmony",
    name: "Harrmony Residences",
    description:
      "Premium urban residences designed for modern families, featuring signature club amenities and seamless arterial connectivity.",
    image_url: [
      "/assets/about-gallery2.png",
      "/assets/about-gallery3.png",
      "/assets/featured-grid1.jpg",
    ],
    listing_type: "sale",
    price: 13500000,
    area_size: 1420,
    bhk: "2 & 3 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Mount Poonamallee High Road",
      city: "Porur, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-venice",
    name: "Venice Luxury Villas",
    description:
      "Exclusive waterfront contemporary villas along the scenic coastal corridor, crafted with Italian architecture and private decks.",
    image_url: [
      "/assets/Myans_Luxury_Villas_1.jpg",
      "/assets/about-gallery1.png",
      "/assets/about-gallery2.png",
    ],
    listing_type: "sale",
    price: 24500000,
    area_size: 3200,
    bhk: "3 & 4 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Luxury Villa" },
    location: {
      address: "East Coast Road",
      city: "Palavakkam, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-cambridge",
    name: "Cambridge Greens",
    description:
      "Eco-centric high-rise living surrounded by manicured gardens, smart home automation, and rooftop recreation terraces.",
    image_url: [
      "/assets/about-gallery3.png",
      "/assets/featured-grid1.jpg",
      "/assets/about-gallery1.png",
    ],
    listing_type: "sale",
    price: 9800000,
    area_size: 1180,
    bhk: "2 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Velachery Main Road",
      city: "Velachery, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-signature",
    name: "Signature Crest Villas",
    description:
      "Ultra-spacious private designer villas with landscaped private courtyards, plunge pools, and dual car parking.",
    image_url: [
      "/assets/featured-grid1.jpg",
      "/assets/about-gallery2.png",
      "/assets/about-gallery3.png",
    ],
    listing_type: "sale",
    price: 31000000,
    area_size: 3850,
    bhk: "4 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Luxury Villa" },
    location: {
      address: "Old Mahabalipuram Road",
      city: "Perungudi, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-grandeur",
    name: "Grandeur Heights",
    description:
      "Modern lifestyle community featuring panoramic city skyline views, state-of-the-art fitness hub, and EV charging points.",
    image_url: [
      "/assets/about-gallery1.png",
      "/assets/about-gallery3.png",
      "/assets/Myans_Luxury_Villas_1.jpg",
    ],
    listing_type: "sale",
    price: 15500000,
    area_size: 1520,
    bhk: "3 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Arcot Road",
      city: "Vadapalani, Chennai",
      state: "Tamil Nadu",
    },
  },
];
