'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

export default function HeaderLink({
  href,
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: { href: string } & ButtonProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLinkActive = pathname === href;

  return (
    <Link href={`${href}?${searchParams}`} tabIndex={-1} aria-label={ariaLabel}>
      <Button
        className={cn({ 'text-blue-600': isLinkActive }, className)}
        aria-hidden="true"
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}
