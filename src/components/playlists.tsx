import { TPlaylists } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Playlist from '@/components/playlist';
import MarkFavorite from '@/components/mark-favorite';

export default function Playlists({
  playlists,
  ...props
}: {
  playlists: TPlaylists['items'];
} & Omit<TGroup, 'children'>) {
  if (!playlists || !playlists?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {playlists.map((playlist) => {
        if (!playlist) {
          return null;
        }

        return (
          <Playlist playlist={playlist} key={playlist.id}>
            <Playlist.Row>
              <Playlist.Cover />
              <Playlist.Col>
                <Playlist.Title>
                  <MarkFavorite type="playlists" item={playlist} />
                </Playlist.Title>
                <Playlist.Desription />
                <Playlist.TotalTracks />
              </Playlist.Col>
            </Playlist.Row>
          </Playlist>
        );
      })}
    </Group>
  );
}

Playlists.Head = Group.Head;
