import { TAlbums } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Album from '@/components/album';
import MarkFavorite from '@/components/mark-favorite';

export default function Albums({
  albums,
  ...props
}: {
  albums: TAlbums['items'];
} & Omit<TGroup, 'children'>) {
  if (!albums || !albums?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {albums.map((album) => {
        if (!album) {
          return null;
        }

        return (
          <Album album={album} key={album.id}>
            <Album.Title>
              <MarkFavorite type="albums" item={album} />
            </Album.Title>
            <Album.Artist />
            <Album.Release />
            <Album.TotalTracks />
          </Album>
        );
      })}
    </Group>
  );
}

Albums.Head = Group.Head;
