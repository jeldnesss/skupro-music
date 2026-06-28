import { render, screen, fireEvent } from '@testing-library/react';
import Centerblock from './Centerblock';
import { SongType } from '@/sharedTypes/sharedTypes';
import userEvent from '@testing-library/user-event';
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
type SearchMockProps = {
  value: string;
  onChange: (value: string) => void;
};
jest.mock('../Search/Search', () => ({
  __esModule: true,
  default: ({ value, onChange }: SearchMockProps) => (
    <input
      placeholder="Поиск"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  ),
}));
jest.mock('../Playlist/Playlist', () => ({
  __esModule: true,
  default: ({
    track,
  }: {
    track: {
      name: string;
    };
  }) => <div>{track.name}</div>,
}));

describe('Centerblock', () => {
  it('рендерит список треков', () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />,
    );

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Song B')).toBeInTheDocument();
  });

  it('фильтрует по поиску', () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />,
    );

    const input = screen.getByPlaceholderText('Поиск');

    fireEvent.change(input, { target: { value: 'Song A' } });

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.queryByText('Song B')).not.toBeInTheDocument();
  });

  it('открывает фильтр по автору и выбирает значение', async () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByText('исполнителю'));

    const author = await screen.findByText('Author 1');

    await user.click(author);

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.queryByText('Song B')).not.toBeInTheDocument();
  });

  it('сбрасывает фильтры', async () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByText('исполнителю'));

    const author = await screen.findByText('Author 1');

    await user.click(author);

    await user.click(screen.getByText('Сбросить фильтры'));

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Song B')).toBeInTheDocument();
  });
});
