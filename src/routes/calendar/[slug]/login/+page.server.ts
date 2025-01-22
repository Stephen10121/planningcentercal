import { error, fail, json, redirect } from '@sveltejs/kit';
import { config } from "dotenv";
import type { RecordModel } from 'pocketbase';

config();

export async function load({ locals, params }) {
    let calendar: RecordModel;
    try {
        calendar = await locals.pb.collection('calendar').getFirstListItem(`id="${params.slug}"`, {
            headers: {
                "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
            }
        });
    } catch (err) {
        console.log("Calendar not found.");
        return redirect(301, "/");
    }

    return {
        name: calendar.name,
        id: calendar.id,
        logo: locals.pb.files.getURL(calendar, calendar.logo)
    }
}

export const actions = {
    default: async ({ cookies, params, request, locals }) => {
        const data = await request.formData();

        let calendar: RecordModel;
        try {
            calendar = await locals.pb.collection('calendar').getFirstListItem(`id="${params.slug}"`, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
        } catch (err) {
            console.log("Calendar not found.");
            return redirect(301, "/");
        }

        if (calendar.password !== data.get("password")) {
            return fail(401, { message: "Invalid Password!" });
        }

        cookies.set(`cal-${params.slug}`, calendar.password, {
            path: "/"
        });

        try {
            await locals.pb.collection('calendar').update(calendar.id, { 
                logins: calendar.logins + 1
            }, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
        } catch (err) {
            console.log("Failed to update the logins", err);
        }

        return { success: true }
    }
};