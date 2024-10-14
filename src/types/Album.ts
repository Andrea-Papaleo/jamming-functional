export type AlbumResponse = {
  album_group: string;
  album_type: string;
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];

  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];

  external_ids: {
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: {
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
    }[];

    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
};
export type Album = {
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  external_ids: {
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: {
    href: string;
    items: {
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
    }[];

    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
};
