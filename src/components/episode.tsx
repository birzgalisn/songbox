import { createContext, useContext } from 'react';
import { TSimplifiedEpisodeObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const EpisodeContext = createContext<{
  episode: TSimplifiedEpisodeObject;
} | null>(null);

export function useEpisodeContext() {
  const episodeContext = useContext(EpisodeContext);

  if (!episodeContext) {
    throw new Error('`useEpisodeContext` must be used within a `Episode.*`');
  }

  return episodeContext;
}

export default function Episode({
  episode,
  children,
  ...props
}: { episode: TSimplifiedEpisodeObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <EpisodeContext.Provider value={{ episode }}>
      <Card {...props}>{children}</Card>
    </EpisodeContext.Provider>
  );
}

Episode.Row = Card.Row;
Episode.Col = Card.Col;

Episode.Cover = function Cover({ ...props }) {
  const { episode } = useEpisodeContext();

  if (!episode) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Episode ${episode.name} cover`}
      resolutions={episode.images}
      {...props}
    />
  );
};

Episode.Title = function Title({ children, ...props }: TCardTitle) {
  const { episode } = useEpisodeContext();

  if (!episode) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span className="truncate">{episode.name}</span>
      {children}
    </Card.Title>
  );
};

Episode.Desription = function Desription({
  children,
  ...props
}: TCardParagraph) {
  const { episode } = useEpisodeContext();

  if (!episode) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span className="line-clamp-3"> {episode.description || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Episode.Released = function Released({ children, ...props }: TCardParagraph) {
  const { episode } = useEpisodeContext();

  if (!episode) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Released in: {episode.release_date}</span>
      {children}
    </Card.Paragraph>
  );
};
