'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

export default function HeaderLink({
  href,
  children,
  className = '',
  ...props
}: { href: string } & ButtonProps) {
  const pathname = usePathname();
  const isLinkActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        className={cn({ 'text-blue-600': isLinkActive }, className)}
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}
