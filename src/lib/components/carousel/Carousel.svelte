<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import AspectRatio from '$lib/components/aspect-ratio/AspectRatio.svelte';

	type Item = {
		src: string;
		title: string;
	};

	export let items: Item[];
	export let itemsPerPage: number = 1;
	export let autoscroll = false;
	export let autoscrollSpeedPx = 30;
	/**
	 * amount of ms it waits before reversing the autoscroll when it reaches the end
	 */
	export let autoscrollTimeoutMs = 500;
	export let ratio = 3 / 4;

	let scrollableElement: HTMLElement;

	const animationController: {
		animationFrame: number;
		timeout: number;
		direction: number;
		scrollToAnimation?: { frame: number; from: number; to: number; startTimestamp: number };
	} = {
		animationFrame: 0,
		timeout: 0,
		direction: 1
	};

	export function resumeAutoscroll() {
		let lastFrameTimestamp = Date.now();
		let scroll = scrollableElement.scrollLeft;

		animationController.animationFrame = requestAnimationFrame(function loop() {
			const currentTimestamp = Date.now();
			const secondsPassed = (currentTimestamp - lastFrameTimestamp) / 1000;
			const maxScroll = scrollableElement.scrollWidth - scrollableElement.offsetWidth;

			scroll += autoscrollSpeedPx * secondsPassed * animationController.direction;

			const clampedScroll = Math.min(maxScroll, Math.max(0, scroll));
			scrollableElement.scrollLeft = clampedScroll;

			const changeDirection =
				(clampedScroll === 0 && animationController.direction === -1) ||
				(clampedScroll === maxScroll && animationController.direction === 1);

			if (changeDirection) {
				animationController.direction = clampedScroll === 0 ? 1 : -1;
				stopAutoscroll();
				clearTimeout(animationController.timeout);
				animationController.timeout = window.setTimeout(() => {
					resumeAutoscroll();
				}, autoscrollTimeoutMs);
			} else {
				lastFrameTimestamp = currentTimestamp;
				animationController.animationFrame = requestAnimationFrame(loop);
			}
		});
	}

	export function stopAutoscroll() {
		cancelAnimationFrame(animationController.animationFrame);
	}

	export function scrollTo(scroll: number) {
		stopAutoscroll();

		if (!!animationController.scrollToAnimation) {
			Object.assign(animationController.scrollToAnimation, {
				startTimestamp: Date.now(),
				from: scrollableElement.scrollLeft,
				to: scroll
			});
		} else {
			animationController.scrollToAnimation = {
				frame: requestAnimationFrame(function loop() {
					if (!animationController.scrollToAnimation) return;

					const currentTimestamp = Date.now();
					const { startTimestamp, from, to } = animationController.scrollToAnimation;

					const maxScroll = scrollableElement.scrollWidth - scrollableElement.offsetWidth;
					const currentScroll = Math.max(0, Math.min(maxScroll, scrollableElement.scrollLeft));
					const distanceToDestination = Math.abs(to - currentScroll);

					if (distanceToDestination <= 1) {
						scrollableElement.scrollLeft = to;
						animationController.scrollToAnimation = undefined;
					} else {
						const delta = to - from;
						const ratioOfTotalDuration = Math.min(
							1,
							Math.max(0, (currentTimestamp - startTimestamp) / 360)
						);

						scrollableElement.scrollLeft = from + delta * cubicInOut(ratioOfTotalDuration);

						Object.assign(animationController.scrollToAnimation, {
							frame: requestAnimationFrame(loop)
						});
					}
				}),
				startTimestamp: Date.now(),
				from: scrollableElement.scrollLeft,
				to: scroll
			};
		}
	}

	export function scrollToNext() {
		const carouselWidth = scrollableElement.offsetWidth;
		const childWidth = scrollableElement.firstElementChild!.getBoundingClientRect().width;

		let currentScroll = scrollableElement.scrollLeft;

		if (
			animationController.scrollToAnimation &&
			animationController.scrollToAnimation.from < animationController.scrollToAnimation.to
		) {
			currentScroll = animationController.scrollToAnimation.to;
		}

		const currentIndex = Math.floor((currentScroll + carouselWidth) / childWidth - 1);
		const targetIndex = Math.min(scrollableElement.childElementCount - 1, currentIndex + 1);

		const targetScroll = childWidth * targetIndex - carouselWidth + childWidth;
		const availableScroll = scrollableElement.scrollWidth - scrollableElement.offsetWidth;

		scrollTo(Math.min(targetScroll, availableScroll));
	}

	export function scrollToPrevious() {
		const childWidth = scrollableElement.firstElementChild!.getBoundingClientRect().width;

		let currentScroll = scrollableElement.scrollLeft - 1;

		if (
			animationController.scrollToAnimation &&
			animationController.scrollToAnimation.from > animationController.scrollToAnimation.to
		) {
			currentScroll = animationController.scrollToAnimation.to;
		}

		const currentIndex = Math.floor(currentScroll / childWidth);
		const isNotFullyVisible = currentScroll % childWidth !== 0;
		const targetIndex = Math.max(0, isNotFullyVisible ? currentIndex : currentIndex - 1);
		const targetScroll = childWidth * targetIndex;

		scrollTo(targetScroll);
	}

	onMount(() => {
		if (autoscroll) {
			resumeAutoscroll();
		} else {
			stopAutoscroll();
		}

		return () => {
			stopAutoscroll();
		};
	});
</script>

<div class="relative w-full" aria-roledescription="carousel">
	<div
		bind:this={scrollableElement}
		class="w-full flex justify-start flex-nowrap overflow-y-hidden overflow-x-auto hide-scrollbar"
		aria-live="off"
	>
		{#each items as item}
			<div
				class="flex-shrink-0"
				role="group"
				aria-roledescription="slide"
				style:width="{100 / itemsPerPage}%"
			>
				<AspectRatio {ratio}>
					<enhanced:img
						src={item.src}
						alt={item.title}
						class="w-full h-full object-cover"
						sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
					/>
				</AspectRatio>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.hide-scrollbar {
		overflow: -moz-scrollbars-none;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.hide-scrollbar::-webkit-scrollbar {
		width: 0;
		height: 0;
		display: none;
	}
</style>
