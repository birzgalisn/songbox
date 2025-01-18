import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Show from '@/components/show';
import MarkFavorite from '@/components/mark-favorite';

export default function Shows({
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
        if (!item || item.type !== 'show') {
          return null;
        }

        return (
          <Show key={item.id} item={item}>
            <Show.Row>
              <Show.Cover />
              <Show.Col>
                <Show.Title>
                  <MarkFavorite type="shows" item={item} />
                </Show.Title>
                <Show.Desription />
                <Show.Publisher />
              </Show.Col>
            </Show.Row>
          </Show>
        );
      })}
    </Group>
  );
}

Shows.Head = Group.Head;
