import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Playlist from '@/components/playlist';
import MarkFavorite from '@/components/mark-favorite';

export default function Playlists({
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
        if (!item || item.type !== 'playlist') {
          return null;
        }

        return (
          <Playlist key={item.id} item={item}>
            <Playlist.Row>
              <Playlist.Cover />
              <Playlist.Col>
                <Playlist.Title>
                  <MarkFavorite type="playlists" item={item} />
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
