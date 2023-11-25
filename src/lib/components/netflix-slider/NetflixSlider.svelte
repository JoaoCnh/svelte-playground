<script lang="ts">
	import { debounce } from '$lib/debounce';
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';

	export let slides: Array<{ id: string; image: string; title: string }>;

	let scrolling = false;
	let activeIndex: number | null = null;

	const unsetScrolling = debounce(250, () => {
		scrolling = false;
	});

	function setScrolling() {
		scrolling = true;
		unsetScrolling();
	}

	function activateItem(index: number) {
		if (!scrolling) {
			activeIndex = index;
		}
	}

	function deactivateItem() {
		activeIndex = null;
	}

	$: active = !scrolling && activeIndex != null;
</script>

<div class="w-full relative py-10 overflow-x-scroll" on:scroll={setScrolling}>
	<ul class="flex gap-1" class:active>
		{#each slides as slide, index (slide.id)}
			{@const scale = activeIndex === index}
			{@const left = activeIndex != null && activeIndex > index}

			<li
				class="w-1/3 shrink-0 transition-transform duration-500"
				class:active
				class:scale
				class:left
				on:mouseenter={() => activateItem(index)}
				on:mouseleave={() => deactivateItem()}
			>
				<a href="/">
					<AspectRatio ratio={16 / 9}>
						<enhanced:img
							src={slide.image}
							alt={slide.title}
							sizes="33vw"
							class="w-full h-full object-cover"
						/>
					</AspectRatio>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.active li:not(.scale):not(.left) {
		transform: translateX(25%);
	}
	.active li:not(.scale).left {
		transform: translateX(-25%);
	}
	.active li.scale {
		transform: scale(1.5);
	}
</style>
