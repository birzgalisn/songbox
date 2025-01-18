import { createContext, useContext } from 'react';
import { TTrackObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const TrackContext = createContext<{
  item: TTrackObject;
} | null>(null);

export function useTrackContext() {
  const trackContext = useContext(TrackContext);

  if (!trackContext) {
    throw new Error('`useTrackContext` must be used within a `Track.*`');
  }

  return trackContext;
}

export default function Track({
  item,
  children,
  ...props
}: { item: TTrackObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <TrackContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </TrackContext.Provider>
  );
}

Track.Row = Card.Row;
Track.Col = Card.Col;

Track.Cover = function Cover({ ...props }) {
  const { item } = useTrackContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Track ${item.name} cover`}
      resolutions={item.album.images}
      {...props}
    />
  );
};

Track.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = useTrackContext();

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

Track.Artist = function Artist({ children, ...props }: TCardParagraph) {
  const { item } = useTrackContext();

  if (!item) {
    return null;
  }

  const artists = item.artists
    .filter((artist) => artist !== null && artist !== undefined)
    .map((artist) => artist.name)
    .join(', ');

  return (
    <Card.Paragraph {...props}>
      <span>Artist: {artists || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Track.Popularity = function Popularity({ children, ...props }: TCardParagraph) {
  const { item } = useTrackContext();

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

Track.Disc = function Disc({ children, ...props }: TCardParagraph) {
  const { item } = useTrackContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Disc No.: {item.disc_number}</span>
      {children}
    </Card.Paragraph>
  );
};
