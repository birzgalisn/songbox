import { TAudiobooks } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Audiobook from '@/components/audiobook';
import MarkFavorite from '@/components/mark-favorite';

export default function Audiobooks({
  audiobooks,
  ...props
}: {
  audiobooks: TAudiobooks['items'];
} & Omit<TGroup, 'children'>) {
  if (!audiobooks || !audiobooks?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {audiobooks.map((audiobook) => {
        if (!audiobook) {
          return null;
        }

        return (
          <Audiobook audiobook={audiobook} key={audiobook.id}>
            <Audiobook.Row>
              <Audiobook.Cover />
              <Audiobook.Col>
                <Audiobook.Title>
                  <MarkFavorite type="audiobooks" item={audiobook} />
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
