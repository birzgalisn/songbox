import { createContext, useContext } from 'react';
import { TSimplifiedAudiobookObject } from '@/schemas/spotify';
import Card, { TCardParagraph, TCardTitle } from '@/components/card';

const AudiobookContext = createContext<{
  audiobook: TSimplifiedAudiobookObject;
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
  audiobook,
  children,
  ...props
}: { audiobook: TSimplifiedAudiobookObject } & React.HTMLProps<HTMLLIElement>) {
  return (
    <AudiobookContext.Provider value={{ audiobook }}>
      <Card {...props}>{children}</Card>
    </AudiobookContext.Provider>
  );
}

Audiobook.Row = Card.Row;
Audiobook.Col = Card.Col;

Audiobook.Cover = function Cover({ ...props }) {
  const { audiobook } = useAudiobookContext();

  if (!audiobook) {
    return null;
  }

  return (
    <Card.Cover
      alt={`Audiobook ${audiobook.name} cover`}
      resolutions={audiobook.images}
      {...props}
    />
  );
};

Audiobook.Title = function Title({ children, ...props }: TCardTitle) {
  const { audiobook } = useAudiobookContext();

  if (!audiobook) {
    return null;
  }

  return (
    <Card.Title {...props}>
      <span title={audiobook.name} className="line-clamp-1">
        {audiobook.name}
      </span>
      {children}
    </Card.Title>
  );
};

Audiobook.Chapters = function Chapters({ children, ...props }: TCardParagraph) {
  const { audiobook } = useAudiobookContext();

  if (!audiobook) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Chapters: {audiobook.total_chapters}</span>
      {children}
    </Card.Paragraph>
  );
};

Audiobook.Publisher = function Publisher({
  children,
  ...props
}: TCardParagraph) {
  const { audiobook } = useAudiobookContext();

  if (!audiobook) {
    return null;
  }

  return (
    <Card.Paragraph {...props}>
      <span>Publisher: {audiobook.publisher}</span>
      {children}
    </Card.Paragraph>
  );
};
