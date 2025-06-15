import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Text } from '../../../../components';
import { LastOnlineClock } from '../../components/last-online-clock';
import { formatDate } from '../../../../utils/date-utils';
import { useGrandmasterProfileStore } from '../../store/use-grandmaster-profile-store';
import './grandmaster-profile-page.css';

export function GrandmasterProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { 
    profile, 
    loading, 
    loadingFromCache, 
    error, 
    fetchProfile, 
    currentUsername
  } = useGrandmasterProfileStore();

  useEffect(() => {
    if (!username) return;
    
    const needsFetch = !profile || currentUsername !== username;
    if (needsFetch) {
      fetchProfile(username);
    }
  }, [username, currentUsername, profile, fetchProfile]);

  const renderLoading = () => (
    <Box display="flex" justify="center" padding="lg">
      <Text variant="h3">Loading profile...</Text>
    </Box>
  );

  const renderError = () => (
    <Box display="flex" justify="center" padding="lg" className="error-message">
      <Text variant="h3">Error loading profile: {error?.message}</Text>
    </Box>
  );

  const renderNotFound = () => (
    <Box display="flex" justify="center" padding="lg" className="error-message">
      <Text variant="h3">Grandmaster not found</Text>
    </Box>
  );

  const renderProfileDetails = () => {
    if (!profile) return null;
    
    return (
      <Box className="profile-page">
        <Box className="back-link-container" padding="sm" margin="md">
          <Link to="/" className="back-link">
            <span className="back-arrow">←</span> Back to Grandmasters List
          </Link>
        </Box>

        <Box 
          padding="lg" 
          margin="md" 
          className="profile-container"
        >
          {loadingFromCache && (
            <Box className="loading-overlay">
              <Text variant="body">Loading latest data...</Text>
            </Box>
          )}
          
          <Box display="flex" justify="between" align="start" className="profile-content">
            <Box className="profile-info">
              <Box display="flex" align="center" className="profile-header">
                {profile.avatar && (
                  <img 
                    src={profile.avatar} 
                    alt={`${profile.username}'s avatar`}
                    className="profile-avatar"
                  />
                )}
                <Box>
                  <Text variant="h1">{profile.username}</Text>
                  <Text variant="h3">{profile.name || 'No name available'}</Text>
                  {profile.title && <Text variant="body">Title: {profile.title}</Text>}
                </Box>
              </Box>

              <Box className="profile-details">
                {profile.location && (
                  <Box padding='sm'>
                    <Text variant="body">Location: {profile.location}</Text>
                  </Box>
                )}
                {profile.country && (
                  <Box padding='sm'>
                    <Text variant="body">Country: {profile.country}</Text>
                  </Box>
                )}
                {profile.joined && (
                  <Box padding='sm'>
                    <Text variant="body">Joined: {formatDate(profile.joined)}</Text>
                  </Box>
                )}
                {profile.followers !== undefined && (
                  <Box padding='sm'>
                    <Text variant="body">Followers: {profile.followers}</Text>
                  </Box>
                )}
                {profile.is_streamer && (
                  <Box padding='sm'>
                    <Text variant="body" className="streamer-badge">Chess.com Streamer</Text>
                  </Box>
                )}
                {profile.url && (
                  <Box padding='sm'>
                    <a 
                      href={profile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="profile-link"
                    >
                      Visit Chess.com Profile
                    </a>
                  </Box>
                )}
              </Box>
            </Box>

            <Box className="last-online-container">
              <LastOnlineClock lastOnlineTimestamp={profile.last_online} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  if (loading && !loadingFromCache) {
    return renderLoading();
  }

  if (error) {
    return renderError();
  }

  if (!profile) {
    return renderNotFound();
  }

  return renderProfileDetails();
}
