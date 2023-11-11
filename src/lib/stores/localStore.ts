import { writable } from 'svelte/store';

function getValueFromLocalStorage<T>(key: string, initial: T) {
	let saved: T;

	const localValue = localStorage.getItem(key);

	if (localValue == null) {
		localStorage.setItem(key, JSON.stringify(initial));
		saved = initial;
	} else {
		saved = JSON.parse(localValue);
	}

	return saved;
}

export function localStore<T>(key: string, initial: T) {
	const value = typeof window === 'undefined' ? initial : getValueFromLocalStorage(key, initial);

	const { subscribe, set, update } = writable(value);

	return {
		subscribe,
		update,
		set: (value: T) => {
			localStorage.setItem(key, JSON.stringify(value));

			return set(value);
		}
	};
}
