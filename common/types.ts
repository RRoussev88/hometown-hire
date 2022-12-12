export interface User {
  id: string;
  avatar: string | null;
  businesses: string[];
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
  created?: string;
  updated?: string;
}
