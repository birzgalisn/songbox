import { createContext, useContext } from 'react';
import { TSimplifiedAlbumObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const AlbumContext = createContext<{
  item: TSimplifiedAlbumObject;
} | null>(null);

export function useAlbumContext() {
  const albumContext = useContext(AlbumContext);

  if (!albumContext) {
    throw new Error('`useAlbumContext` must be used within a `Album.*`');
  }

  return albumContext;
}

export default function Album({
  item,
  children,
  ...props
}: { item: TSimplifiedAlbumObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <AlbumContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </AlbumContext.Provider>
  );
}

Album.Row = Card.Row;
Album.Col = Card.Col;

Album.Cover = function Cover({ ...props }) {
  const { item } = useAlbumContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Album ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Album.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = useAlbumContext();

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

Album.Artist = function Artist({ children, ...props }: TCardParagraph) {
  const { item } = useAlbumContext();

  if (!item || !item.artists) {
    return null;
  }

  const artists = item.artists
    .filter((artist) => artist !== null && artist !== undefined)
    .map((artist) => artist.name)
    .join(', ');

  return (
    <Card.Paragraph {...props}>
      <span>Artists: {artists}</span>
      {children}
    </Card.Paragraph>
  );
};

Album.Release = function Release({ children, ...props }: TCardParagraph) {
  const { item } = useAlbumContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Released in: {item.release_date}</span>
      {children}
    </Card.Paragraph>
  );
};

Album.TotalTracks = function TotalTracks({
  children,
  ...props
}: TCardParagraph) {
  const { item } = useAlbumContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{item.total_tracks} track/s</span>
      {children}
    </Card.Paragraph>
  );
};
