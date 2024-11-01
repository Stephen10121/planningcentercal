import { redirect } from "@sveltejs/kit";
import { config } from "dotenv";

config();

export function load({ cookies }) {
    const password = cookies.get("password");

    if (password) {
        if (password === process.env.WEBSITE_PASSWORD) {
            return redirect(301, "/");
        }
    }

} 

export const actions = {
	default: async ({ request, cookies }) => {
        const data = await request.formData();
		const password = data.get('password');

        if (!password) {
            return { error: "Empty Fields." }
        }

        if (password !== process.env.WEBSITE_PASSWORD) {
            return { error: "Password is incorrect." }
        }

        cookies.set("password", password, {
            path: "/"
        });

        return redirect(301, "/");
	}
};