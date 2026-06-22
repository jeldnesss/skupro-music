'use client';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { formatTime, getUniqueValuesByKey } from '@/utils/helper';
import Playlist from '../Playlist/Playlist';
import { useMemo, useState } from 'react';
import { SongType } from '@/sharedTypes/sharedTypes';
type CenterclockProps = {
  tracks: SongType[];
  isLoading: boolean;
  errorRes: string | null;
  title: string;
};
export default function Centerclock({
  tracks,
  errorRes,
  isLoading,
  title,
}: CenterclockProps) {
  type FilterType = 'author' | 'year' | 'genre';

  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [sortType, setSortType] = useState<'new' | 'old' | null>(null);
  const toggleFilter = (type: FilterType) => {
    setActiveFilter((prev: FilterType | null) => (prev === type ? null : type));
  };
  const authors = getUniqueValuesByKey(tracks, 'author');
  const genres = getUniqueValuesByKey(tracks, 'genre');

  const years = [
    ...new Set(
      tracks
        .map((track) => {
          const year = new Date(track.release_date).getFullYear();
          return Number.isNaN(year) ? null : year;
        })
        .filter((year): year is number => year !== null),
    ),
  ].sort((a, b) => b - a);
  const filteredTracks = useMemo(() => {
    let result = tracks.filter((track) => {
      const matchAuthor = !selectedAuthor || track.author === selectedAuthor;

      const matchGenre = !selectedGenre || track.genre === selectedGenre;

      const matchYear =
        !selectedYear ||
        new Date(track.release_date).getFullYear() === selectedYear;

      const matchSearch =
        track.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        track.author.toLowerCase().includes(searchValue.toLowerCase());

      return matchAuthor && matchGenre && matchYear && matchSearch;
    });

    if (sortType === 'new') {
      result = [...result].sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    }

    if (sortType === 'old') {
      result = [...result].sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
    }

    return result;
  }, [
    tracks,
    selectedAuthor,
    selectedGenre,
    selectedYear,
    searchValue,
    sortType,
  ]);
  return (
    <div className={styles.centerblock}>
      <Search value={searchValue} onChange={setSearchValue} />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>

        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'author',
          })}
          onClick={() => toggleFilter('author')}
        >
          исполнителю
        </div>

        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'year',
          })}
          onClick={() => toggleFilter('year')}
        >
          году выпуска
        </div>

        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'genre',
          })}
          onClick={() => toggleFilter('genre')}
        >
          жанру
        </div>
        {(selectedAuthor || selectedGenre || selectedYear || searchValue) && (
          <div
            className={styles.filter__button}
            onClick={() => {
              setSelectedAuthor(null);
              setSelectedGenre(null);
              setSelectedYear(null);
              setSearchValue('');
              setActiveFilter(null);
            }}
          >
            Сбросить фильтры
          </div>
        )}
      </div>

      {activeFilter === 'author' && (
        <div className={styles.filter__list}>
          {authors.map((author) => (
            <div
              key={author}
              className={classNames(styles.filter__item, {
                [styles.active]: selectedAuthor === author,
              })}
              onClick={() =>
                setSelectedAuthor(selectedAuthor === author ? null : author)
              }
            >
              {author}
            </div>
          ))}
        </div>
      )}

      {activeFilter === 'year' && (
        <div className={styles.filter__list}>
          {years.map((year) => (
            <div
              key={year}
              className={classNames(styles.filter__item, {
                [styles.active]: selectedYear === year,
              })}
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
            >
              {year}
            </div>
          ))}
        </div>
      )}

      {activeFilter === 'genre' && (
        <div className={styles.filter__list}>
          {genres.map((genre) => (
            <div
              key={genre}
              className={classNames(styles.filter__item, {
                [styles.active]: selectedGenre === genre,
              })}
              onClick={() =>
                setSelectedGenre(selectedGenre === genre ? null : genre)
              }
            >
              {genre}
            </div>
          ))}
        </div>
      )}
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {errorRes
            ? errorRes
            : isLoading
              ? 'Загрузка...'
              : filteredTracks.map((track) => (
                  <Playlist key={track._id} track={track} playlist={tracks} />
                ))}
        </div>
      </div>
    </div>
  );
}
