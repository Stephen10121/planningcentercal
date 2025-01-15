import { redirect } from '@sveltejs/kit';
import type { EventData } from "$lib";
import { config } from "dotenv";
import type { RecordModel } from 'pocketbase';

config();

export async function load({ params, locals }) {
    let calendar: RecordModel;
    try {
        calendar = await locals.pb.collection('calendar').getFirstListItem(`id="${params.slug}"`);
    } catch (err) {
        console.log("Calendar not found.");
        return redirect(301, "/");
    }

    if (calendar.password) {
        return redirect(301, `/calendar/${params.slug}/login`);
    }

    // if (params.slug !== 'test') {
	// 	return redirect(301, "/");
	// }
    // await parent();
    // const password = cookies.get("password");

    // if (!password) {
        // return redirect(301, "/login");
    // }

    // if (password !== process.env.WEBSITE_PASSWORD) {
        // return redirect(301, "/login");
    // }

    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);

    try {
        const data = await fetch(`${process.env.VITE_PB_URL}/events`, {
            headers: { 'Authorization': `Basic ${credentials}` }
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
            newData: dataJSON,
            name: calendar.name
        }
    } catch (error) {
        console.error('[error]', error);
        return {
            newData: null,
            name: "",
            error: "Failed to fetch events"
        }
    }
}