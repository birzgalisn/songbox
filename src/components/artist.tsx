import { createContext, useContext } from 'react';
import { TArtist } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const ArtistContext = createContext<{
  item: TArtist;
} | null>(null);

export function useArtistContext() {
  const artistContext = useContext(ArtistContext);

  if (!artistContext) {
    throw new Error('`useArtistContext` must be used within a `Artist.*`');
  }

  return artistContext;
}

export default function Artist({
  item,
  children,
  ...props
}: { item: TArtist } & React.HTMLProps<HTMLLIElement>) {
  return (
    <ArtistContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </ArtistContext.Provider>
  );
}

Artist.Row = Card.Row;
Artist.Col = Card.Col;

Artist.Cover = function Cover({ ...props }) {
  const { item } = useArtistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Artist ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Artist.Name = function Name({ children, ...props }: TCardTitle) {
  const { item } = useArtistContext();

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

Artist.Genres = function Genres({ children, ...props }: TCardParagraph) {
  const { item } = useArtistContext();

  if (!item) {
    return null;
  }

  const genres = item.genres.join(', ');

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
  const { item } = useArtistContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Popularity: {item.popularity}</span>
      {children}
    </Card.Paragraph>
  );
};
