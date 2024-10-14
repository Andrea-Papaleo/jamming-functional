import { TrackResponse, TrackType } from "./TrackType";

export type PlaylistType = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  owner: {
    external_urls: {
      spotify: "string";
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: string;
    next: string | null;
    offset: string;
    previous: string | null;
    total: number;
    ids?: string[];
    items: TrackResponse[];
  };
  type: string;
  uri: string;
};
