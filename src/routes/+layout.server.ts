import { redirect } from '@sveltejs/kit';
import { config } from "dotenv";

config();

export async function load({ locals }) {
    if (locals.user) {
        try {
            const user = await locals.pb.collection("users").getOne(locals.user.id);
            
            return {
                user,
                avatar: locals.pb.files.getURL(user, user.avatar),
                hasAccess: user.hasAccess,
                stripeBilling: process.env.BILLING_STRIPE_LINK
            }
        } catch (err) {
            console.log(err);

            throw redirect(303, "/logout");
        }
    }
}