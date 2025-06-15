import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LastOnlineClock } from './last-online-clock';
import * as dateUtils from '../../../../utils/date-utils';

describe('LastOnlineClock', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(dateUtils, 'formatTimeSinceLastOnline').mockReturnValue('01:30:45');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('should render the clock with formatted time', () => {
    render(<LastOnlineClock lastOnlineTimestamp={1234567890} />);
    
    expect(screen.getByText('Time since last online:')).toBeInTheDocument();
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
  });

  it('should render 00:00:00 when no timestamp is provided', () => {
    vi.spyOn(dateUtils, 'formatTimeSinceLastOnline').mockReturnValue('00:00:00');
    render(<LastOnlineClock />);
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

  it('should update the time every second', () => {
    const formatTimeSpy = vi.spyOn(dateUtils, 'formatTimeSinceLastOnline')
      .mockReturnValueOnce('01:30:45')
      .mockReturnValueOnce('01:30:46')
      .mockReturnValueOnce('01:30:47');
    
    render(<LastOnlineClock lastOnlineTimestamp={1234567890} />);
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
    
    expect(formatTimeSpy).toHaveBeenCalledTimes(1);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(formatTimeSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByText('01:30:46')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    
    expect(formatTimeSpy).toHaveBeenCalledTimes(3);
    expect(screen.getByText('01:30:47')).toBeInTheDocument();
  });
}); 