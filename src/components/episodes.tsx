import { TEpisdoes } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Episode from '@/components/episode';
import MarkFavorite from '@/components/mark-favorite';

export default function Episodes({
  episodes,
  ...props
}: {
  episodes: TEpisdoes['items'];
} & Omit<TGroup, 'children'>) {
  if (!episodes || !episodes?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {episodes.map((episode) => {
        if (!episode) {
          return null;
        }

        return (
          <Episode episode={episode} key={episode.id}>
            <Episode.Row>
              <Episode.Cover />
              <Episode.Col>
                <Episode.Title>
                  <MarkFavorite type="episodes" item={episode} />
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
