import { createContext, useContext } from 'react';
import { TSimplifiedAlbumObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const AlbumContext = createContext<{
  album: TSimplifiedAlbumObject;
} | null>(null);

export function useAlbumContext() {
  const albumContext = useContext(AlbumContext);

  if (!albumContext) {
    throw new Error('`useAlbumContext` must be used within a `Album.*`');
  }

  return albumContext;
}

export default function Album({
  album,
  children,
  ...props
}: { album: TSimplifiedAlbumObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <AlbumContext.Provider value={{ album }}>
      <Card {...props}>{children}</Card>
    </AlbumContext.Provider>
  );
}

Album.Title = function AlbumTitle({ children, ...props }: TCardTitle) {
  const { album } = useAlbumContext();

  if (!album) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span>{album.name}</span>
      {children}
    </Card.Title>
  );
};

Album.Artist = function AlbumArtist({ children, ...props }: TCardParagraph) {
  const { album } = useAlbumContext();

  if (!album || !album.artists) {
    return null;
  }

  const artists = album.artists
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

Album.Release = function AlbumRelease({ children, ...props }: TCardParagraph) {
  const { album } = useAlbumContext();

  if (!album) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Released in: {album.release_date}</span>
      {children}
    </Card.Paragraph>
  );
};

Album.TotalTracks = function AlbumTotalTracks({
  children,
  ...props
}: TCardParagraph) {
  const { album } = useAlbumContext();

  if (!album) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{album.total_tracks} track/s</span>
      {children}
    </Card.Paragraph>
  );
};
