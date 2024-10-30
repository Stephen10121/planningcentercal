import { config } from "dotenv";

config();

export async function getEventTime(id: string) {
    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    
    try {
        // Pass an event instance id. NOT an event id. Those are different.
        // const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/events/14275214/event_instances`, {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/event_instances/${id}/event_times`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });
    
        if (!data.ok) {
            console.error('[error]', data);
            return {
                eventTime: null,
                error: "Failed to fetch event time."
            }
        }
    
        const dataJSON = await data.json();
    
        console.log(`[server] Fetched event time for ${id}.`);
    
        return { eventTime: dataJSON }
    } catch (error) {
        console.error('[error]', error);
        return {
            eventTime: null,
            error: "Failed to fetch event time."
        }
    }
}