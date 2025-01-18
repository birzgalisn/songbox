import { createContext, useContext } from 'react';
import { TSimplifiedEpisodeObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const EpisodeContext = createContext<{
  item: TSimplifiedEpisodeObject;
} | null>(null);

export function useEpisodeContext() {
  const episodeContext = useContext(EpisodeContext);

  if (!episodeContext) {
    throw new Error('`useEpisodeContext` must be used within a `Episode.*`');
  }

  return episodeContext;
}

export default function Episode({
  item,
  children,
  ...props
}: { item: TSimplifiedEpisodeObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <EpisodeContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </EpisodeContext.Provider>
  );
}

Episode.Row = Card.Row;
Episode.Col = Card.Col;

Episode.Cover = function Cover({ ...props }) {
  const { item } = useEpisodeContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Episode ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Episode.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = useEpisodeContext();

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

Episode.Desription = function Desription({
  children,
  ...props
}: TCardParagraph) {
  const { item } = useEpisodeContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span className="line-clamp-3"> {item.description || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Episode.Released = function Released({ children, ...props }: TCardParagraph) {
  const { item } = useEpisodeContext();

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
