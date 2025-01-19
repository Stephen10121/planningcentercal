import { redirect } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export async function load({ parent, locals }) {
    if (!locals.user) {
        return redirect(303, "/");
    }

    await parent();
}