<script lang="ts">
	import { onMount } from 'svelte';

	export let duration: number = 100;
	export let images: string[];
	export let threshold: number = 0;

	let scrollY: number;
	let sources: HTMLImageElement[];
	let section: HTMLElement;
	let canvas: HTMLCanvasElement;

	function loadImages() {
		sources = images.map((src) => {
			const img = new Image();
			img.src = src;
			return img;
		});
	}

	function sizeCanvas() {
		const context = canvas.getContext('2d');

		canvas.width = window.outerWidth;
		canvas.height = window.outerHeight;

		context?.clearRect(0, 0, canvas.width, canvas.height);
	}

	function drawImage(frame: number) {
		const context = canvas.getContext('2d');
		// get image element by frame
		const image = sources[frame];
		// calculate image size according to canvas size
		const hRatio = canvas.width / image.width;
		const vRatio = canvas.height / image.height;
		const ratio = Math.min(hRatio, vRatio);
		const centerShiftX = (canvas.width - image.width * ratio) / 2;
		const centerShiftY = (canvas.height - image.height * ratio) / 2;

		requestAnimationFrame(() => {
			context?.drawImage(
				image,
				0,
				0,
				image.width,
				image.height,
				centerShiftX,
				centerShiftY,
				image.width * ratio,
				image.height * ratio
			);
		});
	}

	onMount(() => {
		loadImages();
		sizeCanvas();
		drawImage(0);
	});

	$: {
		let withinTop = scrollY >= section?.offsetTop - threshold;
		let withinBottom = scrollY <= section?.offsetTop + section?.offsetHeight;
		let intersecting = withinTop && withinBottom;

		if (intersecting) {
			const scrollTop = scrollY - (section.offsetTop - threshold);
			const contentHeight = canvas.clientHeight;
			const progress = scrollTop / contentHeight;
			const frame = Math.max(0, Math.min(images.length - 1, Math.floor(progress * images.length)));

			drawImage(frame);
		}
	}
</script>

<svelte:window bind:scrollY />

<section bind:this={section} class="w-full relative" style:height="{duration}vh">
	<canvas
		bind:this={canvas}
		class="w-full h-screen sticky inset-0 object-contain pointer-events-none"
	/>
</section>
