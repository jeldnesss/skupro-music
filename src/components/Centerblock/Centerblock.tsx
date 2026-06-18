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
};
export default function Centerclock({ tracks }: CenterclockProps) {
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
      <h2 className={styles.centerblock__h2}>Треки</h2>
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
          {tracks.map((track) => (
            <Playlist key={track._id} track={track} playlist={tracks} />
          ))}
          <div className={styles.playlist__track}>
            <div className={styles.track__title}>
              <div className={styles.track__titleImage}>
                <svg className={styles.track__titleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                </svg>
              </div>
              <div>
                <Link className={styles.track__titleLink} href="">
                  Run Run
                  <span className={styles.track__titleSpan}>(feat. AR/CO)</span>
                </Link>
              </div>
            </div>
            <div className={styles.track__author}>
              <Link className={styles.track__authorLink} href="">
                Jaded, Will Clarke, AR/CO
              </Link>
            </div>
            <div className={styles.track__album}>
              <Link className={styles.track__albumLink} href="">
                Run Run
              </Link>
            </div>
            <div className="track__time">
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.track__timeText}>2:54</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
