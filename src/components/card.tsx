import { cn } from '@/lib/utils';

export default function Card({ children, className = '', ...props }: TCard) {
  return (
    <li
      className={cn('w-full rounded border bg-white p-3', className)}
      {...props}
    >
      {children}
    </li>
  );
}

export type TCard = React.HTMLProps<HTMLLIElement>;

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
