'use client';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import { formatTime, getUniqueValuesByKey } from '@/utils/helper';
import Playlist from '../Playlist/Playlist';
import { useState } from 'react';
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
  const toggleFilter = (type: FilterType) => {
    setActiveFilter((prev: FilterType | null) => (prev === type ? null : type));
  };
  const authors = getUniqueValuesByKey(tracks, 'author');
  const genres = getUniqueValuesByKey(tracks, 'genre');

  const years = [
    ...new Set(
      tracks.map((track) => new Date(track.release_date).getFullYear()),
    ),
  ].sort((a, b) => b - a);
  return (
    <div className={styles.centerblock}>
      <Search />
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
      </div>
      {activeFilter === 'author' && (
        <div className={styles.filter__list}>
          {authors.map((author) => (
            <div key={author}>{author}</div>
          ))}
        </div>
      )}

      {activeFilter === 'year' && (
        <div className={styles.filter__list}>
          {years.map((year) => (
            <div key={year}>{year}</div>
          ))}
        </div>
      )}

      {activeFilter === 'genre' && (
        <div className={styles.filter__list}>
          {genres.map((genre) => (
            <div key={genre}>{genre}</div>
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
              : tracks.map((track) => (
                  <Playlist key={track._id} track={track} playlist={tracks} />
                ))}
        </div>
      </div>
    </div>
  );
}
