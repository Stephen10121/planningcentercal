import { json } from "@sveltejs/kit";

export function POST() {
    console.log("webhook");
    return json({ msg: "OK" });
}