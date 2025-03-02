import { redirect } from '@sveltejs/kit';
import { PRICING_PAGE } from '$lib/constants.js';
import type { EventData } from '$lib';

export async function load({ params, locals }) {
    if (!locals.user) {
        return redirect(303, "/");
    }

    if (!locals.user.hasAccess) {
        return redirect(303, PRICING_PAGE);
    }

    const id = params.slug;

    try {
        const calendar = await locals.pb.collection('calendar').getOne(id, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });

        if (calendar.owner !== locals.user?.id) return redirect(301, "/");

        const data = await fetch(`${process.env.VITE_PB_URL}/events`, {
            headers: { 'Authorization': `Basic ${process.env.CREDENTIALS}` }
        });

        if (!data.ok) {
            console.error('[error]', data);
            return {
                newData: null,
                error: "Failed to fetch event data."
            }
        }

        const dataJSON = await data.json() as EventData[];

        return {
            style: calendar.style as "LIGHT" | "DARK" | "CUSTOM",
            customStyle: calendar.customStyle as {[key: string]: any},
            events: dataJSON
        }
    } catch (_err) {
        return redirect(301, "/");
    }
}