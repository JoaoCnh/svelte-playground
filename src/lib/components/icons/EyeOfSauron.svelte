<script lang="ts">
	import EyeSvg from './EyeIcon/EyeSvg.svelte';
	import { mousePosition } from '$lib/actions/mouse-position';
</script>

<EyeSvg {...$$props}>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
		class="transition-transform"
		use:mousePosition={{ limitY: 24 }}
	/>
</EyeSvg>
