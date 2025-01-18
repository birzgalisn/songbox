import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Audiobook from '@/components/audiobook';
import MarkFavorite from '@/components/mark-favorite';

export default function Audiobooks({
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
        if (!item || item.type !== 'audiobook') {
          return null;
        }

        return (
          <Audiobook key={item.id} item={item}>
            <Audiobook.Row>
              <Audiobook.Cover />
              <Audiobook.Col>
                <Audiobook.Title>
                  <MarkFavorite type="audiobooks" item={item} />
                </Audiobook.Title>
                <Audiobook.Chapters />
                <Audiobook.Publisher />
              </Audiobook.Col>
            </Audiobook.Row>
          </Audiobook>
        );
      })}
    </Group>
  );
}

Audiobooks.Head = Group.Head;
