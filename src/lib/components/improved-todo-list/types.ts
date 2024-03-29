export type Todo = {
	id: number;
	title: string;
	done: boolean;
};

export type Filter = 'all' | 'done' | 'not-done';
