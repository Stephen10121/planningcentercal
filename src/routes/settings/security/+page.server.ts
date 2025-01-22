import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ parent, locals }) {
    await parent();

    if (!locals.user) throw redirect(303, "/");
}

export const actions = {
    deleteAccount: async ({ locals }) => {
        if (!locals.user) {
            return { error: true, success: false, message: "Unauthorized." }
        }

        try {
            await locals.pb.collection('users').delete(locals.user.id, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
            locals.pb.authStore.clear();
        } catch (err) {
            return { error: true, success: false, message: "Unable to delete account. Try again later." }
        }

        return redirect(303, "/");
    }
} satisfies Actions;