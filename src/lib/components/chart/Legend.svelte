<script lang="ts">
	import { getLegendStore } from './store';

	const legend = getLegendStore();

	$: values = Object.values($legend);
</script>

<div class="flex w-full items-center justify-center mb-2">
	{#each values as value}
		<span class="flex items-center text-sm font-medium text-gray-900 me-3">
			<span
				class="flex w-2.5 h-2.5 rounded-full me-1.5 flex-shrink-0"
				style:background-color={value.color}
			/>
			{value.title}
		</span>
	{/each}
</div>
