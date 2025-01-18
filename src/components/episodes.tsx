import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Episode from '@/components/episode';
import MarkFavorite from '@/components/mark-favorite';

export default function Episodes({
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
        if (!item || item.type !== 'episode') {
          return null;
        }

        return (
          <Episode item={item} key={item.id}>
            <Episode.Row>
              <Episode.Cover />
              <Episode.Col>
                <Episode.Title>
                  <MarkFavorite type="episodes" item={item} />
                </Episode.Title>
                <Episode.Desription />
                <Episode.Released />
              </Episode.Col>
            </Episode.Row>
          </Episode>
        );
      })}
    </Group>
  );
}

Episodes.Head = Group.Head;
