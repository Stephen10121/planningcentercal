import { getEvent, getEventTime } from "$lib/getEventTime";
import { config } from "dotenv";

config();

export async function load() {

    const credentials = btoa(`${process.env.APP_ID}:${process.env.APP_SECRET}`);
    const date = new Date();

    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentDay = date.getDate();

    const nextThreeDays = new Date(date. setDate(date.getDate() + 3)); // Set the 3 back to 2 when in prod. This is just to test because there was no data.
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
            const newData = [];

            for (let i=0;i<dataJSON.data.length;i++) {
                const dateOfEvent = new Date(dataJSON.data[i].attributes.starts_at);
                if (dateOfEvent.getFullYear() <= thirdYear && dateOfEvent.getMonth() + 1 <= thirdMonth && dateOfEvent.getDate() <= thirdDay) {
                    const eventTime = await getEventTime(dataJSON.data[i].id);
                
                    if (eventTime.error) {
                        console.log("[error]", eventTime.error);
                    }

                    newData.push({
                        id: dataJSON.data[i].id,
                        instance: dataJSON.data[i],
                        time: eventTime.eventTime
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