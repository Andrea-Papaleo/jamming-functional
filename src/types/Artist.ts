export type Artist = {
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  popularity: number;
};

export type SimplifiedArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};
