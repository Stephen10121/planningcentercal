import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    cookies.delete("password", {
        path: "/"
    });

    return redirect(301, "/login");
}