import { redirect } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export async function load({ parent, locals }) {
    if (!locals.user) {
        return redirect(303, "/");
    }

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