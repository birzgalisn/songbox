import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import { cn } from '@/lib/utils';
import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Loading from '@/components/loading';

export default function List({ children, className = '', ...props }: TList) {
  return (
    <ol
      className={cn(
        'flex flex-col gap-2 group-has-[[data-pending]]:animate-pulse',
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

export type TList = React.HTMLAttributes<HTMLOListElement>;

function lazy<T>(dynamicOptions: DynamicOptions<T> | Loader<T>) {
  return dynamic(dynamicOptions, {
    loading: () => <Loading groups={1} placeholders={2} />,
  });
}

const listComponentMap = Object.freeze({
  albums: lazy(() => import('@/components/albums')),
  artists: lazy(() => import('@/components/artists')),
  playlists: lazy(() => import('@/components/playlists')),
  tracks: lazy(() => import('@/components/tracks')),
  shows: lazy(() => import('@/components/shows')),
  episodes: lazy(() => import('@/components/episodes')),
  audiobooks: lazy(() => import('@/components/audiobooks')),
} as const);

export type TListComponentKey = keyof typeof listComponentMap;

const isListComponentKey = (key: string): key is TListComponentKey =>
  key in listComponentMap;

function ListGroup({ group, ...props }: TListGroup) {
  if (!isListComponentKey(group)) {
    return null;
  }

  const Component = listComponentMap[group];

  return <Component {...props} />;
}

ListGroup.Head = Group.Head;
List.Group = ListGroup;

export type TListGroup = {
  group: TListComponentKey | (string & {});
  items: TSearchResponseItems;
} & Omit<TGroup, 'children'>;
