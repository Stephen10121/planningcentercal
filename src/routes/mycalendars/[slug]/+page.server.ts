import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PRICING_PAGE } from '$lib/constants.js';
import type { RecordModel } from 'pocketbase';

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
            hasPassword: calendar.password.length > 0,
            passwordlen: calendar.password.length as number
        }
    } catch (_err) {
        return redirect(301, "/mycalendars");
    }
}

export const actions = {
    updateCalendar: async ({ request, locals, params }) => {
        if (!locals.user) {
            return { error: true, success: false, message: "Couldn't update Calendar." }
        }
        const data = await request.formData();

        const userAvatar = data.get("logo");
        if (userAvatar) {
            //@ts-ignore
            if (userAvatar && userAvatar.size === 0) {
                data.delete("logo");
            } 
        } else {
            data.delete("logo");
        }

        try {
            await locals.pb.collection('calendar').getFirstListItem(`id='${params.slug}'&&owner='${locals.user.id}'`);
        } catch (_err) {
            return { error: true, success: false, message: "Couldn't update Calendar." }
        }

        try {
            await locals.pb.collection("calendar").update(params.slug, data);
        } catch (err) {
            console.log(err);

            return { error: true, success: false, message: "Couldn't update Calendar." }
        }

        return { error: false, success: true, message: `Successfully updated Calendar.` }
    },
    updatePassword: async ({ request, locals, params }) => {
        if (!locals.user) {
            return { error: true, success: false, message: "Couldn't update Password." }
        }
        const data = await request.formData();

        let calendar: RecordModel;
        try {
            calendar = await locals.pb.collection('calendar').getFirstListItem(`id='${params.slug}'&&owner='${locals.user.id}'`);
        } catch (_err) {
            return { error: true, success: false, message: "Couldn't update Password." }
        }

        let prevPassword = data.get("prevPassword");
        let newPassword = data.get("newPassword");

        if (!newPassword) {
            return { error: true, success: false, message: "Empty Fields." }
        }

        console.log(data.get("prevPassword"), data.get("newPassword"), data.get("prevPassword") === calendar.password);
        return { error: false, success: true, message: `Successfully updated Password.` }
        try {
            await locals.pb.collection("calendar").update(params.slug, data);
        } catch (err) {
            console.log(err);

            return { error: true, success: false, message: "Couldn't update Password." }
        }

        return { error: false, success: true, message: `Successfully updated Password.` }
    },
} satisfies Actions;