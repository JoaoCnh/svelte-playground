<script lang="ts">
	export let ratio: number | 'vh';

	function getRatio(ratio: number | 'vh') {
		if (ratio === 'vh') return '100vh';

		return `${100 / ratio}%`;
	}
</script>

<div class="relative w-full" style:padding-bottom={getRatio(ratio)}>
	<div class="absolute inset-0">
		<slot />
	</div>
</div>
