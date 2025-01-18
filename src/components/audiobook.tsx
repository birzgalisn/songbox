import { createContext, useContext } from 'react';
import { TSimplifiedAudiobookObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const AudiobookContext = createContext<{
  item: TSimplifiedAudiobookObject;
} | null>(null);

export function useAudiobookContext() {
  const audiobookContext = useContext(AudiobookContext);

  if (!audiobookContext) {
    throw new Error(
      '`useAudiobookContext` must be used within a `Audiobook.*`',
    );
  }

  return audiobookContext;
}

export default function Audiobook({
  item,
  children,
  ...props
}: { item: TSimplifiedAudiobookObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <AudiobookContext.Provider value={{ item }}>
      <Card {...props}>{children}</Card>
    </AudiobookContext.Provider>
  );
}

Audiobook.Row = Card.Row;
Audiobook.Col = Card.Col;

Audiobook.Cover = function Cover({ ...props }) {
  const { item } = useAudiobookContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Audiobook ${item.name} cover`}
      resolutions={item.images}
      {...props}
    />
  );
};

Audiobook.Title = function Title({ children, ...props }: TCardTitle) {
  const { item } = useAudiobookContext();

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

Audiobook.Chapters = function Chapters({ children, ...props }: TCardParagraph) {
  const { item } = useAudiobookContext();

  if (!item) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Chapters: {item.total_chapters}</span>
      {children}
    </Card.Paragraph>
  );
};

Audiobook.Publisher = function Publisher({
  children,
  ...props
}: TCardParagraph) {
  const { item } = useAudiobookContext();

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
