'use client';

import { Suspense } from 'react';
import useSearchResults from '@/hooks/use-search-results';
import Loading from '@/components/loading';
import Artists from '@/components/artists';
import Albums from '@/components/albums';
import Playlists from '@/components/playlists';
import Audiobooks from '@/components/audiobooks';
import Episodes from '@/components/episodes';
import Shows from '@/components/shows';
import Tracks from '@/components/tracks';

export default function SearchResultsBoundary() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchResults() {
  const { data: results = {} } = useSearchResults();

  if (!results) {
    return null;
  }

  if ('error' in results) {
    return (
      <p className="text-center">
        {results.error?.message || 'Something unexpected happened'}
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-2">
      <Albums
        albums={results.albums?.items}
        head={
          <Albums.Head>Matching albums ({results.albums?.total})</Albums.Head>
        }
      />

      <Artists
        artists={results.artists?.items}
        head={
          <Artists.Head>
            Matching artists ({results.artists?.total})
          </Artists.Head>
        }
      />

      <Playlists
        playlists={results.playlists?.items}
        head={
          <Playlists.Head>
            Matching playlists ({results.playlists?.total})
          </Playlists.Head>
        }
      />

      <Tracks
        tracks={results.tracks?.items}
        head={
          <Tracks.Head>Matching tracks ({results.tracks?.total})</Tracks.Head>
        }
      />

      <Shows
        shows={results.shows?.items}
        head={<Shows.Head>Matching shows ({results.shows?.total})</Shows.Head>}
      />

      <Episodes
        episodes={results.episodes?.items}
        head={
          <Episodes.Head>
            Matching episodes ({results.episodes?.total})
          </Episodes.Head>
        }
      />

      <Audiobooks
        audiobooks={results.audiobooks?.items}
        head={
          <Playlists.Head>
            Matching audiobooks ({results.audiobooks?.total})
          </Playlists.Head>
        }
      />
    </ol>
  );
}
