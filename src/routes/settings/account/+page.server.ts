import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ parent }) {
    await parent();
}

export const actions = {
    updateUsername: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        if (!data.username) {
            return { error: true, success: false, message: "Missing Fields." }
        }

        if (!locals.user) {
            return { error: true, success: false, message: "Unauthorized." }
        }

        try {
            await locals.pb.collection("users").getFirstListItem(`username="${data.username}"`);
        } catch (err) {
            //@ts-ignore
            if (err.status === 404) {
                try {
                    const { username } = await locals.pb.collection("users").update(locals.user.id, { username: data.username });
                    locals.user.username = username;
                    return {
                        success: true,
                        message: "Changed Username."
                    }
                } catch (err) {
                    return { error: true, success: false, message: "Unable to change username. Try again later." }
                }
            } else {
                return { error: true, success: false, message: "Unable to change username. Try again later." }
            }
        }

        return { error: true, success: false, message: "Unable to change username. Try again later." }
    },
    setEmail: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        if (locals.user?.subscriptionEmail) {
            return { error: true, success: false, message: "Email is already set." }
        }

        if (!data.email) {
            return { error: true, success: false, message: "Email not recieved." }
        }

        if (typeof data.email !== "string") {
            return { error: true, success: false, message: "Invalid Email." }
        }

        console.log(data.email);
        try {
            let r = await locals.pb.collection('users').update(locals.user?.id, {
                "subscriptionEmail": data.email,
            });
        } catch (err) {
            console.log(err);

            return {
                error: true,
                message: "Failed to change email."
            }
        }

        return {
            success: true,
            message: "Successfully changed email!"
        }
    },
} satisfies Actions;