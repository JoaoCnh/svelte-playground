import { fail, redirect } from '@sveltejs/kit';
import * as db from '$lib/server/fake-db';
import type { Actions, PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const id = cookies.get('userid') || '';
	const user = await db.getUser(id);
	let sessionId = cookies.get('sessionid');

	if (!sessionId) {
		sessionId = crypto.randomUUID();
		cookies.set('sessionid', sessionId, { path: '/' });
	}

	return {
		user,
		spells: await db.getSpells(sessionId)
	};
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		try {
			const email = data.get('email') as string;
			const password = data.get('password') as string;

			if (!email || !password) {
				return fail(422, {
					id: 'login',
					email: data.get('email'),
					password: '',
					error: 'Invalid form submission'
				});
			}

			const user = await db.loginUser(email, password);
			cookies.set('userid', String(user.id), { path: '/' });

			return { id: 'login', success: true };
		} catch (error) {
			return fail(401, {
				id: 'login',
				email: data.get('email'),
				password: '',
				error: (error as Error).message
			});
		}
	},

	logout: async ({ cookies }) => {
		let sessionId = cookies.get('sessionid');
		cookies.delete('userid', { path: '/' });
		cookies.delete('sessionid', { path: '/' });
		await db.deleteSession(sessionId || '');
		throw redirect(308, '/playground/actions');
	},

	create: async ({ cookies, request }) => {
		let sessionId = cookies.get('sessionid');
		const data = await request.formData();

		if (!sessionId) {
			throw redirect(308, '/playground/actions');
		}

		try {
			const spell = data.get('spell') as string;

			await db.createSpell(sessionId, spell);

			return { id: 'create', success: true };
		} catch (error) {
			return fail(500, {
				id: 'create',
				spell: data.get('spell'),
				error: (error as Error).message
			});
		}
	}
} satisfies Actions;
