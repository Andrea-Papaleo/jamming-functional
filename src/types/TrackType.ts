import { Artist, SimplifiedArtist } from "./Artist";

export type TrackResponse = {
  track: TrackType;
};

export type TrackType = {
  name: string;
  artists: Artist[];

  album: {
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
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  uri: string;
  id: string;
  href: string;
  track: {
    href: string;
    id: string;
    artists: { genres?: string[]; name: string };
  };
  features?: TrackMetricType;
};

export type TrackMetricType = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};

export type SimplifiedTrack = {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: TrackRelink;
  restrictions: { reason: string };
  name: string;
  preview_url?: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type TrackRelink = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
};
