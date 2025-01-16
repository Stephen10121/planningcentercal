import type { RecordModel } from 'pocketbase';

export async function load({ parent, locals }) {
    await parent();

    const records = await locals.pb.collection('calendar').getFullList({
        filter: `owner = "${locals.user?.id}"`,
    });

    let newRecords: RecordModel[] = [];

    for (let i=0;i<records.length;i++) {
        newRecords.push({
            ...records[i],
            logoLink: locals.pb.files.getURL(records[i], records[i].logo),
        })
    }

    return {
        calendars: newRecords
    }
}