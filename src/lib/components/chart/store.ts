import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';
import { scaleLinear } from 'd3-scale';
import { generateYAxisTicks } from './generateYAxisTicks';

type LegendStore = {
	title: string;
	color: string;
};

type DimensionsStore = {
	width: number;
	height: number;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
};

const LEGEND_STORE = 'legend-store';
const DIMENSIONS_STORE = 'dimensions-store';
const X_TICKS_STORE = 'xticks-store';
const X_SCALE_STORE = 'xscale-store';
const Y_TICKS_STORE = 'yticks-store';
const Y_SCALE_STORE = 'yscale-store';
const Y_AXIS_STORE = 'yaxis-store';

export const legendStore = writable<Record<string, LegendStore>>({});
export const getLegendStore = () => getContext<typeof legendStore>(LEGEND_STORE);

export const dimensionsStore = writable<DimensionsStore>({
	width: 0,
	height: 0,
	marginTop: 0,
	marginRight: 0,
	marginBottom: 0,
	marginLeft: 0
});
export const getDimensionsStore = () => getContext<typeof dimensionsStore>(DIMENSIONS_STORE);

export const yTicksStore = writable<Set<number>>(new Set());
export const getYTicksStore = () => getContext<typeof yTicksStore>(Y_TICKS_STORE);
export const xTicksStore = writable<Set<number>>(new Set());
export const getXTicksStore = () => getContext<typeof xTicksStore>(X_TICKS_STORE);

export const yAxisStore = derived(yTicksStore, ($yTicks) => {
	return generateYAxisTicks(Array.from($yTicks.values()));
});
export const getYAxisStore = () => getContext<typeof yAxisStore>(Y_AXIS_STORE);

export const yScaleStore = derived([yAxisStore, dimensionsStore], ([$yAxis, $dimensions]) => {
	const max = Math.max(...$yAxis);
	return scaleLinear()
		.domain([0, max])
		.range([$dimensions.height - $dimensions.marginBottom, $dimensions.marginTop]);
});
export const getYScaleStore = () => getContext<typeof yScaleStore>(Y_SCALE_STORE);

export const xScaleStore = derived([xTicksStore, dimensionsStore], ([$xTicks, $dimensions]) => {
	return scaleLinear()
		.domain([0, $xTicks.size])
		.range([$dimensions.marginLeft, $dimensions.width - $dimensions.marginRight]);
});
export const getXScaleStore = () => getContext<typeof xScaleStore>(X_SCALE_STORE);

export function setupStoresContext() {
	setContext(LEGEND_STORE, legendStore);
	setContext(DIMENSIONS_STORE, dimensionsStore);
	setContext(X_TICKS_STORE, xTicksStore);
	setContext(Y_TICKS_STORE, yTicksStore);
	setContext(X_SCALE_STORE, xScaleStore);
	setContext(Y_SCALE_STORE, yScaleStore);
	setContext(Y_AXIS_STORE, yAxisStore);
}
