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

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </ol>
    </li>
  );
}

export type TGroup = {
  head?: React.ReactNode;
} & React.HTMLProps<HTMLLIElement>;

Group.Head = function Head({ children, className = '', ...props }: TGroupHead) {
  return (
    <h3 className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </h3>
  );
};

export type TGroupHead = React.HTMLProps<HTMLHeadingElement>;
