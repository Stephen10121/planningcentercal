import { redirect } from '@sveltejs/kit';
import { config } from "dotenv";
import type { RecordModel } from 'pocketbase';

config();

export async function load({ locals }) {
    if (locals.user) {
        try {
            const user = await locals.pb.collection("users").getOne(locals.user.id, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });

            const records = await locals.pb.collection('calendar').getFullList({
                filter: `owner = "${locals.user?.id}"`,
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
        
            let newRecords: RecordModel[] = [];
        
            for (let i=0;i<records.length;i++) {
                newRecords.push({
                    ...records[i],
                    logoLink: locals.pb.files.getURL(records[i], records[i].logo),
                })
            }
            
            return {
                user,
                avatar: locals.pb.files.getURL(user, user.avatar),
                hasAccess: user.hasAccess,
                stripeBilling: process.env.BILLING_STRIPE_LINK,
                calendars: newRecords
            }
        } catch (err) {
            console.log(err);

            throw redirect(303, "/logout");
        }
    }
}