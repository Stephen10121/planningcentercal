// place files you want to import through the `$lib` alias in this folder.

export type EventTimes = {
    name: string;
    startTime: string;
    endTime: string;
}

export type Resourses = {
    id: string;
    kind: "Resource" | "Room";
    name: string;
    path_name: string | null
}

export type Tag = {
    color: string;
    name: string;
    id: string;
}

export type EventData = {
    instanceId: string
    startTime: string;
    endTime: string;
    name: string;
    location: string | null;
    color: string;
    times: EventTimes[];
    resources: Resourses[] | null;
    tags: Tag[] | null;
}

export const DAYTOSTRING = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHTOSTRING = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function isDateWithinRange(startDate: Date, endDate: Date, targetDate: Date) {
    return targetDate >= startDate && targetDate <= endDate;
}

export function dateRangeOverlaps(a_start: Date, a_end: Date, b_start: Date, b_end: Date) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
    if (b_start <  a_start && a_end   <  b_end) return true; // a in b
    return false;
}