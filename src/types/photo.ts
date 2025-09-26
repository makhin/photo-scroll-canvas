export interface Photo {
  id: string;
  thumbnail: string;
  path: string;
  caption: string;
  takenDate: Date;
  tags: string[];
  peoples: string[];
  flags: string[];
}

export interface PhotoTableProps {
  photos: Photo[];
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}