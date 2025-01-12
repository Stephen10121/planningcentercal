import { serializeNonPOJOs } from "$lib/utils";
import PocketBase from "pocketbase";

export async function handle ({ event, resolve }) {
    event.locals.pb = new PocketBase(import.meta.env.VITE_PB_URL);
    event.locals.pb.authStore.clear();

    const authCookie = event.cookies.get("pb_auth");

    if (authCookie) {
        try {
            event.locals.pb.authStore.loadFromCookie(authCookie);
            
            event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();

            if (event.locals.pb.authStore.isValid) {
                event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
            } else {
                event.locals.user = undefined;
            }
        } catch (_) {
            event.locals.pb.authStore.clear();
        }
    }

    const response = await resolve(event);

    return response;
}