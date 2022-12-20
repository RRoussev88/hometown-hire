interface CollectionRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created?: string;
  updated?: string;
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
  business: string;
  category: string;
  description: string;
  isAvailable: boolean;
  name: string;
}
