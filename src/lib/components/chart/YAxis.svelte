<script lang="ts">
	import { getYAxisStore, getYScaleStore } from './store';

	const yAxis = getYAxisStore();
	const yScale = getYScaleStore();
</script>

<g>
	{#each $yAxis as tick}
		<g class="text-xs" transform="translate(0, {$yScale(tick)})">
			<line x2="100%" class="stroke-gray-500" style:stroke-dash-array="2" />
			<text y="-4">{tick}</text>
		</g>
	{/each}
</g>
