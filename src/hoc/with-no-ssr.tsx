import dynamic, { DynamicOptions } from 'next/dynamic';

export default function withNoSSR<P>(
  Component: React.FC<P>,
  { ssr = false, ...rest }: DynamicOptions<P> = {},
) {
  return dynamic(() => Promise.resolve(Component), { ssr, ...rest });
}
