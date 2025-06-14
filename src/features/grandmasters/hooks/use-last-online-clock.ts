import { useState, useEffect } from 'react';
import { formatTimeSinceLastOnline } from '../../../utils/date-utils';

export function useLastOnlineClock(lastOnlineTimestamp?: number) {
  const [timeString, setTimeString] = useState('00:00:00');

  useEffect(() => {
    if (!lastOnlineTimestamp) {
      setTimeString('00:00:00');
      return;
    }

    setTimeString(formatTimeSinceLastOnline(lastOnlineTimestamp));

    const interval = setInterval(() => {
      setTimeString(formatTimeSinceLastOnline(lastOnlineTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  return timeString;
} 