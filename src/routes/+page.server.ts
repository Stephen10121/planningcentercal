import type { EventData, EventTimes } from "$lib";
import { getEvent, getEventTime, getResourceBookings, getTags } from "$lib/getEventTime";
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
    const date = new Date();

    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();

    const nextThreeDays = new Date(date. setDate(date.getDate() + 8)); // Set the 3 back to 2 when in prod. This is just to test because there was no data.
    const thirdMonth = nextThreeDays.getMonth() + 1;
    const thirdYear = nextThreeDays.getFullYear();
    const thirdDay = nextThreeDays.getDate();


    try {
        const data = await fetch(`https://api.planningcenteronline.com/calendar/v2/event_instances?where[starts_at][gt]=${currentYear}-${currentMonth}-${currentDay}`, {
            headers: { 'Authorization': `Basic ${credentials}` }
        });

        if (!data.ok) {
            console.error('[error]', data);
            return {
                newData: null,
                error: "Failed to fetch events"
            }
        }

        const dataJSON = await data.json();

        if (dataJSON["data"]) {
            console.log(`[server] Fetched events for ${currentYear}/${currentMonth}/${currentDay}.`);
            const newData: EventData[] = [];

            for (let i=0;i<dataJSON.data.length;i++) {
                const dateOfEvent = new Date(dataJSON.data[i].attributes.starts_at);
                if (dateOfEvent.getFullYear() <= thirdYear && dateOfEvent.getMonth() + 1 <= thirdMonth && dateOfEvent.getDate() <= thirdDay) {
                    const instanceId = dataJSON.data[i].id;

                    const eventItself = await getEvent(instanceId);
                    const eventTime = await getEventTime(instanceId);
                    const resources = await getResourceBookings(instanceId);
                    const tags = await getTags(instanceId);
                
                    if (eventTime.error) {
                        console.log("[error]", eventTime.error);
                        continue;
                    }

                    if (eventItself.error) {
                        console.log("[error]", eventItself.error);
                        continue;
                    }

                    const eventTimeData: EventTimes[] = [];
                    if (eventTime.eventTime["data"]) {
                        for (let i=0;i<eventTime.eventTime.data.length;i++) {
                            eventTimeData.push({
                                name: eventTime.eventTime.data[i].attributes.name,
                                startTime: eventTime.eventTime.data[i].attributes.starts_at,
                                endTime: eventTime.eventTime.data[i].attributes.ends_at
                            });
                        }
                    }
                    const name = eventItself.event.data.attributes.name;

                    const colors: {[key: string]: string} = {
                        "Youth Service": "#e8d4fb8C",
                        "Morning Service": "#97e9b48C",
                        "Bible Study": "#f1f3418C",
                        "Rent prayers room N.Medvedeva": "#efb1b18C"
                    }

                    newData.push({
                        instanceId: dataJSON.data[i].id,
                        startTime: dataJSON.data[i].attributes.starts_at,
                        endTime: eventTimeData[eventTimeData.length -1].endTime,
                        name,
                        room: dataJSON.data[i].attributes.location,
                        times: eventTimeData,
                        color: Object.keys(colors).includes(name) ? colors[name] : "#FBDCD48C",
                        resources: resources.resources,
                        tags: tags.tags
                    });
                }
            }
    
            return {
                newData
            }
        } else {
            console.error('[error]', dataJSON);
            return {
                newData: null,
                error: "Failed to fetch events"
            }
        }

    } catch (error) {
        console.error('[error]', error);
        return {
            newData: null,
            error: "Failed to fetch events"
        }
    }
}