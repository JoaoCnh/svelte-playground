export function generateYAxisTicks<T extends Record<string, any>>(
	data: T[],
	dataKey: string,
	ticks: number = 5
): number[] {
	const birthrates = data.map((point) => point[dataKey]);

	const maxBirthrate = Math.max(...birthrates);

	const tickInterval = Math.ceil(maxBirthrate / 4);

	return Array.from({ length: ticks }, (_, index) => index * tickInterval);
}
