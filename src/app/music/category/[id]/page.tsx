'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import Centerclock from '@/components/Centerblock/Centerblock';

import { SongType } from '@/sharedTypes/sharedTypes';
import { getCategoryById, getTracks } from '@/services/tracks/tracksApi';

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

        const allTracks = await getTracks();

        const categoryTracks = allTracks.filter((track) =>
          ids.includes(track._id),
        );

        setTracks(categoryTracks);
      } catch (err) {
        console.error('CATEGORY ERROR:', err);
        setError('Ошибка загрузки подборки');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <Centerclock
      errorRes={error}
      tracks={tracks}
      isLoading={loading}
      title="Треки"
    />
  );
}

