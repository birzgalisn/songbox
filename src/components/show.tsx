import { createContext, useContext } from 'react';
import { TSimplifiedShowObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const ShowContext = createContext<{
  show: TSimplifiedShowObject;
} | null>(null);

export function useShowContext() {
  const showContext = useContext(ShowContext);

  if (!showContext) {
    throw new Error('`useShowContext` must be used within a `Show.*`');
  }

  return showContext;
}

export default function Show({
  show,
  children,
  ...props
}: { show: TSimplifiedShowObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <ShowContext.Provider value={{ show }}>
      <Card {...props}>{children}</Card>
    </ShowContext.Provider>
  );
}

Show.Row = Card.Row;
Show.Col = Card.Col;

Show.Cover = function Cover({ ...props }) {
  const { show } = useShowContext();

  if (!show) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Show ${show.name} cover`}
      resolutions={show.images}
      {...props}
    />
  );
};

Show.Title = function Title({ children, ...props }: TCardTitle) {
  const { show } = useShowContext();

  if (!show) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span className="truncate">{show.name}</span>
      {children}
    </Card.Title>
  );
};

Show.Desription = function Desription({ children, ...props }: TCardParagraph) {
  const { show } = useShowContext();

  if (!show) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span className="line-clamp-3"> {show.description || 'n/a'}</span>
      {children}
    </Card.Paragraph>
  );
};

Show.Publisher = function Publisher({ children, ...props }: TCardParagraph) {
  const { show } = useShowContext();

  if (!show) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Publisher: {show.publisher}</span>
      {children}
    </Card.Paragraph>
  );
};
