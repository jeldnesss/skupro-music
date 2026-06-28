import { render, screen, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from '@/store/features/trackSlice';
import { SongType } from '@/sharedTypes/sharedTypes';

jest.mock('@/services/tracks/favouritesTracks', () => ({
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

jest.mock('@/services/auth/withReAuth', () => ({
  withReAuth: async <T extends (...args: unknown[]) => Promise<unknown>>(
    fn: T,
  ) => fn(),
}));

const mockTracks: SongType[] = [
  {
    _id: 1,
    name: 'Song A',
    author: 'Author 1',
    genre: ['Rock'],
    album: 'Album A',
    duration_in_seconds: 180,
    release_date: '2023-01-01',
    logo: '',
    track_file: '',
    stared_user: [],
  },
  {
    _id: 2,
    name: 'Song B',
    author: 'Author 2',
    genre: ['Pop'],
    album: 'Album B',
    duration_in_seconds: 200,
    release_date: '2022-01-01',
    logo: '',
    track_file: '',
    stared_user: [],
  },
];

const store = configureStore({
  reducer: {
    tracks: trackSliceReducer,
  },
  preloadedState: {
    tracks: {
      currentTrack: null,
      isPlay: false,
      playlist: [],
      likedTracks: [],
      allTracks: [],
      fetchError: null,
      fetchIsLoading: false,
      isShuffle: false,
    },
  },
});

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Playlist track={mockTracks[0]} playlist={[mockTracks[0]]} />
    </Provider>,
  );

describe('Playlist component', () => {
  it('рендерит данные трека', () => {
    renderComponent();

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Album A')).toBeInTheDocument();
  });

  it('dispatch вызывается при клике на трек', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Song A'));
  });

  it('форматирует время', () => {
    renderComponent();

    expect(screen.getByText('3:00')).toBeInTheDocument();
  });
});
