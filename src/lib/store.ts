import { writable } from "svelte/store";

export const loginSignupValue = writable<"login" | "register">("login");
export const loginOrRegisterDiologOpen = writable(false);