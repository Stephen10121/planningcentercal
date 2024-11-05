// place files you want to import through the `$lib` alias in this folder.

export type EventTimes = {
    name: string;
    startTime: string;
    endTime: string;
}

export type EventData = {
    instanceId: string
    startTime: string;
    endTime: string;
    name: string;
    room: string;
    times: EventTimes[];
}

export const DAYTOSTRING = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHTOSTRING = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function isDateWithinRange(startDate: Date, endDate: Date, targetDate: Date) {
    return targetDate >= startDate && targetDate <= endDate;
}