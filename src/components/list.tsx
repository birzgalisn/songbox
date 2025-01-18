import { cn } from '@/lib/utils';
import { TSearchResponseItems } from '@/schemas/spotify';
import Group, { TGroup } from '@/components/group';
import Albums from '@/components/albums';
import Artists from '@/components/artists';
import Playlists from '@/components/playlists';
import Tracks from '@/components/tracks';
import Shows from '@/components/shows';
import Episodes from '@/components/episodes';
import Audiobooks from '@/components/audiobooks';

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

const listComponentMap = Object.freeze({
  albums: Albums,
  artists: Artists,
  playlists: Playlists,
  tracks: Tracks,
  shows: Shows,
  episodes: Episodes,
  audiobooks: Audiobooks,
} as const);

export type TListComponentKey = keyof typeof listComponentMap;

const isListComponentKey = (key: string): key is TListComponentKey =>
  key in listComponentMap;

function ListGroup({ group, ...props }: TListGroup) {
  if (!isListComponentKey(group)) {
    return null;
  }

  return listComponentMap[group](props);
}

ListGroup.Head = Group.Head;
List.Group = ListGroup;

export type TListGroup = {
  group: TListComponentKey | (string & {});
  items: TSearchResponseItems;
} & Omit<TGroup, 'children'>;
