'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Nav from '@/components/Nav/Nav';
import Bar from '@/components/Bar/Bar';
import MainSidebar from '@/components/MainSidebar/MainSidebar';
import Centerclock from '@/components/Centerblock/Centerblock';

import { SongType } from '@/sharedTypes/sharedTypes';
import styles from './page.module.css';
import { getCategoryById } from '@/services/tracks/tracksApi';

export default function CategoryPage() {
  const { id } = useParams();

  const [tracks, setTracks] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCategoryById(id as string);

        const ids = res?.data?.items;

        if (!Array.isArray(ids)) {
          setTracks([]);
          setError('В этой подборке нет треков');
          return;
        }

        const fullTracks = await Promise.all(
          ids.map((trackId: number) => {
            return fetch(
              `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${trackId}/`,
            )
              .then((res) => res.json())
              .then((data) => data.data);
          }),
        );

        setTracks(fullTracks);
      } catch (err) {
        console.error('CATEGORY ERROR:', err);
        setError('Ошибка загрузки подборки');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />

          {loading && <div>Загрузка...</div>}

          {error && !loading && <div style={{ color: 'red' }}>{error}</div>}

          {!loading && !error && <Centerclock tracks={tracks} />}

          <MainSidebar />
        </main>

        <Bar />
        <footer className="footer" />
      </div>
    </div>
  );
}
