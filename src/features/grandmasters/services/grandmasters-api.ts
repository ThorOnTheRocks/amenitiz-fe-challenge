import type { Grandmaster, GrandmasterProfile } from '../../../types/grandmaster';

const profileCache: Record<string, GrandmasterProfile> = {};

const API_BASE_URL = 'https://api.chess.com/pub';

export async function fetchGrandmasters(): Promise<Grandmaster[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/titled/GM`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.players.map((username: string) => ({
      username
    }));
  } catch (error) {
    console.error('Error in fetchGrandmasters:', error);
    throw error;
  }
}

export async function fetchGrandmasterProfile(username: string): Promise<GrandmasterProfile> {
  try {
    if (profileCache[username]) {
      return profileCache[username];
    }
    
    const response = await fetch(`${API_BASE_URL}/player/${username}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();    
    profileCache[username] = data;
    
    return data;
  } catch (error) {
    console.error(`Error fetching profile for ${username}:`, error);
    throw error;
  }
}

export async function prefetchGrandmasterProfiles(usernames: string[]): Promise<void> {
  const uncachedUsernames = usernames.filter(username => !profileCache[username]);
  
  if (uncachedUsernames.length === 0) {
    return;
  }
    
  await Promise.all(
    uncachedUsernames.map(username => 
      fetchGrandmasterProfile(username)
        .catch(err => console.error(`Failed to prefetch ${username}:`, err))
    )
  );
}

export function isProfileCached(username: string): boolean {
  return !!profileCache[username];
} 