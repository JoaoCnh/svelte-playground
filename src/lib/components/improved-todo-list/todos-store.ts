import { localStore } from '$lib/stores/localStore';
import type { Todo, Filter } from './types';

export const todos = localStore<Todo[]>('svelte-playground-todos', []);

export const filter = localStore<Filter>('svelte-playground-filter', 'all');
