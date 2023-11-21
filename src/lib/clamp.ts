export function clamp(number: number, minLimit: number, maxLimit: number) {
	let min = Math.min(minLimit, maxLimit);
	let max = Math.max(minLimit, maxLimit);
	return Math.min(Math.max(number, min), max);
}
