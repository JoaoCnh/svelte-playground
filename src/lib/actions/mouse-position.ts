import { clamp } from '$lib/clamp';
import { debounce } from '$lib/debounce';

type MousePositionOptions = {
	limitY?: number;
	threshold?: number;
};

export function mousePosition(node: HTMLElement | SVGElement, options?: MousePositionOptions) {
	const limitY = options?.limitY || 0;
	const threshold = options?.threshold || 1.5;

	const { width, left, right, top, bottom } = node.getBoundingClientRect();

	const centerX = (left + right) / 2;
	const centerY = (top + bottom) / 2;

	const debouncedReset = debounce(1000, () => {
		node.style.transform = `translate3d(0px, 0px, 1px)`;
	});

	function updateMousePosition({ clientX, clientY }: MouseEvent) {
		const transformX = clamp(clientX - centerX, -width, width);
		const limitHeight =
			Math.sqrt(Math.pow(width, 2) * (1 - Math.pow(transformX, 2) / Math.pow(limitY, 2))) -
			width / threshold;
		const transformY = clamp(clientY - centerY, -limitHeight, limitHeight);

		node.style.transform = `translate3d(${transformX}px, ${transformY}px, 1px)`;

		debouncedReset();
	}

	window.addEventListener('mousemove', updateMousePosition);

	return {
		destroy() {
			window.removeEventListener('mousemove', updateMousePosition);
		}
	};
}
