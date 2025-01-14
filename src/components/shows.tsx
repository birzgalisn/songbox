import { TShows } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Show from '@/components/show';
import MarkFavorite from '@/components/mark-favorite';

export default function Shows({
  shows,
  ...props
}: {
  shows: TShows['items'];
} & Omit<TGroup, 'children'>) {
  if (!shows || !shows?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {shows.map((show) => {
        if (!show) {
          return null;
        }

        return (
          <Show show={show} key={show.id}>
            <Show.Row>
              <Show.Cover />
              <Show.Col>
                <Show.Title>
                  <MarkFavorite type="shows" item={show} />
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
