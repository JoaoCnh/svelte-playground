import type { ActionReturn } from 'svelte/action';

export function intersectionObserver(
	node: HTMLElement,
	options?: IntersectionObserverOptions
): ActionReturn<IntersectionObserverOptions, IntersectionObserverEvents> {
	const { once = false, rootMargin } = options || {};

	const observer = new IntersectionObserver(
		(entries) => {
			let intersecting = entries[0].isIntersecting;

			if (intersecting) {
				node.dispatchEvent(new CustomEvent('intersect'));

				if (once) {
					observer.unobserve(node);
				}
			} else if (!once) {
				node.dispatchEvent(new CustomEvent('unintersect'));
			}
		},
		{
			rootMargin
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}

export type IntersectionObserverOptions = {
	once?: boolean;
	rootMargin?: string;
};

export type IntersectionObserverEvents = {
	'on:intersect': (e: CustomEvent<string>) => void;
	'on:unintersect'?: (e: CustomEvent<string>) => void;
};
