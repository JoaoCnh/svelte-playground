import ky from 'ky';

export function query<T>(prefixUrl: string) {
	const cache = new Map<string, Promise<T>>();

	const http = ky.create({ prefixUrl });

	return {
		fetch: (path: string, params: URLSearchParams, init?: RequestInit) => {
			const cacheKey = `${path}?${params.toString()}`;

			const cachedPromise = cache.get(cacheKey);
			if (cachedPromise) {
				return cachedPromise;
			}

			const promise = http.get(path, { ...init, searchParams: params }).json<T>();

			cache.set(cacheKey, promise);

			return promise;
		}
	};
}
