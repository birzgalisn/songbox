import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Artist from '@/components/artist';
import MarkFavorite from '@/components/mark-favorite';

export default function Artists({
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
      {items.map((artist) => {
        if (!artist || artist.type !== 'artist') {
          return null;
        }

        return (
          <Artist key={artist.id} item={artist}>
            <Artist.Row>
              <Artist.Cover />
              <Artist.Col>
                <Artist.Name>
                  <MarkFavorite type="artists" item={artist} />
                </Artist.Name>
                <Artist.Genres />
                <Artist.Popularity />
              </Artist.Col>
            </Artist.Row>
          </Artist>
        );
      })}
    </Group>
  );
}

Artists.Head = Group.Head;
