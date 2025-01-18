import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Track from '@/components/track';
import MarkFavorite from '@/components/mark-favorite';

export default function Tracks({
  items,
  ...props
}: {
  items: TSearchResponseItems;
} & Omit<TGroup, 'children'>) {
  if (!items || !items?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {items.map((item) => {
        if (!item || item.type !== 'track') {
          return null;
        }

        return (
          <Track key={item.id} item={item}>
            <Track.Row>
              <Track.Cover />
              <Track.Col>
                <Track.Title>
                  <MarkFavorite type="tracks" item={item} />
                </Track.Title>
                <Track.Artist />
                <Track.Popularity />
                <Track.Disc />
              </Track.Col>
            </Track.Row>
          </Track>
        );
      })}
    </Group>
  );
}

Tracks.Head = Group.Head;
