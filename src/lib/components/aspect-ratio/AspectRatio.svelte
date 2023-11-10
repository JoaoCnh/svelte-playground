<script lang="ts">
	export let ratio: number;
</script>

<div class="relative w-full" style:padding-bottom="{100 / ratio}%">
	<div class="absolute inset-0">
		<slot />
	</div>
</div>
