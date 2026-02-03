import qs from 'qs';

type StringifyOptions = qs.IStringifyOptions<qs.BooleanOptional> | undefined;

export const stringify = (obj?: unknown, options?: StringifyOptions) =>
  qs.stringify(obj, { addQueryPrefix: true, ...options });
