import { config } from "dotenv";
import resources from "../../resources.json";
import type { Resourses, Tag } from "$lib";

config();

export async function getEvent(id: string) {
    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    
    try {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/event_instances/${id}/event`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });
    
        if (!data.ok) {
            console.error('[error]', data);
            return {
                event: null,
                error: "Failed to fetch event."
            }
        }
    
        const dataJSON = await data.json();
    
        console.log(`[server] Fetched event for ${id}.`);
    
        return { event: dataJSON }
    } catch (error) {
        console.error('[error]', error);
        return {
            event: null,
            error: "Failed to fetch event."
        }
    }
}

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

export async function getResourceBookings(id: string) {
    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    
    try {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/event_instances/${id}/resource_bookings`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });
    
        if (!data.ok) {
            console.error('[error]', data);
            return {
                resources: null,
                error: "Failed to fetch resources."
            }
        }
    
        const dataJSON = await data.json();
    
        console.log(`[server] Fetched resources for ${id}.`);

        const resourcesForEvent: Resourses[] = []; 

        if (dataJSON["data"]) {
            for (let i=0;i<dataJSON.data.length;i++) {
                const resourceId = dataJSON.data[i].relationships.resource.data.id;
                for (let b=0;b<resources.length;b++) {
                    if (resourceId === resources[b].id) {
                        resourcesForEvent.push({
                            id: resourceId,
                            name: resources[b].attributes.name,
                            path_name: resources[b].attributes.path_name,
                            kind: resources[b].attributes.kind as "Resource" | "Room"
                        });
                    }
                }
            }
        }
    
        return { resources: resourcesForEvent }
    } catch (error) {
        console.error('[error]', error);
        return {
            resources: null,
            error: "Failed to resources."
        }
    }
}

export async function getTags(id: string) {
    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    
    try {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/event_instances/${id}/tags`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });
    
        if (!data.ok) {
            console.error('[error]', data);
            return {
                tags: null,
                error: "Failed to fetch tags."
            }
        }
    
        const dataJSON = await data.json();
    
        console.log(`[server] Fetched tags for ${id}.`);

        const gotTags: Tag[] = [];

        if (dataJSON["data"]) {
            for (let i=0;i<dataJSON.data.length;i++) {
                gotTags.push({
                    id: dataJSON.data[i].id,
                    color: dataJSON.data[i].attributes.color,
                    name: dataJSON.data[i].attributes.name
                });
            }
        }

        return {
            tags: gotTags
        }
    } catch (error) {
        console.error('[error]', error);
        return {
            tags: null,
            error: "Failed to tags."
        }
    }
}