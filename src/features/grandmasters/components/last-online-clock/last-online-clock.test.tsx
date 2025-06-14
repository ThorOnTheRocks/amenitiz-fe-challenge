import { describe, expect, it, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LastOnlineClock } from './last-online-clock';
import { formatTimeSinceLastOnline } from '../../../../utils/date-utils';


vi.mock('../../../../utils/date-utils', () => ({
  formatTimeSinceLastOnline: vi.fn()
}));

describe('LastOnlineClock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(formatTimeSinceLastOnline).mockReturnValue('01:30:45');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('renders the clock with formatted time', () => {
    render(<LastOnlineClock lastOnlineTimestamp={1234567890} />);
    
    expect(screen.getByText('Time since last online:')).toBeInTheDocument();
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
  });

  it('renders 00:00:00 when no timestamp is provided', () => {
    (formatTimeSinceLastOnline as Mock).mockReturnValue('00:00:00');
    render(<LastOnlineClock />);
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  it('updates the time every second', () => {
    (formatTimeSinceLastOnline as Mock)
      .mockReturnValueOnce('01:30:45')
      .mockReturnValueOnce('01:30:46');
    
    render(<LastOnlineClock lastOnlineTimestamp={1234567890} />);
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
    
    vi.advanceTimersByTime(1000);
    
    expect(formatTimeSinceLastOnline).toHaveBeenCalledTimes(3);
    expect(screen.getByText('01:30:46')).toBeInTheDocument();
  });
}); 