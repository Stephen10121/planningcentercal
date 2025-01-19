import { redirect } from '@sveltejs/kit';
import type { EventData } from "$lib";
import { config } from "dotenv";
import type { RecordModel } from 'pocketbase';

config();

export async function load({ params, locals, cookies }) {
    let calendar: RecordModel;
    try {
        calendar = await locals.pb.collection('calendar').getFirstListItem(`id="${params.slug}"`);
    } catch (err) {
        console.log("Calendar not found.");
        return redirect(301, "/");
    }

    if (calendar.password) {
        if (cookies.get(`cal-${params.slug}`) !== calendar.password) {
            return redirect(301, `/calendar/${params.slug}/login`);
        }
    }

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

        await locals.pb.collection('calendar').update(calendar.id, { 
            clicks: calendar.clicks + 1
        });
        
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