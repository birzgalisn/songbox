import Image from 'next/image';
import { cn } from '@/lib/utils';
import { TImageObject } from '@/schemas/spotify';

export default function Card({ children, className = '', ...props }: TCard) {
  return (
    <li
      className={cn(
        'flex w-full flex-col gap-2 overflow-hidden rounded border bg-white p-3',
        className,
      )}
      {...props}
    >
      <Card.Attribution />

      {children}
    </li>
  );
}

export type TCard = React.HTMLProps<HTMLLIElement>;

Card.Col = function Col({ children, className = '', ...props }: TCardCol) {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)} {...props}>
      {children}
    </div>
  );
};

export type TCardCol = React.HTMLProps<HTMLDivElement>;

Card.Row = function Row({ children, className = '', ...props }: TCardRow) {
  return (
    <div className={cn('flex w-full flex-row gap-2', className)} {...props}>
      {children}
    </div>
  );
};

export type TCardRow = React.HTMLProps<HTMLDivElement>;

Card.Title = function Title({
  children,
  className = '',
  ...props
}: TCardTitle) {
  return (
    <h3 className={cn('text-md flex items-center', className)} {...props}>
      {children}
    </h3>
  );
};

export type TCardTitle = React.HTMLProps<HTMLHeadingElement>;

Card.Paragraph = function Paragraph({
  children,
  className = '',
  ...props
}: TCardParagraph) {
  return (
    <p className={cn('text-sm text-gray-500', className)} {...props}>
      {children}
    </p>
  );
};

export type TCardParagraph = React.HTMLProps<HTMLParagraphElement>;

Card.Attribution = function Attribution({
  children,
  ...props
}: TCardAttribution) {
  return (
    <figure {...props}>
      <Image
        src="/spotify-full-black.svg"
        alt="Spotify logo"
        height={20}
        width={0}
        className="h-5 w-auto object-contain"
      />

      <figcaption className="sr-only">Spotify</figcaption>

      {children}
    </figure>
  );
};

export type TCardAttribution = React.HTMLAttributes<HTMLElement>;

Card.Cover = function Cover({
  alt,
  resolutions,
  children,
  className = '',
  ...props
}: TCardCover) {
  const [high = undefined, med = high, low = med] = resolutions || [];
  const fallback = low?.url ?? '/placeholder.svg';

  return (
    <figure
      className={cn('relative flex size-28 shrink-0', className)}
      {...props}
    >
      <Image
        src={med?.url ?? fallback}
        alt={alt}
        height={112}
        width={112}
        className="rounded object-scale-down object-center"
      />

      <figcaption className="sr-only">{alt}</figcaption>

      {children}
    </figure>
  );
};

export type TCardCover = {
  alt: string;
  resolutions?: TImageObject[];
} & React.HTMLProps<HTMLDivElement>;
