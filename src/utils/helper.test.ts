import { formatTime, getUniqueValuesByKey } from './helper';

describe('formatTime', () => {
  test('formats seconds to MM:SS correctly', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(5)).toBe('0:05');
    expect(formatTime(60)).toBe('1:00');
    expect(formatTime(125)).toBe('2:05');
  });
});
describe('getUniqueValuesByKey', () => {
  const mockData = [
    { author: 'A', genre: 'Rock' },
    { author: 'A', genre: 'Pop' },
    { author: 'B', genre: 'Rock' },
  ] as any;

  test('returns unique authors', () => {
    expect(getUniqueValuesByKey(mockData, 'author')).toEqual(['A', 'B']);
  });

  test('returns unique genres', () => {
    expect(getUniqueValuesByKey(mockData, 'genre')).toEqual(['Rock', 'Pop']);
  });

  test('returns empty array if input is empty', () => {
    expect(getUniqueValuesByKey([], 'author')).toEqual([]);
  });
});