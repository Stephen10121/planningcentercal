import type { EventData } from "$lib";
import { config } from "dotenv";

config();

export async function load({ parent }) {
    await parent();
    // const password = cookies.get("password");

    // if (!password) {
        // return redirect(301, "/login");
    // }

    // if (password !== process.env.WEBSITE_PASSWORD) {
        // return redirect(301, "/login");
    // }

    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);

    try {
        const data = await fetch(`${import.meta.env.VITE_PB_URL}/events`, {
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
            newData: dataJSON
        }
    } catch (error) {
        console.error('[error]', error);
        return {
            newData: null,
            error: "Failed to fetch events"
        }
    }
}