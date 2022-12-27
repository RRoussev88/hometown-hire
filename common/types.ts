// Use Moment type in the future or at least an union of string and number.
// Better store the timestamp as a number
type DateString = string;

interface CollectionRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created?: DateString;
  updated?: DateString;
}

export interface User extends CollectionRecord {
  avatar: string | null;
  businesses: string[];
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
}

export interface ServiceCategory extends CollectionRecord {
  description: string;
  name: string;
}

export interface Service extends CollectionRecord {
  category: string;
  description: string;
  isAvailable: boolean;
  name: string;
}

type OpeningHours = {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export interface Business extends CollectionRecord {
  address: string;
  areas: string[];
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  country: string;
  description: string;
  isActive: boolean;
  name: string;
  openingHours: OpeningHours;
  paidUntil: DateString;
  priority: number;
  rating: number;
  services: string[];
  socialMediaLinks: Record<string, string>;
  thumbnail: string;
}
