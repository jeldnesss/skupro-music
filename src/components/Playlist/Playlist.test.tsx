import { render, screen, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { trackSliceReducer } from '@/store/features/trackSlice';


jest.mock('@/services/tracks/favouritesTracks', () => ({
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

jest.mock('@/services/auth/withReAuth', () => ({
  withReAuth: (fn: any) => fn(),
}));

const mockTrack = {
  _id: 1,
  name: 'Test song',
  author: 'Test author',
  album: 'Test album',
  duration_in_seconds: 120,
};

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
      <Playlist track={mockTrack as any} playlist={[mockTrack as any]} />
    </Provider>,
  );

describe('Playlist component', () => {
  it('рендерит данные трека', () => {
    renderComponent();

    expect(screen.getByText('Test song')).toBeInTheDocument();
    expect(screen.getByText('Test author')).toBeInTheDocument();
    expect(screen.getByText('Test album')).toBeInTheDocument();
  });

  it('dispatch вызывается при клике на трек', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Test song'));

  });

  it('форматирует время', () => {
    renderComponent();

    expect(screen.getByText('2:00')).toBeInTheDocument();
  });
});