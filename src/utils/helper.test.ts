import { SongType } from '@/sharedTypes/sharedTypes';
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
  const mockData: SongType[] = [
    {
      _id: 1,
      name: 'Song A',
      author: 'A',
      genre: ['Rock'],
      album: 'Album A',
      duration_in_seconds: 120,
      release_date: '2023-01-01',
      logo: '',
      track_file: '',
      stared_user: [],
    },
    {
      _id: 2,
      name: 'Song B',
      author: 'A',
      genre: ['Pop'],
      album: 'Album B',
      duration_in_seconds: 200,
      release_date: '2023-01-01',
      logo: '',
      track_file: '',
      stared_user: [],
    },
    {
      _id: 3,
      name: 'Song C',
      author: 'B',
      genre: ['Rock'],
      album: 'Album C',
      duration_in_seconds: 150,
      release_date: '2023-01-01',
      logo: '',
      track_file: '',
      stared_user: [],
    },
  ];

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
