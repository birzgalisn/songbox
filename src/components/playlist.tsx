import { createContext, useContext } from 'react';
import { TSimplifiedPlaylistObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const PlaylistContext = createContext<{
  item: TSimplifiedPlaylistObject;
} | null>(null);

export function usePlaylistContext() {
  const playlistContext = useContext(PlaylistContext);

  if (!playlistContext) {
    throw new Error('`usePlaylistContext` must be used within a `Playlist.*`');
  }

  return playlistContext;
}

export default function Playlist({
  item,
  children,
  ...props
}: { item: TSimplifiedPlaylistObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <PlaylistContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </PlaylistContext.Provider>
  );
}

Playlist.Row = Card.Row;
Playlist.Col = Card.Col;

Playlist.Cover = function Cover({ ...props }) {
  const { item } = usePlaylistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Playlist ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Playlist.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = usePlaylistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span title={item.name} className="line-clamp-1">
        {item.name}
      </span>
      {children}
    </Card.Title>
  );
};

Playlist.Desription = function Desription({
  children,
  ...props
}: TCardParagraph) {
  const { item } = usePlaylistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{item.description || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Playlist.TotalTracks = function TotalTracks({
  children,
  ...props
}: TCardParagraph) {
  const { item } = usePlaylistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{item.tracks.total} track/s</span>
      {children}
    </Card.Paragraph>
  );
};
