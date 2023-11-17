import { sleep } from './sleep';
import type { Component } from '$lib/components/editorial-block/types';

export async function getComponent(id: string, timeMs: number = 2000): Promise<Component> {
	// let's wait some time to simulate a very slow request
	await sleep(timeMs);
	return {
		type: 'another-one',
		djKhaled: true
	};
}
