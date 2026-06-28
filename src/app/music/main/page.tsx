'use client';

import Centerclock from '@/components/Centerblock/Centerblock';

import { useAppSelector } from '@/store/store';

export default function Home() {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <Centerclock
      tracks={allTracks}
      isLoading={fetchIsLoading}
      errorRes={fetchError}
      title={'треки'}
    />
  );
}
