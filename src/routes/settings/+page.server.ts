import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, "/");
    } else {
        throw redirect(303, "/settings/profile");
    }
}