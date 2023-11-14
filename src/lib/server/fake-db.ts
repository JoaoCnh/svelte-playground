const user = {
	id: 1,
	name: 'Gandalf',
	email: 'gandalf@middle-earth.com',
	password: 'mellon'
};

export async function loginUser(email: string, password: string) {
	if (email === user.email && password === user.password) {
		return user;
	}

	throw new Error('user not found');
}

export async function getUser(id: string) {
	if (id !== '1') return null;
	return user;
}

const fakeDb = new Map<string, string[]>();

export async function getSpells(sessionId: string) {
	return fakeDb.get(sessionId) || [];
}

export async function createSpell(sessionId: string, spell: string) {
	const spells = fakeDb.get(sessionId) || [];
	const newSpells = [...spells, spell];

	fakeDb.set(sessionId, newSpells);

	return newSpells;
}

export async function deleteSession(sessionId: string) {
	fakeDb.delete(sessionId);
}
