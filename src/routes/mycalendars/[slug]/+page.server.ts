import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PRICING_PAGE } from '$lib/constants.js';

export async function load({ params, locals }) {
    if (!locals.user) {
        return redirect(303, "/");
    }

    if (!locals.user.hasAccess) {
        return redirect(303, PRICING_PAGE);
    }

    const id = params.slug;

    try {
        const calendar = await locals.pb.collection('calendar').getOne(id);

        if (calendar.owner !== locals.user?.id) return redirect(301, "/mycalendars");

        return {
            name: calendar.name,
            id: calendar.id,
            logoLink: locals.pb.files.getURL(calendar, calendar.logo),
            created: calendar.created,
            updated: calendar.updated,
            hasPassword: calendar.password.length > 0
        }
    } catch (_err) {
        return redirect(301, "/mycalendars");
    }
}

export const actions = {
    default: async () => {
        return { error: false, success: true, message: `Successfully updated Calendar.` }
    }
} satisfies Actions;