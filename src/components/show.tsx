import { createContext, useContext } from 'react';
import { TSimplifiedShowObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const ShowContext = createContext<{
  item: TSimplifiedShowObject;
} | null>(null);

export function useShowContext() {
  const showContext = useContext(ShowContext);

  if (!showContext) {
    throw new Error('`useShowContext` must be used within a `Show.*`');
  }

  return showContext;
}

export default function Show({
  item,
  children,
  ...props
}: { item: TSimplifiedShowObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <ShowContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </ShowContext.Provider>
  );
}

Show.Row = Card.Row;
Show.Col = Card.Col;

Show.Cover = function Cover({ ...props }) {
  const { item } = useShowContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Show ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Show.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = useShowContext();

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

Show.Desription = function Desription({ children, ...props }: TCardParagraph) {
  const { item } = useShowContext();

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

Show.Publisher = function Publisher({ children, ...props }: TCardParagraph) {
  const { item } = useShowContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Publisher: {item.publisher}</span>
      {children}
    </Card.Paragraph>
  );
};
