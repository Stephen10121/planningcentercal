import type { Actions } from "./$types";

export async function load({ parent }) {
    await parent();
}

export const actions = {
    default: async ({ request, locals }) => {
        if (!locals.user) {
            return { error: true, success: false, message: "Couldn't update profile." }
        }

        if (!locals.user.hasAccess) {
            // return redirect(301, "/settings/pricing");
            return { error: false, success: false, billing: true, message: "You first need to choose a pricing plan." }
        }

        const data = await request.formData();

        const logo = data.get("logo");
        if (logo) {
            //@ts-ignore
            if (logo && logo.size === 0) {
                return { error: true, success: false, message: "You must choose a logo." }
            } 
        } else {
            return { error: true, success: false, message: "You must choose a logo." }
        }

        const name = data.get("name") as string;
        if (name.length === 0) {
            return { error: true, success: false, message: "Name field is empty." }
        }

        const id = data.get("id") as string;
        if (id.length === 0) {
            return { error: true, success: false, message: "Id field is empty." }
        }

        const specialCharTest = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialCharTest.test(id)) {
            return { error: true, success: false, message: "Special Characters are not allowed for the id." }
        }

        const password = data.get("password") as string;
        try {
            await locals.pb.collection('calendar').getOne(id, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });

            return { error: true, success: false, message: "Id is already in use." }
        } catch (_err) {
        }

        try {
            await locals.pb.collection('calendar').create({
                "id": id,
                "name": name,
                "password": password,
                "logo": logo,
                "owner": locals.user.id
            }, {
                headers: {
                    "Authorization": "Bearer " + process.env.POCKETBASE_TOKEN!
                }
            });
        } catch (err) {
            return { error: true, success: false, message: "Failed to create Calendar." }
        }


        return { error: false, success: true, message: `Successfully created Calendar: '${name}'.` }
    }
} satisfies Actions;