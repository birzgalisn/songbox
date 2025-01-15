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

Track.Cover = function Cover({ ...props }) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Track ${track.name} cover`}
      resolutions={track.album.images}
      {...props}
    />
  );
};

Track.Title = function Title({ children, ...props }: TCardTitle) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span title={track.name} className="line-clamp-1">
        {track.name}
      </span>
      {children}
    </Card.Title>
  );
};

Track.Artist = function Artist({ children, ...props }: TCardParagraph) {
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  const artists = track.artists
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
  const { track } = useTrackContext();

  if (!track) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Popularity: {track.popularity}</span>
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
