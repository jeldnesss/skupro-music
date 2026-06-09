'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';
import { setNextTrack } from '@/store/features/trackSlice';
export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const [isLoop, setIsLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const [currTime, setCurrTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isPlay) {
      audioRef.current?.play();
    }
  }, [currentTrack, isPlay]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    if (audioRef) {
      audioRef.current?.play();
      dispatch(setIsPlay(true));
    }
  };
  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const pauseTrack = () => {
    if (audioRef) {
      audioRef.current?.pause();
      dispatch(setIsPlay(false));
    }
  };

  const toggleTrack = () => {
    if (audioRef) {
      if (!isPlay) {
        playTrack();
      } else {
        pauseTrack();
      }
    }
  };
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrTime(audioRef.current.currentTime);
      setTotalTime(audioRef.current.duration);
      setValue(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    setIsLoaded(true);
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement, Element>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };
  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };
  const onShuffle = () => {
    dispatch(toggleShuffle());
    console.log('shuffle:', state.isShuffle);
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        style={{ display: 'none' }}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={!isLoaded}
          value={value}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={toggleTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={toggleLoop}
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={classNames(styles.player__btnRepeatSvg, {
                    [styles.active__icon]: isLoop,
                  })}
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onShuffle}
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  {
                    [styles.active__icon]: isShuffle,
                  },
                )}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  name="range"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
              <div className={styles.time_show}>
                {getTimePanel(currTime, totalTime)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
