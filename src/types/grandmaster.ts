export interface Grandmaster {
  username: string;
}

export interface GrandmasterProfile {
  username: string;
  name?: string;
  avatar?: string;
  location?: string;
  country?: string;
  joined?: number;
  status?: string;
  last_online?: number;
  followers?: number;
  url?: string;
  title?: string;
  player_id?: number;
  is_streamer?: boolean;
  verified?: boolean;
} 