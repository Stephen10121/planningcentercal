import { dev } from "$app/environment";
import { json, redirect } from "@sveltejs/kit";

export async function GET({ locals, url, cookies }) {
    const expectedState = cookies.get("state");
    const expectedVerifier = cookies.get("verifier");

    if (!expectedState || !expectedVerifier) {
        return redirect(303, "/");
    }

    const redirectURL = dev ? `${url.origin}/oath` : "https://planningcenter.stephengruzin.dev/oath";
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    const data = url.searchParams.size

    console.log(data);

    if (!state || !code) {
        return redirect(303, "/");
    }

    const authMethods = await locals.pb.collection("users").listAuthMethods();

    if (!authMethods.oauth2.enabled) {
        console.log("Oath not enabled.");
        return redirect(303, "/");
    }

    const provider = authMethods.oauth2.providers[0];

    if (!provider) {
        console.log("Provider not found.");
        return redirect(303, "/");
    }

    if (expectedState != state) {
        console.log("Returned state does not match expected state.");
        return redirect(303, "/");
    }
    
    try {
        await locals.pb.collection("users").authWithOAuth2Code(provider.name, code, expectedVerifier, redirectURL, {
            name: "New User",
        });
        cookies.set("pb_auth", locals.pb.authStore.exportToCookie().split(";")[0], {
            path: "/"
        })
    } catch (err) {
        console.log("Error signing up with oath", err);
        return redirect(303, "/");
    }

    return redirect(303, "/dashboard");
}