import { createContext, useContext } from 'react';
import { TArtist } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const ArtistContext = createContext<{
  artist: TArtist;
} | null>(null);

export function useArtistContext() {
  const artistContext = useContext(ArtistContext);

  if (!artistContext) {
    throw new Error('`useArtistContext` must be used within a `Artist.*`');
  }

  return artistContext;
}

export default function Artist({
  artist,
  children,
  ...props
}: { artist: TArtist } & React.HTMLProps<HTMLLIElement>) {
  return (
    <ArtistContext.Provider value={{ artist }}>
      <Card {...props}>{children}</Card>
    </ArtistContext.Provider>
  );
}

Artist.Row = Card.Row;
Artist.Col = Card.Col;

Artist.Cover = function Cover({ ...props }) {
  const { artist } = useArtistContext();

  if (!artist) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Artist ${artist.name} cover`}
      resolutions={artist.images}
      {...props}
    />
  );
};

Artist.Name = function Name({ children, ...props }: TCardTitle) {
  const { artist } = useArtistContext();

  if (!artist) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span title={artist.name} className="line-clamp-1">
        {artist.name}
      </span>
      {children}
    </Card.Title>
  );
};

Artist.Genres = function Genres({ children, ...props }: TCardParagraph) {
  const { artist } = useArtistContext();

  if (!artist) {
    return null;
  }

  const genres = artist.genres.join(', ');

  return (
    <Card.Paragraph {...props}>
      <span>Genres: {genres || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Artist.Popularity = function Popularity({
  children,
  ...props
}: TCardParagraph) {
  const { artist } = useArtistContext();

  if (!artist) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Popularity: {artist.popularity}</span>
      {children}
    </Card.Paragraph>
  );
};
