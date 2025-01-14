import { createContext, useContext } from 'react';
import { TSimplifiedPlaylistObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const PlaylistContext = createContext<{
  playlist: TSimplifiedPlaylistObject;
} | null>(null);

export function usePlaylistContext() {
  const playlistContext = useContext(PlaylistContext);

  if (!playlistContext) {
    throw new Error('`usePlaylistContext` must be used within a `Playlist.*`');
  }

  return playlistContext;
}

export default function Playlist({
  playlist,
  children,
  ...props
}: { playlist: TSimplifiedPlaylistObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <PlaylistContext.Provider value={{ playlist }}>
      <Card {...props}>{children}</Card>
    </PlaylistContext.Provider>
  );
}

Playlist.Row = Card.Row;
Playlist.Col = Card.Col;

Playlist.Cover = function Cover({ ...props }) {
  const { playlist } = usePlaylistContext();

  if (!playlist) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Playlist ${playlist.name} cover`}
      resolutions={playlist.images}
      {...props}
    />
  );
};

Playlist.Title = function Title({ children, ...props }: TCardTitle) {
  const { playlist } = usePlaylistContext();

  if (!playlist) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span title={playlist.name} className="line-clamp-1">
        {playlist.name}
      </span>
      {children}
    </Card.Title>
  );
};

Playlist.Desription = function Desription({
  children,
  ...props
}: TCardParagraph) {
  const { playlist } = usePlaylistContext();

  if (!playlist) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{playlist.description || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Playlist.TotalTracks = function TotalTracks({
  children,
  ...props
}: TCardParagraph) {
  const { playlist } = usePlaylistContext();

  if (!playlist) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{playlist.tracks.total} track/s</span>
      {children}
    </Card.Paragraph>
  );
};
