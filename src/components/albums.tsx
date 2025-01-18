import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Album from '@/components/album';
import MarkFavorite from '@/components/mark-favorite';

export default function Albums({
  items,
  ...props
}: {
  items: TSearchResponseItems;
} & Omit<TGroup, 'children'>) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <Group {...props}>
      {items.map((item) => {
        if (!item || item.type !== 'album') {
          return null;
        }

        return (
          <Album key={item.id} item={item}>
            <Album.Row>
              <Album.Cover />
              <Album.Col>
                <Album.Title>
                  <MarkFavorite type="albums" item={item} />
                </Album.Title>
                <Album.Artist />
                <Album.Release />
                <Album.TotalTracks />
              </Album.Col>
            </Album.Row>
          </Album>
        );
      })}
    </Group>
  );
}

Albums.Head = Group.Head;
