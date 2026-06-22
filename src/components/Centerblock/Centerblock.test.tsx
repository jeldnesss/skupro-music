import { render, screen, fireEvent } from '@testing-library/react';
import Centerblock from './Centerblock';

const mockTracks = [
  {
    _id: 1,
    name: 'Song A',
    author: 'Author 1',
    genre: 'Rock',
    release_date: '2023-01-01',
  },
  {
    _id: 2,
    name: 'Song B',
    author: 'Author 2',
    genre: 'Pop',
    release_date: '2022-01-01',
  },
];

jest.mock('../Search/Search', () => ({
  __esModule: true,
  default: ({ value, onChange }: any) => (
    <input
      placeholder="Поиск"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('Centerblock', () => {
  it('рендерит список треков', () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />
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
      />
    );

    const input = screen.getByPlaceholderText('Поиск');

    fireEvent.change(input, { target: { value: 'Song A' } });

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.queryByText('Song B')).not.toBeInTheDocument();
  });

  it('открывает фильтр по автору и выбирает значение', () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />
    );

    screen.getByText('исполнителю').click();
    screen.getByText('Author 1').click();

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.queryByText('Song B')).not.toBeInTheDocument();
  });

  it('сбрасывает фильтры', () => {
    render(
      <Centerblock
        tracks={mockTracks}
        isLoading={false}
        errorRes={null}
        title="Треки"
      />
    );

    screen.getByText('исполнителю').click();
    screen.getByText('Author 1').click();

    screen.getByText('Сбросить фильтры').click();

    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Song B')).toBeInTheDocument();
  });
});