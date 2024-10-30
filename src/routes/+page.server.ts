import { getEventTime } from "$lib/getEventTime";
import { config } from "dotenv";

config();

export async function load() {

    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    const date = new Date();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();


    try {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/events?where[created_at][gt]=${year}-${month}-01`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });

        if (!data.ok) {
            console.error('[error]', data);
            return {
                eventsForThisMonth: null,
                error: "Failed to fetch events"
            }
        }

        const dataJSON = await data.json();

        console.log(`[server] Fetched events for ${month}/${year}.`);

        const eventTime = await getEventTime(dataJSON.data[0].id);

        return {
            eventsForThisMonth: dataJSON,
            eventTime
        }
    } catch (error) {
        console.error('[error]', error);
        return {
            eventsForThisMonth: null,
            error: "Failed to fetch events"
        }
    }
}