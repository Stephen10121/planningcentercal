import { dev } from "$app/environment";
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
    default: async ({ cookies, url, locals }) => {
        locals.pb.authStore.clear();
        const authMethods = await locals.pb.collection('users').listAuthMethods();

        if (!authMethods.oauth2.enabled) {
            return {
                authProviders: '',
            }
        }

        const redirectURL = dev ? `${url.origin}/oath` : "https://planningcenter.stephengruzin.dev/oath";
        const planningCenterAuthProvider = authMethods.oauth2.providers[0];
        const authProviderRedirect = `${planningCenterAuthProvider.authURL}${redirectURL}`;

        const state = planningCenterAuthProvider.state;
        const verifier = planningCenterAuthProvider.codeVerifier;

        cookies.set('state', state, {
            path: "/"
        });

        cookies.set('verifier', verifier, {
            path: "/"
        });

        return redirect(302, authProviderRedirect);
    }
};