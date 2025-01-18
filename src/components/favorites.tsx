'use client';

import withNoSSR from '@/hoc/with-no-ssr';
import useFavorites from '@/hooks/use-favorites';
import Loading from '@/components/loading';
import List from '@/components/list';

function Favorites() {
  const { isLoading, hasSomeFavorites, data: favorites } = useFavorites();

  if (!isLoading && !hasSomeFavorites) {
    return <p className="text-center">No favorites to show</p>;
  }

  return (
    <List>
      {Object.entries(favorites).map(([group, items]) => (
        <List.Group
          key={group}
          group={group}
          items={items}
          head={
            <List.Group.Head>
              Favorite {group} ({items.length})
            </List.Group.Head>
          }
        />
      ))}
    </List>
  );
}

export default withNoSSR(Favorites, { loading: () => <Loading /> });
