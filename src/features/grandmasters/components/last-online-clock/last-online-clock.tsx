import { useState, useEffect, useCallback } from 'react';
import Text from '../../../../components/text';
import Box from '../../../../components/box';
import { formatTimeSinceLastOnline } from '../../../../utils/date-utils';
import './last-online-clock.css';

interface LastOnlineClockProps {
  lastOnlineTimestamp?: number;
}

export function LastOnlineClock({ lastOnlineTimestamp }: LastOnlineClockProps) {
  const [timeString, setTimeString] = useState('00:00:00');

  const updateTime = useCallback(() => {
    setTimeString(formatTimeSinceLastOnline(lastOnlineTimestamp || 0));
  }, [lastOnlineTimestamp]);

  useEffect(() => {
    if (!lastOnlineTimestamp) {
      setTimeString('00:00:00');
      return;
    }

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp, updateTime]);

  return (
    <Box margin="md">
      <Text variant="body">Time since last online:</Text>
      <Box display="flex" justify="center" align="center" className="clock" padding="sm">
        <Text variant="h3" className="time">{timeString}</Text>
      </Box>
    </Box>
  );
} 