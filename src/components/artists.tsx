import { TAritsts } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Artist from '@/components/artist';
import MarkFavorite from '@/components/mark-favorite';

export default function Artists({
  artists,
  ...props
}: {
  artists?: TAritsts['items'];
} & Omit<TGroup, 'children'>) {
  if (!artists || !artists?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {artists.map((artist) => {
        if (!artist) {
          return null;
        }

        return (
          <Artist artist={artist} key={artist.id}>
            <Artist.Name>
              <MarkFavorite type="artists" item={artist} />
            </Artist.Name>
            <Artist.Genres />
            <Artist.Popularity />
          </Artist>
        );
      })}
    </Group>
  );
}

Artists.Head = Group.Head;
