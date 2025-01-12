import type { Actions } from './$types';

export async function load({ parent }) {
    await parent();
}

export const actions = {
    updateProfile: async ({ request, locals }) => {
        if (!locals.user) {
            return { error: true, success: false, message: "Couldn't update profile." }
        }
        const data = await request.formData();

        try {
            const userAvatar = data.get("avatar");
            if (userAvatar) {
                //@ts-ignore
                if (userAvatar && userAvatar.size === 0) {
                    data.delete("avatar");
                } 
            } else {
                data.delete("avatar");
            }
            const { name, avatar } = await locals.pb.collection("users").update(locals.user?.id, data);

            locals.user.name = name;
            locals.user.avatar = avatar;
        } catch (err) {
            console.log(err);

            return { error: true, success: false, message: "Couldn't update profile." }
        }

        return { error: false, success: true, message: "Updated profile." }
    }
} satisfies Actions;