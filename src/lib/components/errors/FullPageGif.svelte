<script lang="ts">
	// import travolta-hd from assets once vite-imagetools supports sharp animated options
	export let url: string;
</script>

<div class="fixed inset-0 w-screen h-screen z-50">
	<div
		class="w-full h-full absolute inset-0"
		style:background-image="url({url})"
		style:background-position="center center"
	/>
	<div class="absolute inset-0 w-full h-full bg-black/60" />
</div>
