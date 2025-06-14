export function formatTimeSinceLastOnline(timestamp: number): string {
  if (!timestamp) return '00:00:00';

  const now = Math.floor(Date.now() / 1000);
  const secondsDiff = Math.max(0, now - timestamp);

  const hours = Math.floor(secondsDiff / 3600);
  const minutes = Math.floor((secondsDiff % 3600) / 60);
  const seconds = secondsDiff % 60;

  const padToTwoDigits = (num: number): string => num.toString().padStart(2, '0');

  return [hours, minutes, seconds]
    .map(padToTwoDigits)
    .join(':');
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return 'Unknown';
  
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 