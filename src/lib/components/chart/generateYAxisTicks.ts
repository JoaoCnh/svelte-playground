export function generateYAxisTicks(data: number[], ticks: number = 5): number[] {
	if (data.length === 0) return [];

	const maxPoint = Math.max(...data);
	const tickInterval = Math.ceil(maxPoint / (ticks - 1));

	return Array.from({ length: ticks }, (_, index) => index * tickInterval);
}
