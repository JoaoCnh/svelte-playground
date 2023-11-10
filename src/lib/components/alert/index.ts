import Root from './Root.svelte';
import Body from './Body.svelte';
import Title from './Title.svelte';

export let Alert = Object.assign(Root, {
	Title,
	Body
});

export type { Variant } from './types';
