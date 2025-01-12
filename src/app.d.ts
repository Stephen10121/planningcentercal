import type PocketBase from "pocketbase";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
type AuthModel = {
    [key: string]: any;
} | null;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase,
			user?: AuthModel
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
