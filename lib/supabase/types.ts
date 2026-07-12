export type Rsvp = {
  id: string;
  created_at: string;
  name: string;
  attending: boolean;
  guest_count: number;
  user_id: string | null;
  verified: boolean;
};

export type Wish = {
  id: string;
  created_at: string;
  name: string;
  message: string;
  user_id: string | null;
  avatar_url: string | null;
  verified: boolean;
  approved: boolean;
};

export type RsvpStats = {
  total_attending: number;
  total_guests: number;
  total_declined: number;
};
