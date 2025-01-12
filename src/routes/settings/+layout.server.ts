import { redirect } from '@sveltejs/kit';

export async function load({ locals, parent }) {
    if (!locals.user) {
        throw redirect(303, "/");
    }

    const data = await parent();

    return {...data}
}