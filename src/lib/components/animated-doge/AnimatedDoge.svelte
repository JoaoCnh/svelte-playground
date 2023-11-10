<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { intersectionObserver } from '$lib/actions/intersection-observer';
	import { random } from '$lib/random';

	const rotation = tweened(0, {
		delay: 150,
		duration: 300,
		easing: cubicOut
	});

	const x = tweened(-100, {
		delay: 125,
		duration: 250,
		easing: cubicOut
	});

	let intersecting = false;

	let phrases = [
		{ text: 'wow', position: { x: '50%', y: 0 } },
		{ text: 'much apple', position: { x: '40%', y: '25%' } },
		{ text: 'such think different', position: { x: '55%', y: '50%' } }
	];

	const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

	$: if (intersecting) {
		x.set(-35);
		rotation.set(40);
	} else {
		x.set(-100);
		rotation.set(0);
	}
</script>

<div
	class="relative w-full"
	use:intersectionObserver
	on:intersect={() => (intersecting = true)}
	on:unintersect={() => (intersecting = false)}
>
	<img
		src="/doge.png"
		alt="doge"
		style:transform="translate3d({$x}%, 0px, 1px) rotate({$rotation}deg)"
	/>

	{#each phrases as phrase, idx (phrase.text)}
		<span
			class="text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl uppercase break-words transition duration-500"
			style:top={phrase.position.y}
			style:left={phrase.position.x}
			style:opacity={intersecting ? 1 : 0}
			style:transform="translate3d(0px, {intersecting ? -50 : 0}px, 1px)"
			style:transition-delay="{500 * idx + 1}ms"
			style:color={colors[random(0, colors.length - 1)]}
		>
			{phrase.text}
		</span>
	{/each}
</div>

<style lang="postcss">
	span {
		position: absolute;
		font-family: 'Comic Sans MS', cursive;
	}
</style>
