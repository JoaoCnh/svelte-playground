export function debounce<T, R>(timeoutMs: number, callback: (params?: T) => R) {
	let timer: number;

	return (params?: T) => {
		clearTimeout(timer);
		timer = window.setTimeout(() => {
			callback(params);
		}, timeoutMs);
	};
}
