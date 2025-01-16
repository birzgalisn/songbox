'use client';

import withNoSSR from '@/hoc/with-no-ssr';
import useFavorites from '@/hooks/use-favorites';
import Loading from '@/components/loading';
import Albums from '@/components/albums';
import Artists from '@/components/artists';
import Playlists from '@/components/playlists';
import Audiobooks from '@/components/audiobooks';
import Episodes from '@/components/episodes';
import Shows from '@/components/shows';
import Tracks from '@/components/tracks';

function Favorites() {
  const { hasSomeFavorites, data: favorites } = useFavorites();

  if (!hasSomeFavorites) {
    return <p className="text-center">No favorites to show</p>;
  }

  return (
    <ol className="flex flex-col gap-2 group-has-[[data-pending]]:animate-pulse">
      <Albums
        albums={favorites.albums}
        head={
          <Albums.Head>
            Favorite albums ({favorites.albums?.length})
          </Albums.Head>
        }
      />

      <Artists
        artists={favorites.artists}
        head={
          <Artists.Head>
            Favorite artists ({favorites.artists?.length})
          </Artists.Head>
        }
      />

      <Playlists
        playlists={favorites.playlists}
        head={
          <Playlists.Head>
            Favorite playlists ({favorites.playlists?.length})
          </Playlists.Head>
        }
      />

      <Tracks
        tracks={favorites.tracks}
        head={
          <Tracks.Head>
            Favorite tracks ({favorites.tracks?.length})
          </Tracks.Head>
        }
      />

      <Shows
        shows={favorites.shows}
        head={
          <Shows.Head>Favorite shows ({favorites.shows?.length})</Shows.Head>
        }
      />

      <Episodes
        episodes={favorites.episodes}
        head={
          <Episodes.Head>
            Favorite episodes ({favorites.episodes?.length})
          </Episodes.Head>
        }
      />

      <Audiobooks
        audiobooks={favorites.audiobooks}
        head={
          <Audiobooks.Head>
            Favorite audiobooks ({favorites.audiobooks?.length})
          </Audiobooks.Head>
        }
      />
    </ol>
  );
}

export default withNoSSR(Favorites, { loading: () => <Loading /> });
