import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GrandmasterProfilePage } from './grandmaster-profile-page';
import { useGrandmasterProfileStore } from '../../store/use-grandmaster-profile-store';
import type { GrandmasterProfile } from '../../../../types/grandmaster';

vi.mock('react-router-dom', () => ({
  useParams: () => ({ username: 'magnus' }),
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
    <a href={to} data-testid="router-link">{children}</a>
  )
}));

vi.mock('../../store/useGrandmasterProfileStore', () => ({
  useGrandmasterProfileStore: vi.fn()
}));

vi.mock('../../components/last-online-clock', () => ({
  LastOnlineClock: ({ lastOnlineTimestamp }: { lastOnlineTimestamp?: number }) => (
    <div data-testid="last-online-clock">
      Last online: {lastOnlineTimestamp ? new Date(lastOnlineTimestamp).toISOString() : 'unknown'}
    </div>
  )
}));

describe('GrandmasterProfilePage', () => {
  const mockFetchProfile = vi.fn();
  
  const mockProfile: GrandmasterProfile = {
    username: 'magnus',
    name: 'Magnus Carlsen',
    avatar: 'https://example.com/avatar.jpg',
    title: 'GM',
    location: 'Norway',
    country: 'NO',
    joined: 1609459200000, // 2021-01-01
    last_online: Date.now(),
    followers: 10000,
    is_streamer: true,
    url: 'https://chess.com/member/magnus'
  };
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: null,
      loading: false,
      loadingFromCache: false,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: null
    });
  });

  it('fetches profile on component mount if not already loaded', () => {
    render(<GrandmasterProfilePage />);
    
    expect(mockFetchProfile).toHaveBeenCalledWith('magnus');
  });

  it('does not fetch profile if already loaded for the same username', () => {
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: mockProfile,
      loading: false,
      loadingFromCache: false,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: 'magnus'
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(mockFetchProfile).not.toHaveBeenCalled();
  });

  it('renders loading state', () => {
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: null,
      loading: true,
      loadingFromCache: false,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: null
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(screen.getByText('Loading profile...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = new Error('Failed to fetch');
    
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: null,
      loading: false,
      loadingFromCache: false,
      error,
      fetchProfile: mockFetchProfile,
      currentUsername: null
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(screen.getByText('Error loading profile: Failed to fetch')).toBeInTheDocument();
  });

  it('renders not found state', () => {
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: null,
      loading: false,
      loadingFromCache: false,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: null
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(screen.getByText('Grandmaster not found')).toBeInTheDocument();
  });

  it('renders profile details', () => {
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: mockProfile,
      loading: false,
      loadingFromCache: false,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: 'magnus'
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(screen.getByText('Magnus Carlsen')).toBeInTheDocument();
    expect(screen.getByText('Title: GM')).toBeInTheDocument();
    expect(screen.getByText('Location: Norway')).toBeInTheDocument();
    expect(screen.getByText('Country: NO')).toBeInTheDocument();
    expect(screen.getByText('Followers: 10000')).toBeInTheDocument();
    expect(screen.getByText('Chess.com Streamer')).toBeInTheDocument();
    
    const avatar = screen.getByAltText("magnus's avatar");
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    
    const profileLink = screen.getByText('Visit Chess.com Profile');
    expect(profileLink).toHaveAttribute('href', 'https://chess.com/member/magnus');
  });

  it('shows loading overlay when loading from cache', () => {
    (useGrandmasterProfileStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      profile: mockProfile,
      loading: false,
      loadingFromCache: true,
      error: null,
      fetchProfile: mockFetchProfile,
      currentUsername: 'magnus'
    });
    
    render(<GrandmasterProfilePage />);
    
    expect(screen.getByText('Loading latest data...')).toBeInTheDocument();
  });
}); 