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