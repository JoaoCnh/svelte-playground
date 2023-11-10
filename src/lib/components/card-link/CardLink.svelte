<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let href: string;
	export let title: string;
	export let image: string;

	let hovering = false;

	const options = {
		duration: 300,
		easing: cubicInOut
	};
	const coordsX = tweened(-100, options);
	const coordsY = tweened(0, options);

	function getAnimationDirection(event: MouseEvent) {
		const { clientX, clientY } = event;
		const target = event.target as HTMLAnchorElement;
		const { x, y, width, height } = target.getBoundingClientRect();

		let bounds = [
			// top
			{ value: y - clientY, position: { x: 0, y: -100 } },
			// right
			{ value: x + width - clientX, position: { x: 100, y: 0 } },
			// bottom
			{ value: y + height - clientY, position: { x: 0, y: 100 } },
			// left
			{ value: x - clientX, position: { x: -100, y: 0 } }
		];

		const { position } = bounds.reduce((closestBound, bound) => {
			return Math.abs(bound.value) < Math.abs(closestBound.value) ? bound : closestBound;
		});

		return position;
	}

	async function animateIn(event: MouseEvent) {
		const position = getAnimationDirection(event);
		await coordsX.set(position.x, { duration: 0 });
		await coordsY.set(position.y, { duration: 0 });
		hovering = true;
		$coordsX = 0;
		$coordsY = 0;
	}

	function animateOut(event: MouseEvent) {
		const position = getAnimationDirection(event);
		hovering = false;
		$coordsX = position.x;
		$coordsY = position.y;
	}
</script>

<a
	{href}
	class="relative block max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 overflow-hidden"
	on:mouseenter={animateIn}
	on:mouseleave={animateOut}
>
	<img
		src={image}
		alt={title}
		class="w-full h-full object-cover rounded-lg transition"
		style:transform="scale({hovering ? 1.3 : 1})"
	/>

	<div
		class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 pointer-events-none"
		style:transform="translate3d({$coordsX}%,{$coordsY}%,1px)"
	>
		<h5 class="text-2xl font-bold tracking-tight text-white text-center uppercase">
			{title}
		</h5>
	</div>
</a>
