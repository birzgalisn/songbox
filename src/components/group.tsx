import { cn } from '@/lib/utils';

export default function Group({
  head,
  children,
  className = '',
  ...props
}: TGroup) {
  return (
    <li className={cn('flex flex-col gap-2', className)} {...props}>
      {head}

      <ol className="grid grid-cols-1 gap-4 lg:grid-cols-2">{children}</ol>
    </li>
  );
}

export type TGroup = {
  head?: React.ReactNode;
} & React.HTMLProps<HTMLLIElement>;

Group.Head = function Head({ children, className = '', ...props }: TGroupHead) {
  return (
    <h2 className={cn('text-xl font-bold', className)} {...props}>
      {children}
    </h2>
  );
};

export type TGroupHead = React.HTMLProps<HTMLHeadingElement>;
