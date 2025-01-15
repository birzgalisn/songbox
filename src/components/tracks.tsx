import { TTracks } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Track from '@/components/track';
import MarkFavorite from '@/components/mark-favorite';

export default function Playlists({
  tracks,
  ...props
}: {
  tracks: TTracks['items'];
} & Omit<TGroup, 'children'>) {
  if (!tracks || !tracks?.length) {
    return null;
  }

  return (
    <Group {...props}>
      {tracks.map((track) => {
        if (!track) {
          return null;
        }

        return (
          <Track track={track} key={track.id}>
            <Track.Row>
              <Track.Cover />
              <Track.Col>
                <Track.Title>
                  <MarkFavorite type="tracks" item={track} />
                </Track.Title>
                <Track.Artist />
                <Track.Popularity />
                <Track.Disc />
              </Track.Col>
            </Track.Row>
          </Track>
        );
      })}
    </Group>
  );
}

Playlists.Head = Group.Head;
