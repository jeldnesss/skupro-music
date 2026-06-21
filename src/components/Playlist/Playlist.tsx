import { SongType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helper';
import Link from 'next/link';
import styles from './playlist.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
  toggleLike,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import {
  addFavorite,
  removeFavorite,
} from '@/services/tracks/favouritesTracks';
import { withReAuth } from '@/services/auth/withReAuth';
import { useCallback } from 'react';
type PlaylistProps = {
  track: SongType;
  playlist: SongType[];
};
export default function Playlist({ track, playlist }: PlaylistProps) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isActive = isPlay && currentTrack?._id === track._id;
  const isActivePause = currentTrack?._id === track._id;
  const likedTracks = useAppSelector((state) => state.tracks.likedTracks);
  const isLiked = likedTracks.includes(track._id);
  const onClickTrack = useCallback(() => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setIsPlay(true));
  }, [dispatch, track, playlist]);
  const handleLike = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();

      try {
        if (isLiked) {
          await withReAuth(() => removeFavorite(track._id));
        } else {
          await withReAuth(() => addFavorite(track._id));
        }

        dispatch(toggleLike(track._id));
      } catch (err) {
        console.error('LIKE ERROR', err);
      }
    },
    [isLiked, track._id, dispatch],
  );
  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg
              className={classNames(styles.track__titleSvg, {
                [styles.active]: isActive,
                [styles.active_pause]: isActivePause,
              })}
            >
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className="track__time">
          <svg
            className={classNames(styles.track__timeSvg, {
              [styles.liked]: isLiked,
            })}
            onClick={handleLike}
          >
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
