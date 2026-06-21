'use client';

import Centerclock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';
import { useMemo } from 'react';

export default function FavoritesPage() {
  const { allTracks, likedTracks, fetchError, fetchIsLoading } = useAppSelector(
    (state) => state.tracks,
  );

  const favoriteTracks = useMemo(() => {
    return allTracks.filter((track) => likedTracks.includes(track._id));
  }, [allTracks, likedTracks]);

  return (
    <Centerclock
      tracks={favoriteTracks}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title={'Избранное'}
    />
  );
}
