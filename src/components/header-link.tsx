'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

type HeaderLinkProps = {
  href?: string;
  pathname?: string;
  searchParams?: URLSearchParams;
} & ButtonProps;

function HeaderLinkBase({
  href,
  pathname,
  searchParams,
  children,
  className = '',
  'aria-label': ariaLabel,
  ...props
}: HeaderLinkProps) {
  const isLinkActive = pathname === href;

  return (
    <Link href={`${href}?${searchParams}`} tabIndex={-1} aria-label={ariaLabel}>
      <Button
        className={cn({ 'text-blue-600': isLinkActive }, className)}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}

function HeaderLinkFallback(props: HeaderLinkProps) {
  const pathname = '';
  const searchParams = new URLSearchParams();

  return <HeaderLinkBase {...{ ...props, pathname, searchParams }} />;
}

function HeaderLink(props: HeaderLinkProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return <HeaderLinkBase {...{ ...props, pathname, searchParams }} />;
}

export default function HeaderLinkWithSuspense(
  props: Omit<HeaderLinkProps, 'pathname' | 'searchParams'>,
) {
  return (
    <Suspense fallback={<HeaderLinkFallback {...props} />}>
      <HeaderLink {...props} />
    </Suspense>
  );
}
