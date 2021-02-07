export enum ContentState {
  LOADING,
  LOADED,
  ERR,
}

export type Loading = { state: ContentState.LOADING };
export type Loaded<Object> = { state: ContentState.LOADED; item: Object };
export type Err = { state: ContentState.ERR; error: string };

export type Rendered<Object> = Loading | Error | Loaded<Object>;
