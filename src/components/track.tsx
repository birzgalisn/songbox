import { createContext, useContext } from 'react';
import { TTrackObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const TrackContext = createContext<{
  track: TTrackObject;
} | null>(null);

export function useTrackContext() {
  const trackContext = useContext(TrackContext);

  if (!trackContext) {
    throw new Error('`useTrackContext` must be used within a `Track.*`');
  }

  return trackContext;
}

export default function Track({
  track,
  children,
  ...props
}: { track: TTrackObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <TrackContext.Provider value={{ track }}>
      <Card {...props}>{children}</Card>
    </TrackContext.Provider>
  );
}

Track.Row = Card.Row;
Track.Col = Card.Col;

Track.Title = function Title({ children, ...props }: TCardTitle) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span className="truncate">{track.name}</span>
      {children}
    </Card.Title>
  );
};

Track.Popularity = function Popularity({ children, ...props }: TCardParagraph) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>{track.popularity}</span>
      {children}
    </Card.Paragraph>
  );
};

Track.Disc = function Disc({ children, ...props }: TCardParagraph) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Disc No.: {track.disc_number}</span>
      {children}
    </Card.Paragraph>
  );
};
