export type ExtractKeys<T> = T extends object
  ? {
      [K in keyof T & string]: K | (T[K] extends object ? `${K}.${ExtractKeys<T[K]>}` : K);
    }[keyof T & string]
  : never;
