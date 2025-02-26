import { redirect } from '@sveltejs/kit';
import type { EventData } from "$lib";
import { config } from "dotenv";
import type { RecordModel } from 'pocketbase';

config();

export async function load({ params, locals, cookies }) {
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

    if (calendar.password) {
        if (cookies.get(`cal-${params.slug}`) !== calendar.password) {
            return redirect(301, `/calendar/${params.slug}/login`);
        }
    }
    
    try {
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

        try {
            await locals.pb.collection('calendar').update(calendar.id, { 
                visits: calendar.visits + 1
            }, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
        } catch (err) {
            console.log("Failed to update the visits", err);
        }
        
        return {
            newData: dataJSON,
            name: calendar.name,
            style: calendar.style as "LIGHT" | "DARK" | "CUSTOM",
            customStyle: calendar.customStyle as {[key: string]: any},
            logoLink: locals.pb.files.getURL(calendar, calendar.logo),
        }
    } catch (error) {
        console.error('[error]', error);
        return {
            newData: null,
            name: "",
            style: "LIGHT" as "LIGHT" | "DARK" | "CUSTOM",
            customStyle: {},
            error: "Failed to fetch events"
        }
    }
}