'use client';

import withNoSSR from '@/hoc/with-no-ssr';
import useFavorites from '@/hooks/use-favorites';
import Loading from '@/components/loading';
import Albums from '@/components/albums';
import Artists from '@/components/artists';

function Favorites() {
  const { hasSomeFavorites, data: favorites } = useFavorites();

  if (!hasSomeFavorites) {
    return <p className="text-center">No favorites to show</p>;
  }

  return (
    <ol className="flex flex-col gap-2">
      <Artists
        artists={favorites.artists}
        head={
          <Artists.Head>
            Favorite artists ({favorites.artists?.length})
          </Artists.Head>
        }
      />

      <Albums
        albums={favorites.albums}
        head={
          <Albums.Head>
            Favorite albums ({favorites.albums?.length})
          </Albums.Head>
        }
      />
    </ol>
  );
}

export default withNoSSR(Favorites, { loading: () => <Loading /> });
