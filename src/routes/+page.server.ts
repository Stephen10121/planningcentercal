import type { EventData } from "$lib";
import { redirect } from "@sveltejs/kit";
import { config } from "dotenv";

config();

export async function load({ cookies }) {
    const password = cookies.get("password");

    if (!password) {
        return redirect(301, "/login");
    }

    if (password !== process.env.WEBSITE_PASSWORD) {
        return redirect(301, "/login");
    }

    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);

    try {
        const data = await fetch(`https://calapi.stephengruzin.dev/events`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });

        if (!data.ok) {
            console.error('[error]', data);
            return {
                newData: null,
                error: "Failed to fetch events"
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